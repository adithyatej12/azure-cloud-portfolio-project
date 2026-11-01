import useScrollReveal from '../hooks/useScrollReveal'
import MarginNote from './MarginNote'
import Reveal from './Reveal'
import { UnderlineDoodle } from './Doodles'
import './About.css'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section about">
      <div className="container">
        <div ref={ref} className="reveal about__head">
          <p className="eyebrow">About</p>
          <h2 className="section-heading">
            Curious about how things work
            <span className="about__underline-wrap">
              <span> — especially in the cloud</span>
              <UnderlineDoodle className="about__underline" delay={0.3} />
            </span>
            .
          </h2>
          <MarginNote className="about__note" rotate={-4}>
            currently learning →
          </MarginNote>
        </div>

        <div className="about__grid">
          <Reveal className="about__block">
            <h3 className="about__block-title">Education</h3>
            <div className="about__item">
              <p className="about__item-title">Master of Computer Applications (MCA)</p>
              <p className="about__item-sub">Storage &amp; Cloud Technology</p>
              <p className="about__item-meta">Jain University, Bangalore · 2025 – Present</p>
            </div>
            <div className="about__item">
              <p className="about__item-title">Bachelor of Computer Applications (BCA)</p>
              <p className="about__item-meta">
                St. Joseph's University, Bangalore · August 2020 – May 2023
              </p>
            </div>
          </Reveal>

          <Reveal className="about__block">
            <h3 className="about__block-title">Currently</h3>
            <div className="about__item">
              <p className="about__item-title">AWS Cloud Intern</p>
              <p className="about__item-sub">F13 Technologies</p>
              <p className="about__item-meta">June 2026 – Present · Remote</p>
            </div>
            <div className="about__item">
              <p className="about__item-title">Associate Analyst</p>
              <p className="about__item-sub">Deloitte</p>
              <p className="about__item-meta">October 2023 – April 2025 · Hyderabad, India</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
