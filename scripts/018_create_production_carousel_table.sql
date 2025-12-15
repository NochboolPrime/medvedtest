-- Create production_carousel table for managing carousel images
CREATE TABLE IF NOT EXISTS production_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Image
  image_url TEXT NOT NULL,
  
  -- Captions in different languages
  caption_ru TEXT NOT NULL,
  caption_en TEXT NOT NULL,
  caption_zh TEXT NOT NULL,
  
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

-- RLS Policies
-- Allow public to read visible carousel items
CREATE POLICY "production_carousel_select_visible_public"
  ON production_carousel
  FOR SELECT
  USING (is_visible = true);

-- Allow service role full access for admin operations
CREATE POLICY "production_carousel_all_service_role"
  ON production_carousel
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insert default carousel images
INSERT INTO production_carousel (image_url, caption_ru, caption_en, caption_zh, order_index, is_visible) VALUES
  ('/images/zagraznenie-okruzausei-sredy-i-promyslennyi-vnesnii-vid-pri-dnevnom-svete.jpg', 'Нефтегазовое производственное оборудование', 'Oil and gas production equipment', '石油和天然气生产设备', 1, true),
  ('/images/vnutrennii-vid-staleliteinogo-zavoda.jpg', 'Внутренний вид производственного цеха', 'Interior view of production facility', '生产设施内部视图', 2, true),
  ('/images/zagraznenie-okruzausei-sredy-i-promyslennyi-ekster-er.jpg', 'Нефтеперерабатывающий завод', 'Oil refinery plant', '炼油厂', 3, true),
  ('/images/freepik-the-style-is-candid-image-photography-with-natural-23372.png', 'Промышленное оборудование для нефтегазовой отрасли', 'Industrial equipment for oil and gas industry', '石油和天然气工业的工业设备', 4, true)
ON CONFLICT DO NOTHING;
