-- Update site content with new Mission, Values, and Advantages

-- About Section - Mission
UPDATE public.site_content SET
  value_ru = 'Ведение деятельности по производству, продвижению и поддержке современных, эффективных, качественных, безопасных решений и специализированных механизмов, используемых предприятиями-партнёрами для решения их производственных задач с соблюдением принципов и ценностей, обеспечивающих долгосрочный успех и устойчивое развитие наших партнёров, сотрудников и общества в целом.',
  value_en = 'Conducting activities in production, promotion and support of modern, effective, high-quality, safe solutions and specialized mechanisms used by partner enterprises to solve their production tasks while adhering to principles and values that ensure long-term success and sustainable development of our partners, employees and society as a whole.',
  value_zh = '开展现代化、高效、优质、安全解决方案和专用机械设备的生产、推广和支持活动，供合作企业用于解决其生产任务，同时遵循确保我们的合作伙伴、员工和整个社会长期成功和可持续发展的原则和价值观。'
WHERE section = 'about' AND key = 'mission';

-- About Section - Update Principles Title to "Our Values"
UPDATE public.site_content SET
  value_ru = 'Наши ценности',
  value_en = 'Our Values',
  value_zh = '我们的价值观'
WHERE section = 'about' AND key = 'principlesTitle';

-- About Section - Update Principles (Values)
UPDATE public.site_content SET
  value_ru = 'Многогранность — системный подход к развитию различных направлений деятельности',
  value_en = 'Versatility — systematic approach to developing various areas of activity',
  value_zh = '多样性 — 系统性方法发展各种业务领域',
  metadata = '{"order": 4, "index": 0}'::jsonb
WHERE section = 'about' AND key = 'principle1';

UPDATE public.site_content SET
  value_ru = 'Системность — структурированный подход к решению комплексных задач',
  value_en = 'Systematicity — structured approach to solving complex tasks',
  value_zh = '系统性 — 结构化方法解决复杂任务',
  metadata = '{"order": 5, "index": 1}'::jsonb
WHERE section = 'about' AND key = 'principle2';

UPDATE public.site_content SET
  value_ru = 'Патриотизм — ориентация на развитие российского производства и технологий',
  value_en = 'Patriotism — focus on development of Russian production and technologies',
  value_zh = '爱国主义 — 专注于俄罗斯生产和技术发展',
  metadata = '{"order": 6, "index": 2}'::jsonb
WHERE section = 'about' AND key = 'principle3';

UPDATE public.site_content SET
  value_ru = 'Эффективность — оптимизация процессов для достижения максимальных результатов',
  value_en = 'Efficiency — process optimization to achieve maximum results',
  value_zh = '效率 — 优化流程以实现最大成果',
  metadata = '{"order": 7, "index": 3}'::jsonb
WHERE section = 'about' AND key = 'principle4';

-- Add new values (principles 5 and 6)
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, is_visible)
VALUES
('about', 'principle5', 'text',
 'Развитие — непрерывное совершенствование технологий и компетенций',
 'Development — continuous improvement of technologies and competencies',
 '发展 — 技术和能力的持续改进',
 '{"order": 8, "index": 4}'::jsonb, true),

('about', 'principle6', 'text',
 'Творчество — инновационный подход к разработке технических решений',
 'Creativity — innovative approach to technical solutions development',
 '创造力 — 创新方法开发技术解决方案',
 '{"order": 9, "index": 5}'::jsonb, true)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata;

-- Excellence Section - Update Features (Advantages)
UPDATE public.site_content SET
  value_ru = 'Доступность и технологичность',
  value_en = 'Accessibility and Technology',
  value_zh = '可及性和技术性',
  metadata = '{"order": 3, "index": 0}'::jsonb
WHERE section = 'excellence' AND key = 'feature1Title';

UPDATE public.site_content SET
  value_ru = 'Российская производственная компания по созданию современного, технологичного оборудования для предприятий нефтегазового сектора',
  value_en = 'Russian manufacturing company creating modern, high-tech equipment for oil and gas sector enterprises',
  value_zh = '俄罗斯制造公司为石油天然气行业企业创造现代化、高科技设备',
  metadata = '{"order": 4, "index": 0}'::jsonb
WHERE section = 'excellence' AND key = 'feature1Description';

UPDATE public.site_content SET
  value_ru = 'Гибкость',
  value_en = 'Flexibility',
  value_zh = '灵活性',
  metadata = '{"order": 5, "index": 1}'::jsonb
WHERE section = 'excellence' AND key = 'feature2Title';

UPDATE public.site_content SET
  value_ru = 'Широкая вариативность решений в соответствии с производственными задачами партнёров',
  value_en = 'Wide range of solutions in accordance with partners\' production tasks',
  value_zh = '根据合作伙伴的生产任务提供广泛的解决方案',
  metadata = '{"order": 6, "index": 1}'::jsonb
WHERE section = 'excellence' AND key = 'feature2Description';

UPDATE public.site_content SET
  value_ru = 'Забота',
  value_en = 'Care',
  value_zh = '关怀',
  metadata = '{"order": 7, "index": 2}'::jsonb
WHERE section = 'excellence' AND key = 'feature3Title';

UPDATE public.site_content SET
  value_ru = 'Сервисная поддержка оборудования на протяжении всего жизненного цикла',
  value_en = 'Equipment service support throughout the entire life cycle',
  value_zh = '在整个生命周期内提供设备服务支持',
  metadata = '{"order": 8, "index": 2}'::jsonb
WHERE section = 'excellence' AND key = 'feature3Description';

UPDATE public.site_content SET
  value_ru = 'Клиентоориентированность',
  value_en = 'Customer Focus',
  value_zh = '客户导向',
  metadata = '{"order": 9, "index": 3}'::jsonb
WHERE section = 'excellence' AND key = 'feature4Title';

UPDATE public.site_content SET
  value_ru = 'Непрерывное взаимодействие и постоянная вовлечённость в решение производственных задач партнёров',
  value_en = 'Continuous interaction and constant involvement in solving partners\' production tasks',
  value_zh = '持续互动并不断参与解决合作伙伴的生产任务',
  metadata = '{"order": 10, "index": 3}'::jsonb
WHERE section = 'excellence' AND key = 'feature4Description';
