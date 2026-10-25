# ForgeWire Labs website

Source for the static website prototype for [ForgeWire Labs](https://github.com/ForgeWireLabs). The intended production host is the existing IONOS Web Hosting Plus contract. A temporary design-review preview is published separately from the `website-preview` artifact branch on GitHub Pages; this does not configure the production domain or DNS.

The initial visual direction is submitted for review. Project availability is labelled from the current public organization profile and project repositories; private development is not presented as a public product.

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

Eleventy writes the production output to `_site/`. The staging build writes to `_preview/`, adds a temporary review label and `noindex` metadata, and prefixes internal paths for the GitHub Pages project URL. Run `npm run build:preview` and `npm run verify:preview` to prepare that artifact. Run `npm run build` and `npm run verify` before `npm run serve`; the lightweight local preview server binds only to `127.0.0.1`. Production hosting needs only the generated static files; it does not need Node.js.

## Project records and sources

Portfolio copy lives in `src/_data/projects.json`. Update its descriptions and maturity labels only after checking the linked source repository or release. The website keeps product identities separate and labels ForgeLink as a related project maintained under JeremyShows.

The profile repository's unpublished writing drafts are intentionally not imported. See [content sources](docs/content-sources.md).

## Decisions and operations

- [Architecture decision record](docs/adr/0001-static-site-on-ionos.md)
- [IONOS capability and cost assessment](docs/hosting-assessment.md)
- [Deployment procedure](docs/deployment-runbook.md)
- [Temporary preview hosting and removal](docs/preview-hosting.md)
- [Validation report](docs/validation-report.md)
- [Review checklist](docs/review-checklist.md)

## Safety boundary

The temporary GitHub Pages preview is published from generated files in a separate artifact branch. Do not connect `forgewirelabs.com`, change production DNS, activate a CDN, or configure IONOS hosting credentials until Jeremy approves the reviewed design and production deployment.
