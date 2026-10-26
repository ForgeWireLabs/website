# ForgeWire Labs website launch acceptance

**Reviewed:** 2026-10-26 UTC
**Status:** READY FOR FINAL ACCEPTANCE — production checks and a bounded rendered review are complete. Jeremy's acceptance is still required before merging PR #1 or retiring staging.

| Item | Revision or status |
|---|---|
| Website source and production release | ffb6c3874009ca1abbc5e364b7eac844b334a9d5 |
| Draft PR | ForgeWireLabs/website#1; open, draft, unmerged |
| PR head before this closeout | a384fdab33fa29adc33963b87221047b8ca27f41; documentation-only changes after the deployed source |
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
| www DNS and behavior | All four IONOS authoritative servers and public resolvers return the same A/AAAA answers as the apex. HTTP and HTTPS requests redirect with 301 to the apex; a test path and query string were preserved. No www change was needed |
| Historical apex address | An earlier observation was 74.208.236.125. Current authoritative and public answers are 74.208.236.171; the cause of the change is not established |
| Homepage title | Engineering intelligent systems for work beyond the model — ForgeWire Labs |
| HTTPS apex | **Passed** — HTTP 200, no redirect loop, curl TLS verification result 0 over IPv4 and IPv6 |
| Certificate | **Passed** — Sectigo Public Server Authentication CA DV R36; SAN covers forgewirelabs.com and *.forgewirelabs.com; valid 2026-10-25 through 2027-04-23 UTC; Node TLS validation returned authorized=true for both apex and www |
| HTTP apex | **Passed** — HTTP 301 to https://forgewirelabs.com/; HTTPS then returns 200 |
| Five website routes | **Passed** — homepage, work, engineering, projects, and about each returned HTTP 200 and matched the release manifest SHA-256 |
| Nine assets, robots.txt, sitemap.xml | **Passed** — all 11 returned HTTP 200 and matched the release manifest SHA-256 |
| Production metadata | **Passed** — five apex canonical URLs, no noindex directives, no development-preview label; robots.txt and sitemap.xml match the artifact |
| Contact routes | **Passed by content inspection** — general and software mail links target contact@forgewirelabs.com and support@forgewirelabs.com; the reserved security mailbox is absent |
| Hidden/source path probes | **Passed** — .env, .git/HEAD, .htaccess, package.json, README.md, internal deployment documentation, source-map path, and asset directory listing returned 403 or 404 |
| Nonexistent route | **Passed** — returned HTTP 404 |
| Response security headers | **Observed** — Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy were present |
| IONOS domain assignment | **Functionally confirmed** — the apex serves content matching the release uploaded to the restricted IONOS area. Jeremy reports IONOS accepted “Connect to webspace.” The summary page's older “Domain not in use” status and directory field were not refreshed in this pass |
| Email DNS | **Preserved** — all four authoritative servers return IONOS MX, SPF, DKIM selector CNAMEs, and the IONOS-managed DMARC CNAME recorded before launch. No DNS or mail changes were made. Prior controlled mail-flow tests passed SPF, DKIM, and DMARC; evidence is in email-architecture-assessment.md |
| CDN, billing, contract | **Unchanged** — no CDN, paid service, package, or contract change was made. The invoice and CDN entitlement/charge details remain unverified |

The IONOS account status page and physical directory assignment were not refreshed during this closeout. Public responses independently demonstrate that the apex serves the verified release and www has the intended canonical behavior. No reassignment or DNS change was attempted.

## Build, source, and staging checks

- The production artifact was built from source commit ffb6c3874009ca1abbc5e364b7eac844b334a9d5 and was uploaded before this launch check.
- The production package contained 17 manifest files. Remote readback verified all 17 hashes before the owner connected the domain.
- The public site serves 16 public files byte-for-byte identical to that artifact; .htaccess is intentionally not publicly readable.
- Rebuilt the production artifact from the PR worktree with Node 24.15.0 and Eleventy 3.1.7. npm run build and npm run verify passed; all 17 generated files match the archived production site byte-for-byte, and the ZIP SHA-256 matches the recorded release hash.
- The deployed source commit is an ancestor of PR #1. The PR changes after that source are documentation-only; the website source and generated public files are unchanged.
- Prior local production and preview builds, static verification, link/fragment checks, output-boundary checks, and npm audit passed. npm audit reported zero vulnerabilities.
- The staging artifact remains at commit 1711c5285a3e9a237dea8d1658de8d2712697900. Its pages retain the development label and noindex, nofollow. The public preview remains enabled.

## Accessibility and rendered-browser review

The authorized Windows browser path rendered the production site in Edge. At desktop size, the homepage, navigation, hero, and engineering-question centerpiece were visible and readable. The About contact section rendered with the active general and support routes. At 200% and 400% browser zoom, the header and headings reflowed onto additional lines; no page-level horizontal overflow was visible in the captured views.

At a narrow responsive viewport of about 390 CSS pixels, the software navigation wrapped onto two rows, project cards stacked into one column, and architecture diagrams and product screenshots fit the content column. Their explanatory captions and full-size links remained available. The software index displayed its horizontal-scroll instructions and first columns without page-level overflow. Tab showed a visible focus outline on the skip link; Enter moved to the main-content anchor. A project link also showed a visible focus outline on the narrow page.

The keyboard interaction with the table's horizontal scroll region could not be completed after the browser control path reported that user input had been detected. The table's arrow-key behavior remains unverified. No screen-reader session or formal contrast measurements were performed. No WCAG 2.2 AA conformance claim is made. No critical visual usability failure was observed in the checks completed.

The footer links and landmark appear in the browser's page structure, but the footer's rendered layout at the end of the page was not captured. A physical 320 CSS-pixel viewport, table arrow-key scrolling, and screen-reader output remain unverified; these are bounded follow-up checks, not evidence of a known production failure.

## Rollback and launch boundaries

The first release is live from source commit ffb6c3874009ca1abbc5e364b7eac844b334a9d5. For a failed release, preserve the current IONOS assignment and DNS snapshot, then use IONOS to restore the prelaunch webspace assignment or parking behavior after reviewing the exact current assignment. Restore only files from the private backup. Change DNS only with separate approval, and preserve MX, SPF, DKIM, DMARC, and all unrelated records. Keep the GitHub Pages preview until Jeremy accepts production.

## Staging retirement preparation

The public preview remains enabled at https://forgewirelabs.github.io/website/. Its root returns HTTP 200 with the development-preview label and noindex, nofollow metadata. The website-preview branch remains at 1711c5285a3e9a237dea8d1658de8d2712697900. A read-only GitHub Pages settings request did not expose the repository's Pages configuration; confirm the active publishing source in repository Settings → Pages when retirement is authorized.

After Jeremy accepts production and approves merge and retirement: merge PR #1; confirm main contains the accepted source and launch documentation; preserve the private release archive, manifest, upload report, and rollback evidence; disable the active Pages publishing source; then delete website-preview only if it is no longer required. Verify the old preview URL no longer serves the site. No staging retirement has been performed.

PR #1 remains draft and unmerged. No production IONOS settings, DNS, email settings, CDN, billing, contract, or GitHub Pages settings were changed during this closeout.
