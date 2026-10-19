-- Pirates of Grill Database Schema & RLS Policies (Milestone 1)

CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff', 'manager');
CREATE TYPE table_status AS ENUM ('available', 'occupied', 'reserved', 'maintenance');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'seated', 'cancelled', 'completed', 'no_show');
CREATE TYPE menu_category AS ENUM ('starters', 'grills', 'mains', 'desserts', 'beverages');
CREATE TYPE bill_status AS ENUM ('open', 'issued', 'partially_paid', 'paid', 'void');
CREATE TYPE payment_status AS ENUM ('created', 'pending', 'succeeded', 'failed', 'refunded');

-- Locations
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'UTC',
    currency TEXT NOT NULL DEFAULT 'INR',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles (Extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Location Memberships (Staff RBAC)
CREATE TABLE location_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'staff',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_profile_location UNIQUE (profile_id, location_id)
);

-- Restaurant Tables
CREATE TABLE restaurant_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    table_number INTEGER NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    status table_status NOT NULL DEFAULT 'available',
    current_party_size INTEGER,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_location_table UNIQUE (location_id, table_number)
);

-- Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    guest_name TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    status reservation_status NOT NULL DEFAULT 'pending',
    table_id UUID REFERENCES restaurant_tables(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Menu Items
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category menu_category NOT NULL,
    price_minor INTEGER NOT NULL CHECK (price_minor >= 0),
    is_vegetarian BOOLEAN NOT NULL DEFAULT false,
    image_url TEXT,
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Offers
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_text TEXT,
    valid_until TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dining Sessions
CREATE TABLE dining_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    table_id UUID NOT NULL REFERENCES restaurant_tables(id) ON DELETE RESTRICT,
    server_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0),
    is_open BOOLEAN NOT NULL DEFAULT true,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    closed_at TIMESTAMPTZ
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES dining_sessions(id) ON DELETE CASCADE,
    server_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'sent',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    item_name TEXT NOT NULL,
    unit_price_minor INTEGER NOT NULL CHECK (unit_price_minor >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total_minor INTEGER NOT NULL CHECK (line_total_minor >= 0),
    notes TEXT
);

-- Bills
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES dining_sessions(id) ON DELETE CASCADE,
    bill_number TEXT NOT NULL UNIQUE,
    status bill_status NOT NULL DEFAULT 'open',
    subtotal_minor INTEGER NOT NULL CHECK (subtotal_minor >= 0),
    tax_minor INTEGER NOT NULL CHECK (tax_minor >= 0),
    discount_minor INTEGER NOT NULL DEFAULT 0 CHECK (discount_minor >= 0),
    total_amount_minor INTEGER NOT NULL CHECK (total_amount_minor >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    qr_code_token TEXT NOT NULL UNIQUE,
    issued_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    paid_at TIMESTAMPTZ
);

-- Bill Items
CREATE TABLE bill_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_minor INTEGER NOT NULL CHECK (unit_price_minor >= 0),
    line_total_minor INTEGER NOT NULL CHECK (line_total_minor >= 0)
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'sandbox',
    provider_payment_id TEXT UNIQUE,
    amount_minor INTEGER NOT NULL CHECK (amount_minor > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status payment_status NOT NULL DEFAULT 'created',
    idempotency_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit Events
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- Helper security functions
CREATE OR REPLACE FUNCTION auth_is_location_staff(loc_id UUID)
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM location_memberships
    WHERE profile_id = auth.uid()
      AND location_id = loc_id
      AND is_active = true
      AND role IN ('staff', 'manager', 'admin')
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION auth_is_location_admin(loc_id UUID)
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM location_memberships
    WHERE profile_id = auth.uid()
      AND location_id = loc_id
      AND is_active = true
      AND role IN ('manager', 'admin')
  );
END;
$$ LANGUAGE plpgsql;

-- RLS Policies

-- Locations: public read active locations, staff/admin full read
CREATE POLICY "Public read active locations" ON locations FOR SELECT USING (is_active = true);
CREATE POLICY "Staff read own locations" ON locations FOR SELECT USING (auth_is_location_staff(id));

-- Profiles: users read/update own profile
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Staff read location profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM location_memberships m1
    JOIN location_memberships m2 ON m1.location_id = m2.location_id
    WHERE m1.profile_id = auth.uid() AND m2.profile_id = profiles.id AND m1.is_active = true
  )
);

-- Location Memberships: read own memberships or location admin
CREATE POLICY "Read own memberships" ON location_memberships FOR SELECT USING (profile_id = auth.uid() OR auth_is_location_admin(location_id));

-- Restaurant Tables: public read active tables, staff modify
CREATE POLICY "Public read tables" ON restaurant_tables FOR SELECT USING (true);
CREATE POLICY "Staff modify tables" ON restaurant_tables FOR ALL USING (auth_is_location_staff(location_id));

-- Reservations: customer read own / staff manage
CREATE POLICY "Customer read own reservations" ON reservations FOR SELECT USING (user_id = auth.uid() OR auth_is_location_staff(location_id));
CREATE POLICY "Customer create reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff manage reservations" ON reservations FOR UPDATE USING (auth_is_location_staff(location_id));

-- Menu Items: public read available, staff manage
CREATE POLICY "Public read menu items" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Staff manage menu items" ON menu_items FOR ALL USING (auth_is_location_staff(location_id));

-- Offers: public read active offers, staff manage
CREATE POLICY "Public read active offers" ON offers FOR SELECT USING (is_active = true AND valid_until > now());
CREATE POLICY "Staff manage offers" ON offers FOR ALL USING (auth_is_location_staff(location_id));

-- Dining Sessions, Orders, Order Items, Bills, Bill Items, Payments, Audit Events: staff/admin access only
CREATE POLICY "Staff access dining sessions" ON dining_sessions FOR ALL USING (auth_is_location_staff(location_id));
CREATE POLICY "Staff access orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM dining_sessions ds WHERE ds.id = session_id AND auth_is_location_staff(ds.location_id))
);
CREATE POLICY "Staff access order items" ON order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM orders o JOIN dining_sessions ds ON ds.id = o.session_id WHERE o.id = order_id AND auth_is_location_staff(ds.location_id))
);
CREATE POLICY "Staff access bills" ON bills FOR ALL USING (
  EXISTS (SELECT 1 FROM dining_sessions ds WHERE ds.id = session_id AND auth_is_location_staff(ds.location_id))
);
CREATE POLICY "Staff access bill items" ON bill_items FOR ALL USING (
  EXISTS (SELECT 1 FROM bills b JOIN dining_sessions ds ON ds.id = b.session_id WHERE b.id = bill_id AND auth_is_location_staff(ds.location_id))
);
CREATE POLICY "Staff access payments" ON payments FOR ALL USING (
  EXISTS (SELECT 1 FROM bills b JOIN dining_sessions ds ON ds.id = b.session_id WHERE b.id = bill_id AND auth_is_location_staff(ds.location_id))
);
CREATE POLICY "Staff access audit events" ON audit_events FOR ALL USING (
  location_id IS NULL OR auth_is_location_admin(location_id)
);
