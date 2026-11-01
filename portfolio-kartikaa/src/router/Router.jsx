import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// A minimal client-side router. No external dependency is installed in this
// project, so this implements just enough of the History API pattern
// (path state + pushState/popstate + a Link component) to support a home
// route and per-project detail routes. If react-router-dom is added to the
// project later, this file is the only thing that needs to change — the
// useNavigate/useLocation/Link API mirrors it closely on purpose.

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    const [pathname, hash] = to.split('#')
    const url = hash ? `${pathname}#${hash}` : pathname

    if (replace) {
      window.history.replaceState({}, '', url)
    } else {
      window.history.pushState({}, '', url)
    }
    setPath(pathname || '/')

    // Mimic normal navigation scroll behavior: jump to a hash target if
    // present, otherwise scroll to top of the new page.
    requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    })
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useLocation must be used within a RouterProvider')
  return ctx.path
}

export function useNavigate() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useNavigate must be used within a RouterProvider')
  return ctx.navigate
}

export function Link({ to, children, className, onClick, ...rest }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    // Let modifier-clicks / middle-clicks behave like normal links.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
