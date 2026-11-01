import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme.jsx'
import RotatingWord from './RotatingWord.jsx'
import './Hero.css'

const HERO_VIDEO_DARK = '/hero.mp4'
const HERO_VIDEO_LIGHT = '/hero-light.mp4'

export default function Hero() {
  const { theme } = useTheme()
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  // The video that's actually showing right now — separate from `theme`,
  // since the light-mode clip falls back to the dark one until it exists.
  const [src, setSrc] = useState(theme === 'light' ? HERO_VIDEO_LIGHT : HERO_VIDEO_DARK)
  // Which visual treatment (scrim/text) is applied — only flips to 'light'
  // once that video has actually loaded successfully.
  const [variant, setVariant] = useState('dark')

  useEffect(() => {
    const wanted = theme === 'light' ? HERO_VIDEO_LIGHT : HERO_VIDEO_DARK
    setReady(false)
    setSrc(wanted)
    if (wanted === HERO_VIDEO_DARK) setVariant('dark')
  }, [theme])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const play = video.play()
    if (play?.catch) play.catch(() => {})
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      setReady(true)
    }
  }, [src])

  const handleCanPlay = () => {
    setReady(true)
    setVariant(src === HERO_VIDEO_LIGHT ? 'light' : 'dark')
  }

  const handleError = () => {
    if (src === HERO_VIDEO_LIGHT) {
      setSrc(HERO_VIDEO_DARK)
      setVariant('dark')
    }
  }

  return (
    <section className={`hero hero--${variant}`} id="top">
      <div className="hero__media" aria-hidden="true">
        <video
          key={src}
          ref={videoRef}
          className={`hero__video ${ready ? 'is-ready' : ''}`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onError={handleError}
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__body shell">
        <h1 className="hero__title">
          <span className="hero__title-lead"><RotatingWord /></span>
          Designing Interfaces People Trust.
        </h1>
        <p className="hero__intro">
          I'm Megha Saha — an innovative designer building intuitive, accessible digital
          experiences end to end.
        </p>
        <a className="btn btn--pearl hero__cta" href="#projects">View My Work</a>
      </div>

      <div className="hero__foot shell">
        <article className="card card--note">
          <h2>Designing With Purpose</h2>
          <p>From wireframes to usability-tested prototypes, I craft digital experiences that bridge design and technology.</p>
        </article>
      </div>
    </section>
  )
}
