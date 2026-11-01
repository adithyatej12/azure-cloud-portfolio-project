/**
 * @file components/ui/SkillIcon.tsx
 * @description Smart React icon component resolving tech skill icons locally with zero 3rd-party CDN failures.
 */

import React from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa6";
import * as LuIcons from "react-icons/lu";

interface SkillIconProps {
  name: string;
  size?: number;
  className?: string;
}

// Normalized map of skill keys to React Icon components
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  // Cloud & DevOps
  aws: FaIcons.FaAws,
  amazon: FaIcons.FaAws,
  docker: SiIcons.SiDocker,
  terraform: SiIcons.SiTerraform,
  jenkins: SiIcons.SiJenkins,
  linux: SiIcons.SiLinux,
  ubuntu: SiIcons.SiUbuntu,
  kubernetes: SiIcons.SiKubernetes,
  nginx: SiIcons.SiNginx,
  tailscale: SiIcons.SiTailscale,
  git: SiIcons.SiGit,
  github: SiIcons.SiGithub,
  gitlab: SiIcons.SiGitlab,

  // Backend & Systems
  java: FaIcons.FaJava,
  springboot: SiIcons.SiSpringboot,
  spring: SiIcons.SiSpringboot,
  node: SiIcons.SiNodedotjs,
  nodejs: SiIcons.SiNodedotjs,
  express: SiIcons.SiExpress,
  nestjs: SiIcons.SiNestjs,
  nest: SiIcons.SiNestjs,
  cpp: SiIcons.SiCplusplus,
  cplusplus: SiIcons.SiCplusplus,
  csharp: SiIcons.SiDotnet,
  python: SiIcons.SiPython,
  golang: SiIcons.SiGo,
  go: SiIcons.SiGo,

  // Frontend & Web
  react: SiIcons.SiReact,
  reactjs: SiIcons.SiReact,
  next: SiIcons.SiNextdotjs,
  nextjs: SiIcons.SiNextdotjs,
  typescript: SiIcons.SiTypescript,
  ts: SiIcons.SiTypescript,
  javascript: SiIcons.SiJavascript,
  js: SiIcons.SiJavascript,
  tailwind: SiIcons.SiTailwindcss,
  tailwindcss: SiIcons.SiTailwindcss,
  framer: SiIcons.SiFramer,
  framermotion: SiIcons.SiFramer,
  html: SiIcons.SiHtml5,
  html5: SiIcons.SiHtml5,
  css: SiIcons.SiCss,
  css3: SiIcons.SiCss,
  vite: SiIcons.SiVite,
  redux: SiIcons.SiRedux,

  // Databases & Infrastructure
  postgres: SiIcons.SiPostgresql,
  postgresql: SiIcons.SiPostgresql,
  mysql: SiIcons.SiMysql,
  mariadb: SiIcons.SiMariadb,
  sqlite: SiIcons.SiSqlite,
  oracle: FaIcons.FaDatabase,
  mssql: FaIcons.FaDatabase,
  microsoftsqlserver: FaIcons.FaDatabase,
  redis: SiIcons.SiRedis,
  mongo: SiIcons.SiMongodb,
  mongodb: SiIcons.SiMongodb,
  prisma: SiIcons.SiPrisma,
  kafka: SiIcons.SiApachekafka,
  apachekafka: SiIcons.SiApachekafka,
  clickhouse: SiIcons.SiClickhouse,
  graphql: SiIcons.SiGraphql,
  sql: FaIcons.FaDatabase,
  database: FaIcons.FaDatabase,
};

export default function SkillIcon({ name, size = 32, className = "text-[#10B981]" }: SkillIconProps) {
  if (!name) {
    return <LuIcons.LuCode size={size} className={className} />;
  }

  // 1. Clean and normalize string key (e.g. "Spring Boot" -> "springboot", "SiDocker" -> "docker")
  const rawKey = name.trim();
  const normalizedKey = rawKey.replace(/^Si/i, "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // 2. Direct lookup in normalized map
  let IconComponent = ICON_MAP[normalizedKey];

  // 3. Exact key lookup in Simple Icons (e.g. "SiDocker")
  if (!IconComponent) {
    IconComponent = (SiIcons as any)[rawKey];
  }

  // 4. PascalCase Si lookup (e.g. "docker" -> "SiDocker")
  if (!IconComponent && normalizedKey) {
    const pascalKey = "Si" + normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1);
    IconComponent = (SiIcons as any)[pascalKey];
  }

  // 5. FontAwesome lookup
  if (!IconComponent) {
    IconComponent = (FaIcons as any)[rawKey];
  }

  // 6. Lucide lookup
  if (!IconComponent) {
    IconComponent = (LuIcons as any)[rawKey];
  }

  // 7. Fallback to clean developer icon if name isn't matched
  if (!IconComponent) {
    return <LuIcons.LuCode size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
}
