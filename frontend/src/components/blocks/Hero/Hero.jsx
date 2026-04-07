import { useEffect, useMemo, useRef, useState } from 'react'
import './Hero.scss'
import hero from '../../../assets/hero.png'
import { createLead } from '../../../utils/api'
import { formatRuKzPhone, normalizeRuKzPhoneDigits } from '../../../utils/phone'

const defaultCalculatorQuestions = [
  {
    id: 'projectType',
    selection: 'single',
    isRequired: true,
    title: 'Какой проект вам нужен?',
    text: 'Выберите формат продукта, который нужно запустить первым этапом.',
    options: [
      {
        id: 'landing',
        title: 'Лендинг',
        description: 'До 8 блоков, фокус на конверсию',
        price: 350000
      },
      {
        id: 'corporate',
        title: 'Корпоративный сайт',
        description: 'До 8 страниц + структура услуг',
        price: 650000
      },
      {
        id: 'service',
        title: 'Сайт-сервис',
        description: 'Интеграции, форма, оплата, записи',
        price: 920000
      },     
      {
        id: 'shop',
        title: 'Интернет-магазин',
        description: 'Каталог, корзина, оплата, фильтры',
        price: 920000
      }
    ]
  },
  {
    id: 'designReady',
    selection: 'single',
    isRequired: true,
    title: 'Есть ли готовый дизайн?',
    text: 'Это поможет понять, делать ли полный дизайн с нуля или сразу идти в разработку.',
    options: [
      {
        id: 'yes',
        title: 'Да',
        description: 'Макеты готовы, можно стартовать быстрее',
        price: 0
      },
      {
        id: 'no',
        title: 'Нет',
        description: 'Нужен полный цикл дизайна под проект',
        price: 180000
      },
      {
        id: 'reference',
        title: 'Есть референс',
        description: 'Соберем дизайн на основе ваших примеров',
        price: 90000
      }
    ]
  },
  {
    id: 'traffic',
    selection: 'single',
    isRequired: true,
    title: 'Нужен ли запуск рекламы?',
    text: 'Выберите объем маркетинга сразу после запуска сайта.',
    options: [
      {
        id: 'none',
        title: 'Пока без рекламы',
        description: 'Только запуск сайта',
        price: 0
      },
      {
        id: 'start',
        title: 'Базовый запуск',
        description: 'Google / Яндекс + базовая аналитика',
        price: 220000
      },
      {
        id: 'growth',
        title: 'Активный рост',
        description: 'Google / Яндекс / Meta + оптимизация',
        price: 420000
      }
    ]
  },
  {
    id: 'integrations',
    selection: 'multiple',
    isRequired: false,
    title: 'Какие ещё дополнительные интеграции нужны?',
    text: 'Можно выбрать сразу несколько пунктов.',
    options: [
      {
        id: 'aiManager',
        title: 'AI менеджер',
        description: 'Автоматическая квалификация и ответы по скриптам',
        price: 340000
      },
      {
        id: 'salesAnalytics',
        title: 'Постоянная аналитика и статистика продаж',
        description: 'Дашборды по каналам, лидам и конверсии',
        price: 170000
      },
      {
        id: 'advancedCrm',
        title: 'Более расширенный CRM',
        description: 'Автоматизация статусов, воронка и контроль менеджеров',
        price: 220000
      },
      {
        id: 'marketingUpgrade',
        title: 'Улучшение маркетинговой составляющей',
        description: 'Усиление рекламы, креативов и ретаргетинга',
        price: 260000
      }
    ]
  },
  {
    id: 'budget',
    selection: 'single',
    isRequired: true,
    title: 'Какой планируемый бюджет проекта?',
    text: 'Подберем оптимальный состав работ под ваши возможности и цели.',
    options: [
      {
        id: 'basic',
        title: 'До 800 000 ₸',
        description: 'Стартовая комплектация с приоритетом на запуск',
        price: 0
      },
      {
        id: 'optimal',
        title: '800 000 — 1 500 000 ₸',
        description: 'Оптимальный баланс функционала и роста',
        price: 180000
      },
      {
        id: 'advanced',
        title: 'От 1 500 000 ₸',
        description: 'Расширенный запуск с максимальным потенциалом',
        price: 350000
      }
    ]
  }
]

