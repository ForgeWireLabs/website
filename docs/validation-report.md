# Validation report

**Status:** Local production, staging build, and public preview checks pass. No production host or DNS validation has been performed.

## Planned local checks

- Install from the committed lockfile with `npm ci`.
- Build using `npm run build`.
- Run the local smoke/link/metadata checks using `npm run verify`.
- Build the staging artifact using `npm run build:preview` and validate it using `npm run verify:preview`.
- Review desktop and narrow/mobile layouts in a local browser.
- Inspect keyboard navigation, focus visibility, headings, image alternatives, and reduced-motion behavior.
- Check for external scripts, forms, analytics, tracking pixels, and non-local fonts.

## Results

- `npm ci --no-audit --no-fund` completed from the lockfile.
- `npm run build` completed with Eleventy 3.1.7. Output includes four HTML pages, `robots.txt`, `sitemap.xml`, and local assets.
- `npm run verify` passed: page metadata, one `h1` per page, local references, expected project records, image alternatives, and no script/form/remote asset embeds.
- `npm run build:preview` and `npm run verify:preview` passed. All four staging pages use the GitHub Pages `/website/` path prefix, point canonicals to the preview host, show the development-preview label, and include `noindex, nofollow`. The preview robots file omits a sitemap; preview output contains no source maps or environment files.
- The preview is publicly available at `https://forgewirelabs.github.io/website/` from GitHub Pages. GitHub reports the branch build as `built` and HTTPS enforcement as enabled. The source revision is `407d74c6b7553afc715298266ecc7fe761257128`; the artifact branch commit is `9b66735d6d0c61f2b8d6cebe5ab6b35739b1a643`.
- Independent HTTPS requests returned 200 for all four pages, the stylesheet, favicon, and project diagrams. TLS verification succeeded (`curl` certificate verify result 0). All four pages returned the preview label, the `noindex, nofollow` meta directive, and canonical URLs on the preview host.
- Public browser navigation reached Projects, Engineering, and About through the deployed navigation. At 390 px and 1280 px viewport widths, document scroll width remained within the viewport; the stylesheet loaded, there were no script tags or remote stylesheets, and the homepage browser check reported no console errors.
- Requests for the README, package manifest, internal hosting documentation, `.env`, `.git/config`, and source-map paths returned 404 from the Pages host. The artifact branch contains only static output and `.nojekyll`/Git attributes.
- `npm audit` reported zero known vulnerabilities in the dependency tree at validation time.
- Browser review covered the homepage at 1280×720 and all four pages at 390×844. The pages had no horizontal overflow. The navigation and headings appeared correctly in the browser accessibility tree. On mobile, the RepoPact diagram gives way to a readable ordered list of its stages.
- The preview server returned HTTP 200 for all four page routes, CSS, `robots.txt`, and `sitemap.xml`. The listening address was `127.0.0.1`. It adds local-only security headers and has no external runtime service.
- Spot-checked contrast ratios meet 4.5:1 for normal text in the palette: primary teal on paper is 4.74:1, muted body text on paper is 5.29:1, and the small project-group label on white cards is 5.26:1.

The manual accessibility review is not a substitute for assistive-technology testing by the owner or intended users. No production-domain or IONOS response validation was performed.

## Not covered

- IONOS upload, domain assignment, SSL activation, DNS, CDN, or production headers.
- Legal/privacy review or security contact verification.
- Production-browser behavior or search engine indexing.
