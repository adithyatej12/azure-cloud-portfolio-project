"use client";

/**
 * @file components/ui/HeroSection.tsx
 * @description React component for HeroSection.tsx under the ui category.
 * 
 * @exports
 * - HeroSection (default): Main React component or function
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { animate } from "animejs";
import Link from "next/link";
import Image from "next/image";
import HeroPhoto from "./HeroPhoto";

interface HeroSectionProps {
  siteName: string;
  heroPhotoUrl: string;
  heroTagline: string;
  socialGithub?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
}

export default function HeroSection({
  siteName,
  heroPhotoUrl,
  heroTagline,
  socialGithub = "",
  socialLinkedin = "",
  socialTwitter = "",
}: HeroSectionProps) {
  const solidH1Ref = useRef<HTMLHeadingElement>(null);
  const strokeH1Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const amberRectRef = useRef<HTMLDivElement>(null);
  const greenRectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP text animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }, containerRef);

    // Anime.js floating shapes
    if (amberRectRef.current) {
      animate(amberRectRef.current, {
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 2000,
        ease: "outElastic(1, .5)",
        delay: 500,
      });
    }

    if (greenRectRef.current) {
      animate(greenRectRef.current, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 2000,
        ease: "outElastic(1, .5)",
        delay: 800,
      });
    }

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (solidH1Ref.current) {
      solidH1Ref.current.style.setProperty("--mouse-x", `${x}px`);
      solidH1Ref.current.style.setProperty("--mouse-y", `${y}px`);
      solidH1Ref.current.style.setProperty("--spotlight-radius", "100px");
    }
    if (strokeH1Ref.current) {
      strokeH1Ref.current.style.setProperty("--mouse-x", `${x}px`);
      strokeH1Ref.current.style.setProperty("--mouse-y", `${y}px`);
      strokeH1Ref.current.style.setProperty("--spotlight-radius", "100px");
    }
  };

  const handleMouseLeave = () => {
    if (solidH1Ref.current) {
      solidH1Ref.current.style.setProperty("--spotlight-radius", "0px");
    }
    if (strokeH1Ref.current) {
      strokeH1Ref.current.style.setProperty("--spotlight-radius", "0px");
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-bg flex flex-col justify-between pt-20 md:pt-24 overflow-visible" style={{ background: "#0a0a0a" }}>
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12 w-full flex items-center relative overflow-visible min-h-[calc(100vh-160px)] h-auto md:h-[78vh] max-h-[900px]">
        
        {/* Left Side: Typography & CTA */}
        <div className="w-full md:w-[52%] lg:w-[55%] flex flex-col justify-center py-8 md:py-0 text-left min-h-[calc(100vh-160px)] h-auto md:h-[78vh] relative z-20 md:pr-2 lg:pr-4">

          {/* Main Heading */}
          <h1 
            ref={solidH1Ref}
            className="font-syne font-extrabold text-[clamp(1.8rem,8.5vw,3.6rem)] md:text-[clamp(2.6rem,4vw,4.4rem)] lg:text-[clamp(3.2rem,4.4vw,5rem)] xl:text-[clamp(3.5rem,4.6vw,5.5rem)] leading-[0.95] tracking-tight uppercase flex flex-col cursor-default select-none relative w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              "--mouse-x": "0px",
              "--mouse-y": "0px",
              "--spotlight-radius": "0px",
            } as React.CSSProperties}
          >
            <span className="text-text-primary block hero-anim-item">
              I BUILD
            </span>
            <span className="text-text-primary block hero-anim-item">
              SOLUTIONS
            </span>
            <span className="pl-0 md:pl-8 lg:pl-12 text-amber block hero-anim-item">
              THAT
            </span>
            <span className="pl-0 md:pl-8 lg:pl-12 text-amber block hero-anim-item">
              SCALE.
            </span>
          </h1>

          {/* Name & Border Line */}
          <div className="mt-8 pl-3 border-l-[3px] border-amber hero-anim-item">
            <span className="font-inter font-medium text-[14px] text-text-muted tracking-[0.1em]">
              {siteName || "Govind Madhav"}
            </span>
          </div>

          {/* Tagline */}
          <p className="mt-4 font-inter font-normal text-[15px] text-text-muted leading-[1.7] max-w-[380px] hero-anim-item">
            {heroTagline || "I build solutions that scale."}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 items-center hero-anim-item">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center font-inter font-semibold text-[14px] bg-amber text-black px-7 py-3.5 transition-all active:scale-[0.98] select-none uppercase hover:bg-amber/90 whitespace-nowrap min-w-[140px] flex-shrink-0"
            >
              Explore Work →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-inter font-semibold text-[14px] border border-border bg-transparent text-text-primary px-7 py-3.5 transition-all hover:border-green hover:text-green select-none uppercase whitespace-nowrap min-w-[140px] flex-shrink-0"
            >
              Contact Me
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex items-center gap-6 hero-anim-item">
            {socialGithub && (
              <a
                href={socialGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#F59E0B] transition-colors cursor-pointer w-5 h-5 flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {socialGithub && socialLinkedin && <span className="h-1.5 w-1.5 rounded-full bg-green opacity-50" />}
            {socialLinkedin && (
              <a
                href={socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#F59E0B] transition-colors cursor-pointer w-5 h-5 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {socialLinkedin && socialTwitter && <span className="h-1.5 w-1.5 rounded-full bg-green opacity-50" />}
            {socialTwitter && (
              <a
                href={socialTwitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#F59E0B] transition-colors cursor-pointer w-5 h-5 flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </div>

          {/* Mobile Profile Photo Card (Cleanly positioned below text, no overlapping) */}
          {heroPhotoUrl && (
            <div className="mt-10 md:hidden relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-border bg-bg-surface/80 hero-anim-item">
              <HeroPhoto src={heroPhotoUrl} alt={siteName || "Govind Madhav"} />
            </div>
          )}
        </div>

        {/* Desktop Dynamic Image */}
        {heroPhotoUrl && (
          <div 
            className="absolute right-0 bottom-0 pointer-events-none z-[5] hidden md:flex items-end justify-end w-[45%] h-[78vh]"
          >
            <HeroPhoto src={heroPhotoUrl} alt={siteName || "Govind Madhav"} />
          </div>
        )}



      </div>
    </section>
  );
}
