/**
 * @file lib/settings.ts
 * @description Settings retrieval service managing default site configuration and about-me metadata values from the database.
 * 
 * @exports
 * - getSiteSettings(): Resolves database/default values for general site details, statistics, and theme toggles
 * - getAboutSettings(): Resolves database/default values for about-me story sections, stacks, and CTAs
 */

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { SettingsInput, AboutInput } from "@/lib/validations";

const DEFAULTS: SettingsInput = {
  siteName: "Govind Madhav",
  tagline: "Cloud Computing & Backend Developer",
  aboutBio: "MCA student specializing in Cloud Computing with experience building distributed systems, digital platforms, and applied AI solutions. Skilled in backend architecture, event-driven systems, and full-stack development using modern cloud-native technologies.",
  profilePhotoUrl: "/profile-photo.png",
  socialGithub: "https://github.com/Govind-Madhav",
  socialLinkedin: "https://www.linkedin.com/in/govind-madhav",
  socialTwitter: "",
  socialEmail: "govindmadhav003@gmail.com",
  heroPhotoUrl: "/profile-photo.png",
  heroTagline: "Building distributed systems, digital platforms, and applied AI solutions.",
  statsYears: "2+",
  statsProjects: "4+",
  statsContributions: "100+",
  statsCommits: "300+",
  marqueeSkills: "JAVA, SPRING BOOT, NODE.JS, EXPRESS.JS, REACT.JS, POSTGRESQL, REDIS, DOCKER, KAFKA, CLOUD NATIVE",
  photography_enabled: "false",
  photography_title: "Through My Lens",
  photography_description: "Moments captured on budget devices.",
  analytics_enabled: "true",
  cookie_consent_text: "We use cookies to analyze site traffic and improve your experience. Your data stays on our servers — no third parties.",
  footerLocation: "Bengaluru, India",
  footerTimezone: "IST (GMT+5:30)",
};

const defaultStackJSON = JSON.stringify([
  {
    domain: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Terraform", "Jenkins", "Linux", "Tailscale", "Nginx"],
  },
  {
    domain: "Backend & Systems",
    skills: ["Java", "Spring Boot", "Node.js", "Express", "NestJS", "C++"],
  },
  {
    domain: "Frontend & Web UIs",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    domain: "Databases & Architecture",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "Kafka", "Git"],
  },
]);

const ABOUT_DEFAULTS: AboutInput = {
  about_hero_tagline: "MCA student specializing in Cloud Computing at Jain University, Bengaluru. Growing from someone who writes software into an engineer who understands the systems behind it.",
  about_avatar_url: "/profile-photo.png",
  about_story: "My journey into technology started with a **Bachelor of Computer Applications (BCA)**, where I built my foundation in programming, databases, software development, and computer science. It was during those years that I realized I didn't just enjoy writing code, I enjoyed understanding how the pieces behind software fit together.\n\nAfter completing my BCA, I chose to continue that journey with a **Master of Computer Applications (MCA) specializing in Cloud Computing at Jain University, Bengaluru**. Moving from BCA to MCA has been less about simply earning another degree and more about discovering where I want to take my engineering career.\n\nDuring my MCA, my interests gradually expanded beyond application development into **cloud computing, infrastructure, DevOps, cybersecurity, distributed systems, and AI**. I started working with technologies such as AWS, Docker, Terraform, Jenkins, Linux, Spring Boot, React, databases, and networking, building projects and labs that helped me understand how software actually runs in the real world.\n\nOutside technology, I enjoy **travelling, reading fiction novels, and manga**. I like discovering new places and getting lost in stories just as much as I enjoy getting lost in a difficult technical problem.\n\nI'm still building my path, but the direction has become clear: **to grow from someone who writes software into an engineer who understands the systems behind it.**",
  about_currently: "Pursuing my MCA specializing in Cloud Computing at Jain University, Bengaluru while building projects with AWS, Docker, Terraform, Jenkins, Linux, Spring Boot, React, and distributed databases.",
  about_beyond_code: "Outside technology, I enjoy travelling, reading fiction novels, and manga. I like discovering new places and getting lost in stories just as much as I enjoy getting lost in a difficult technical problem.",
  about_cta_text: "Let's build something impactful together.",
  about_cta_email: "govindmadhav003@gmail.com",
  about_stack: defaultStackJSON,
};

