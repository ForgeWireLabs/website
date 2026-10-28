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

## Acceptance and evidence needed

The current screenshot gallery in docs/review/homepage-narrative/ depicts an older version and **must not** be used as evidence for this revision.

Before merging or deploying, capture all four slides at 320, 390, 768, 980, 1440 and 1920 CSS px, including the full-bleed presentation and overlaid dots. Validate precise click zones, swipe direction, focus behavior, reduced-motion behavior, idle 20-second transitions, the 30-second interaction hold, document visibility behavior, and non-JavaScript fallback. Visually inspect Our Work after removing the card numbers.

**Accessibility caveat:** The 30-second click/touch pause is a time-limited pause rather than a permanent visible stop control. Its effect on WCAG 2.2.2 must be reviewed before making any conformance claim. Keyboard focus and reduced-motion modes provide nonrotating alternatives; this does not establish full WCAG conformance.

**No production release is authorized by this source change.**
