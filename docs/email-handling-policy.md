# ForgeWire Labs email handling policy

**Status:** Proposed. Applies after the relevant mailbox or private intake route is approved and tested. It does not claim that any planned `.com` mailbox is active.

## Routes and handling

| Route | Use | Handling |
|---|---|---|
| `contact@forgewirelabs.com` | General organizational correspondence, research discussions, and collaboration. | Review manually. Categorize messages as general, research, collaboration, or misdirected. Do not imply a staffed department or response deadline. |
| `support@forgewirelabs.com` | Questions about software that is publicly available. | Public bugs and feature discussion belong in the affected public project repository when appropriate. Check that project's README for release and support scope. A support address does not promise a service level or support for private development. |
| `security@forgewirelabs.com` | Confidential vulnerability and security reports, only after the separate mailbox is configured, secured, and tested. | Keep access separate from routine general correspondence. Never forward reports to public issues, public mailing lists, or an ordinary shared inbox. Do not include report details in an automatic response. |

Before central security intake is active, use a repository's GitHub private vulnerability reporting only when the affected repository explicitly offers that private route. Confirm the submission is private before providing details. If no private route is available, do not put vulnerability details in public Issues; wait for an approved private channel. The active site must continue to label the central security mailbox inactive until end-to-end tests pass.

## Message handling rules

- Use the address that matches the subject when replying. A forwarding identity is not a sender identity; test same-domain send-as with an authorized `.com` mailbox first.
- Keep the subject concise and avoid putting confidential security details in it.
- For a misdirected ordinary inquiry, reply with the correct public project route and do not forward it without a reason. For a security report, do not copy details into another channel; move it only through a verified private path.
- If sensitive material is posted publicly, do not quote or amplify it. Use the repository's available moderation controls and private-reporting route to reduce exposure where possible. Do not promise removal from caches or downstream copies.
- Mark spam as spam and do not follow links or attachments. Do not engage with abusive messages beyond necessary filtering or moderation.
- Check inboxes on a sustainable owner-defined schedule. No response-time commitment is established. If unavailable, use an out-of-office reply only when it is accurate and does not disclose private availability or project details.
- Keep mailbox credentials and MFA recovery material in the owner's password manager. Use individual, least-privilege access where available. Do not share a security mailbox password with general correspondence operators.
- Do not configure forwarding loops. Any future forward must have an owner, documented destination, and test for bounce behavior, categorization, and reply identity.

## Suggested response templates

Use these only after the relevant route is active. Replace bracketed text and send from the correct approved identity.

### General inquiry

**Subject:** Re: [original subject]

Thanks for contacting ForgeWire Labs. I’ve received your message about [brief topic]. [A concise response or next step.] If your message concerns a specific public project, its repository and release notes are linked from [the Software page](https://forgewirelabs.com/projects/).

### Public software question

**Subject:** Re: [project] — [topic]

Thanks for the report about [project]. [A concise response or request for a public reproduction detail.] For public bugs or feature discussion, please use [project issue link] so the context stays with the project. The project's README describes its current release and support scope.

### Security acknowledgment

**Subject:** We received your security report

ForgeWire Labs has received your report. Please keep technical details in this private conversation and do not post them in a public issue. We will review the information and follow up when we can. This acknowledgment does not establish a response time or remediation commitment.

Send the security template only from the verified private security mailbox or the affected project's private reporting system. Do not use it to invite a reply to a public channel.

## Current staging behavior

The About page keeps the public GitHub issue route for general inquiries and project repositories for public software questions. It lists the planned `.com` role identities as inactive text without `mailto:` links. It directs security reporters to use a repository's private vulnerability route only where present and warns against public Issues. The existing named `.org` mailbox is not exposed. These instructions should change only after owner-approved configuration and controlled tests.
