import useScrollReveal from '../hooks/useScrollReveal'

/**
 * Wraps a single element with its own IntersectionObserver so lists of
 * cards/items each reveal independently as they enter the viewport,
 * rather than sharing one observer that only the container fires.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', style, ...rest }) {
  const ref = useScrollReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  )
}
