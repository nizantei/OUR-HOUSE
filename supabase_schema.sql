-- Our House Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/qqvalflevmsnocarexkx/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS & HOUSES
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  google_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  profile_picture TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE houses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  user_1 UUID REFERENCES users(id) ON DELETE CASCADE,
  user_2 UUID REFERENCES users(id) ON DELETE CASCADE,
  invitation_code TEXT UNIQUE,
  invitation_used BOOLEAN DEFAULT false,
  CONSTRAINT two_users_only CHECK (user_1 IS NOT NULL OR user_2 IS NOT NULL),
  CONSTRAINT users_different CHECK (user_1 != user_2)
);

-- Index for faster lookups
CREATE INDEX idx_houses_invitation_code ON houses(invitation_code) WHERE invitation_used = false;
CREATE INDEX idx_houses_users ON houses(user_1, user_2);

-- =====================================================
-- LIVING ROOM
-- =====================================================

CREATE TABLE living_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  featured_image_url TEXT,
  featured_image_uploaded_by UUID REFERENCES users(id),
  featured_image_uploaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE countdowns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  living_room_id UUID REFERENCES living_rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- KITCHEN
-- =====================================================

CREATE TABLE kitchens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sticky_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kitchen_id UUID REFERENCES kitchens(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('text', 'checklist', 'doodle')),
  content JSONB NOT NULL, -- For text: {"text": "..."}, checklist: {"items": [...]}, doodle: {"imageUrl": "..."}
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  z_index INTEGER DEFAULT 0,
  color TEXT NOT NULL,
  rotation DECIMAL(5,2) DEFAULT 0, -- -5 to 5 degrees for natural look
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE magnets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kitchen_id UUID REFERENCES kitchens(id) ON DELETE CASCADE,
  magnet_type TEXT NOT NULL, -- References magnet_library
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  z_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- GARDEN
-- =====================================================

CREATE TABLE gardens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  plant_last_watered TIMESTAMPTZ,
  plant_growth_stage INTEGER DEFAULT 0 CHECK (plant_growth_stage >= 0 AND plant_growth_stage <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE flowers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
  goal_name TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  flower_type TEXT NOT NULL, -- References plant_assets
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL
);

-- =====================================================
-- GALLERY
-- =====================================================

CREATE TABLE galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE wall_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  caption TEXT,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- BEDROOM
-- =====================================================

CREATE TABLE bedrooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE presents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bedroom_id UUID REFERENCES bedrooms(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('letter', 'flower', 'gift', 'thought')),
  content TEXT NOT NULL,
  given_by UUID REFERENCES users(id) ON DELETE SET NULL,
  given_at TIMESTAMPTZ DEFAULT NOW(),
  opened BOOLEAN DEFAULT false,
  opened_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- PRIVATE ROOMS
-- =====================================================

CREATE TABLE private_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  visible_to_partner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(house_id, owner_id)
);

CREATE TABLE room_elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  private_room_id UUID REFERENCES private_rooms(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('furniture', 'decoration', 'text')),
  asset_id TEXT NOT NULL, -- References furniture_library id or custom
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  scale DECIMAL(4,2) DEFAULT 1.0,
  rotation DECIMAL(5,2) DEFAULT 0,
  z_index INTEGER DEFAULT 0,
  custom_text TEXT, -- For text elements
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CMS: THEMES & DESIGN SYSTEM
-- =====================================================

CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT false,

  -- Color palette as JSON
  colors JSONB NOT NULL,

  -- Typography
  font_primary TEXT DEFAULT 'Inter',
  font_decorative TEXT DEFAULT 'Crimson Pro',
  font_handwriting TEXT DEFAULT 'Kalam',

  -- Global design settings
  border_radius_base TEXT DEFAULT '0.5rem',
  shadow_style JSONB,
  animation_duration_default INTEGER DEFAULT 400,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure only one active theme at a time
CREATE UNIQUE INDEX idx_single_active_theme ON themes(is_active) WHERE is_active = true;

CREATE TABLE room_backgrounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL CHECK (room_type IN ('living_room', 'kitchen', 'garden', 'gallery', 'bedroom', 'private_room')),

  background_url TEXT,
  background_color TEXT,
  texture_overlay_url TEXT,

  blur_amount INTEGER DEFAULT 0,
  opacity DECIMAL(3,2) DEFAULT 1.0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(theme_id, room_type)
);

-- =====================================================
-- CMS: ASSET LIBRARIES
-- =====================================================

CREATE TABLE furniture_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('seating', 'tables', 'decoration', 'plants', 'lighting', 'storage')),
  tags TEXT[],

  asset_url TEXT NOT NULL,
  thumbnail_url TEXT,

  default_width INTEGER,
  default_height INTEGER,
  allows_color_customization BOOLEAN DEFAULT false,

  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_furniture_category ON furniture_library(category) WHERE is_active = true;
CREATE INDEX idx_furniture_sort ON furniture_library(sort_order);

