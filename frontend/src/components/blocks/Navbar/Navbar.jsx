import './Navbar.scss'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__block">
        <a className="navbar__brand" href="#hero" aria-label="SKT Agency">
          <svg
            className="navbar__brand-icon"
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect y="18.3335" width="16.5" height="36.6667" rx="4" fill="#161616"/>
            <rect x="19.25" y="9.1665" width="16.5" height="36.6667" rx="4" fill="#161616"/>
            <rect x="38.5" width="16.5" height="36.6667" rx="4" fill="#161616"/>
          </svg>
          <span className="navbar__brand-title">SKT AGENCY</span>
        </a>
      </div>
      <div className="navbar__block">        
        <nav className="navbar__menu" aria-label="Основная навигация">
          <a className="navbar__menu-link" href="#about">
            О НАС
          </a>
          <a className="navbar__menu-link" href="#services">
            УСЛУГИ
          </a>

          <a className="navbar__menu-link" href="#cases">
            КЕЙСЫ
          </a>
          <a className="navbar__menu-link" href="#solution-steps">
            ЭТАПЫ РАБОТЫ
          </a>
        </nav>
      </div>

      <div className="navbar__block">
        <a className="navbar__action" href="#lead-form">
          ОСТАВИТЬ ЗАЯВКУ
        </a>
      </div>
    </header>

  )
}

export default Navbar
