# ForgeWire and Fabric: public copy basis

**Reviewed:** 2026-10-25

**Public source:** [ForgeWire overview at `85d1905b0bd8db420882f00065daff34833dab27`](https://github.com/ForgeWireLabs/ForgeWire-Overview/blob/85d1905b0bd8db420882f00065daff34833dab27/README.md)

This note separates statements already supported by the public overview from draft wording and private details. The live staging candidate uses only the already public material summarized below. Any further copy in the proposal section stays out of the website until Jeremy and ChatGPT approve it.

## Verified public information

### ForgeWire

- ForgeWire is in private development. The public repository is an overview, not the application source, a supported setup path, or a release. No public download or release date is offered.
- The overview describes an application and runtime direction for coordinating models, personas, tools, skills, memory, task execution, and compute around work.
- Its problem framing is to understand a request, select relevant capabilities, preserve useful context, coordinate bounded steps, and return an outcome a person can review.
- It explicitly marks some current paths separately from active design and implementation work. Selected paths do not establish a complete or released product lifecycle.
- The public overview includes a genuine Projects workspace capture. It shows project instructions, files, related chats, and three projects. Its sample data is disposable; the capture is one widget from a private development build, not a public release or full-window product tour.

### Fabric

- Fabric is a separate, related private execution control plane for authenticated, policy-gated work across machines.
- The overview describes a limited, configuration-dependent integration for selected ForgeWire application workflows.
- Broader integration, conformance, and release gates remain open. Fabric is not a public remote service or deployment option.
- The overview expressly excludes private protocol, enrollment, endpoint, credential, and deployment details from public materials.

## Copy currently on the staging website

These candidate descriptions paraphrase the public overview and do not disclose additional private information. They remain staging copy for design and wording approval.

**ForgeWire**

> ForgeWire is an application and runtime direction for organizing model-assisted work around project context, tools, and selected workflows, with a person reviewing the outcome.

**Fabric**

> Fabric is a separate execution control-plane direction for authenticated, policy-gated work across machines. The public overview describes a limited, configuration-dependent connection for selected ForgeWire workflows.

The surrounding site identifies both as **Private development** and states that no supported public installation or service is available.

## Additional high-level wording proposed, not published

These alternative descriptions make the problem statement more direct. They are proposals for review and are not included in the deployed staging copy.

**ForgeWire — problem-first option**

> ForgeWire explores how model-assisted work can keep useful context, select relevant capabilities, and coordinate bounded steps so a person can review the result. Its application and runtime remain in private development.

**Fabric — problem-first option**

> Fabric explores how work can be placed and run across authorized machines under explicit authentication and policy. It remains a private control-plane project with limited, configuration-dependent integration.

These statements stay at the overview level. If approved, recheck them against the public overview revision before moving the site toward production preparation.

## Details to keep unpublished

Do not add private protocols, enrollment flows, endpoints, credentials, deployment procedures, runner/operator interfaces, internal network or trust boundaries, private screenshots, source code, or configuration. Do not imply universal integration, guaranteed remote execution, product availability, release readiness, or a complete end-to-end run lifecycle. The public diagrams are conceptual and bounded; a diagram or sample UI does not establish every path as a current or public capability.
