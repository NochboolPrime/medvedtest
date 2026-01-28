"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Package,
  Home,
  BarChart3,
  Settings,
  Upload,
  Eye,
  MousePointer,
  Target,
  Activity,
  FileText,
  Languages,
  Plus,
  Trash2,
  EyeOff,
  Megaphone,
  ImageIcon,
  Monitor,
} from "lucide-react"

export function AdminInstructions() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Инструкция по использованию</h2>
        <p className="text-muted-foreground">Подробное руководство по работе с админ-панелью</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="content">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Управление контентом сайта
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-base">Общие принципы работы</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Вкладка "Контент сайта" позволяет управлять всеми текстами на сайте через удобный интерфейс. Все
                    изменения применяются мгновенно после сохранения.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Работа с многоязычностью
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Выберите раздел сайта из выпадающего списка (Hero, About, Services и т.д.)</li>
                    <li>Переключайтесь между языками через вкладки: RU (Русский), EN (English), ZH (中文)</li>
                    <li>Редактируйте тексты для каждого языка отдельно</li>
                    <li>Изменения в одном языке не влияют на другие языки</li>
                    <li>Нажмите "Сохранить изменения" после редактирования</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-500" />
                    Добавление новых элементов
                  </h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4 py-2 bg-[rgba(26,31,46,1)]">
                      <h5 className="font-medium text-sm mb-2">Услуги (Services)</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Нажмите кнопку "Добавить услугу" в разделе Services</li>
                        <li>Автоматически создается шаблон с полями Title и Description</li>
                        <li>Заполните информацию на всех трех языках</li>
                        <li>Новая услуга появится в конце списка на главной странице</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 py-2 bg-[rgba(26,31,46,1)]">
                      <h5 className="font-medium text-sm mb-2">Принципы (Principles)</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Нажмите кнопку "Добавить принцип" в разделе Principles</li>
                        <li>Создается карточка с заголовком и описанием</li>
                        <li>Заполните контент для всех языков</li>
                        <li>Принцип отобразится в секции "Наши ценности"</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-2 bg-[rgba(26,31,46,1)]">
                      <h5 className="font-medium text-sm mb-2">Стратегии (Strategy)</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Нажмите кнопку "Добавить стратегию" в разделе Strategy</li>
                        <li>Добавьте название и описание стратегии</li>
                        <li>Обязательно заполните все языковые версии</li>
                        <li>Стратегия появится в разделе "О компании"</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <EyeOff className="h-5 w-5 text-orange-500" />
                    Управление видимостью
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Каждый элемент имеет переключатель "Visible" (видимость)</li>
                    <li>Отключите переключатель, чтобы скрыть элемент на сайте</li>
                    <li>Скрытые элементы остаются в базе данных и могут быть включены позже</li>
                    <li>Используйте это для временного скрытия контента без удаления</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-red-500" />
                    Удаление элементов
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Удалить можно только дополнительные элементы (созданные после исходных):
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>Для услуг: можно удалить элементы начиная с 5-го (service5, service6 и т.д.)</li>
                      <li>Для принципов: можно удалить элементы начиная с 5-го (principle5, principle6 и т.д.)</li>
                      <li>Для стратегий: можно удалить элементы начиная с 5-го</li>
                      <li>Исходные 4 элемента защищены от удаления</li>
                    </ul>
                    <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20 mt-2">
                      <p className="text-sm text-destructive font-medium">
                        <strong>Внимание:</strong> Удаление элемента необратимо! Убедитесь, что элемент действительно не
                        нужен.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Редактируемые разделы</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Hero</h5>
                      <p className="text-xs text-muted-foreground">Главный баннер: заголовок, описание, кнопки</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">About</h5>
                      <p className="text-xs text-muted-foreground">Миссия компании, о нас, история</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Services</h5>
                      <p className="text-xs text-muted-foreground">Специализация по направлениям (динамическое добавление)</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Principles</h5>
                      <p className="text-xs text-muted-foreground">Принципы бизнеса / Ценности компании</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Strategy</h5>
                      <p className="text-xs text-muted-foreground">Стратегия развития компании</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Contact</h5>
                      <p className="text-xs text-muted-foreground">Контактная информация, форма связи</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Footer</h5>
                      <p className="text-xs text-muted-foreground">Подвал сайта, ссылки, копирайт</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-1">Products</h5>
                      <p className="text-xs text-muted-foreground">Заголовки секций продуктов</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>💡 Лучшие практики:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-4">
                    <li>Всегда заполняйте контент на всех трех языках для консистентности</li>
                    <li>Используйте краткие и понятные заголовки</li>
                    <li>Проверяйте отображение после сохранения изменений</li>
                    <li>Для временного отключения используйте "скрыть" вместо "удалить"</li>
                    <li>Регулярно обновляйте контент для актуальности информации</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="announcements">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Управление анонсами
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-base">Что такое анонсы</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Анонс - это всплывающее уведомление, которое появляется справа на главной странице сайта.
                    Используется для важных объявлений, новостей или акций.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-500" />
                    Создание нового анонса
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Нажмите кнопку "Добавить анонс" на вкладке "Анонсы"</li>
                    <li>Заполните заголовок и содержание на всех трех языках (RU, EN, ZH)</li>
                    <li>При необходимости загрузите изображение (нажмите "Загрузить изображение")</li>
                    <li>
                      Настройте время показа:
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>
                          <strong>Задержка показа</strong> - через сколько миллисекунд после загрузки страницы появится
                          анонс (например, 2000 = 2 секунды)
                        </li>
                        <li>
                          <strong>Авто-скрытие</strong> - через сколько миллисекунд анонс исчезнет автоматически (0 = не
                          скрывать)
                        </li>
                      </ul>
                    </li>
                    <li>Установите переключатель "Активен" для включения анонса</li>
                    <li>Нажмите "Создать анонс"</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                    Работа с изображениями в анонсе
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Изображение отображается в верхней части анонса над текстом</li>
                    <li>Пользователи могут кликнуть на изображение для просмотра в полноэкранном режиме</li>
                    <li>Рекомендуемый размер: 800x400 пикселей</li>
                    <li>Поддерживаемые форматы: JPG, PNG, WEBP</li>
                    <li>Максимальный размер файла: 5 МБ</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Важные правила</h4>
                  <div className="space-y-2">
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                        <strong>⚠️ Только один активный анонс:</strong> Одновременно может быть активен только один
                        анонс. При активации нового анонса, предыдущий автоматически деактивируется.
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>💡 Анонс показывается только на главной странице:</strong> Посетители увидят анонс
                        только при посещении главной страницы сайта.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>Рекомендации по настройке времени:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-4">
                    <li>
                      <strong>Задержка показа 2000-3000 мс</strong> - даст пользователю время осмотреться на странице
                    </li>
                    <li>
                      <strong>Авто-скрытие 10000-15000 мс</strong> - достаточно времени для прочтения
                    </li>
                    <li>
                      <strong>Авто-скрытие 0</strong> - для важных объявлений, которые пользователь должен закрыть
                      вручную
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="carousel">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Карусель "Производство"
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-base">О карусели производства</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Карусель отображается на главной странице в разделе "Производство" и показывает фотографии
                    производственных объектов компании с автоматической прокруткой.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-500" />
                    Добавление нового слайда
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Нажмите кнопку "Добавить слайд" на вкладке "Карусель производства"</li>
                    <li>Загрузите изображение производственного объекта</li>
                    <li>Добавьте подпись к изображению на всех трех языках</li>
                    <li>Порядок отображения устанавливается автоматически (в конец списка)</li>
                    <li>Нажмите "Сохранить"</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Управление порядком слайдов</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      Каждый слайд имеет стрелки <strong>↑</strong> и <strong>↓</strong> для перемещения
                    </li>
                    <li>
                      Нажмите <strong>↑</strong> чтобы переместить слайд выше в списке
                    </li>
                    <li>
                      Нажмите <strong>↓</strong> чтобы переместить слайд ниже
                    </li>
                    <li>Порядок в админ-панели = порядок показа на сайте</li>
                    <li>Изменения применяются мгновенно</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Настройка автопрокрутки</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Вы можете настроить скорость автоматической смены слайдов:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>В поле "Интервал авто-прокрутки" укажите время в миллисекундах</li>
                    <li>
                      <strong>3000 мс = 3 секунды</strong> - рекомендуемое значение
                    </li>
                    <li>
                      <strong>5000 мс = 5 секунд</strong> - для более медленной прокрутки
                    </li>
                    <li>
                      <strong>2000 мс = 2 секунды</strong> - для быстрой прокрутки
                    </li>
                    <li>Настройка применяется ко всей карусели сразу</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Управление видимостью
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Каждый слайд имеет переключатель "Visible" (видимый)</li>
                    <li>Отключите переключатель чтобы временно скрыть слайд</li>
                    <li>Скрытые слайды не отображаются на сайте, но остаются в базе данных</li>
                    <li>Можно включить обратно в любой момент</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>Рекомендации по изображениям:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-4">
                    <li>Используйте качественные фотографии производства в высоком разрешении</li>
                    <li>Рекомендуемый размер: 1920x1080 пикселей (соотношение 16:9)</li>
                    <li>Оптимальное количество слайдов: 4-8 штук</li>
                    <li>Подписи должны быть краткими и информативными</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hero-banner">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Главный баннер
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-base">О главном баннере</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Главный баннер - это большое фоновое изображение в самом верху главной страницы сайта. Это первое,
                    что видят посетители при заходе на сайт.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-500" />
                    Замена изображения баннера
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Перейдите на вкладку "Главный баннер"</li>
                    <li>Увидите текущее изображение баннера с предпросмотром</li>
                    <li>Нажмите кнопку "Загрузить изображение" для выбора нового файла</li>
                    <li>Или вставьте прямую ссылку на изображение в поле "URL изображения"</li>
                    <li>Нажмите "Сохранить изменения"</li>
                    <li>Изображение обновится на сайте мгновенно</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Требования к изображению</h4>
                  <div className="space-y-2">
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                        <strong>📐 Размер и формат:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-blue-700 dark:text-blue-300 ml-4">
                        <li>Минимальный размер: 1920x1080 пикселей (Full HD)</li>
                        <li>Рекомендуемый размер: 2560x1440 пикселей (2K) для высокого качества</li>
                        <li>Соотношение сторон: 16:9 (горизонтальная ориентация)</li>
                        <li>Формат: JPG, PNG или WEBP</li>
                        <li>Максимальный размер файла: 5 МБ</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                        <strong>⚠️ Важно учесть:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-yellow-700 dark:text-yellow-300 ml-4">
                        <li>Центральная часть изображения должна быть хорошо видна (там находится текст)</li>
                        <li>Избегайте слишком ярких или контрастных изображений - текст должен читаться</li>
                        <li>Изображение должно соответствовать тематике компании (производство, промышленность)</li>
                        <li>Убедитесь что изображение выглядит хорошо и на мобильных устройствах</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>💡 Советы по выбору изображения:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-4">
                    <li>Используйте профессиональные фотографии вашего производства</li>
                    <li>Изображение должно создавать положительное первое впечатление</li>
                    <li>Избегайте изображений с большим количеством мелких деталей</li>
                    <li>Лучше выбирать изображения с естественным освещением</li>
                    <li>Тестируйте как изображение выглядит на разных устройствах</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>✅ Результат:</strong> После сохранения новое изображение станет фоном для главного экрана
                    сайта. Текст и кнопки останутся на своих местах поверх изображения.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="products">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Управление товарами
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Добавление нового товара</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Нажмите кнопку "Добавить товар" на вкладке "Товары"</li>
                    <li>Заполните обязательные поля: название, slug (URL), категория</li>
                    <li>Загрузите изображение товара или вставьте URL</li>
                    <li>Добавьте краткое и полное описание</li>
                    <li>Укажите цену товара</li>
                    <li>Добавьте ключевые особенности (по одной на строке)</li>
                    <li>Заполните преимущества и области применения</li>
                    <li>Нажмите "Сохранить"</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Редактирование товара</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Найдите товар в списке и нажмите кнопку с иконкой карандаша</li>
                    <li>Отредактируйте необходимые поля</li>
                    <li>Нажмите "Сохранить" для применения изменений</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Удаление товара</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Нажмите кнопку с иконкой корзины рядом с товаром</li>
                    <li>Подтвердите удаление в диалоговом окне</li>
                    <li className="text-destructive font-medium">Внимание: Удаление необратимо!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="homepage">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Отображение на главной странице
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Управление разделом "Наша Продукция"</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    На главной странице отображается ровно 4 большие карточки товаров с характеристиками.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Найдите товар, который хотите показать на главной странице</li>
                    <li>Включите переключатель "Показывать на главной странице"</li>
                    <li>Можно выбрать любое количество товаров без ограничений</li>
                    <li>Изменения применяются мгновенно</li>
                  </ol>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Совет:</strong> Выбирайте самые популярные и востребованные товары для отображения на
                    главной странице
                  </p>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="images">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Загрузка изображений
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Два способа добавления изображений</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-1">1. Загрузка с устройства (рекомендуется)</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Нажмите на поле выбора файла</li>
                        <li>Выберите изображение с вашего компьютера</li>
                        <li>Файл автоматически загрузится в облако</li>
                        <li>URL изображения будет сохранен автоматически</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">2. Вставка URL</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Вставьте прямую ссылку на изображение в поле URL</li>
                        <li>Изображение отобразится в превью</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Рекомендации:</strong> Используйте изображения высокого качества в формате JPG или PNG.
                    Оптимальный размер: 1200x800 пикселей.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="statistics">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Работа со статистикой
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-base">Основные метрики и их значение</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2 dark:bg-blue-950/20 bg-[rgba(26,31,46,1)]">
                      <div className="flex items-start gap-3">
                        <Eye className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Просмотры карточек (Card Views)</h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            Количество раз, когда карточка товара была показана пользователю на главной странице или в
                            каталоге.
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            Пример: Если пользователь открыл каталог и увидел 10 товаров, каждому товару засчитывается
                            +1 просмотр.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4 py-2 dark:bg-green-950/20 bg-[rgba(26,31,46,1)]">
                      <div className="flex items-start gap-3">
                        <MousePointer className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Клики по кнопке "Подробнее" (Clicks)</h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            Количество переходов на детальную страницу товара. Засчитывается только при нажатии на
                            кнопку "Подробнее".
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            Пример: Пользователь увидел товар в каталоге и нажал "Подробнее" - засчитывается +1 клик.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4 py-2 dark:bg-orange-950/20 bg-[rgba(26,31,46,1)]">
                      <div className="flex items-start gap-3">
                        <Package className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Детальные просмотры (Detail Views)</h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            Количество полных просмотров страницы товара с описанием, характеристиками и всей
                            информацией.
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            Пример: Пользователь открыл страницу конкретного товара - засчитывается +1 детальный
                            просмотр.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-2 dark:bg-purple-950/20 bg-[rgba(26,31,46,1)]">
                      <div className="flex items-start gap-3">
                        <Target className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Конверсия (Conversion Rate)</h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            Процент пользователей, которые перешли к детальному просмотру после того, как увидели
                            карточку товара. Рассчитывается по формуле: (Детальные просмотры / Просмотры карточек) ×
                            100%
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-muted-foreground">
                              <strong>Высокая конверсия (более 15%):</strong> Товар очень интересен пользователям,
                              привлекательная карточка
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Средняя конверсия (5-15%):</strong> Нормальный показатель, товар вызывает интерес
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Низкая конверсия (менее 5%):</strong> Возможно, нужно улучшить изображение или
                              описание
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground italic mt-2">
                            Пример: Товар показали 100 раз, кликнули 20 раз. Конверсия = (20/100) × 100% = 20% (отличный
                            показатель!)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-indigo-500 pl-4 py-2 dark:bg-indigo-950/20 bg-[rgba(26,31,46,1)]">
                      <div className="flex items-start gap-3">
                        <Activity className="h-6 w-6 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-sm mb-1">CTR - Click Through Rate (Кликабельность)</h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            Процент пользователей, которые нажали на кнопку "Подробнее" после просмотра карточки.
                            Рассчитывается: (Клики / Просмотры) × 100%
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-muted-foreground">
                              <strong>Отличный CTR (более 10%):</strong> Карточка очень привлекательна
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Хороший CTR (5-10%):</strong> Средний уровень заинтересованности
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Требует улучшения (менее 5%):</strong> Стоит пересмотреть дизайн карточки
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Как анализировать статистику</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Выберите период анализа: 7, 30 или 90 дней</li>
                    <li>Изучите график активности по дням - видны ли пики и спады</li>
                    <li>Определите топ-10 самых популярных товаров</li>
                    <li>Сравните конверсию разных товаров</li>
                    <li>
                      Обратите внимание на товары с низкой конверсией - возможно, нужно улучшить описание или фото
                    </li>
                    <li>Товары с высокой конверсией размещайте на главной странице</li>
                  </ol>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>Практический совет:</strong> Если товар имеет много просмотров, но мало кликов:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-4">
                    <li>Проверьте качество изображения товара</li>
                    <li>Убедитесь, что краткое описание понятно и привлекательно</li>
                    <li>Добавьте более яркие ключевые особенности</li>
                    <li>Проверьте, правильно ли указана цена</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>💡 Лучшая практика:</strong> Регулярно проверяйте статистику (раз в неделю) и оптимизируйте
                    товары с низкими показателями. Товары с конверсией выше 15% - ваши лидеры продаж!
                  </p>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Безопасность и настройки
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Установка пароля</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Перейдите на вкладку "Настройки"</li>
                    <li>Введите новый пароль в поле "Новый пароль"</li>
                    <li>Нажмите "Установить пароль"</li>
                    <li>После установки пароль будет требоваться при каждом входе</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Рекомендации по безопасности</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Используйте сложный пароль (минимум 8 символов)</li>
                    <li>Включите цифры и специальные символы</li>
                    <li>Не используйте одинаковые пароли для разных сервисов</li>
                    <li>Регулярно меняйте пароль (раз в 3-6 месяцев)</li>
                    <li>Не передавайте пароль третьим лицам</li>
                  </ul>
                </div>

                <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">
                    <strong>Важно:</strong> Первый вход возможен без пароля. Обязательно установите пароль сразу после
                    первого входа!
                  </p>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="bg-accent/5 border-accent">
        <CardHeader>
          <CardTitle className="text-lg">Нужна помощь?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Если у вас возникли вопросы или проблемы с использованием админ-панели:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Внимательно прочитайте соответствующий раздел инструкции</li>
            <li>Проверьте корректность заполнения всех обязательных полей</li>
            <li>Убедитесь, что изображения загружаются правильно</li>
            <li>При технических проблемах обратитесь к администратору системы</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
