-- Добавление полей для активной ссылки в анонсы
ALTER TABLE announcements
ADD COLUMN link_url TEXT,
ADD COLUMN link_text_ru TEXT,
ADD COLUMN link_text_en TEXT,
ADD COLUMN link_text_zh TEXT;

-- Комментарии для документации
COMMENT ON COLUMN announcements.link_url IS 'URL активной ссылки в анонсе';
COMMENT ON COLUMN announcements.link_text_ru IS 'Текст кнопки ссылки на русском';
COMMENT ON COLUMN announcements.link_text_en IS 'Текст кнопки ссылки на английском';
COMMENT ON COLUMN announcements.link_text_zh IS 'Текст кнопки ссылки на китайском';
