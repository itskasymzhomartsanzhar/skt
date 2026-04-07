import { useEffect, useMemo, useState } from 'react'
import './Cases.scss'

const fallbackCasesData = [
  {
    project: 'Интернет-магазин мебели',
    result: '+41% к заявкам за 2 месяца после запуска',
    review:
      'Команда собрала нам понятную воронку: новый сайт, квизы и заявки в CRM. Мы начали получать больше качественных обращений уже в первый месяц.',
    author: 'Александр',
    role: 'Собственник бизнеса',
    image: 'https://picsum.photos/seed/skt-case-1/1400/900',
  },
  {
    project: 'Юридическая компания',
    result: 'x2.3 рост конверсии посадочной страницы',
    review:
      'Мы наконец получили сайт, который продает. Клиенты приходят с пониманием услуг, а менеджеры перестали тратить время на нецелевые звонки.',
    author: 'Мария',
    role: 'Операционный директор',
    image: 'https://picsum.photos/seed/skt-case-2/1400/900',
  },
  {
    project: 'Клиника эстетической медицины',
    result: '-28% стоимость лида из рекламы',
    review:
      'После редизайна и настройки рекламы лиды стали ощутимо дешевле. Появилась прозрачная аналитика по каналам и реальной окупаемости.',
    author: 'Елена',
    role: 'Маркетолог проекта',
    image: 'https://picsum.photos/seed/skt-case-3/1400/900',
  },
]

function Cases({ casesItems }) {
  const casesData = useMemo(() => {
    if (Array.isArray(casesItems) && casesItems.length > 0) {
      return casesItems
    }
    return fallbackCasesData
  }, [casesItems])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex <= casesData.length - 1) {
      return
    }
    setActiveIndex(0)
  }, [activeIndex, casesData.length])

  useEffect(() => {
    if (casesData.length <= 1) {
      return undefined
    }

    const timerId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === casesData.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const handlePrev = () => {
    if (casesData.length <= 1) {
      return
    }
    setActiveIndex((prevIndex) => (prevIndex === 0 ? casesData.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    if (casesData.length <= 1) {
      return
    }
    setActiveIndex((prevIndex) => (prevIndex === casesData.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <section className="cases" id="cases" aria-label="Кейсы">
      <div className="cases__head">
        <p className="cases__label">Кейсы</p>
        <h2 className="cases__title">Наши проекты и отзывы клиентов</h2>
      </div>

      <div className="cases__slider">
        <div className="cases__viewport">
          <div
            className="cases__track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {casesData.map((item, index) => (
              <article key={`${item.project}-${index}`} className="cases__slide">
                <div className="cases__media">
                  <img
                    className="cases__image"
                    src={item.image || fallbackCasesData[index % fallbackCasesData.length].image}
                    alt={item.project}
                    loading="lazy"
                  />
                </div>

                <div className="cases__content">
                  <p className="cases__project-label">Проект</p>
                  <h3 className="cases__project-title">{item.project}</h3>
                  <p className="cases__result">{item.result}</p>
                  <p className="cases__review">{item.review}</p>

                  <div className="cases__meta">
                    <div className="cases__author-wrap">
                      <p className="cases__author">{item.author}</p>
                      <p className="cases__role">{item.role}</p>
                    </div>

                    <div className="cases__controls">
                      <button className="cases__arrow" type="button" onClick={handlePrev} aria-label="Предыдущий кейс">
                        <span className="cases__arrow-icon cases__arrow-icon--left"></span>
                      </button>
                      <button className="cases__arrow" type="button" onClick={handleNext} aria-label="Следующий кейс">
                        <span className="cases__arrow-icon cases__arrow-icon--right"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="cases__dots" aria-label="Переключение кейсов">
        {casesData.map((item, index) => (
          <button
            key={`${item.project}-${index}`}
            className={`cases__dot${activeIndex === index ? ' cases__dot--active' : ''}`}
            type="button"
            aria-label={`Кейс ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  )
}

export default Cases
