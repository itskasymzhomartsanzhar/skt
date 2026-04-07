import './Stats.scss'

const defaultStats = {
  title: 'CТАТИСТИКА НАШЕЙ СИСТЕМЫ',
  know_title: 'ТАКЖЕ МОЖЕТЕ ЗНАТЬ НАС',
  items: [
    { value: '16.5', description: 'Дней в среднем на реализацию проекта' },
    { value: '80%', description: 'Общения с клиентами берёт на себя AI менеджер' },
    { value: '100%', description: 'Заявок зафиксировано в системе' },
    { value: '0', description: 'Потерянных клиентов за всё время' },
  ],
  links: [
    { title: 'SKT Careers', url: '/' },
    { title: 'SKT Design', url: '/' },
    { title: 'SKT Products', url: '/' },
    { title: 'SwiftStore', url: '/' },
  ],
}

function Stats({ statsData }) {
  const resolvedStats = statsData?.items?.length ? statsData : defaultStats

  return (
    <section className="stats" aria-label="Статистика агентства">
      <h1 className="stats__title">{resolvedStats.title}</h1>

      <div className="stats__panel">
        <div className="stats__grid">
          {resolvedStats.items.map((item) => (
            <article className="stats__item" key={`${item.value}-${item.description}`}>
              <p className="stats__value">{item.value}</p>
              <p className="stats__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="stats__know">
        <h2 className="stats__know-title">{resolvedStats.know_title}</h2>

        <div className="stats__know-list">
          {resolvedStats.links.map((link) => (
            <a className="stats__know-item" href={link.url || '/'} key={`${link.title}-${link.url}`}>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
