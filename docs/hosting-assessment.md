# IONOS Web Hosting Plus: capability and cost assessment

**Reviewed:** 2026-10-25
**Scope:** `forgewirelabs.com` only. The other registered domains are out of scope. No IONOS settings, DNS, certificates, CDN, or contract details were changed.

## Evidence and limits

The supplied account screenshots show an active **IONOS Web Hosting Plus** contract. `forgewirelabs.com` is listed in that contract and is marked **Domain not in use**. The contract-services screen also lists **IONOS CDN powered by Cloudflare** as an additional item. The screenshots do not show the webspace quota or free space, invoice totals, CDN tier or hostname activation, or whether an SSL certificate is assigned to `.com`.

The account was not available for a read-only contract inspection during this review, so account-specific quota, invoice, certificate, and CDN billing details remain unverified. No credentials were entered or stored.

## Capabilities relevant to this site

| Capability | Verified product information | Account-specific result |
|---|---|---|
| Operating system | IONOS identifies classic Web Hosting without a “Windows” suffix as Linux hosting. The screenshot names the contract “IONOS Web Hosting Plus” with no Windows suffix. | **Linux is confirmed by the contract name shown.** |
| Webspace | The current US Linux Plus offer lists 350 GB NVMe storage and unlimited websites. IONOS says actual available space is shown in Hosting → Webspace. | **350 GB is the current catalogue figure; assigned quota and free space must still be checked in the contract.** |
| Secure upload | IONOS provides encrypted SFTP or FTPS, not unencrypted FTP. Tariffs introduced after August 2024 support an SFTP-only account or an SFTP+SSH account. The current Plus offer lists 200 SFTP accounts. | **SFTP is the suitable transfer method.** Confirm account options and the webspace host name before deployment. Use an SFTP-only account. |
| Account restriction | A new SFTP account can be limited to a selected directory. IONOS says this is a transfer-layer restriction, not full webspace isolation; true isolation needs a separate webspace contract. | Suitable for a static deploy account if the webspace contains no unrelated secrets. Do not use it to store credentials or private data. |
| SSL | The current Plus offer includes one DV wildcard certificate. IONOS documents the included SSL Starter Wildcard as covering one domain and its subdomains; it must be activated and assigned to the domain. | **Entitlement is expected from the plan. Assignment/activation for `forgewirelabs.com` is unverified.** No paid certificate is recommended. |
| Domain assignment | IONOS can assign a domain to a webspace directory when the domain is in a contract with webspace and points to IONOS webspace. Its wizard may offer to change DNS records when they do not already point there. | The `.com` is in the hosting contract but unused. Directory assignment is a production change and is not authorized yet. Stop if the wizard proposes DNS changes. |
| Redirects | Linux Web Hosting supports `.htaccess` rewrite rules; IONOS documents that `mod_rewrite` is enabled on its Web Hosting servers. | Can implement HTTP→HTTPS and `www`→apex redirects after both hostnames resolve to the host and have valid certificates. Test before enabling. |
| CDN | IONOS Web Hosting CDN has Basic and Pro tiers. Basic has a 50 GB/day limit; Pro has unlimited bandwidth and extra security features. Activation is for subdomains only, changes their DNS to the Cloudflare network, and cannot be used directly on the apex domain. A separate CDN package is needed per main domain. | The contract screenshot proves an IONOS CDN line item exists, not that `.com` or `www` is configured to use it. Tier, activation, usage, and fee are unknown. Do not activate or select it for this site. |

## Cost assessment

| Item | Assessment |
|---|---|
| Existing Web Hosting Plus | The contract already exists. Using its included webspace and included SSL should not require a new hosting service if the account confirms both are available. The current invoice and renewal price are not shown, so the existing monthly/annual cost cannot be stated. |
| Public Plus reference | IONOS currently lists the US Linux Plus offer at $1/month for a one-year term, then $14/month. This is a public offer, **not** this account’s price or renewal amount. |
| SSL | One DV wildcard certificate is included in the current Web Hosting Plus listing and in IONOS’s hosting SSL documentation. No separate certificate purchase is recommended. Confirm the included certificate is still available and assigned before launch. |
| CDN | A CDN item appears in the contract. The screenshots and public Web Hosting CDN help pages do not expose its price, term, tier, or usage charge. Treat the current billing impact as **unknown** until checked on the invoice. Ordering another package or upgrading through IONOS can add a product to the contract; do not proceed. |
| Domain and DNS | The `.com` is already registered and included in the contract listing. Renewal cost and any domain-related add-on charges are not shown. No domain or DNS change is needed for local development. |
| Deployment tools | Eleventy and Node build locally. SFTP is available as the proposed manual transfer path. No paid build runner, Deploy Now plan, or CDN is needed for the initial static site. |

**Recommendation:** Use the existing Linux Web Hosting Plus webspace for the static site after Jeremy confirms the free space, included SSL assignment, and current contract invoice. Do not enable the CDN for v1. The expected incremental hosting cost is $0 only if the existing contract’s listed hosting and SSL cover this use; that account-specific condition has not yet been confirmed.

## Before production approval

1. In Hosting → Webspace, record the total and free space and confirm the contract still exposes the Linux SFTP-only account option.
2. In Domains & SSL, confirm the included DV wildcard certificate is available and can be assigned to `forgewirelabs.com` and `www.forgewirelabs.com`.
3. Confirm the CDN item’s Basic/Pro tier, whether it is already configured for any hostname, and the associated invoice/renewal line. Do not activate it during inspection.
4. Confirm the hosting, domain, and CDN invoice amounts and renewal terms. Do not infer them from public promotional prices.
5. Confirm the domain’s existing DNS state before using IONOS’s domain-binding wizard. Do not approve an automatic DNS change without separate authorization.

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