CREATE TABLE magnet_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  asset_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plant_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('plant_stage', 'flower')),

  -- For plant stages
  growth_stage INTEGER CHECK (growth_stage IS NULL OR (growth_stage >= 0 AND growth_stage <= 5)),

  -- For flowers
  flower_name TEXT,
  flower_color TEXT,

  asset_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT plant_stage_check CHECK (
    (type = 'plant_stage' AND growth_stage IS NOT NULL AND flower_name IS NULL) OR
    (type = 'flower' AND growth_stage IS NULL AND flower_name IS NOT NULL)
  )
);

CREATE TABLE sticky_note_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  background_color TEXT NOT NULL,
  text_color TEXT NOT NULL,
  texture_url TEXT,
  border_style TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ui_elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  element_type TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  asset_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(element_type, variant_name)
);

CREATE TABLE design_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  active_theme_id UUID REFERENCES themes(id),
  custom_css JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure single design_config row
CREATE UNIQUE INDEX idx_single_config ON design_config((id IS NOT NULL));

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE living_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE countdowns ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitchens ENABLE ROW LEVEL SECURITY;
ALTER TABLE sticky_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE magnets ENABLE ROW LEVEL SECURITY;
ALTER TABLE gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE flowers ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE wall_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bedrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE presents ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_elements ENABLE ROW LEVEL SECURITY;

-- Public read for CMS tables (asset libraries)
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_backgrounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE furniture_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE magnet_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sticky_note_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_config ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user is part of a house
CREATE OR REPLACE FUNCTION user_in_house(house_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM houses
    WHERE id = house_uuid
    AND (user_1 = user_uuid OR user_2 = user_uuid)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users table: Users can read their own data and users in their house
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid()::uuid = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::uuid = id);

-- Houses: Users can read houses they're part of
CREATE POLICY "Users can read own houses" ON houses FOR SELECT USING (
  auth.uid()::uuid = user_1 OR auth.uid()::uuid = user_2
);
CREATE POLICY "Users can create houses" ON houses FOR INSERT WITH CHECK (auth.uid()::uuid = created_by);
CREATE POLICY "Users can update own houses" ON houses FOR UPDATE USING (
  auth.uid()::uuid = user_1 OR auth.uid()::uuid = user_2
);

