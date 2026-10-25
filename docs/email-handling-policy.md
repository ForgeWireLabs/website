# ForgeWire Labs email handling policy

**Mailbox status:** Three separate `.com` mailboxes were created through IONOS, as confirmed by the owner. Delivery, sending, authentication, mailbox access, MFA, and routing checks are pending. The site must not present a pending address as a verified operational channel.

## Channel responsibilities

| Address | Purpose | Handling |
|---|---|---|
| `contact@forgewirelabs.com` | General correspondence, research inquiries, collaboration, and partnerships | Review manually. Do not imply a staffed department or response deadline. |
| `support@forgewirelabs.com` | Questions about publicly available software | Public bugs and feature discussion belong in the affected public project repository when appropriate. Check its README for release and support scope. This address does not promise a service level or support for private development. |
| `security@forgewirelabs.com` | Confidential vulnerability and security reports | Keep access separate from routine correspondence. Never forward reports to public issues, public mailing lists, or an ordinary shared inbox. Do not include report details in an automatic response. |

Until a channel has passed its required checks, keep its website address as plain text with verification pending and do not provide a `mailto:` link. Do not send sensitive vulnerability details to `security@` until delivery, recipient access, MFA, and absence of unsafe forwarding have been confirmed.

Before central security intake is verified, use a repository's private vulnerability reporting only when its Security tab confirms that the route is available. Confirm the submission is private before providing details. If no private route is available, do not put vulnerability details in public Issues; wait for an approved private channel. Do not automatically enable autoresponders or promise disclosure timelines.

## Message handling rules

- Reply from the address that matches the subject. Confirm the received `From` and `Reply-To` values during testing.
- Keep subject lines concise and avoid placing confidential security details in them.
- For a misdirected ordinary inquiry, reply with the correct public project route. Do not forward it without a reason.
- For a security report, do not copy details into another channel. Move it only through a verified private path.
- If sensitive material is posted publicly, do not quote or amplify it. Use available moderation controls and a verified private route to reduce exposure where possible. Do not promise removal from caches or downstream copies.
- Check inboxes on a sustainable owner-defined schedule. No response-time commitment is established. Use an out-of-office reply only when accurate and when it does not disclose private availability or project details.
- Keep mailbox credentials and MFA recovery material in the owner's password manager. Use individual, least-privilege access where available. Do not share the security mailbox password with general correspondence operators.
- Do not configure forwarding loops. Any forwarding rule must have an owner and be tested for destination, confidentiality, bounce behavior, categorization, and reply identity.

## Suggested response templates

Use these only after the relevant route is operationally verified. Replace bracketed text and send from the correct approved identity.

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

## Current website behavior

About shows the three owner-confirmed mailbox addresses and states that their operational checks are pending. No pending address has a `mailto:` link. It directs public software discussion to project repositories, keeps security reporting separate, and warns against public vulnerability details. It does not use the public organization issue tracker as the general contact route. The existing named `.org` mailbox is not disclosed.
