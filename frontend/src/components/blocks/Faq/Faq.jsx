import { useState } from 'react'
import './Faq.scss'

const defaultFaqItems = [
  {
    question: 'Сколько времени занимает запуск проекта?',
    answer:
      'Обычно первый релиз запускаем за 2-6 недель в зависимости от объема. На старте даем четкий план этапов и сроков.',
  },
  {
    question: 'Вы берете на себя дизайн и разработку вместе?',
    answer:
      'Да, мы закрываем полный цикл: аналитика, структура, дизайн, разработка, подключение интеграций и финальный запуск.',
  },
  {
    question: 'Можно ли доработать текущий сайт, а не делать новый?',
    answer:
      'Можно. Сначала делаем аудит, определяем узкие места и собираем план улучшений с приоритетами по влиянию на продажи.',
  },
  {
    question: 'Как вы помогаете после запуска?',
    answer:
      'Подключаем аналитику, отслеживаем ключевые метрики, предлагаем улучшения и поддерживаем проект по согласованному формату.',
  },
  {
    question: 'Работаете ли вы с рекламой и SEO после разработки?',
    answer:
      'Да, можем вести проект дальше: контекстная реклама, SEO-работы, оптимизация конверсии и автоматизация обработки заявок.',
  },
]

function Faq({ faqItems, snippets = {} }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const resolvedFaqItems = faqItems?.length ? faqItems : defaultFaqItems
  const normalizedActiveIndex = activeIndex >= resolvedFaqItems.length ? 0 : activeIndex

  const toggleItem = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  return (
    <section className="faq" id="faq" aria-label="FAQ">
      <div className="faq__head">
        <p className="faq__label">{snippets.faq_label || 'FAQ'}</p>
        <h2 className="faq__title">{snippets.faq_title || 'Часто задаваемые вопросы'}</h2>
        <p className="faq__subtitle">
          {snippets.faq_subtitle || 'Собрали ключевые вопросы, которые чаще всего задают перед стартом работы.'}
        </p>
      </div>

      <div className="faq__list">
        {resolvedFaqItems.map((item, index) => {
          const isOpen = normalizedActiveIndex === index

          return (
            <article
              key={item.question}
              className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleItem(index)}
              >
                <span className="faq__question-text">{item.question}</span>
                <span className="faq__icon" aria-hidden="true"></span>
              </button>

              <div className="faq__answer-wrap">
                <p className="faq__answer">{item.answer}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Faq
