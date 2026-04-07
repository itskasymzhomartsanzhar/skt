import { useState } from 'react'
import './LeadForm.scss'
import { createLead } from '../../../utils/api'
import { formatRuKzPhone, normalizeRuKzPhoneDigits } from '../../../utils/phone'

function LeadForm({ snippets = {} }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasPhoneInput = normalizeRuKzPhoneDigits(phone).length > 0

  const handleSubmit = async (event) => {
    event.preventDefault()

    const normalizedName = name.trim()
    const normalizedPhoneDigits = normalizeRuKzPhoneDigits(phone)

    if (normalizedName.length < 2) {
      setErrorMessage('Введите имя минимум из 2 символов.')
      return
    }

    if (normalizedPhoneDigits.length !== 11 || normalizedPhoneDigits[0] !== '7') {
      setErrorMessage('Введите номер РФ или КЗ в формате +7 (___) ___-__-__.')
      return
    }

    const formattedPhone = formatRuKzPhone(normalizedPhoneDigits)
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await createLead({
        name: normalizedName,
        phone: formattedPhone,
        source: 'lead_form',
      })

      setPhone(formattedPhone)
      setIsSubmitted(true)
    } catch (error) {
      setErrorMessage(error.message || 'Не удалось отправить заявку. Попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setName('')
    setPhone('')
    setErrorMessage('')
    setIsSubmitting(false)
    setIsSubmitted(false)
  }

  return (
    <section className="lead-form" id="lead-form" aria-label="Форма заявки">
      <div className="lead-form__shell">
        <div className="lead-form__intro">
          <p className="lead-form__label">Форма заявки</p>
          <h2 className="lead-form__title">
            {snippets.lead_form_title || 'Заполните форму и получите AI-менеджера в подарок к проекту'}
          </h2>
          <p className="lead-form__text">
            {snippets.lead_form_description ||
              'Подготовим персональный план запуска, разберем текущую ситуацию и предложим оптимальный путь роста.'}
          </p>

          <ul className="lead-form__benefits">
            <li className="lead-form__benefit">{snippets.lead_form_benefit_1 || 'Расчет стоимости в день обращения'}</li>
            <li className="lead-form__benefit">{snippets.lead_form_benefit_2 || 'Бесплатный разбор проекта'}</li>
            <li className="lead-form__benefit">{snippets.lead_form_benefit_3 || 'AI-менеджер на месяц в подарок'}</li>
          </ul>
        </div>

        <div className="lead-form__card">
          {isSubmitted ? (
            <div className="lead-form__success">
              <p className="lead-form__success-title">Заявка отправлена</p>
              <p className="lead-form__success-text">
                Спасибо, {name}. Мы скоро свяжемся с вами и назначим встречу.
              </p>
              <button className="lead-form__submit lead-form__submit--secondary" type="button" onClick={handleReset}>
                Отправить еще заявку
              </button>
            </div>
          ) : (
            <form className="lead-form__form" onSubmit={handleSubmit}>
              <div className="lead-form__row">
                <label className="lead-form__field">
                  <span className="lead-form__field-label">Имя</span>
                  <input
                    className="lead-form__input"
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

                <label className="lead-form__field">
                  <span className="lead-form__field-label">Телефон</span>
                  <input
                    className="lead-form__input"
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
              </div>

              <p className="lead-form__note">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>

              {errorMessage && <p className="lead-form__error">{errorMessage}</p>}

              <button className="lead-form__submit" type="submit" disabled={!hasPhoneInput || isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default LeadForm
