import './Education.css'

const EDUCATION = [
  {
    degree: 'MCA — Storage and Cloud Computing',
    school: 'JAIN (Deemed-to-be University), Bangalore',
    time: 'Expected Jul 2027',
    score: null,
  },
  {
    degree: 'BCA',
    school: 'Presidency University, Yelahanka, Bangalore',
    time: 'Jul 2025',
    score: '7.93 / 10.0',
  },
  {
    degree: '12th — C.B.S.E',
    school: 'Maharishi Vidya Mandir School, Guwahati',
    time: 'Jan 2022',
    score: '82.33%',
  },
  {
    degree: '10th — S.E.B.A',
    school: "St Mary's H.S School, Guwahati",
    time: 'Jan 2020',
    score: '76.83%',
  },
]

export default function Education() {
  return (
    <section className="section education" id="education">
      <div className="shell">
        <div className="section__head">
          <span className="eyebrow">Education</span>
          <h2>Academic background.</h2>
        </div>

        <div className="edu-list">
          {EDUCATION.map((e) => (
            <div key={e.degree} className="edu-row">
              <div className="edu-row__main">
                <h3>{e.degree}</h3>
                <p>{e.school}</p>
              </div>
              <div className="edu-row__meta">
                <span className="edu-row__time">{e.time}</span>
                {e.score && <span className="tag">{e.score}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
