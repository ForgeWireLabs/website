# Website redesign validation report

**Date:** 2026-10-25
**Status:** Candidate preview validated; production deployment remains out of scope.

## Build and static checks

The following commands passed against the redesign:

```text
npm run build
npm run verify
npm run build:preview
npm run verify:preview
git diff --check
```

The production build and staging build remain separate. The staging output contains the review banner, permits indexing, and advertises its sitemap. The source verifier checks all four rendered pages, local links and assets, metadata, image alt attributes, release and ownership boundaries, SVG safety, and the preview path prefix.

## Browser checks

The site was opened in the supported in-app browser from the local preview server. All four routes (`/`, `/projects/`, `/engineering/`, `/about/`) were inspected at 1280px, 768px, and 390px viewport widths.

- No route had horizontal overflow; each route had exactly one `h1`.
- Every rendered image had an `alt` attribute. RepoPact Core, Workbench, ForgeLink, and SkillForge visuals loaded, including the project page's lazy-loaded SkillForge screenshot after scrolling.
- The local stylesheet loaded on every route; the site makes no browser-side JavaScript requests.
- Keyboard Tab focused the visible skip link with `:focus-visible`; activating the Projects navigation link reached `/projects/`.
- The browser console reported no warnings or errors.
- Desktop and mobile review captures were saved outside the repository under the task's visualization directory.

## Public staging verification

- Published source revision: `a12eb75d0af64c57e24dd4d06e14e9b14c632156`.
- Pages artifact revision: `ad4e066fb0a9434fc53444d2dcae00faeefd99d0`; the published response contains that revision's indexing directive and sitemap, with HTTPS enforced and no custom-domain binding.
- URL: [https://forgewirelabs.github.io/website/](https://forgewirelabs.github.io/website/). An independent HTTPS request returned HTTP 200; `curl` reported TLS certificate verification result `0`.
- `/`, `/projects/`, `/engineering/`, `/about/`, `robots.txt`, the sitemap, stylesheet, favicon, and each displayed project image returned HTTP 200. All four HTML pages contain the temporary preview label and explicit `index, follow` metadata. `robots.txt` permits crawling and advertises the preview sitemap. Independent `curl` checks reported TLS verification result `0` on the pages and static resources.
- Public browser navigation from Projects to Engineering and About succeeded. The public images loaded after scrolling; the browser console had no warnings or errors.
- Requests for `/.env`, `/package-lock.json`, `/src/index.njk`, `/docs/`, `/.git/HEAD`, `/scripts/verify-site.mjs`, and `/node_modules/` returned 404.
- The public browser screenshots use a revision query solely to bypass its cached earlier copy; the canonical preview URL remains the one above.
- The public repository's existing Pages service was used without adding an Actions workflow, paid add-on, or custom-domain setting. The preview is an organization/project showcase with no transactions, account flow, form, or hosted SaaS behavior; it remains a temporary review host. GitHub's Pages terms and usage limits are summarized in [preview-hosting.md](preview-hosting.md).

The public preview is explicitly a development-review candidate. It has no access control and can appear in search results; this report does not approve the visual direction for production. Search and AI crawlers may take time to discover the sitemap and update their results. The web-reading tool used in this review could not fetch the page directly, though the in-app browser rendered it and independent HTTPS requests succeeded; share the public URL directly when a reader cannot discover it through search.
