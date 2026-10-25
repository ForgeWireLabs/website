# Design quality audit

**Reviewed:** 2026-10-25  
**Scope:** second-round visual, editorial, technical, and accessibility review of the public website source.

## Findings and changes

| Area | Finding in the prior revision | Change in this revision |
|---|---|---|
| Organizational identity | The warm-paper/charcoal/acid-lime palette, large editorial serif headlines, numbered field notes, topology glyph, and repeated mono labels formed a coherent look but also a familiar editorial-tech template. The topology mark was too generic to carry the organization's name or scope. | Replaced the palette with neutral surfaces and a restrained teal signal. Removed the topology glyph and repeated section numbering. The ForgeWire Labs wordmark leads; headings use the same readable sans-serif family as body copy. Mono is limited to implementation and source labels. |
| Homepage hierarchy | The second-round home page was orderly but its word-only hero made the organization look like a directory of names and states. | The existing section structure remains. A genuine ForgeWire Projects workspace capture now anchors the hero; a visible caption identifies its private build and disposable sample data. ForgeWire and Fabric remain separate projects and precede public software evidence. |
| Private projects | Previous ForgeWire and Fabric descriptions were too vague to explain why the projects exist. | Copy now paraphrases the pinned public overview: ForgeWire organizes model-assisted work around project context, tools, and selected workflows for a person to review; Fabric is a separate private control-plane direction for authenticated, policy-gated work across machines. Both descriptions state their limits. A companion copy note identifies verified public information, candidate wording, and excluded private detail. |
| Visual evidence | The Workbench image was authentic but too small to communicate the validation view. Fixture counts could be mistaken for operating or customer metrics. | The project page retains its focused Workbench view, fixture-data caption, full-resolution capture, and pinned source. The home page adds a separate genuine ForgeWire capture with its own provenance and sample-data caption. |
| Technical diagrams | RepoPact's SVG had a useful accessible title/description, but the page did not explain its line conventions. The ForgeLink diagram could suggest a cross-project implementation relationship. | Added adjacent text alternatives and a diagram key for RepoPact. Clarified that ForgeLink's dashed edges show optional integrations in its own product model, not proof of an implemented connection or shared architecture. Both diagrams link to their full-size files and pinned sources. |
| Copy | Several pages repeatedly announced authority, boundaries, state, and evidence without demonstrating enough code-level choices. | Replaced the general principles grid with public implementation examples: RepoPact's Rust engine and typed operations, Workbench's separate source-build status, and Anvil's single-writer JSON store and scope limit. A security statement explicitly avoids implying arbitrary process confinement. |
| Typography and captions | Several captions and status labels were difficult to read at normal screen size, particularly in the project register and on mobile. | Captions and body text use a minimum of roughly 14px; maturity labels are plain-language text at a larger size. At narrow widths, the project table is explicitly keyboard-scrollable. |
| Brand assets | The metadata retained an earlier profile social graphic that did not match the website identity. The topology glyph was repeated in the favicon. | The 1200×630 wordmark-led social card now pairs the public systems-first premise with the genuine workspace capture, labeled private development and sample data. This adds original evidence without creating a new abstract symbol. The simple `FW` favicon remains. |
| Asset hygiene | An unreferenced RepoPact Core-loop prototype remained in passthrough assets and could be fetched despite appearing on no page. | Removed the unused diagram from generated output and source; the documented Core architecture remains available on the Engineering and Projects pages. |
| Preview policy | The previous staging build carried `index, follow` metadata and advertised a sitemap despite being an unapproved review copy. | Staging now has `noindex, nofollow`, no staging URLs in its generated sitemap, and no sitemap line in preview `robots.txt`. Production output retains its four canonical routes and discoverable sitemap. |

## Identity rationale

The site does not use a fabricated product symbol. The written name is the primary mark. A single teal signal is used for organization-level navigation, focus, and hierarchy; RepoPact, ForgeLink, and SkillForge retain the colors of their own source diagrams and assets. Neutral surfaces let technical material remain the evidence. The homepage now has one purposeful visual center: an actual ForgeWire workspace capture, not a diagram or interface invented for the website.

Sans-serif typography supports long-form technical reading and reduces the previous decorative contrast between a serif editorial voice and mono annotations. Monospaced text is reserved for short labels that identify a source, implementation, or project state. No gradient, animation, synthetic product screen, network motif, or generic AI illustration is used.

