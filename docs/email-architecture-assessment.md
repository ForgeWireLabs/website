# ForgeWire Labs email architecture assessment

**Reviewed:** 2026-10-25
**Status:** Preparation only. No IONOS email settings or DNS records were changed.

## Recommendation

Use IONOS for organizational mail only after checking the existing Email & Office contract and its actual address allowances. The target is one `.com` mailbox for general correspondence, with public software questions routed into that inbox only if a same-domain alias or forwarding identity is included and can be replied to correctly. Give confidential security reporting its own `.com` mailbox if an included address is available; otherwise obtain the account-specific price before deciding whether the separation is worth the recurring cost. A security inbox should not share a general inbox or forward to a public issue tracker.

If the contract has no available `.com` mailbox and the owner does not approve an add-on, keep the site on its current public general route and show all three proposed addresses as inactive. Keep the existing named `.org` mailbox and its configuration unchanged. Do not forward `.com` roles into it as the default: that would mix correspondence and would not by itself let the recipient reply as a `.com` identity.

This arrangement describes responsibilities, not staffed departments. Do not create `partnerships@`, `sales@`, or `press@` for appearance.

## Evidence and limits

| Finding | Evidence | What it does not establish |
|---|---|---|
| Web Hosting Plus is present in the IONOS account. | Owner-supplied contract screenshot. The same view lists the `.com`, `.org`, `.info`, and `.store` domains, an IONOS CDN item, and Domain Guard. | Email product, address count, remaining mailbox/forwarding quota, email-domain assignment, current invoice amount, or add-on price. |
| A named `.org` mailbox exists. | Owner statement in the project brief. Its address is intentionally omitted from this public repository. | Product type, mailbox capacity, configuration, account security, recovery state, or ability to receive forwarded `.com` mail. |
| `.com` and `.org` mail DNS points to IONOS. | Independent public DNS-over-HTTPS queries on 2026-10-25, cross-checked against public resolvers. See the record snapshot below. | A provisioned mailbox, successful login, SMTP sending, delivery, IONOS contract entitlement, DKIM signing, or SPF/DKIM/DMARC alignment of a real message. |
| IONOS web-hosting packages advertise email addresses. | Current public IONOS web-hosting catalogue. | The allowance in this Web Hosting Plus contract, especially if the contract uses older product terms or an included address is already occupied. |

The IONOS account's Email & Office portfolio was not inspected in this run. The previously observed Windows Computer Use URL-confidence stop is respected; no alternate desktop automation was used to bypass it. An IONOS account/API connector was not available. Therefore mailbox counts, forwarding quota, type, domain eligibility, security status, charges, and renewal amounts remain **unverified**.

## DNS snapshot

These are the records observed through public DNS. They are a baseline, not a request to edit DNS. TTL values below were returned by Google Public DNS; Cloudflare's resolver returned the same mail targets and authentication values.

| Domain / owner | Type | Current public value | TTL |
|---|---|---|---:|
| `.com` | NS | `ns1061.ui-dns.com`, `ns1094.ui-dns.biz`, `ns1095.ui-dns.de`, `ns1040.ui-dns.org` | 21600 s |
| `.com` | MX | Priority 10 `mx00.ionos.com`; priority 10 `mx01.ionos.com` | 3600 s |
| `.com` | TXT, apex | `v=spf1 include:_spf-us.ionos.com ~all` | 3600 s |
| `s1-ionos._domainkey` | CNAME | `s1.dkim.ionos.com` | 3600 s |
| `s2-ionos._domainkey` | CNAME | `s2.dkim.ionos.com` | 3600 s |
| `_dmarc` | CNAME | `dmarc.ionos.com`; its published policy resolves to `v=DMARC1; p=none;` | 3600 s |
| `.org` | MX, TXT, DKIM, DMARC | Same IONOS records and values as `.com` | 3600 s |
| `.com` / `.org` | A / AAAA | `.com`: `74.208.236.125`; `.org`: `74.208.236.227`; both have `2607:f1c0:100f:f000::200` | 3600 s |

