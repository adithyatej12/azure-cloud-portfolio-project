import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSageReply, SageError } from './lib/sage.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')

const app = express()
app.use(express.json())
app.use(express.static(distDir))

app.post('/api/chat', async (req, res) => {
  try {
    const reply = await getSageReply({
      message: req.body?.message,
      history: req.body?.history,
      apiKey: process.env.GEMINI_API_KEY,
    })
    res.status(200).json({ reply })
  } catch (err) {
    const status = err instanceof SageError ? err.status : 500
    res.status(status).json({ error: err.message || 'Something went wrong. Please try again.' })
  }
})

// Single-page app: any other GET falls back to index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Sage server listening on port ${port}`)
})
