# Shared masthead order review

The shared layout renders a vector redraw of the owner-provided neural artwork first, then one dark header containing the ForgeWire Labs wordmark and five-page navigation, then the page's main content. No separate brand bar remains.

The neural illustration is a scalable SVG built from vector paths, gradients, and text, with no embedded raster. Phone-width views scale the complete 3:1 artwork to fit without cropping; wider views keep the shorter panoramic crop. The approved copy and page content are unchanged.

## Browser checks

All five routes were rendered from the local candidate in the browser at 320, 390, 720, 721, 980, and 1440 CSS pixels. The recorded 30 checks confirm one masthead and one complete header, the required masthead → header → main order, image loading, a full-width masthead, no document-level horizontal overflow, and complete artwork at both phone widths: [viewport-checks.json](viewport-checks.json).

### Live mobile comparison

The left image is a read-only capture of the currently published production page at 390px; the embedded wordmark is clipped by the old crop. The right image is the local vector candidate at the same width; the full artwork and wordmark fit above the unified navigation bar. Production was not changed.

| Current production | Local vector candidate |
| --- | --- |
| [390px capture](captures/production-mobile-before-390.jpg) | [390px capture](captures/home-390.jpg) |

Screenshots show each page at two mobile widths and a desktop width:

| Page | 320px | 390px | 1440px |
| --- | --- | --- | --- |
| Home | [JPEG](captures/home-320.jpg) | [JPEG](captures/home-390.jpg) | [JPEG](captures/home-1440.jpg) |
| Our Work | [JPEG](captures/our-work-320.jpg) | [JPEG](captures/our-work-390.jpg) | [JPEG](captures/our-work-1440.jpg) |
| Research & Engineering | [JPEG](captures/research-engineering-320.jpg) | [JPEG](captures/research-engineering-390.jpg) | [JPEG](captures/research-engineering-1440.jpg) |
| Software | [JPEG](captures/software-320.jpg) | [JPEG](captures/software-390.jpg) | [JPEG](captures/software-1440.jpg) |
| About | [JPEG](captures/about-320.jpg) | [JPEG](captures/about-390.jpg) | [JPEG](captures/about-1440.jpg) |

The complete artwork and header alignment were visually checked at 320px, 390px, and 1440px. Screenshot captures waited for the local page assets to finish rendering.

## Validation

- `npm ci`
- `npm run build`
- `npm run verify`
- `npm run build:preview`
- `npm run verify:preview`
- `git diff --check`