function normalizeCalculatorQuestions(rawQuestions) {
  if (!Array.isArray(rawQuestions)) {
    return []
  }

  return rawQuestions
    .map((rawQuestion, index) => {
      const options = Array.isArray(rawQuestion?.options)
        ? rawQuestion.options
            .map((rawOption, optionIndex) => {
              if (!rawOption?.title) {
                return null
              }

              return {
                id: String(rawOption.id || `option_${index + 1}_${optionIndex + 1}`),
                title: String(rawOption.title),
                description: String(rawOption.description || ''),
                price: Number.isFinite(Number(rawOption.price)) ? Math.max(0, Number(rawOption.price)) : 0,
              }
            })
            .filter(Boolean)
        : []

      if (!rawQuestion?.title || options.length === 0) {
        return null
      }

      return {
        id: String(rawQuestion.id || `question_${index + 1}`),
        selection: rawQuestion.selection === 'multiple' ? 'multiple' : 'single',
        isRequired: rawQuestion.is_required !== false && rawQuestion.isRequired !== false,
        title: String(rawQuestion.title),
        text: String(rawQuestion.text || ''),
        options,
      }
    })
    .filter(Boolean)
}

function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₸`
}

function getQuestionTotal(question, selectedValue) {
  if (!selectedValue) {
    return 0
  }

  if (question.selection === 'multiple') {
    return selectedValue.reduce((sum, option) => sum + option.price, 0)
  }

  return selectedValue.price
}

function getSelectedOptions(question, selectedValue) {
  if (!selectedValue) {
    return []
  }

  if (question.selection === 'multiple') {
    return selectedValue
  }

  return [selectedValue]
}

function Hero({ snippets = {}, calculatorQuestionsData }) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const autoNextTimeoutRef = useRef(null)

  const calculatorQuestions = useMemo(() => {
    const normalizedQuestions = normalizeCalculatorQuestions(calculatorQuestionsData)
    return normalizedQuestions.length > 0 ? normalizedQuestions : defaultCalculatorQuestions
  }, [calculatorQuestionsData])

  const totalCalculatorSteps = calculatorQuestions.length + 2
  const contactStep = calculatorQuestions.length
  const resultStep = calculatorQuestions.length + 1
  const isQuestionStep = currentStep < calculatorQuestions.length
  const isContactStep = currentStep === contactStep
  const isResultStep = currentStep === resultStep
  const currentQuestion = isQuestionStep ? calculatorQuestions[currentStep] : null
  const isMultipleSelectQuestion = currentQuestion?.selection === 'multiple'
  const isCurrentQuestionRequired = currentQuestion?.isRequired !== false
  const selectedCurrentOptionsCount = currentQuestion
    ? getSelectedOptions(currentQuestion, answers[currentQuestion.id]).length
    : 0
  const shouldShowQuestionNextButton = isMultipleSelectQuestion || !isCurrentQuestionRequired

  useEffect(() => {
    setCurrentStep((prevStep) => Math.min(prevStep, calculatorQuestions.length + 1))
    setAnswers((previousAnswers) => {
      const nextAnswers = {}
      calculatorQuestions.forEach((question) => {
        if (previousAnswers[question.id] !== undefined) {
          nextAnswers[question.id] = previousAnswers[question.id]
        }
      })
      return nextAnswers
    })
  }, [calculatorQuestions])

  const totalPrice = useMemo(
    () =>
      calculatorQuestions.reduce((sum, question) => {
        return sum + getQuestionTotal(question, answers[question.id])
      }, 0),
    [answers]
  )

  const heroTitle = snippets.hero_title || 'Не теряйте клиентов — управляйте ими'
  const heroDescription =
    snippets.hero_description ||
    'Создаём систему, где каждая заявка фиксируется, обрабатывается и приносит деньги. Сайт + CRM + автоматизация — всё, чтобы заявки превращались в клиентов.'
  const heroPoints = [
    snippets.hero_point_1 || 'Продающий и красивый сайт под вашу аудиоторию',
    snippets.hero_point_2 || 'CRM совмещенный с ИИ для контроля клиентов и заказов',
    snippets.hero_point_3 || 'Автоматическая обработка заявок и лидов',
    snippets.hero_point_4 || 'Аналитика продаж, роста и рекомендации',
  ]
  const heroPrimaryCta = snippets.hero_primary_cta || 'Оставить заявку'
  const heroSecondaryCta = snippets.hero_secondary_cta || 'Рассчитать стоимость'
  const calculatorContactText =
    snippets.calculator_contact_text ||
    'Оставьте заявку и получите расчет стоимости проекта и бесплатный разбор проекта.'

  useEffect(() => {
    if (!isCalculatorOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCalculatorOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCalculatorOpen])

  useEffect(() => {
    return () => {
      if (autoNextTimeoutRef.current) {
        window.clearTimeout(autoNextTimeoutRef.current)
        autoNextTimeoutRef.current = null
      }
    }
  }, [])

  const handleOpenCalculator = () => {
    if (autoNextTimeoutRef.current) {
      window.clearTimeout(autoNextTimeoutRef.current)
      autoNextTimeoutRef.current = null
    }
    setCurrentStep(0)
    setAnswers({})
    setName('')
    setPhone('')
    setErrorMessage('')
    setIsCalculatorOpen(true)
  }

  const handleCloseCalculator = () => {
    if (autoNextTimeoutRef.current) {
      window.clearTimeout(autoNextTimeoutRef.current)
      autoNextTimeoutRef.current = null
    }
    setIsCalculatorOpen(false)
    setErrorMessage('')
  }

  const goToNextStep = () => {
    setCurrentStep((prevStep) => (prevStep >= calculatorQuestions.length - 1 ? contactStep : prevStep + 1))
  }

  const handleSelectOption = (question, option) => {
    setErrorMessage('')

    if (question.selection === 'multiple') {
      setAnswers((previousState) => {
        const selectedOptions = previousState[question.id] || []
        const hasOption = selectedOptions.some((selected) => selected.id === option.id)

        return {
          ...previousState,
          [question.id]: hasOption
            ? selectedOptions.filter((selected) => selected.id !== option.id)
            : [...selectedOptions, option]
        }
      })
      return
    }

    setAnswers((previousState) => ({
      ...previousState,
      [question.id]: option
    }))

    if (autoNextTimeoutRef.current) {
      window.clearTimeout(autoNextTimeoutRef.current)
      autoNextTimeoutRef.current = null
    }

    autoNextTimeoutRef.current = window.setTimeout(() => {
      goToNextStep()
      autoNextTimeoutRef.current = null
    }, 230)
  }

  const handleNextQuestion = () => {
    if (!currentQuestion) {
      return
    }

    const selectedOptions = getSelectedOptions(currentQuestion, answers[currentQuestion.id])
    const isRequired = currentQuestion.isRequired !== false

    if (selectedOptions.length === 0 && isRequired) {
      setErrorMessage(
        currentQuestion.selection === 'multiple'
          ? 'Выберите минимум один вариант, чтобы перейти дальше.'
          : 'Выберите один вариант, чтобы перейти дальше.'
      )
      return
    }

    setErrorMessage('')
    goToNextStep()
  }

  const handleBack = () => {
    setErrorMessage('')
    if (autoNextTimeoutRef.current) {
      window.clearTimeout(autoNextTimeoutRef.current)
      autoNextTimeoutRef.current = null
    }
    if (currentStep === 0) {
      return
    }
    setCurrentStep((prev) => prev - 1)
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const normalizedName = name.trim()
    const normalizedPhoneDigits = normalizeRuKzPhoneDigits(phone)

    if (normalizedName.length < 2) {
      setErrorMessage('Введите имя минимум из 2 символов.')
      return
    }

    if (normalizedPhoneDigits.length !== 11 || normalizedPhoneDigits[0] !== '7') {
      setErrorMessage('Введите корректный номер РФ или КЗ в формате +7 (___) ___-__-__.')
      return
    }

    const formattedPhone = formatRuKzPhone(normalizedPhoneDigits)
    setIsSubmittingLead(true)
    setErrorMessage('')

    try {
      await createLead({
        name: normalizedName,
        phone: formattedPhone,
        source: 'calculator',
        payload: {
          totalPrice,
          answers: calculatorQuestions.map((question) => {
            const selectedOptions = getSelectedOptions(question, answers[question.id])
            return {
              id: question.id,
              title: question.title,
              isRequired: question.isRequired !== false,
              options: selectedOptions.map((option) => option.title),
              price: getQuestionTotal(question, answers[question.id]),
            }
          }),
        },
      })
      setPhone(formattedPhone)
      setCurrentStep(resultStep)
    } catch (error) {
      setErrorMessage(error.message || 'Не удалось отправить заявку. Попробуйте снова.')
    } finally {
      setIsSubmittingLead(false)
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          {heroTitle}
        </h1>
        <p className="hero__description">
          {heroDescription}
        </p>
        <ul className="hero__points" aria-label="Что мы делаем">
          {heroPoints.map((point) => (
            <li className="hero__point" key={point}>
              <span className="hero__point-icon" aria-hidden="true">
                <svg className="hero__point-icon-svg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="hero__point-text">{point}</span>
            </li>
          ))}
        </ul>
        <div className="hero__buttons">
          <a className="hero__action-dark" href="#lead-form">
            {heroPrimaryCta}
          </a>
          <button className="hero__action" type="button" onClick={handleOpenCalculator}>
            {heroSecondaryCta}
          </button>
        </div>
      </div>
      <img className="hero__image" src={hero} alt="Цифровые решения для бизнеса" />

      <div className="backpoint"></div>

      {isCalculatorOpen && (
        <div className="hero__calculator-overlay" onClick={handleCloseCalculator}>
          <section
            className="hero__calculator"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-calculator-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="hero__calculator-header">
              <div className="hero__calculator-headline">
                <p className="hero__calculator-kicker">Калькулятор стоимости</p>
                <h2 className="hero__calculator-title" id="hero-calculator-title">
                  Получите расчет стоимости проекта
                </h2>
              </div>
              <button
                className="hero__calculator-close"
                type="button"
                onClick={handleCloseCalculator}
                aria-label="Закрыть калькулятор"
              >
                ×
              </button>
            </header>

            <div className="hero__calculator-progress">
              <p className="hero__calculator-step-label">
                Шаг {currentStep + 1} из {totalCalculatorSteps}
              </p>
              <div className="hero__calculator-track" aria-hidden="true">
                <span
                  className="hero__calculator-track-fill"
                  style={{
                    width: `${((currentStep + 1) / totalCalculatorSteps) * 100}%`
                  }}
                ></span>
              </div>
            </div>

            <div className="hero__calculator-stage" key={`calculator-stage-${currentStep}`}>
              {isQuestionStep && currentQuestion && (
                <div className="hero__calculator-step">
                  <div className="hero__calculator-question-head">
                    <p className="hero__calculator-question-title">
                      {currentStep + 1}. {currentQuestion.title}
                    </p>
                    <div className="hero__calculator-modes">
                      <span className="hero__calculator-mode">
                        {currentQuestion.selection === 'multiple' ? 'Несколько ответов' : 'Один ответ'}
                      </span>
                      <span className="hero__calculator-mode">
                        {isCurrentQuestionRequired ? 'Обязательный' : 'Необязательный'}
                      </span>
                    </div>
                  </div>
                  <p className="hero__calculator-question-text">{currentQuestion.text}</p>

                  <div className="hero__calculator-options">
                    {currentQuestion.options.map((option) => {
                      const selectedOptions = getSelectedOptions(currentQuestion, answers[currentQuestion.id])
                      const isSelected = selectedOptions.some((selectedOption) => selectedOption.id === option.id)
                      return (
                        <button
                          key={option.id}
                          className={`hero__calculator-option${isSelected ? ' hero__calculator-option--active' : ''}`}
                          type="button"
                          onClick={() => handleSelectOption(currentQuestion, option)}
                        >
                          <span
                            className={`hero__calculator-option-marker${
                              currentQuestion.selection === 'multiple'
                                ? ' hero__calculator-option-marker--multiple'
                                : ' hero__calculator-option-marker--single'
                            }${isSelected ? ' hero__calculator-option-marker--active' : ''}`}
                            aria-hidden="true"
                          >
                            <svg
                              className="hero__calculator-option-check"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 8.3L6.2 11.4L13.2 4.6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="hero__calculator-option-main">
                            <span className="hero__calculator-option-title">{option.title}</span>
                            <span className="hero__calculator-option-note">{option.description}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {isContactStep && (
                <form className="hero__calculator-form" id="hero-calculator-form" onSubmit={handleContactSubmit}>
                  <p className="hero__calculator-question-title">{contactStep + 1}. Куда отправить расчет?</p>
                  <p className="hero__calculator-question-text">
                    {calculatorContactText}
                  </p>

                  <label className="hero__calculator-field">
                    <span className="hero__calculator-field-label">Как вас зовут?</span>
                    <input
                      className="hero__calculator-input"
                      type="text"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                        setErrorMessage('')
                      }}
                      placeholder="Ваше имя"
                      autoComplete="name"
                    />
                  </label>

                  <label className="hero__calculator-field">
                    <span className="hero__calculator-field-label">Телефон</span>
                    <input
                    className="hero__calculator-input"
                    type="tel"
                    value={phone}
                    onChange={(event) => {
                      setPhone(formatRuKzPhone(event.target.value))
                      setErrorMessage('')
                    }}
                    placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                    />
                  </label>
                </form>
              )}

              {isResultStep && (
                <div className="hero__calculator-result">
                  <p className="hero__calculator-result-label">Предварительная стоимость</p>
                  <p className="hero__calculator-result-total">{formatPrice(totalPrice)}</p>
                  <p className="hero__calculator-result-text">
                    {name}, мы подготовили расчет на номер {phone}.
                  </p>
                </div>
              )}
            </div>

            {errorMessage && <p className="hero__calculator-error">{errorMessage}</p>}

            {isQuestionStep && (
              <div className="hero__calculator-actions">
                <button
                  className="hero__calculator-button hero__calculator-button--ghost"
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Назад
                </button>
                {shouldShowQuestionNextButton ? (
                  <button className="hero__calculator-button hero__calculator-button--primary" type="button" onClick={handleNextQuestion}>
                    {!isCurrentQuestionRequired && selectedCurrentOptionsCount === 0 ? 'Пропустить' : 'Далее'}
                  </button>
                ) : null}
              </div>
            )}

            {isContactStep && (
              <div className="hero__calculator-actions">
                <button className="hero__calculator-button hero__calculator-button--ghost" type="button" onClick={handleBack}>
                  Назад
                </button>
                <button
                  className="hero__calculator-button hero__calculator-button--primary"
                  type="submit"
                  form="hero-calculator-form"
                  disabled={isSubmittingLead}
                >
                  {isSubmittingLead ? 'Отправка...' : 'Показать стоимость'}
                </button>
              </div>
            )}

            {isResultStep && (
              <div className="hero__calculator-actions">
                <button
                  className="hero__calculator-button hero__calculator-button--ghost"
                  type="button"
                  onClick={() => {
                    setCurrentStep(0)
                    setErrorMessage('')
                  }}
                >
                  Пересчитать
                </button>
                <button className="hero__calculator-button hero__calculator-button--primary" type="button" onClick={handleCloseCalculator}>
                  Спасибо
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </section>
  )
}

export default Hero
