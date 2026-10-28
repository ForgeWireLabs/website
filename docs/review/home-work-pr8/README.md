# PR #8 browser evidence

Fresh full-page screenshots from an isolated headless Microsoft Edge/Chromium browser at device scale factor 1. Each Home capture shows one selected slide and the complete page. Viewport widths are CSS pixels; screenshots are clickable for full resolution.

## Home carousel

| CSS px | Slide 1 | Slide 2 | Slide 3 | Slide 4 |
|---:|:---:|:---:|:---:|:---:|
| 320 | [![Slide 1 at 320 CSS px](home-320-slide-1.jpg)](home-320-slide-1.jpg) | [![Slide 2 at 320 CSS px](home-320-slide-2.jpg)](home-320-slide-2.jpg) | [![Slide 3 at 320 CSS px](home-320-slide-3.jpg)](home-320-slide-3.jpg) | [![Slide 4 at 320 CSS px](home-320-slide-4.jpg)](home-320-slide-4.jpg) |
| 390 | [![Slide 1 at 390 CSS px](home-390-slide-1.jpg)](home-390-slide-1.jpg) | [![Slide 2 at 390 CSS px](home-390-slide-2.jpg)](home-390-slide-2.jpg) | [![Slide 3 at 390 CSS px](home-390-slide-3.jpg)](home-390-slide-3.jpg) | [![Slide 4 at 390 CSS px](home-390-slide-4.jpg)](home-390-slide-4.jpg) |
| 768 | [![Slide 1 at 768 CSS px](home-768-slide-1.jpg)](home-768-slide-1.jpg) | [![Slide 2 at 768 CSS px](home-768-slide-2.jpg)](home-768-slide-2.jpg) | [![Slide 3 at 768 CSS px](home-768-slide-3.jpg)](home-768-slide-3.jpg) | [![Slide 4 at 768 CSS px](home-768-slide-4.jpg)](home-768-slide-4.jpg) |
| 980 | [![Slide 1 at 980 CSS px](home-980-slide-1.jpg)](home-980-slide-1.jpg) | [![Slide 2 at 980 CSS px](home-980-slide-2.jpg)](home-980-slide-2.jpg) | [![Slide 3 at 980 CSS px](home-980-slide-3.jpg)](home-980-slide-3.jpg) | [![Slide 4 at 980 CSS px](home-980-slide-4.jpg)](home-980-slide-4.jpg) |
| 1440 | [![Slide 1 at 1440 CSS px](home-1440-slide-1.jpg)](home-1440-slide-1.jpg) | [![Slide 2 at 1440 CSS px](home-1440-slide-2.jpg)](home-1440-slide-2.jpg) | [![Slide 3 at 1440 CSS px](home-1440-slide-3.jpg)](home-1440-slide-3.jpg) | [![Slide 4 at 1440 CSS px](home-1440-slide-4.jpg)](home-1440-slide-4.jpg) |
| 1920 | [![Slide 1 at 1920 CSS px](home-1920-slide-1.jpg)](home-1920-slide-1.jpg) | [![Slide 2 at 1920 CSS px](home-1920-slide-2.jpg)](home-1920-slide-2.jpg) | [![Slide 3 at 1920 CSS px](home-1920-slide-3.jpg)](home-1920-slide-3.jpg) | [![Slide 4 at 1920 CSS px](home-1920-slide-4.jpg)](home-1920-slide-4.jpg) |

Reduced-motion was emulated while capturing so autoplay could not change slides during screenshots. All four original cinematic WebP files are 834 × 468; they were not altered. The responsive gallery has no horizontal overflow at any listed width, and each selected image uses `object-fit: contain`.

## Our Work

| Mobile: 390 CSS px | Desktop: 1440 CSS px |
|:---:|:---:|
| [![Our Work at 390 CSS px](work-390.jpg)](work-390.jpg) | [![Our Work at 1440 CSS px](work-1440.jpg)](work-1440.jpg) |

Both views show six unnumbered discipline cards. Mobile uses one column; desktop uses two.

## Browser interaction evidence

The controlled-clock and isolated headless Edge interaction run passed: 20-second automatic advance, 30-second manual-action hold and reset, previous/next thirds and wrap, delayed synthesized-click suppression after swipes, cancellation, rapid clicks, real CDP touch swipes and dot taps, vertical page scrolling, visible focus and arrow keys, reduced-motion hold, inactive slide `aria-hidden`/`inert`, and the no-JavaScript reading-order fallback. This is automated browser evidence, not physical-device or external screen-reader testing. See `interaction-results.json` and `metrics.json`.

## Review limitations

The source art is rasterized at 834 × 468. At a 1920 CSS px viewport it scales about 2.3× and looks soft; at 320/390 px its artwork-baked lettering is small. The semantic copy remains present to assistive technology, but that does not make tiny image lettering visually readable.

The owner requested an automatic 30-second pause without a permanent visible pause button. Pointer/touch users cannot stop rotation indefinitely through the carousel itself. Focus pauses rotation for keyboard users and reduced-motion preference stops it, but neither fact demonstrates WCAG 2.2.2 conformance. Accessibility review and owner acceptance of this timed-only control remain needed before merge.
