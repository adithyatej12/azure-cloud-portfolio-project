import { useEffect, useState } from 'react'
import './Quotes.css'

const QUOTES = [
  'Simplicity is the ultimate sophistication.',
  'Design is intelligence made visible.',
  'Small steps every day lead to big change.',
  'Creativity takes courage.',
  'Good vibes are contagious — start with your own.',
  'Every pixel has a purpose.',
  'Stay curious. Stay kind. Keep creating.',
  'Progress, not perfection.',
  'The best ideas start as sketches.',
  'Make something people love.',
]

const INTERVAL_MS = 3800

export default function Quotes() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="quotes" aria-live="polite">
      <span className="quotes__mark">“</span>
      <p key={index} className="quotes__text">{QUOTES[index]}</p>
    </div>
  )
}
