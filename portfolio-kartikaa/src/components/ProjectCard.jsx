import useScrollReveal from '../hooks/useScrollReveal'
import { ArrowDoodle } from './Doodles'
import { Link } from '../router/Router'

export default function ProjectCard({ project, index }) {
  const revealRef = useScrollReveal()

  return (
    <article ref={revealRef} className="project-card reveal" style={{ '--i': index }}>
      <div className="project-card__top">
        <span className="project-card__number">{project.number}</span>
        <div className="project-card__heading">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.description}</p>

          <ul className="project-card__tags">
            {project.services.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>

          <div className="project-card__actions">
            <Link to={`/projects/${project.slug}`} className="btn project-card__toggle">
              View case study
              <ArrowDoodle direction="right" className="project-card__toggle-arrow" animate={false} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
