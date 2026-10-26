# Proposed IONOS deployment and rollback procedure

**Status:** Procedure only. No production deployment, DNS change, domain assignment, certificate activation, CDN activation, or credential setup has occurred. The other registered domains are outside scope.

## Go/no-go prerequisites

Do not begin the production sequence until each item is verified and approved:

1. Jeremy approves the final content, accessibility status, PR #1 merge, and production launch.
2. The IONOS Hosting → Webspace view confirms the contract's actual total/free storage and the available document-root path.
3. The IONOS account confirms an SFTP-only account can be used and the domain can be bound to the selected webspace directory.
4. Domains & SSL confirms a certificate can be assigned and validates for both forgewirelabs.com and www.forgewirelabs.com. Confirm the apex and www certificate behavior directly before redirecting either hostname.
5. The invoice confirms current Web Hosting, CDN, and domain charges and renewal amounts. Do not infer the account's cost from the public catalogue.
6. Record current DNS records and their TTLs. Preserve MX, TXT, CAA, mail, and unrelated service records.
7. Jeremy approves connecting the .com to IONOS webspace and any specific A, AAAA, or CNAME changes. The IONOS domain-assignment wizard may propose DNS changes; stop at that prompt until those exact changes are approved.
8. Confirm public legal/privacy text and the contact policy. Keep the verified general and software mail links active. The reserved security mailbox is omitted from v1 and does not block website launch; activating it for confidential reporting would require a separate owner-approved change.

No other domain is included in this deployment.

## Current target facts (25 October 2026)

- The supplied contract page lists `forgewirelabs.com` under Web Hosting Plus with status **Domain not in use**. The screenshot does not show the document root or available quota.
- Public DNS resolves the apex to A `74.208.236.125` and AAAA `2607:f1c0:100f:f000::200` (TTL 3600). The apex currently serves the IONOS parking page over HTTP and HTTPS; HTTP does not redirect. HTTPS passes system trust validation.
- `www.forgewirelabs.com` has no DNS answer. Preserve both current apex records. A `www CNAME forgewirelabs.com.` is a candidate only; verify certificate coverage and obtain explicit approval before adding it.
- MX, SPF, DKIM, and IONOS-managed DMARC records resolve to the existing mail service. Preserve them exactly. No DNS change has been made.
- The account-only document-root path, available space, SFTP-only credentials/options, certificate assignment, invoice charges, and CDN status/fee were not available for inspection. The production destination and incremental cost are therefore unresolved; do not deploy until the account provides these facts.

No deployment account or secret has been configured. The planned transfer is SFTP over a dedicated SFTP-only account with access limited to the selected release area, if the contract supports it. Do not use plain FTP or place secrets in the shared webspace.

## Release build and review

1. Merge PR #1 only after explicit approval. Record the approved source commit SHA.
2. In a clean checkout of that SHA, run:

~~~
npm ci
npm run build
npm run verify
npm audit --audit-level=high
~~~

3. Inspect the generated `_site` directory and retain only generated production files: HTML, CSS, approved image/SVG assets, `robots.txt`, `sitemap.xml`, and the production `.htaccess`. Confirm canonical URLs use `https://forgewirelabs.com` and production has no `noindex`. Reject source maps, `.env` files, credentials, documentation, source files, `node_modules`, and `.git`.
4. Create a release folder outside the source checkout containing the exact `_site` upload tree, `SHA256SUMS.txt`, and a ZIP of that tree. Record the source SHA, build date, archive SHA-256, and manifest with the release record. Upload only the contents of the site tree; keep the ZIP and manifest outside the public document root.

## Prepare and upload without exposing an incomplete site

