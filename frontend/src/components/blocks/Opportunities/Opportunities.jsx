import './Opportunities.scss'

const cards = [
  {
    id: '1',
    title: 'Привлечение клиентов',
    items: ['Продающий сайт', 'Реклама (Google / Яндекс / Meta)', 'SEO и маркетинг продвижение'],
  },
  {
    id: '2',
    title: 'Обработка клиентов',
    items: ['AI менеджер', 'Все заявки в одной админ-панели', 'Telegram / WhatsApp / Instagram интеграция', 'Анализ лидов'],
  },
  {
    id: '3',
    title: 'Контроль и рост',
    items: ['Аналитика продаж', 'Дашборды в CRM', 'AI анализ и рекомендации', 'Повторные продажи'],
  },
  {
    id: '4',
    title: 'Постоянная поддержка',
    items: ['Автоматизация процессов','A/B тестирование', 'Техническая поддержка и доработки'],
  },
]

function Opportunities() {
  const leftColumnCards = cards.filter((_, index) => index % 2 === 0)
  const rightColumnCards = cards.filter((_, index) => index % 2 === 1)

  const renderCard = (card) => (
    <article key={card.id} className="opportunities__card">
      <h3 className="opportunities__card-title">
        <span className="opportunities__card-index">{card.id}</span>
        {card.title}
      </h3>

      <ul className="opportunities__list">
        {card.items.map((item, index) => (
          <li key={`${card.id}-${index}-${item}`} className="opportunities__item">
            <span className="opportunities__item-icon" aria-hidden="true"></span>
            <span className="opportunities__item-text">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )

  return (
    <section className="opportunities" aria-label="Возможности">
      <div className="opportunities__head">
        <p className="opportunities__label">Возможности</p>
        <h2 className="opportunities__title">Собираем полную систему роста для вашего бизнеса</h2>
        <p className="opportunities__subtitle">
          От привлечения клиентов до аналитики и поддержки. Это помогает контролировать бизнес и масштабироваться, быстрее и эффективнее.
        </p>
      </div>

      <div className="opportunities__grid">
        <div className="opportunities__column opportunities__column--left">{leftColumnCards.map(renderCard)}</div>
        <div className="opportunities__column opportunities__column--right">{rightColumnCards.map(renderCard)}</div>
      </div>
    </section>
  )
}

export default Opportunities
