-- Content from the pasted-text.txt file
-- Translate existing products to English and Chinese
-- Product 1: Cementing Unit ЦА-320
update public.products
set
  title_en = 'Cementing Unit CA-320',
  title_zh = 'CA-320固井设备',
  description_en = 'High-performance cementing equipment for well completion',
  description_zh = '用于井筒固井的高性能设备',
  full_description_en = 'The CA-320 Cementing Unit is a modern high-tech equipment designed for cementing casing strings in oil and gas wells. The unit ensures reliable casing fixation and creation of a quality cement ring.',
  full_description_zh = 'CA-320固井设备是一种现代化的高科技设备，专为油气井套管柱固井而设计。该设备确保可靠的套管固定和优质水泥环的形成。',
  features_en = array['Pressure up to 70 MPa', 'Automated control system', 'Enhanced reliability', '24/7 support'],
  features_zh = array['压力高达70兆帕', '自动化控制系统', '增强的可靠性', '全天候支持'],
  advantages_en = array[
    'High reliability and equipment performance',
    'Automated process control system',
    'Ability to operate in harsh climatic conditions',
    'Experienced qualified personnel',
    '24/7 technical support',
    'Full compliance with safety standards'
  ],
  advantages_zh = array[
    '高可靠性和设备性能',
    '自动化过程控制系统',
    '能够在恶劣气候条件下运行',
    '经验丰富的合格人员',
    '全天候技术支持',
    '完全符合安全标准'
  ],
  applications_en = array[
    'Cementing casing strings',
    'Remedial isolation work',
    'Elimination of inter-column flows',
    'Construction of new wells',
    'Well workover operations'
  ],
  applications_zh = array[
    '套管柱固井',
    '修复隔离作业',
    '消除柱间流动',
    '新井建设',
    '修井作业'
  ]
where slug = 'cementirovochnyj-agregat';

-- Product 2: Mobile Pumping Station
update public.products
set
  title_en = 'Mobile Pumping Station',
  title_zh = '移动泵站',
  description_en = 'Mobile high-pressure unit for flushing and hydraulic fracturing',
  description_zh = '用于冲洗和水力压裂的移动高压装置',
  full_description_en = 'Mobile high-pressure pumping station designed for performing a wide range of technological operations in the oil and gas industry. The unit provides high-pressure working fluid delivery for various well treatment operations.',
  full_description_zh = '移动高压泵站专为在石油和天然气行业执行广泛的技术操作而设计。该装置为各种井处理作业提供高压工作液输送。',
  features_en = array['Flow rate 2500 l/min', 'High mobility', 'Modern equipment', 'Quick installation'],
  features_zh = array['流量2500升/分钟', '高度机动性', '现代化设备', '快速安装'],
  advantages_en = array[
    'High performance and efficiency',
    'Quick deployment on site',
    'Modern parameter control system',
    'Low operating costs',
    'Universal application',
    'High equipment mobility'
  ],
  advantages_zh = array[
    '高性能和效率',
    '现场快速部署',
    '现代参数控制系统',
    '低运营成本',
    '通用应用',
    '设备高度机动性'
  ],
  applications_en = array[
    'Hydraulic fracturing (HF)',
    'Well flushing',
    'Acid treatments',
    'Hydro-sandblasting perforation',
    'Near-wellbore zone cleaning'
  ],
  applications_zh = array[
    '水力压裂（HF）',
    '井冲洗',
    '酸处理',
    '水砂射孔',
    '近井带清洁'
  ]
where slug = 'peredvizhnaya-nasosnaya';

-- Product 3: Hydraulic Fracturing Complex
update public.products
set
  title_en = 'Hydraulic Fracturing Complex',
  title_zh = '水力压裂综合设备',
  description_en = 'Modern automated hydraulic fracturing unit',
  description_zh = '现代化自动水力压裂装置',
  full_description_en = 'Hydraulic fracturing (HF) complex represents next-generation high-tech equipment equipped with modern automation and control systems. The complex is designed for conducting oil and gas production intensification operations using the hydraulic fracturing method.',
  full_description_zh = '水力压裂（HF）综合设备代表配备现代自动化和控制系统的新一代高科技设备。该综合设备旨在使用水力压裂方法进行油气生产强化作业。',
  features_en = array['Automated control', 'Parameter monitoring', 'High efficiency', 'Operational safety'],
  features_zh = array['自动化控制', '参数监控', '高效率', '操作安全'],
  advantages_en = array[
    'Fully automated process',
    'High parameter control accuracy',
    'Maximum HF efficiency',
    'Modern safety systems',
    'Environmentally friendly operations',
    'Fast complex mobilization'
  ],
  advantages_zh = array[
    '全自动化过程',
    '高参数控制精度',
    '最大HF效率',
    '现代安全系统',
    '环保作业',
    '快速综合动员'
  ],
  applications_en = array[
    'Multi-stage hydraulic fracturing',
    'HF of horizontal wells',
    'Oil production intensification',
    'Well productivity enhancement',
    'Shale reservoir operations'
  ],
  applications_zh = array[
    '多级水力压裂',
    '水平井HF',
    '石油生产强化',
    '井生产力提升',
    '页岩储层作业'
  ]
