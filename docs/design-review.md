# Organization-first website review

**Status:** the organization-first website is live on its existing host; focused content and visual refinements are under review in draft PR #2. This document records the accepted information architecture and content boundaries.

## Positioning

ForgeWire Labs is presented as an independent software engineering and research organization. It investigates intelligent systems and software that crosses tools, repositories, machines, and operating constraints. The site explains its engineering disciplines and questions before it introduces individual projects.

The core homepage position is **“Engineering intelligent systems for work beyond the model.”** The supporting copy connects useful context, execution, and human direction. Individual product maturity remains with the relevant project descriptions and status labels.

The position and organization-level statements follow Jeremy's strategic brief. They are identified as owner-provided content in [content sources](content-sources.md), rather than being attributed to the older public profile. Final wording remains subject to approval before production.

## Navigation and content responsibilities

- **Home:** organizational purpose, an accessible constraint-question index, two private infrastructure directions, and representative public software evidence.
- **Our Work:** intelligent systems, distributed computing and execution, developer infrastructure, systems integration/local software, and applied technical education. It distinguishes disciplines from their example projects.
- **Research & Engineering:** ongoing questions separated from public implementation evidence; a project-specific RepoPact architecture diagram; RP Proving Grounds as bounded validation material.
- **Software:** the actual seven reviewed project records, individual identity, release state, maturity notes, source links, screenshots, and a keyboard-scrollable status table.
- **About:** organizational purpose, engineering disciplines, operating philosophy, project boundaries, and general/security contact routes. It contains no personal founder biography.

The existing route `/projects/` remains the Software page for continuity with the current staging site. The route `/engineering/` now has the Research & Engineering responsibility. The new `/work/` route explains the organizational disciplines.

## Art direction

The established wordmark, typography, cool neutral surfaces, and restrained teal remain. Home opens with the owner-provided neural masthead and keeps the engineering-question index as substantive content. Our Work uses the owner-provided abstract network artwork with an editorial caption. The ForgeWire workspace capture stays with Software content and its private-development/sample-data caption.

The social card keeps the wordmark but replaces the product screenshot with an original organization-level question index. It identifies the questions as an engineering lens and explicitly avoids implying product architecture.

## Accuracy and maturity

ForgeWire and Fabric remain private development and are described from the pinned public overview. RepoPact Core's released CLI state, Workbench source-build preview, Anvil developer preview, Flink ownership and legacy release naming, and SkillForge's published app/beta distinction remain explicit. RP Proving Grounds is not presented as a product; its public instructions pin RepoPact 3.0.2, so the site does not imply that it validates the newer 3.1.3 package.

Open research questions are labeled as such. Public implementation notes link to source and version evidence. No people, departments, customers, partnerships, paid services, corporate registrations, research publications, or validated research achievements are invented.

## Review gates

- Review the updated public staging site directly. The prior public screenshots show the obsolete homepage and no replacement browser screenshots are available for this revision.
- Confirm the three organizational mailbox routes are clearly separated from public project discussion and private vulnerability reporting.
- Approve the owner-provided organization purpose and work-area statements for production.
- Reconfirm the public ForgeWire/Fabric wording and release status if sources change before launch.
- Finish spoken screen-reader checks for navigation, content hierarchy, diagrams, and the Software table.
- Keep PR #1 draft, production deployment blocked, and the temporary preview noindex/no-follow until production approval.
