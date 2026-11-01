/**
 * @file app/(public)/about/page.tsx
 * @description About Page showcasing Govind Madhav's engineering background, cloud computing specialization, story, tech stack, and experience.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSiteSettings, getAboutSettings } from "@/lib/settings";
import EchoHero from "@/components/ui/EchoHero";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNestjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiClickhouse,
  SiPrisma,
  SiMongodb,
  SiDocker,
  SiApachekafka,
  SiGit,
  SiPnpm,
  SiTurborepo,
  SiMinio,
  SiSharp,
  SiCplusplus,
  SiGnubash,
  SiJavascript,
  SiNginx,
  SiTailscale,
  SiTerraform,
  SiJenkins,
  SiLinux,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const techIcons: Record<string, React.ReactNode> = {
  "AWS": <FaAws />,
  "Terraform": <SiTerraform />,
  "Jenkins": <SiJenkins />,
  "Linux": <SiLinux />,
  "Next.js": <SiNextdotjs />,
  "React": <SiReact />,
  "TypeScript": <SiTypescript />,
  "Tailwind CSS": <SiTailwindcss />,
  "Framer Motion": <SiFramer />,
  "NestJS": <SiNestjs />,
  "Node.js": <SiNodedotjs />,
  "Express": <SiExpress />,
  "PostgreSQL": <SiPostgresql />,
  "Redis": <SiRedis />,
  "ClickHouse": <SiClickhouse />,
  "Prisma": <SiPrisma />,
  "MongoDB": <SiMongodb />,
  "Docker": <SiDocker />,
  "Kafka": <SiApachekafka />,
  "Git": <SiGit />,
  "pnpm": <SiPnpm />,
  "Turborepo": <SiTurborepo />,
  "MinIO": <SiMinio />,
  "C#": <SiSharp />,
  "C++": <SiCplusplus />,
  "Bash": <SiGnubash />,
  "JavaScript": <SiJavascript />,
  "Nginx": <SiNginx />,
  "Tailscale": <SiTailscale />,
  "Java": <span className="font-bold text-amber">☕</span>,
  "Spring Boot": <span className="font-bold text-emerald-400">🌱</span>,
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Govind Madhav",
  description: "Learn more about Govind Madhav - Cloud Computing MCA student, Backend & Distributed Systems Engineer.",
};

interface DomainBlock {
  domain: string;
  skills: string[];
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse" />
      <span className="font-inter font-bold text-[12px] tracking-[0.2em] text-amber uppercase">
        {text}
      </span>
    </div>
  );
}

const MarkdownComponents = {
  p: ({ children }: any) => (
    <p className="font-inter font-normal text-[16px] leading-[1.85] text-zinc-300 mb-6 text-left">
      {children}
    </p>
  ),
  h1: ({ children }: any) => (
    <h2 className="font-syne font-bold text-3xl text-white mt-10 mb-4 uppercase text-left tracking-tight">
      {children}
    </h2>
  ),
  h2: ({ children }: any) => (
    <h2 className="font-syne font-bold text-2xl text-amber mt-8 mb-4 uppercase text-left tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="font-syne font-bold text-xl text-white mt-6 mb-3 uppercase text-left">
      {children}
    </h3>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-amber hover:underline font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-left text-zinc-300 font-inter text-[15px]">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-left text-zinc-300 font-inter text-[15px]">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="font-inter text-[15px] leading-[1.8] text-zinc-300">
      {children}
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
};

function formatCtaLink(val: string): string {
  const trimmed = val.trim();
  if (trimmed.includes("@") && !trimmed.includes("http") && !trimmed.startsWith("mailto:")) {
    return `mailto:${trimmed}`;
  }
  return trimmed;
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const about = await getAboutSettings();

  const siteName = settings.siteName || "Govind Madhav";
  const avatarUrl = about.about_avatar_url || settings.profilePhotoUrl || "/profile-photo.png";

  // Parse stack JSON with fallbacks
  let stackList: DomainBlock[] = [];
  try {
    const parsed = JSON.parse(about.about_stack);
    if (Array.isArray(parsed) && parsed.length > 0) {
      stackList = parsed;
    }
  } catch {
    stackList = [];
  }

  if (stackList.length === 0) {
    stackList = [
      {
        domain: "Backend & Cloud",
        skills: ["Java", "Spring Boot", "Node.js", "Express", "NestJS", "C++"],
      },
      {
        domain: "Frontend & Web UIs",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        domain: "Databases & Caching",
        skills: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "Docker", "Kafka"],
      },
      {
        domain: "Tools & DevOps",
        skills: ["Git", "Bash", "Nginx", "Tailscale"],
      },
    ];
  }

  const skillsArray = stackList.flatMap((block) => block.skills);
  const socialLinks = [
    settings.socialGithub,
    settings.socialLinkedin,
    settings.socialTwitter,
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": siteName,
      "description": about.about_hero_tagline || settings.tagline,
      "image": avatarUrl,
      "email": settings.socialEmail || undefined,
      "knowsAbout": skillsArray,
      "sameAs": socialLinks,
    },
  };

  const engineeringPillars = [
    {
      num: "01",
      title: "Distributed Systems & APIs",
      desc: "Architecting high-throughput RESTful APIs, event-driven messaging pipelines, and scalable microservices using Java, Spring Boot, Node.js, and Express.",
      color: "border-amber/30 text-amber",
    },
    {
      num: "02",
      title: "Cloud Infrastructure & DBs",
      desc: "Designing persistent storage schemas with PostgreSQL, Redis caching layers, MongoDB, and containerizing full-stack environments using Docker.",
      color: "border-emerald-500/30 text-emerald-400",
    },
    {
      num: "03",
      title: "Modern Web UIs & Applied AI",
      desc: "Building lightning-fast, accessible web interfaces with Next.js, React, and TypeScript while integrating AI models and automated workflow engines.",
      color: "border-blue-500/30 text-blue-400",
    },
    {
      num: "04",
      title: "Technical Leadership & Events",
      desc: "Coordinating student initiatives, developer hackathons, and technical symposiums connecting academic innovation with industry practices.",
      color: "border-purple-500/30 text-purple-400",
    },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-left text-zinc-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* SECTION 1: Background Animation */}
      <EchoHero />

      {/* Hero Content Section */}
      <section className="relative pt-12 pb-20 w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-inter text-xs font-semibold tracking-wider uppercase">
            Available for Cloud & Full Stack Engineering Opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Tagline */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            <h1 className="font-syne font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white uppercase leading-[0.95] tracking-tight">
              CLOUD COMPUTING & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-orange-500">
                BACKEND ARCHITECT
              </span>
            </h1>

            <p className="font-inter font-normal text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
              {about.about_hero_tagline || "MCA student specializing in Cloud Computing at Jain University, Bengaluru. Building resilient backend microservices, distributed infrastructure, and applied AI systems."}
            </p>

            {/* Feature Stat Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 font-mono text-xs text-zinc-300">
                🎓 MCA Cloud Computing
              </div>
              <div className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 font-mono text-xs text-amber">
                ⚡ Distributed Systems
              </div>
              <div className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 font-mono text-xs text-emerald-400">
                🚀 Full-Stack Engineering
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              {about.about_cta_text && about.about_cta_email && (
                <Link
                  href={formatCtaLink(about.about_cta_email)}
                  className="inline-flex items-center justify-center font-inter font-semibold text-sm bg-amber text-black px-8 py-4 rounded-xl transition-all hover:bg-amber/90 active:scale-95 uppercase whitespace-nowrap shadow-lg shadow-amber/20"
                >
                  {about.about_cta_text} →
                </Link>
              )}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center font-inter font-semibold text-sm border border-zinc-800 bg-zinc-900/80 text-white px-8 py-4 rounded-xl transition-all hover:border-zinc-600 hover:bg-zinc-800 select-none uppercase whitespace-nowrap"
              >
                Explore Projects
              </Link>
            </div>
          </div>

          {/* Right Column: Avatar Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-3 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#080808]">
                <Image
                  src={avatarUrl}
                  alt={siteName}
                  fill
                  className="object-cover object-top transition-all duration-700 hover:scale-105"
                  priority
                  unoptimized={true}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Engineering Pillars (4 Grid Cards) */}
      <section className="py-20 bg-[#0a0a0a] border-t border-b border-zinc-900 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="ENGINEERING PILLARS" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringPillars.map((pillar) => (
              <div
                key={pillar.num}
                className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col justify-between group space-y-4 shadow-xl"
              >
                <div>
                  <span className={`font-mono text-sm font-bold block mb-4 ${pillar.color}`}>
                    [{pillar.num}]
                  </span>
                  <h3 className="font-syne font-bold text-xl text-white uppercase mb-3 tracking-tight group-hover:text-amber transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: The Story & Background */}
      {about.about_story && (
        <section className="py-24 px-6 md:px-12 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Story Main Content */}
            <div className="lg:col-span-8 space-y-6">
              <SectionLabel text="THE STORY" />
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                  {about.about_story}
                </ReactMarkdown>
              </div>
            </div>

            {/* Sidebar Overview Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-6 shadow-xl">
                <h3 className="font-syne font-bold text-lg text-white uppercase tracking-tight border-b border-zinc-800 pb-4">
                  Quick Facts
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">LOCATION</span>
                    <span className="text-white font-bold text-sm">Bengaluru, India 🇮🇳</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">DEGREE / SPECIALIZATION</span>
                    <span className="text-amber font-bold text-sm">MCA (Cloud Computing)</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">INSTITUTION</span>
                    <span className="text-white font-bold text-sm">Jain University</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">CORE STACK</span>
                    <span className="text-emerald-400 font-bold text-sm">Java, Spring Boot, Node.js, Next.js, React, Postgres, Docker</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <a
                    href="mailto:govindmadhav003@gmail.com"
                    className="w-full inline-flex items-center justify-center py-3 rounded-xl border border-amber/40 bg-amber/10 text-amber font-inter font-semibold text-xs uppercase hover:bg-amber hover:text-black transition-all"
                  >
                    Send Direct Email →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* SECTION 4: Technical Arsenal / Stack */}
      {stackList.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-b border-zinc-900">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
              <div>
                <SectionLabel text="TECHNICAL ARSENAL" />
                <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  TECH STACK & TOOLS
                </h2>
              </div>
              <p className="font-inter text-sm text-zinc-400 max-w-md">
                Production-tested tools and frameworks used across backend infrastructure, cloud services, and frontend platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stackList.map((block, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-amber/40 transition-colors duration-300 space-y-6 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <h3 className="font-syne font-bold text-lg text-amber uppercase tracking-wider">
                      {block.domain}
                    </h3>
                    <span className="font-mono text-xs text-zinc-500">
                      {block.skills.length} Items
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {block.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="group inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/80 px-4 py-2 rounded-xl text-xs text-zinc-300 font-mono hover:border-amber hover:text-amber transition-colors duration-200"
                      >
                        {techIcons[skill] && (
                          <span className="text-sm text-emerald-400 group-hover:text-amber transition-colors">
                            {techIcons[skill]}
                          </span>
                        )}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: Currently & Journey */}
      {about.about_currently && (
        <section className="py-24 px-6 md:px-12 bg-[#050505]">
          <div className="max-w-7xl mx-auto space-y-8">
            <SectionLabel text="CURRENT FOCUS" />
            <div className="p-8 md:p-12 rounded-3xl border border-amber/30 bg-amber-500/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <h3 className="font-syne font-bold text-2xl md:text-3xl text-white uppercase tracking-tight">
                  Current Pursuits & Active Building
                </h3>
                <div className="font-inter text-base text-zinc-300 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                    {about.about_currently}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: Beyond Code */}
      {about.about_beyond_code && (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto space-y-8">
            <SectionLabel text="BEYOND CODE" />
            <div className="p-8 md:p-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 space-y-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                {about.about_beyond_code}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: CTA Banner */}
      {about.about_cta_text && about.about_cta_email && (
        <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-t border-zinc-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8 relative z-10">
            <div className="w-12 h-12 rounded-full border border-amber/40 bg-amber/10 flex items-center justify-center text-amber text-xl">
              🚀
            </div>
            
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight tracking-tight">
              {about.about_cta_text}
            </h2>

            <p className="font-inter text-zinc-400 text-base max-w-xl">
              Interested in collaborating, discussing cloud architecture, or exploring software engineering opportunities? Reach out anytime!
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link
                href={formatCtaLink(about.about_cta_email)}
                className="inline-flex items-center justify-center font-inter font-semibold text-sm bg-amber text-black px-9 py-4 rounded-xl transition-all hover:bg-amber/90 active:scale-95 uppercase whitespace-nowrap shadow-xl shadow-amber/20"
              >
                Get In Touch →
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center font-inter font-semibold text-sm border border-zinc-800 bg-zinc-900 text-white px-9 py-4 rounded-xl transition-all hover:border-zinc-600 uppercase whitespace-nowrap"
              >
                View Selected Projects
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
