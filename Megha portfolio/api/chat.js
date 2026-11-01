import { getSageReply, SageError } from '../lib/sage.js'

export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const reply = await getSageReply({
      message: req.body?.message,
      history: req.body?.history,
      apiKey: process.env.GEMINI_API_KEY,
    })
    return res.status(200).json({ reply })
  } catch (err) {
    const status = err instanceof SageError ? err.status : 500
    return res.status(status).json({ error: err.message || 'Something went wrong. Please try again.' })
  }
}
