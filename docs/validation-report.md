# ForgeWire Labs final acceptance and production readiness report

- **Reviewed:** 2026-10-25
- **Scope:** Current website candidate, staging artifact, public claims, accessibility checks, and IONOS production path.
- **Assessment:** The static-site checks and targeted visual checks pass. Production readiness is **not yet established** because spoken screen-reader testing and account-specific IONOS billing, webspace, certificate, and CDN facts remain unverified. This report makes no WCAG 2.2 AA conformance claim.

## Candidate and revision reconciliation

- **Public staging preview:** [https://forgewirelabs.github.io/website/?review=01a10ef](https://forgewirelabs.github.io/website/?review=01a10ef)
- **Draft PR:** [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1)
- **PR source head when this review began:** 3ef4faf5183687077e91f5ec3f91e5b1f9b3c129
- **Website source-code revision in the rendered artifact:** 01a10ef99a88d8f9a6e61505a79a782ceed7779d. The commits from that revision through the PR head changed documentation only.
- **Staging artifact branch head:** 3d707ebb6db26908e783b968cd525bc3384b675c
- The production and preview builds from the PR head pass their respective verifiers. Generated preview files match the public artifact branch file-for-file; the artifact branch also contains the two review screenshots. The staging page therefore reflects the website source in the current draft PR head.
- PR #1 remains open, draft, and unmerged. No production site or DNS records were changed.

## Public staging captures

- [Desktop · 1200 × 900](https://forgewirelabs.github.io/website/review-captures/home-desktop.jpg?review=3d707eb)
- [Mobile · 390 × 844](https://forgewirelabs.github.io/website/review-captures/home-mobile.jpg?review=3d707eb)

The mobile capture uses a 390 × 844 viewport and the site's mobile layout rules. Both screenshots show the current public staging page with its preview label.

## Implementation and content checks

The approved v1 structure and art direction are retained. The homepage uses the genuine ForgeWire Projects workspace capture, linked to its full-resolution source. Its caption identifies private development, the capture date, disposable sample data, and the limited scope of the screenshot. Existing project diagrams remain on their own project pages.

These checks passed:

~~~
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm audit --audit-level=high
~~~

The dependency audit reports zero vulnerabilities. Site verifiers cover the four routes, metadata and indexing policy, local links/assets, image alternatives, maturity/ownership boundaries, SVG safety, base paths, and output privacy scope.

All 20 unique external links extracted from the staging HTML returned HTTP 200 over verified HTTPS. Requests for .env, source templates, internal documentation, .git/HEAD, package.json, and node_modules returned 404. The artifact contains generated static files and the two reviewed captures; it contains no source tree, source maps, environment files, credentials, or internal documentation.

## Release and public-claim verification

The public source repositories and release listings were rechecked against the pinned material. Current public identifiers remain:

- RepoPact CLI package: 3.1.3 on PyPI.
- SkillForge Academy: latest Windows release v1.3.2.
- ForgeLink: latest packaged release v2.0.1; its repository version is 2.0.3 and ownership remains under JeremyShows.
- Workbench remains a source-build preview with no packaged installer listed; Anvil remains labeled developer preview. Core, Workbench, Anvil, SkillForge, and ForgeLink pinned commits still match their current source heads.
- ForgeWire and Fabric copy is based on the public ForgeWire overview pinned at 85d1905b0bd8db420882f00065daff34833dab27. Both remain labeled private development; the pages state no public installation, service, availability, or release date.

The primary-source ledger is in content-sources.md. It records the exact pinned source commits and image provenance.

## Indexing and canonical metadata

- Staging routes use the GitHub Pages canonical base and noindex, nofollow. The preview robots.txt does not advertise a sitemap, and the preview sitemap has no page locations.
- The production build uses https://forgewirelabs.com canonical URLs, has no noindex directive, and publishes a sitemap listing the four production routes.
- Staging and production metadata were checked in their separately generated outputs. Search indexing is not a privacy boundary; the preview remains publicly accessible.

## Accessibility and responsive behavior

Completed checks:

- Browser accessibility trees show one h1 per route, a skip link, named primary navigation, meaningful image alternatives, a nearby text key and full-size image link for diagrams, and a named region containing a semantic engineering table with column headers and project row headers.
- Keyboard checks reach the skip link first; Enter moves focus to main content. Navigation links are keyboard accessible. The wide project table is its own scroll region and can be focused and moved horizontally with arrow keys.
- Exact browser zoom controls were tested at 200% and 400% on the public staging page. The homepage and Engineering page remain legible and reflow vertically without obvious page-level horizontal clipping at the checked viewports. The project table retains its contained horizontal scroll behavior.
- A separate 320 CSS-pixel viewport check found no document-level horizontal overflow; the wide table keeps its own horizontal scroller. Desktop and mobile layouts were also checked at 1200 × 900 and 390 × 844.
- Sampled text contrast ratios exceed WCAG AA text contrast: body on paper 13.73:1, teal links on paper 5.52:1, teal links on alternate surfaces 5.14:1, and white button text on teal 6:1. The sampled focus outline is 4.75:1 on the light surface and 3.17:1 on the dark surface, above the 3:1 non-text threshold for those tested colors.

**Remaining accessibility limitation:** Narrator was started but its first-run keyboard dialog could not be dismissed through the available desktop control session, so spoken navigation, image descriptions, and table behavior were not completed. NVDA was not installed. The browser accessibility tree and keyboard checks are not a replacement for speech testing. A full WCAG 2.2 AA audit, exhaustive contrast checks for all states, browser combinations, physical touch testing, and tests with actual assistive technology remain outstanding. No conformance claim should be made.

## IONOS production capability and cost assessment

The screenshots confirm an active Web Hosting Plus contract containing forgewirelabs.com, currently marked “Domain not in use,” and a CDN service line item. They do not show the actual webspace quota/free space, invoice totals, SSL assignment, CDN tier/hostname activation, or CDN charge.

IONOS's current public US Linux Plus catalogue lists 350 GB NVMe, up to 200 SFTP accounts, one DV wildcard SSL certificate, and a promotional $1/month for a one-year term followed by $14/month. These are current catalogue terms, not the user's confirmed contract allocation or price. IONOS documents SFTP-only account creation and directory scoping, with the limitation that the restriction is at SFTP level rather than full webspace isolation. It documents the included SSL Starter Wildcard as covering one domain and its subdomains, subject to account activation/assignment. The IONOS domain-binding tool may apply DNS changes if the domain does not already point to the hosting service.

The CDN line item confirms presence in the contract view only. IONOS describes Basic (50 GB bandwidth) and Pro (unlimited bandwidth) options; CDN activation is for subdomains, changes their DNS to Cloudflare, and does not support the apex hostname directly. The screenshots do not establish the line item's tier, activation, renewal, or incremental charge. Do not activate it for v1.

**Production blocker:** Before any deployment recommendation becomes an account-specific go decision, Jeremy must verify actual webspace capacity, hosting/CDN/domain billing, certificate assignment and hostname coverage, and the intended domain-to-directory mapping in IONOS. No such account setting was changed or credential entered in this review.

## Bounded production sequence

The prepared procedure is in deployment-runbook.md. In order, it requires: final PR/content approval and merge; clean build and verifiers at the approved SHA; artifact allowlist and SHA-256 manifest; private backup of current files and mapping; upload of the approved files to a versioned webspace directory using restricted SFTP-only access; owner-approved .com binding and any explicit DNS records; certificate validation for apex and www; HTTPS and approved canonical redirects; independent route, asset, metadata, privacy, and mobile checks; and only then owner acceptance and preview retirement.

Rollback restores the former domain-to-directory assignment or backup, prior redirect configuration, and exact captured DNS values if the release changed DNS. Do not change MX/TXT or other service records during rollback.

## Decisions and approvals still needed

1. Complete spoken Narrator or NVDA checks for page navigation, the ForgeWire capture and diagrams, and the engineering table; address any actual issues found. No screen-reader pass is recorded yet.
2. Approve or revise the staged ForgeWire and Fabric copy for public disclosure, then explicitly approve merge of draft PR #1.
3. In IONOS, confirm actual storage, invoice/renewal amounts, CDN tier/status/charges, certificate availability and coverage, and domain-binding behavior. Supply redacted account evidence if these details should be recorded in this assessment.
4. Approve apex canonical hosting, whether www should redirect, any exact DNS changes, and the production deployment itself.
5. After a successful and accepted production release, authorize retirement of the public GitHub Pages preview.

No production launch, merge, DNS change, IONOS configuration, paid service, or contract change is authorized by this report.
