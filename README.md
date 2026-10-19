# Pirates-Of-Grill

Official web application and integrated restaurant management platform for **Pirates of Grill**.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS tokens, and Supabase PostgreSQL with strict Row Level Security (RLS).

## Key Features

- **Cinematic Web Experience**: Dynamic barbecue & pirate-themed intro leading into 4K-ready responsive dining showcase.
- **Dynamic Table Reservations**: Real-time table booking and confirmation system.
- **Interactive Digital Menu**: Dynamic categories, live dietary filters, and pricing.
- **Staff POS & Table Management**: Real-time table seating allocation, bill generation, and financial tracking.
- **Thermal Receipt & QR Payments**: Automated bill computation and thermal receipt printing with dynamic UPI/payment QR codes linked directly to the bill amount.
- **Multi-Location Architecture**: Multi-branch schema with location-scoped isolation and role-based access control (RBAC).

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local` (see `.env.example`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database & Migrations

Database DDL migrations and seed files are located in the `supabase/` directory:
- `supabase/migrations/20261018000001_initial_schema.sql` (14 tables with RLS and security helper functions)
- `supabase/seed.sql` (Initial location and fixture data)
