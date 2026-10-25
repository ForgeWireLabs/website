# ForgeWire Labs email architecture and verification

**Reviewed:** 2026-10-25

**Mailbox creation:** owner-confirmed through IONOS; three independent `.com` mailboxes

**Operational status:** delivery, sending, authentication, access, MFA, and routing remain unverified

**Changes made during this review:** none to IONOS settings or DNS

## Current architecture

Keep the three owner-created mailboxes as separate identities and responsibilities:

| Address | Intended use | Current website status |
|---|---|---|
| `contact@forgewirelabs.com` | General correspondence, research inquiries, collaboration, and partnerships | Mailbox created; delivery and reply verification pending |
| `support@forgewirelabs.com` | Questions about publicly available ForgeWire Labs software | Mailbox created; delivery and reply verification pending. Public bug reports and feature discussions remain with the relevant project repository. |
| `security@forgewirelabs.com` | Confidential vulnerability disclosures and security correspondence | Mailbox created; security and delivery verification pending. Do not send sensitive details until private routing and access are verified. |

These are separate mailboxes, not aliases or forwarding-only identities. The earlier alias, forwarding, and mailbox-purchase options were planning alternatives and are retired. Do not create additional mailboxes. The existing named `.org` mailbox remains unchanged and is not a public organization contact.

Do not forward the security mailbox into contact, support, a public issue tracker, or any destination whose access and confidentiality have not been verified. The owner has not confirmed current forwarding rules, mailbox recipients, or security settings.

## Evidence and verification status

| Check | Current result | Evidence and limit |
|---|---|---|
| Creation and separate mailbox identity | **Owner-confirmed** for all three addresses | This is the user's explicit statement. I did not authenticate to the IONOS account. |
| Incoming delivery | **Not tested** for all three | No controlled sender and authorized mailbox session were available in this review. |
| Outgoing delivery and From/Reply-To identity | **Not tested** for all three | Requires sending from each mailbox to an authorized controlled test recipient and inspecting the received message. |
| SPF, DKIM, and DMARC DNS | **Observed published records** for `forgewirelabs.com` | Public DNS returned the IONOS MX targets, SPF TXT, two IONOS DKIM CNAME selectors, and IONOS-managed DMARC record listed below. DNS presence does not prove a real message passed or aligned. |
| Real-message SPF/DKIM/DMARC results | **Not tested** | Requires original received headers from a controlled external test message sent by each mailbox. |
| MFA, recovery, spam protection, recipient access, and forwarding rules | **Not inspected** | Requires the owner's IONOS account access. No account settings were changed. |
| Security mailbox isolation | **Not tested** | Confirm direct access is limited to authorized recipients and no forwarding or sharing routes reports to general/support. Until then, do not use this address for vulnerability details. |

The website shows the three addresses as owner-confirmed mailbox creations with verification pending. It provides no `mailto:` link until the relevant address passes the necessary tests. No credentials, mailbox contents, message headers, or private `.org` address are recorded here.

## Public DNS observation

On 2026-10-25, a public DNS query returned these records for `forgewirelabs.com`:

| Owner | Type | Observed value |
|---|---|---|
| Apex | MX | Priority 10 `mx00.ionos.com`; priority 10 `mx01.ionos.com` |
| Apex | TXT | `v=spf1 include:_spf-us.ionos.com ~all` |
| `s1-ionos._domainkey` | CNAME | `s1.dkim.ionos.com` |
| `s2-ionos._domainkey` | CNAME | `s2.dkim.ionos.com` |
| `_dmarc` | CNAME | `dmarc.ionos.com`; target TXT: `v=DMARC1; p=none;` |

This confirms that the public `.com` mail DNS points to IONOS. The DKIM CNAMEs identify published selectors; they do not establish signing on a message. The DMARC policy is `p=none`, which requests reporting without enforcement. Do not alter MX, SPF, DKIM, or DMARC as part of this website update.

The existing `.org` DNS and mailbox remain outside this change. No `.org` mailbox address is included in the public site or this document.

## Owner-run verification procedure

Use only accounts the owner controls. Do not open unrelated mailbox messages or share passwords, recovery codes, app passwords, or authentication tokens.

1. In IONOS, inspect each new mailbox's recipient/access list, forwarding rules, spam and malware protection, MFA state, recovery options, and quota. Confirm that `security@` has no forwarding or shared access into contact/support.
2. From a controlled external account, send a message with a unique, non-sensitive subject to each address. Confirm it reaches the intended mailbox and no unintended mailbox.
3. Reply from each mailbox to that controlled account. Confirm the received `From` and `Reply-To` are the intended `.com` address.
4. In the controlled recipient's original message headers, confirm SPF, DKIM, and DMARC pass and align with `forgewirelabs.com` for a message sent from each mailbox. Record only pass/fail and date in the review record; do not publish full headers.
5. For `security@`, verify direct access is limited to authorized recipients, MFA is enabled, no forwarding/shared inbox/public integration exists, and the response can remain confidential. Use only a harmless test message, not a real vulnerability report.
6. If any check fails, leave that address pending and do not link it on the website. Correct account settings only with owner approval; do not change DNS based solely on a status banner.
7. Once all required checks for an address pass, record the result in the private owner review notes, set its `verified` value in `src/_data/contactChannels.js`, rebuild, and verify the generated `mailto:` URL. Keep security-specific checks as an additional gate for `security@`.

## Cost and account state

The owner confirms the three mailboxes have already been created through IONOS. This review did not inspect the IONOS invoice, contract entitlements, renewal costs, or mailbox add-on charges. No new mailbox, service, paid feature, or recurring charge is proposed. The earlier public catalogue price comparisons addressed the now-retired question of purchasing mailboxes and are not current architecture recommendations.

## Decision and boundaries

The approved organizational model is three separate purpose-specific mailboxes, with independent confidential handling for security. Public software bug and feature discussion remains in the applicable project repository. The temporary website preview remains in place for review.

No IONOS login, mailbox setting, DNS record, hosting configuration, billing, or production site was modified. PR #1 remains draft and unmerged. The public `.org` mailbox is not disclosed.
