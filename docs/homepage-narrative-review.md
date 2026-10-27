# Homepage narrative review

The Home page now has four owner-supplied narrative slides followed by the three requested static destinations. The shared neural masthead/navigation, About, Software, Our Work, and Research & Engineering content remain unchanged.

## Artwork inventory

The source bundle found in Downloads was `ForgeWire_Labs_Approved_Slides_2026-10-27 (2).zip`, SHA-256 `9755cf131469c3569df01561fb68e1701b73efd4538bc87828bf5e4c1bd7a7ac`. Its included provenance note describes these as the four approved crops. The source images are preserved under `artwork/homepage-slides-original/`; dimensions vary by at most one pixel from the brief.

| Slide | Original PNG | Source SHA-256 | Public WebP | Bytes | Public SHA-256 |
|---|---|---|---:|---:|---|
| 1 | `01_systems_first_models_second.png` · 834×468 | `261386afd628c86a61a57868576b508a7293be6068c0d2276edce636d099ceb3` | `01_systems_first_models_second.webp` | 125,780 | `6cc3fabee43032b3a5fc052c944ee8f438d99f2e78e4cf7b52b35df4982c6140` |
| 2 | `02_world_beyond_the_prompt.png` · 835×468 | `09a0c3fd642057bdf70230b2a270fb9687af269c42070dd8ebf901db8c6e257a` | `02_world_beyond_the_prompt.webp` | 121,636 | `e3ebff5995a56a0747dc8eb8b71aad1dec0ed994c4ddfa68a0e51a649ba18d88` |
| 3 | `03_intelligence_needs_infrastructure.png` · 834×469 | `dd93094ce34dce2bf9d66916a1b3b73b6462fe82deef5e7849df47814c61d6fc` | `03_intelligence_needs_infrastructure.webp` | 131,904 | `4c7e943220baef629e31b0f432dc1f3f39975282a7a09601e3716bd5a603c6ba` |
| 4 | `04_build_the_missing_pieces.png` · 835×469 | `e046c820b160ce3abc3764b8be291d9168659acb1a2798185dae453e27150229` | `04_build_the_missing_pieces.webp` | 136,452 | `0054730ae4797b46ccd6649bda4847e46fb43bfe00d77bd3ba6eb43a677cdf06` |

The four public WebP images total 515,772 bytes, 78.6% smaller than the 2,406,571-byte source PNGs. WebPs were encoded from the preserved PNGs using FFmpeg/libwebp quality 95. Originals are outside `src/` and are not published by the site build.
The site verifier checks the SHA-256 of each source PNG and generated WebP, and rejects the source PNGs in generated output.

## Presentation and behavior

- Desktop uses the complete image in a centered 16:9 frame. The 1060px maximum frame displays the ~835px sources at up to 1.27×; visual inspection found embedded lettering and narrative legible at 1440px.
- At widths up to 720px, the image is centered on the decorative right half and the same approved narrative appears below as readable HTML. The crop excludes the embedded text.
- All four enhanced slides share one complete-card height at each viewport, so transitions do not resize the page. Measured heights: 669px at 320px, 556px at 390px, 388px at 768px, 507px at 980px, and 596px at 1440px. The mobile text stays top-aligned beneath its crop, with consistent panel space for every slide.
- Rotation is 20 seconds with a subtle crossfade. Previous/next, slide selection, and pause/play controls are available. Hover, focus, pointer interaction, hidden-document state, and reduced-motion preference pause rotation as implemented.
- The four slide narratives remain available to assistive technology; only the active slide enters the accessibility tree after enhancement. Controls are not in a live region and slide changes do not move focus.
- With scripts disabled, all four slides and their HTML text remain in document order and visible, while controls remain hidden.
- No carousel package, analytics, external fonts, remote runtime, or external image URLs were added.

## Browser evidence

Edge 156 headless loaded the production build from a loopback-only local preview. Screenshots cover every slide at 320, 390, 768, 980, and 1440 CSS pixels. The screenshot gallery and interaction records are in [`docs/review/homepage-narrative/`](review/homepage-narrative/gallery.md).

Across 20 enhanced screenshots, the browser reported no horizontal overflow, all slide images loaded, equal slide heights within each viewport, one active slide, one `h1`, and all three destinations. At 320px with JavaScript disabled, the browser reported all four slides and HTML text copies visible, the controls hidden, and no horizontal overflow. Reduced-motion emulation started paused with “Play”; keyboard Tab reached Next and Enter advanced the slide while focus stayed on Next. The browser accessibility tree exposed the carousel heading, active slide, slide chooser, and labeled controls.
With a visible page and no hover or keyboard focus, a timed browser check confirmed that the active slide advances after the 20-second interval.

This is a browser and accessibility-tree check, not a manual Narrator/NVDA session. Source-image legibility was checked in the captured browser render; final visual acceptance remains with the owner.

## Checks

All requested commands passed:

```text
npm ci                  passed; 0 vulnerabilities reported
npm run build           passed
npm run verify          passed
npm run build:preview   passed
npm run verify:preview  passed
git diff --check        passed
```

The production and preview verifiers still check all five routes and their existing metadata, content boundaries, image, and local-link rules. Homepage-specific checks now enforce the four-slide narrative, two-section structure, destination labels/routes, local progressive-enhancement script, reduced-motion/interaction requirements, and absence of removed catalog content. The other four page templates were not modified.

## Review files

- [Screenshot gallery](review/homepage-narrative/gallery.md)
- [`capture-results.json`](review/homepage-narrative/capture-results.json)
- [`interaction-results.json`](review/homepage-narrative/interaction-results.json)
- [`autoplay-results.json`](review/homepage-narrative/autoplay-results.json)
- [Original artwork provenance and hashes](../artwork/homepage-slides-original/README.md)
