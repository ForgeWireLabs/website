# Original homepage slide artwork

These PNG files preserve the owner-provided slide artwork. They are kept outside `src/`, so Eleventy does not publish the original source files. The bundled `SOURCE-README.txt` is retained as provenance.

- Local approved source bundle: `ForgeWire_Labs_Approved_Slides_2026-10-27 (2).zip`
- Bundle SHA-256: `9755cf131469c3569df01561fb68e1701b73efd4538bc87828bf5e4c1bd7a7ac`
- The bundle note identifies these as the approved four-slide sequence cropped from the 2×2 composition on 2026-10-27.
- The actual PNG dimensions are 834×468, 835×468, 834×469, and 835×469. They differ by at most one pixel from a uniform 835×468 description; their full compositions are preserved.
- `SHA256SUMS.txt` records the original image hashes.

The optimized public WebP files are under `src/assets/homepage-narrative/`. They were encoded from these originals using FFmpeg/libwebp at quality 95. Desktop uses the complete compositions with `object-fit: contain`. Mobile uses a CSS crop from the text-free right half of the same source image; it does not use regenerated or substituted artwork.