export const getSiteSettings = unstable_cache(
  async (): Promise<SettingsInput> => {
    const rows = await prisma.siteSettings.findMany();
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      siteName: map.get("siteName") ?? DEFAULTS.siteName,
      tagline: map.get("tagline") ?? DEFAULTS.tagline,
      aboutBio: map.get("aboutBio") ?? DEFAULTS.aboutBio,
      profilePhotoUrl: map.get("profilePhotoUrl") ?? DEFAULTS.profilePhotoUrl,
      socialGithub: map.get("socialGithub") ?? DEFAULTS.socialGithub,
      socialLinkedin: map.get("socialLinkedin") ?? DEFAULTS.socialLinkedin,
      socialTwitter: map.get("socialTwitter") ?? DEFAULTS.socialTwitter,
      socialEmail: map.get("socialEmail") ?? DEFAULTS.socialEmail,
      heroPhotoUrl: map.get("heroPhotoUrl") ?? DEFAULTS.heroPhotoUrl,
      heroTagline: map.get("heroTagline") ?? DEFAULTS.heroTagline,
      statsYears: map.get("statsYears") ?? DEFAULTS.statsYears,
      statsProjects: map.get("statsProjects") ?? DEFAULTS.statsProjects,
      statsContributions: map.get("statsContributions") ?? DEFAULTS.statsContributions,
      statsCommits: map.get("statsCommits") ?? DEFAULTS.statsCommits,
      marqueeSkills: map.get("marqueeSkills") ?? DEFAULTS.marqueeSkills,
      photography_enabled: map.get("photography_enabled") ?? DEFAULTS.photography_enabled,
      photography_title: map.get("photography_title") ?? DEFAULTS.photography_title,
      photography_description: map.get("photography_description") ?? DEFAULTS.photography_description,
      analytics_enabled: map.get("analytics_enabled") ?? DEFAULTS.analytics_enabled,
      cookie_consent_text: map.get("cookie_consent_text") ?? DEFAULTS.cookie_consent_text,
      footerLocation: map.get("footerLocation") ?? DEFAULTS.footerLocation,
      footerTimezone: map.get("footerTimezone") ?? DEFAULTS.footerTimezone,
    };
  },
  ["site-settings-cache"],
  { revalidate: 3600, tags: ["settings"] }
);

export const getAboutSettings = unstable_cache(
  async (): Promise<AboutInput> => {
    const rows = await prisma.siteSettings.findMany({
      where: {
        key: {
          in: [
            "about_hero_tagline",
            "about_avatar_url",
            "about_story",
            "about_currently",
            "about_beyond_code",
            "about_cta_text",
            "about_cta_email",
            "about_stack",
          ],
        },
      },
    });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      about_hero_tagline: map.get("about_hero_tagline") ?? ABOUT_DEFAULTS.about_hero_tagline,
      about_avatar_url: map.get("about_avatar_url") ?? ABOUT_DEFAULTS.about_avatar_url,
      about_story: map.get("about_story") ?? ABOUT_DEFAULTS.about_story,
      about_currently: map.get("about_currently") ?? ABOUT_DEFAULTS.about_currently,
      about_beyond_code: map.get("about_beyond_code") ?? ABOUT_DEFAULTS.about_beyond_code,
      about_cta_text: map.get("about_cta_text") ?? ABOUT_DEFAULTS.about_cta_text,
      about_cta_email: map.get("about_cta_email") ?? ABOUT_DEFAULTS.about_cta_email,
      about_stack: map.get("about_stack") ?? ABOUT_DEFAULTS.about_stack,
    };
  },
  ["about-settings-cache"],
  { revalidate: 3600, tags: ["settings"] }
);
