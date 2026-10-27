# Shared masthead order review

The shared layout renders the original neural image first, then one dark navigation bar with all five page links centered, then the page's main content. The bar contains no second ForgeWire Labs wordmark.

The approved WebP artwork scales to the viewport width at its 3:1 intrinsic aspect ratio. It is never cropped, so its embedded wordmark stays visible on mobile and desktop. Navigation text shrinks fluidly on phone widths and all five links stay centered on one line.

## Browser checks

All five routes were rendered from the local candidate in the browser at 320, 390, 720, 721, 980, and 1440 CSS pixels. The recorded 30 checks confirm one masthead and one navigation header, the required masthead → header → main order, image loading, a full-width uncropped masthead, centered one-line navigation, and no document-level horizontal overflow: [viewport-checks.json](viewport-checks.json).

### Live mobile comparison

The left image is a read-only capture of the currently published production page at 390px; the navigation wraps and a second wordmark appears in the bar. The right image is the local candidate at the same width; the original artwork fits in full and the centered navigation stays on one line. Production was not changed.

| Current production | Local corrected candidate |
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

The full image, centered link row, and header alignment were visually checked at 320px, 390px, and 1440px. Screenshot captures waited for the local page assets to finish rendering.

## Validation

- `npm ci`
- `npm run build`
- `npm run verify`
- `npm run build:preview`
- `npm run verify:preview`
- `git diff --check`
