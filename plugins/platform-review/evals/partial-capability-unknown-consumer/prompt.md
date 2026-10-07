Our team wants to add a support-console button to regenerate a customer's failed invoice PDF. The proposal is a new invoice renderer in the console service. Give an implementation recommendation and the evidence needed to resolve uncertain parts. Do not change files or execute application workflows; reading available instruction documents is allowed. There is no application checkout, so use the supplied excerpts.

The requirement is to render the exact historical invoice, not recompute today's prices, and keep the normal support-user authorization boundary. A support action must not resend the customer's email.

What we have:
- billing/render.ts exports renderInvoice(snapshot): bytes. It renders stored line items and taxes. Unit tests use historical snapshots, but no support-console call is shown.
- billing/send-invoice.ts reads invoiceSnapshot(invoiceId), calls renderInvoice(snapshot), writes the PDF, and then sends email. The command is exposed as billing/send-invoice. This is the only published command in the package export map.
- billing/jobs.ts contains a string handler registry mapping invoice.resend to sendInvoice. The deployed registry selection is not provided.
- support/invoices.ts imports getInvoice from billing/read and displays invoice metadata. The supplied file has no render button and no renderInvoice import.
- A search for regenerateInvoice in the support directory returns zero results. No positive-control search, package build listing, support route registry, object-store access policy, or external consumer inventory is supplied.
- An issue comment says 'the support service already regenerates invoices', but gives no route, command output, test, or deployment identifier.

What implementation should the team choose now, and what should it avoid assuming?
