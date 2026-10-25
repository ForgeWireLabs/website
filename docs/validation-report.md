# ForgeWire Labs website validation report

**Reviewed:** 2026-10-25

| Item | Revision or status |
|---|---|
| Draft PR | [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1), open, draft, unmerged |
| Website implementation source used for the current page artifact | `a7f17b7a341ddeb57389420c3faaa31e544192e1` |
| Staging artifact commit | `2577e2181823e8a5d16fb13a2c6836d998842d20` |
| Public staging URL | [https://forgewirelabs.github.io/website/?review=2577e21](https://forgewirelabs.github.io/website/?review=2577e21) |
| Contact address state | Three separate mailboxes are owner-confirmed as created; operational verification is pending for all three |

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

The contact verifier reads `src/_data/contactChannels.js`, requires exactly the three owner-confirmed `.com` mailboxes, checks each address is present in About, and enforces the link gate: a pending address must have its verification status and no `mailto:` link; a channel marked verified must render its corresponding `mailto:` link. All three remain pending in this revision. The named `.org` mailbox is prohibited from About.

## Public staging checks

Independent HTTPS requests to the deployed revision returned:

- HTTP 200 for all five routes: `/`, `/work/`, `/engineering/`, `/projects/`, and `/about/`.
- HTTP 200 for all nine expected CSS, SVG, PNG, and JPEG assets.
- Valid HTTPS using the system's default certificate validation.
- The expected GitHub Pages canonical on each page, a visible **Development preview** label, and `noindex, nofollow` on all five routes.
- All three contact addresses in About as plain text, with no `mailto:` link while they remain unverified.
- No sitemap declaration in preview `robots.txt`.
- HTTP 404 for `package.json`, internal email architecture documentation, the verifier script, `.env`, `.git/HEAD`, and a source-map path.

The artifact contains generated pages and assets, `.nojekyll`, and `.gitattributes`. Source templates, internal documentation, scripts, dependencies, credentials, and review screenshots are not published. Public staging does not provide access control; `noindex` is a crawler directive, not a privacy boundary.

## Organizational email

The owner confirms that `contact@forgewirelabs.com`, `support@forgewirelabs.com`, and `security@forgewirelabs.com` are three separately created IONOS mailboxes. This review did not authenticate to IONOS, read mailbox contents, or send messages. Therefore:

| Test | Result |
|---|---|
| Incoming delivery to each address | Not tested |
| Outgoing delivery and correct From/Reply-To for each address | Not tested |
| SPF, DKIM, and DMARC pass/alignment on real outbound messages | Not tested; DNS presence alone is insufficient |
| MFA, recovery, spam protection, authorized recipients, and forwarding rules | Not inspected |
| Security mailbox access and routing isolation | Not tested |

On 2026-10-25, public DNS for `forgewirelabs.com` resolved MX to `mx00.ionos.com` and `mx01.ionos.com`, SPF to `include:_spf-us.ionos.com`, DKIM selectors `s1-ionos` and `s2-ionos` to IONOS, and `_dmarc` through `dmarc.ionos.com` with `p=none`. This verifies published DNS only. It does not establish a provisioned or reachable mailbox, message signing, or real-message authentication. No mailbox setting or DNS record was changed. See [email architecture and verification](email-architecture-assessment.md) and [email handling policy](email-handling-policy.md) for the owner-run test sequence.

## Accessibility and visual review

This report does not claim rendered-browser visual approval or WCAG conformance. Direct desktop/mobile browser screenshots, 200%/400% zoom and reflow, keyboard-only interaction, Narrator/NVDA review, and exhaustive contrast checks remain unverified. The source includes semantic landmarks, a skip link, visible focus styling, responsive breakpoints, reduced-motion handling, text alternatives for diagrams, and the wide-table scroller, but static source inspection cannot substitute for those practical checks.

## Production boundary

PR #1 remains open, draft, and unmerged. The preview is temporary and uses no custom domain. No production website, IONOS hosting, mailbox settings, billing, credentials, or production DNS were changed. This report does not authorize production deployment or an IONOS account change.
