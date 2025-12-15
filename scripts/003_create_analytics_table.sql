-- Create table for tracking product views and clicks
CREATE TABLE IF NOT EXISTS product_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click', 'detail_view')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_product_analytics_product_id ON product_analytics(product_id);
CREATE INDEX IF NOT EXISTS idx_product_analytics_created_at ON product_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_product_analytics_event_type ON product_analytics(event_type);

-- Enable RLS
ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;

-- Allow INSERT from anyone (for tracking)
CREATE POLICY "Allow insert for tracking" ON product_analytics
  FOR INSERT WITH CHECK (true);

-- Allow SELECT for all (statistics are public)
CREATE POLICY "Allow select for all" ON product_analytics
  FOR SELECT USING (true);
