# Organization-first staging review

**Status:** draft candidate for Jeremy and ChatGPT review. The previous visual system remains; the site purpose, narrative hierarchy, and information architecture have been revised. PR #1 remains draft and unmerged.

## Review targets

- Can a visitor describe ForgeWire Labs without naming a particular product or person?
- Do the home page's engineering questions communicate the organization without suggesting a fabricated architecture?
- Does Our Work explain the disciplines and problems, with products shown as evidence rather than used as category labels?
- Does Research & Engineering distinguish open questions, public implementation examples, and private development?
- Does the Software page keep product identity, maturity, screenshots, and source ownership together?
- Does About introduce the organization before the founder, with leadership appropriately scaled near the end?
- Is the question-index social card recognizable and legible at a small preview size?

## Accuracy checks

- The organization-first purpose and focus areas are owner-provided staging copy and require approval before production.
- About distinguishes general correspondence, public software discussions, and confidential security reporting. The three owner-confirmed `.com` mailboxes are shown with verification pending and have no `mailto:` links until their tests pass.
- Verify inbound delivery, outbound From/Reply-To identity, SPF/DKIM/DMARC on received test headers, MFA, access, and forwarding for each IONOS mailbox. For `security@`, confirm a separate confidentiality boundary before advertising it as operational.
- ForgeWire and Fabric stay private development; the public overview is not an installation path or release.
- RP Proving Grounds is a validation repository, not a separately released product; its currently pinned RepoPact version is 3.0.2.
- Flink is linked to the ForgeWire Labs repository; its current README/release naming and package boundaries remain disclosed.
- Released software, source-build previews, developer previews, beta work, and private development remain distinct.

## Technical and accessibility gates

- Production and preview builds and source verifiers pass.
- Generated routes, metadata, local navigation/assets, canonical URLs, sitemap behavior, and preview noindex policy pass the static verifiers. All 17 unique external links and all five published routes were independently requested over HTTPS and returned HTTP 200.
- Responsive CSS breakpoints exist, but desktop/mobile browser rendering and 200%/400% zoom/reflow have not been verified for this revision.
- Static source includes keyboard-operable native links, focus styling, image alternatives, diagram text keys, and a keyboard-oriented table scroller; browser keyboard behavior and contrast still need direct review.
- Narrator or NVDA spoken review is still needed for navigation, diagram descriptions, and the wide Software table unless completed and recorded in the validation report.
- Security review confirms only generated static artifacts enter the preview branch; no source maps, source, credentials, or internal documentation are exposed.

## Production approval remains separate

No PR merge, IONOS change, DNS edit, paid activation, credential setup, production publication, or GitHub Pages retirement is authorized by this review. Production approval requires a later decision on organizational statements, final copy, accessibility findings, IONOS account facts, canonical-host and `www` behavior, exact DNS changes, and the deployment itself.
