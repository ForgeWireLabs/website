# Home cinematic artwork: feasibility and approval gate

**Status: FAIL / awaiting source material and owner visual approval.** PR #8 keeps the four current WebPs byte-identical. This review does not replace, upscale, or regenerate them.

## Available source material

The repository contains four approved PNG crops at 834 × 468, 835 × 468, 834 × 469, and 835 × 469 pixels. The supplied-source note says they are crops from an approved 2 × 2 composition and that their typography is baked into the pixels. The PNGs include the brand wordmark, headline, and explanatory copy; the images cannot be cleanly separated into editable text and scene layers from these raster files alone.

The named local asset handoff folder `C:\Projects\ForgeWireLabs-homepage-narrative-assets-20261027` contains those four PNGs and four WebP encoding experiments (lossless, q90, q92, q95 for slide 1). The repo provenance note references an approved ZIP bundle, but that ZIP is not present in the repository or handoff folder. A search of those two scoped locations found no layered authoring files (PSD/PSB, AI, SVG, XCF, KRA, or similar), no separate high-resolution text-free exports, and no scene-only background layers. Earlier exported PNGs are already too small for the requested desktop full bleed; enlarging or sharpening them would not recover native scene detail.

The source set is sufficient to preserve the current visual reference and copy, but **not** to produce the requested high-resolution, text-free scenes faithfully. The original layered 2 × 2 composition or newly exported text-free scene masters are missing.

## Requested materials to open this gate

For each of the four approved scenes, provide one of:

- The original layered authoring source with its typography layers and fonts/assets intact; or
- A high-resolution, text-free export matching the approved composition, plus the exact approved headline/body copy and its order.

The text-free exports need enough native detail for the 2560 CSS-pixel review target (and preferably higher for high-density screens). Please identify text-safe regions or provide the design source so typography can be placed around the subject without cropping or hiding focal elements. Any rebuilt scene or exported composition must be reviewed and explicitly approved by the owner before it replaces the current WebPs.

## Intended implementation after approval

Use the approved text-free scenes as responsive images. Render the existing headlines and paragraphs as semantic HTML, with responsive type sizes and spacing. Preserve the current story, scene subjects, colors, composition, and atmosphere. Do not duplicate baked-in text, add generic replacement imagery, rely on upscaling as native detail, or add intrusive gradient panels.

## Acceptance after source delivery

Review every slide at 320, 390, 768, 1440, 1920, and preferably 2560 CSS px. Include 200% text resizing and 400% reflow, keyboard and screen-reader behavior, text/background contrast, overlap, image loading, subject/text-safe placement, readability, and cropping. Obtain owner visual approval of the responsive browser evidence before changing the production WebP files.
