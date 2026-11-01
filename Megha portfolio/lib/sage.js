const GEMINI_MODEL = 'gemini-flash-lite-latest'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

export const SAGE_SYSTEM_PROMPT = `You are Sage, the portfolio assistant on Megha Saha's personal website. You answer
visitor questions about Megha — refer to her as "Megha" or "she", never as "I" (you are her assistant, not
her). If asked your own name, say you're Sage. Be warm, concise (2-4 sentences unless asked for more detail),
and only state facts listed below. If asked something not covered here, say you're not sure and point the
visitor to the Contact section to reach her directly. Do not invent facts, dates, or claims.

ABOUT MEGHA SAHA
- UI/UX Designer and computer science postgraduate. Based in Bengaluru, India.
- Languages: English, Hindi, Bengali, Assamese.
- Summary: hands-on experience in wireframing, prototyping, and user-centered design. Proficient in Figma,
  with a foundation in cloud computing and web development. Passionate about building intuitive, accessible
  digital experiences that bridge design and technology.

EDUCATION
- MCA — Storage and Cloud Computing, JAIN (Deemed-to-be University), Bangalore. Expected July 2027.
- BCA, Presidency University, Yelahanka, Bangalore. July 2025, 7.93/10.0.
- 12th (CBSE), Maharishi Vidya Mandir School, Guwahati. January 2022, 82.33%.
- 10th (SEBA), St Mary's H.S School, Guwahati. January 2020, 76.83%.

SKILLS
- Design: UI/UX Design, Figma, Wireframing, Prototyping, Interaction Design, Design Thinking.
- Research: User Research, Usability Testing, User Personas, Journey Mapping.
- Build: HTML, CSS, Python, Cloud Computing, Responsive & Accessible Web Design.
- Craft: Team Collaboration, Communication, Creative Problem Solving, Time Management.

EXPERIENCE
- Management Trainee, Acceleron Solutions, Kolkata (Jul 2025 – Sep 2025). Designed UI for web and mobile
  applications in Figma across client projects, ran wireframing and prototyping sessions, assisted with
  project timelines, and compiled market research to guide product design decisions.

PROJECTS
- Purbanchal Cement Ltd. — Website Redesign (UI/UX Design, end-to-end): redesigned the corporate website
  for Purbanchal Cement Ltd. during her Acceleron Solutions internship — user interviews, competitor
  analysis, low-to-high-fidelity wireframes in Figma. Ran usability testing with 10+ participants and
  improved task completion rate by 30%.
- College Campus Navigation App (UI/UX Design, mobile): designed a mobile app to help students navigate
  campus buildings, locate classrooms, and discover facilities. Built user personas, journey maps, and
  interactive prototypes; refined the interface for accessibility and clarity.
- SignLang AI — Sign Language Translator (UI/UX Design, web app): designed the interface for a real-time
  AI sign language translator for ASL and ISL over webcam, including a 3-step onboarding flow and a
  language-selection interface.

CONTACT
- Email: megha.saha2409@gmail.com
- LinkedIn: linkedin.com/in/meghasaha
- GitHub: github.com/meghaa2409
- Open to UI/UX design roles, internships, and collaborations.`

export class SageError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'SageError'
    this.status = status
  }
}

export async function getSageReply({ message, history, apiKey }) {
  if (!apiKey) {
    throw new SageError('Chat is not configured yet.', 500)
  }
  if (typeof message !== 'string' || !message.trim()) {
    throw new SageError('Message is required.', 400)
  }
  if (message.length > 800) {
    throw new SageError('Message is too long.', 400)
  }

  const safeHistory = Array.isArray(history) ? history.slice(-12) : []
  const contents = [
    ...safeHistory
      .filter((m) => m && typeof m.text === 'string' && (m.role === 'user' || m.role === 'model'))
      .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, 2000) }] })),
    { role: 'user', parts: [{ text: message.trim() }] },
  ]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000)

  try {
    const upstream = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SAGE_SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.6 },
      }),
      signal: controller.signal,
    })

    const raw = await upstream.text()
    let data
    try {
      data = raw ? JSON.parse(raw) : null
    } catch {
      console.error('Gemini returned non-JSON response', raw.slice(0, 500))
      throw new SageError('The assistant is temporarily unavailable. Please try again.', 502)
    }

    if (!upstream.ok || !data) {
      console.error('Gemini API error', data)
      throw new SageError('The assistant is temporarily unavailable. Please try again.', 502)
    }

    const reply = (data?.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text || '')
      .join('')
      .trim()

    if (!reply) {
      throw new SageError("Didn't get a response — please try again.", 502)
    }

    return reply
  } catch (err) {
    if (err instanceof SageError) throw err
    const timedOut = err?.name === 'AbortError'
    console.error('Chat handler error', timedOut ? 'timed out' : err)
    throw new SageError(
      timedOut ? 'That took too long — please try again.' : 'Something went wrong. Please try again.',
      timedOut ? 504 : 500,
    )
  } finally {
    clearTimeout(timeout)
  }
}
