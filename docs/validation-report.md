# ForgeWire Labs final candidate review report

- **Reviewed:** 2026-10-25
- **Purpose:** final identity, content, and accessibility review of the public staging candidate.
- **Status:** ready for Jeremy and ChatGPT to approve or revise the visual direction and staging copy. Production preparation is not approved by this report.

## Public preview and revisions

- **Preview:** [https://forgewirelabs.github.io/website/?review=01a10ef](https://forgewirelabs.github.io/website/?review=01a10ef)
- **Site source revision used to build the pages:** `01a10ef99a88d8f9a6e61505a79a782ceed7779d`
- **Generated site artifact revision:** `fe1e1bf6f8ea701609d1a56f1a72b78960f25ba3`
- **Current `website-preview` branch revision, including review captures:** `3d707ebb6db26908e783b968cd525bc3384b675c`
- **Draft PR:** [ForgeWireLabs/website#1](https://github.com/ForgeWireLabs/website/pull/1)

The published site was built from the source revision above. The latest artifact commit adds two review images and does not change the generated pages. PR #1 remains open and draft. The preview is public and has no access control.

## Review captures

Both captures show the actual public homepage with the temporary preview label:

- [Desktop · 1200 × 900](https://forgewirelabs.github.io/website/review-captures/home-desktop.jpg?review=3d707eb)
- [Mobile · 390 × 844](https://forgewirelabs.github.io/website/review-captures/home-mobile.jpg?review=3d707eb)

The mobile capture uses explicit 390 × 844 device emulation and the page's mobile media rules. It is not a resized or clipped desktop view.

## Targeted identity and composition changes

- Kept the existing page structure and Eleventy build. No wholesale redesign or new visual framework was introduced.
- Made the homepage centerpiece a genuine ForgeWire Projects workspace capture from the pinned public overview. Its caption calls out private development, the capture date, disposable sample data, and that this is one widget rather than a full product tour or release.
- Kept the social image wordmark-led, with a more specific composition using the same authentic workspace evidence and the line “Useful AI depends on the system around it.” The image does not imply a released product or feature set. [View the public social card](https://forgewirelabs.github.io/website/assets/forgewire-labs-social.png?v=01a10ef).
- Kept project-owned diagrams on their respective project pages. No new system map or cross-product relationship was invented.
- Preserved the neutral and teal palette, readable type, reduced-motion behavior, and visible keyboard focus treatment.
- The design rationale and previous review criteria remain in [design-quality-audit.md](design/design-quality-audit.md).

## ForgeWire and Fabric copy review

The live staging text paraphrases only the public ForgeWire overview pinned at [`85d1905b0bd8db420882f00065daff34833dab27`](https://github.com/ForgeWireLabs/ForgeWire-Overview/blob/85d1905b0bd8db420882f00065daff34833dab27/README.md). Both projects are labeled **Private development**.

The staging candidate describes ForgeWire as an application and runtime direction organizing model-assisted work around project context, tools, and selected workflows for a person to review. It describes Fabric as a separate control-plane direction for authenticated, policy-gated work across machines, with limited, configuration-dependent integration for selected ForgeWire workflows. The pages state that neither is a public installation or service and do not announce availability or a release date.

[forgewire-fabric-public-copy.md](forgewire-fabric-public-copy.md) separates those verified public facts, the current staging wording, two more problem-first alternatives that remain unpublished, and private details that must stay out of public copy. The alternatives would need approval before they appear on the site.

## Validation results

### Build, source checks, and dependency audit

These checks passed for the deployed site source revision:

```text
npm run build
npm run verify
npm run build:preview
npm run verify:preview
npm audit --audit-level=high
```

Both builds and verifiers passed. `npm audit` reported zero vulnerabilities. The verifiers check routes, metadata and indexing policy, local links and assets, image alternatives, release and ownership boundaries, SVG safety, base paths, and output privacy scope. The final documentation changes pass `git diff --check`.

### Independent public requests and privacy scope

- Independent HTTPS requests to the homepage, all four routes, the stylesheet, and both screenshots returned HTTP 200. `curl` reported TLS verification result `0` for each request.
- The screenshots were fetched successfully after the artifact branch update. The previous `review-captures` URLs briefly returned 404 while GitHub Pages was rebuilding; cache-busted requests to the final artifact now return the JPEGs.
- Requests for `.env`, `src/index.njk`, `docs/content-sources.md`, `.git/HEAD`, `package.json`, and `node_modules/` return 404.
- The four pages show the development-preview label and `noindex, nofollow`. The preview `robots.txt` does not advertise a sitemap; its generated sitemap contains no page URLs.
- The artifact publishes generated static files and the two reviewed captures only. It contains no source tree, source maps, environment files, credentials, or internal documentation.

`noindex` discourages search indexing but does not restrict access or guarantee that every search or reading tool will discover the URL. Share the direct preview link with reviewers.

### Accessibility, responsive behavior, and visual review

- Browser accessibility trees show one `h1` per route, a named main navigation, a skip link, meaningful image alternatives, and table semantics. Diagram pages pair image alternatives with nearby text keys and full-size links.
- Keyboard focus reaches the skip link first; Enter moves focus to the main content. Navigation links are reachable by keyboard. The project table scroll region can be focused and moved horizontally with arrow keys.
- At a 320 CSS-pixel viewport, the page itself has no horizontal overflow. The wide project table keeps its own contained horizontal scroll region. The mobile layout was visually captured at 390 × 844 and reviewed against the desktop capture at 1200 × 900.
- Effective-width reflow checks at 640 and 320 CSS pixels cover the layouts expected at 200% and 400% zoom from a 1280-pixel desktop viewport. The browser's zoom control was not set to exact 200% or 400% during this review.
- WCAG contrast calculations pass AA for checked standard text pairs: body text on paper 13.73:1, teal links on paper 5.52:1, teal links on alternate surfaces 5.14:1, and white button text on teal 6:1. Checked status colors also exceed 4.5:1. The focus outline has 4.75:1 contrast on the light surface and 3.17:1 on the dark surface, exceeding the 3:1 non-text contrast threshold.

The review did **not** include a formal WCAG 2.2 AA audit, speech output from Narrator or NVDA, exact browser zoom controls, or physical touch gestures. Those checks remain unverified. Keyboard and browser accessibility-tree checks provide useful coverage but do not replace screen-reader testing.

## Decisions for Jeremy and ChatGPT

1. Accept or revise the restrained wordmark, neutral/teal page identity, and updated social image.
2. Approve the currently staged ForgeWire and Fabric wording for production preparation, or choose edits from the unpublished alternatives in [forgewire-fabric-public-copy.md](forgewire-fabric-public-copy.md).
3. Accept the authentic ForgeWire workspace capture as the homepage centerpiece, or retain the current composition and defer a different centerpiece until approved evidence exists.
4. After the design and copy decisions, authorize production preparation if desired. This review does not authorize publication, DNS changes, IONOS changes, or a production launch.

The preview remains public for review and the PR remains draft. No IONOS configuration, production DNS, production credentials, paid services, or hosting contract settings were changed. After review, remove the preview by following [preview-hosting.md](preview-hosting.md): set the repository Pages source to None, delete `website-preview`, and verify the public URLs no longer serve content.
