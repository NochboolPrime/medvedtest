-- Add a test news article
INSERT INTO news (
  title_ru,
  title_en,
  title_zh,
  content_ru,
  content_en,
  content_zh,
  excerpt_ru,
  excerpt_en,
  excerpt_zh,
  slug,
  is_published,
  published_at
) VALUES (
  'Добро пожаловать в наш блог!',
  'Welcome to our blog!',
  '欢迎来到我们的博客！',
  '<h2>Мы рады приветствовать вас</h2><p>Добро пожаловать на страницу новостей ТД Медведь! Здесь вы найдете последние обновления о нашей компании, новые продукты и важные объявления.</p><p>Мы специализируемся на поставке оборудования для нефтегазовой промышленности и предлагаем широкий ассортимент качественной продукции.</p><h3>Что вы найдете здесь:</h3><ul><li>Анонсы новых продуктов</li><li>Новости компании</li><li>Отраслевые статьи</li><li>Технические обновления</li></ul>',
  '<h2>We are glad to welcome you</h2><p>Welcome to TD Medved news page! Here you will find the latest updates about our company, new products and important announcements.</p><p>We specialize in supplying equipment for the oil and gas industry and offer a wide range of quality products.</p><h3>What you will find here:</h3><ul><li>New product announcements</li><li>Company news</li><li>Industry articles</li><li>Technical updates</li></ul>',
  '<h2>我们很高兴欢迎您</h2><p>欢迎来到TD Medved新闻页面！在这里您将找到有关我们公司的最新更新、新产品和重要公告。</p><p>我们专门为石油和天然气行业提供设备，并提供各种优质产品。</p><h3>您将在这里找到：</h3><ul><li>新产品公告</li><li>公司新闻</li><li>行业文章</li><li>技术更新</li></ul>',
  'Добро пожаловать на страницу новостей ТД Медведь! Узнайте о последних обновлениях, новых продуктах и важных объявлениях.',
  'Welcome to TD Medved news page! Learn about the latest updates, new products and important announcements.',
  '欢迎来到TD Medved新闻页面！了解最新更新、新产品和重要公告。',
  'welcome-to-our-blog',
  true,
  NOW()
) ON CONFLICT (slug) DO NOTHING;
