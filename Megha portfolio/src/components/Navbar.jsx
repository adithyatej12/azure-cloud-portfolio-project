import { useEffect, useState } from 'react'
import { Mark, MenuIcon } from './icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './Navbar.css'

const LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Scroll-spy: highlight whichever section is actually in view, not just
  // whichever link was last clicked. The active section is the last one
  // (in document order) whose top has scrolled up past the nav line —
  // more reliable than IntersectionObserver when sections are shorter
  // than the viewport, since several can be "intersecting" at once there.
  useEffect(() => {
    const sections = LINKS
      .map((label) => ({ label, el: document.getElementById(label.toLowerCase()) }))
      .filter((s) => s.el)

    if (!sections.length) return

    const NAV_LINE = 96
    let ticking = false

    const update = () => {
      // Near the bottom of the page there may not be enough scroll room left
      // to bring the final section's top up past NAV_LINE — treat "at the
      // bottom" as "on the last section" rather than leaving it unreachable.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(sections[sections.length - 1].label)
        ticking = false
        return
      }

      let current = ''
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= NAV_LINE) current = s.label
      }
      setActive(current)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className="nav">
      <div className="nav__inner shell">
        <a className="nav__brand" href="#top">
          <Mark />
          <span>Megha Saha</span>
        </a>

        <nav className="nav__rail" aria-label="Primary">
          {LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className={active === label ? 'is-active' : ''}
              onClick={() => setActive(label)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__register" href="/Megha-Saha-Resume.pdf" download>Resume</a>
          <a className="btn btn--ink" href="#contact">Let's Talk</a>
        </div>

        <ThemeToggle />

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div className="nav__sheet">
          {LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => {
                setActive(label)
                setOpen(false)
              }}
            >
              {label}
            </a>
          ))}
          <a href="/Megha-Saha-Resume.pdf" download onClick={() => setOpen(false)}>Resume</a>
          <a className="btn btn--pearl" href="#contact" onClick={() => setOpen(false)}>Let's Talk</a>
        </div>
      )}
    </header>
  )
}
