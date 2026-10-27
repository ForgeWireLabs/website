import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import contactChannels from "../src/_data/contactChannels.js";
import site from "../src/_data/site.js";

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
  "assets/labs-neural-masthead.webp",
  "assets/labs-connected-network.webp",
];

if (!isPreview) requiredFiles.push(".htaccess");

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
if (isPreview && files.some((file) => path.basename(file) === ".htaccess")) {
  fail("IONOS-specific server configuration must not be included in the GitHub Pages preview artifact.");
}
if (!isPreview) {
  const htaccess = await readFile(path.join(outputRoot, ".htaccess"), "utf8");
  for (const directive of ["Options -Indexes", "RewriteEngine On", "https://forgewirelabs.com%{REQUEST_URI}", "frame-ancestors 'none'", "X-Content-Type-Options", "Referrer-Policy"]) {
    if (!htaccess.includes(directive)) fail(`Production .htaccess is missing the expected static-site protection: ${directive}.`);
  }
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const label = path.relative(outputRoot, file).replaceAll("\\", "/");
  const route = routeByFile.get(label);

  if (!route) fail(`${label}: unexpected HTML route.`);
  if (!/<html\s+lang="[^"]+"/i.test(html)) fail(`${label}: missing document language.`);
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(`${label}: missing page title.`);
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) fail(`${label}: missing meta description.`);
  const stylesheetPath = `${previewPathPrefix}/assets/site.css?v=${site.assetVersion}`;
  if (!html.includes(`href="${stylesheetPath}"`)) fail(`${label}: stylesheet URL must use the current asset version (${stylesheetPath}).`);
  const mastheadPath = `${previewPathPrefix}/assets/labs-neural-masthead.webp`;
  const mastheads = [...html.matchAll(/<figure\b[^>]*class="[^"]*\bneural-masthead\b[^"]*"[^>]*>/gi)];
  const mastheadStart = html.indexOf('<figure class="neural-masthead">');
  const mastheadClose = mastheadStart < 0 ? -1 : html.indexOf("</figure>", mastheadStart);
  const mastheadEnd = mastheadClose < 0 ? -1 : mastheadClose + "</figure>".length;
  const headerMatches = [...html.matchAll(/<header\b[^>]*class="site-header"[^>]*>[\s\S]*?<\/header>/gi)];
  const headerStart = html.indexOf('<header class="site-header">');
  const headerEnd = headerMatches[0]?.index + (headerMatches[0]?.[0].length ?? 0);
  const mainMatches = [...html.matchAll(/<main\b[^>]*>/gi)];
  const mainStart = html.indexOf('<main id="main"');
  if (mastheads.length !== 1 ||
      !html.includes(`<img src="${mastheadPath}" alt="Blue branching neural structures with amber contact points."`)) {
    fail(`${label}: expected exactly one shared neural masthead with its accessible alternative.`);
  }
  if (html.includes('masthead-brandbar')) fail(`${label}: redundant masthead brand bar must not be present.`);
  if (headerMatches.length !== 1) fail(`${label}: expected exactly one shared site header.`);
  if (mainMatches.length !== 1) fail(`${label}: expected exactly one main content region.`);
  if (!(mastheadStart >= 0 && mastheadEnd > mastheadStart && headerStart >= mastheadEnd && headerEnd > headerStart && mainStart >= headerEnd)) {
    fail(`${label}: required order is neural masthead, complete header, then main content.`);
  }
  const header = headerMatches[0]?.[0] ?? "";
  if (!header.includes('class="wordmark"') || !header.includes('aria-label="Main navigation"')) {
    fail(`${label}: the shared header must contain both the ForgeWire Labs wordmark and navigation.`);
  }
  for (const navigationLabel of ["Home", "Our Work", "Research &amp; Engineering", "Software", "About"]) {
    if (!header.includes(`>${navigationLabel}</a>`)) fail(`${label}: the shared header is missing ${navigationLabel} navigation.`);
  }
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
if ([...projectsPage.matchAll(/data-project-id="[^"]+"/g)].length !== 7) fail("Software page must render all 7 project records.");
for (const projectName of ["RepoPact Core", "RepoPact Workbench", "Anvil", "SkillForge Academy", "ForgeWire", "Fabric", "Flink"]) {
  if (!projectsPage.includes(projectName)) fail("Software page is missing " + projectName + ".");
}
if (!projectsPage.includes("ForgeWire Labs · Communications") ||
    !projectsPage.includes("https://github.com/ForgeWireLabs/Flink")) fail("Flink must remain linked to its organization repository.");
if (!projectsPage.includes("Private development")) fail("Private development status is missing.");
if (!/No packaged installer is listed/i.test(projectsPage)) fail("Workbench source-build preview limits are missing.");
if (!projectsPage.includes("not customer or production metrics")) fail("Workbench test counts must not be mistaken for production metrics.");
if (!projectsPage.includes("not learner outcomes")) fail("SkillForge sample data must not be represented as learner outcomes.");
if (!projectsPage.includes("Open the full-resolution capture")) fail("Workbench full-resolution screenshot link is missing.");
if (!projectsPage.includes("dashed boxes mark derived views")) fail("RepoPact diagram legend is missing.");
if (!projectsPage.includes("Software scope and maturity table")) fail("Software status table is missing.");

const homePage = await readFile(path.join(outputRoot, "index.html"), "utf8");
if (!homePage.includes('<h1 id="hero-title"><span>Systems first.</span> <em>Models second.</em></h1>')) fail("Homepage title phrases must remain intentionally balanced on separate lines.");
for (const phrase of ["Systems first.", "Models second.", "A model can produce an answer.", "Constraints are part of the design.",
                      "ForgeWire", "Fabric", "released CLI package at version 3.1.3"]) {
  if (!homePage.includes(phrase)) fail("Homepage is missing current organizational copy: " + phrase);
}
for (const question of ["What can run on the hardware available?", "What can we replace without rebuilding?",
                        "What works when a connection fails?", "What changes between machines?",
                        "Who can act, approve, or stop the work?", "What can someone else verify?"]) {
  if (!homePage.includes(question)) fail("Homepage's six-question framework is missing: " + question);
}
if (!homePage.includes("/assets/labs-neural-masthead.webp") ||
    !homePage.includes("Blue branching neural structures with amber contact points.")) fail("Approved shared neural masthead or alt text is missing.");
if (homePage.includes("forgewire-projects-workspace.png") || homePage.includes("labs-connected-network.webp")) fail("Homepage must not substitute product screenshots or Our Work imagery for its approved masthead.");
if (homePage.includes("not a system diagram") || homePage.includes("not a shared product architecture") ||
    homePage.includes("not an application release")) fail("Homepage should not be dominated by defensive disclaimers.");

if (!projectsPage.includes("Models provide inference; the surrounding system manages context")) fail("ForgeWire software description lost the runtime distinction.");
if (!projectsPage.includes("Authentication and policy belong in the infrastructure")) fail("Fabric description lost the execution authentication boundary.");
if (!projectsPage.includes("not a public service or supported deployment")) fail("Fabric public availability limits must remain visible.");

const engineeringPage = await readFile(path.join(outputRoot, "engineering", "index.html"), "utf8");
for (const phrase of ["The hard problems live", "Current investigations", "Questions we're working through.",
                      "ForgeWire · private development", "Fabric · private development", "Rust engine",
                      "single-writer JSON", "RP Proving Grounds", "pins RepoPact 3.0.2", "Core 3.1.3",
                      "not an architecture shared by every ForgeWire Labs project"]) {
  if (!engineeringPage.includes(phrase)) fail("Research & Engineering page lost required context: " + phrase);
}
if (engineeringPage.includes("This page separates questions") || engineeringPage.includes("not published findings") ||
    engineeringPage.includes("not claims of completed research")) fail("Research & Engineering should not read as an external audit.");

const workPage = await readFile(path.join(outputRoot, "work", "index.html"), "utf8");
for (const phrase of ["Different problems.", "Intelligent systems", "Distributed computing and execution infrastructure",
                      "Developer and repository infrastructure", "Systems integration and local software",
                      "Applied technical education", "How we make decisions."]) {
  if (!workPage.includes(phrase)) fail("Our Work page is missing its current editorial structure: " + phrase);
}
if (!workPage.includes("/assets/labs-connected-network.webp") ||
    !workPage.includes("Separate systems. Common engineering principles.")) fail("Our Work image or approved caption is missing.");
const aboutPage = await readFile(path.join(outputRoot, "about", "index.html"), "utf8");
if (!aboutPage.includes("ForgeWire Labs is independent engineering and research") || !aboutPage.includes("We began with agent-driven software") || !aboutPage.includes("Use what works.")) fail("About page must speak in an in-house organizational voice.");
if (/Jeremy Shows|founder|race-car builder|small-business owner|substantial help from AI systems|id="founder-title"/i.test(aboutPage)) fail("About page must not contain a founder biography or founder-led organization language.");
for (const phrase of ["General correspondence", "Software questions", "Security reports", "contact@forgewirelabs.com", "support@forgewirelabs.com", "Private reporting routes are available for these projects", "Do not post vulnerability details in public Issues."]) {
  if (!aboutPage.includes(phrase)) fail(`About page is missing the contact status or route “${phrase}”.`);
}
const expectedContactAddresses = new Set(["contact@forgewirelabs.com", "support@forgewirelabs.com"]);
if (contactChannels.length !== expectedContactAddresses.size || contactChannels.some((channel) => !expectedContactAddresses.has(channel.address))) {
  fail("Visitor-facing contact data must contain only the general and software .com mailboxes.");
}
for (const channel of contactChannels) {
  if (!channel.verified || !aboutPage.includes(channel.address)) fail(`Approved visitor-facing contact address ${channel.address} must be present and active.`);
  const escapedAddress = channel.address.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mailtoPattern = new RegExp(`<a\\b[^>]*href="mailto:${escapedAddress}"`, "i");
  if (!mailtoPattern.test(aboutPage)) fail(`Approved visitor-facing contact address ${channel.address} must have a mailto link.`);
}
if (aboutPage.includes("security@forgewirelabs.com") || /MFA|SPF, DKIM, and DMARC|controlled send and reply|privacy review pending/i.test(aboutPage)) fail("About page exposes security mailbox or operational verification details.");
for (const privateRoute of ["https://github.com/ForgeWireLabs/repopact-core/security/advisories/new", "https://github.com/ForgeWireLabs/repopact-workbench/security/advisories/new"]) {
  if (!aboutPage.includes(privateRoute)) fail(`About page is missing verified private reporting route ${privateRoute}.`);
}
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
if (/\.masthead-brandbar\b|\.header-inner--masthead\b/.test(css)) fail("Obsolete split masthead and centered-navigation styles must not remain.");
if (!/\.neural-masthead\s*\{[^}]*width:\s*100%;[^}]*height:\s*clamp\(130px,\s*18vw,\s*260px\);[^}]*margin:\s*0;/s.test(css)) fail("Shared neural masthead must stay full-width, panoramic, and gap-free.");
if (!/\.neural-masthead img\s*\{[^}]*object-fit:\s*cover;/.test(css) || !css.includes(".neural-masthead img { object-position: left 58%; }")) fail("Neural image crop must preserve the artwork on narrow screens.");
const responsiveRules = [
  "--type-page: clamp(2.25rem, calc(3.5vw + 1.25rem), 4.25rem);",
  "--type-section: clamp(1.75rem, calc(2.6vw + 1.1rem), 2.75rem);",
  "--type-product: clamp(1.875rem, calc(2.5vw + 1.125rem), 3rem);",
  "--type-card: clamp(1.125rem, calc(.55vw + 1rem), 1.375rem);",
  "font-size: clamp(1rem, calc(.13vw + .95rem), 1.0625rem);",
  "h1 { font-size: var(--type-page);",
  "h3 { font-size: var(--type-card);",
  ".spread-heading h2, .planning-entry h2, .communication-copy h2, .learning-copy h2 { font-size: var(--type-product); }",
  ".condition-list li { grid-template-columns: 27px minmax(0, 1fr);",
  ".condition-question { grid-column: 2; }",
  ".work-visual figcaption { position: static;",
  ".evidence-cards article:last-child { grid-column: 1 / -1; width: calc((100% - 16px) / 2); justify-self: center; }",
  ".evidence-cards article:last-child { grid-column: auto; width: auto; justify-self: stretch; }",
];
for (const rule of responsiveRules) if (!css.includes(rule)) fail(`Responsive regression rule is missing: ${rule}`);
if (/\.hero-copy h1[^{}]*\{[^}]*font-size:/i.test(css) || /\.page-lead h1[^{}]*\{[^}]*font-size:/i.test(css)) {
  fail("Page-heading font size must use the shared fluid scale instead of breakpoint overrides.");
}
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
