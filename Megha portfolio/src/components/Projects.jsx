import { GithubIcon, ArrowUpRight } from './icons.jsx'
import './Projects.css'

const PROJECTS = [
  {
    title: 'Purbanchal Cement Ltd. — Website Redesign',
    tag: 'UI/UX Design · Website Redesign',
    description:
      'Redesigned the corporate website for Purbanchal Cement Ltd. during my internship at Acceleron Solutions — user interviews, competitor analysis, and low-to-high-fidelity wireframes in Figma.',
    points: [
      'Ran usability testing with 10+ participants',
      'Iterated the interface based on direct feedback',
      'Improved task completion rate by 30%',
    ],
    frame: 'browser',
    image: '/projecthero/purbanchal_cement.png',
    imageAlt: 'Purbanchal Cement Ltd. redesigned website shown on a desktop monitor mockup',
  },
  {
    title: 'College Campus Navigation App',
    tag: 'UI/UX Design · Mobile',
    description:
      'A mobile app that helps students navigate campus buildings, locate classrooms, and discover facilities with ease.',
    points: [
      'Built user personas and journey maps',
      'Designed interactive, testable prototypes',
      'Refined the interface for accessibility and clarity',
    ],
    frame: 'phone',
    image: '/projecthero/campus_explorer.png',
    imageAlt: 'Campus Explorer app screens — sign-in, home, and turn-by-turn campus navigation',
    github: 'https://github.com/karishmadanish/campus-explorer',
  },
  {
    title: 'SignLang AI — Sign Language Translator',
    tag: 'UI/UX Design · Web App',
    description:
      'Designed the interface for a real-time AI sign language translator, built to make ASL and ISL communication more accessible over webcam.',
    points: [
      'Designed a simple 3-step onboarding flow: enable webcam, sign, see the translation',
      'Built a language-selection interface supporting ASL, ISL, and more',
      'Highlighted trust and accessibility through clear, reassuring feature messaging',
    ],
    frame: 'browser',
    image: '/projecthero/sign_language.png',
    imageAlt: 'SignLang AI landing page — hero, step-by-step onboarding, and language selector',
    github: 'https://github.com/Abhijit-cmd/Sign-Language-Translator',
  },
]

function ProjectMock({ frame }) {
  if (frame === 'phone') {
    return (
      <svg viewBox="0 0 240 300" className="project__mock" aria-hidden="true">
        <rect x="52" y="10" width="136" height="280" rx="22" fill="var(--glass-lift)" stroke="var(--hairline)" />
        <rect x="66" y="34" width="108" height="18" rx="4" fill="var(--blush-soft)" />
        <rect x="66" y="60" width="70" height="10" rx="3" fill="var(--hairline)" />
        <rect x="66" y="86" width="108" height="70" rx="10" fill="var(--blush-soft)" />
        <circle cx="120" cy="121" r="16" fill="none" stroke="var(--blush)" strokeWidth="2" />
        <path d="M112 121l6 6 10-12" stroke="var(--blush)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="66" y="168" width="108" height="34" rx="8" fill="var(--ground)" stroke="var(--hairline)" />
        <rect x="66" y="210" width="108" height="34" rx="8" fill="var(--ground)" stroke="var(--hairline)" />
        <rect x="66" y="256" width="52" height="12" rx="6" fill="var(--blush)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 320 220" className="project__mock" aria-hidden="true">
      <rect x="6" y="6" width="308" height="208" rx="12" fill="var(--glass-lift)" stroke="var(--hairline)" />
      <rect x="6" y="6" width="308" height="30" rx="12" fill="rgba(255,255,255,0.06)" />
      <circle cx="22" cy="21" r="4" fill="var(--hairline)" />
      <circle cx="35" cy="21" r="4" fill="var(--hairline)" />
      <circle cx="48" cy="21" r="4" fill="var(--hairline)" />
      <rect x="24" y="52" width="90" height="150" rx="8" fill="var(--ground)" stroke="var(--hairline)" />
      <rect x="36" y="66" width="66" height="8" rx="3" fill="var(--blush-soft)" />
      <rect x="36" y="82" width="50" height="8" rx="3" fill="var(--hairline)" />
      <rect x="36" y="104" width="66" height="30" rx="6" fill="var(--blush-soft)" />
      <rect x="36" y="146" width="66" height="8" rx="3" fill="var(--hairline)" />
      <rect x="36" y="162" width="40" height="8" rx="3" fill="var(--hairline)" />
      <rect x="128" y="52" width="168" height="70" rx="8" fill="var(--blush-soft)" />
      <path d="M150 96l16-18 16 12 22-26 40 32" stroke="var(--blush)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="128" y="132" width="80" height="70" rx="8" fill="var(--ground)" stroke="var(--hairline)" />
      <rect x="216" y="132" width="80" height="70" rx="8" fill="var(--ground)" stroke="var(--hairline)" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="shell">
        <div className="section__head">
          <span className="eyebrow">Projects</span>
          <h2>A few things I've built.</h2>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <article key={p.title} className="project">
              <div className={`project__visual project__visual--${p.frame} ${p.image ? 'project__visual--image' : ''}`}>
                {p.image ? <img src={p.image} alt={p.imageAlt} /> : <ProjectMock frame={p.frame} />}
              </div>
              <div className="project__body">
                <div className="project__meta">
                  <span className="tag">{p.tag}</span>
                  {p.github && (
                    <a className="project__code" href={p.github} target="_blank" rel="noreferrer">
                      <GithubIcon size={15} /> Code <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
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
