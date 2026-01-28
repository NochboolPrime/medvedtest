-- Seed site_content table with current website content
-- This will populate all sections with Russian, English, and Chinese translations

-- Hero Section
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata)
VALUES
('hero', 'title', 'text', 
 'Исключительные решения исключительных задач',
 'Exceptional solutions for exceptional challenges',
 '为特殊挑战提供卓越解决方案',
 '{"order": 1}'::jsonb),
 
('hero', 'description', 'text',
 'Проектируем, производим, обслуживаем — под ключ. Надёжные решения для нефтегазовой отрасли и машиностроения.',
 'Design, manufacture, service — turnkey. Reliable solutions for the oil and gas industry and machine building.',
 '设计、制造、服务——交钥匙工程。为石油天然气行业和机械制造业提供可靠的解决方案。',
 '{"order": 2}'::jsonb),

('hero', 'contactButton', 'text',
 'Связаться с нами',
 'Contact Us',
 '联系我们',
 '{"order": 3}'::jsonb),

('hero', 'certificatesButton', 'text',
 'Сертификаты',
 'Certificates',
 '证书',
 '{"order": 4}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh;

-- About Section
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata)
VALUES
('about', 'title', 'text',
 'О компании',
 'About Company',
 '关于公司',
 '{"order": 1}'::jsonb),

('about', 'mission', 'text',
 'Мы создаем устойчивую, многогранную и независимую компанию через инвестиции в людей, технологии и производственные мощности.',
 'We create a sustainable, multifaceted and independent company through investments in people, technology and production facilities.',
 '我们通过对人才、技术和生产设施的投资，打造一个可持续、多元化和独立的公司。',
 '{"order": 2}'::jsonb),

('about', 'principlesTitle', 'text',
 'Принципы бизнеса',
 'Business Principles',
 '商业原则',
 '{"order": 3}'::jsonb),

('about', 'principle1', 'text',
 'Многогранность бизнеса — развитие нескольких направлений деятельности',
 'Business versatility — development of several areas of activity',
 '业务多样性 - 发展多个业务领域',
 '{"order": 4, "index": 0}'::jsonb),

('about', 'principle2', 'text',
 'Инвестиции в людей, технологии и производственные мощности',
 'Investments in people, technology and production facilities',
 '对人才、技术和生产设施的投资',
 '{"order": 5, "index": 1}'::jsonb),

('about', 'principle3', 'text',
 'Совершенствование процессов и повышение эффективности операций',
 'Process improvement and operational efficiency enhancement',
 '流程改进和运营效率提升',
 '{"order": 6, "index": 2}'::jsonb),

('about', 'principle4', 'text',
 'Развитие импортных и экспортных направлений деятельности',
 'Development of import and export activities',
 '进出口业务发展',
 '{"order": 7, "index": 3}'::jsonb),

('about', 'strategyTitle', 'text',
 'Стратегия развития',
 'Development Strategy',
 '发展战略',
 '{"order": 8}'::jsonb),

('about', 'strategy1', 'text',
 'Инвестиции в людей и технологии',
 'Investments in people and technology',
 '对人才和技术的投资',
 '{"order": 9, "index": 0}'::jsonb),

('about', 'strategy2', 'text',
 'Развитие высокотехнологичного производственного кластера',
 'Development of high-tech production cluster',
 '发展高科技生产集群',
 '{"order": 10, "index": 1}'::jsonb),

('about', 'strategy3', 'text',
 'Расширение гражданского сектора деятельности',
 'Expansion of civilian sector activities',
 '扩大民用部门业务',
 '{"order": 11, "index": 2}'::jsonb),

('about', 'strategy4', 'text',
 'Развитие импортных и экспортных направлений',
 'Development of import and export directions',
 '发展进出口方向',
 '{"order": 12, "index": 3}'::jsonb),

('about', 'certificatesTitle', 'text',
 'Сертификаты',
 'Certificates',
 '证书',
 '{"order": 13}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh;

-- Services Section
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata)
VALUES
('services', 'title', 'text',
 'Специализация по направлениям',
 'Specialization by Areas',
 '专业领域',
 '{"order": 1}'::jsonb),

('services', 'service1Title', 'text',
 'Цементирование скважин',
 'Well Cementing',
 '固井',
 '{"order": 2, "index": 0}'::jsonb),

('services', 'service1Description', 'text',
 'Проектирование и изготовление оборудования для цементирования скважин, в том числе комплексов для цементирования.',
 'Design and manufacturing of equipment for well cementing, including cementing complexes.',
 '设计和制造固井设备，包括固井综合设施。',
 '{"order": 3, "index": 0}'::jsonb),

('services', 'service2Title', 'text',
 'Гидроразрыв пласта',
 'Hydraulic Fracturing',
 '水力压裂',
 '{"order": 4, "index": 1}'::jsonb),

('services', 'service2Description', 'text',
 'Проектирование и изготовление оборудования для гидроразрыва пласта.',
 'Design and manufacturing of hydraulic fracturing equipment.',
 '设计和制造水力压裂设备。',
 '{"order": 5, "index": 1}'::jsonb),

