import './MarginNote.css'

/**
 * A small handwritten-style note, meant to sit near a heading or element
 * like a margin annotation in a notebook. `rotate` lets each usage feel
 * placed by hand rather than perfectly aligned.
 */
export default function MarginNote({ children, rotate = -3, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`margin-note ${className}`}
      style={{ '--rotate': `${rotate}deg` }}
    >
      {children}
    </Tag>
  )
}
