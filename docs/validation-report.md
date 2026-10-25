# ForgeWire Labs organization-first candidate: validation report

- **Reviewed:** 2026-10-25
- **Assessment:** static production and staging builds pass. This report does not claim browser visual validation, exact zoom/reflow, spoken screen-reader testing, or WCAG 2.2 AA conformance for the current organization-first revision.
- **Draft PR:** [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1) (open, draft, unmerged).
- **Public staging URL:** [https://forgewirelabs.github.io/website/?review=05105f4](https://forgewirelabs.github.io/website/?review=05105f4)
- **Website source revision used to build the published pages:** `b55e039c72e08493b3d47cbad68554e2af073871`.
- **Staging artifact branch revision:** `05105f4f3479dd282850e0ff4fa55caf6720103c`.

## Build and static verification

The following commands passed on the organization-first source worktree:

```text
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm audit --audit-level=high
```

The dependency audit reports zero vulnerabilities. Eleventy generated five routes for production and staging. The site verifiers check page metadata and canonical URLs, the preview `noindex, nofollow` policy, the production sitemap, internal navigation and asset references, content and maturity boundaries, image alternatives and intrinsic sizes, SVG safety, duplicate IDs and local fragment links, and the generated output's exclusion of source maps, environment files, source, scripts, and internal documentation. Both review-only and production outputs are separate.

The generated markup/templates successfully build and pass the repository's static structural checks. No independent browser or standards-service HTML validation is claimed. All 16 unique external repository and package links extracted from the built pages returned HTTP 200 over HTTPS.

Independent public requests confirmed all five page routes returned HTTP 200 with the expected canonical URLs, development-preview label, and `noindex, nofollow`. Nine stylesheet/image/icon assets returned HTTP 200 with expected MIME types. The Pages build API reports `built` for artifact commit `05105f4`. Requests for source templates, internal documentation, `.env`, `.git/HEAD`, `package.json`, `node_modules`, and a source map returned HTTP 404. The published artifact tree has 18 files: generated pages/assets plus `.nojekyll` and Git attributes; no source, scripts, dependency tree, or review screenshots are present. Successful HTTPS requests were validated by the Windows TLS stack.

## Preview privacy and deployment boundaries

The staging pages include `noindex, nofollow`, use GitHub Pages canonical URLs, display a development-preview label, and contain no production-domain canonical or social URL. Staging `robots.txt` has no sitemap declaration and the staging sitemap has no page locations. The static artifact is built from `_preview/` and must exclude source, `.git/`, `docs/`, `node_modules/`, source maps, environment files, credentials, and local screenshots. Public staging is not private access control.

The temporary preview is an externally accessible static design-review site. No production DNS, IONOS settings, billing, hosting contract, production credentials, GitHub Pages source domain, PR merge, or production publication was changed as part of this validation.

## Content and maturity

The homepage establishes ForgeWire Labs before introducing its projects. Its engineering-question index is editorial content and explicitly not a system diagram or a representation of shared product architecture. Our Work describes organizational disciplines; Research & Engineering separates open questions from public implementation examples; Software retains individual product identities and maturity; About introduces the organization before founder context.

ForgeWire and Fabric remain private development and are described only from the public overview. RepoPact Proving Grounds is described as a validation repository, not a released product; its pinned instructions use RepoPact 3.0.2 and do not establish coverage of 3.1.3. Released software, source-build previews, developer previews, beta work, and private development remain distinguished. These source claims should be rechecked if upstream sources change before production.

The organization purpose and focus areas are owner-provided statements and remain subject to final disclosure approval before production. No customers, team size, commercial availability, production readiness, shared runtime, or unsupported project capability is claimed. On 2026-10-25, GitHub API checks confirmed the eight pinned public repository commits in `content-sources.md` still match their current repository heads. PyPI lists RepoPact 3.1.3, SkillForge Academy's latest release is v1.3.2, and Flink's latest release is v2.0.1; Anvil and Workbench have no published releases listed.

## Accessibility and responsive status

The static source provides a skip link, semantic header/navigation/main/footer, one `h1` on each route, image alternative text, text alternatives and full-size links for diagrams, visible focus styling, reduced-motion handling, and a semantically marked wide Software table. CSS contains responsive breakpoints and the table is designed to scroll within its region.

For this recovery/publish turn, browser screenshots and direct visual review were not completed because the Windows Computer Use URL-confidence policy stopped that operation. No alternative desktop-control method was used. The following remain unverified on this revision:

- 200% and 400% browser zoom and reflow behavior.
- Keyboard-only browser operation and scroll behavior in the wide table.
- Screen-reader speech for landmarks, navigation, diagrams, and table headers.
- Actual mobile device/touch behavior and desktop/mobile visual consistency.
- Exhaustive contrast pairs and a full WCAG 2.2 AA audit.

Static checks do not substitute for browser and assistive-technology testing. No accessibility conformance claim is made.

## IONOS production capability and cost assessment

The supplied account screenshots show an active IONOS Web Hosting Plus contract that includes forgewirelabs.com, marked “Domain not in use,” and an IONOS CDN service line item. They do not show actual webspace capacity/free space, invoice totals, SSL assignment, CDN tier/activation, or incremental CDN charge.

IONOS's public US Linux Plus catalogue has advertised 350 GB NVMe, up to 200 SFTP accounts, and one DV wildcard certificate at promotional and renewal prices. Those catalogue terms do not prove the user's contract allocation or cost. IONOS documents SFTP-only access with directory scoping; scoping is not full isolation of the webspace. SSL is an account assignment/activation matter. The domain-binding tool may change DNS if the domain does not already point to that hosting environment.

The CDN line item alone does not establish tier, activation, renewal, or additional charge. IONOS's documented CDN activation applies to subdomains and changes their DNS to Cloudflare; it does not directly serve the apex host. Do not activate the CDN for v1. Account-specific storage, costs, certificate coverage, and domain mapping remain unverified and block production deployment.

## Bounded production sequence

Production remains unauthorized. After content approval, accessibility follow-up, IONOS account verification, and explicit approval to merge/deploy:

1. Merge only after explicit approval. Check out the approved source SHA and run the production build and verifier.
2. Review the generated static-file allowlist and create a SHA-256 manifest. Retain the prior production files and the existing domain-to-directory and DNS state in a private recovery record.
3. Configure a restricted SFTP-only upload account with access limited to the chosen webspace directory. Upload the approved static artifact to a versioned directory; do not include source or secrets.
4. Bind forgewirelabs.com to the approved document root only after owner review of exact IONOS changes. Confirm apex and `www` behavior and certificate coverage before redirects.
5. Validate HTTPS, canonical redirects, all routes/assets, production metadata, sitemap, no preview marker/noindex, and privacy scope through independent requests.
6. Obtain owner acceptance. Retire the GitHub Pages preview only after production is verified and accepted.

Rollback: restore the previous domain-to-directory mapping, prior redirect configuration, and exact recorded DNS values if a release changed DNS. Do not alter MX/TXT or unrelated records. Restore the previous static artifact from backup if only webspace content requires rollback.

## Decisions still requiring Jeremy and ChatGPT approval

1. Approve the owner-provided organization purpose and focus-area wording and approve ForgeWire/Fabric public disclosure for production.
2. Complete browser zoom/reflow, keyboard, and Narrator/NVDA checks, then resolve any actual accessibility issues found.
3. Confirm account-specific IONOS storage, invoice/renewal costs, CDN tier/status/charges, SSL assignment/coverage, and domain-to-directory behavior.
4. Approve apex and `www` canonical behavior, exact DNS changes, production upload, and merge of draft PR #1.
5. Approve retirement of the public preview after production acceptance.

No production launch, PR merge, DNS change, IONOS configuration, paid activation, credential setup, or hosting contract change is authorized by this report.
