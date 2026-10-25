import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const isPreview = process.argv.includes("--preview");
const outputRoot = path.resolve(isPreview ? "_preview" : "_site");
const expectedCanonicalPrefix = isPreview
  ? "https://forgewirelabs.github.io/website/"
  : "https://forgewirelabs.com/";
const referenceOrigin = isPreview ? "https://forgewirelabs.github.io" : "https://forgewirelabs.com";
const previewPathPrefix = isPreview ? "/website" : "";
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
  console.error(`Build output ${isPreview ? "_preview/" : "_site/"} is missing. Run the matching build command first.`);
  process.exit(1);
}

const files = await walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
if (htmlFiles.length !== 4) fail(`Expected the four reviewed pages, found ${htmlFiles.length} HTML files.`);

const requiredFiles = [
  "index.html",
  "projects/index.html",
  "engineering/index.html",
  "about/index.html",
  "robots.txt",
  "sitemap.xml",
  "assets/site.css",
  "assets/favicon.svg",
  "assets/forgewire-labs-hero.png",
  "assets/repopact-architecture.svg",
  "assets/workbench-desktop-dashboard.jpg",
  "assets/skillforge-command-center.png",
  "assets/forgelink-product-architecture.svg",
];

for (const required of requiredFiles) {
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
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  if (!canonical?.startsWith(expectedCanonicalPrefix)) fail(`${label}: canonical URL must start with ${expectedCanonicalPrefix}.`);

  if (isPreview) {
    if (!/<meta\s+name="robots"\s+content="noindex, nofollow"\s*\/?\s*>/i.test(html)) fail(`${label}: preview page is missing its noindex directive.`);
    if (!html.includes("Development preview · Temporary public review copy")) fail(`${label}: preview banner is missing.`);
  } else if (/<meta\s+name="robots"/i.test(html)) {
    fail(`${label}: production build unexpectedly contains preview robots metadata.`);
  }

  if ([...html.matchAll(/<h1\b/gi)].length !== 1) fail(`${label}: expected exactly one h1.`);
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
      url = new URL(reference, `${referenceOrigin}/`);
    } catch {
      fail(`${label}: invalid local reference "${reference}".`);
      continue;
    }
    let pathname = decodeURIComponent(url.pathname);
    if (isPreview) {
      if (pathname !== previewPathPrefix && !pathname.startsWith(`${previewPathPrefix}/`)) {
        fail(`${label}: preview reference is missing the ${previewPathPrefix} base path: "${reference}".`);
        continue;
      }
      pathname = pathname.slice(previewPathPrefix.length);
    }
    let resourcePath = pathname.replace(/^\/+/, "");
    if (!resourcePath || resourcePath.endsWith("/")) resourcePath += "index.html";
    const target = path.resolve(outputRoot, resourcePath);
    if (!target.startsWith(`${outputRoot}${path.sep}`) && target !== path.join(outputRoot, "index.html")) {
      fail(`${label}: local reference escapes the output directory: "${reference}".`);
    } else if (!generatedPaths.has(target)) {
      fail(`${label}: local reference has no generated file: "${reference}".`);
    }
  }
}

const projectsPage = await readFile(path.join(outputRoot, "projects", "index.html"), "utf8");
if ([...projectsPage.matchAll(/data-project-id="[^"]+"/g)].length !== 7) fail("Project register should render all 7 reviewed records.");
for (const projectName of ["RepoPact Core", "RepoPact Workbench", "Anvil", "SkillForge Academy", "ForgeWire", "Fabric", "ForgeLink"]) {
  if (!projectsPage.includes(projectName)) fail(`Project register is missing ${projectName}.`);
}
if (!projectsPage.includes("Maintained in JeremyShows")) fail("Related ForgeLink ownership is missing.");
if (!projectsPage.includes("Private development")) fail("Private development status is missing.");
if (!projectsPage.includes("no packaged installers are listed")) fail("Workbench preview status is not explicit.");

const homePage = await readFile(path.join(outputRoot, "index.html"), "utf8");
for (const phrase of ["Software for work that crosses", "people, agents, and machines", "The system carries the work"]) {
  if (!homePage.includes(phrase)) fail(`Homepage narrative is missing “${phrase}”.`);
}

const robots = await readFile(path.join(outputRoot, "robots.txt"), "utf8");
if (isPreview && /Sitemap:/i.test(robots)) fail("Preview robots.txt should not advertise a sitemap.");
if (!isPreview && !robots.includes("Sitemap: https://forgewirelabs.com/sitemap.xml")) fail("Production robots.txt should advertise its sitemap.");

for (const file of files.filter((item) => item.endsWith(".svg"))) {
  const svg = await readFile(file, "utf8");
  if (/<script\b|foreignObject|href="https?:\/\//i.test(svg)) fail(`${path.relative(outputRoot, file)}: unsafe or remote SVG content found.`);
}

if (failures.length) {
  console.error(`Site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site verification passed: ${htmlFiles.length} pages, preview metadata, release boundaries, images, SVG assets, and local links checked${isPreview ? " for preview mode" : ""}.`);
