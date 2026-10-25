# ForgeWire Labs website

Source for the static ForgeWire Labs website. The current redesign is a public design-review candidate, not a production launch. The intended production host remains the existing IONOS Web Hosting Plus contract; the temporary review build is served from a separate GitHub Pages artifact branch.

## Local workflow

Requirements: Node.js 20 or newer and npm.

```powershell
npm ci
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm run serve
```

Eleventy writes the production output to `_site/`. The staging build writes to `_preview/`, adds a temporary review label and `noindex` metadata, and prefixes internal paths for `https://forgewirelabs.github.io/website/`. Run `npm run build` and `npm run verify` before `npm run serve`; the lightweight preview server binds only to `127.0.0.1`. Production hosting needs only the generated static files; it does not need Node.js.

## Project records and sources

Portfolio copy and maturity labels live in `src/_data/projects.json`. They are checked against each linked repository's public README or release page. ForgeLink is maintained under JeremyShows, outside the ForgeWire Labs organization. Private development is not presented as a download or supported release.

Verified diagrams and screenshots are described in [content sources](docs/content-sources.md). The new visual direction and information architecture are summarized in the [design review note](docs/design-review.md). Unpublished writing drafts are not imported.

## Decisions and operations

- [Architecture decision record](docs/adr/0001-static-site-on-ionos.md)
- [IONOS capability and cost assessment](docs/hosting-assessment.md)
- [Deployment procedure](docs/deployment-runbook.md)
- [Temporary preview hosting and removal](docs/preview-hosting.md)
- [Validation report](docs/validation-report.md)
- [Review checklist](docs/review-checklist.md)

## Safety boundary

The temporary GitHub Pages preview is published from generated files in the separate `website-preview` artifact branch. The artifact contains generated HTML, CSS, SVG, PNG, and JPEG assets, `robots.txt`, `sitemap.xml`, and `.nojekyll`; it excludes source code and internal documentation. Do not connect `forgewirelabs.com`, change production DNS, activate a CDN, or configure IONOS hosting credentials until Jeremy and ChatGPT approve the final design and production deployment.
