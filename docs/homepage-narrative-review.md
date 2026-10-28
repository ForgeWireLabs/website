# Homepage narrative review

The Home page presents the four owner-approved cinematic image slides followed by three static destinations. This change removes decorative card numbering on Home and Our Work and revises the carousel's interaction without changing the artwork, narratives, shared masthead, or substantive destination copy.

## Supplied artwork

Original PNG source assets and hashes remain in [artwork/homepage-slides-original/README.md](../artwork/homepage-slides-original/README.md). The published WebP derivatives are unchanged. Both production and preview validation enforce these hashes.

## Presentation and interaction

- The homepage image is full viewport width, preserves its complete 16:9 composition, and has no mobile crop. Height scales naturally with width.
- The only visible controls are four accessible slide-select dots, overlaid at the bottom center of the image.
- Click/tap the left third for the previous slide, or the right third for the next slide; click/tap the middle third to pause. Horizontal swipes navigate on mobile; vertical scrolling is not intercepted.
- Any pointer or dot selection holds automatic rotation for 30 seconds. At the end of this hold, the next slide advances, followed by the normal 20-second interval.
- With keyboard focus on the carousel, autoplay pauses; ArrowLeft/ArrowRight change slides and Space/Enter hold the current slide. Focus leaving the carousel resumes normal scheduling after any remaining interaction hold.
- Reduced-motion preference disables autoplay, including after interactions. The carousel never rotates while the document is hidden.
- Only one active slide is exposed to assistive technology after progressive enhancement. Original image copy is preserved as visually hidden HTML, with no duplicate visible overlay.
- With JavaScript disabled, all four slides remain visible in reading order, and the dots stay hidden.
- The site retains one shared masthead/navigation system. Other routes are unchanged apart from the decorative numbering removal on Our Work.

## Browser review evidence

Fresh isolated headless Edge/Chromium captures for all four slides at 320, 390, 768, 980, 1440 and 1920 CSS px, plus Our Work at 390 and 1440 px, are in [the PR #8 screenshot gallery](review/home-work-pr8/README.md). Captures were taken from the built local preview after the latest CSS change. At every requested width the page has no horizontal overflow; the carousel spans the viewport and its image uses `object-fit: contain`. The mobile dots are centered at the image bottom with 44 px targets and no longer cover the embedded image copy. Our Work shows six unnumbered cards in one mobile column and two desktop columns.

An isolated headless Edge run with controlled browser timing and real CDP touch input passed: the 20-second autoplay interval; the 30-second hold and reset after manual navigation; thirds, wrap, dot selection, left/right swipes, rapid gestures, swipe cancellation, and suppression of a delayed synthesized click; vertical scrolling; keyboard arrow navigation and visible focus; no autoplay while keyboard focus remains in the carousel; reduced-motion behavior; inactive slides hidden with `aria-hidden` and `inert`; and readable slide order and destination links without JavaScript. Full details are in [interaction results](review/home-work-pr8/interaction-results.json) and [viewport measurements](review/home-work-pr8/metrics.json). These are automated browser checks, not physical-device or independent screen-reader testing.

**Visual limitation:** Each approved cinematic WebP is 834 × 468. At 1920 CSS px it is enlarged about 2.3×, so the raster looks soft. At 320/390 px the artwork-baked lettering is small. The semantic copy remains available to assistive technology; this does not make the image lettering visually legible at small sizes. The owner-approved artwork was kept byte-identical.

**Accessibility decision:** The requested interaction pauses autoplay for 30 seconds without a permanent visible stop button. Pointer/touch users therefore cannot stop rotation indefinitely within the carousel. Keyboard focus pauses it while focus remains, and reduced-motion preference disables it; these mitigations do not establish WCAG 2.2.2 conformance. Keep the PR draft until the owner reviews the screenshots and accepts the timed-only pause, with an accessibility review before any conformance claim.

**No production release is authorized by this source change.**
