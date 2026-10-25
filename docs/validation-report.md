# ForgeWire Labs website review report

- **Reviewed:** 2026-10-25
- **Purpose:** second-round design and implementation review of the temporary public preview.
- **Status:** ready for Jeremy and ChatGPT design review; the production site and visual direction remain unapproved.

## Public preview and source revisions

- **Preview:** [https://forgewirelabs.github.io/website/?review=caa996c](https://forgewirelabs.github.io/website/?review=caa996c)
- **Site source used for this build:** `bf44a0c86d92ded933918b46db5812c1e56b0400`
- **Published Pages artifact:** `caa996c6aa33dfeb6ecc1d09b925a9425ce8fbc3`
- **Draft PR:** [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1)

The artifact contains the site generated from `bf44a0c`; its commit records that source revision. The source branch is being updated with review documentation separately. PR #1 remains open and draft. This preview is a public static site: anyone with the link can read it.

## Summary of the second-round changes

- Rebalanced the home page so visitors first see the organization's scope across distributed computing, intelligent systems, developer software, and technical learning. ForgeWire and Fabric are prominent as separate private-development projects; RepoPact evidence follows later.
- Replaced the generic topology mark and older acid-lime editorial direction with a wordmark-first identity, neutral surfaces, a restrained teal signal, readable sans-serif headings and body text, and limited monospace source labels. No fire or forge motifs, gradients, synthetic product screens, decorative network art, or motion were added.
- Replaced the old social image with a matching 1200×630 wordmark card and simplified favicon to a typographic `FW` fallback.
- Added concrete engineering examples for RepoPact Core's Rust semantics and typed operations, Workbench's separate source-build preview, and Anvil's single-writer JSON store and scope limits. Removed unsupported claims about arbitrary process confinement and private project implementation.
- Improved image crops, captions, full-resolution links, and the mobile ownership table's keyboard scroll hint. Clarified that Workbench counts are disposable fixture data, SkillForge figures are sample account state, and ForgeLink optional lines do not prove an implemented integration.
- Removed the obsolete profile hero asset and unused RepoPact flow prototype from source and generated output while keeping Git history intact.
- Added a versioned stylesheet URL so the public preview does not keep showing a cached earlier stylesheet.

The detailed design critique, visual rationale, source review, and open accessibility concerns are recorded in [design-quality-audit.md](design/design-quality-audit.md). Research references are listed in that audit, including [Impeccable's design critique](https://impeccable.style/slop/), [Pentagram's MIT Media Lab identity](https://www.pentagram.com/work/mit-media-lab), and [IBM's technical diagram guidance](https://www.ibm.com/design/language/infographics/technical-diagrams/usage/). The work uses those sources as evaluation criteria and does not copy their visual systems.

## Design-quality findings

The previous prototype had repeated SaaS cards and a generic topology symbol. Its later warm-paper, acid-lime, editorial-serif revision risked substituting a recognizable editorial-tech template for the earlier SaaS template. Repetition of small uppercase labels, monospace annotations, status badges, and abstract technical marks did not earn space where it added no information.

The correction makes the organization's written name the primary identity and lets project-owned imagery retain each product's own visual character. Teal provides organization-level hierarchy and focus; neutral surfaces keep technical evidence legible. Sans-serif type supports long-form reading, while monospace is used only for short source or implementation labels. Section numbering, the generic topology glyph, decorative gradients, and the unused abstract diagram were removed. The design is recognizable through its editorial choices and evidence, while leaving final creative approval to Jeremy and ChatGPT.

## Technical imagery and provenance

| Visual | What it shows | Source and treatment |
|---|---|---|
| RepoPact Core architecture | Repository records, Core engine, clients, and derived views | SVG from the pinned public Core documentation; the page identifies arrow meanings, derived views, and the optional host/CI boundary, and links to the full-size diagram. |
| RepoPact Workbench capture | A real validation summary from a local Windows x64 build | Public Workbench repository capture from a disposable Core conformance fixture. The site uses a CSS crop without editing the image and labels its counts as fixture data, not customer or production metrics; the original opens at full resolution. |
| ForgeLink product model | ForgeLink's own communication and coordination model | Public JeremyShows repository diagram. Caption preserves its ownership and clarifies that dashed optional edges do not establish implementation or a shared ForgeWire architecture. |
| SkillForge Academy capture | The published Windows application's command center | Public organization-profile image. Caption identifies the 0% values and practice counts as sample account state, not learner outcomes; newer beta surfaces are not shown. |
| Social card and favicon | ForgeWire Labs wordmark and portfolio scope | New site-authored assets aligned with the page identity; no product UI, customer imagery, or unsupported result claims. |

Pinned revisions, licensing notes, ownership, image dimensions, and additional source details are recorded in [content-sources.md](content-sources.md). No private screenshots, internal documents, credentials, source maps, or environment files are in the artifact.

## Technical claims, ownership, and maturity

The RepoPact diagrams and copy were checked against the pinned Core source. The Workbench preview status is separate from the stable Core CLI release. Anvil is identified as a developer preview with a single-writer JSON store and no execution ownership or audit-trail claim. SkillForge's public Windows release is labeled v1.3.2; unreleased course-platform work remains separate. ForgeWire is described at the level of its public overview, which is not application source or a supported release. Fabric remains a separate private-development project with no implementation details disclosed. ForgeLink's JeremyShows ownership and release channel remain explicit.

The site does not imply that these products are one integrated runtime. Each project page links to the source responsible for its claims. Before a production launch, recheck repository revisions and releases against [content-sources.md](content-sources.md).

## Staging metadata and indexing

All four preview pages carry `noindex, nofollow`. The preview `robots.txt` does not advertise a sitemap, and its generated sitemap contains no page URLs. Preview canonical metadata uses the GitHub Pages URL; the separate production build uses `forgewirelabs.com` and retains its four-route sitemap and indexing eligibility. The public URL remains directly accessible over HTTPS without authentication.

`noindex` discourages search indexing; it does not restrict access, guarantee removal from every index, or make the preview discoverable through search or ChatGPT. Share the direct preview URL with reviewers. The revision query in the provided link is for cache busting.

## Validation results

### Build and source checks

These checks passed for the redesign before this report-only documentation update:

```text
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm audit --audit-level=high
git diff --check
```

Both site builds and verifiers passed; `npm audit` reported zero vulnerabilities. The verifier checks route metadata, canonical and indexing policy, local links and assets, image alternatives, release and ownership boundaries, SVG safety, preview path prefix, and output privacy scope. The report update does not change site source or generated output.

### Public HTTPS and output isolation

- Independent HTTPS requests to the four routes and expected static assets returned HTTP 200; TLS certificate verification succeeded.
- Navigation among Projects, Engineering, and About worked. CSS, favicon, social card, diagrams, and project images loaded; the browser console had no warnings or errors.
- Requests for `.env`, `package-lock.json`, `src/index.njk`, `docs/`, `.git/HEAD`, `scripts/verify-site.mjs`, and `node_modules/` returned 404. Removed legacy image paths also return 404.
- Every rendered page showed the temporary preview label and `noindex, nofollow` directive. The preview publishes no source tree or internal documentation.

### Browser and accessibility checks

The public site was manually inspected at 1200×820, 768×1024, and 390×844. Each route had one `h1`, no page-level horizontal overflow, a loaded local stylesheet, and image alternatives. Keyboard Tab reached the visible skip link and Enter moved focus to the main content. The mobile ownership table can be scrolled horizontally and responds to arrow keys; its scroll hint is visible on narrow screens. Reduced-motion behavior is respected, and the site adds no browser-side JavaScript.

**Sixteen screenshots from the public artifact are attached directly in this review conversation:** first viewport and full-page captures for Home, Projects, Engineering, and About at desktop and mobile widths. They were captured from `caa996c`, including the lazily loaded project images.

These checks do not constitute a formal WCAG 2.2 AA audit. Color contrast across every state, screen-reader behavior, text enlargement and reflow, and the usability of the wide ownership table at high zoom still need human review.

## Decisions for Jeremy and ChatGPT

1. Approve or revise the wordmark-first identity, neutral/teal palette, and sans-serif type direction.
2. Review whether the home page gives ForgeWire and Fabric enough conceptual prominence while accurately showing their private status.
3. Review the engineering tone and project descriptions for accuracy and useful differentiation, especially Fabric's intentionally limited public description.
4. Review mobile diagrams and the horizontally scrollable project register at phone size and high zoom.
5. Decide when the design and copy are ready to move from public review preview toward the intended IONOS production plan.

The preview remains temporary. No IONOS configuration, production DNS, production credentials, paid features, or hosting contract settings were changed. To remove the preview after review, follow the three steps in [preview-hosting.md](preview-hosting.md): set the repository Pages source to None, delete the `website-preview` artifact branch, then verify the URL no longer serves content.
