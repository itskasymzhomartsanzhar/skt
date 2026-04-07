import { useEffect, useRef, useState } from 'react'
import './SolutionSteps.scss'

const steps = [
  {
    icon: 'search',
    floatingIcons: ['users', 'target', 'doc'],
    phase: 'Этап 1',
    term: '1-2 дня',
    title: 'Обсуждение и анализ',
    description:
      'Фиксируем цели проекта, изучаем нишу и формируем реалистичный план запуска с понятными KPI.',
    deliverables: [
      { icon: 'doc', label: 'Бриф и цели проекта' },
      { icon: 'users', label: 'Анализ аудитории и конкурентов' },
      { icon: 'target', label: 'План работ с приоритетами' },
    ],
    result: 'Четкое понимание задач, сроков и ожидаемого результата.',
    cta: { primary: 'Получить аудит', secondary: 'Обсудить проект' },
  },
  {
    icon: 'spark',
    floatingIcons: ['palette', 'analytics', 'message'],
    phase: 'Этап 2',
    term: '3-6 дней',
    title: 'Дизайн и маркетинг',
    description:
      'Собираем визуальный стиль и маркетинговые смыслы, чтобы сайт одновременно выглядел сильно и продавал.',
    deliverables: [
      { icon: 'palette', label: 'Дизайн-концепция и UI' },
      { icon: 'text', label: 'Продающие тексты и офферы' },
      { icon: 'analytics', label: 'Маркетинговая структура воронки' },
    ],
    result: 'Сильный визуал и маркетинговая логика, готовые к разработке.',
    cta: { primary: 'Запросить концепт', secondary: 'Посмотреть примеры' },
  },
  {
    icon: 'code',
    floatingIcons: ['code', 'nodes', 'shield'],
    phase: 'Этап 3',
    term: '5-10 дней',
    title: 'Разработка и интерграция',
    description:
      'Реализуем сайт на продакшн-уровне, подключаем нужные сервисы и проверяем стабильную работу на всех устройствах.',
    deliverables: [
      { icon: 'code', label: 'Front-end и back-end разработка' },
      { icon: 'nodes', label: 'Интеграции форм, CRM и аналитики' },
      { icon: 'shield', label: 'Тестирование и контроль качества' },
    ],
    result: 'Готовый продукт, который можно безопасно выводить в рекламу.',
  },
  {
    icon: 'nodes',
    floatingIcons: ['message', 'refresh', 'flow'],
    phase: 'Этап 4',
    term: '2-5 дней',
    title: 'Подключаем ботов и делаем автоматизацию',
    description:
      'Автоматизируем обработку заявок и коммуникацию с клиентами через ботов, сценарии и CRM-воронку.',
    deliverables: [
      { icon: 'message', label: 'Боты в Telegram / WhatsApp / Instagram' },
      { icon: 'flow', label: 'Автоворонки и маршруты заявок' },
      { icon: 'refresh', label: 'Автоматические уведомления и статусы' },
    ],
    result: 'Меньше ручной рутины и быстрее обработка каждого лида.',
    cta: { primary: 'Подключить автоматизацию' },
  },
  {
    icon: 'rocket',
    floatingIcons: ['rocket', 'analytics', 'refresh'],
    phase: 'Этап 5',
    term: 'Постоянно',
    title: 'Запускаем и оптимизируем',
    description:
      'Запускаем проект, снимаем метрики и регулярно улучшаем конверсию на основе данных.',
    deliverables: [
      { icon: 'analytics', label: 'Контроль показателей и отчетность' },
      { icon: 'ab', label: 'A/B гипотезы и улучшения' },
      { icon: 'doc', label: 'План масштабирования' },
    ],
    result: 'Стабильный рост заявок и управляемая воронка продаж.',
    cta: { primary: 'Запустить проект', secondary: 'Получить консультацию' },
  },
]

