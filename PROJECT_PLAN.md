# Pirates of Grill — Product & Delivery Plan

## Product goal
Build a polished restaurant website and operational POS that can be demonstrated to Pirates of Grill and, if they choose to adopt it, configured for their real business. The customer experience should feel premium and brand-specific—not like a generic template. The public website, reservations, staff workflow, payment flow, and hardware must each be validated before the project advances to the next milestone.

**Delivery rule:** Work on one milestone at a time. At the end of each milestone, demonstrate the agreed acceptance criteria, report known gaps, and wait for the user's explicit approval before starting the next milestone. Do not connect real payment credentials, publish the site, or represent the system as production-ready without the restaurant's authorization and required business details.

## Proposed stack
- **Web:** Next.js App Router, React, TypeScript, Tailwind CSS.
- **Backend:** Supabase Postgres, Auth, Realtime, and Storage; server-side Next.js code for privileged operations.
- **Validation and testing:** Type-safe request validation, unit/integration tests, and browser-based end-to-end tests for critical booking, POS, and payment flows.
- **Motion and 3D:** A short pre-rendered Blender animation (WebM/GLB as appropriate) with a lightweight fallback; use Three.js only if an interactive 3D scene is justified. Provide skip, reduced-motion, keyboard, and mobile paths.
- **Print and payment:** Printer-friendly HTML/CSS and tested browser print flow. A QR code must encode a payment-provider-created payment link/intent; payment confirmation must come from a trusted provider webhook, never from scanning or client-side amount data alone.

Use currently supported stable package versions when implementation begins; verify compatibility rather than pinning speculative versions in this plan.

## Decisions and business inputs required before production
These do not block a local visual prototype, but they do block production booking, billing, and payment configuration:
- Confirm restaurant brand assets, approved copy, menu, prices, food photography, hours, address, contact details, and applicable tax/fee rules.
- Confirm whether this is one location or multiple, table inventory/capacities, booking duration and slot policy, walk-in workflow, cancellation policy, and staff roles.
- Confirm payment provider and merchant account, supported payment methods/currency, refund policy, and provider webhook setup. Never store card or bank credentials in this application.
- Confirm receipt printer make/model, paper width, connection method, and the device/browser staff will use.
- Confirm hosting/domain, data ownership, retention, privacy notice, and who will administer the Supabase project.

Until these are supplied, use clearly labeled demo data and sandbox payment configuration only.

## Data model proposal (Supabase/Postgres)
Use UUID primary keys, `timestamptz` timestamps, foreign keys, check constraints, indexes, and explicit status transitions. Store currency as integer minor units (for example, paise) plus an ISO currency code; do not use floating-point or unconstrained decimal arithmetic for money. Keep operational data scoped by `location_id`, even if launch begins with one restaurant.

### Identity and access
- **`profiles`** — `id` references `auth.users`, display name, contact fields, timestamps. A profile is not an authority source for its own privileged role.
- **`location_memberships`** — profile, location, role (`owner`, `manager`, `staff`), active state; unique profile/location pair. Only trusted administrative processes may grant roles.
- **Authorization:** Enable RLS on every exposed table. Customer-facing access is limited to the data needed for a booking. Staff access is scoped to assigned locations. Admin-only mutations are enforced by RLS and server-side authorization, not hidden UI routes. Keep the Supabase service-role key server-only; never ship it to the browser.

### Restaurant operations
- **`locations`** — name, address, timezone, currency, business contact details, active state.
- **`restaurant_tables`** — location, table number/label, capacity, active state; unique location/table label. Derive availability from time-bounded reservations and active dining sessions rather than trusting a manually mutable status as the sole source of truth.
- **`reservations`** — location, optional authenticated customer, guest name/contact, party size, start/end time, status (`pending`, `confirmed`, `seated`, `cancelled`, `completed`, `no_show`), optional assigned table, notes, timestamps. Validate party size and booking window. Prevent overlapping assignments transactionally; do not rely on a client-side availability check alone. Retain only necessary guest information and define retention/deletion policy.
- **`menu_categories`** and **`menu_items`** — location, display order, name/description, active/availability state, dietary/allergen metadata, image path, current price in minor units. Public reads expose only active items.
- **`offers`** — location, title/copy, image, start/end time, active state, optional redemption rules. Admin mutations are audited; public reads expose only currently valid offers.

### POS, bills, and payments
- **`dining_sessions`** — location, table, opening staff member, party size, open/closed state, opened/closed timestamps, optional reservation. Enforce one open session per table. A walk-in can open a session without a reservation.
- **`orders`** — dining session, status, creating staff member, timestamps. This allows an open tab to receive items before a bill is finalized.
- **`order_items`** — order, optional menu item reference, immutable item-name/price/tax snapshots, quantity, notes, line total. Preserve historical bill values when the menu later changes; use controlled server-side operations for edits/voids.
- **`bills`** — dining session, unique bill number, status (`open`, `issued`, `partially_paid`, `paid`, `void`), immutable subtotal/tax/discount/total snapshots in minor units, currency, issuer, issued/paid timestamps. Define rounding and tax calculation rules with the business before launch. Use transactions for finalization and payment allocation.
- **`bill_items`** — bill, immutable item description/quantity/unit-price/tax/line-total snapshots. Separate from mutable menu records and keep issued bills reproducible.
- **`payments`** — bill, provider, provider payment/intent ID, amount in minor units, currency, status (`created`, `pending`, `succeeded`, `failed`, `refunded`), idempotency key, timestamps. Enforce provider webhook signature verification and idempotent event processing. Payment records are reconciled against the provider; browser redirects are not proof of payment.
- **`audit_events`** — actor, location, entity/action, timestamp, and minimal before/after metadata for sensitive actions such as discounts, voids, refunds, role changes, and bill edits. Restrict access and avoid recording secrets or unnecessary personal data.

