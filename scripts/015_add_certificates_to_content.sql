-- Add certificates to site_content table
-- Each certificate has title, description, and image URL

INSERT INTO site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, visible, is_template)
VALUES
  -- Certificate 1: ISO 9001:2015
  ('certificates', 'certificate1Title', 'text', 'ISO 9001:2015', 'ISO 9001:2015', 'ISO 9001:2015', '{"order": 1}', true, false),
  ('certificates', 'certificate1Description', 'text', 'Система менеджмента качества', 'Quality Management System', '质量管理体系', '{"order": 1}', true, false),
  ('certificates', 'certificate1Image', 'image', '/iso-9001-certificate.png', '/iso-9001-certificate.png', '/iso-9001-certificate.png', '{"order": 1}', true, false),
  
  -- Certificate 2: ISO 14001:2015
  ('certificates', 'certificate2Title', 'text', 'ISO 14001:2015', 'ISO 14001:2015', 'ISO 14001:2015', '{"order": 2}', true, false),
  ('certificates', 'certificate2Description', 'text', 'Система экологического менеджмента', 'Environmental Management System', '环境管理体系', '{"order": 2}', true, false),
  ('certificates', 'certificate2Image', 'image', '/iso-14001-certificate.png', '/iso-14001-certificate.png', '/iso-14001-certificate.png', '{"order": 2}', true, false),
  
  -- Certificate 3: ISO 45001:2018
  ('certificates', 'certificate3Title', 'text', 'ISO 45001:2018', 'ISO 45001:2018', 'ISO 45001:2018', '{"order": 3}', true, false),
  ('certificates', 'certificate3Description', 'text', 'Система менеджмента охраны труда', 'Occupational Health and Safety Management System', '职业健康安全管理体系', '{"order": 3}', true, false),
  ('certificates', 'certificate3Image', 'image', '/iso-45001-certificate.jpg', '/iso-45001-certificate.jpg', '/iso-45001-certificate.jpg', '{"order": 3}', true, false),
  
  -- Certificate 4: Technical Regulations
  ('certificates', 'certificate4Title', 'text', 'Сертификат соответствия', 'Certificate of Conformity', '合格证书', '{"order": 4}', true, false),
  ('certificates', 'certificate4Description', 'text', 'Техническому регламенту Таможенного союза', 'Technical Regulations of the Customs Union', '海关联盟技术法规', '{"order": 4}', true, false),
  ('certificates', 'certificate4Image', 'image', '/generic-certification-document.png', '/generic-certification-document.png', '/generic-certification-document.png', '{"order": 4}', true, false),
  
  -- Certificates section title and footer
  ('certificates', 'title', 'text', 'Сертификаты', 'Certificates', '证书', '{"order": 0}', true, false),
  ('certificates', 'footer', 'text', 'Все наши сертификаты актуальны и регулярно обновляются в соответствии с требованиями стандартов', 'All our certificates are up-to-date and regularly updated in accordance with standard requirements', '我们所有的证书都是最新的，并根据标准要求定期更新', '{"order": 999}', true, false)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata,
  visible = EXCLUDED.visible;