-- Living rooms: Access if user is in the house
CREATE POLICY "Users can access house living room" ON living_rooms FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = living_rooms.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can access house countdowns" ON countdowns FOR ALL USING (
  EXISTS (
    SELECT 1 FROM living_rooms lr
    JOIN houses h ON h.id = lr.house_id
    WHERE lr.id = countdowns.living_room_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Kitchen: Access if user is in the house
CREATE POLICY "Users can access house kitchen" ON kitchens FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = kitchens.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage sticky notes" ON sticky_notes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM kitchens k
    JOIN houses h ON h.id = k.house_id
    WHERE k.id = sticky_notes.kitchen_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage magnets" ON magnets FOR ALL USING (
  EXISTS (
    SELECT 1 FROM kitchens k
    JOIN houses h ON h.id = k.house_id
    WHERE k.id = magnets.kitchen_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Garden: Access if user is in the house
CREATE POLICY "Users can access house garden" ON gardens FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = gardens.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage flowers" ON flowers FOR ALL USING (
  EXISTS (
    SELECT 1 FROM gardens g
    JOIN houses h ON h.id = g.house_id
    WHERE g.id = flowers.garden_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Gallery: Access if user is in the house
CREATE POLICY "Users can access house gallery" ON galleries FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = galleries.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage wall images" ON wall_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM galleries g
    JOIN houses h ON h.id = g.house_id
    WHERE g.id = wall_images.gallery_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage albums" ON albums FOR ALL USING (
  EXISTS (
    SELECT 1 FROM galleries g
    JOIN houses h ON h.id = g.house_id
    WHERE g.id = albums.gallery_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage photos" ON photos FOR ALL USING (
  EXISTS (
    SELECT 1 FROM albums a
    JOIN galleries g ON g.id = a.gallery_id
    JOIN houses h ON h.id = g.house_id
    WHERE a.id = photos.album_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Bedroom: Access if user is in the house
CREATE POLICY "Users can access house bedroom" ON bedrooms FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = bedrooms.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

CREATE POLICY "Users can manage presents" ON presents FOR ALL USING (
  EXISTS (
    SELECT 1 FROM bedrooms b
    JOIN houses h ON h.id = b.house_id
    WHERE b.id = presents.bedroom_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Private rooms: Access if user owns room or has permission to view
CREATE POLICY "Users can manage own private room" ON private_rooms FOR ALL USING (
  auth.uid()::uuid = owner_id OR
  (visible_to_partner = true AND EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = private_rooms.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  ))
);

CREATE POLICY "Users can manage room elements" ON room_elements FOR ALL USING (
  EXISTS (
    SELECT 1 FROM private_rooms pr
    WHERE pr.id = room_elements.private_room_id
    AND pr.owner_id = auth.uid()::uuid
  )
);

-- CMS tables: Everyone can read, only admins can write
CREATE POLICY "Anyone can read themes" ON themes FOR SELECT USING (true);
CREATE POLICY "Admins can manage themes" ON themes FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read room backgrounds" ON room_backgrounds FOR SELECT USING (true);
CREATE POLICY "Admins can manage room backgrounds" ON room_backgrounds FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read furniture library" ON furniture_library FOR SELECT USING (true);
CREATE POLICY "Admins can manage furniture library" ON furniture_library FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read magnet library" ON magnet_library FOR SELECT USING (true);
CREATE POLICY "Admins can manage magnet library" ON magnet_library FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read plant assets" ON plant_assets FOR SELECT USING (true);
CREATE POLICY "Admins can manage plant assets" ON plant_assets FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read sticky note styles" ON sticky_note_styles FOR SELECT USING (true);
CREATE POLICY "Admins can manage sticky note styles" ON sticky_note_styles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read ui elements" ON ui_elements FOR SELECT USING (true);
CREATE POLICY "Admins can manage ui elements" ON ui_elements FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

CREATE POLICY "Anyone can read design config" ON design_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage design config" ON design_config FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function: Generate unique invitation code
CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 6-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 6));

    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM houses WHERE invitation_code = code) INTO exists;

    EXIT WHEN NOT exists;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function: Create house with initial rooms
CREATE OR REPLACE FUNCTION create_house_with_rooms(creator_id UUID)
RETURNS UUID AS $$
DECLARE
  new_house_id UUID;
BEGIN
  -- Create house
  INSERT INTO houses (created_by, user_1, invitation_code)
  VALUES (creator_id, creator_id, generate_invitation_code())
  RETURNING id INTO new_house_id;

  -- Create all rooms for the house
  INSERT INTO living_rooms (house_id) VALUES (new_house_id);
  INSERT INTO kitchens (house_id) VALUES (new_house_id);
  INSERT INTO gardens (house_id) VALUES (new_house_id);
  INSERT INTO galleries (house_id) VALUES (new_house_id);
  INSERT INTO bedrooms (house_id) VALUES (new_house_id);

  -- Create private rooms for the creator
  INSERT INTO private_rooms (house_id, owner_id) VALUES (new_house_id, creator_id);

  RETURN new_house_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Join house via invitation code
CREATE OR REPLACE FUNCTION join_house(user_id UUID, inv_code TEXT)
RETURNS UUID AS $$
DECLARE
  house_id UUID;
BEGIN
  -- Find house with invitation code
  SELECT id INTO house_id
  FROM houses
  WHERE invitation_code = inv_code
  AND invitation_used = false
  AND user_2 IS NULL;

  IF house_id IS NULL THEN
    RAISE EXCEPTION 'Invalid or already used invitation code';
  END IF;

  -- Add user to house
  UPDATE houses
  SET user_2 = user_id, invitation_used = true
  WHERE id = house_id;

  -- Create private room for the new user
  INSERT INTO private_rooms (house_id, owner_id) VALUES (house_id, user_id);

  RETURN house_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_themes_updated_at BEFORE UPDATE ON themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_furniture_updated_at BEFORE UPDATE ON furniture_library
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_design_config_updated_at BEFORE UPDATE ON design_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert default theme
INSERT INTO themes (name, description, is_active, colors) VALUES (
  'Warm Minimalism',
  'Soft, cozy, clean aesthetic with warm tones',
  true,
  '{
    "warmth-50": "#FFF9F5",
    "warmth-100": "#FFF3E8",
    "warmth-200": "#FFE8D6",
    "warmth-300": "#FFD4B8",
    "warmth-500": "#E8A87C",
    "warmth-700": "#C77D55",
    "warmth-900": "#8B5A3C",
    "living-room": "#D4A574",
    "kitchen": "#A8C5A0",
    "garden": "#8FB88F",
    "gallery": "#B8A7C9",
    "bedroom": "#D4A5A5",
    "private-room": "#A3B8CC"
  }'::jsonb
);

-- Insert default design config
INSERT INTO design_config (active_theme_id)
SELECT id FROM themes WHERE name = 'Warm Minimalism';

-- Insert sticky note styles
INSERT INTO sticky_note_styles (name, background_color, text_color, sort_order) VALUES
  ('Classic Yellow', '#FFF9C4', '#5D4037', 0),
  ('Soft Pink', '#F8BBD0', '#4A148C', 1),
  ('Mint Green', '#C8E6C9', '#1B5E20', 2),
  ('Sky Blue', '#BBDEFB', '#01579B', 3),
  ('Lavender', '#E1BEE7', '#4A148C', 4),
  ('Peach', '#FFCCBC', '#BF360C', 5);

-- Set admin for your email
UPDATE users SET is_admin = true WHERE email = 'nizantei@gmail.com';

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Configure Google OAuth in Supabase Authentication settings';
  RAISE NOTICE '2. Create storage buckets for file uploads';
  RAISE NOTICE '3. Run the React application';
END $$;
