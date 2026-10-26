# ForgeWire Labs email architecture and verification

**Reviewed:** 2026-10-25

**Mailbox creation:** owner-confirmed through IONOS; three independent `.com` mailboxes

**Operational status:** controlled mail-flow and message-authentication checks passed for all three mailboxes. General and software channels are published. The security address is reserved and omitted from the visitor-facing site. The owner deferred security-account password setup, IONOS 2FA, and additional security hardening; this work is outside the website launch scope and is not a launch blocker.

**Changes made during this review:** Thunderbird configured with three separate IMAP accounts and matching SMTP identities; no IONOS settings or DNS changed

## Current architecture

Keep the three owner-created mailboxes as separate identities and responsibilities:

| Address | Intended use | Current website status |
|---|---|---|
| `contact@forgewirelabs.com` | General correspondence, research inquiries, collaboration, and partnerships | Controlled delivery, reply identity, and message authentication verified 25 Oct 2026 |
| `support@forgewirelabs.com` | Questions about publicly available ForgeWire Labs software | Controlled delivery, reply identity, and message authentication verified 25 Oct 2026. Public bug reports and feature discussions remain with the relevant project repository. |
| `security@forgewirelabs.com` | Reserved for possible future security intake | Controlled delivery, reply identity, and message authentication verified 25 Oct 2026. It is not advertised or designated as an operational confidential-reporting channel. |

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
| Security-account password setup and IONOS 2FA | **Deferred by owner** | Outside current website launch scope; not a launch blocker while the security address is not advertised. |
| Security mailbox recipient access, recovery, forwarding, and confidentiality boundary | **Deferred** | Revisit only if the owner later chooses to activate this mailbox for confidential reporting. |

The website links only the verified general and software mailboxes. It does not display the reserved security address or publish mailbox test results. No credentials, full message headers, test recipient address, or private `.org` address are recorded here.

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

## Deferred security work

The owner has chosen not to enable IONOS 2FA now and to defer setting the security mailbox password and related hardening. Do not reopen this work as a website launch gate. The address remains absent from the public site. If the owner later asks to activate it as a confidential channel, review access, recovery, forwarding, and authentication as a separate task before publishing it.

## Cost and account state

The owner confirms the three mailboxes have already been created through IONOS. This review did not inspect the IONOS invoice, contract entitlements, renewal costs, or mailbox add-on charges. No new mailbox, service, paid feature, or recurring charge is proposed. The earlier public catalogue price comparisons addressed the now-retired question of purchasing mailboxes and are not current architecture recommendations.

## Decision and boundaries

The approved public model is two active purpose-specific contact mailboxes; the security mailbox remains reserved and unpublished. Public software bug and feature discussion remains in the applicable project repository. The temporary website preview remains in place for review.

No IONOS login, mailbox setting, DNS record, hosting configuration, billing, or production site was modified. PR #1 remains draft and unmerged. The public `.org` mailbox is not disclosed.
