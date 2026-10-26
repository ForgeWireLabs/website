# ForgeWire Labs website validation report

**Reviewed:** 2026-10-25

| Item | Revision or status |
|---|---|
| Draft PR | [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1), open, draft, unmerged |
| Website implementation source used for the current page artifact | `e5a8dd1385888f53ecb863e486178ce8564619a7` |
| Staging artifact commit | `8bad38f342e0bc0d810b37bb35af34100e026ac6` |
| Public staging URL | [https://forgewirelabs.github.io/website/?review=8bad38f](https://forgewirelabs.github.io/website/?review=8bad38f) |
| Contact address state | General and software channels passed controlled mail-flow checks and are linked; security remains unlinked pending access and privacy review |

## Build and static checks

These commands passed from the implementation source revision:

```text
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm audit --audit-level=high
```

Eleventy generated the five production and five staging routes. The dependency audit reported zero vulnerabilities. The static verifiers check canonical and preview metadata, the production sitemap, internal links and asset references, maturity labels, image alternatives and intrinsic sizes, SVG safety, duplicate IDs, local fragments, and generated artifact boundaries.

The contact verifier reads `src/_data/contactChannels.js`, requires exactly the three owner-confirmed `.com` mailboxes, checks each address is present in About, and enforces the link gate: a pending address must have its verification status and no `mailto:` link; a channel marked verified must render its corresponding `mailto:` link. The general and software channels are verified and linked. The security mailbox has passed controlled delivery and authentication checks but remains unlinked pending access, MFA, and forwarding review. The named `.org` mailbox is prohibited from About.

## Public staging checks

Independent HTTPS requests to the deployed revision returned:

- HTTP 200 for all five routes: `/`, `/work/`, `/engineering/`, `/projects/`, and `/about/`.
- HTTP 200 for all nine expected CSS, SVG, PNG, and JPEG assets.
- HTTPS requests completed using the system's default certificate validation.
- The expected GitHub Pages canonical on each page, a visible **Development preview** label, and `noindex, nofollow` on all five routes.
- `contact@forgewirelabs.com` and `support@forgewirelabs.com` have working `mailto:` links in About; `security@forgewirelabs.com` remains plain text with its access/privacy review pending.
- No sitemap declaration in preview `robots.txt`.
- HTTP 404 for `package.json`, internal email architecture documentation, the verifier script, `.env`, `.git/HEAD`, and a source-map path.

The artifact contains generated pages and assets, `.nojekyll`, and `.gitattributes`. Source templates, internal documentation, scripts, dependencies, credentials, and review screenshots are not published. Public staging does not provide access control; `noindex` is a crawler directive, not a privacy boundary.

## Organizational email

The owner confirms that `contact@forgewirelabs.com`, `support@forgewirelabs.com`, and `security@forgewirelabs.com` are three separately created IONOS mailboxes. On 2026-10-25, each mailbox was tested in its separate Thunderbird account using a controlled mailbox owned by the user. The recipient address and full message headers are not recorded here.

| Test | Result |
|---|---|
| Incoming delivery and reply to each address | Passed; each controlled reply appeared in its corresponding separate Inbox |
| Outgoing delivery, authenticated SMTP, and correct From/Reply-To | Passed; each message arrived with matching From/Reply-To, showed authenticated SMTP submission, and appeared in the corresponding Sent folder |
| SPF, DKIM, and DMARC on real outbound messages | Passed for all three according to the external recipient's authentication results |
| IMAP and SMTP secure connections | Passed for all three; IMAP `imap.ionos.com:993` with SSL/TLS, SMTP `smtp.ionos.com:465` with SSL/TLS |
| MFA, recovery, spam protection, authorized recipients, and forwarding rules | Not inspected; owner review remains open |
| Security mailbox access and routing isolation | Not verified; keep the address unlinked and do not send sensitive reports until reviewed |

On 2026-10-25, public DNS for `forgewirelabs.com` resolved MX to `mx00.ionos.com` and `mx01.ionos.com`, SPF to `include:_spf-us.ionos.com`, DKIM selectors `s1-ionos` and `s2-ionos` to IONOS, and `_dmarc` through `dmarc.ionos.com` with `p=none`. The real-message checks above confirmed authentication for the tested messages. The DMARC policy remains monitoring-only (`p=none`). No mailbox setting or DNS record was changed. See [email architecture and verification](email-architecture-assessment.md) and [email handling policy](email-handling-policy.md) for the remaining owner-side security review.

## Accessibility and visual review

This report does not claim rendered-browser visual approval or WCAG conformance. Direct desktop/mobile browser screenshots, 200%/400% zoom and reflow, keyboard-only interaction, Narrator/NVDA review, and exhaustive contrast checks remain unverified. The source includes semantic landmarks, a skip link, visible focus styling, responsive breakpoints, reduced-motion handling, text alternatives for diagrams, and the wide-table scroller, but static source inspection cannot substitute for those practical checks.

## Production boundary

PR #1 remains open, draft, and unmerged. The preview is temporary and uses no custom domain. No production website, IONOS hosting, mailbox settings, billing, credentials, or production DNS were changed. This report does not authorize production deployment or an IONOS account change.
