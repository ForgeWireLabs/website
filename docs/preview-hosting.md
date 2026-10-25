# Temporary public design-review preview

**Purpose:** allow reviewers to inspect the static organization-first candidate over HTTPS. This is a public staging preview, not a production launch.

## Host and provenance

- URL: `https://forgewirelabs.github.io/website/`
- Host: GitHub Pages publishes the root of the `website-preview` artifact branch in the public `ForgeWireLabs/website` repository.
- Website source revision used for the current published build: `b55e039c72e08493b3d47cbad68554e2af073871`.
- Artifact branch commit that publishes it: `05105f4f3479dd282850e0ff4fa55caf6720103c`.
- The artifact contains only generated static files, `.nojekyll`, and this branch's Git attributes file. It does not contain website source, source maps, `node_modules`, environment files, credentials, or internal documentation.
- No desktop or mobile browser screenshots are supplied for this revision. The earlier screenshots depict an obsolete homepage and must not be used to review the current candidate.
- Production remains intended for the existing IONOS Web Hosting Plus contract. The preview uses no custom domain, IONOS binding, production DNS, CDN activation, hosting credential, paid service, or production configuration.

## Preview-only behavior

`npm run build:preview` writes `_preview/` with the `/website/` base path and a visible **Development preview** label. Every page sets `noindex, nofollow`. Preview `robots.txt` does not advertise a sitemap, and the generated staging sitemap contains no page URLs. The HTTPS URL is still public and requires no authentication. `noindex` discourages indexing; it is not access control and cannot guarantee that every search or reading tool will discover the page.

Production output is separate in `_site/`: canonicals point to `https://forgewirelabs.com`, preview directives are absent, and the five-route sitemap is advertised in production `robots.txt`.

## Rebuild and verify

From a clean checkout of the source branch:

```powershell
npm ci
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm audit --audit-level=high
```

Publish the contents of `_preview/` to the root of `website-preview`, including `.nojekyll`. Keep generated artifacts separate from the source branch. Do not copy the source repository, `docs/`, `.git/`, `node_modules/`, source maps, environment files, or local review screenshots into the artifact branch. Record the source revision in the artifact commit message.

## Remove after review

1. In repository Settings → Pages, change the publishing source to **None** (or delete the Pages site using the repository Pages API).
2. Delete the `website-preview` artifact branch.
3. Verify that `https://forgewirelabs.github.io/website/` no longer serves the preview.

This removes the preview without changing PR #1, the production domain, DNS, or IONOS. Do not remove the artifact branch while the preview is still needed for review.

## Why this host

Classic IONOS webspace does not have a verified generated preview hostname in the available account evidence; binding a domain to a directory would require account/domain configuration. IONOS Deploy Now may introduce recurring costs. GitHub Pages provides the already-approved generated HTTPS project URL from the existing public repository without custom DNS or an added hosting purchase. Keep it temporary and limited to review. Production remains intended for IONOS.