### Important data integrity rules
- Create reservations, allocate tables, open sessions, finalize bills, and apply payment events through validated transactional server-side operations/RPCs.
- Use database constraints and unique/idempotency keys to prevent duplicate reservations, bills, and webhook effects under retries or concurrent staff actions.
- QR codes contain an opaque provider payment URL/intent reference only. The provider creates the exact amount from the server-calculated bill; do not encode a client-editable amount or expose internal tokens that grant administrative access.
- Define tax, service charge, discounts, split bills, refunds, and bill corrections with the restaurant before financial workflows are treated as production-ready.

## Milestones and acceptance gates

### Milestone 0 — Product discovery and acceptance baseline
**Build/decide:** Confirm brand/business inputs listed above; define user journeys, roles, booking rules, bill/tax rules, payment-provider sandbox, printer target, and launch scope. Establish visual references and an agreed browser/device matrix.

**Accept when:** User approves the written scope and unresolved production blockers are explicitly listed. No production secrets or live payment processing are used.

### Milestone 1 — Foundation, design system, and secure data layer
**Build:** Clean Next.js/TypeScript project foundation; responsive visual system; navigation/footer and reusable button/card/focus states; Supabase local/dev configuration; schema migrations, generated types, RLS policies, seed demo data, and authorization tests. Set up lint/typecheck/test scripts and environment-variable handling.

**Accept when:** App runs locally; public pages cannot read private operational data; unauthorized users cannot access staff/admin operations; role and location isolation tests pass; no service-role key is present in browser bundles; user approves visual direction and schema.

### Milestone 2 — Public brand experience and motion intro
**Build:** Premium home page with approved brand story, imagery, menu highlights, offers, location/contact details, and calls to action. Add the Blender-produced/pre-rendered pirate-and-barbecue intro with skip control, reduced-motion handling, mobile fallback, and sensible loading behavior. Smooth scrolling only where it does not impair navigation or accessibility; buttons have consistent hover, focus, and active states.

**Accept when:** Golden paths work on desktop/mobile and keyboard; intro is skippable and reduced-motion users are not forced through it; performance and image loading are checked; 4K layouts use readable constrained content rather than simply stretching; user approves the visual experience.

### Milestone 3 — Menu and reservation workflow
**Build:** Search/filterable menu and item detail presentation; guest/customer reservation form; server-side availability validation and transactional table allocation; confirmation/cancellation flow and staff reservation view; realtime refresh where it improves the experience.

**Accept when:** Tests cover invalid input, unavailable slots, concurrent attempts for the same table/slot, cancellation, and timezone boundaries; bookings persist correctly and only authorized staff see guest contact data; user approves the booking rules and journey.

### Milestone 4 — Staff authentication and live floor operations
**Build:** Supabase Auth sign-in, recovery, session protection, location-scoped RBAC; staff dashboard for reservations and table floor; open/close dining sessions, set party size, seat a reservation or walk-in, and manage offers. Realtime updates must not bypass RLS.

**Accept when:** Role/location access tests pass, concurrent table actions are handled safely, inactive staff lose access, and staff can complete the agreed seating workflow; user approves operational usability.

### Milestone 5 — POS billing, receipts, and payment integration
**Build:** Add/remove menu items and quantities against a dining session; server-calculated totals using approved tax/discount rules; issue and preserve bills; thermal-printer-friendly receipt with tested paper width; provider sandbox payment intent/QR, signed webhook processing, idempotent reconciliation, and payment status display. Include appropriate void/refund permissions and audit trail as agreed.

**Accept when:** Test bill totals match approved examples; printed output is legible on the actual target printer; QR payment succeeds only through the provider sandbox and webhook-confirmed state; duplicate/out-of-order webhooks do not double-charge or double-mark paid; no client can alter an issued amount or mark a bill paid; user approves before live payment credentials are considered.

### Milestone 6 — Hardening, handover, and deployment
**Build:** End-to-end regression, security/RLS review, accessibility and responsive checks, backup/restore and migration procedure, monitoring/error reporting, privacy/retention documentation, staff runbook, deployment configuration, and operational handover.

**Accept when:** Critical public, booking, staff, and billing flows pass on agreed devices; secrets and webhook configuration are reviewed; backup/restore and deployment steps are demonstrated; production launch is separately authorized by the user and restaurant.

## Working agreement
- Do not start the next milestone until the user explicitly accepts the current one.
- Keep every milestone demonstrable; distinguish mocked/demo behavior from real integrations.
- Report tests run, blockers, assumptions, and any security-sensitive choices at each gate.
- The website is a sales demonstration until the restaurant approves the content, policies, payment setup, and production deployment.
