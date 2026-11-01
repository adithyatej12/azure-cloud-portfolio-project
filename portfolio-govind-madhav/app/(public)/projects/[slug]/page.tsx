/**
 * @file app/(public)/projects/[slug]/page.tsx
 * @description Next.js route view page or layout component for page.tsx.
 * 
 * @exports
 * - ProjectDetailPage (default): Main React component or function
 * - generateMetadata(): Function
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { extractTwitterUsername } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getOrCreateShortLink } from "@/lib/shortener";

interface Props {
  params: Promise<{ slug: string }>;
}

import { getProjectReadme } from "@/lib/project-readmes";
import MermaidDiagram from "@/components/ui/MermaidDiagram";
import ProjectGallery from "@/components/ui/ProjectGallery";
import galleryData from "@/lib/project-gallery-data.json";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);
  
  if (!project) return { title: "Project not found" };

  const twitterHandle = extractTwitterUsername(settings.socialTwitter);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://govind-madhav.site").replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}/projects/${slug}`;
  const title = `${project.title} — Open Source Project`;
  const description = project.description;

  const ogImageUrl = project.coverImage
    ? `${siteUrl}/_next/image?url=${encodeURIComponent(project.coverImage)}&w=1200&q=75`
    : `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      url: canonicalUrl,
      title,
      description,
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${description.slice(0, 50)}...`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: twitterHandle,
      creator: twitterHandle,
      images: [ogImageUrl],
    },
  };
}

const VALID_PROJECT_SCREENSHOTS: Record<string, string> = {
  "titan-arena": "/projects/titan-arena.png",
  "intrusion-detection-system": "/projects/intrusion-detection-system.png",
  "pdf-editor": "/projects/pdf-editor.png",
  "lung-cancer-detection": "/projects/lung-cancer-detection.png",
  "authcore": "/projects/authcore.png",
  "dbt-project-wallet": "/projects/dbt-project-wallet.png",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const coverImage = project.coverImage || VALID_PROJECT_SCREENSHOTS[project.slug] || null;
  const fullReadme = getProjectReadme(project.slug, project.longDesc);

  const gitShortCode = project.githubUrl
    ? await getOrCreateShortLink(`${project.githubUrl}?utm_source=project_detail`, "link", undefined, project.id)
    : null;

  const liveShortCode = project.liveUrl
    ? await getOrCreateShortLink(`${project.liveUrl}?utm_source=project_detail`, "link", undefined, project.id)
    : null;

  const trackedGithubUrl = gitShortCode ? `/s/${gitShortCode}` : project.githubUrl;
  const trackedLiveUrl = liveShortCode ? `/s/${liveShortCode}` : project.liveUrl;

  const allProjects = await prisma.project.findMany({
    select: { slug: true, title: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-bg w-full flex flex-col justify-between" style={{ background: "#0a0a0a" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.title,
            "description": project.description,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "All",
            "downloadUrl": project.githubUrl || undefined,
            "author": {
              "@type": "Person",
              "name": "Govind Madhav",
              "url": "https://govind-madhav.site"
            }
          }),
        }}
      />
      {/* Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[380px] overflow-hidden bg-[#0d0d0d] border-b border-zinc-800">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={project.title}
            fill
            className="object-cover object-top opacity-80"
            priority
            unoptimized={true}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-zinc-900 to-[#0a0a0a] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_70%)]" />
            <span className="font-syne font-extrabold text-[15vw] text-amber/10 select-none uppercase">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.2) 100%)",
          }}
        />
        <Link
          href="/projects"
          className="absolute top-6 left-[max(2rem,5vw)] z-10 font-inter font-medium text-[13px] text-white/70 hover:text-amber transition-colors duration-200"
        >
          ← Back to Projects
        </Link>
        <h1 className="absolute bottom-8 left-[max(2rem,5vw)] z-10 font-syne font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-white uppercase max-w-[90%] text-left">
          {project.title}
        </h1>
      </section>

      {/* Content Section */}
      <article className="w-full max-w-[920px] mx-auto px-[max(2rem,5vw)] py-12 flex-grow">
        {/* Top Meta Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <p className="font-inter font-normal text-[16px] text-zinc-300 max-w-[580px] text-left leading-relaxed">
            {project.description}
          </p>
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto self-start md:self-auto">
              {project.liveUrl && (
                <a
                  href={trackedLiveUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-inter font-semibold text-[14px] border border-amber bg-amber text-black hover:bg-transparent hover:text-white px-6 py-3 transition-colors duration-200 uppercase whitespace-nowrap min-h-[44px] cursor-pointer shadow-lg shadow-amber/20"
                >
                  Live Demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={trackedGithubUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-inter font-semibold text-[14px] text-amber hover:text-white hover:underline px-4 py-3 transition-colors duration-200 uppercase whitespace-nowrap min-h-[44px] cursor-pointer"
                >
                  Source on GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mt-8">
          <span className="font-inter font-semibold text-[11px] tracking-[0.15em] text-zinc-400 mb-3 block text-left uppercase">
            TECH STACK & INFRASTRUCTURE
          </span>
          <div className="flex flex-wrap gap-2 justify-start">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono font-medium text-[12px] text-emerald-400 bg-zinc-900/80 border border-emerald-500/30 px-3 py-1.5 rounded-lg tracking-wider whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Screenshots Gallery */}
        {(() => {
          const projectGalleryMap = galleryData as Record<string, string[]>;
          const galleryImages = projectGalleryMap[project.slug] || (coverImage ? [coverImage] : []);
          return <ProjectGallery images={galleryImages} title={project.title} />;
        })()}

        {/* Divider */}
        <div className="w-full h-[1px] bg-zinc-800 my-10" />

        {/* Long Description / Content */}
        {fullReadme && (
          <div className="font-inter font-normal text-[15px] leading-[1.8] text-zinc-300 text-left space-y-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-amber mt-12 mb-6 uppercase tracking-tight border-b border-zinc-800 pb-3">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h2 className="font-syne font-bold text-xl sm:text-2xl text-amber mt-10 mb-4 uppercase tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-syne font-bold text-lg text-white mt-8 mb-3 uppercase tracking-wide">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 leading-[1.85] text-zinc-300">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="p-4 rounded-xl border-l-4 border-amber bg-amber-500/5 my-6 text-zinc-200 italic font-inter">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8 border border-zinc-800 rounded-xl bg-zinc-900/40">
                    <table className="w-full text-left font-inter text-xs border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-zinc-900 border-b border-zinc-800 text-amber font-mono text-xs uppercase tracking-wider">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="p-3.5 font-bold uppercase tracking-wider border-b border-zinc-800">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-3.5 font-mono text-xs">
                    {children}
                  </td>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2.5 my-5 text-zinc-300 font-inter">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2.5 my-5 text-zinc-300 font-inter">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="font-inter text-[15px] leading-[1.75]">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-zinc-900 text-emerald-400 border border-zinc-800 px-2 py-0.5 font-mono text-xs rounded-md">
                        {children}
                      </code>
                    );
                  }
                  const codeStr = String(children || "").trim();
                  const isMermaid = className?.includes("mermaid") || codeStr.startsWith("graph") || codeStr.startsWith("flowchart") || codeStr.startsWith("sequenceDiagram");

                  if (isMermaid) {
                    return <MermaidDiagram code={codeStr} />;
                  }

                  return (
                    <div className="my-6">
                      <pre className="bg-[#0b0c10] border border-zinc-800 p-5 overflow-x-auto rounded-xl font-mono text-xs text-zinc-300 shadow-2xl">
                        <code className={className}>{children}</code>
                      </pre>
                    </div>
                  );
                },
              }}
            >
              {fullReadme}
            </ReactMarkdown>
          </div>
        )}
      </article>

      {/* Bottom Navigation */}
      <nav className="w-full border-t border-border py-8 px-[max(2rem,5vw)] flex justify-between items-center bg-bg">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="font-inter font-medium text-[13px] text-text-muted hover:text-amber transition-colors duration-200"
          >
            ← Previous Project
          </Link>
        ) : (
          <span />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="font-inter font-medium text-[13px] text-text-muted hover:text-amber transition-colors duration-200"
          >
            Next Project →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
