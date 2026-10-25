# Content and asset sources

**Reviewed:** 2026-10-25

## Source of truth

Public project repositories and release channels define implementation claims and maturity labels. The organization-first purpose, work areas, and engineering question index follow Jeremy's 2026-10-25 strategic brief; they are owner-provided organizational statements and require final approval before production. The public organization profile at revision `616c0b55f06409dea8d5e37da245da0797c633df` still uses first-person portfolio wording and outdated ForgeLink links. It is preserved as requested and is not treated as independent evidence for the new organizational narrative.

| Site content | Public source reviewed | Handling |
|---|---|---|
| Founder role and biography; public portfolio history | [ForgeWire Labs profile](https://github.com/ForgeWireLabs/ForgeWireLabs/tree/616c0b55f06409dea8d5e37da245da0797c633df) at `616c0b55f06409dea8d5e37da245da0797c633df` | Founder information is used near the end of About. The public profile's older first-person portfolio narrative is not copied into the revised site. |
| RepoPact Core architecture and release boundary | [RepoPact Core README](https://github.com/ForgeWireLabs/repopact-core/tree/614689b127cf52f801877cc48440f7e45c3709eb) at `614689b127cf52f801877cc48440f7e45c3709eb`; [PyPI package](https://pypi.org/project/repopact/) | README identifies 3.1.3 as the stable CLI package. Source development remains separate from package release. |
| RepoPact Workbench role, preview status, platform evidence, dashboard capture | [Workbench README](https://github.com/ForgeWireLabs/repopact-workbench/tree/414a4a78091796735a1b97b03fd8c3cf1c105f30) at `414a4a78091796735a1b97b03fd8c3cf1c105f30`; [release list](https://github.com/ForgeWireLabs/repopact-workbench/releases) | Described as a native source-build preview; no packaged installers are listed. Platform evidence is bounded by its recorded acceptance notes. |
| Anvil architecture and maturity | [Anvil README](https://github.com/ForgeWireLabs/anvil/tree/89ac5df34090e9ffde6a0b790620e9096fb0f15d) at `89ac5df34090e9ffde6a0b790620e9096fb0f15d` | Labeled developer preview `0.1.0a0`; single-writer JSON store, changing API/schema, and no execution/audit ownership are stated in the README. |
| SkillForge Academy release and beta boundaries | [SkillForge Academy README](https://github.com/ForgeWireLabs/skillforge-academy/tree/7d13ca01519d5d78c12fac229517276a540c083f) at `7d13ca01519d5d78c12fac229517276a540c083f`; [releases](https://github.com/ForgeWireLabs/skillforge-academy/releases) | Latest published Windows release is v1.3.2. Unreleased candidate and newer course-platform work remain separate from the release claim. |
| ForgeWire overview, product direction, and private status | [ForgeWire overview](https://github.com/ForgeWireLabs/ForgeWire-Overview/blob/85d1905b0bd8db420882f00065daff34833dab27/README.md) at `85d1905b0bd8db420882f00065daff34833dab27` | The overview describes an application/runtime direction and current work boundaries; it is not application source, supported setup, or a release. See [public copy basis](forgewire-fabric-public-copy.md) for verified statements, staging wording, and excluded private details. |
| Fabric purpose and private status | [Fabric section in the public ForgeWire overview](https://github.com/ForgeWireLabs/ForgeWire-Overview/blob/85d1905b0bd8db420882f00065daff34833dab27/README.md#3-fabric-dispatch-and-remote-execution) | Described only at overview level: separate private execution control plane, limited configuration-dependent paths, and open integration/release gates. Protocol, enrollment, endpoint, credential, and deployment detail is excluded. |
| Flink ownership, architecture, and packaged release | [ForgeWireLabs/Flink README](https://github.com/ForgeWireLabs/Flink/tree/06be2fe26812e980d82766297fee475ad5538736) at `06be2fe26812e980d82766297fee475ad5538736`; [releases](https://github.com/ForgeWireLabs/Flink/releases) | The repository was renamed from ForgeLink and transferred from JeremyShows to ForgeWire Labs on 2026-10-25. The README and release materials retain the former name. The README identifies v2.0.1 as the latest packaged release and repository version 2.0.3; release notes define installer behavior. |
| RepoPact proving-ground validation material | [RP-proving-grounds README](https://github.com/ForgeWireLabs/RP-proving-grounds/blob/54edc0305c4f577a00a436a76902da098cffa5d8/README.md) at `54edc0305c4f577a00a436a76902da098cffa5d8` | Presented only as a public validation repository, not a released product. Its instructions pin RepoPact 3.0.2 and therefore do not establish coverage for the 3.1.3 Core package. |

## Organization-first positioning

The homepage and About page state that ForgeWire Labs is an independent, founder-led software engineering and research organization. This is a direct statement from the owner's strategic brief, not an inference from the public organization profile. The work-area names and six-item constraint index are editorial descriptions of the owner's intended focus; they are questions and disciplines, not a research-result claim or shared product architecture.

The site distinguishes public implementation examples from ongoing questions. ForgeWire and Fabric wording stays within the overview's public scope and both remain labeled private development. The site does not publish private protocols, endpoints, enrollment, credentials, infrastructure, unpublished essays, or private screenshots.

## Visual assets

| Local asset | Public source and review notes |
|---|---|
| `src/assets/repopact-architecture.svg` | RepoPact Core architecture diagram from the pinned Core revision above. The Core repository is Apache-2.0. Adjacent page text explains the solid arrow colors, derived-view boxes, and optional host/CI boundary; it is labeled as Core-specific. |
| `src/assets/workbench-desktop-dashboard.jpg` | Genuine Windows x64 screenshot from the pinned Workbench revision above. The README describes a local source build on a disposable Core conformance fixture, with no private repository or credentials shown. The Workbench repository is Apache-2.0. The site applies a CSS crop to focus on the validation summary; it does not alter the image file. Counts are labeled fixture data. A link opens the full-resolution original. |
| `src/assets/flink-product-architecture.svg` | Flink's public product-model diagram from the pinned source revision, which predates the rename. The source SVG is adapted with the current product name; its legend remains visible, and the caption says optional edges are not implementation evidence or a shared ForgeWire Labs architecture. |
| `src/assets/skillforge-command-center.png` | 2880×1800 screenshot used by the public organization profile at `616c0b55f06409dea8d5e37da245da0797c633df`. Its caption identifies the displayed 0% values and practice counts as sample account state, not learner outcome metrics; newer beta surfaces are not shown. The full-resolution image is linked. |
| `src/assets/forgewire-projects-workspace.png` | Genuine 1366×769 Projects workspace widget capture from the pinned ForgeWire overview. It shows instructions, files, related chats, and three projects using disposable sample data in a private development build; it is not a full-window view or a public release. SHA-256: `273495F9F23FE73CB7991BA68C98FB4749D8FFD281025B4235C6788719A149AF`. |
| `src/assets/forgewire-labs-social.svg` and `.png` | Site-authored 1200×630 social card retaining the wordmark and established palette. Its organization-level composition presents compute, providers, connectivity, platforms, authority, and evidence as engineering questions. It contains no product screenshot and explicitly does not represent a system architecture. The PNG is rendered from SVG with `rsvg-convert`. |
| `src/assets/favicon.svg` | Small typographic `FW` fallback aligned to the wordmark. The former topology glyph was removed because it was not distinctive enough to stand as an organization mark. |

The older `forgewire-labs-hero.svg` and `.png` profile asset and the unreferenced `repopact-flow.svg` prototype diagram were removed from website source and generated output; Git history remains intact. The profile's `writing/` directory describes its essays as unpublished drafts. They are not copied, excerpted, or linked from the website. No internal screenshots, credentials, environment files, source maps, or private repository contents are included in the preview artifact.

## Accuracy rules

- Keep release status separate from current `main` development.
- Label source-build previews, developer previews, and beta surfaces explicitly.
- Keep ForgeWire and Fabric private; public overview material is not an application download or supported installation path.
- Identify Flink as a ForgeWire Labs project and explain that the latest published package still uses the former ForgeLink name.
- State architecture only at the boundary documented by its source project; do not imply the portfolio is one integrated runtime.
- Present organization purpose and research interests as owner-provided direction; label open questions as questions and do not imply completed findings.
- Keep RP Proving Grounds in a validation/evidence context, and disclose its pinned RepoPact 3.0.2 scope when comparing it with current Core releases.
- Recheck release tags and source commits before a production launch or after material project changes.

## Final acceptance recheck

On 2026-10-25, the pinned current source commits for RepoPact Core, Workbench, Anvil, SkillForge Academy, Flink, and the public ForgeWire overview were compared with the corresponding current public repository heads and remained aligned. Flink's repository had just been renamed from ForgeLink and transferred to ForgeWire Labs; the pinned code, README, and release materials were unchanged. Release/package listings were also rechecked: RepoPact 3.1.3 on PyPI, SkillForge Academy v1.3.2, and Flink v2.0.1 (published under its former ForgeLink name) remained the current published versions. Workbench has no packaged installer release listed, and Anvil has no release tag listed. These checks confirm the copy's maturity labels at the time of review; repeat them before production launch if the launch occurs after a material source or release change.
