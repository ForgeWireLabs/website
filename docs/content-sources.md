# Content and asset sources

**Reviewed:** 2026-10-25

## Source of truth

The current public [ForgeWire Labs organization profile](https://github.com/ForgeWireLabs/ForgeWireLabs) is the starting source for portfolio copy, product descriptions, and maturity boundaries. Project links in `src/_data/projects.json` point to their public repositories or release pages. Re-check them before publishing or after meaningful release changes.

| Site content | Source and handling |
|---|---|
| Organization description, founder role, engineering principles | Public ForgeWire Labs profile README. Copy is shortened for the site without extending its claims. |
| RepoPact Core, Workbench, and Anvil descriptions and status | Public profile README and linked project repositories. Core is labelled as a released CLI; Workbench as a source-build preview; Anvil as a developer preview with a single-writer store and changing API/schema. |
| SkillForge Academy status | Public profile README: published Windows application; course-platform work remains in beta. Do not conflate the current app with beta course-platform surfaces. |
| ForgeWire | Public ForgeWire-Overview repository, which identifies the application as private development without public build or release date. |
| Fabric | Public profile README identifies Fabric as private development. No download or release date is claimed. |
| ForgeLink | Public profile README and the separately owned `JeremyShows/ForgeLink` repository. The site labels it as related work under JeremyShows, outside the ForgeWire Labs organization. |
| Brand social image | `assets/forgewire-labs-hero.svg` and `.png`, copied from the public ForgeWire Labs profile repository. The SVG identifies the work as practical systems, durable state, and clear authority boundaries. |
| RepoPact diagram | `assets/repopact-flow.svg`, copied from the public profile repository; shown on the engineering page with a caption that limits it to RepoPact Core. |

The profile repository's `writing/` folder identifies its five essays as unpublished first drafts. They are not copied, excerpted, or linked from this prototype. The SkillForge Academy screenshot is also omitted because its current profile note cautions that it does not show the newer course-platform surface or establish release readiness.

## Accuracy rules for future edits

- Keep release status separate from current `main` branch development.
- Label a source-build preview or developer preview explicitly.
- Keep ForgeWire and Fabric private; public overview material is not a download or stable API claim.
- Keep ForgeLink's JeremyShows ownership visible.
- Re-check prices, release tags, and support claims when a reviewer asks; do not infer them from branding assets or screenshots.
