import { useEffect, useRef, useState } from 'react'
import { CloseIcon, SendIcon } from './icons.jsx'
import VoiceOrb from './VoiceOrb.jsx'
import './ChatWidget.css'

const GREETING = "Hey, I'm Sage — I can answer questions about Megha's work, skills, and experience. Ask me anything."
const BUBBLE_TEXT = "Hey, I'm Sage. Need help?"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [messages, setMessages] = useState([{ role: 'model', text: GREETING }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => setShowBubble(true), 1200)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading, open])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', text }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(0, -1),
        }),
      })

      const raw = await res.text()
      let data
      try {
        data = raw ? JSON.parse(raw) : null
      } catch {
        data = null
      }

      if (!res.ok || !data) {
        throw new Error(data?.error || "Sage couldn't respond just now — please try again.")
      }
      setMessages((prev) => [...prev, { role: 'model', text: data.reply }])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Sage">
          <div className="chat-panel__head">
            <span>Sage · Megha's Assistant</span>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
              <CloseIcon size={16} />
            </button>
          </div>

          <div className="chat-panel__body" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble--model chat-bubble--loading">
                <span />
                <span />
                <span />
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
          </div>

          <form className="chat-panel__form" onSubmit={send}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={800}
              aria-label="Your message"
            />
            <button type="submit" aria-label="Send" disabled={loading || !input.trim()}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      {showBubble && !open && (
        <div className="chat-bubble-hint">
          {BUBBLE_TEXT}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation()
              setShowBubble(false)
            }}
          >
            <CloseIcon size={12} />
          </button>
        </div>
      )}

      <button
        type="button"
        className="chat-toggle"
        aria-expanded={open}
        aria-label={open ? 'Close chat' : "Chat with Sage, Megha's assistant"}
        onClick={() => {
          setOpen((v) => !v)
          setShowBubble(false)
        }}
      >
        {open ? <CloseIcon /> : <VoiceOrb className="chat-toggle__orb" hue={320} />}
      </button>
    </div>
  )
}
