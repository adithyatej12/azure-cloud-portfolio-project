import { useEffect } from 'react'
import projects from '../data/projects'
import { Link } from '../router/Router'
import { ArrowDoodle } from '../components/Doodles'
import useScrollReveal from '../hooks/useScrollReveal'
import './ProjectDetail.css'

function Section({ heading, children, className = '' }) {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className={`reveal project-detail__section ${className}`}>
      <h2 className="project-detail__heading">{heading}</h2>
      {children}
    </section>
  )
}

export default function ProjectDetail({ slug }) {
  const project = projects.find((p) => p.slug === slug)

  // Land at the top of the page whenever a new project is opened.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!project) {
    return (
      <main id="main" className="project-detail">
        <div className="container project-detail__notfound">
          <p className="eyebrow">Project not found</p>
          <h1 className="section-heading">We couldn't find that case study.</h1>
          <Link to="/#projects" className="btn btn-primary project-detail__back">
            <ArrowDoodle direction="left" className="project-detail__back-arrow" animate={false} />
            Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="project-detail">
      <div className="container">
        <div className="project-detail__topnav">
          <Link to="/#projects" className="btn project-detail__back">
            <ArrowDoodle direction="left" className="project-detail__back-arrow" animate={false} />
            Back to Projects
          </Link>
        </div>

        <header className="project-detail__head">
          <p className="eyebrow">Case study · Project {project.number}</p>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__desc">{project.description}</p>
        </header>

        <Section heading="Problem / purpose">
          <p className="project-detail__prose">{project.purpose}</p>
        </Section>

        <Section heading="What I built">
          <p className="project-detail__prose">{project.whatBuilt}</p>
        </Section>

        <Section heading="AWS services used">
          <ul className="project-detail__tags">
            {project.services.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          heading={
            <>
              How it works
              <ArrowDoodle direction="right" className="project-detail__heading-doodle" animate={false} />
            </>
          }
        >
          {project.workflow && project.workflow.length > 0 ? (
            <ol className="project-detail__workflow">
              {project.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="project-detail__muted">{project.workflowNote}</p>
          )}
        </Section>

        {project.architectureImage && (
          <Section heading="Architecture">
            <div className="project-detail__architecture">
              <img
                src={project.architectureImage}
                alt={`${project.title} architecture diagram`}
                loading="lazy"
              />
            </div>
          </Section>
        )}

        <Section heading="Key implementation details">
          <ul className="project-detail__list">
            {project.implementationDetails.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Section>

        {project.screenshots && project.screenshots.length > 0 && (
          <Section heading="Screenshots">
            <div className="project-detail__screenshots">
              {project.screenshots.map((shot) => (
                <figure key={shot.src} className="project-detail__screenshot">
                  <a href={shot.src} target="_blank" rel="noreferrer">
                    <img src={shot.src} alt={shot.caption || project.title} loading="lazy" />
                  </a>
                  {shot.caption && <figcaption>{shot.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </Section>
        )}

        <div className="project-detail__footnav">
          <Link to="/#projects" className="btn btn-primary project-detail__back">
            <ArrowDoodle direction="left" className="project-detail__back-arrow" animate={false} />
            Back to Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
