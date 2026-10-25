import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const isPreview = process.argv.includes("--preview");
const outputRoot = path.resolve(isPreview ? "_preview" : "_site");
const referenceOrigin = isPreview ? "https://forgewirelabs.github.io" : "https://forgewirelabs.com";
const previewPathPrefix = isPreview ? "/website" : "";
const routeByFile = new Map([
  ["index.html", "/"],
  ["work/index.html", "/work/"],
  ["projects/index.html", "/projects/"],
  ["engineering/index.html", "/engineering/"],
  ["about/index.html", "/about/"],
]);
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
if (htmlFiles.length !== routeByFile.size) fail(`Expected five reviewed pages, found ${htmlFiles.length} HTML files.`);

const requiredFiles = [
  "index.html",
  "work/index.html",
  "projects/index.html",
  "engineering/index.html",
  "about/index.html",
  "robots.txt",
  "sitemap.xml",
  "assets/site.css",
  "assets/favicon.svg",
  "assets/forgewire-labs-social.svg",
  "assets/forgewire-labs-social.png",
  "assets/forgewire-projects-workspace.png",
  "assets/repopact-architecture.svg",
  "assets/workbench-desktop-dashboard.jpg",
  "assets/skillforge-command-center.png",
  "assets/flink-product-architecture.svg",
];

for (const required of requiredFiles) {
  try {
    await stat(path.join(outputRoot, required));
  } catch {
    fail(`Required output is missing: ${required}`);
  }
}

const generatedPaths = new Set(files.map((file) => path.resolve(file)));
for (const file of files) {
  const relative = path.relative(outputRoot, file).replaceAll("\\", "/");
  if (/\.(?:map|env)$/i.test(relative) || /(?:^|\/)(?:docs|scripts|node_modules|\.git)(?:\/|$)/i.test(relative)) {
    fail(`Unexpected source or private file in generated output: ${relative}`);
  }
}
if (files.some((file) => ["forgewire-labs-hero.png", "forgewire-labs-hero.svg", "repopact-flow.svg"].includes(path.basename(file)))) {
  fail("An obsolete or unreferenced prototype visual should not be published.");
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const label = path.relative(outputRoot, file).replaceAll("\\", "/");
  const route = routeByFile.get(label);

  if (!route) fail(`${label}: unexpected HTML route.`);
  if (!/<html\s+lang="[^"]+"/i.test(html)) fail(`${label}: missing document language.`);
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(`${label}: missing page title.`);
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) fail(`${label}: missing meta description.`);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const expectedCanonical = `${referenceOrigin}${previewPathPrefix}${route ?? "/"}`;
  if (canonical !== expectedCanonical) fail(`${label}: canonical URL must be ${expectedCanonical}.`);
  if (!/<meta\s+property="og:image"\s+content="[^"]+"/i.test(html)) fail(`${label}: missing social image metadata.`);
  if (!/<meta\s+property="og:image:alt"\s+content="[^"]+"/i.test(html)) fail(`${label}: missing social image alternative text.`);
  if (!/property="og:image:alt"\s+content="ForgeWire Labs presents six engineering questions about compute, providers, connectivity, platforms, authority, and evidence\.?"/i.test(html)) fail(`${label}: social image alternative text should identify ForgeWire Labs and its engineering questions.`);
  if (!/<meta\s+property="og:image:width"\s+content="1200"/i.test(html) || !/<meta\s+property="og:image:height"\s+content="630"/i.test(html)) fail(`${label}: social image dimensions must match the 1200×630 asset.`);
  if (!/<meta\s+name="twitter:card"\s+content="summary_large_image"/i.test(html)) fail(`${label}: missing large social card declaration.`);
  const socialImage = `${referenceOrigin}${previewPathPrefix}/assets/forgewire-labs-social.png`;
  if (!html.includes(`<meta property="og:image" content="${socialImage}">`)) fail(`${label}: social card must use the current ForgeWire Labs asset.`);
  if (!html.includes(`<meta name="twitter:image" content="${socialImage}">`)) fail(`${label}: social card URL is missing or inconsistent.`);

  if (isPreview) {
    if (!/<meta\s+name="robots"\s+content="noindex, nofollow"\s*\/?\s*>/i.test(html)) fail(`${label}: preview page must explicitly use noindex, nofollow.`);
    if (!html.includes("Development preview · Temporary public review copy")) fail(`${label}: preview banner is missing.`);
    if (html.includes("https://forgewirelabs.com")) fail(`${label}: preview page references a production canonical or share URL.`);
  } else if (/<meta\s+name="robots"/i.test(html) || html.includes("Development preview · Temporary public review copy")) {
    fail(`${label}: production output unexpectedly contains preview behavior.`);
  }

  if ([...html.matchAll(/<h1\b/gi)].length !== 1) fail(`${label}: expected exactly one h1.`);
  if (/<script\b|\son[a-z]+\s*=|<form\b|<iframe\b|javascript:/i.test(html)) {
    fail(`${label}: found browser script, inline handler, form, iframe, or executable URL.`);
  }
  if (/<(?:script|img|iframe)\b[^>]*\bsrc="https?:\/\//i.test(html) || /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="https?:\/\//i.test(html)) {
    fail(`${label}: found a remote executable, image, frame, or stylesheet resource.`);
  }
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt="[^"]*"/i.test(image[0])) fail(`${label}: image is missing an alt attribute.`);
    if (!/\bwidth="\d+"/i.test(image[0]) || !/\bheight="\d+"/i.test(image[0])) fail(`${label}: image is missing intrinsic dimensions.`);
  }

  const ids = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    if (ids.has(match[1])) fail(`${label}: duplicate id "${match[1]}".`);
    ids.add(match[1]);
  }
  for (const match of html.matchAll(/\baria-describedby="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/)) if (!ids.has(id)) fail(`${label}: aria-describedby references missing id "${id}".`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1].replaceAll("&amp;", "&");
    if (reference.startsWith("#")) {
      const id = decodeURIComponent(reference.slice(1));
      if (!ids.has(id)) fail(`${label}: anchor #${id} does not match an element id.`);
      continue;
    }
    if (/^(?:https?:|mailto:|tel:)/i.test(reference)) continue;
    if (/^(?:data:|javascript:)/i.test(reference)) {
      fail(`${label}: executable or embedded local reference "${reference}".`);
      continue;
    }

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
    if (!target.startsWith(`${outputRoot}${path.sep}`)) {
      fail(`${label}: local reference escapes the output directory: "${reference}".`);
    } else if (!generatedPaths.has(target)) {
      fail(`${label}: local reference has no generated file: "${reference}".`);
    }
  }
}

