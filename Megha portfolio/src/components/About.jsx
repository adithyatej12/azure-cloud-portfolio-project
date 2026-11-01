import { PinIcon } from './icons.jsx'
import Quotes from './Quotes.jsx'
import './About.css'

const FACTS = [
  { label: 'Based in', value: 'Bengaluru, India' },
  { label: 'Currently', value: 'MCA candidate, JAIN University' },
  { label: 'Focus', value: 'UI/UX design · accessibility' },
  { label: 'Languages', value: 'English, Hindi, Bengali, Assamese' },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="shell about__grid">
        <div className="about__visual">
          <img className="about__photo" src="/pf.jpeg" alt="Portrait of Megha Saha" />
        </div>

        <div className="about__copy">
          <span className="eyebrow">About</span>
          <h2>A designer who bridges research, interface, and code.</h2>
          <p>
            I'm a computer science postgraduate student with hands-on experience in
            wireframing, prototyping, and user-centered design. I'm proficient in Figma, with
            a foundation in cloud computing and web development that lets me design with an
            engineer's sense of what's buildable.
          </p>
          <p>
            I care about building intuitive, accessible digital experiences — the kind that
            bridge design and technology rather than sitting on opposite sides of a handoff.
          </p>

          <dl className="about__facts">
            {FACTS.map((f) => (
              <div key={f.label} className="about__fact">
                <dt><PinIcon size={14} />{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <Quotes />
        </div>
      </div>
    </section>
  )
}
