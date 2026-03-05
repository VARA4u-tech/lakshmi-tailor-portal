-- ============================================================
-- Lakshmi Fashion & Designers - Supabase Database Schema
-- Safe to re-run: uses IF NOT EXISTS and DROP POLICY IF EXISTS
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PRODUCTS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en     TEXT NOT NULL,
  name_te     TEXT,
  category    TEXT NOT NULL,
  category_te TEXT,
  price       NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image_url   TEXT NOT NULL,
  in_stock    BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── GALLERY TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en    TEXT NOT NULL,
  title_te    TEXT,
  category    TEXT DEFAULT 'tailoring',
  image_url   TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ENQUIRIES TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
-- Drop existing policies first (safe re-run)
DO $$
BEGIN
  -- Products policies
  DROP POLICY IF EXISTS "Public can read products" ON products;
  DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
  DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
  DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

  -- Gallery policies
  DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
  DROP POLICY IF EXISTS "Authenticated users can insert gallery" ON gallery;
  DROP POLICY IF EXISTS "Authenticated users can delete gallery" ON gallery;

  -- Enquiries policies
  DROP POLICY IF EXISTS "Anyone can submit enquiry" ON enquiries;
  DROP POLICY IF EXISTS "Authenticated users can read enquiries" ON enquiries;
  DROP POLICY IF EXISTS "Authenticated users can update enquiry status" ON enquiries;
  DROP POLICY IF EXISTS "Authenticated users can delete enquiries" ON enquiries;
END $$;

-- Products: anyone can read, only authenticated admin can write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products"
  ON products FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery: anyone can read, only authenticated admin can write
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gallery"
  ON gallery FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert gallery"
  ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery"
  ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- Enquiries: anyone can submit, only authenticated admin can read/manage
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiry"
  ON enquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read enquiries"
  ON enquiries FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update enquiry status"
  ON enquiries FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete enquiries"
  ON enquiries FOR DELETE USING (auth.role() = 'authenticated');