1. Record and privately back up the current domain assignment and the selected hosting directory before changing either. Inspect and back up any existing files in that directory; the directory contents are currently unknown. Keep this backup out of the repository and public webspace.
2. Create a versioned release directory in the verified IONOS webspace, named with the approved source SHA. Upload only the contents of the `_site` tree over SFTP. The exact host, account, and directory path must come from the Hosting panel; they have not been verified yet.
3. Use a dedicated SFTP-only account, restricted to the release area if the account permits it. IONOS documents that this restriction applies at the SFTP layer, so the shared webspace must contain no secrets or unrelated sensitive material.
4. Compare the uploaded file list and SHA-256 hashes with the local release manifest. Confirm directory listing is disabled and that no source or internal files are reachable.
5. If the account offers a preview hostname that does not require DNS or a paid add-on, use it to check the uploaded directory before binding the production domain. Otherwise, complete the local artifact checks before the domain binding step.

## Bind the .com and establish canonical HTTPS

The approved canonical URL is the apex host: https://forgewirelabs.com.

1. In IONOS, assign `forgewirelabs.com` to the versioned release directory. If the panel proposes DNS edits, apply only the separately approved exact records; do not accept a bundled or unexplained change. Current apex A/AAAA point to IONOS and should be preserved unless IONOS provides a documented, necessary change for approval.
2. Confirm the domain status becomes active and the apex serves the uploaded site. Check that email and other DNS-dependent services remain unchanged.
3. Bind `www.forgewirelabs.com` to the same site only if the owner approves it and the certificate is valid for it. If a DNS record is required, the current candidate is `www CNAME forgewirelabs.com.`; stop until that exact change is approved.
4. Assign/activate the included SSL certificate for the approved hostnames. Confirm a valid, trusted certificate and successful HTTPS for each hostname before adding redirects.
5. Install and verify HTTP-to-HTTPS and www-to-apex 301 redirects using the IONOS-supported Linux rewrite or domain-redirect configuration. Preserve request paths and query strings. Do not enable HSTS until the apex, www redirect, and all required HTTPS paths have been verified.
6. The production build's canonical tags and sitemap already point to the apex. Check them on every route after deployment. Confirm production has no noindex directive and robots.txt exposes the production sitemap.

## Post-deployment verification

From an independent network/request, check:

- https://forgewirelabs.com and all five routes return successfully with a valid certificate.
- HTTP redirects to HTTPS; www redirects to the apex only after www is approved, resolves, and has a valid certificate.
- CSS, JavaScript if present, fonts, image assets, favicon, robots.txt, and sitemap.xml load without errors.
- Canonical tags use the apex production URLs; production is indexable; the sitemap lists only production routes.
- Navigation, mail/external links, 320 CSS-pixel width, keyboard access, the wide project table, and desktop/mobile layouts work.
- Requests for source, documentation, environment files, source maps, repository metadata, and credentials fail.
- Uploaded hashes match the release manifest, with no unreviewed files in the public directory.

Save request results and the release manifest. Keep the GitHub Pages preview available until Jeremy accepts the production result.

## Rollback

1. Stop the release and record the failure and affected source SHA.
2. Reassign forgewirelabs.com to the previous document directory, or restore the backed-up document-root files if the previous version used the same directory.
3. Restore the previous redirect configuration. Do not remove HTTPS while visitors may still use it; keep the prior valid certificate in place.
4. Restore DNS only if this release changed DNS, and only to the exact pre-change values captured in the approved DNS record. Leave MX/TXT and unrelated records untouched.
5. Verify the apex, any approved www redirect, certificates, routes, assets, and email-related DNS after rollback. Escalate IONOS account or certificate failures to IONOS support rather than changing unrelated settings.
6. Keep the failed release directory and its manifest private until the incident review is complete.

## Retire the staging preview

After production has been verified and accepted, follow preview-hosting.md to disable the repository's GitHub Pages source and remove the website-preview artifact branch. Verify that the former public preview and review-capture URLs no longer serve the site. Do not remove the preview before production acceptance.

## Cost and service boundaries

No new service is proposed. The incremental cost is **unverified**, not confirmed as $0: the screenshots do not establish usable free space, invoice totals, certificate assignment, CDN tier/status, or CDN cost. Do not activate CDN, order a package, upgrade, purchase a certificate, or change the hosting contract for v1. Using the existing included webspace and SSL must be confirmed not to add a charge before the production action is approved.
