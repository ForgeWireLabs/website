# Validation report

**Status:** Local prototype validation complete. No production host or DNS validation has been performed.

## Planned local checks

- Install from the committed lockfile with `npm ci`.
- Build using `npm run build`.
- Run the local smoke/link/metadata checks using `npm run verify`.
- Review desktop and narrow/mobile layouts in a local browser.
- Inspect keyboard navigation, focus visibility, headings, image alternatives, and reduced-motion behavior.
- Check for external scripts, forms, analytics, tracking pixels, and non-local fonts.

## Results

- `npm ci --no-audit --no-fund` completed from the lockfile.
- `npm run build` completed with Eleventy 3.1.7. Output includes four HTML pages, `robots.txt`, `sitemap.xml`, and local assets.
- `npm run verify` passed: page metadata, one `h1` per page, local references, expected project records, image alternatives, and no script/form/remote asset embeds.
- `npm audit` reported zero known vulnerabilities in the dependency tree at validation time.
- Browser review covered the homepage at 1280×720 and all four pages at 390×844. The pages had no horizontal overflow. The navigation and headings appeared correctly in the browser accessibility tree. On mobile, the RepoPact diagram gives way to a readable ordered list of its stages.
- The preview server returned HTTP 200 for all four page routes, CSS, `robots.txt`, and `sitemap.xml`. The listening address was `127.0.0.1`. It adds local-only security headers and has no external runtime service.
- Spot-checked contrast ratios meet 4.5:1 for normal text in the palette: primary teal on paper is 4.74:1, muted body text on paper is 5.29:1, and the small project-group label on white cards is 5.26:1.

The manual accessibility review is not a substitute for assistive-technology testing by the owner or intended users. No production-domain or IONOS response validation was performed.

## Not covered

- IONOS upload, domain assignment, SSL activation, DNS, CDN, or production headers.
- Legal/privacy review or security contact verification.
- Production-browser behavior or search engine indexing.
