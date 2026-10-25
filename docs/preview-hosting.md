# Temporary public design-review preview

**Purpose:** let reviewers inspect the current prototype over HTTPS while production hosting, visual direction, and copy remain under review.

## Host and URL

- Preview URL: `https://forgewirelabs.github.io/website/`
- Platform: GitHub Pages, publishing the root of the `website-preview` artifact branch in the public `ForgeWireLabs/website` repository.
- The current source and artifact revisions are recorded after deployment in this file and in `validation-report.md`.
- Production remains intended for the existing IONOS Web Hosting Plus contract. No custom domain, IONOS domain assignment, production DNS, CDN activation, or hosting credentials are used by this preview.
- The artifact contains generated HTML, CSS, SVG, PNG, JPEG, review screenshots, `robots.txt`, `sitemap.xml`, `.nojekyll`, and its line-ending attributes file. It excludes source code, source maps, `node_modules`, local configuration, and internal documentation.

## Preview-only behavior

`npm run build:preview` writes `_preview/` with the `/website/` path prefix and a visible “Development preview” label. Every page carries `<meta name="robots" content="noindex, nofollow">`. Preview `robots.txt` does not advertise a sitemap and the generated preview sitemap contains no URLs. The direct HTTPS URL is still public and requires no authentication; `noindex` discourages search indexing but is not access control and does not guarantee that every search or reading tool will discover the page.

The production build remains separate in `_site/`: it uses `forgewirelabs.com` canonical and social URLs, omits preview metadata, and generates a four-route sitemap advertised in production `robots.txt`.

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

Publish the contents of `_preview/` to the root of `website-preview`, including a `.nojekyll` file. Store visual review captures only under `review-captures/` on that artifact branch. Do not copy the source repository, `docs/`, `.git/`, `node_modules/`, source maps, or environment files to the artifact branch.

## Remove after review

1. In the repository, open **Settings → Pages** and change the publishing source to **None** (or delete the Pages site using the repository Pages API).
2. Delete the artifact branch `website-preview` from the repository.
3. Verify that `https://forgewirelabs.github.io/website/` and the review-capture links no longer serve content.

This removes the preview without changing PR #1, the production domain, DNS, or IONOS hosting. Do not remove the artifact branch while the preview should remain available for review.

## Why this host

Classic IONOS webspace has no verified generated preview hostname in the supplied account evidence; connecting a domain to a webspace directory would involve domain configuration. IONOS Deploy Now can provide generated HTTPS staging URLs, but its plan and project pricing can introduce recurring costs. GitHub Pages provides a generated HTTPS URL for this public repository without custom DNS or additional paid hosting, making it the least disruptive temporary option.

GitHub documents Pages availability for public repositories on GitHub Free for organizations and describes it as a showcase for an organization or project. Pages is not intended for running an online business, e-commerce, or commercial SaaS. This preview is a static organization/project showcase for design review; it has no checkout, account flow, data collection form, or hosted product service. Keep it temporary and limited to review. Production remains intended for IONOS.

No GitHub Actions workflow or paid add-on was introduced. GitHub's current Pages limits include a 1 GB published-site size and a soft 100 GB monthly bandwidth limit. References: [Pages availability and purpose](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Pages terms](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features), and [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
