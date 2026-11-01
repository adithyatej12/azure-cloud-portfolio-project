import './Skills.css'

const GROUPS = [
  {
    title: 'Design',
    items: ['UI/UX Design', 'Figma', 'Wireframing', 'Prototyping', 'Interaction Design', 'Design Thinking'],
  },
  {
    title: 'Research',
    items: ['User Research', 'Usability Testing', 'User Personas', 'Journey Mapping'],
  },
  {
    title: 'Build',
    items: ['HTML', 'CSS', 'Python', 'Cloud Computing', 'Responsive & Accessible Web Design'],
  },
  {
    title: 'Craft',
    items: ['Team Collaboration', 'Communication', 'Creative Problem Solving', 'Time Management'],
  },
]

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="shell">
        <div className="section__head">
          <span className="eyebrow">Skills</span>
          <h2>What I bring to a product team.</h2>
        </div>

        <div className="skills__grid">
          {GROUPS.map((g) => (
            <article key={g.title} className="skills__card">
              <h3>{g.title}</h3>
              <div className="skills__tags">
                {g.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
