# Shared masthead order review

The shared layout now renders the owner-provided neural artwork first, then one dark header containing the ForgeWire Labs wordmark and five-page navigation, then the page's main content. No separate brand bar remains.

The artwork uses a responsive panoramic crop. At narrow widths it anchors to the left so the embedded ForgeWire Labs lettering stays visible. The existing artwork, approved copy, and page content are unchanged.

## Browser checks

All five production routes were rendered in the local browser at 320, 390, 720, 721, 980, and 1440 CSS pixels. The recorded checks confirm one masthead and one complete header, the required masthead → header → main order, image loading, a full-width masthead, and no document-level horizontal overflow: [viewport-checks.json](viewport-checks.json).

Screenshots show each page at two mobile widths and a desktop width:

| Page | 320px | 390px | 1440px |
| --- | --- | --- | --- |
| Home | [JPEG](captures/home-320.jpg) | [JPEG](captures/home-390.jpg) | [JPEG](captures/home-1440.jpg) |
| Our Work | [JPEG](captures/our-work-320.jpg) | [JPEG](captures/our-work-390.jpg) | [JPEG](captures/our-work-1440.jpg) |
| Research & Engineering | [JPEG](captures/research-engineering-320.jpg) | [JPEG](captures/research-engineering-390.jpg) | [JPEG](captures/research-engineering-1440.jpg) |
| Software | [JPEG](captures/software-320.jpg) | [JPEG](captures/software-390.jpg) | [JPEG](captures/software-1440.jpg) |
| About | [JPEG](captures/about-320.jpg) | [JPEG](captures/about-390.jpg) | [JPEG](captures/about-1440.jpg) |

The image crop and header alignment were visually checked at 320px and 1440px. Screenshot captures waited for the local page assets to finish rendering.

## Validation

- `npm ci`
- `npm run build`
- `npm run verify`
- `npm run build:preview`
- `npm run verify:preview`
- `git diff --check`
