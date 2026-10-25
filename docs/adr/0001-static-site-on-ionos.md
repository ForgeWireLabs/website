# ADR 0001: Static site on the existing IONOS hosting contract

- **Status:** Proposed implementation; visual direction awaits review
- **Date:** 2026-10-25
- **Decision owners:** Jeremy and ChatGPT for major design, hosting, security, and financial choices

## Context

ForgeWire Labs has an active IONOS Web Hosting Plus contract and the `.com` domain is registered with IONOS. The domain currently is not connected to a site. The contract view lists an IONOS CDN service item, but its tier, hostname activation, and billing treatment are not visible. GitHub is the source-control and review platform; IONOS is the intended production host. Exact hosting allocation, SSL assignment, and account costs still need confirmation.

The portfolio has multiple projects and distinct maturity states. The site needs a small number of shared pages, structured project records, and an easy way to keep status copy aligned with public repositories. It does not need user accounts, a database, a content-management service, or client-side application behavior.

## Decision

Use Eleventy to generate static HTML from Nunjucks templates and JSON data. Keep CSS local and write no browser JavaScript. Build locally with a pinned Node dependency and commit the lockfile. Upload only the generated `_site/` contents to IONOS through a restricted, encrypted SFTP workflow after hosting access and domain assignment are approved.

Use the existing IONOS Web Hosting Plus contract as the production-host candidate. Use GitHub for source, branches, pull requests, and code review. For temporary design review only, publish a static preview from a separate artifact branch to the generated GitHub Pages project URL. Keep its development preview label and allow indexing so reviewers can discover it publicly. Do not configure a custom domain, production DNS, Deploy Now, CDN activation, or production credentials.

## Alternatives considered

| Option | Fit | Decision |
|---|---|---|
| Plain HTML and CSS | Fewest tools and excellent portability. Shared layout and repeated project content become manual across several pages. | Viable for a one-page site; not selected for this multi-page portfolio. |
| Eleventy | One Node build dependency, shared templates and project data, Markdown-ready content, static output with no runtime requirement. | Selected for maintainable content without a framework runtime. |
| Astro or a larger component framework | Useful for richer interactive surfaces, component ecosystems, or client-side features. | Too much build and dependency surface for an informational static site. |
| PHP/CMS | Convenient editorial UI and dynamic features. | No current requirement justifies a server runtime, database, plugin updates, or CMS attack surface. |

## Consequences

- Production serves only files; visitors do not depend on Node, PHP, JavaScript, a database, analytics, fonts, or a third-party CDN.
- Editors need Node.js and `npm ci` to build. The generated artifact is reviewable before upload.
- Local validation is required because this plan does not depend on a paid or hosted CI runner.
- A public GitHub Pages URL is used only as temporary staging for design review. Its branch contains generated static assets and no source tree or internal documentation; it does not set the IONOS production domain.
- Domain assignment, SSL activation, and server headers remain account-level steps requiring approval and IONOS verification.
- Manual SFTP is the first deployment procedure. IONOS documents that an SFTP account's directory restriction is an SFTP-level restriction, not full webspace isolation; the shared webspace must contain no data that should be isolated from that account.
- Eleventy's documentation confirms that a standard build produces files for classic web hosting and that manual upload is the expected workflow when the host does not build the project.

## Revisit when

Revisit if editorial volume grows, interactive features become a real requirement, IONOS contract capabilities differ from the assumed Linux webspace, or a repeatable production deployment needs automation. Any automated production deployment choice must include a reviewed credential scope and a cost check.
