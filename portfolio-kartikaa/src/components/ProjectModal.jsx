import { useEffect, useRef } from 'react'
import { ArrowDoodle } from './Doodles'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose, returnFocusRef }) {
  const closeBtnRef = useRef(null)
  const panelRef = useRef(null)

  // Focus the close button on open, restore focus to whatever opened the
  // modal on close, lock body scroll, and let Escape close it.
  useEffect(() => {
    closeBtnRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // simple focus trap: keep Tab cycling within the dialog
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusRef?.current?.focus()
    }
  }, [onClose, returnFocusRef])

  if (!project) return null

  const handleBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="project-modal__backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        ref={panelRef}
      >
        <button
          type="button"
          className="project-modal__close"
          onClick={onClose}
          ref={closeBtnRef}
          aria-label="Close case study"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="project-modal__scroll">
          <p className="eyebrow">Case study · Project {project.number}</p>
          <h3 id="project-modal-title" className="project-modal__title">
            {project.title}
          </h3>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">Problem / purpose</h4>
            <p>{project.purpose}</p>
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">What I built</h4>
            <p>{project.whatBuilt}</p>
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">AWS services used</h4>
            <ul className="project-modal__tags">
              {project.services.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">
              How it works
              <ArrowDoodle direction="right" className="project-modal__heading-doodle" animate={false} />
            </h4>
            <p className="project-modal__muted">{project.workflowNote}</p>
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">Architecture</h4>
            <div className="placeholder-box project-modal__media">
              {project.architectureImage ? (
                <img src={project.architectureImage} alt={`${project.title} architecture diagram`} />
              ) : (
                <span className="placeholder-box__label">Architecture diagram coming soon</span>
              )}
            </div>
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">Screenshots</h4>
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="project-modal__screenshots">
                {project.screenshots.map((shot) => (
                  <figure key={shot.src} className="project-modal__screenshot">
                    <a href={shot.src} target="_blank" rel="noreferrer">
                      <img src={shot.src} alt={shot.caption || project.title} />
                    </a>
                    {shot.caption && <figcaption>{shot.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            ) : (
              <div className="placeholder-box project-modal__media">
                <span className="placeholder-box__label">Screenshots coming soon</span>
              </div>
            )}
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">Key implementation details</h4>
            <ul className="project-modal__list">
              {project.implementationDetails.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="project-modal__section">
            <h4 className="project-modal__heading">GitHub status</h4>
            <p className="project-modal__muted">
              {project.githubAvailable && project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  View repository
                </a>
              ) : (
                <>
                  Repository — not published yet. See{' '}
                  <a href="https://github.com/kartikaa-natarajan" target="_blank" rel="noreferrer">
                    github.com/kartikaa-natarajan
                  </a>{' '}
                  for other work.
                </>
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
