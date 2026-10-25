# Proposed IONOS deployment procedure

**Status:** Prepared for review only. No credentials have been created and no production files, DNS, domain assignment, SSL, or CDN settings have been changed.

## Preconditions requiring owner approval

- Approve the visual direction and website content.
- Confirm Linux Web Hosting Plus, available webspace, and the document root assigned to `forgewirelabs.com`.
- Confirm the price/renewal terms and included SSL certificate in the account.
- Approve connecting `forgewirelabs.com` to the selected webspace directory. This is a production change.
- Confirm HTTPS access and redirect behavior before enabling redirects or HSTS.
- Review privacy/legal content and name a public security contact before launch.

## Build the release artifact locally

Use a supported Node.js installation (20 or newer), the lockfile in this repository, and a clean checkout:

```powershell
npm ci
npm run build
npm run verify
```

For a local visual review, run `npm run serve` after the build. The static preview server listens on loopback (`127.0.0.1`) only.

Review `_site/` and the validation results. The build includes only generated HTML, CSS, SVG/PNG assets, `robots.txt`, and `sitemap.xml`. Do not upload the source repository, `.git`, `node_modules`, or local configuration files.

## Establish restricted transfer access

After approval, create a dedicated IONOS **SFTP-only** account for the site. Do not reuse the main IONOS login or an account used for interactive shell work. Limit the account to the site's document directory if the IONOS control panel permits it. IONOS notes that this limits the SFTP view only and is not full webspace isolation; do not keep unrelated secrets or sensitive content in the same webspace.

Use a password manager or SSH key if supported by the account. Keep credentials out of Git, build output, screenshots, terminal transcripts, scripts, and logs. Do not put production secrets in GitHub Actions; no automated deploy workflow is included.

## Upload and verify

1. Confirm the `forgewirelabs.com` domain is assigned to the approved document root. Do not select a CDN or modify `www` DNS as part of this procedure.
2. Download a backup of the current document root before replacement.
3. Connect over SFTP with the restricted account and upload the contents of `_site/` (not the `_site` directory itself) to the confirmed document root.
4. Verify `/`, `/projects/`, `/engineering/`, `/about/`, assets, `robots.txt`, and `sitemap.xml` over HTTPS. Check response codes, canonical URLs, certificate coverage, and the `www` behavior that the owner has approved.
5. Verify redirects from HTTP to HTTPS only after HTTPS works. Configure security headers only after confirming the web server and supported IONOS configuration mechanism. Do not enable HSTS until the apex and any approved `www` hostname work consistently over HTTPS.
6. Keep the pre-deploy backup until the owner accepts the release. If validation fails, restore the previous files over SFTP and re-check the site.

## Rollback

Use the same SFTP account to restore the saved document-root contents. Verify the homepage and all navigation routes after restoration. Escalate account-level DNS, certificate, or contract problems to the owner/IONOS support rather than attempting unreviewed settings changes.

## Future automation

Do not assume Deploy Now, GitHub Actions, or a remote Git checkout. If manual SFTP later becomes burdensome, first confirm whether IONOS exposes a safe upload protocol and whether SFTP-only directory limits meet the required isolation. Document the exact secret scope and ongoing cost before proposing automation.
