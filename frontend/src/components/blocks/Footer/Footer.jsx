import './Footer.scss'

function Footer() {
  return (
    <footer className="footer" aria-label="Подвал сайта">
      <div className="footer__card">
        <div className="footer__top">
          <div className="footer__brand-block">
            <a className="footer__brand" href="/" aria-label="SKT Agency">
              <svg
                className="footer__brand-icon"
                width="55"
                height="55"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect y="18.3335" width="16.5" height="36.6667" rx="4" fill="#161616"/>
                <rect x="19.25" y="9.1665" width="16.5" height="36.6667" rx="4" fill="#161616"/>
                <rect x="38.5" width="16.5" height="36.6667" rx="4" fill="#161616"/>
              </svg>
              <span className="footer__brand-title">SKT Agency</span>
            </a>

            <p className="footer__description">
              Мы помогаем бизнесу выстраивать системный рост: от привлечения клиентов до автоматизации и контроля
              продаж.
            </p>

          </div>

          <div className="footer__columns">


            <nav className="footer__column" aria-label="Ресурсы">
              <h3 className="footer__column-title">Ресурсы</h3>
              <a className="footer__column-link" href="/">
                Рассчитать стоимость
              </a>
              <a className="footer__column-link" href="#cases">
                Кейсы
              </a>
              <a className="footer__column-link" href="https://t.me/swydk_dev">
                Products API
              </a>

              <a className="footer__column-link" href="https://t.me/swydk_dev">
                Контакты
              </a>
              <a className="footer__column-link" href="#faq">
                FAQ
              </a>
            </nav>
            <nav className="footer__column" aria-label="Компания">
              <h3 className="footer__column-title">Компания</h3>
              <a className="footer__column-link" href="#about">
                О нас
              </a>
              <a className="footer__column-link" href="https://t.me/swydk_dev">
                Работа у нас
              </a>
              <a className="footer__column-link" href="https://t.me/swydk_dev">
                Отдел продаж
              </a>
              <a className="footer__column-link" href="https://t.me/swydk_dev">
                Партнерство
              </a>
            </nav>


            <nav className="footer__column" aria-label="Связаться">
              <h3 className="footer__column-title">Связаться</h3>
              <a className="footer__column-link" href="mailto:hello@sktagency.pro">
                hello@sktagency.pro
              </a>
              <a className="footer__column-link" href="tel:+77472253032">
                +7 (747) 225-30-32
              </a>
              <a className="footer__column-link" href="/">
                Алматы, Казахстан
              </a>
            </nav>



          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 ИП САНЖАР КАСЫМЖОМАРТ</p>

          <div className="footer__legal">

            <a className="footer__legal-link" href="/">
              SKT1.9.2.4.1 Stable
            </a>
          </div>
        </div>
      </div>

      <p className="footer__watermark" aria-hidden="true">
        SKT Agency
      </p>
    </footer>
  )
}

export default Footer
