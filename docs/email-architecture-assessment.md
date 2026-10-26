# ForgeWire Labs email architecture and verification

**Reviewed:** 2026-10-25

**Mailbox creation:** owner-confirmed through IONOS; three independent `.com` mailboxes

**Operational status:** controlled mail-flow and message-authentication checks passed for all three mailboxes. General and software channels are ready to publish; security remains unlinked pending access, MFA, and forwarding review.

**Changes made during this review:** Thunderbird configured with three separate IMAP accounts and matching SMTP identities; no IONOS settings or DNS changed

## Current architecture

Keep the three owner-created mailboxes as separate identities and responsibilities:

| Address | Intended use | Current website status |
|---|---|---|
| `contact@forgewirelabs.com` | General correspondence, research inquiries, collaboration, and partnerships | Controlled delivery, reply identity, and message authentication verified 25 Oct 2026 |
| `support@forgewirelabs.com` | Questions about publicly available ForgeWire Labs software | Controlled delivery, reply identity, and message authentication verified 25 Oct 2026. Public bug reports and feature discussions remain with the relevant project repository. |
| `security@forgewirelabs.com` | Security disclosures | Controlled delivery, reply identity, and message authentication verified 25 Oct 2026; access and confidentiality protections remain unverified. Do not send sensitive details until those controls are checked. |

These are separate mailboxes, not aliases or forwarding-only identities. The earlier alias, forwarding, and mailbox-purchase options were planning alternatives and are retired. Do not create additional mailboxes. The existing named `.org` mailbox remains unchanged and is not a public organization contact.

Do not forward the security mailbox into contact, support, a public issue tracker, or any destination whose access and confidentiality have not been verified. The owner has not confirmed current forwarding rules, mailbox recipients, or security settings.

## Evidence and verification status

| Check | Current result | Evidence and limit |
|---|---|---|
| Creation and separate mailbox identity | **Owner-confirmed** for all three addresses | This is the user's explicit statement. I did not authenticate to the IONOS account. |
| Thunderbird account separation | **Verified** | Three independent IMAP accounts use `imap.ionos.com:993` with SSL/TLS. Each has a separate SMTP entry for `smtp.ionos.com:465` and its matching full-address username. No unified inbox or cross-account forwarding was configured. |
| Incoming delivery and IMAP synchronization | **Passed** for all three | Each IONOS welcome message and a controlled reply appeared in its intended separate Inbox. |
| Outgoing SMTP authentication | **Passed** for all three | Each test arrived at the controlled external recipient; received transport headers show authenticated SMTP submission (`ESMTPSA`). |
| Outgoing delivery and From/Reply-To identity | **Passed** for all three | Each test arrived with its matching organizational From and Reply-To address and appeared in the corresponding Thunderbird Sent folder. |
| SPF, DKIM, and DMARC on real outbound messages | **Passed** for all three | The external recipient's `Authentication-Results` reported SPF, DKIM, and DMARC pass for `forgewirelabs.com`. The full headers and recipient address are not recorded here. |
| MFA, recovery, recipient access, and forwarding rules | **Not inspected** | Requires the owner's IONOS account access. These checks remain open, especially for the security mailbox. |
| Security mailbox confidentiality boundary | **Not verified** | Confirm direct access is limited to authorized recipients and no forwarding or sharing routes reports to general/support. Until then, do not use this address for sensitive vulnerability details. |

The website links the verified general and software mailboxes. It displays the security address without a `mailto:` link and keeps it out of confidential use until access, MFA, and forwarding protections are reviewed. No credentials, full message headers, test recipient address, or private `.org` address are recorded here.

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

## Remaining owner-side checks

Use only accounts the owner controls. Do not share passwords, recovery codes, app passwords, or authentication tokens.

1. In IONOS, inspect recipient/access lists, forwarding rules, MFA, recovery options, spam protections, and quotas for each mailbox.
2. For `security@`, confirm access is limited to authorized recipients, MFA is enabled, and no forwarding or shared access sends reports to general/support.
3. Keep the security address unlinked and do not use it for sensitive reports until those protections pass. If any check fails, correct the relevant IONOS settings only with owner approval; do not change DNS based on a status banner.
4. After the security review passes, update its status in `src/_data/contactChannels.js`, rebuild, and verify its generated `mailto:` URL.

## Cost and account state

The owner confirms the three mailboxes have already been created through IONOS. This review did not inspect the IONOS invoice, contract entitlements, renewal costs, or mailbox add-on charges. No new mailbox, service, paid feature, or recurring charge is proposed. The earlier public catalogue price comparisons addressed the now-retired question of purchasing mailboxes and are not current architecture recommendations.

## Decision and boundaries

The approved organizational model is three separate purpose-specific mailboxes, with independent confidential handling for security. Public software bug and feature discussion remains in the applicable project repository. The temporary website preview remains in place for review.

No IONOS login, mailbox setting, DNS record, hosting configuration, billing, or production site was modified. PR #1 remains draft and unmerged. The public `.org` mailbox is not disclosed.
