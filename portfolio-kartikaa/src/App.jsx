import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import { RouterProvider, useLocation } from './router/Router'

function AppRoutes() {
  const path = useLocation()

  if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '').replace(/\/$/, '')
    return <ProjectDetail slug={slug} />
  }

  return <Home />
}

export default function App() {
  return (
    <RouterProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="notebook-rule" aria-hidden="true" />
      <Navbar />
      <AppRoutes />
      <Footer />
    </RouterProvider>
  )
}
