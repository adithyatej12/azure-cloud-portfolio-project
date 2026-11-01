import { useEffect, useState } from 'react'
import './RotatingWord.css'

const DEFAULT_WORDS = ['UI/UX Designer', 'Cloud Computing', 'Web Development']

export default function RotatingWord({ words = DEFAULT_WORDS, interval = 2200 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words, interval])

  return (
    <span className="rotating-word">
      <span key={index} className="rotating-word__item">{words[index]}</span>
    </span>
  )
}
