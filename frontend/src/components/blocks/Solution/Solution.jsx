import './Solution.scss'

function Solution() {
  return (
    <section className="solution" aria-label="Solution">
      <div className="solution__list">
        <article className="solution__row">
          <div className="solution__side solution__side--left">
            <p className="solution__text solution__text--left">
              Заявки теряются в WhatsApp, Telegram и Instagram
            </p>
            <span className="solution__mark solution__mark--bad" aria-hidden="true"></span>
          </div>

          <div className="solution__side solution__side--right">
            <span className="solution__mark solution__mark--good" aria-hidden="true"></span>
            <p className="solution__text solution__text--right">
              Все заявки автоматически фиксируются в системе
            </p>
          </div>
        </article>

        <article className="solution__row">
          <div className="solution__side solution__side--left">
            <p className="solution__text solution__text--left">
              Нет понимания клиентов и денег
            </p>
            <span className="solution__mark solution__mark--bad" aria-hidden="true"></span>
          </div>

          <div className="solution__side solution__side--right">
            <span className="solution__mark solution__mark--good" aria-hidden="true"></span>
            <p className="solution__text solution__text--right">
              Вы видите клиентов, продажи и прибыль в цифрах
            </p>
          </div>
        </article>

        <article className="solution__row">
          <div className="solution__side solution__side--left">
            <p className="solution__text solution__text--left">
             Реклама работает, но деньги сливаются
            </p>
            <span className="solution__mark solution__mark--bad" aria-hidden="true"></span>
          </div>

          <div className="solution__side solution__side--right">
            <span className="solution__mark solution__mark--good" aria-hidden="true"></span>
            <p className="solution__text solution__text--right">
              Реклама под контролем и приносит результат
            </p>
          </div>
        </article>

        <article className="solution__row">
          <div className="solution__side solution__side--left">
            <p className="solution__text solution__text--left">
              Бизнес работает вручную и хаотично
            </p>
            <span className="solution__mark solution__mark--bad" aria-hidden="true"></span>
          </div>

          <div className="solution__side solution__side--right">
            <span className="solution__mark solution__mark--good" aria-hidden="true"></span>
            <p className="solution__text solution__text--right">
              Бизнес работает как система, а не хаос
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Solution
