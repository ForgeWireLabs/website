import { createHash } from "node:crypto";
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
  "assets/homepage-carousel.js",
  "assets/homepage-narrative/01_systems_first_models_second.webp",
  "assets/homepage-narrative/02_world_beyond_the_prompt.webp",
  "assets/homepage-narrative/03_intelligence_needs_infrastructure.webp",
  "assets/homepage-narrative/04_build_the_missing_pieces.webp",
  "assets/labs-neural-masthead.webp",
  "assets/labs-connected-network.webp",
  "assets/labs-connected-network-rotated.svg",
];

const approvedSlideAssets = [
  ["01_systems_first_models_second.png", "261386afd628c86a61a57868576b508a7293be6068c0d2276edce636d099ceb3", "01_systems_first_models_second.webp", "6cc3fabee43032b3a5fc052c944ee8f438d99f2e78e4cf7b52b35df4982c6140"],
  ["02_world_beyond_the_prompt.png", "09a0c3fd642057bdf70230b2a270fb9687af269c42070dd8ebf901db8c6e257a", "02_world_beyond_the_prompt.webp", "e3ebff5995a56a0747dc8eb8b71aad1dec0ed994c4ddfa68a0e51a649ba18d88"],
  ["03_intelligence_needs_infrastructure.png", "dd93094ce34dce2bf9d66916a1b3b73b6462fe82deef5e7849df47814c61d6fc", "03_intelligence_needs_infrastructure.webp", "4c7e943220baef629e31b0f432dc1f3f39975282a7a09601e3716bd5a603c6ba"],
  ["04_build_the_missing_pieces.png", "e046c820b160ce3abc3764b8be291d9168659acb1a2798185dae453e27150229", "04_build_the_missing_pieces.webp", "0054730ae4797b46ccd6649bda4847e46fb43bfe00d77bd3ba6eb43a677cdf06"],
];

