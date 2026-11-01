import useScrollReveal from '../hooks/useScrollReveal'
import Reveal from './Reveal'
import { ConnectorDoodle, CircleDoodle } from './Doodles'
import './Publication.css'

export default function Publication() {
  const ref = useScrollReveal()

  return (
    <section id="publication" className="section publication">
      <div className="container">
        <div ref={ref} className="reveal publication__head">
          <p className="eyebrow">Publication</p>
          <h2 className="section-heading">Research, briefly.</h2>
        </div>

        <Reveal className="publication__paper">
          <p className="publication__journal">Publishing and Printing Journal · Vol. 7, Issue 5 (2026)</p>
          <h3 className="publication__title">
            Analytical Modeling of Delay and Throughput in Cloud-Based Early Warning Systems
          </h3>
          <p className="publication__authors">Kartikaa Natarajan, Dr. Prabhakaran Abraham</p>

          <p className="publication__desc">
            Proposed an analytical model to evaluate latency, throughput, and reliability in
            cloud-based early warning systems.
          </p>

          <div className="publication__concepts" aria-hidden="true">
            <span className="publication__concept">
              latency
              <CircleDoodle className="publication__circle" delay={0.2} />
            </span>
            <ConnectorDoodle className="publication__connector" delay={0.4} />
            <span className="publication__concept">throughput</span>
            <ConnectorDoodle className="publication__connector" delay={0.6} />
            <span className="publication__concept">reliability</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
