# IONOS Web Hosting Plus: capability and cost assessment

**Reviewed:** 2026-10-25
**Scope:** `forgewirelabs.com` only. The other registered domains are out of scope. No IONOS settings, DNS, certificates, CDN, or contract details were changed.

## Evidence and limits

The supplied account screenshots show **IONOS Web Hosting Plus**, active since 2026-10-24 and renewing 2027-10-23. `forgewirelabs.com` is listed in that contract and is marked **Domain not in use**. The contract-services screen also lists **IONOS CDN powered by Cloudflare** as an additional item, with no renewal date shown in the captured row. The screenshots do not show the webspace quota or free space, invoice totals, CDN tier or hostname activation, or whether an SSL certificate is assigned to `.com`.

The authenticated account was not available for a read-only contract inspection during this review: the IONOS page redirected to sign-in and the authorized Windows computer-use workflow stopped on its user-input safety check. Account-specific quota, document root, SFTP configuration, invoice, certificate assignment, and CDN billing details therefore remain unverified. No credentials were entered or stored.

## Capabilities relevant to this site

| Capability | Verified product information | Account-specific result |
|---|---|---|
| Operating system | IONOS distinguishes Linux Web Hosting from Windows Web Hosting/ASP.NET. The screenshot names the product “IONOS Web Hosting Plus” but does not show an operating-system field. | **Likely Linux based on the product naming, but not independently confirmed in the account. Verify before relying on `.htaccess` or Linux-specific steps.** |
| Webspace | The current US Linux Plus offer lists 350 GB NVMe storage and unlimited websites. IONOS says actual available space is shown in Hosting → Webspace. | **Catalogue figures only; assigned quota, free space, and document-root path are unverified.** |
| Secure upload | IONOS documents encrypted SFTP or FTPS and supports SFTP-only accounts on eligible plans. The public Plus offer lists 200 SFTP accounts. | **SFTP is the proposed transfer method; this contract's account options, hostname, and credentials are unverified. Use a dedicated SFTP-only account if available.** |
| Account restriction | A new SFTP account can be limited to a selected directory. IONOS says this is a transfer-layer restriction, not full webspace isolation; true isolation needs a separate webspace contract. | Suitable for a static deploy account if the webspace contains no unrelated secrets. Do not use it to store credentials or private data. |
| SSL | The current Plus offer includes one DV wildcard certificate. IONOS documents the included SSL Starter Wildcard as covering one domain and its subdomains; it must be activated and assigned to the domain. | A trusted certificate currently serves the public apex parking page, as an external HTTPS request succeeded with system certificate validation. **The account's included certificate entitlement and assignment to the production webspace remain unverified.** No paid certificate is recommended. |
| Domain assignment | IONOS can assign a domain to a webspace directory when the domain is in a contract with webspace and points to IONOS webspace. Its wizard may offer to change DNS records when they do not already point there. | The `.com` is in the hosting contract but unused. Directory assignment is a production change and is not authorized yet. Stop if the wizard proposes DNS changes. |
| Redirects | Linux Web Hosting supports `.htaccess` rewrite rules; IONOS documents that `mod_rewrite` is enabled on its Web Hosting servers. | Can implement HTTP→HTTPS and `www`→apex redirects after both hostnames resolve to the host and have valid certificates. Test before enabling. |
| CDN | IONOS Web Hosting CDN has Basic and Pro tiers. Basic has a 50 GB/day limit; Pro has unlimited bandwidth and extra security features. Activation is for subdomains only, changes their DNS to the Cloudflare network, and cannot be used directly on the apex domain. A separate CDN package is needed per main domain. | The screenshot proves a CDN line item exists, not that `.com` or `www` is configured to use it. Tier, activation, usage, and fee are unknown. Do not activate or select it for this site. |

## Cost assessment

| Item | Assessment |
|---|---|
| Existing Web Hosting Plus | The contract already exists. Using its included webspace and included SSL should not require a new hosting service if the account confirms both are available. The current invoice and renewal price are not shown, so the existing monthly/annual cost cannot be stated. |
| SSL | One DV wildcard certificate is included in the current Web Hosting Plus listing and in IONOS’s hosting SSL documentation. No separate certificate purchase is recommended. Confirm the included certificate is still available and assigned before launch. |
| CDN | A CDN item appears in the contract. The screenshots and public Web Hosting CDN help pages do not expose its price, term, tier, or usage charge. Treat the current billing impact as **unknown** until checked on the invoice. Ordering another package or upgrading through IONOS can add a product to the contract; do not proceed. |
| Domain and DNS | The `.com` is already registered and included in the contract listing. Domain renewal cost and other domain-related charges are not shown. No domain or DNS change is needed for local development. |
| Deployment tools | Eleventy and Node build locally. SFTP is available as the proposed manual transfer path. No paid build runner, Deploy Now plan, or CDN is needed for the initial static site. |

