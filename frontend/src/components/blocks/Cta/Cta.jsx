import './Cta.scss'

function Cta({ snippets = {} }) {
  return (
    <section className="cta" id="cta" aria-label="Призыв к действию">
      <div className="cta__inner">
        <div className="cta__content">
          <p className="cta__label">{snippets.cta_label || 'Готовы к росту?'}</p>
          <h2 className="cta__title">
            {snippets.cta_title || 'Получите план запуска и роста под ваш бизнес уже сегодня'}
          </h2>
          <p className="cta__description">
            {snippets.cta_description ||
              'За 30 минут разберем текущую ситуацию, покажем точки роста и дадим понятный пошаговый план без воды.'}
          </p>

          <div className="cta__actions">
            <a className="cta__button cta__button--primary" href="#lead-form">
              Оставить заявку
            </a>
            <a
              className="cta__button cta__button--secondary"
              href="https://wa.me/77472253032?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82."
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать в WhatsApp
            </a>
          </div>

          <ul className="cta__benefits">
            <li className="cta__benefit">Бесплатная консультация и аудит</li>
            <li className="cta__benefit">Ответ в течение 30 минут</li>
            <li className="cta__benefit">Всё под ключ: сайт, трафик, аналитика</li>
          </ul>
        </div>

        <div className="cta__panel">
          <p className="cta__panel-title">Что получите на созвоне</p>
          <ul className="cta__panel-list">
            <li className="cta__panel-item">Анализ текущей воронки и рекламы</li>
            <li className="cta__panel-item">Приоритетные шаги на ближайшие 30 дней</li>
            <li className="cta__panel-item">Прогноз по заявкам и каналам роста</li>
          </ul>

          <div className="cta__panel-badge">
            <p className="cta__panel-badge-value">+27%</p>
            <p className="cta__panel-badge-label">средний рост конверсии после внедрения плана</p>
          </div>

          <div className="cta__panel-badge">
            <p className="cta__panel-badge-value">+130</p>
            <p className="cta__panel-badge-label">средний рост клиентов после внедрения плана</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta
