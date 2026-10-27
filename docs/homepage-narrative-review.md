# Homepage narrative review

The Home page presents four owner-supplied image slides followed by the three static destinations. This correction keeps the existing WebP assets used on desktop and removes the mobile-only crop so each complete slide scales into view. The original PNG files remain preserved. The shared masthead, other pages, copy, carousel behavior, and destination links are unchanged.

## Supplied artwork

The approved archive and its provenance are recorded in [`artwork/homepage-slides-original/README.md`](../artwork/homepage-slides-original/README.md). The four original PNGs remain preserved there. Public WebP assets remain the same optimized derivatives previously accepted at desktop size; the verifier checks their hashes against the reviewed assets and checks the original PNG hashes.

## Presentation

- Desktop and mobile use the same complete image inside a responsive 16:9 frame. The mobile stylesheet has no crop or image-repositioning rule.
- The HTML slide copy remains visually hidden and available to assistive technology; the raster artwork itself is unchanged.
- Existing carousel controls, rotation, reduced-motion behavior, and layout are retained.

## Validation

The production and preview verification scripts check all five routes and the existing metadata, content boundaries, navigation, and local links. They also verify the original PNG hashes, the reviewed WebP asset hashes, and that slide images are not cropped by mobile CSS.

The screenshots in `docs/review/homepage-narrative/` were captured for the previous WebP/cropped-mobile presentation and are stale for this correction. Do not use them as evidence of the current rendering.
