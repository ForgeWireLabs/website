# IONOS Web Hosting Plus: capability and cost assessment

**Reviewed:** 2026-10-26
**Scope:** forgewirelabs.com only. The other registered domains are out of scope. The account and DNS observations below were recorded before the owner connected the domain. The post-activation update supersedes conflicting prelaunch observations.

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

**Updated recommendation:** Keep the live apex site on the existing Web Hosting Plus contract. The production artifact and HTTPS behavior are verified publicly. Do not enable CDN or buy/upgrade services. The existing contract invoice and incremental costs remain unknown until reviewed.

## Public DNS and prelaunch behavior (2026-10-25; superseded by the post-activation update)

An independent DNS query to 1.1.1.1 on 2026-10-25 returned:

| Name | Observed record | TTL |
|---|---|---:|
| `forgewirelabs.com` | A `74.208.236.125`; AAAA `2607:f1c0:100f:f000::200` | 3600 seconds |
| `www.forgewirelabs.com` | No A, AAAA, or CNAME answer | — |
| `forgewirelabs.com` | MX `mx00.ionos.com`, `mx01.ionos.com`; SPF `v=spf1 include:_spf-us.ionos.com ~all` | 3600 seconds |
| `s1-ionos._domainkey` / `s2-ionos._domainkey` | CNAMEs to `s1.dkim.ionos.com` / `s2.dkim.ionos.com` | 3600 seconds |
| `_dmarc` | CNAME to `dmarc.ionos.com` | 3600 seconds |

The apex currently returns an IONOS parking/registration page over HTTP and HTTPS. HTTP does not redirect to HTTPS. HTTPS passed the system trust check. `www` does not resolve. Preserve the apex A/AAAA and all mail-related DNS records. A possible `www CNAME forgewirelabs.com.` is only a candidate: first verify IONOS domain binding and certificate coverage, then obtain explicit owner approval before adding it. No DNS record was changed.

## Remaining account-specific details after launch

1. The actual assigned/free webspace quota and IONOS invoice totals remain unverified. The current static release serves successfully from the existing contract.
2. The owner reported that the included certificate is assigned. Independent HTTPS validation now confirms that the apex certificate is trusted, covers forgewirelabs.com, and is currently valid. No certificate purchase or reassignment is needed.
3. The contract screenshot showed an IONOS CDN item, but its tier, activation, usage, and charge remain unknown. No CDN activation was performed or is required for this release.
4. Jeremy reports that IONOS accepted Connect to webspace even though its summary still showed the older Domain not in use message. The public apex now returns the exact production release. Do not reconnect or change the assignment without a concrete discrepancy.
5. www resolves to the same A and AAAA addresses as the apex and has been checked over HTTP and HTTPS. Both redirect to the canonical apex with paths and query strings preserved; the certificate covers the hostname. No change was required.

## Post-activation update (2026-10-26 UTC)

Independent requests through public DNS resolvers 1.1.1.1 and 8.8.8.8 return A 74.208.236.171 and AAAA 2607:f1c0:100f:f000::200 for both forgewirelabs.com and www.forgewirelabs.com (TTL 3600). The apex returns the verified production release over IPv4 and IPv6. The owner-reported domain connection is therefore functionally active for the apex; no further domain assignment action was made by Codex.

The apex HTTPS certificate has subject CN=*.forgewirelabs.com and SANs for *.forgewirelabs.com and forgewirelabs.com. The issuer is Sectigo Public Server Authentication CA DV R36; observed validity is 2026-10-25 through 2027-04-23 UTC. System trust and hostname validation passed. HTTP redirects to apex HTTPS with HTTP 301, followed by HTTP 200 and no loop.

The current public DNS observations include MX records mx01.ionos.com and mx00.ionos.com, SPF value v=spf1 include:_spf-us.ionos.com ~all, and an IONOS-managed DMARC CNAME. Codex made no DNS or mail changes. The existing DKIM and controlled mail-flow verification is documented in email-architecture-assessment.md.

The IONOS account page was not refreshed during this pass because the authorized computer-use screenshot capture returned “encode latest capture frame failed: window crop is outside captured monitor,” including after refreshing the window selection. Public response checks verified the live mapping, so no reconnect was attempted. Invoice details, assigned webspace quota, and CDN activation/charges remain unverified. No additional service was activated or purchased.

## Post-launch DNS and hostname verification (2026-10-26 UTC)

The four IONOS authoritative name servers and public resolvers 1.1.1.1 and 8.8.8.8 agree on the current apex and www answers: A 74.208.236.171 and AAAA 2607:f1c0:100f:f000::200 (TTL 3600). The earlier apex observation 74.208.236.125 is no longer present. The observed address change is consistent with the currently serving IONOS web host; the available evidence does not establish what caused the change.

Requests to https://www.forgewirelabs.com/ and its HTTP equivalent return 301 to https://forgewirelabs.com/. A /work/ request with a query string preserved both when redirected. The Sectigo certificate is trusted for the apex and www and is valid through 2027-04-23 UTC. No DNS, www assignment, redirect, or certificate setting was changed during this check.

Authoritative MX, SPF, DKIM selector CNAME, and IONOS-managed DMARC CNAME records match the prelaunch values in email-architecture-assessment.md. All four name servers returned MX mx00.ionos.com and mx01.ionos.com, SPF v=spf1 include:_spf-us.ionos.com ~all, s1-ionos and s2-ionos DKIM CNAMEs, and _dmarc pointing to dmarc.ionos.com. The existing controlled mail-flow tests reported SPF, DKIM, and DMARC pass. No mail record was changed.
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
