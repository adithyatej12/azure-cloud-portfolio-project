import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Publication from '../components/Publication'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Publication />
      <Contact />
    </main>
  )
}
