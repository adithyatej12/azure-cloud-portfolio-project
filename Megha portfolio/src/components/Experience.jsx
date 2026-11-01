import './Experience.css'

const ROLES = [
  {
    role: 'Management Trainee',
    org: 'Acceleron Solutions, Kolkata',
    time: 'Jul 2025 — Sep 2025',
    points: [
      'Designed UI for web and mobile applications using Figma, enhancing user experience across client projects.',
      'Conducted wireframing and prototyping sessions; assisted in developing project timelines for client engagements.',
      'Compiled market research data and supported analysis reports to guide product design decisions.',
    ],
  },
]

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="shell">
        <div className="section__head">
          <span className="eyebrow">Experience</span>
          <h2>Where I've put design into practice.</h2>
        </div>

        <div className="timeline">
          {ROLES.map((r) => (
            <article key={r.role} className="timeline__item">
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__content">
                <div className="timeline__head">
                  <h3>{r.role}</h3>
                  <span className="timeline__time">{r.time}</span>
                </div>
                <p className="timeline__org">{r.org}</p>
                <ul>
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
