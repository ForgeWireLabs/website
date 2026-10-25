import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const outputRoot = path.resolve("_site");
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

function fail(message) { failures.push(message); }

try {
  await stat(outputRoot);
} catch {
  console.error("Build output _site/ is missing. Run `npm run build` first.");
  process.exit(1);
}

const files = await walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 4) fail(`Expected at least 4 HTML pages, found ${htmlFiles.length}.`);

for (const required of [
  "index.html",
  "projects/index.html",
  "engineering/index.html",
  "about/index.html",
  "robots.txt",
  "sitemap.xml",
  "assets/site.css",
  "assets/favicon.svg",
  "assets/forgewire-labs-hero.png",
  "assets/repopact-flow.svg",
]) {
  try {
    await stat(path.join(outputRoot, required));
  } catch {
    fail(`Required output is missing: ${required}`);
  }
}

const generatedPaths = new Set(files.map((file) => path.resolve(file)));

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const label = path.relative(outputRoot, file);

  if (!/<html\s+lang="[^"]+"/i.test(html)) fail(`${label}: missing document language.`);
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(`${label}: missing page title.`);
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) fail(`${label}: missing meta description.`);
  if (!/<link\s+rel="canonical"\s+href="https:\/\/forgewirelabs\.com\//i.test(html)) fail(`${label}: canonical URL is missing or not on the production domain.`);

  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  if (h1Count !== 1) fail(`${label}: expected one h1, found ${h1Count}.`);
  if (/<script\b|\son[a-z]+\s*=|<form\b|<iframe\b|https?:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com)/i.test(html)) {
    fail(`${label}: found browser script, inline handler, form, iframe, or remote font embed.`);
  }
  if (/<(?:script|img|iframe)\b[^>]*\bsrc="https?:\/\//i.test(html) || /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="https?:\/\//i.test(html)) {
    fail(`${label}: found a remote executable, image, frame, or stylesheet resource.`);
  }
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt="[^"]*"/i.test(image[0])) fail(`${label}: image is missing an alt attribute.`);
  }

  const ids = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    if (ids.has(match[1])) fail(`${label}: duplicate id "${match[1]}".`);
    ids.add(match[1]);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1].replaceAll("&amp;", "&");
    if (reference.startsWith("#")) {
      const id = decodeURIComponent(reference.slice(1));
      if (!ids.has(id)) fail(`${label}: anchor #${id} does not match an element id.`);
      continue;
    }
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;

    let url;
    try {
      url = new URL(reference, "https://forgewirelabs.com/");
    } catch {
      fail(`${label}: invalid local reference "${reference}".`);
      continue;
    }
    let resourcePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!resourcePath || resourcePath.endsWith("/")) resourcePath += "index.html";
    const target = path.resolve(outputRoot, resourcePath);
    if (!target.startsWith(`${outputRoot}${path.sep}`) && target !== path.join(outputRoot, "index.html")) {
      fail(`${label}: local reference escapes the output directory: "${reference}".`);
    } else if (!generatedPaths.has(target)) {
      fail(`${label}: local reference has no generated file: "${reference}".`);
    }
  }
}

const projectPage = await readFile(path.join(outputRoot, "projects", "index.html"), "utf8");
if ([...projectPage.matchAll(/<article\s+class="project-card/g)].length !== 7) fail("Project availability page should render 7 portfolio records.");
for (const projectName of ["RepoPact Core", "RepoPact Workbench", "Anvil", "SkillForge Academy", "ForgeWire", "Fabric", "ForgeLink"]) {
  if (!projectPage.includes(projectName)) fail(`Project availability page is missing ${projectName}.`);
}

const homePage = await readFile(path.join(outputRoot, "index.html"), "utf8");
if ([...homePage.matchAll(/<article\s+class="project-card/g)].length !== 4) fail("Homepage should render 4 featured portfolio records.");

if (failures.length) {
  console.error(`Site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site verification passed: ${htmlFiles.length} HTML pages, required assets, metadata, headings, and local references checked.`);
