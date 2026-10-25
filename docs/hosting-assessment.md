# IONOS hosting capability and cost assessment

**Checked:** 2026-10-25. This is an account-level assessment based on the screenshots supplied for this task and public IONOS documentation. No IONOS settings were changed.

## Account evidence

The supplied account screenshots show an active IONOS Web Hosting Plus contract and the `forgewirelabs.com` domain listed under the same contract. The domain is marked “Domain not in use.” The contract services view lists “IONOS CDN powered by Cloudflare” as an active item, but it does not identify a Basic/Pro tier, a price, or a hostname configured to use it. This confirms a CDN-related contract item is present; activation for the website and its billing treatment remain unverified. The detail screenshot does not show an invoice amount, exact hosting allocation, or SSL assignment status. Contract identifiers and personal account details are intentionally excluded from this public assessment.

The existing `.com` domain and hosting contract are already active services. No conclusion about their price, renewal total, or incremental CDN cost can be drawn from the screenshots.

## Capability findings

| Question | Finding | Account-specific status |
|---|---|---|
| Linux or Windows | The supplied contract is named “Web Hosting Plus,” without a Windows suffix. IONOS says classic hosting contracts without “Windows” are Linux; Windows web hosting is sold as ASP.NET Hosting. | Linux is the expected plan type; confirm in the contract view before choosing any server-specific settings. |
| Available webspace | IONOS's current US Linux Hosting Plus listing specifies 350 GB NVMe. The user's contract screenshot has the matching “Web Hosting Plus” name, but its allocation and usage panel are not shown. | Likely 350 GB; verify the exact allocation in the account. |
| SSL | IONOS lists one DV wildcard certificate on its current Linux Hosting Plus plan and says wildcard SSL is included with hosting. The domain still needs SSL assignment/activation; IONOS documents that activation requires an active domain and its nameservers. The screenshot shows Domain Guard, not SSL status. | Certificate entitlement is expected; domain assignment and activation are unverified. |
| File transfer | IONOS documents encrypted SFTP and FTPS for webspace uploads. Recent hosting tariffs support SFTP-only accounts and optional SSH. FTP without encryption is not offered for webspace access. | Exact account protocol options should be checked in the hosting dashboard. |
| Directory restriction | An SFTP account can be limited to a directory, but IONOS warns that this is an SFTP-level restriction rather than true webspace isolation. | Relevant for deployment-account design. |
| Git on host | IONOS documents preinstalled Git on Linux Web Hosting and says it is not available on Windows Web Hosting. A server-side Git deployment is unnecessary for this static site. | Do not assume Git is available until Linux is confirmed. |
| Domain assignment | IONOS can connect a domain to a webspace directory. Its setup may offer DNS changes when the domain does not already point at IONOS webspace. The current “not in use” status indicates this has not been completed. | Must remain unchanged until deployment approval. |
| CDN | IONOS CDN is powered by Cloudflare, requires an available Basic or Pro package, and activation changes DNS for the selected hostname. It is limited to subdomains such as `www`; it cannot be activated on the apex `.com` hostname. One CDN package is required per main domain. | A CDN service item is listed as active in the contract view. Its tier, fee, usage statistics, and activation for any hostname remain unknown. |

## CDN assessment

The IONOS help page says CDN activation is available only for compatible subdomains; activating it changes that subdomain's DNS entries to the Cloudflare network. The apex `forgewirelabs.com` cannot itself be selected. The `www` hostname could be a candidate only if it exists, is not used for email/FTP/SSH or custom DNS, and the package is available. The contract screenshot confirms a CDN item exists but does not show the selected hostname, plan tier, configuration state, or billing line.

IONOS lists CDN Basic with a 50 GB daily bandwidth limit and CDN Pro with unlimited bandwidth and additional security and optimization features. The supplied contract screenshot does not identify the tier or price. It also does not prove that the CDN is active for `www` or another hostname. Do not click activation, purchase, upgrade, or “Buy now” controls to investigate. A CDN is not needed for this lightweight static prototype; leave its configuration unchanged until its entitlement, billing, and hostname effects are confirmed and a performance need is established.

## Cost assessment

