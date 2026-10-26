# ForgeWire Labs website launch acceptance

**Reviewed:** 2026-10-25
**Status:** Production deployment is blocked pending account-only IONOS facts and owner authorization. No production changes were made.

| Item | Revision or status |
|---|---|
| Source branch | `codex/initial-website-prototype`; final source SHA is recorded in the release manifest after commit |
| Draft PR | [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1), open, draft, unmerged |
| Public staging branch | `website-preview`; currently deployed revision will be updated from the final source after commit |
| Staging URL | [https://forgewirelabs.github.io/website/](https://forgewirelabs.github.io/website/) (temporary public preview; noindex) |
| Production release | Local static artifact only; archive SHA-256 is recorded in the release package manifest |

## Bounded acceptance results

| Check | Result |
|---|---|
| Production build and static verifier | **Passed** — five routes; production apex canonicals and sitemap; no preview banner or noindex; `.htaccess` present |
| Staging build and static verifier | **Passed** — five routes; GitHub Pages base path; visible Development preview label; `noindex, nofollow`; no production canonical, sitemap, or `.htaccess` |
| Source/output boundary | **Passed by static verifier** — no source maps, environment files, source/docs/scripts/dependencies, repository metadata, inline scripts/handlers, or unsafe remote SVG references in generated output |
| Contact presentation | **Passed by static verifier** — only `contact@forgewirelabs.com` and `support@forgewirelabs.com` are public mailto links; security mailbox is absent; verified private reporting links remain for RepoPact Core and Workbench; no public issue disclosure route |
| Local navigation, fragments, images, and CSS references | **Passed by static verifier** across five pages and generated assets |
| Dependency audit | **Passed** — `npm audit --audit-level=high` reports zero vulnerabilities |
| Rendered desktop/mobile layout, overflow, keyboard/focus, 200%/400% zoom and reflow | **Not verified in this pass** — the authorized Windows computer-use workflow stopped after detecting user input and refreshing the selected window. Per the Computer Use safety instruction, GUI automation stopped; no alternate automation was used |
| Screen reader or WCAG conformance | **Not claimed** — no Narrator/NVDA spoken review or formal conformance assessment was completed |

The source uses semantic landmarks, a skip link, visible focus styles, responsive CSS, reduced-motion handling, descriptive image alternatives, and a scrollable wide-table treatment. These are implementation features, not proof of rendered accessibility. Complete one visual desktop/mobile and keyboard/zoom pass through an authorized browser session before production acceptance; record any critical defect and correct it.

## Public staging and production host observations

Before the final source update, staging was at source artifact `8bad38f342e0bc0d810b37bb35af34100e026ac6`. The new staging artifact is to be published from the committed source and checked independently for all five routes, expected assets, preview metadata, contact links, and absence of source/internal files. The previous browser screenshots do not represent this revision.

On 2026-10-25, a query to public DNS resolver 1.1.1.1 found the apex A `74.208.236.125` and AAAA `2607:f1c0:100f:f000::200` (TTL 3600). `www` has no A/AAAA/CNAME answer. The existing MX, SPF, DKIM, and IONOS-managed DMARC records resolve to the current IONOS mail service; preserve them exactly. External HTTP and HTTPS requests to the apex returned the IONOS parking page with HTTP 200; HTTP did not redirect to HTTPS. HTTPS passed system certificate validation. `www` did not resolve. No DNS record was changed.

The supplied IONOS contract screenshot shows Web Hosting Plus, the `.com` marked **Domain not in use**, and an IONOS CDN item. It does not show webspace quota, document root, SFTP account/hostname, invoice, CDN tier/activation/charges, or certificate assignment. Authenticated account inspection was unavailable because the sign-in page and Computer Use safety stop prevented access. See [hosting assessment](hosting-assessment.md) and [deployment runbook](deployment-runbook.md).

## Production and rollback boundary

The intended destination is the existing IONOS Web Hosting Plus webspace, with the domain bound to the verified release directory and files uploaded over a dedicated SFTP-only account. The exact host and directory are unknown until the IONOS account is inspected. Keep apex A/AAAA and all MX/TXT/DKIM/DMARC records; `www CNAME forgewirelabs.com.` is a candidate only, subject to certificate validation and separate owner approval. The incremental cost cannot be confirmed from available evidence. Do not activate CDN or buy/upgrade any service.

For first deployment, record the current DNS zone and domain assignment, and privately back up the selected webspace directory before changing it. The contract screenshot says the domain is not in use; capture the actual prelaunch assignment state in IONOS. A failed first release rolls the assignment back to that recorded state (the current public state is the IONOS parking page), restores any directory files from the private backup, and restores only DNS records changed by an explicitly approved operation. For later releases, reassign the domain to the prior versioned release directory. Keep the temporary GitHub Pages preview until production is verified and accepted.

No production website, IONOS hosting configuration, certificate, DNS record, billing, mailbox setting, or credential was changed. PR #1 remains draft and unmerged. Security mailbox password, IONOS 2FA, and related hardening are explicitly deferred and are not website launch blockers while that address remains unpublished.
