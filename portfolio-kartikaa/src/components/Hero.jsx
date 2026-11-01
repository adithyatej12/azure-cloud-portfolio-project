import { CloudDoodle, ServerDoodle, ArrowDoodle, StarDoodle } from './Doodles'
import MarginNote from './MarginNote'
import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">AWS Cloud Intern · Cloud · Serverless · Technology</p>
          <h1 className="hero__title">
            Hi, I'm Kartikaa.
            <br />
            I build things in the cloud.
          </h1>
          <p className="hero__sub">
            I build cloud-based and serverless applications, exploring how technology can turn
            ideas into useful systems.
          </p>
          <div className="hero__ctas">
            <a href="#projects" className="btn btn-primary" onClick={(e) => scrollTo(e, 'projects')}>
              View projects
            </a>
            <a
              href="https://github.com/kartikaa-natarajan"
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/kartikaa-natarajan"
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <StarDoodle className="hero__star hero__star--a" delay={1.4} />
          <StarDoodle className="hero__star hero__star--b" delay={1.6} />
          <CloudDoodle className="hero__cloud" delay={0.1} />
          <ServerDoodle className="hero__server" delay={0.5} />
          <ArrowDoodle direction="down" className="hero__arrow" delay={0.9} />
          <MarginNote className="hero__note hero__note--deploy" rotate={-6}>
            deploy →
          </MarginNote>
          <MarginNote className="hero__note hero__note--cloudstuff" rotate={4}>
            cloud stuff ☁
          </MarginNote>
          <MarginNote className="hero__note hero__note--building" rotate={-2}>
            currently building...
          </MarginNote>
        </div>
      </div>
    </section>
  )
}

function scrollTo(e, id) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
