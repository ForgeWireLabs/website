# Final acceptance checklist

**v1 design direction:** Accepted. The wordmark-led identity, neutral surfaces, restrained teal, current typography, four-page structure, ForgeWire Projects centerpiece, and social card are the approved direction for this release.

## Verified for the current staging candidate

- Public preview uses HTTPS, `noindex, nofollow`, a visible development-preview label, and no staging sitemap exposure.
- The project pages distinguish released software, previews, and private development.
- Flink links to its ForgeWire Labs repository; the site states that its current README and latest release materials retain the former ForgeLink name.
- RepoPact Core and the Workbench preview retain their own evidence and maturity boundaries.
- The home page review captures are available at desktop and mobile viewport sizes.
- Production metadata, link, build, dependency, privacy-scope, and static-site checks are recorded in `validation-report.md`.

## Remaining before production preparation

- [ ] Complete spoken Narrator or NVDA checks for navigation, meaningful image descriptions, diagrams, and the engineering table. No speech-output pass is recorded yet.
- [ ] Approve the staged ForgeWire and Fabric wording for public production disclosure after reviewing its source and exclusions.
- [ ] Recheck release tags and source revisions if any relevant repository changes before launch.
- [ ] Confirm the account-specific IONOS storage, SSL, domain-binding, CDN, and billing facts listed in `hosting-assessment.md`.
- [ ] Approve PR #1, the specific `.com` hosting and canonical-host behavior, any required DNS changes, production deployment, and later staging retirement.

No merge, production deployment, DNS update, IONOS change, paid activation, or credential setup is authorized by this checklist.
