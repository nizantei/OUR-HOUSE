-- =====================================================
-- OUR HOUSE - Complete Room Setup
-- =====================================================
-- Run this ONCE in Supabase SQL Editor to set up everything
-- needed for the new rooms (Kitchen, Garden, Gallery, Bedroom, Private Room)
--
-- This script is safe to run multiple times - it uses
-- IF NOT EXISTS / IF EXISTS checks everywhere.
-- =====================================================


-- =====================================================
-- STEP 1: Create missing tables (if they don't exist yet)
-- =====================================================

-- Kitchen
CREATE TABLE IF NOT EXISTS kitchens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sticky_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kitchen_id UUID REFERENCES kitchens(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('text', 'checklist', 'doodle')),
  content JSONB NOT NULL,
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  z_index INTEGER DEFAULT 0,
  color TEXT NOT NULL,
  rotation DECIMAL(5,2) DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS magnets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kitchen_id UUID REFERENCES kitchens(id) ON DELETE CASCADE,
  magnet_type TEXT NOT NULL,
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  z_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Garden
CREATE TABLE IF NOT EXISTS gardens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  plant_last_watered TIMESTAMPTZ,
  plant_growth_stage INTEGER DEFAULT 0 CHECK (plant_growth_stage >= 0 AND plant_growth_stage <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flowers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
  goal_name TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  flower_type TEXT NOT NULL,
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL
);

-- Gallery
CREATE TABLE IF NOT EXISTS galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wall_images (
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

CREATE TABLE IF NOT EXISTS albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  caption TEXT,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Bedroom
CREATE TABLE IF NOT EXISTS bedrooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS presents (
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

-- Private Rooms
CREATE TABLE IF NOT EXISTS private_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  visible_to_partner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(house_id, owner_id)
);

CREATE TABLE IF NOT EXISTS room_elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  private_room_id UUID REFERENCES private_rooms(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('furniture', 'decoration', 'text')),
  asset_id TEXT NOT NULL,
  position_x DECIMAL(10,2) NOT NULL,
  position_y DECIMAL(10,2) NOT NULL,
  scale DECIMAL(4,2) DEFAULT 1.0,
  rotation DECIMAL(5,2) DEFAULT 0,
  z_index INTEGER DEFAULT 0,
  custom_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- STEP 2: Add gift_subtype column to presents
-- =====================================================

ALTER TABLE presents ADD COLUMN IF NOT EXISTS gift_subtype TEXT;


-- =====================================================
-- STEP 3: Enable RLS on all tables
-- =====================================================

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


-- =====================================================
-- STEP 4: Create RLS policies (drop first if they exist)
-- =====================================================

-- Helper function
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

-- Kitchen policies
DROP POLICY IF EXISTS "Users can access house kitchen" ON kitchens;
CREATE POLICY "Users can access house kitchen" ON kitchens FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = kitchens.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage sticky notes" ON sticky_notes;
CREATE POLICY "Users can manage sticky notes" ON sticky_notes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM kitchens k
    JOIN houses h ON h.id = k.house_id
    WHERE k.id = sticky_notes.kitchen_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage magnets" ON magnets;
CREATE POLICY "Users can manage magnets" ON magnets FOR ALL USING (
  EXISTS (
    SELECT 1 FROM kitchens k
    JOIN houses h ON h.id = k.house_id
    WHERE k.id = magnets.kitchen_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Garden policies
DROP POLICY IF EXISTS "Users can access house garden" ON gardens;
CREATE POLICY "Users can access house garden" ON gardens FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = gardens.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage flowers" ON flowers;
CREATE POLICY "Users can manage flowers" ON flowers FOR ALL USING (
  EXISTS (
    SELECT 1 FROM gardens g
    JOIN houses h ON h.id = g.house_id
    WHERE g.id = flowers.garden_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Gallery policies
DROP POLICY IF EXISTS "Users can access house gallery" ON galleries;
CREATE POLICY "Users can access house gallery" ON galleries FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = galleries.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage wall images" ON wall_images;
CREATE POLICY "Users can manage wall images" ON wall_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM galleries g
    JOIN houses h ON h.id = g.house_id
    WHERE g.id = wall_images.gallery_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage albums" ON albums;
CREATE POLICY "Users can manage albums" ON albums FOR ALL USING (
  EXISTS (
    SELECT 1 FROM galleries g
    JOIN houses h ON h.id = g.house_id
    WHERE g.id = albums.gallery_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage photos" ON photos;
CREATE POLICY "Users can manage photos" ON photos FOR ALL USING (
  EXISTS (
    SELECT 1 FROM albums a
    JOIN galleries g ON g.id = a.gallery_id
    JOIN houses h ON h.id = g.house_id
    WHERE a.id = photos.album_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Bedroom policies
DROP POLICY IF EXISTS "Users can access house bedroom" ON bedrooms;
CREATE POLICY "Users can access house bedroom" ON bedrooms FOR ALL USING (
  EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = bedrooms.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  )
);

DROP POLICY IF EXISTS "Users can manage presents" ON presents;
CREATE POLICY "Users can manage presents" ON presents FOR ALL USING (
  EXISTS (
    SELECT 1 FROM bedrooms b
    JOIN houses h ON h.id = b.house_id
    WHERE b.id = presents.bedroom_id
    AND (h.user_1 = auth.uid()::uuid OR h.user_2 = auth.uid()::uuid)
  )
);

-- Private Room policies
DROP POLICY IF EXISTS "Users can manage own private room" ON private_rooms;
CREATE POLICY "Users can manage own private room" ON private_rooms FOR ALL USING (
  auth.uid()::uuid = owner_id OR
  (visible_to_partner = true AND EXISTS (
    SELECT 1 FROM houses
    WHERE houses.id = private_rooms.house_id
    AND (houses.user_1 = auth.uid()::uuid OR houses.user_2 = auth.uid()::uuid)
  ))
);

DROP POLICY IF EXISTS "Users can manage room elements" ON room_elements;
CREATE POLICY "Users can manage room elements" ON room_elements FOR ALL USING (
  EXISTS (
    SELECT 1 FROM private_rooms pr
    WHERE pr.id = room_elements.private_room_id
    AND pr.owner_id = auth.uid()::uuid
  )
);


-- =====================================================
-- STEP 5: Update create_house_with_rooms function
-- (so new houses automatically get all rooms)
-- =====================================================

CREATE OR REPLACE FUNCTION create_house_with_rooms(creator_id UUID)
RETURNS UUID AS $$
DECLARE
  new_house_id UUID;
BEGIN
  INSERT INTO houses (created_by, user_1, invitation_code)
  VALUES (creator_id, creator_id, generate_invitation_code())
  RETURNING id INTO new_house_id;

  INSERT INTO living_rooms (house_id) VALUES (new_house_id);
  INSERT INTO kitchens (house_id) VALUES (new_house_id);
  INSERT INTO gardens (house_id) VALUES (new_house_id);
  INSERT INTO galleries (house_id) VALUES (new_house_id);
  INSERT INTO bedrooms (house_id) VALUES (new_house_id);
  INSERT INTO private_rooms (house_id, owner_id) VALUES (new_house_id, creator_id);

  RETURN new_house_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =====================================================
-- STEP 6: Create rooms for your EXISTING house
-- (fills in any missing room rows)
-- =====================================================

-- Create kitchen for houses that don't have one
INSERT INTO kitchens (house_id)
SELECT h.id FROM houses h
WHERE NOT EXISTS (SELECT 1 FROM kitchens k WHERE k.house_id = h.id);

-- Create garden for houses that don't have one
INSERT INTO gardens (house_id)
SELECT h.id FROM houses h
WHERE NOT EXISTS (SELECT 1 FROM gardens g WHERE g.house_id = h.id);

-- Create gallery for houses that don't have one
INSERT INTO galleries (house_id)
SELECT h.id FROM houses h
WHERE NOT EXISTS (SELECT 1 FROM galleries g WHERE g.house_id = h.id);

-- Create bedroom for houses that don't have one
INSERT INTO bedrooms (house_id)
SELECT h.id FROM houses h
WHERE NOT EXISTS (SELECT 1 FROM bedrooms b WHERE b.house_id = h.id);

-- Create private rooms for user_1 who don't have one
INSERT INTO private_rooms (house_id, owner_id)
SELECT h.id, h.user_1 FROM houses h
WHERE h.user_1 IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM private_rooms pr WHERE pr.house_id = h.id AND pr.owner_id = h.user_1
);

-- Create private rooms for user_2 who don't have one
INSERT INTO private_rooms (house_id, owner_id)
SELECT h.id, h.user_2 FROM houses h
WHERE h.user_2 IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM private_rooms pr WHERE pr.house_id = h.id AND pr.owner_id = h.user_2
);


-- =====================================================
-- STEP 7: Storage bucket RLS policies
-- (for uploading images - doodles, gallery photos, album photos)
-- =====================================================

-- These let logged-in users upload to the buckets,
-- and anyone can view the images (they're public buckets)

DROP POLICY IF EXISTS "Authenticated users can upload doodles" ON storage.objects;
CREATE POLICY "Authenticated users can upload doodles" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'doodle-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can view doodles" ON storage.objects;
CREATE POLICY "Anyone can view doodles" ON storage.objects
  FOR SELECT USING (bucket_id = 'doodle-images');

DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can view gallery images" ON storage.objects;
CREATE POLICY "Anyone can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

DROP POLICY IF EXISTS "Authenticated users can upload album photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload album photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'album-photos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can view album photos" ON storage.objects;
CREATE POLICY "Anyone can view album photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'album-photos');


-- =====================================================
-- STEP 8: Enable Realtime on all room tables
-- =====================================================

-- This tells Supabase to broadcast changes to these tables
-- so both partners see updates instantly

ALTER PUBLICATION supabase_realtime ADD TABLE sticky_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE magnets;
ALTER PUBLICATION supabase_realtime ADD TABLE gardens;
ALTER PUBLICATION supabase_realtime ADD TABLE flowers;
ALTER PUBLICATION supabase_realtime ADD TABLE wall_images;
ALTER PUBLICATION supabase_realtime ADD TABLE albums;
ALTER PUBLICATION supabase_realtime ADD TABLE photos;
ALTER PUBLICATION supabase_realtime ADD TABLE presents;
ALTER PUBLICATION supabase_realtime ADD TABLE room_elements;
ALTER PUBLICATION supabase_realtime ADD TABLE private_rooms;


-- =====================================================
-- DONE!
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== ALL DONE! ===';
  RAISE NOTICE 'Tables created, RLS policies set, Realtime enabled.';
  RAISE NOTICE '';
  RAISE NOTICE 'NEXT: Go to Storage in the sidebar and create 3 buckets:';
  RAISE NOTICE '  1. doodle-images  (set to Public)';
  RAISE NOTICE '  2. gallery-images (set to Public)';
  RAISE NOTICE '  3. album-photos   (set to Public)';
END $$;