const projectsPage = await readFile(path.join(outputRoot, "projects", "index.html"), "utf8");
if ([...projectsPage.matchAll(/data-project-id="[^"]+"/g)].length !== 7) fail("Project register should render all 7 reviewed records.");
for (const projectName of ["RepoPact Core", "RepoPact Workbench", "Anvil", "SkillForge Academy", "ForgeWire", "Fabric", "Flink"]) {
  if (!projectsPage.includes(projectName)) fail(`Project register is missing ${projectName}.`);
}
if (!projectsPage.includes("ForgeWire Labs · Communications")) fail("Flink's organization ownership is missing.");
if (!projectsPage.includes("https://github.com/ForgeWireLabs/Flink")) fail("Flink's organization repository link is missing.");
if (!projectsPage.includes("Private development")) fail("Private development status is missing.");
if (!projectsPage.includes("no packaged installers are listed")) fail("Workbench preview status is not explicit.");
if (!projectsPage.includes("fixture data, not customer, production, or reliability metrics")) fail("Workbench fixture metrics are not qualified.");
if (!projectsPage.includes("sample account state, not learner outcome metrics")) fail("SkillForge sample values are not qualified.");
if (!projectsPage.includes("Open the full-resolution capture")) fail("Full-resolution Workbench screenshot link is missing.");
if (!projectsPage.includes("dashed boxes mark derived views")) fail("RepoPact diagram legend is missing.");
if (!projectsPage.includes("Software scope and maturity table")) fail("Software page is missing its accessible release status index.");

const homePage = await readFile(path.join(outputRoot, "index.html"), "utf8");
for (const phrase of ["Engineering intelligent systems for work", "beyond the model", "independent software engineering", "Six questions help shape practical engineering decisions", "ForgeWire", "Fabric", "released CLI package at version 3.1.3"]) {
  if (!homePage.includes(phrase)) fail(`Homepage narrative is missing “${phrase}”.`);
}
if (homePage.includes("forgewire-projects-workspace.png")) fail("The product screenshot should not define the homepage's organization-level centerpiece.");
if (!homePage.includes("What can run here?") || !homePage.includes("Who can act or intervene?") || !homePage.includes("What can be checked?")) fail("Homepage's constraint index is incomplete.");
if (!homePage.includes("A practical lens for engineering decisions.")) fail("Homepage should introduce its question index with affirmative editorial copy.");
if (homePage.includes("not a system diagram") || homePage.includes("not a shared product architecture") || homePage.includes("not an application release")) fail("Homepage should reserve detailed qualification for project descriptions and status notes.");

if (!projectsPage.includes("organizing model-assisted work around project context, tools, and selected workflows")) fail("ForgeWire project copy should explain its public technical direction.");
if (!projectsPage.includes("separate execution control-plane direction for authenticated, policy-gated work across machines")) fail("Fabric project copy should explain its public technical direction.");
if (!projectsPage.includes("not a public service or deployment option")) fail("Fabric public availability limits must remain explicit.");

const engineeringPage = await readFile(path.join(outputRoot, "engineering", "index.html"), "utf8");
for (const phrase of ["How intelligent systems work across", "Current investigations", "Questions shaping the work", "ForgeWire · private development", "Fabric · private development", "canonical Rust engine", "single-writer JSON", "RP Proving Grounds", "pins RepoPact 3.0.2", "does not establish validation coverage for the newer 3.1.3", "It does not describe ForgeWire, Fabric, Anvil, Flink"]) {
  if (!engineeringPage.includes(phrase)) fail(`Research & Engineering page is missing the bounded content “${phrase}”.`);
}
if (engineeringPage.includes("This page separates questions") || engineeringPage.includes("not published findings") || engineeringPage.includes("not claims of completed research")) fail("Research & Engineering should lead with the investigations rather than evidence disclaimers.");

const workPage = await readFile(path.join(outputRoot, "work", "index.html"), "utf8");
for (const phrase of ["Intelligent systems", "Distributed computing and execution infrastructure", "Developer and repository infrastructure", "Systems integration and local software", "Applied technical education", "Five disciplines connect", "shape how ForgeWire Labs approaches scope, authority, evidence, and operating constraints"]) {
  if (!workPage.includes(phrase)) fail(`Our Work page is missing the organization-level scope “${phrase}”.`);
}

const aboutPage = await readFile(path.join(outputRoot, "about", "index.html"), "utf8");
const founderHeadingPosition = aboutPage.indexOf('id="founder-title"');
if (founderHeadingPosition >= 0 && founderHeadingPosition < aboutPage.indexOf("</section>")) fail("About page must establish the organization before introducing its founder.");
if (!aboutPage.includes("independent, founder-led software engineering and research organization")) fail("About page must describe ForgeWire Labs as an independent, founder-led organization.");
for (const phrase of ["ForgeWireLabs/ForgeWireLabs/issues/new", "Posts are public", "General correspondence", "Software questions", "Security disclosures", "no central security mailbox has been verified as active", "Planned email identities · inactive", "contact@forgewirelabs.com", "support@forgewirelabs.com", "security@forgewirelabs.com", "planning names, not active inboxes"]) {
  if (!aboutPage.includes(phrase)) fail(`About page is missing the contact status or route “${phrase}”.`);
}
if (/href="mailto:(?:contact|support|security)@forgewirelabs\.com"/i.test(aboutPage)) fail("Planned email identities must not be presented as working mail links.");
if (aboutPage.includes("@forgewirelabs.org")) fail("The owner's named .org mailbox must not be published on the website.");
if (aboutPage.includes("No project listing implies") || aboutPage.includes("unverified headcount")) fail("About page contains unnecessary defensive qualification.");

const robots = await readFile(path.join(outputRoot, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
if (isPreview) {
  if (/^\s*Sitemap:/im.test(robots)) fail("Preview robots.txt must not advertise a sitemap.");
  if (/<loc>/i.test(sitemap) || sitemap.includes("forgewirelabs.github.io") || sitemap.includes("forgewirelabs.com")) fail("Preview sitemap must not expose staging or production URLs.");
} else {
  if (!robots.includes(`Sitemap: ${referenceOrigin}/sitemap.xml`)) fail(`Production robots.txt should advertise ${referenceOrigin}/sitemap.xml.`);
  for (const route of routeByFile.values()) {
    const expectedUrl = `${referenceOrigin}${route}`;
    if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) fail(`Production sitemap.xml is missing ${expectedUrl}.`);
  }
}

const socialSvg = await readFile(path.join(outputRoot, "assets", "forgewire-labs-social.svg"), "utf8");
if (socialSvg.includes("forgewire-projects-workspace.png") || !socialSvg.includes("INDEPENDENT SOFTWARE ENGINEERING") || !socialSvg.includes("QUESTIONS TO CARRY INTO ENGINEERING") || !socialSvg.includes("AUTHORITY")) fail("Social card must use the organization-level engineering identity and avoid making a product screenshot the mark.");
const socialPng = await readFile(path.join(outputRoot, "assets", "forgewire-labs-social.png"));
if (socialPng.toString("hex", 0, 8) !== "89504e470d0a1a0a") fail("Social card is not a valid PNG.");
if (socialPng.readUInt32BE(16) !== 1200 || socialPng.readUInt32BE(20) !== 630) fail("Social card must be 1200×630 pixels.");
const css = await readFile(path.join(outputRoot, "assets", "site.css"), "utf8");
if (!css.includes("@media (max-width: 720px)") || !css.includes("@media (prefers-reduced-motion: reduce)")) fail("Responsive or reduced-motion styles are missing.");
if (/fonts\.googleapis\.com|fonts\.gstatic\.com|url\(\s*['"]?https?:/i.test(css)) fail("Stylesheet must not load external fonts or other remote assets.");

for (const file of files.filter((item) => item.endsWith(".svg"))) {
  const svg = await readFile(file, "utf8");
  if (/<script\b|foreignObject|href="https?:\/\//i.test(svg)) fail(`${path.relative(outputRoot, file)}: unsafe or remote SVG content found.`);
}

if (failures.length) {
  console.error(`Site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site verification passed: ${htmlFiles.length} pages, ${isPreview ? "noindex staging" : "production"} metadata, organization-first content, release boundaries, social assets, images, SVG safety, and local links checked.`);
