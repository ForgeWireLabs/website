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

The production build and staging build remain separate. The staging output contains the review banner and `noindex, nofollow` metadata. The source verifier checks all four rendered pages, local links and assets, metadata, image alt attributes, release and ownership boundaries, SVG safety, and the preview path prefix.

## Browser checks

The site was opened in the supported in-app browser from the local preview server. All four routes (`/`, `/projects/`, `/engineering/`, `/about/`) were inspected at 1280px, 768px, and 390px viewport widths.

- No route had horizontal overflow; each route had exactly one `h1`.
- Every rendered image had an `alt` attribute. RepoPact Core, Workbench, ForgeLink, and SkillForge visuals loaded, including the project page's lazy-loaded SkillForge screenshot after scrolling.
- The local stylesheet loaded on every route; the site makes no browser-side JavaScript requests.
- Keyboard Tab focused the visible skip link with `:focus-visible`; activating the Projects navigation link reached `/projects/`.
- The browser console reported no warnings or errors.
- Desktop and mobile review captures were saved outside the repository under the task's visualization directory.

## Public staging verification

- Published source revision: `eda59d5488dc50823a5a72b6dc97cac55a735807`.
- Pages artifact revision: `21282a5ce61dc766dfb319c97eadba6cabb69d4c`; GitHub Pages reported `built` from that commit, with `https_enforced: true` and no custom-domain binding.
- URL: [https://forgewirelabs.github.io/website/](https://forgewirelabs.github.io/website/). An independent HTTPS request returned HTTP 200; `curl` reported TLS certificate verification result `0`.
- `/`, `/projects/`, `/engineering/`, `/about/`, `robots.txt`, the stylesheet, favicon, and each displayed project image returned HTTP 200. All four HTML pages contain the temporary preview label and `noindex, nofollow`; `robots.txt` does not advertise a sitemap.
- Public browser navigation from Projects to Engineering and About succeeded. The public images loaded after scrolling; the browser console had no warnings or errors.
- Requests for `/.env`, `/package-lock.json`, `/src/index.njk`, `/docs/`, `/.git/HEAD`, `/scripts/verify-site.mjs`, and `/node_modules/` returned 404.
- The public browser screenshots use a revision query solely to bypass its cached earlier copy; the canonical preview URL remains the one above.
- The public repository's existing Pages service was used without adding an Actions workflow, paid add-on, or custom-domain setting. The preview is an organization/project showcase with no transactions, account flow, form, or hosted SaaS behavior; it remains a temporary review host. GitHub's Pages terms and usage limits are summarized in [preview-hosting.md](preview-hosting.md).

The public preview is explicitly a development-review candidate. It has no access control; `noindex` is an indexing request, not a privacy boundary. This report does not approve the visual direction for production.