function SolutionStepsIcon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {name === 'search' && (
        <>
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.9" />
          <path d="M16.2 16.2L20 20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </>
      )}
      {name === 'layout' && (
        <>
          <rect x="3.5" y="4" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
          <path d="M3.5 10.5H20.5M10 4V20" stroke="currentColor" strokeWidth="1.9" />
        </>
      )}
      {name === 'spark' && (
        <>
          <path d="M12 3.8L14.2 9.8L20.2 12L14.2 14.2L12 20.2L9.8 14.2L3.8 12L9.8 9.8L12 3.8Z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="1.7" fill="currentColor" />
        </>
      )}
      {name === 'code' && (
        <>
          <path d="M8.2 7.2L4 12L8.2 16.8M15.8 7.2L20 12L15.8 16.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 5.2L10.5 18.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </>
      )}
      {name === 'nodes' && (
        <>
          <circle cx="6" cy="6" r="2.2" fill="currentColor" />
          <circle cx="18" cy="6" r="2.2" fill="currentColor" />
          <circle cx="12" cy="18" r="2.2" fill="currentColor" />
          <path d="M7.8 7.3L10.5 15.3M16.2 7.3L13.5 15.3M8.2 6H15.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'rocket' && (
        <>
          <path d="M7 16.5C8.2 12.5 12.5 8.2 16.6 7.1L17.9 6.8L17.6 8.1C16.5 12.2 12.2 16.5 8.2 17.7L6.9 18L7.2 16.7Z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="14.2" cy="9.8" r="1.4" fill="currentColor" />
          <path d="M6.5 17.5L4.5 19.5M9.2 18.2L8.2 20.4M5.8 14.8L3.6 15.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'doc' && (
        <>
          <path d="M7 3.8H14.5L19 8.2V20.2H7V3.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M14.5 3.8V8.2H19M9.4 12.2H16.4M9.4 15.4H14.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'users' && (
        <>
          <circle cx="8.3" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="15.9" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.8 18.2C4.3 15.7 6.1 14.4 8.3 14.4C10.5 14.4 12.3 15.7 12.8 18.2M13.4 17.7C13.9 16.1 15.1 15.2 16.7 15.2C18.2 15.2 19.4 16 19.9 17.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'target' && (
        <>
          <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="1.7" fill="currentColor" />
        </>
      )}
      {name === 'cursor' && (
        <>
          <path d="M6 4.2L18.4 11.8L12.2 12.8L11.2 19L6 4.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </>
      )}
      {name === 'flow' && (
        <>
          <rect x="3.8" y="4.2" width="6" height="4.6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14.2" y="4.2" width="6" height="4.6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
          <rect x="9" y="15.2" width="6" height="4.6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6.8 8.8V11.8H12M17.2 8.8V11.8H12M12 11.8V15.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'palette' && (
        <>
          <path d="M12 4.2C7.2 4.2 3.4 7.7 3.4 12.1C3.4 16.1 6.5 19.3 10.4 19.3H11.4C12.5 19.3 13.2 18.4 13.2 17.4C13.2 16.8 13.6 16.3 14.2 16.3H15.8C18.9 16.3 20.6 14.4 20.6 11.7C20.6 7.5 17 4.2 12 4.2Z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="7.2" cy="11" r="1.1" fill="currentColor" />
          <circle cx="10.2" cy="8.2" r="1.1" fill="currentColor" />
          <circle cx="14.2" cy="8.5" r="1.1" fill="currentColor" />
        </>
      )}
      {name === 'device' && (
        <>
          <rect x="4.2" y="5" width="15.6" height="10.8" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 19H14M12 15.8V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'text' && (
        <>
          <path d="M5 6.2H19M9.2 6.2V18M14.8 6.2V18M6.6 18H17.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'speed' && (
        <>
          <path d="M4.5 15.8C4.5 11.7 7.8 8.4 12 8.4C16.2 8.4 19.5 11.7 19.5 15.8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 12L15.8 10.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="15.8" r="1.6" fill="currentColor" />
        </>
      )}
      {name === 'shield' && (
        <>
          <path d="M12 3.8L18.2 6.2V11.6C18.2 15.8 15.5 18.6 12 20.2C8.5 18.6 5.8 15.8 5.8 11.6V6.2L12 3.8Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.8 12.2L11 14.4L15.2 10.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'analytics' && (
        <>
          <path d="M5.2 19V11.8M10.2 19V8.2M15.2 19V13.6M20.2 19V6M3.8 19H20.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'message' && (
        <>
          <path d="M4.2 6.2H19.8V15.8H10.2L6.2 19V15.8H4.2V6.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8 10H16M8 12.8H14.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {name === 'ab' && (
        <>
          <path d="M5.2 18L8.2 6L11.2 18M6.2 14.2H10.2M14 18V6H18.5C20 6 20.8 6.8 20.8 8C20.8 9.1 20 9.9 18.8 10.1C20.2 10.3 21 11.2 21 12.5C21 14 20 15 18.2 15H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'refresh' && (
        <>
          <path d="M18.8 10.4C18 7.4 15.3 5.2 12 5.2C8 5.2 4.8 8.4 4.8 12.4C4.8 16.4 8 19.6 12 19.6C14.8 19.6 17.2 18 18.4 15.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M19 7.8V10.8H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'check' && (
        <path d="M5 12.3L9.1 16.2L19 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function SolutionSteps() {
  const sectionRef = useRef(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchDeltaRef = useRef({ x: 0, y: 0 })
  const isHorizontalSwipeRef = useRef(false)
  const hintTimeoutRef = useRef(null)
  const hasShownHintInViewRef = useRef(false)
  const [activeStep, setActiveStep] = useState(0)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(false)

  const dismissSwipeHint = () => {
    if (hintTimeoutRef.current) {
      window.clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }
    setShowSwipeHint(false)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')

    const handleMediaChange = () => {
      setIsMobileLayout(mediaQuery.matches)
    }

    handleMediaChange()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    let frameId = 0

    const updateStep = () => {
      if (isMobileLayout) {
        return
      }

      const rect = section.getBoundingClientRect()
      const scrollTop = window.scrollY || window.pageYOffset
      const sectionTop = scrollTop + rect.top
      const trackLength = section.offsetHeight - window.innerHeight

      if (trackLength <= 0) {
        setActiveStep(0)
        return
      }

      const progress = (scrollTop - sectionTop) / trackLength
      const clampedProgress = Math.min(1, Math.max(0, progress))
      const nextStep = Math.round(clampedProgress * (steps.length - 1))

      setActiveStep((prevStep) => (prevStep === nextStep ? prevStep : nextStep))
    }

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateStep)
    }

    updateStep()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isMobileLayout])

  useEffect(() => {
    if (!isMobileLayout) {
      return undefined
    }

    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry) {
          return
        }

        if (!entry.isIntersecting) {
          hasShownHintInViewRef.current = false
          if (hintTimeoutRef.current) {
            window.clearTimeout(hintTimeoutRef.current)
            hintTimeoutRef.current = null
          }
          setShowSwipeHint(false)
          return
        }

        if (hasShownHintInViewRef.current) {
          return
        }

        const reachedBlockZone = entry.boundingClientRect.top <= window.innerHeight * 0.72

        if (!reachedBlockZone) {
          return
        }

        hasShownHintInViewRef.current = true
        setShowSwipeHint(true)

        if (hintTimeoutRef.current) {
          window.clearTimeout(hintTimeoutRef.current)
        }

        hintTimeoutRef.current = window.setTimeout(() => {
          setShowSwipeHint(false)
          hintTimeoutRef.current = null
        }, 1600)
      },
      { threshold: [0, 0.2, 0.35, 0.5] }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      if (hintTimeoutRef.current) {
        window.clearTimeout(hintTimeoutRef.current)
        hintTimeoutRef.current = null
      }
    }
  }, [isMobileLayout])

  const currentStep = steps[activeStep]
  const progress = `${((activeStep + 1) / steps.length) * 100}%`
  const cardVariant = `solution-steps__card--v${(activeStep % 3) + 1}`
  const shouldShowSwipeHint = isMobileLayout && showSwipeHint

  const handleCardTouchStart = (event) => {
    if (!isMobileLayout) {
      return
    }

    dismissSwipeHint()

    const touch = event.touches[0]

    if (!touch) {
      return
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    touchDeltaRef.current = { x: 0, y: 0 }
    isHorizontalSwipeRef.current = false
  }

  const handleCardTouchMove = (event) => {
    if (!isMobileLayout) {
      return
    }

    const touch = event.touches[0]

    if (!touch) {
      return
    }

    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    touchDeltaRef.current = { x: deltaX, y: deltaY }

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 12) {
      isHorizontalSwipeRef.current = true
      dismissSwipeHint()
    }
  }

  const handleCardTouchEnd = () => {
    if (!isMobileLayout) {
      return
    }

    if (!isHorizontalSwipeRef.current) {
      return
    }

    const swipeX = touchDeltaRef.current.x

    if (Math.abs(swipeX) < 52) {
      return
    }

    if (swipeX < 0) {
      setActiveStep((prevStep) => Math.min(steps.length - 1, prevStep + 1))
      return
    }

    setActiveStep((prevStep) => Math.max(0, prevStep - 1))
  }

  return (
    <section
      ref={sectionRef}
      className="solution-steps"
      id="solution-steps"
      style={{ '--steps-count': steps.length }}
      aria-label="Этапы работы"
    >
      <div className="solution-steps__sticky">
        <div className="solution-steps__inner">
          <div className="solution-steps__rail">
            <ol className="solution-steps__points" aria-label="Шаги">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className={[
                    'solution-steps__point',
                    index < activeStep ? 'solution-steps__point--passed' : '',
                    index === activeStep ? 'solution-steps__point--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="button"
                  tabIndex={0}
                  aria-label={`Показать шаг ${index + 1}`}
                  onClick={() => {
                    dismissSwipeHint()
                    setActiveStep(index)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      dismissSwipeHint()
                      setActiveStep(index)
                    }
                  }}
                >
                  <span className="solution-steps__point-number">{index + 1}</span>
                </li>
              ))}
            </ol>
          </div>

          <article
            key={currentStep.title}
            className={['solution-steps__card', cardVariant].join(' ')}
            onTouchStart={handleCardTouchStart}
            onTouchMove={handleCardTouchMove}
            onTouchEnd={handleCardTouchEnd}
          >
            <div className="solution-steps__float-icons" aria-hidden="true">
              {currentStep.floatingIcons.map((icon, index) => (
                <span key={`${icon}-${index}`} className={`solution-steps__float-icon solution-steps__float-icon--${index + 1}`}>
                  <SolutionStepsIcon name={icon} className="solution-steps__float-icon-svg" />
                </span>
              ))}
            </div>

            <div className="solution-steps__meta">
              <p className="solution-steps__step-label">
                Шаг {activeStep + 1} из {steps.length}
              </p>
              <div className="solution-steps__chips">
                <span className="solution-steps__chip">{currentStep.phase}</span>
                <span className="solution-steps__chip">Срок: {currentStep.term}</span>
              </div>
            </div>

            <div className="solution-steps__heading">
              <span className="solution-steps__main-icon">
                <SolutionStepsIcon name={currentStep.icon} className="solution-steps__main-icon-svg" />
              </span>
              <h2 className="solution-steps__title">{currentStep.title}</h2>
            </div>
            <p className="solution-steps__description">{currentStep.description}</p>

            <div className="solution-steps__details">
              <ul className="solution-steps__deliverables" aria-label="Что входит в этап">
                {currentStep.deliverables.map((item) => (
                  <li key={item.label} className="solution-steps__deliverable">
                    <span className="solution-steps__deliverable-icon">
                      <SolutionStepsIcon name={item.icon} className="solution-steps__deliverable-icon-svg" />
                    </span>
                    <span className="solution-steps__deliverable-text">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="solution-steps__result">
                <p className="solution-steps__result-label">Результат этапа</p>
                <p className="solution-steps__result-text">{currentStep.result}</p>
              </div>
            </div>

            {currentStep.cta && (
              <div className="solution-steps__actions">
                <a className="solution-steps__action solution-steps__action--primary" href="#lead-form">
                  {currentStep.cta.primary}
                </a>
                {currentStep.cta.secondary && (
                  <a className="solution-steps__action solution-steps__action--secondary" href="#lead-form">
                    {currentStep.cta.secondary}
                  </a>
                )}
              </div>
            )}

            <div className="solution-steps__progress" aria-hidden="true">
              <span className="solution-steps__progress-value" style={{ width: progress }}></span>
            </div>
          </article>

          {shouldShowSwipeHint && (
            <div className="solution-steps__swipe-hint" aria-hidden="true">
              <span className="solution-steps__swipe-arrows">
                <span className="solution-steps__swipe-arrow solution-steps__swipe-arrow--1"></span>
                <span className="solution-steps__swipe-arrow solution-steps__swipe-arrow--2"></span>
                <span className="solution-steps__swipe-arrow solution-steps__swipe-arrow--3"></span>
              </span>
              <span className="solution-steps__swipe-text">Листайте влево / вправо</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SolutionSteps
