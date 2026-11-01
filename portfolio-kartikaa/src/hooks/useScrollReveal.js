import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref and adds
 * `is-visible` once the element enters the viewport. Pair with the
 * `.reveal` utility class in global.css.
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced motion: reveal immediately without observing.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}
