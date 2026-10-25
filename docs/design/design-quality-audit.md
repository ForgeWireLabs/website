# Design quality audit

**Reviewed:** 2026-10-25  
**Scope:** second-round visual, editorial, technical, and accessibility review of the public website source.

## Findings and changes

| Area | Finding in the prior revision | Change in this revision |
|---|---|---|
| Organizational identity | The warm-paper/charcoal/acid-lime palette, large editorial serif headlines, numbered field notes, topology glyph, and repeated mono labels formed a coherent look but also a familiar editorial-tech template. The topology mark was too generic to carry the organization's name or scope. | Replaced the palette with neutral surfaces and a restrained teal signal. Removed the topology glyph and repeated section numbering. The ForgeWire Labs wordmark leads; headings use the same readable sans-serif family as body copy. Mono is limited to implementation and source labels. |
| Homepage hierarchy | Workbench imagery and RepoPact architecture appeared before visitors understood the organization's wider scope. That made a broader engineering lab look like a repository-governance company. | The opening now names distributed computing, intelligent systems, developer software, and technical learning. ForgeWire and Fabric appear as separate private-development projects before public software evidence. The homepage introduces a portfolio, not an integrated product suite. |
| Private projects | Fabric copy previously assigned it to a distributed-execution and systems-integration workstream without a public source supporting those specifics. ForgeWire summary expanded beyond what the public overview can substantiate. | Fabric is described only as a separate private project. ForgeWire is described at the level of its public overview, which is explicitly distinguished from application source or a supported release. |
| Visual evidence | The Workbench image was authentic but too small to communicate the validation view. Fixture counts could be mistaken for operating or customer metrics. | The homepage screenshot was removed. The project page uses a CSS crop focused on the validation summary and clearly identifies the disposable fixture data. Visitors can open the full-resolution capture and its pinned source. |
| Technical diagrams | RepoPact's SVG had a useful accessible title/description, but the page did not explain its line conventions. The ForgeLink diagram could suggest a cross-project implementation relationship. | Added adjacent text alternatives and a diagram key for RepoPact. Clarified that ForgeLink's dashed edges show optional integrations in its own product model, not proof of an implemented connection or shared architecture. Both diagrams link to their full-size files and pinned sources. |
| Copy | Several pages repeatedly announced authority, boundaries, state, and evidence without demonstrating enough code-level choices. | Replaced the general principles grid with public implementation examples: RepoPact's Rust engine and typed operations, Workbench's separate source-build status, and Anvil's single-writer JSON store and scope limit. A security statement explicitly avoids implying arbitrary process confinement. |
| Typography and captions | Several captions and status labels were difficult to read at normal screen size, particularly in the project register and on mobile. | Captions and body text use a minimum of roughly 14px; maturity labels are plain-language text at a larger size. At narrow widths, the project table is explicitly keyboard-scrollable. |
| Brand assets | The metadata retained an earlier profile social graphic that did not match the website identity. The topology glyph was repeated in the favicon. | Added a wordmark-based 1200×630 social card and a simple `FW` favicon. The old profile hero image is removed from site source and generated output; its original history remains in Git. |
| Preview policy | The previous staging build carried `index, follow` metadata and advertised a sitemap despite being an unapproved review copy. | Staging now has `noindex, nofollow`, no staging URLs in its generated sitemap, and no sitemap line in preview `robots.txt`. Production output retains its four canonical routes and discoverable sitemap. |

## Identity rationale

The site does not use a fabricated product symbol. The written name is the primary mark. A single teal signal is used for organization-level navigation, focus, and hierarchy; RepoPact, ForgeLink, and SkillForge retain the colors of their own source diagrams and assets. Neutral surfaces let the technical material remain the visual evidence.

Sans-serif typography supports long-form technical reading and reduces the previous decorative contrast between a serif editorial voice and mono annotations. Monospaced text is reserved for short labels that identify a source, implementation, or project state. No gradient, animation, synthetic product screen, network motif, or generic AI illustration is used.

The home page is structured around actual maturity and ownership. ForgeWire and Fabric are significant portfolio directions, but the public record does not justify presenting either as released software or as a shared platform. RepoPact demonstrates public implementation detail. SkillForge, Anvil, and ForgeLink show separate kinds of applied work and retain their documented release and ownership distinctions.

## Source and diagram review

- RepoPact Core text and diagram were checked against the pinned Core revision listed in [`content-sources.md`](../content-sources.md). Blue arrows in the SVG identify exchanges with the Core engine; slate arrows represent human/host interactions, evidence, and derived-view relationships; dashed boxes are derived views. The optional host/CI box is provider-specific.
- ForgeLink's diagram is owned by the separate JeremyShows repository. Its own legend identifies solid lines as ForgeLink ownership and dashed lines as optional edges. The caption says this is a product model and does not claim implementation status.
- The Workbench screenshot comes from the pinned public project repository and its README describes a disposable Core conformance fixture. The site does not treat the fixture counts as production metrics.
- SkillForge's public profile screenshot remains attributed and is labeled as an illustration of the released Windows application, not later beta surfaces.
- The `FW` favicon is a typographic fallback at small sizes; it is not presented as a developed symbol or product mark.

## Accessibility and maintainability notes

The implementation remains static HTML/CSS generated by Eleventy. It has no browser-side JavaScript, remote fonts, client analytics, or interactive controls beyond native anchors and a horizontally scrollable table. The base layout includes a visible-on-focus skip link, semantic header/nav/main/footer, one page `h1`, explicit image alternatives, and focus outlines. Reduced-motion preferences are honored; the site does not add animation.

Contrast still requires visual review after the public render is available. Automated source checks cannot prove WCAG 2.2 AA conformance. In particular, review link contrast on every surface, zoom/reflow, focus indication, mobile diagram text, and the 780px minimum width of the engineering ownership table. The full-size diagrams and screenshot are linked for people who need more readable detail.

## Reference material consulted

These references informed critique and evaluation; no layout, art, logo, or branded color system was copied.

- [Impeccable: Slop](https://impeccable.style/slop/) and [Signs of AI Design](https://github.com/febbhav/signs-of-ai-design) for common visual defaults and repetition patterns.
- [UXkin AI Slop Detector](https://uxkin.com/tools/ai-slop-detector) and [InterfaceKit on AI-generated design](https://blog.interfacekit.io/what-makes-a-website-look-ai-generated) as critique prompts, not authorship classifiers.
- [Pentagram, MIT Media Lab identity](https://www.pentagram.com/work/mit-media-lab) and [Pentagram, Cohere](https://www.pentagram.com/work/cohere) for organization-specific identity reasoning and scalable systems; their visual designs were not reused.
- [Upstatement, Harvard Innovation Labs](https://upstatement.com/case-study/harvard-innovation-lab) and [kyu on the kyu/Upstatement website](https://kyu.com/stories/kyu-upstatement-website-redesign) for audience paths and a coherent parent identity with independently represented groups.
- [IBM technical diagrams](https://www.ibm.com/design/language/infographics/technical-diagrams/usage/) and [IBM data visualization](https://www.ibm.com/design/language/data-visualization/overview/) for explicit relationships, legends, and readable evidence.
- [Webby Awards winners](https://winners.webbyawards.com/) as a broad portfolio reference, not a prescriptive design rubric.

## Review still needed

This revision is a candidate, not final creative approval. Human review should decide whether the wordmark-first system is distinctive enough, whether Fabric's public description is sufficient, whether the table is usable on a phone and with zoom, and whether the screenshots and diagrams earn their page space. Public release and private-project status should be rechecked before production deployment.
