import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from '../router/Router'
import './Navbar.css'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'publication', label: 'Publication' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const path = useLocation()
  const navigate = useNavigate()
  const onHome = path === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a
          href={onHome ? '#top' : '/#top'}
          className="navbar__logo"
          onClick={(e) => handleLinkClick(e, 'top')}
          aria-label="Back to top"
        >
          Kartikaa Natarajan
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={onHome ? `#${link.id}` : `/#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`navbar__mobile ${open ? 'is-open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={onHome ? `#${link.id}` : `/#${link.id}`}
            onClick={(e) => handleLinkClick(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
