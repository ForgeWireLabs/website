# ForgeWire Labs website launch acceptance

**Reviewed:** 2026-10-25 America/Chicago (2026-10-26 UTC)
**Status:** LIVE — the apex serves the verified production release. Browser-rendered responsive and keyboard acceptance remains unverified.

| Item | Revision or status |
|---|---|
| Website source and production release | ffb6c3874009ca1abbc5e364b7eac844b334a9d5 |
| Draft PR | ForgeWireLabs/website#1; open, draft, unmerged |
| PR head at start of launch acceptance | 20924f2003d2145a1d77433204ad96eba543581d; follow-up documentation only |
| Public staging artifact | 1711c5285a3e9a237dea8d1658de8d2712697900 on website-preview |
| Staging URL | https://forgewirelabs.github.io/website/ (temporary preview; noindex, nofollow) |
| Production URL | https://forgewirelabs.com/ |
| Production release archive | C:\Projects\ForgeWireLabs-website-release\ffb6c38\forgewirelabs-site-ffb6c38.zip |
| Production archive SHA-256 | 92a98cda382bab0441c57ef2f6b29f481ccb3e5491909a8c73f9a477ef908e9d |
| IONOS release area | Versioned restricted release area for ffb6c38; exact endpoint and path are retained in the private upload record |
| IONOS file readback | 17 of 17 files matched the local manifest before domain connection |

## Production acceptance — public checks on 2026-10-26 UTC

The production homepage and every publicly served release file were fetched from the public domain and matched the verified local production artifact. The homepage was separately fetched and hash-compared over both IPv4 and IPv6.

| Check | Result |
|---|---|
| DNS at 1.1.1.1 and 8.8.8.8 | Apex A 74.208.236.171 and AAAA 2607:f1c0:100f:f000::200, TTL 3600 |
| www DNS | A and AAAA currently resolve to the same IONOS addresses. No www web request or configuration was made; www remains outside launch scope |
| Homepage title | Engineering intelligent systems for work beyond the model — ForgeWire Labs |
| HTTPS apex | **Passed** — HTTP 200, no redirect loop, curl TLS verification result 0 over IPv4 and IPv6 |
| Certificate | **Passed** — Sectigo Public Server Authentication CA DV R36; SAN covers forgewirelabs.com and *.forgewirelabs.com; valid 2026-10-25 through 2027-04-23 UTC; Windows/.NET chain and hostname validation returned no errors |
| HTTP apex | **Passed** — HTTP 301 to https://forgewirelabs.com/; HTTPS then returns 200 |
| Five website routes | **Passed** — homepage, work, engineering, projects, and about each returned HTTP 200 and matched the release manifest SHA-256 |
| Nine assets, robots.txt, sitemap.xml | **Passed** — all 11 returned HTTP 200 and matched the release manifest SHA-256 |
| Production metadata | **Passed** — five apex canonical URLs, no noindex directives, no development-preview label; robots.txt and sitemap.xml match the artifact |
| Contact routes | **Passed by content inspection** — general and software mail links target contact@forgewirelabs.com and support@forgewirelabs.com; the reserved security mailbox is absent |
| Hidden/source path probes | **Passed** — .env, .git/HEAD, .htaccess, package.json, README.md, internal deployment documentation, source-map path, and asset directory listing returned 403 or 404 |
| Nonexistent route | **Passed** — returned HTTP 404 |
| Response security headers | **Observed** — Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy were present |
| IONOS domain assignment | **Functionally confirmed** — the apex serves content matching the release uploaded to the restricted IONOS area. Jeremy reports IONOS accepted “Connect to webspace.” The summary page's older “Domain not in use” status and directory field were not refreshed in this pass |
| Email DNS | **Preserved by this work** — Codex made no DNS or mail changes. Current public observations include IONOS MX, SPF, and managed DMARC records; the existing DKIM and mail-flow evidence is recorded in email-architecture-assessment.md |
| CDN, billing, contract | **Unchanged** — no CDN, paid service, package, or contract change was made. The invoice and CDN entitlement/charge details remain unverified |

The IONOS account page was not refreshed because authorized computer-use capture repeatedly returned: “encode latest capture frame failed: window crop is outside captured monitor.” Public responses independently demonstrate that the apex serves the correct release. No reassignment or DNS change was attempted.

## Build, source, and staging checks

- The production artifact was built from source commit ffb6c3874009ca1abbc5e364b7eac844b334a9d5 and was uploaded before this launch check.
- The production package contained 17 manifest files. Remote readback verified all 17 hashes before the owner connected the domain.
- The public site serves 16 public files byte-for-byte identical to that artifact; .htaccess is intentionally not publicly readable.
- Prior local production and preview builds, static verification, link/fragment checks, output-boundary checks, and npm audit passed. npm audit reported zero vulnerabilities.
- The staging artifact remains at commit 1711c5285a3e9a237dea8d1658de8d2712697900. Its pages retain the development label and noindex, nofollow. The public preview remains enabled.

## Accessibility and rendered-browser limitations

Desktop/mobile visual review, narrow-width behavior, 200%/400% zoom and reflow, keyboard focus/navigation, and screen-reader output were not verified against the production browser rendering. The authorized Sky screenshot capture failed with the exact error above including after refreshing the window selection; no alternate GUI automation was used and no screenshot from this production revision was captured.

The source includes semantic landmarks, a skip link, visible focus styles, responsive CSS, reduced-motion handling, descriptive image alternatives, and a scrollable wide-table treatment. These implementation features do not establish rendered usability or WCAG 2.2 AA conformance. No screen-reader audit or formal conformance claim is made. Schedule a visual and keyboard pass when the authorized browser capture path is available; the production files and public responses are otherwise verified.

## Rollback and launch boundaries

The first release is live from source commit ffb6c3874009ca1abbc5e364b7eac844b334a9d5. For a failed release, preserve the current IONOS assignment and DNS snapshot, then use IONOS to restore the prelaunch webspace assignment or parking behavior after reviewing the exact current assignment. Restore only files from the private backup. Change DNS only with separate approval, and preserve MX, SPF, DKIM, DMARC, and all unrelated records. Keep the GitHub Pages preview until Jeremy accepts production.

PR #1 remains draft and unmerged. The website source commit is the deployed release; the current PR head adds acceptance documentation. No production IONOS settings, DNS, email settings, CDN, billing, or contract changes were made by Codex during this launch verification.
