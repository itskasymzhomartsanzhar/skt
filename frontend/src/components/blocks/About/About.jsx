import './About.scss'

function About({ snippets = {} }) {
  return (
    <section className="about" id="about" aria-label="О нас">
      <div className="about__inner">
        <div className="about__content">
          <p className="about__label">{snippets.about_label || 'О нас'}</p>
          <h2 className="about__title">
            {snippets.about_title || 'Мы строим систему роста. Запуск. Поддержка. Развитие.'}
          </h2>
          <p className="about__description">
            {snippets.about_description ||
              'SKT Agency объединяет стратегию, дизайн, разработку и маркетинг в одну команду. Мы создаем решения, которые дают понятный бизнес-результат: больше заявок, выше конверсия и прозрачная аналитика.'}
          </p>

          <div className="about__metrics">
            <article className="about__metric">
              <p className="about__metric-value">80%</p>
              <p className="about__metric-label">рутинной работы забирает ИИ</p>
            </article>
            <article className="about__metric">
              <p className="about__metric-value">0</p>
              <p className="about__metric-label">потерянных клиентов</p>
            </article>
            <article className="about__metric">
              <p className="about__metric-value">24/7</p>
              <p className="about__metric-label">поддержка и сопровождение</p>
            </article>
          </div>
        </div>

        <div className="about__cards">
          <article className="about__card">
            <p className="about__card-index">01</p>
            <h3 className="about__card-title">Фокус на продажах</h3>
            <p className="about__card-text">
              Каждое решение проектируем так, чтобы сайт помогал продавать и улучшал бренд бизнеса.
            </p>
          </article>

          <article className="about__card">
            <p className="about__card-index">02</p>
            <h3 className="about__card-title">Прозрачная работа</h3>
            <p className="about__card-text">Фиксируем требования, этапы, сроки и результат. У вас будет персональный менеджер, который будет информировать вас на каждом шаге.</p>
          </article>

          <article className="about__card">
            <p className="about__card-index">03</p>
            <h3 className="about__card-title">Под ключ все 100%</h3>
            <p className="about__card-text">
              Берем на себя весь процесс: от исследования до рекламы, аналитики и дальнейшего роста. Мы работаем, вы видите результат.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
