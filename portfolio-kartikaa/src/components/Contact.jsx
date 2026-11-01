import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import MarginNote from './MarginNote'
import './Contact.css'

const CONTACTS = [
  {
    label: 'Email',
    value: 'karnatarajan23@gmail.com',
    href: 'mailto:karnatarajan23@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kartikaa-natarajan',
    href: 'https://linkedin.com/in/kartikaa-natarajan',
  },
  {
    label: 'GitHub',
    value: 'github.com/kartikaa-natarajan',
    href: 'https://github.com/kartikaa-natarajan',
  },
]

export default function Contact() {
  const ref = useScrollReveal()

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.')
      }

      setStatus('Message received successfully.')
      setForm({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      setStatus(
        error.message || 'Unable to send your message. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div ref={ref} className="reveal contact__inner">
          <p className="eyebrow">Contact</p>

          <h2 className="section-heading contact__heading">
            Let's build something interesting.
            <MarginNote className="contact__scribble" rotate={-8}>
              ✎
            </MarginNote>
          </h2>

          <p className="contact__sub">
            Have a project, opportunity, or just want to say hi?
          </p>

          <ul className="contact__list">
            {CONTACTS.map((c) => (
              <li key={c.label} className="contact__item">
                <a
                  href={c.href}
                  target={c.label === 'Email' ? undefined : '_blank'}
                  rel={c.label === 'Email' ? undefined : 'noreferrer'}
                  className="contact__link"
                >
                  <span className="contact__label">{c.label}</span>
                  <span className="contact__value">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>

          <MarginNote className="contact__connect" rotate={3}>
            let's connect →
          </MarginNote>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me a little about your project..."
                rows="5"
                required
              />
            </div>

            <button
              type="submit"
              className="contact__submit"
              disabled={submitting}
            >
              {submitting ? 'sending...' : 'send message →'}
            </button>

            {status && (
              <p className="contact__status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}