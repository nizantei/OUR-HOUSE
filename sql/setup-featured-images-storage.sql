-- RLS Policies for featured-images Storage Bucket

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read/view images from featured-images bucket (since it's public)
CREATE POLICY "Public read access for featured images"
ON storage.objects FOR SELECT
USING (bucket_id = 'featured-images');

-- Policy: Users can upload images if they belong to a house
CREATE POLICY "Users can upload featured images if they belong to a house"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'featured-images' AND
  auth.uid() IN (
    SELECT user_1 FROM houses
    UNION
    SELECT user_2 FROM houses WHERE user_2 IS NOT NULL
  )
);

-- Policy: Users can update their own uploads
CREATE POLICY "Users can update their own featured images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'featured-images' AND
  auth.uid() = owner
);

-- Policy: Users can delete images from their house
CREATE POLICY "Users can delete featured images from their house"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'featured-images' AND
  auth.uid() IN (
    SELECT user_1 FROM houses
    UNION
    SELECT user_2 FROM houses WHERE user_2 IS NOT NULL
  )
);
