# ForgeWire Labs website

Source for the local static website prototype for [ForgeWire Labs](https://github.com/ForgeWireLabs). The intended production host is the existing IONOS Web Hosting Plus contract. This repository does not configure hosting, DNS, CDN, or deployment credentials.

The initial visual direction is submitted for review. Project availability is labelled from the current public organization profile and project repositories; private development is not presented as a public product.

## Local workflow

Requirements: Node.js 20 or newer and npm.

```powershell
npm ci
npm run build
npm run verify
npm run serve
```

Eleventy writes the static output to `_site/`. Run `npm run build` and `npm run verify` before `npm run serve`; the lightweight preview server binds only to `127.0.0.1` and is for local review. Production hosting needs only the generated static files; it does not need Node.js.

## Project records and sources

Portfolio copy lives in `src/_data/projects.json`. Update its descriptions and maturity labels only after checking the linked source repository or release. The website keeps product identities separate and labels ForgeLink as a related project maintained under JeremyShows.

The profile repository's unpublished writing drafts are intentionally not imported. See [content sources](docs/content-sources.md).

## Decisions and operations

- [Architecture decision record](docs/adr/0001-static-site-on-ionos.md)
- [IONOS capability and cost assessment](docs/hosting-assessment.md)
- [Deployment procedure](docs/deployment-runbook.md)
- [Validation report](docs/validation-report.md)
- [Review checklist](docs/review-checklist.md)

## Safety boundary

Do not upload `_site/`, connect the domain, change DNS, activate a CDN, or configure hosting credentials until Jeremy approves the reviewed design and deployment. The production site is not published by this repository.