The public query found the two `s1-ionos` and `s2-ionos` DKIM selectors. It did not find an additional selector. Do not add a generic or guessed DKIM record. No DMARC reporting address was observed. The `_dmarc` record is an IONOS-managed CNAME; do not replace it with a hand-authored TXT value without confirming IONOS's current account controls and expected configuration.

### Proposed DNS change set

**No DNS change is proposed now.** The visible `.com` mail records already point to IONOS. After an owner-approved mailbox setup, recheck the records and send a controlled message to a mailbox the owner controls. Inspect the message headers for SPF, DKIM, DMARC, and From-domain alignment before publishing any `mailto:` link.

If a different sending provider is selected later, add only that provider's account-generated DKIM and SPF instructions after review. Maintain exactly one SPF TXT record per domain by merging authorized senders into the existing policy. Confirm who manages `_dmarc` before changing it. Keep `p=none` until every legitimate sender is known and alignment has been measured; do not jump to quarantine or reject. Preserve all `.org` records and the current MX values unless a separate approved migration specifically requires a reviewed change.

## IONOS capabilities and cost evidence

IONOS's public documentation describes forwarding-only addresses as inbound routing identities without a mailbox; they cannot store or send messages. Forwarding destinations and quantities depend on package. A destination can be another email address, but the current package's capacity and the existing `.org` mailbox's ability to accept a message have not been tested. The public docs also state that a forwarding address does not become the sender identity. Since 2024, the authenticated mailbox and alternate sender must use the same domain. The public material reviewed does not establish how many true mailbox aliases this account can create, so treat that entitlement and any alias send-as behavior as unverified. A same-domain sender must be provisioned and tested; do not assume that every forward can send as its original address.

Published Mail Basic limits are 2 GB or 100,000 messages per mailbox and a 70 MB maximum attachment when both endpoints are compatible IONOS account types. At quota, the mailbox rejects new mail. IONOS advertises spam filtering and optional premium virus protection; the latter depends on contract. Two-step verification is available for Mail Basic and Mail Business, with app passwords for mail clients. IONOS documents IMAP at `imap.ionos.com:993` with SSL/TLS and SMTP at `smtp.ionos.com:465` with SSL/TLS (or port 587 with STARTTLS). Those published connection settings do not prove this account has an active mailbox. The account's actual quota, protection, and MFA state are not known.

Public US catalogue prices checked on 2026-10-25 (not an account quote):

| Public listing | Advertised contents | Introductory / renewal listing | Relevance |
|---|---|---|---|
| Mail Basic 1 | One 2 GB mailbox | $1.10/month with a 3-year term, then $2/month | Possible lowest-cost mailbox if the existing contract has no usable included address. Taxes may apply. |
| Mail Basic 25 | 25 mailboxes, 2 GB each | $2/month with a 3-year term, then $4/month | Its advertised renewal matches two Mail Basic 1 accounts; the 3-year term, unused capacity, and account eligibility must be considered. |
| Mail Business | 50 GB per user and additional collaboration features | $3/month displayed with a 3-year term; renewal price was not shown in the retrieved listing | Not recommended for this small, static organizational setup without an actual need. |

IONOS also currently advertises domain email as part of web-hosting plans; its public plan matrix varies by tier. These catalogue facts do **not** prove the remaining allowance or cost in this legacy Web Hosting Plus contract. Exact incremental and renewal costs can only be obtained from the account's Email & Office product view and invoice/add-on quote. No product was purchased or activated.

