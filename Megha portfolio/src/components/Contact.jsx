import { MailIcon, LinkedinIcon, GithubIcon, ArrowUpRight } from './icons.jsx'
import './Contact.css'

export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__inner">
        <span className="eyebrow">Contact</span>
        <h2 className="contact__title">Let's create something intuitive together.</h2>
        <p className="contact__lede">
          Open to UI/UX design roles, internships, and collaborations. Reach out and I'll get
          back to you.
        </p>

        <div className="contact__actions">
          <a className="btn btn--pearl" href="mailto:megha.saha2409@gmail.com">
            <MailIcon size={16} /> megha.saha2409@gmail.com
          </a>
        </div>

        <div className="contact__socials">
          <a href="https://linkedin.com/in/meghasaha" target="_blank" rel="noreferrer">
            <LinkedinIcon /> LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href="https://github.com/meghaa2409" target="_blank" rel="noreferrer">
            <GithubIcon /> GitHub <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="shell contact__footer">
        <span>© {year} Megha Saha</span>
        <span className="contact__footer-langs">English · Hindi · Bengali · Assamese</span>
      </div>
    </section>
  )
}