| Item | Assessment |
|---|---|
| Domain | `.com` registration already exists. Screenshot shows a future renewal date, but not the renewal amount. |
| Web hosting | The Web Hosting Plus contract already exists. A static site should use the existing webspace if the account confirms that webspace and domain assignment are included. The screenshots do not show the contract's monthly or renewal charge. |
| Web Hosting Plus public reference price | The current US IONOS Linux Hosting page advertises Plus at $1/month during a one-year term, then $14/month. This is a public new-customer offer, not the account invoice or a prediction of this contract's renewal amount. |
| SSL | Public IONOS documentation says a wildcard certificate is included with hosting products. Verify that the certificate is available and assignable to this domain before launch; the account view is needed to confirm. |
| CDN | A CDN service item appears in the existing contract view, without a package tier or charge. Its incremental cost cannot be established from the supplied screenshots or IONOS's public feature comparison. No CDN configuration or purchase is part of this proposal. |
| GitHub | GitHub's Free plan includes unlimited public repositories. This project uses a public source repository and pull request only; it does not use GitHub Pages, Actions, Codespaces, or Packages. GitHub is not the website host, and adding domains does not create a per-domain GitHub charge. The organization's current billing plan is not visible here. |

**Expected marginal hosting cost:** $0 for static-site build tools and source review. The website may have $0 additional hosting cost if the existing contract includes usable webspace and SSL, but that cannot be verified without the contract's billing details. The public $14/month post-promotion price is a useful reference for the current US Plus offer, not this account's bill. The CDN item may already be included or may carry a charge; the screenshots do not establish which. Confirm the hosting and CDN line items in the invoice before approving production deployment. No migration or upgrade is recommended.

## Verification still needed in IONOS

Before any production change, confirm in the account:

1. The hosting product is Linux Web Hosting, and the Webspace view shows the total and free storage.
2. The contract includes an SSL certificate; check whether it is available and assigned to `forgewirelabs.com`.
3. The exact SFTP-only account options and the domain's assigned webspace directory.
4. The CDN package name/tier, activation status, billing line, and next renewal amount. Do not activate it during inspection.
5. The amount due at the next hosting and domain renewal, and whether static hosting changes any charge.

## Primary sources

- [IONOS: Linux Web Hosting vs. Windows/ASP.NET Hosting](https://www.ionos.com/help/hosting/differences-between-linux-web-hosting-and-windows-web-hosting-aspnet-hosting/)
- [IONOS: check contract information for available webspace](https://www.ionos.com/help/domains/connecting-a-domain-to-your-webspace/check-contract-information-for-available-webspace/)
- [IONOS: check available storage in Linux Web Hosting](https://www.ionos.com/help/hosting/managing-disk-space/check-your-free-storage-space-linux-packages/)
- [IONOS: secure file transfer with SFTP and FTPS](https://www.ionos.com/help/hosting/setting-up-and-managing-ftp-access/transferring-files-securely-with-ftps-and-sftp/)
- [IONOS: create an SFTP/SSH account and its directory restriction](https://www.ionos.com/help/hosting/setting-up-and-managing-ftp-access/creating-an-sftp/ssh-account/)
- [IONOS: Git availability on Linux Web Hosting](https://www.ionos.com/help/hosting/git/does-git-need-to-be-installed/)
- [IONOS: SSL certificate included with hosting and activation](https://www.ionos.com/help/ssl-certificates/tips-for-setup-and-use/secure-your-website-with-ssl-encryption/)
- [IONOS: connect a domain to a webspace directory](https://www.ionos.com/help/domains/connecting-a-domain-to-your-webspace/connecting-a-domain-to-a-webspace-directory/)
- [IONOS: CDN activation requirements and DNS effects](https://www.ionos.com/help/hosting/content-delivery-network-cdn/activating-the-ionos-cdn/)
- [IONOS: CDN Basic and Pro comparison](https://www.ionos.com/help/hosting/content-delivery-network-cdn/cdn-basic-and-cdn-pro-compared/)
- [IONOS: CDN Basic daily bandwidth limit](https://www.ionos.com/help/hosting/content-delivery-network-cdn/information-on-the-bandwidth-limit-for-cdn-basic/)
- [IONOS: ordering CDN](https://www.ionos.com/help/hosting/content-delivery-network-cdn/ordering-ionos-cdn/)
- [IONOS: current US Linux Hosting Plus features and public price](https://www.ionos.com/hosting/linux-hosting)
- [GitHub: plans and pricing](https://github.com/pricing)