('services', 'service3Title', 'text',
 'Насосное оборудование',
 'Pumping Equipment',
 '泵送设备',
 '{"order": 6, "index": 2}'::jsonb),

('services', 'service3Description', 'text',
 'Поставка насосного оборудования (плунжерных насосов высокого давления) для решения задач при освоении скважин и задач по интенсификации добычи.',
 'Supply of pumping equipment (high-pressure plunger pumps) for well development and production intensification tasks.',
 '供应泵送设备（高压柱塞泵），用于油井开发和增产任务。',
 '{"order": 7, "index": 2}'::jsonb),

('services', 'service4Title', 'text',
 'Модернизация и ремонт',
 'Modernization and Repair',
 '现代化改造和维修',
 '{"order": 8, "index": 3}'::jsonb),

('services', 'service4Description', 'text',
 'Модернизация, капитальный ремонт, продление сроков эксплуатации (в том числе программного комплекса) для тампонажного оборудования и оборудования для гидроразрыва пласта.',
 'Modernization, overhaul, extension of service life (including software complex) for cementing equipment and hydraulic fracturing equipment.',
 '对固井设备和水力压裂设备进行现代化改造、大修和延长使用寿命（包括软件综合体）。',
 '{"order": 9, "index": 3}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh;

-- Excellence/Products Section
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata)
VALUES
('excellence', 'title', 'text',
 'Продукция',
 'Products',
 '产品',
 '{"order": 1}'::jsonb),

('excellence', 'description', 'text',
 'Наши решения и эффективные технологии помогают клиентам достигать исключительных результатов в нефтегазовой отрасли',
 'Our solutions and effective technologies help clients achieve exceptional results in the oil and gas industry',
 '我们的解决方案和有效技术帮助客户在石油天然气行业取得卓越成果',
 '{"order": 2}'::jsonb),

('excellence', 'feature1Title', 'text',
 'Доступность технологий',
 'Technology Accessibility',
 '技术可及性',
 '{"order": 3, "index": 0}'::jsonb),

('excellence', 'feature1Description', 'text',
 'Современное оборудование и передовые технологии производства',
 'Modern equipment and advanced production technologies',
 '现代化设备和先进的生产技术',
 '{"order": 4, "index": 0}'::jsonb),

('excellence', 'feature2Title', 'text',
 'Гибкость решений',
 'Solution Flexibility',
 '解决方案灵活性',
 '{"order": 5, "index": 1}'::jsonb),

('excellence', 'feature2Description', 'text',
 'Индивидуальный подход к каждому проекту и задаче',
 'Individual approach to each project and task',
 '为每个项目和任务提供个性化方法',
 '{"order": 6, "index": 1}'::jsonb),

('excellence', 'feature3Title', 'text',
 'Надёжность',
 'Reliability',
 '可靠性',
 '{"order": 7, "index": 2}'::jsonb),

('excellence', 'feature3Description', 'text',
 'Гарантия качества и долговечности оборудования',
 'Quality and durability guarantee of equipment',
 '设备质量和耐用性保证',
 '{"order": 8, "index": 2}'::jsonb),

('excellence', 'feature4Title', 'text',
 'Оперативность',
 'Efficiency',
 '效率',
 '{"order": 9, "index": 3}'::jsonb),

('excellence', 'feature4Description', 'text',
 'Быстрое выполнение заказов и техническая поддержка',
 'Fast order fulfillment and technical support',
 '快速订单履行和技术支持',
 '{"order": 10, "index": 3}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh;

-- Contact Section
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata)
VALUES
('contact', 'title', 'text',
 'Свяжитесь с нами',
 'Contact Us',
 '联系我们',
 '{"order": 1}'::jsonb),

('contact', 'description', 'text',
 'Готовы обсудить ваш проект? Напишите нам или позвоните',
 'Ready to discuss your project? Write to us or call',
 '准备讨论您的项目？请给我们写信或打电话',
 '{"order": 2}'::jsonb),

('contact', 'address', 'text',
 'г. Москва, ул. Примерная, д. 1',
 'Moscow, Example St., 1',
 '莫斯科，示例街，1号',
 '{"order": 3}'::jsonb),

('contact', 'phone', 'text',
 '+7 (495) 777-56-60',
 '+7 (495) 777-56-60',
 '+7 (495) 777-56-60',
 '{"order": 4}'::jsonb),

('contact', 'email', 'text',
 'info@aomedved.ru',
 'info@aomedved.ru',
 'info@aomedved.ru',
 '{"order": 5}'::jsonb),

('contact', 'hours', 'text',
 'Пн-Пт: 9:00 - 18:00',
 'Mon-Fri: 9:00 - 18:00',
 '周一至周五：9:00 - 18:00',
 '{"order": 6}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh;

-- Footer Section  
INSERT INTO public.site_content (section, key, content_type, value_ru, value_en, value_zh, metadata)
VALUES
('footer', 'companyName', 'text',
 'ТД Медведь',
 'TD Medved',
 'TD 熊',
 '{"order": 1}'::jsonb),

('footer', 'companyDescription', 'text',
 'Надёжные решения для нефтегазовой отрасли',
 'Reliable solutions for the oil and gas industry',
 '为石油天然气行业提供可靠的解决方案',
 '{"order": 2}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh;
