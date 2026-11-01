import experience from '../data/experience'
import useScrollReveal from '../hooks/useScrollReveal'
import Reveal from './Reveal'
import './Experience.css'

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div ref={ref} className="reveal experience__head">
          <p className="eyebrow">Experience</p>
          <h2 className="section-heading">Where I've worked.</h2>
        </div>

        <ol className="experience__timeline">
          {experience.map((job) => (
            <Reveal as="li" key={job.company} className="experience__item">
              <div className="experience__dot" aria-hidden="true" />
              <div className="experience__content">
                <div className="experience__row">
                  <h3 className="experience__role">{job.role}</h3>
                  <span className="experience__period">{job.period}</span>
                </div>
                <p className="experience__company">
                  {job.company} · {job.location}
                </p>
                <ul className="experience__points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
