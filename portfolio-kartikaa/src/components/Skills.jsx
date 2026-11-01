import { useState } from 'react'
import skillGroups from '../data/skills'
import useScrollReveal from '../hooks/useScrollReveal'
import MarginNote from './MarginNote'
import Reveal from './Reveal'
import './Skills.css'

export default function Skills() {
  const ref = useScrollReveal()
  const [activeKey, setActiveKey] = useState(null)

  const findActiveItem = () => {
    for (const group of skillGroups) {
      for (const item of group.items) {
        const key = `${group.label}::${item.name}`
        if (key === activeKey) return item
      }
    }
    return null
  }
  const activeItem = findActiveItem()

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div ref={ref} className="reveal skills__head">
          <p className="eyebrow">Skills</p>
          <h2 className="section-heading">Tools I work with.</h2>
          <MarginNote className="skills__note" rotate={3}>
            tap one to learn more →
          </MarginNote>
        </div>

        <div className="skills__grid">
          {skillGroups.map((group) => (
            <Reveal key={group.label} className="skills__card">
              <p className="skills__card-label">{group.label}</p>
              <ul className="skills__tags">
                {group.items.map((item) => {
                  const key = `${group.label}::${item.name}`
                  const isActive = key === activeKey
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        className={`tag skills__tag ${isActive ? 'is-active' : ''}`}
                        aria-pressed={isActive}
                        onClick={() => setActiveKey(isActive ? null : key)}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        <div
          className={`skills__detail ${activeItem ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {activeItem && (
            <>
              <p className="skills__detail-text">{activeItem.detail}</p>
              {activeItem.toolbox && (
                <ul className="skills__toolbox">
                  {activeItem.toolbox.map((service) => (
                    <li key={service} className="tag skills__toolbox-tag">
                      {service}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
