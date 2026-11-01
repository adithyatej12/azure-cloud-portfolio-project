import { prisma } from '../lib/prisma'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log("Seeding Govind Madhav's Portfolio Data...")

  const proofDir = path.join(process.cwd(), "Proof of projects")

  function getReadmeContent(folderName: string, fallback: string): string {
    try {
      const p = path.join(proofDir, folderName, "README.md")
      if (fs.existsSync(p)) {
        return fs.readFileSync(p, "utf-8")
      }
    } catch (e) {
      console.warn(`Could not read README for ${folderName}`, e)
    }
    return fallback
  }

  // 1. Projects
  const projects = [
    {
      title: 'Titan Arena - Tournament Platform',
      slug: 'titan-arena',
      description: 'Distributed esports tournament platform supporting automated match orchestration, player rankings, and tournament lifecycle management.',
      longDesc: getReadmeContent('Titan arena', 'Architected an event-driven backend using Apache Kafka to process system events such as match completion, wallet transactions, and tournament updates. Built a dedicated Java/Spring Boot bracket engine to compute tournament progress independently from the user API for improved scalability. Developed a Node.js gateway API handling authentication, REST routing, and PostgreSQL persistence with Redis-based session and leaderboard caching. Implemented an internal wallet ledger system for secure prize distribution, transaction tracking, and dispute resolution. Delivered a modern React + Vite frontend with real-time tournament dashboards and Dockerized multi-service deployment.'),
      techStack: ['Java', 'Spring Boot', 'Node.js', 'React.js', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Docker'],
      coverImage: '/projects/titan-arena.png',
      liveUrl: '',
      githubUrl: 'https://github.com/Govind-Madhav/Titan-Arena-Project',
      order: 1,
      featured: true
    },
    {
      title: 'Intrusion Detection System',
      slug: 'intrusion-detection-system',
      description: 'High-performance network security platform inspecting packet streams, applying threat detection algorithms, and streaming real-time alerts.',
      longDesc: getReadmeContent('Intrusion-detection-system', 'Implemented secure authentication flows using JWT access tokens, refresh tokens, and session rotation with multi-device session support. Designed a database-agnostic Storage Adapter Pattern allowing authentication across different backends (SQLite, MongoDB, PostgreSQL, Redis). Developed flexible authorization through dynamic claims and policy resolvers supporting RBAC and attribute-based access control models. Integrated external identity providers including OAuth and social logins through a unified authentication interface.'),
      techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Pcap4j', 'WebSockets', 'Vite'],
      coverImage: '/projects/intrusion-detection-system.png',
      liveUrl: '',
      githubUrl: 'https://github.com/Govind-Madhav/Intrusion-detection-system',
      order: 2,
      featured: true
    },
    {
      title: 'Infinity Merge - Privacy-First PDF Processing Tool',
      slug: 'pdf-editor',
      description: 'Browser-based tool for PDF merge, split, compress & reorder — no server, full user privacy.',
      longDesc: getReadmeContent('PDF Editor', 'Developed a privacy-focused browser-based PDF processing tool supporting merging, splitting, compression, and annotation. Implemented client-side document processing using pdf-lib and pdfjs-dist to ensure files remain entirely on the user device. Offloaded heavy operations to Web Workers to maintain responsive UI during large file processing. Built advanced editing capabilities including drag-and-drop page reordering, batch PDF splitting, compression previews, and annotation tools. Implemented Progressive Web App (PWA) support enabling offline usage and installable desktop experience.'),
      techStack: ['React', 'Vite', 'pdf-lib', 'pdfjs-dist', 'Framer Motion', 'Tailwind CSS', 'PWA'],
      coverImage: '/projects/pdf-editor.png',
      liveUrl: '',
      githubUrl: 'https://github.com/Govind-Madhav/Pdf-editor',
      order: 3,
      featured: true
    },
    {
      title: 'AI-Assisted Lung Cancer Detection System',
      slug: 'lung-cancer-detection',
      description: 'Multi-model deep learning clinical support system delivering risk classification and Grad-CAM explainable AI heatmaps.',
      longDesc: getReadmeContent('lung cancer', 'Developing a full-stack AI system for lung cancer detection using CT scan datasets.'),
      techStack: ['Python', 'FastAPI', 'PyTorch', 'React', 'TypeScript', 'Grad-CAM', 'SQLite'],
      coverImage: '/projects/lung-cancer-detection.png',
      liveUrl: '',
      githubUrl: 'https://github.com/Govind-Madhav/Lung-cancer-detection-using-AI',
      order: 4,
      featured: true
    },
    {
      title: 'AuthCore - Universal Authentication Engine',
      slug: 'authcore',
      description: 'Decoupled, plug-and-play authentication engine with storage adapters, claims, policy authorization, and OAuth resolvers.',
      longDesc: getReadmeContent('AUth module', 'Universal decoupled authentication engine featuring identity, session, token, claims, and policy engines.'),
      techStack: ['JavaScript', 'Node.js', 'Express.js', 'JWT', 'Drizzle ORM', 'SQLite'],
      coverImage: '/projects/authcore.png',
      liveUrl: '',
      githubUrl: 'https://github.com/Govind-Madhav/AuthCore',
      order: 5,
      featured: true
    },
    {
      title: 'DBT Project Wallet & Ledger System',
      slug: 'dbt-project-wallet',
      description: 'Full-stack financial wallet application built with modular Auth and Wallet engines, double-entry ledger, and ACID transactions.',
      longDesc: getReadmeContent('DBT project wallet', 'Full-stack financial wallet application built with modular Auth and Wallet engines.'),
      techStack: ['Node.js', 'Express', 'React', 'Vite', 'MySQL', 'Knex.js', 'ACID Transactions'],
      coverImage: '/projects/dbt-project-wallet.png',
      liveUrl: '',
      githubUrl: 'https://github.com/Govind-Madhav/DBT-Project-Wallet',
      order: 6,
      featured: true
    }
  ]

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  // 2. Skills
  const skills = [
    { name: 'Java', level: 90, category: 'Backend', order: 1 },
    { name: 'Spring Boot', level: 85, category: 'Backend', order: 2 },
    { name: 'Node.js', level: 90, category: 'Backend', order: 3 },
    { name: 'Express.js', level: 90, category: 'Backend', order: 4 },
    { name: 'REST API Design', level: 95, category: 'Backend', order: 5 },
    { name: 'React.js', level: 85, category: 'Frontend', order: 6 },
    { name: 'Vite', level: 85, category: 'Frontend', order: 7 },
    { name: 'TypeScript', level: 80, category: 'Frontend', order: 8 },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend', order: 9 },
    { name: 'PostgreSQL', level: 85, category: 'Databases', order: 10 },
    { name: 'MySQL', level: 85, category: 'Databases', order: 11 },
    { name: 'Redis', level: 80, category: 'Databases', order: 12 },
    { name: 'JWT Authentication', level: 90, category: 'Security', order: 13 },
    { name: 'TOTP Authenticator MFA', level: 85, category: 'Security', description: 'Built an MFA system using Authenticator app.', order: 14 },
    { name: 'Docker', level: 85, category: 'Tools', order: 15 },
    { name: 'Apache Kafka', level: 75, category: 'Tools', order: 16 },
    { name: 'Python', level: 80, category: 'AI / ML', order: 17 }
  ]

  for (const s of skills) {
    const existing = await prisma.skill.findFirst({ where: { name: s.name } })
    if (!existing) {
      await prisma.skill.create({ data: s })
    } else {
      await prisma.skill.update({ where: { id: existing.id }, data: s })
    }
  }

  // 3. Resume Settings
  const resumeSettings = [
    { key: 'resume_name', value: 'Govind Madhav' },
    { key: 'resume_title', value: 'Cloud Computing & Backend Developer' },
    { key: 'resume_phone', value: '+91 XXXXX XXXXX' },
    { key: 'resume_email', value: 'govindmadhav003@gmail.com' },
    { key: 'resume_location', value: 'Bengaluru, India' },
    { key: 'resume_photo_url', value: '/profile-photo.png' },
    { key: 'resume_hero_photo_url', value: '/profile-photo.png' },
    { key: 'resume_summary', value: 'MCA student specializing in Cloud Computing with experience building distributed systems, digital platforms, and applied AI solutions. Skilled in backend architecture, event-driven systems, and full-stack development using modern cloud-native technologies.' },
    { key: 'resume_enabled', value: 'true' }
  ]

  for (const rs of resumeSettings) {
    const existing = await prisma.resumeSettings.findFirst({ where: { key: rs.key } })
    if (!existing) {
      await prisma.resumeSettings.create({ data: rs })
    } else {
      await prisma.resumeSettings.update({ where: { id: existing.id }, data: rs })
    }
  }

  // 4. Education
  const educations = [
    {
      degree: 'Master of Computer Applications (MCA)',
      field: 'Cloud Computing',
      institution: 'Jain (Deemed-to-be) University, Bengaluru',
      startYear: '2025',
      endYear: 'Present',
      current: true,
      order: 1
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      field: 'Computer Applications',
      institution: 'Uttaranchal University, Dehradun',
      startYear: '2022',
      endYear: '2025',
      current: false,
      order: 2
    }
  ]

  for (const edu of educations) {
    const existing = await prisma.education.findFirst({ where: { degree: edu.degree } })
    if (!existing) {
      await prisma.education.create({ data: edu })
    } else {
      await prisma.education.update({ where: { id: existing.id }, data: edu })
    }
  }

  // 5. Experience
  const experiences = [
    {
      role: 'Event Management & Logistics Coordinator',
      company: 'IT Utsav 2.0',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-01'),
      current: false,
      description: 'Coordinated logistics, scheduling, and participant flow for technical competitions. Assisted with venue setup and operational planning to ensure smooth event execution.',
      order: 1
    },
    {
      role: 'Head Student Coordinator',
      company: 'IT Utsav 3.0',
      startDate: new Date('2024-01-01'),
      current: false,
      description: 'Led the student coordination team responsible for organizing the college technical festival. Managed event planning, participant engagement, and coordination across multiple competitions.',
      order: 2
    }
  ]

  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({ where: { role: exp.role, company: exp.company } })
    if (!existing) {
      await prisma.experience.create({ data: exp })
    } else {
      await prisma.experience.update({ where: { id: existing.id }, data: exp })
    }
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