where slug = 'kompleks-grp';

-- Product 4: Multifunctional Unit
update public.products
set
  title_en = 'Multifunctional Unit',
  title_zh = '多功能装置',
  description_en = 'Universal equipment for various technological operations',
  description_zh = '用于各种技术操作的通用设备',
  full_description_en = 'Multifunctional unit represents a universal solution for performing a wide range of technological operations in the oil and gas industry. The equipment combines the functionality of several specialized units, significantly improving work efficiency.',
  full_description_zh = '多功能装置代表在石油和天然气行业执行广泛技术操作的通用解决方案。该设备结合了多个专用装置的功能，显著提高了工作效率。',
  features_en = array['Universal application', 'Enhanced mobility', 'Reliable construction', 'Easy maintenance'],
  features_zh = array['通用应用', '增强的机动性', '可靠的结构', '易于维护'],
  advantages_en = array[
    'Versatility and multifunctionality',
    'High mobility and cross-country capability',
    'Reliable construction for harsh conditions',
    'Easy maintenance and operation',
    'Economic efficiency',
    'Quick reconfiguration for various operations'
  ],
  advantages_zh = array[
    '多功能性和多用途',
    '高度机动性和越野能力',
    '适用于恶劣条件的可靠结构',
    '易于维护和操作',
    '经济效率',
    '快速重新配置各种操作'
  ],
  applications_en = array[
    'Well workover operations',
    'Well flushing and development',
    'Equipment pressure testing',
    'Process fluid injection',
    'Auxiliary drilling operations'
  ],
  applications_zh = array[
    '修井作业',
    '井冲洗和开发',
    '设备压力测试',
    '工艺流体注入',
    '辅助钻井作业'
  ]
where slug = 'mnogofunkcionalnaya-ustanovka';

-- Additional catalog products
update public.products
set
  title_en = 'Cementing',
  title_zh = '固井',
  description_en = 'High-performance cementing unit for well completion',
  description_zh = '用于井筒固井的高性能装置',
  full_description_en = 'The CA-320 Cementing Unit is modern high-tech equipment designed for cementing casing strings in oil and gas wells.',
  full_description_zh = 'CA-320固井设备是专为油气井套管柱固井而设计的现代化高科技设备。',
  features_en = array['Pressure up to 70 MPa', 'Automated system', 'Enhanced reliability', '24/7 support'],
  features_zh = array['压力高达70兆帕', '自动化系统', '增强的可靠性', '全天候支持'],
  advantages_en = array['High reliability and equipment performance', 'Automated process control system'],
  advantages_zh = array['高可靠性和设备性能', '自动化过程控制系统'],
  applications_en = array['Cementing casing strings', 'Remedial isolation work'],
  applications_zh = array['套管柱固井', '修复隔离作业']
where slug = 'tsementirovaniye';

update public.products
set
  title_en = 'HF (Hydraulic Fracturing)',
  title_zh = '水力压裂',
  description_en = 'Modern hydraulic fracturing unit',
  description_zh = '现代水力压裂装置',
  full_description_en = 'Hydraulic fracturing (HF) complex represents next-generation high-tech equipment.',
  full_description_zh = '水力压裂（HF）综合设备代表新一代高科技设备。',
  features_en = array['Automated control', 'Parameter monitoring', 'High efficiency', 'Operational safety'],
  features_zh = array['自动化控制', '参数监控', '高效率', '操作安全'],
  advantages_en = array['Fully automated process', 'High parameter control accuracy'],
  advantages_zh = array['全自动化过程', '高参数控制精度'],
  applications_en = array['Multi-stage hydraulic fracturing', 'HF of horizontal wells'],
  applications_zh = array['多级水力压裂', '水平井HF']
where slug = 'grp';

update public.products
set
  title_en = 'High Pressure Pump',
  title_zh = '高压泵',
  description_en = 'Mobile high-pressure unit',
  description_zh = '移动高压装置',
  full_description_en = 'Mobile high-pressure pumping station designed for performing a wide range of technological operations.',
  full_description_zh = '移动高压泵站专为执行广泛的技术操作而设计。',
  features_en = array['Flow rate 2500 l/min', 'High mobility', 'Modern equipment', 'Quick installation'],
  features_zh = array['流量2500升/分钟', '高度机动性', '现代化设备', '快速安装'],
  advantages_en = array['High performance and efficiency', 'Quick deployment on site'],
  advantages_zh = array['高性能和效率', '现场快速部署'],
  applications_en = array['Hydraulic fracturing (HF)', 'Well flushing'],
  applications_zh = array['水力压裂（HF）', '井冲洗']
where slug = 'nasos';
