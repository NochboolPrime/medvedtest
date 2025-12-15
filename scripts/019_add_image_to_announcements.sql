-- Add image_url field to announcements table
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update sample announcement with an image
UPDATE announcements 
SET image_url = '/images/zagraznenie-okruzausei-sredy-i-promyslennyi-vnesnii-vid-pri-dnevnom-svete.jpg'
WHERE title_ru = 'Добро пожаловать!';