for (const [sourceName, sourceHash, publicName, publicHash] of approvedSlideAssets) {
  const sourceBytes = await readFile(path.resolve("artwork", "homepage-slides-original", sourceName));
  const publicBytes = await readFile(path.join(outputRoot, "assets", "homepage-narrative", publicName));
  if (createHash("sha256").update(sourceBytes).digest("hex") !== sourceHash) fail(`Approved source artwork hash changed: ${sourceName}.`);
  if (createHash("sha256").update(publicBytes).digest("hex") !== publicHash) fail(`Approved WebP slide asset changed: ${publicName}.`);
}

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
if (files.some((file) => approvedSlideAssets.some(([sourceName]) => path.basename(file) === sourceName))) {
  fail("Full-resolution source slide PNGs must remain in the artwork archive, outside generated website output.");
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
      !html.includes(`<img src="${mastheadPath}" alt="ForgeWire Labs — Independent engineering &amp; applied AI. A blue neural network with amber contact points."`)) {
    fail(`${label}: expected exactly one shared neural masthead with its accessible alternative.`);
  }
  if (html.includes('masthead-brandbar')) fail(`${label}: redundant masthead brand bar must not be present.`);
  if (headerMatches.length !== 1) fail(`${label}: expected exactly one shared site header.`);
  if (mainMatches.length !== 1) fail(`${label}: expected exactly one main content region.`);
  if (!(mastheadStart >= 0 && mastheadEnd > mastheadStart && headerStart >= mastheadEnd && headerEnd > headerStart && mainStart >= headerEnd)) {
    fail(`${label}: required order is neural masthead, complete header, then main content.`);
  }
  const header = headerMatches[0]?.[0] ?? "";
  if (/class="(?:wordmark|brand-copy)"/.test(header) || header.includes("ForgeWire Labs") ||
      (header.match(/<nav\b/g) ?? []).length !== 1 || !header.includes('<nav aria-label="Main navigation">')) {
    fail(`${label}: the shared header should contain centered navigation without a duplicate wordmark.`);
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
  const scriptTags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  if (scriptTags.some(([, attributes, body]) => !/\bsrc="[^"]+"/i.test(attributes) || body.trim())) {
    fail(`${label}: scripts must be empty external references with no inline code.`);
  }
  const carouselScriptUrl = `${previewPathPrefix}/assets/homepage-carousel.js?v=${site.assetVersion}`;
  if (route === "/" && (scriptTags.length !== 1 || !html.includes(`<script src="${carouselScriptUrl}" defer></script>`))) {
    fail(`${label}: homepage must load exactly one versioned local carousel script.`);
  }
  if (route !== "/" && scriptTags.length !== 0) {
    fail(`${label}: the carousel script must not be loaded on other pages.`);
  }
  if (/\son[a-z]+\s*=|<form\b|<iframe\b|javascript:/i.test(html)) {
    fail(`${label}: found an inline handler, form, iframe, or executable URL.`);
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
const homeSlideCount = [...homePage.matchAll(/\bdata-slide(?=\s|>)/g)].length;
if (homeSlideCount !== 4) fail(`Homepage must render exactly four narrative slides, found ${homeSlideCount}.`);
if ([...homePage.matchAll(/<section\b/g)].length !== 2) fail("Homepage must contain only the narrative and static destination sections.");
if ([...homePage.matchAll(/data-home-carousel/g)].length !== 1 || [...homePage.matchAll(/data-carousel-controls/g)].length !== 1) fail("Homepage must contain exactly one carousel and its control group.");
if (!homePage.includes('<h1 class="visually-hidden" id="homepage-title">ForgeWire Labs</h1>')) fail("Homepage must provide one semantic organization heading without adding visible desktop copy.");
if (!homePage.includes('aria-roledescription="carousel"') || !homePage.includes('data-carousel-controls hidden')) fail("Homepage carousel must be named and keep controls hidden in its no-JavaScript fallback.");
if ([...homePage.matchAll(/data-carousel-slide-to=/g)].length !== 4) fail("Homepage must provide four visible slide indicators.");
if (homePage.includes("data-carousel-previous") || homePage.includes("data-carousel-next") || homePage.includes("data-carousel-toggle")) fail("Homepage must not render separate arrow or pause buttons.");
if (!homePage.includes("data-carousel-surface") || !homePage.includes('class="narrative-controls" data-carousel-controls hidden')) fail("Homepage must provide an interactive slide surface and overlay dots.");
if (homePage.includes('class="exploration-number"')) fail("Homepage exploration cards must not have decorative numbers.");
for (const phrase of [
  "Systems first. Models second.",
  "Models can write code, solve problems, and help direct complex work.",
  "The world doesn’t fit inside a prompt.",
  "Real work moves between people, repositories, tools, machines, and providers.",
  "Intelligence needs infrastructure.",
  "A model proposing an action isn’t the same as a system being authorized to perform it.",
  "So we build the missing pieces.",
  "They aren’t all one platform, and they aren’t all at the same stage of development.",
  "Explore ForgeWire Labs",
  "Research &amp; Engineering",
  "including their current availability",
  "implementation evidence behind the work",
  "engineering principles connecting the projects",
]) {
  if (!homePage.includes(phrase)) fail("Homepage is missing approved narrative or exploration content: " + phrase);
}
for (const [route, label] of [["/projects/", "Software"], ["/engineering/", "Research &amp; Engineering"], ["/work/", "Our Work"]]) {
  if (!homePage.includes(`href="${previewPathPrefix}${route}"`) || !homePage.includes(`<h3>${label}</h3>`)) fail(`Homepage exploration section is missing its ${label} destination (${route}).`);
}
for (const retiredPhrase of [
  "What can run on the hardware available?",
  "Constraints are part of the design.",
  "Two problems at the center of our research.",
  "released CLI package at version 3.1.3",
  "RepoPact Core",
  "Follow the work, not the claims.",
  "Start with the work",
]) {
  if (homePage.includes(retiredPhrase)) fail(`Homepage still contains catalog or explanatory copy that should move to the substantive pages: ${retiredPhrase}`);
}
if (!homePage.includes("/assets/labs-neural-masthead.webp") ||
    !homePage.includes("ForgeWire Labs — Independent engineering &amp; applied AI.")) fail("Original shared neural masthead or its text alternative is missing.");
if (homePage.includes("forgewire-projects-workspace.png") || homePage.includes("labs-connected-network.webp")) fail("Homepage narrative must not substitute other product or project artwork.");

const carouselScript = await readFile(path.join(outputRoot, "assets", "homepage-carousel.js"), "utf8");
if (/\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource|eval)\b|document\.write|https?:\/\//i.test(carouselScript)) {
  fail("Homepage carousel script must not make network requests, evaluate code, or load remote assets.");
}
for (const behavior of ["20_000", "30_000", "prefers-reduced-motion", "pointerdown", "pointerup", "pointercancel", "focusin", "focusout", "visibilitychange", "ArrowLeft", "ArrowRight", "relativeX", "manualAction"]) {
  if (!carouselScript.includes(behavior)) fail(`Homepage carousel behavior is missing: ${behavior}.`);
}
if (carouselScript.includes("aria-live") || carouselScript.includes("focus()")) fail("Carousel must not force announcements or move keyboard focus.");

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
for (const phrase of ["Engineering across systems,", "Where we work.", "Intelligent systems",
  "Distributed computing &amp; execution", "Developer &amp; repository infrastructure",
  "Local applications &amp; planning", "Communication &amp; coordination",
  "Technical education", "Explore the engineering."]) {
  if (!workPage.includes(phrase)) fail("Our Work page must include the six-discipline editorial structure: " + phrase);
}
if ((workPage.match(/class="work-card work-glass"/g) ?? []).length !== 6) fail("Our Work requires exactly six discipline panels.");
if (workPage.includes('class="work-card-number"')) fail("Our Work discipline cards must not have decorative numbers.");
if (!workPage.includes('/engineering/') || !workPage.includes('/projects/')) fail("Our Work must direct visitors to Engineering and Software.");
if (workPage.includes("How we make decisions.") || workPage.includes('class="work-art')) fail("Our Work must not repeat the About philosophy or standalone image section.");
const rotatedNetwork = await readFile(path.join(outputRoot, "assets", "labs-connected-network-rotated.svg"), "utf8");
if (!rotatedNetwork.includes('rotate(90)') || !rotatedNetwork.includes('data:image/webp;base64,')) fail("Our Work rotated network background is missing or incorrect.");
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
if (!/\.narrative-frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9;/s.test(css)) fail("Narrative artwork must retain its fixed desktop 16:9 frame.");
if (!/\.home-narrative\.is-enhanced \.narrative-track\s*\{[^}]*grid-template-areas:\s*"slide";[^}]*gap:\s*0;/s.test(css) ||
    !/\.home-narrative\.is-enhanced \.narrative-slide\s*\{[^}]*grid-area:\s*slide;/s.test(css)) {
  fail("Enhanced slides must share one stable frame size to prevent layout shifts during transitions.");
}
if (!css.includes("background-image: url(\"labs-connected-network-rotated.svg\");") || !css.includes("background: rgb(4 22 33 / 80%);")) fail("Our Work must retain the rotated network and translucent panels.");
if (!css.includes(".home-narrative { position: relative; width: 100%; margin: 0; }") || !css.includes("position: absolute;") || !css.includes("transform: translateX(-50%);")) fail("Homepage must use a full-width carousel and overlay navigation dots.");
if (/\.exploration-number\b|\.work-card-number\b|\.narrative-control--previous\b|\.narrative-control--toggle\b|\.narrative-control--next\b/.test(css)) fail("Retired numbering and controls styling must not remain.");
if (!css.includes(".narrative-frame img { display: block; width: 100%; height: 100%; object-fit: contain; }")) fail("Narrative slides must show the complete image within their frame.");
if (/\.narrative-frame img\s*\{[^}]*left:\s*-100%|\.narrative-frame img\s*\{[^}]*width:\s*200%|\.narrative-frame img\s*\{[^}]*object-fit:\s*cover/s.test(css)) fail("Narrative images must never be cropped by mobile-specific positioning.");
if (/\.slide-copy\.visually-hidden\s*\{/.test(css)) fail("Slide HTML copy must remain visually hidden so the supplied image artwork is not duplicated on mobile.");
if (!/\.narrative-controls\[hidden\]\s*\{\s*display:\s*none;\s*\}/.test(css)) fail("Carousel controls must remain hidden when the no-JavaScript fallback is used.");
if (/\.masthead-brandbar\b|\.header-inner--masthead\b/.test(css)) fail("Obsolete split masthead and centered-navigation styles must not remain.");
if (!/\.neural-masthead\s*\{[^}]*width:\s*100%;[^}]*margin:\s*0;/s.test(css)) fail("Shared neural masthead must stay full-width and gap-free.");
if (!css.includes(".neural-masthead img { display: block; width: 100%; height: auto; }")) fail("Original masthead must scale to the viewport without cropping.");
if (!css.includes(".nav-list { display: flex; align-items: center; justify-content: center; flex-wrap: nowrap;") || !css.includes("white-space: nowrap;")) fail("Primary navigation must remain centered on one line.");
if (!css.includes("gap: clamp(6px, 1.5vw, 8px);") || !css.includes("font-size: clamp(.66rem, 2.9vw, .72rem);")) fail("Mobile navigation labels must scale down and retain spacing on one line.");
if (files.some((file) => path.basename(file) === "labs-neural-masthead.svg")) fail("The neural masthead must use the approved original raster artwork.");
const responsiveRules = [
  "--type-page: clamp(2.25rem, calc(3.5vw + 1.25rem), 4.25rem);",
  "--type-section: clamp(1.75rem, calc(2.6vw + 1.1rem), 2.75rem);",
  "--type-product: clamp(1.875rem, calc(2.5vw + 1.125rem), 3rem);",
  "--type-card: clamp(1.125rem, calc(.55vw + 1rem), 1.375rem);",
  "font-size: clamp(1rem, calc(.13vw + .95rem), 1.0625rem);",
  "h1 { font-size: var(--type-page);",
  "h3 { font-size: var(--type-card);",
  ".spread-heading h2, .planning-entry h2, .communication-copy h2, .learning-copy h2 { font-size: var(--type-product); }",
  ".work-card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));" ,
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
