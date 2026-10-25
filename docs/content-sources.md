# Content and asset sources

**Reviewed:** 2026-10-25

## Source of truth

The current public ForgeWire Labs profile and project repositories define the portfolio copy and maturity labels. The references below record the public Git revisions inspected for this redesign; release pages define the packaged release boundary when a repository's main branch is newer.

| Site content | Public source reviewed | Handling |
|---|---|---|
| Organization description, founder role and biography, engineering principles | [ForgeWire Labs profile](https://github.com/ForgeWireLabs/ForgeWireLabs/tree/616c0b55f06409dea8d5e37da245da0797c633df) at `616c0b55f06409dea8d5e37da245da0797c633df` | Copy is shortened without extending the profile's claims. |
| RepoPact Core architecture and release boundary | [RepoPact Core README](https://github.com/ForgeWireLabs/repopact-core/tree/614689b127cf52f801877cc48440f7e45c3709eb) at `614689b127cf52f801877cc48440f7e45c3709eb`; [PyPI package](https://pypi.org/project/repopact/) | README identifies 3.1.3 as the stable CLI package. Source development remains separate from package release. |
| RepoPact Workbench role, preview status, platform evidence, dashboard capture | [Workbench README](https://github.com/ForgeWireLabs/repopact-workbench/tree/414a4a78091796735a1b97b03fd8c3cf1c105f30) at `414a4a78091796735a1b97b03fd8c3cf1c105f30`; [release list](https://github.com/ForgeWireLabs/repopact-workbench/releases) | Described as a native source-build preview; no packaged installers are listed. Platform evidence is bounded by its recorded acceptance notes. |
| Anvil architecture and maturity | [Anvil README](https://github.com/ForgeWireLabs/anvil/tree/89ac5df34090e9ffde6a0b790620e9096fb0f15d) at `89ac5df34090e9ffde6a0b790620e9096fb0f15d` | Labeled developer preview `0.1.0a0`; single-writer JSON store, changing API/schema, and no execution/audit ownership are stated in the README. |
| SkillForge Academy release and beta boundaries | [SkillForge Academy README](https://github.com/ForgeWireLabs/skillforge-academy/tree/7d13ca01519d5d78c12fac229517276a540c083f) at `7d13ca01519d5d78c12fac229517276a540c083f`; [releases](https://github.com/ForgeWireLabs/skillforge-academy/releases) | Latest published Windows release is v1.3.2. Unreleased candidate and newer course-platform work remain separate from the release claim. |
| ForgeWire overview, product direction, and private status | [ForgeWire overview](https://github.com/ForgeWireLabs/ForgeWire-Overview/blob/85d1905b0bd8db420882f00065daff34833dab27/README.md) at `85d1905b0bd8db420882f00065daff34833dab27` | The overview describes an application/runtime direction and current work boundaries; it is not application source, supported setup, or a release. See [public copy basis](forgewire-fabric-public-copy.md) for verified statements, staging wording, and excluded private details. |
| Fabric purpose and private status | [Fabric section in the public ForgeWire overview](https://github.com/ForgeWireLabs/ForgeWire-Overview/blob/85d1905b0bd8db420882f00065daff34833dab27/README.md#3-fabric-dispatch-and-remote-execution) | Described only at overview level: separate private execution control plane, limited configuration-dependent paths, and open integration/release gates. Protocol, enrollment, endpoint, credential, and deployment detail is excluded. |
| ForgeLink ownership, architecture, and packaged release | [JeremyShows/ForgeLink README](https://github.com/JeremyShows/ForgeLink/tree/06be2fe26812e980d82766297fee475ad5538736) at `06be2fe26812e980d82766297fee475ad5538736`; [releases](https://github.com/JeremyShows/ForgeLink/releases) | Maintained under JeremyShows, outside the ForgeWire Labs organization. The README identifies v2.0.1 as the latest packaged release and repository version 2.0.3; release notes define installer behavior. |

## Visual assets

| Local asset | Public source and review notes |
|---|---|
| `src/assets/repopact-architecture.svg` | RepoPact Core architecture diagram from the pinned Core revision above. The Core repository is Apache-2.0. Adjacent page text explains the solid arrow colors, derived-view boxes, and optional host/CI boundary; it is labeled as Core-specific. |
| `src/assets/workbench-desktop-dashboard.jpg` | Genuine Windows x64 screenshot from the pinned Workbench revision above. The README describes a local source build on a disposable Core conformance fixture, with no private repository or credentials shown. The Workbench repository is Apache-2.0. The site applies a CSS crop to focus on the validation summary; it does not alter the image file. Counts are labeled fixture data. A link opens the full-resolution original. |
| `src/assets/forgelink-product-architecture.svg` | ForgeLink's own public architecture diagram from its pinned JeremyShows revision. Its legend remains visible; the caption states that optional edges are product-model concepts, not implementation evidence or a shared ForgeWire Labs architecture. |
| `src/assets/skillforge-command-center.png` | 2880×1800 screenshot used by the public organization profile at `616c0b55f06409dea8d5e37da245da0797c633df`. Its caption identifies the displayed 0% values and practice counts as sample account state, not learner outcome metrics; newer beta surfaces are not shown. The full-resolution image is linked. |
| `src/assets/forgewire-projects-workspace.png` | Genuine 1366×769 Projects workspace widget capture from the pinned ForgeWire overview. It shows instructions, files, related chats, and three projects using disposable sample data in a private development build; it is not a full-window view or a public release. SHA-256: `273495F9F23FE73CB7991BA68C98FB4749D8FFD281025B4235C6788719A149AF`. |
| `src/assets/forgewire-labs-social.svg` and `.png` | Site-authored 1200×630 social card using the wordmark, a public-overview paraphrase about systems around useful AI, and the genuine ForgeWire Projects capture above. The PNG is rendered from SVG with `rsvg-convert`; the screenshot is labeled private development/sample data. |
| `src/assets/favicon.svg` | Small typographic `FW` fallback aligned to the wordmark. The former topology glyph was removed because it was not distinctive enough to stand as an organization mark. |

The older `forgewire-labs-hero.svg` and `.png` profile asset and the unreferenced `repopact-flow.svg` prototype diagram were removed from website source and generated output; Git history remains intact. The profile's `writing/` directory describes its essays as unpublished drafts. They are not copied, excerpted, or linked from the website. No internal screenshots, credentials, environment files, source maps, or private repository contents are included in the preview artifact.

## Accuracy rules

- Keep release status separate from current `main` development.
- Label source-build previews, developer previews, and beta surfaces explicitly.
- Keep ForgeWire and Fabric private; public overview material is not an application download or supported installation path.
- Keep ForgeLink's JeremyShows ownership visible.
- State architecture only at the boundary documented by its source project; do not imply the portfolio is one integrated runtime.
- Recheck release tags and source commits before a production launch or after material project changes.

## Final acceptance recheck

On 2026-10-25, the pinned current source commits for RepoPact Core, Workbench, Anvil, SkillForge Academy, ForgeLink, and the public ForgeWire overview were compared with the corresponding current public repository heads and remained aligned. Release/package listings were also rechecked: RepoPact 3.1.3 on PyPI, SkillForge Academy v1.3.2, and ForgeLink v2.0.1 remained the current published versions. Workbench has no packaged installer release listed, and Anvil has no release tag listed. These checks confirm the copy's maturity labels at the time of review; repeat them before production launch if the launch occurs after a material source or release change.