**Recommendation:** Use the existing Web Hosting Plus webspace for the static site once the account confirms its operating system, usable space, document root, SFTP access, certificate assignment, and invoice treatment. Do not enable the CDN for v1. No new service is proposed, but the actual incremental cost cannot be stated as $0 until the owner checks the account and invoice.

## Public DNS and current behavior

An independent DNS query to 1.1.1.1 on 2026-10-25 returned:

| Name | Observed record | TTL |
|---|---|---:|
| `forgewirelabs.com` | A `74.208.236.125`; AAAA `2607:f1c0:100f:f000::200` | 3600 seconds |
| `www.forgewirelabs.com` | No A, AAAA, or CNAME answer | — |
| `forgewirelabs.com` | MX `mx00.ionos.com`, `mx01.ionos.com`; SPF `v=spf1 include:_spf-us.ionos.com ~all` | 3600 seconds |
| `s1-ionos._domainkey` / `s2-ionos._domainkey` | CNAMEs to `s1.dkim.ionos.com` / `s2.dkim.ionos.com` | 3600 seconds |
| `_dmarc` | CNAME to `dmarc.ionos.com` | 3600 seconds |

The apex currently returns an IONOS parking/registration page over HTTP and HTTPS. HTTP does not redirect to HTTPS. HTTPS passed the system trust check. `www` does not resolve. Preserve the apex A/AAAA and all mail-related DNS records. A possible `www CNAME forgewirelabs.com.` is only a candidate: first verify IONOS domain binding and certificate coverage, then obtain explicit owner approval before adding it. No DNS record was changed.

## Before production approval

1. In Hosting → Webspace, record the operating system, total and free space, document-root path, and confirm the contract exposes an SFTP-only account option.
2. In Domains & SSL, confirm the included DV wildcard certificate is available and can be assigned to `forgewirelabs.com` and `www.forgewirelabs.com`.
3. Confirm the CDN item’s Basic/Pro tier, whether it is already configured for any hostname, and the associated invoice/renewal line. Do not activate it during inspection.
4. Confirm the hosting, domain, and CDN invoice amounts and renewal terms. Do not infer them from public promotional prices.
5. Confirm the domain’s existing DNS state before using IONOS’s domain-binding wizard. Preserve apex A/AAAA and mail DNS. Do not approve an automatic DNS change without separate authorization. The only currently identified hostname gap is that `www` does not resolve; any proposed record must be shown to Jeremy for approval before applying it.

## Primary sources

- [IONOS: Linux hosting vs. Windows/ASP.NET hosting](https://www.ionos.com/help/hosting/differences-between-linux-web-hosting-and-windows-web-hosting-aspnet-hosting/)
- [IONOS: current US Linux Hosting features and pricing](https://www.ionos.com/hosting/linux-hosting)
- [IONOS: check available webspace in the contract](https://www.ionos.com/help/domains/connecting-a-domain-to-your-webspace/check-contract-information-for-available-webspace/)
- [IONOS: check free storage space](https://www.ionos.com/help/hosting/managing-disk-space/check-your-free-storage-space-linux-packages/)
- [IONOS: secure SFTP/FTPS transfer](https://www.ionos.com/help/hosting/setting-up-and-managing-ftp-access/transferring-files-securely-with-ftps-and-sftp/)
- [IONOS: create SFTP-only or SFTP+SSH account](https://www.ionos.com/help/hosting/setting-up-and-managing-ftp-access/creating-an-sftp/ssh-account/)
- [IONOS: included SSL certificate types and domain coverage](https://www.ionos.com/help/ssl-certificates/before-installation/what-types-of-ssl-certificates-are-offered-by-11-ionos/)
- [IONOS: secure a website with SSL](https://www.ionos.com/help/ssl-certificates/tips-for-setup-and-use/secure-your-website-with-ssl-encryption/)
- [IONOS: assign a domain to a webspace directory](https://www.ionos.com/help/domains/connecting-a-domain-to-your-webspace/connecting-a-domain-to-a-webspace-directory/)
- [IONOS: rewrite rules on Linux Web Hosting](https://www.ionos.com/help/hosting/htaccess/notes-on-creating-rewrite-rules/)
- [IONOS: activate CDN and DNS effects](https://www.ionos.com/help/hosting/content-delivery-network-cdn/activating-the-ionos-cdn/)
- [IONOS: CDN Basic and Pro comparison](https://www.ionos.com/help/hosting/content-delivery-network-cdn/cdn-basic-and-cdn-pro-compared/)
- [IONOS: order a CDN package](https://www.ionos.com/help/hosting/content-delivery-network-cdn/ordering-ionos-cdn/)
