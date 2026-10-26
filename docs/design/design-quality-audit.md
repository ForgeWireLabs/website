# Design quality audit

**Reviewed:** 2026-10-26
**Scope:** organization-first website revision, static implementation, and content boundaries. The broad v1 art direction remains accepted; this pass adjusts information hierarchy and adds technical clarity. It is not another general redesign.

## Current decisions

- The wordmark, neutral surfaces, restrained teal, and current typography remain the organization identity. No fabricated product mark or shared-product architecture is introduced.
- The homepage opens with the owner-provided neural masthead and ForgeWire Labs' organizational purpose. Its six-question engineering index remains substantive content about compute, providers, connectivity, platforms, authority, and evidence; the artwork does not depict product architecture.
- **Our Work** explains five engineering disciplines separately from products. **Research & Engineering** distinguishes open questions, bounded public implementation evidence, and private development. **Software** retains the individual project identities, maturity, evidence, and source links. **About** explains organizational purpose, engineering disciplines, operating philosophy, project boundaries, and contact/security routes without a personal biography.
- Our Work uses owner-provided abstract network artwork with the caption “Separate systems. Common engineering principles.” The image is editorial artwork rather than a map of product or system connections.
- ForgeWire and Fabric stay separate, private-development directions. Their public descriptions are grounded in the pinned public overview and do not assert availability, release readiness, or unsupported capabilities. See [the public-copy record](../forgewire-fabric-public-copy.md) for source material and exclusions.
- The authentic ForgeWire Projects capture remains with Software content, where its private-build and sample-data limitations are explained. It is not the homepage centerpiece or social-card artwork.
- The social card retains the wordmark and presents the same organizational question index. It does not imply a product interface, system map, or shared runtime.
- RepoPact's architecture remains explicitly scoped to RepoPact. RP Proving Grounds is validation material, not a released product, and its pinned RepoPact 3.0.2 scope does not imply coverage for 3.1.3.

## Implementation quality

The implementation remains static HTML/CSS generated with Eleventy. It adds no browser-side JavaScript, analytics, remote fonts, forms, or embedded third-party resources. Native links and the horizontally scrollable Software table are the only interactive patterns. The base layout provides a skip link, semantic page landmarks, one `h1` per page, image alternatives, visible focus styling, and reduced-motion handling. Technical diagrams include nearby text keys and full-size links. Static checks do not replace rendered review; see the visual refinement report for the local before/after captures and responsive measurements.

`npm run verify` and `npm run verify:preview` check route count, canonical and indexing metadata, local paths, generated-file scope, content maturity labels, image alternatives and dimensions, SVG safety, anchor references, and key responsive stylesheet rules. Actual browser zoom, keyboard interaction, screen-reader speech, and formal contrast evaluation remain unverified.

## Content and provenance

- Public project maturity and implementation claims are bounded by the primary-source ledger in [`content-sources.md`](../content-sources.md).
- The homepage questions describe an editorial engineering lens. Image provenance and the manifest-verified WebP hashes are recorded in [`content-sources.md`](../content-sources.md).
- Flink's repository was renamed and transferred from ForgeLink; the copy keeps the current project identity while disclosing legacy package/release naming where relevant.
- SkillForge sample account values remain explicitly distinguished from learner results; Workbench values remain fixture data.
- The social card is a site-authored SVG/PNG composition; the project screenshots and diagrams retain their project-specific provenance.

## Visual refinement verification

The targeted typography and responsive corrections are recorded in the [visual refinement report](visual-refinement-report.md), with baseline and revised comparisons for all five pages at 320, 390, 720, 721, 768, 980, 981, and 1440 CSS pixels. The captured pages had no horizontal overflow and all referenced images loaded. Actual browser zoom, keyboard interaction, screen-reader output, and formal contrast evaluation remain unverified; these checks do not establish WCAG 2.2 AA conformance.

Public release and source status should be rechecked before production if material source changes occur.
