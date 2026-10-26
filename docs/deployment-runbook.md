# IONOS production deployment and rollback runbook

**Current status (2026-10-26 UTC):** The initial apex production release is live and independently verified. The deployed site is the production artifact built from source commit ffb6c3874009ca1abbc5e364b7eac844b334a9d5. Jeremy reports that IONOS accepted “Connect to webspace.” Codex has not changed production DNS, domain assignment, SSL settings, CDN, billing, mail settings, or the hosting contract. The other registered domains remain out of scope.

The exact SFTP endpoint, user, restricted path, and release manifest are retained in the private IONOS upload record. Do not put credentials or account-specific transfer details in public repository documentation.

## Current production facts

- Canonical host: https://forgewirelabs.com.
- The apex serves all five routes and all 16 publicly served files byte-for-byte matching the validated ffb6c38 release. The 17th manifest entry, .htaccess, is intentionally blocked from public access.
- Public resolvers 1.1.1.1 and 8.8.8.8 return apex A 74.208.236.171 and AAAA 2607:f1c0:100f:f000::200 (TTL 3600).
- The same resolvers currently return those A and AAAA values for www.forgewirelabs.com. No www HTTP request, redirect setup, or other www configuration was performed; it remains out of scope until separately approved.
- HTTP apex requests return 301 to HTTPS. HTTPS returns 200 over IPv4 and IPv6 with a trusted certificate whose SAN includes the apex and wildcard subdomains. Its observed validity is 2026-10-25 through 2027-04-23 UTC.
- The older IONOS summary status “Domain not in use” was reported by Jeremy after using Connect to webspace. The domain-status refresh and actual directory field were not inspected in this pass because the authorized computer-use screenshot capture failed. Since the apex serves the verified release, do not reconnect or reassign without a concrete discrepancy.
- MX, SPF, DKIM, and IONOS-managed DMARC records must be preserved. No mail or DNS changes were made by Codex in the launch verification. Existing mailbox and mail-flow evidence is in email-architecture-assessment.md.
- Do not enable the CDN, purchase a service, change the hosting package, or modify billing. The hosting invoice and CDN tier/charge remain unverified.
- The GitHub Pages preview remains available and noindex, nofollow. Do not retire it until Jeremy accepts the production result.

## Go/no-go prerequisites for future releases

Before any later production release or consequential hosting change:

1. Jeremy approves the final content, accessibility status, release commit, and production change. Keep PR #1 draft and unmerged unless separately authorized.
2. Verify the actual Webspace capacity and target directory in IONOS before adding files or changing assignments.
3. Use only the existing restricted SFTP account. Keep credentials out of repositories, scripts, command histories, and logs. IONOS SFTP directory restriction is not full webspace isolation; do not place secrets in the shared webspace.
4. Confirm certificate coverage and validity for the hostname in scope before changing SSL settings. The apex certificate currently validates publicly.
5. Review any invoice or domain-binding prompt. Do not purchase, upgrade, activate CDN, or accept a new charge without approval.
6. Record the current DNS zone and preserve MX, SPF, DKIM, DMARC, CAA, and unrelated service records. Do not change DNS without approval of the exact records.
7. Keep www and the other registered domains outside scope unless Jeremy separately approves them.
8. Keep the GitHub Pages preview until production is accepted.

## Build and release procedure

1. Use an explicitly approved source commit. The current deployed release source is ffb6c3874009ca1abbc5e364b7eac844b334a9d5.
2. In a clean checkout of the approved source, run:

~~~
npm ci
npm run build
npm run verify
npm audit --audit-level=high
~~~

3. Inspect the generated production site. Include only reviewed HTML, CSS, image/SVG assets, robots.txt, sitemap.xml, and the production .htaccess. Confirm canonical URLs use https://forgewirelabs.com and production pages do not carry noindex. Reject source maps, .env files, credentials, docs, source code, node_modules, and .git.
4. Create a private, versioned release directory outside the checkout. Keep the archive and SHA256SUMS.txt outside the public document root.
5. Upload only the production site contents over restricted SFTP. Never use a destructive synchronization. Inspect the remote list before overwriting or deleting anything.
6. Download the remote tree or otherwise hash it reliably against the local manifest. Record source SHA, archive SHA-256, file count, date, and results privately.

## Domain and HTTPS handling

The initial apex connection is functioning: public responses return the expected production release and the apex HTTPS certificate validates. No further connection action is needed to serve the current release.

If a future verified problem requires changing the domain assignment, use the IONOS domain-to-webspace control only after reviewing the current assignment and exact target. Stop before confirming any proposed DNS change, paid service, hosting change, or disabling of Domain Guard. Do not repeatedly reconnect an already functioning assignment.

HTTP-to-HTTPS redirect behavior was verified as HTTP 301 followed by HTTPS 200, without a redirect loop. The uploaded .htaccess matches the validated artifact; public checks cannot establish whether the redirect originates specifically from .htaccess or an IONOS host rule.

www has DNS answers now, but remains outside the approved website behavior. Do not set up its redirect or make further www changes without approval.

## Post-deployment verification

After each future release, use independent public requests to check:

- Apex HTTPS certificate trust, hostname coverage, dates, and response.
- All five routes, images, stylesheets, favicon, robots.txt, and sitemap.xml.
- Canonical tags, sitemap routes, production indexability, and absence of preview labels.
- HTTP-to-HTTPS redirects without loops.
- No exposure of source, documentation, .env, repository metadata, source maps, backups, credentials, or directory listings.
- Contact links, internal navigation, 320 CSS-pixel width, keyboard access, wide-table use, and desktop/mobile behavior when the authorized browser review path is available.
- Email-related DNS records remain unchanged.

The current public request checks and limitations are in validation-report.md. Preserve the exact response results and manifest with the release record. Do not remove the public GitHub Pages preview until production acceptance.

## Rollback

1. Record the incident and affected source SHA.
2. Review the current IONOS assignment, then restore the previously recorded domain-to-webspace assignment or prelaunch behavior. Do not guess the physical document directory.
3. Restore only required files from the private predeployment backup. Keep unrelated files untouched.
4. Restore redirects only if this release introduced them and only after verifying the prior intended behavior. Do not remove a valid certificate while visitors still use HTTPS.
5. Restore DNS only if a specifically approved change occurred, using the captured prior values. Never change mail DNS as part of website rollback.
6. Verify apex routes, assets, certificate, redirects, robots.txt, sitemap.xml, and mail DNS after rollback. Escalate IONOS account failures to IONOS support instead of changing unrelated settings.
7. Retain failed artifacts and manifests privately until review is complete.

## Cost and service boundaries

The website uses the existing IONOS Web Hosting Plus contract. No additional service was activated or purchased by Codex during this launch verification. The account invoice and CDN tier, activation, and charges remain unverified; do not infer the account cost from public catalogue pricing. No CDN or hosting upgrade is required by this release.
