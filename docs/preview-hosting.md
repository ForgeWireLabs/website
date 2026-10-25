# Temporary public design-review preview

**Purpose:** Let reviewers inspect the current prototype over HTTPS while the production host, visual direction, and copy remain under review.

## Host and URL

- Preview URL: `https://forgewirelabs.github.io/website/`
- Platform: GitHub Pages, publishing the root of the `website-preview` artifact branch in the public `ForgeWireLabs/website` repository.
- Source commit used for the preview build: `407d74c6b7553afc715298266ecc7fe761257128`.
- Published artifact commit: `9b66735d6d0c61f2b8d6cebe5ab6b35739b1a643`.
- Production remains intended for the existing IONOS Web Hosting Plus contract. No custom domain, IONOS domain assignment, production DNS, CDN, or hosting credentials are used by this preview.
- The artifact branch contains only generated HTML, CSS, SVG/PNG assets, `robots.txt`, `sitemap.xml`, and `.nojekyll`. It does not include source code, source maps, `node_modules`, local configuration, or internal documentation.

## Preview-only behavior

`npm run build:preview` writes `_preview/` with the `/website/` path prefix, a visible “Development preview” label, and `<meta name="robots" content="noindex, nofollow">` on every page. Its `robots.txt` does not advertise a sitemap. The production build remains separate in `_site/` and does not include the preview label or noindex metadata.

The public URL is intentionally accessible without authentication. `noindex` asks compliant search engines not to index the pages; it is not access control and cannot prevent people from viewing or copying the public content. The preview only contains material already approved for the public prototype.

## Rebuild and verify

From a clean checkout of the source branch:

```powershell
npm ci
npm run build:preview
npm run verify:preview
```

Publish the contents of `_preview/` to the root of `website-preview`, including a `.nojekyll` file. Do not copy the source repository, `docs/`, `.git/`, `node_modules/`, or environment files to the artifact branch.

## Remove after review

1. In the repository, open **Settings → Pages** and change the publishing source to **None** (or delete the Pages site using the repository Pages API).
2. Delete the artifact branch `website-preview` from the repository.
3. Verify that `https://forgewirelabs.github.io/website/` no longer serves the preview.

This removes the preview without changing PR #1, the production domain, DNS, or IONOS hosting. Do not remove the artifact branch while the Pages site should remain available for review.

## Why this host

Classic IONOS webspace has no verified generated preview hostname in the supplied account evidence; connecting a domain to a webspace directory would involve domain configuration. IONOS Deploy Now does provide generated HTTPS staging URLs, but its published membership/project pricing can introduce recurring costs. GitHub Pages provides a generated HTTPS URL for this public repository without custom DNS or additional paid hosting, making it the least disruptive temporary option.
