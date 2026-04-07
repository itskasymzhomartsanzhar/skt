import './Services.scss'

const services = [
  {
    id: '01',
    title: 'Веб-сайты и лендинги',
    text: 'Проектируем и разрабатываем продающие страницы под конкретный оффер, чтобы быстро запускать заявки.',
    meta: 'Фокус на конверсии',
    image: 'https://m.seonews.ru/upload/medialibrary/706/70690377ce7539e239bbb53ea6f9c98c.png',
  },
  {
    id: '02',
    title: 'UX/UI дизайн',
    text: 'Создаём визуал и структуру, которые усиливают доверие и подводят пользователя к целевому действию.',
    meta: 'Продающий интерфейс',
    image: 'https://www.escc.ru/assets/static/img/pages/blog/chto-takoe-veb-dizayn.jpg',
  },
  {
    id: '03',
    title: 'Контекстная реклама',
    text: 'Запускаем и масштабируем рекламные кампании в Google, Яндекс, Meta (Instagram) с контролем стоимости лида.',
    meta: 'Быстрый трафик',
    image: 'https://sf.ru/upload/iblock/dcf/kontekstnaya_reklama2.png',

  },
  {
    id: '04',
    title: 'SEO продвижение',
    text: 'Укрепляем позиции в поиске за счёт технической базы и контента. Помогает получить дополнительный трафик',
    meta: 'Долгосрочный рост',
    image: 'https://refinery89.com/wp-content/uploads/2023/11/SEO.png',
  },
  {
    id: '05',
    title: 'CRM и автоматизация',
    text: 'Интегрируем формы, мессенджеры, метрики и CRM, чтобы заявки обрабатывались быстро и эффективно.',
    meta: 'Контроль воронки',
    image: 'https://i.1.creatium.io/disk2/63/32/bd/136babe6593119de383a75de53cf86905a/019b84e222b80840f8dd7179c574e97c.png',
  },
    {
    id: '06',
    title: 'ИИ менеджер',
    text: 'Используем ИИ для обработки заявок, ответов на вопросы и рекомендаций. Быстрее. Легче. Эффективнее.',
    meta: 'Контроль воронки',
    image: 'https://media.licdn.com/dms/image/v2/D5612AQFQ4xrET_lUdw/article-cover_image-shrink_720_1280/B56ZjksMK_HIAI-/0/1756183457449?e=2147483647&v=beta&t=aaxvx8kq_EVHi9bjMu62dmVn1GgJ-tDpmY67dHQ36_g',
  },
  {
    id: '07',
    title: 'Поддержка и развитие',
    text: 'После релиза продолжаем улучшать продукт по аналитике, рекомендациями ИИ и обратной связи от клиентов.',
    meta: 'Стабильный результат',
    image: 'https://static.tildacdn.com/tild3432-3337-4535-b263-356262323661/4x3_IT_product_suppo.png',
  },
]

function Services() {
  const loopedServices = [...services, ...services]

  return (
    <section className="services" id="services" aria-label="Услуги">
      <div className="services__head">
        <p className="services__label">Услуги</p>
        <h2 className="services__title">Большие решения для больших результатов</h2>
        <p className="services__subtitle">
          От сайта до рекламы и поддержки. Все, что нужно для роста бизнеса, бренда и возможностей.
        </p>
      </div>

      <div className="services__marquee">
        <div className="services__track">
          {loopedServices.map((service, index) => (
            <article
              key={`${service.id}-${index}`}
              className={`services__card${service.image ? ' services__card--photo' : ''}`}
            >
              {service.image && (
                <div className="services__card-media">
                  <img className="services__card-image" src={service.image} alt="" loading="lazy" />
                </div>
              )}

              <div className="services__card-content">
                <p className="services__card-number">{service.id}</p>
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-text">{service.text}</p>
                <p className="services__card-meta">{service.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
