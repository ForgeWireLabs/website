# Homepage narrative review

The Home page presents four owner-approved cinematic slides followed by three static destinations. Home and Our Work keep the approved layout and remove decorative card numbering. The four published WebP images remain unchanged.

## Presentation and interaction

- The Home carousel spans the viewport and preserves each full 16:9 image composition.
- Exactly four keyboard-accessible dot controls sit over the bottom center of the artwork; there is no visible pause/play button or separate control row.
- Click/tap the left third for the previous slide, the right third for the next slide, and the center to hold the current slide for 60 seconds. Repeated center input resets the 60-second hold.
- Edge clicks, horizontal swipes, and dot selections navigate immediately, clear the timed hold, and start a fresh 20-second interval. Swipe clicks are guarded against delayed synthesized clicks.
- Hovering the carousel with a mouse or pen suspends autoplay; leaving resumes a complete 20-second interval. Touch pointer events do not create a hover state.
- Keyboard focus suspends autoplay while it remains inside the carousel. Arrow keys navigate without moving focus; Enter/Space on the focused slide surface holds the current slide for 60 seconds.
- Hidden documents suspend autoplay. Showing the document restarts a full interval. Reduced motion disables autoplay; runtime preference changes suspend or resume it.
- The swipe surface allows normal vertical scrolling and pinch-to-zoom. Only the active slide is exposed to assistive technology after enhancement. Without JavaScript all slides remain visible in reading order and navigation links remain available.

## Interaction validation

`npm run test:carousel` runs five dependency-free deterministic regression tests for the 20-second interval, 60-second hold/reset, hold-clearing navigation, swipe/click suppression, hover, focus, document visibility, reduced-motion changes, and inactive-slide state.

`scripts/homepage-carousel.browser.cjs` was also run against the production build in an isolated headless Microsoft Edge/Chromium instance. It verified controlled 20- and 60-second timing, hold reset, edge/dot/swipe hold clearing, delayed synthesized-click suppression, rapid touch gestures, hover, visibility changes, reduced-motion changes, keyboard focus and arrows, touch scrolling, accessible slide state, and the no-JavaScript fallback. Results are recorded in [the interaction run log](review/home-work-pr8/interaction-results.json). The [responsive screenshot gallery](review/home-work-pr8/README.md) contains the Home layout at 320, 390, 768, 980, 1440 and 1920 CSS px and Our Work at mobile and desktop widths.

These are automated checks in headless Edge. They do not include physical-device testing, a real background-tab lifecycle across operating systems, or independent screen-reader testing. The static screenshots were captured before the latest hover-only behavior change; carousel layout and artwork are unchanged, and interaction behavior has separate updated browser results.

## Accessibility decision

The requested center interaction pauses automatic rotation for 60 seconds without a permanent visible pause control. Pointer/touch users cannot stop rotation indefinitely through the carousel. Keyboard focus suspends rotation while it remains in the carousel, and reduced-motion preference disables it. These mitigations do not establish WCAG 2.2.2 conformance. No conformance claim is made; keep PR #8 draft pending owner review and accessibility assessment.

## Artwork follow-up

The owner directed that this release proceed without artwork updates. The four existing approved WebPs remain byte-identical. Their softness at desktop sizes and small baked-in mobile lettering remain known limitations; no image replacement, upscaling, or text reconstruction is included. [Artwork feasibility findings and requested source material](homepage-artwork-feasibility.md) are documented for a future separately approved update.

**No merge or production release is authorized by this source change.**
