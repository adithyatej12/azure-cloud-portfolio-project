import projects from '../data/projects'
import useScrollReveal from '../hooks/useScrollReveal'
import MarginNote from './MarginNote'
import ProjectCard from './ProjectCard'
import './Projects.css'

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div ref={ref} className="reveal projects__head">
          <p className="eyebrow">Projects</p>
          <h2 className="section-heading">Things I've built.</h2>
          <MarginNote className="projects__note" rotate={-3}>
            click a card to see more →
          </MarginNote>
        </div>

        <div className="projects__list">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