The home page is structured around actual maturity and ownership. ForgeWire and Fabric are significant infrastructure directions, but neither is presented as released software or a shared platform. The public ForgeWire overview supports the copy and screenshot; the complete text and exclusions are recorded in [`forgewire-fabric-public-copy.md`](../forgewire-fabric-public-copy.md). RepoPact demonstrates public implementation detail. SkillForge, Anvil, and ForgeLink show separate kinds of applied work and retain their documented release and ownership distinctions.

## Source and diagram review

- RepoPact Core text and diagram were checked against the pinned Core revision listed in [`content-sources.md`](../content-sources.md). Blue arrows in the SVG identify exchanges with the Core engine; slate arrows represent human/host interactions, evidence, and derived-view relationships; dashed boxes are derived views. The optional host/CI box is provider-specific.
- ForgeLink's diagram is owned by the separate JeremyShows repository. Its own legend identifies solid lines as ForgeLink ownership and dashed lines as optional edges. The caption says this is a product model and does not claim implementation status.
- The Workbench screenshot comes from the pinned public project repository and its README describes a disposable Core conformance fixture. The site does not treat the fixture counts as production metrics.
- SkillForge's public profile screenshot remains attributed and is labeled as an illustration of the released Windows application, not later beta surfaces.
- The ForgeWire workspace capture is sourced from the pinned public overview's “Application preview” section. Its caption does not infer implementation beyond the widget shown and labels the project names and files as disposable sample data.
- The social card is a site-authored composition with the ForgeWire wordmark and a paraphrase of the overview's systems-first premise. The embedded workspace capture is the same public, provenance-documented image used by the home page.
- The `FW` favicon is a typographic fallback at small sizes; it is not presented as a developed symbol or product mark.

## Accessibility and maintainability notes

The implementation remains static HTML/CSS generated by Eleventy. It has no browser-side JavaScript, remote fonts, client analytics, or interactive controls beyond native anchors and a horizontally scrollable table. The base layout includes a visible-on-focus skip link, semantic header/nav/main/footer, one page `h1`, explicit image alternatives, and focus outlines. The engineering table is a named region with a visible keyboard and touch scroll hint. Each technical diagram has alternative text, a nearby text key, and a full-size link. Reduced-motion preferences are honored; the site does not add animation.

The targeted review evaluates computed text, status, link, and focus colors against WCAG contrast thresholds, plus keyboard navigation, accessibility-tree semantics, zoom/reflow, mobile table operation, diagram alternatives, and desktop/mobile parity. These checks do not replace speech-output testing with a screen reader or a formal WCAG 2.2 AA audit; any such unverified checks are identified in `validation-report.md`.

## Reference material consulted

These references informed critique and evaluation; no layout, art, logo, or branded color system was copied.

- [Impeccable: Slop](https://impeccable.style/slop/) and [Signs of AI Design](https://github.com/febbhav/signs-of-ai-design) for common visual defaults and repetition patterns.
- [UXkin AI Slop Detector](https://uxkin.com/tools/ai-slop-detector) and [InterfaceKit on AI-generated design](https://blog.interfacekit.io/what-makes-a-website-look-ai-generated) as critique prompts, not authorship classifiers.
- [Pentagram, MIT Media Lab identity](https://www.pentagram.com/work/mit-media-lab) and [Pentagram, Cohere](https://www.pentagram.com/work/cohere) for organization-specific identity reasoning and scalable systems; their visual designs were not reused.
- [Upstatement, Harvard Innovation Labs](https://upstatement.com/case-study/harvard-innovation-lab) and [kyu on the kyu/Upstatement website](https://kyu.com/stories/kyu-upstatement-website-redesign) for audience paths and a coherent parent identity with independently represented groups.
- [IBM technical diagrams](https://www.ibm.com/design/language/infographics/technical-diagrams/usage/) and [IBM data visualization](https://www.ibm.com/design/language/data-visualization/overview/) for explicit relationships, legends, and readable evidence.
- [Webby Awards winners](https://winners.webbyawards.com/) as a broad portfolio reference, not a prescriptive design rubric.

## Review still needed

This revision is a candidate, not final creative approval. Review should decide whether the evidence-led wordmark composition feels distinctive and whether the proposed ForgeWire/Fabric wording is accurate and useful. Public release and private-project status should be rechecked before production deployment.