Official references: [creating a forwarding address](https://www.ionos.com/help/index.php?id=12996), [setting up forwarding](https://www.ionos.com/help/index.php?id=12993), [sending from alternate addresses](https://www.ionos.com/help/email/general-topics/important-change-for-sending-emails-with-different-sender-addresses/), [IMAP and SMTP connection details](https://www.ionos.com/help/index.php?id=2490), [mailbox size limits](https://www.ionos.com/help/email/general-topics/size-limitations-for-ionos-email-accounts/), [email settings and virus protection](https://www.ionos.com/help/email/managing-mail-basic/editing-email-settings/), [two-step verification](https://www.ionos.com/help/email/using-webmail/email-activate-and-configure-two-step-verification/), [current email pricing](https://www.ionos.com/office-solutions/create-an-email-address), and [current web-hosting plan matrix](https://www.ionos.com/hosting/1-dollar-web-hosting).

## Options considered

| Option | Benefits | Risks and decision |
|---|---|---|
| **A. Forward each `.com` identity to the existing `.org` mailbox** | May require no extra mailbox if forwarding is already included; messages can be received in one place. | Quota is unknown. General, support, and security share one inbox. A forward-only identity cannot send, and a `.org` authenticated mailbox cannot send as `.com` under IONOS's same-domain rule. Could expose confidential security reports in an ordinary inbox. Not the target design. |
| **B. One `.com` mailbox with same-domain aliases** | Low complexity; one inbox and one authenticated domain; support can share the general mailbox when the volume is small. | Requires an available mailbox and tested alias/send-as behavior. General and security would share the same mailbox and access boundary. Suitable for general and support, not preferred for confidential disclosures. |
| **C. One general/support mailbox plus a distinct security mailbox** | A real `.com` reply identity; security reports can be kept out of general correspondence; support need not imply a staffed service. | May require an extra mailbox and recurring fee. Requires manual owner review of classification, MFA, recovery, and delivery. Recommended target if account allowances and cost support it. |

## Proposed routing

```mermaid
flowchart LR
  G[General inquiries] --> C[contact@forgewirelabs.com mailbox]
  S[Public software questions] -->|same-domain alias or public project issue| C
  V[Private vulnerability report] -->|only after verified setup| SEC[security@forgewirelabs.com separate mailbox]
  P[Project-specific security intake] -->|when GitHub private reporting is enabled| GH[Private report in affected repository]
  O[Existing named .org mailbox: preserved, no forwarding change]
```

`support@` should be a same-domain alias or forwarding identity only if IONOS confirms it is included and a controlled reply test succeeds. Otherwise, list the project issue tracker for public software reports and let the general mailbox handle private ordinary questions. Do not configure forwarding for any identity until the destination, reply identity, and categorization have been agreed and tested.

## Owner inspection and staged rollout

1. In IONOS Email & Office, identify the exact email product/contract and list mailbox and forwarding entries, without changing them. Record quota used/available, included account count, remaining aliases/forwards, permitted domains, renewal date, and tax-inclusive recurring amount.
2. Confirm the existing `.org` mailbox remains on its current address and product. Do not rename, migrate, delete, or add a forward to it.
3. Check whether an unused included mailbox can be created on `.com`, then whether a second separate mailbox and one support forwarding/alias identity are included. Ask for the itemized incremental and renewal quote if the panel does not display it clearly.
4. Confirm current spam and optional virus-protection settings, whether two-step verification is enabled, recovery methods, and who can access each mailbox. Store recovery material in the owner's secure password manager.
5. After separate owner approval to activate mail, create the minimum selected identities, enable MFA on each mailbox, and test inbound routing, independent security separation, reply-from identity, spam filtering, and controlled delivery. Do not send test mail to unrelated recipients.
6. Inspect headers for SPF/DKIM/DMARC pass and alignment. Do not change DNS based only on an IONOS status label.
7. Only after successful end-to-end tests, update the public website to mark the verified identities active and add exact `mailto:` links. If the site remains on the public fallback, keep it until the new path is confirmed.

### Decisions for Jeremy and ChatGPT

- Whether an included `.com` mailbox can be used for general contact, and whether any included allowance supports a separate security mailbox.
- Whether the account-specific recurring price is acceptable if one additional mailbox is required.
- Whether `support@` should exist as a same-domain alias, or software inquiries should simply use project repositories.
- Whether the owner will check the separate security inbox directly and keep its access/recovery separate from general correspondence.
- Whether to publish the three planned identity names in the staging preview; the current preview shows them clearly labeled inactive for review.

No mailbox, forwarding rule, credential, sender identity, DNS record, or paid email product was created or modified during this assessment.
