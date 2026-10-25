# Temporary public design-review preview

**Purpose:** Let reviewers inspect the current prototype over HTTPS while the production host, visual direction, and copy remain under review.

## Host and URL

- Preview URL: `https://forgewirelabs.github.io/website/`
- Platform: GitHub Pages, publishing the root of the `website-preview` artifact branch in the public `ForgeWireLabs/website` repository.
- Source commit used for the latest preview build: `a12eb75d0af64c57e24dd4d06e14e9b14c632156`.
- Published artifact commit: `ad4e066fb0a9434fc53444d2dcae00faeefd99d0`.
- Production remains intended for the existing IONOS Web Hosting Plus contract. No custom domain, IONOS domain assignment, production DNS, CDN, or hosting credentials are used by this preview.
- The artifact branch contains generated HTML, CSS, SVG, PNG, and JPEG assets, `robots.txt`, `sitemap.xml`, `.nojekyll`, and its line-ending attributes file. It does not include source code, source maps, `node_modules`, local configuration, or internal documentation.

## Preview-only behavior

`npm run build:preview` writes `_preview/` with the `/website/` path prefix, a visible “Development preview” label, `<meta name="robots" content="index, follow">` on every page, and a sitemap advertised in `robots.txt`. This allows search engines to discover the publicly accessible review copy. Search indexing can take time and does not guarantee discovery by every search or AI tool. The production build remains separate in `_site/` and does not include the preview label or preview indexing metadata.

The public URL is intentionally accessible without authentication and can be indexed. The preview only contains material already approved for the public prototype. The development label identifies the review copy; it is not access control and cannot prevent people from viewing or copying the public content.

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

GitHub documents Pages availability for public repositories on GitHub Free for organizations and describes it as a showcase for an organization or project. Pages is not intended for running an online business, e-commerce, or commercial SaaS. This preview is a static organization/project showcase for design review; it has no checkout, account flow, data collection form, or hosted product service. Keep this Pages deployment temporary and limited to review. Production remains intended for IONOS.

No GitHub Actions workflow or paid add-on was introduced. GitHub's current Pages limits include a 1 GB published-site size and a soft 100 GB monthly bandwidth limit. References: [Pages availability and purpose](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Pages terms](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features), and [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
