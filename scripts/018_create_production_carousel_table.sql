-- =====================================================
-- Карусель производства (Production Carousel)
-- Выполните этот скрипт в Supabase SQL Editor
-- =====================================================

-- Удаление старой таблицы (если нужно пересоздать)
DROP TABLE IF EXISTS production_carousel CASCADE;

-- Создание таблицы production_carousel
CREATE TABLE production_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Image URL
  image_url TEXT NOT NULL,
  
  -- Captions in different languages
  caption_ru TEXT NOT NULL DEFAULT '',
  caption_en TEXT NOT NULL DEFAULT '',
  caption_zh TEXT NOT NULL DEFAULT '',
  
  -- Order and visibility
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  -- Auto-slide interval in milliseconds (default 3000ms = 3 seconds)
  auto_slide_interval INTEGER NOT NULL DEFAULT 3000
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS production_carousel_order_idx ON production_carousel(order_index);

-- Enable RLS
ALTER TABLE production_carousel ENABLE ROW LEVEL SECURITY;

-- Удаление старых политик
DROP POLICY IF EXISTS "production_carousel_select_visible_public" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_all_service_role" ON production_carousel;
DROP POLICY IF EXISTS "Allow public read production_carousel" ON production_carousel;
DROP POLICY IF EXISTS "Allow public insert production_carousel" ON production_carousel;
DROP POLICY IF EXISTS "Allow public update production_carousel" ON production_carousel;
DROP POLICY IF EXISTS "Allow public delete production_carousel" ON production_carousel;

-- RLS Policies (разрешаем все операции для работы с anon key)
CREATE POLICY "Allow public read production_carousel" ON production_carousel
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert production_carousel" ON production_carousel
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update production_carousel" ON production_carousel
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete production_carousel" ON production_carousel
  FOR DELETE USING (true);

-- Insert default carousel images
INSERT INTO production_carousel (image_url, caption_ru, caption_en, caption_zh, order_index, is_visible) VALUES
  ('/images/zagraznenie-okruzausei-sredy-i-promyslennyi-vnesnii-vid-pri-dnevnom-svete.jpg', 'Нефтегазовое производственное оборудование', 'Oil and gas production equipment', '石油和天然气生产设备', 1, true),
  ('/images/vnutrennii-vid-staleliteinogo-zavoda.jpg', 'Внутренний вид производственного цеха', 'Interior view of production facility', '生产设施内部视图', 2, true),
  ('/images/zagraznenie-okruzausei-sredy-i-promyslennyi-ekster-er.jpg', 'Нефтеперерабатывающий завод', 'Oil refinery plant', '炼油厂', 3, true),
  ('/images/freepik-the-style-is-candid-image-photography-with-natural-23372.png', 'Промышленное оборудование для нефтегазовой отрасли', 'Industrial equipment for oil and gas industry', '石油和天然气工业的工业设备', 4, true)
ON CONFLICT DO NOTHING;
