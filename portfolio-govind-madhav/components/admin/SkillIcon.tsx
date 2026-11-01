/**
 * @file components/admin/SkillIcon.tsx
 * @description Admin React icon component resolving tech skill icons locally.
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

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  aws: FaIcons.FaAws,
  docker: SiIcons.SiDocker,
  terraform: SiIcons.SiTerraform,
  jenkins: SiIcons.SiJenkins,
  linux: SiIcons.SiLinux,
  java: FaIcons.FaJava,
  springboot: SiIcons.SiSpringboot,
  spring: SiIcons.SiSpringboot,
  node: SiIcons.SiNodedotjs,
  nodejs: SiIcons.SiNodedotjs,
  express: SiIcons.SiExpress,
  react: SiIcons.SiReact,
  next: SiIcons.SiNextdotjs,
  nextjs: SiIcons.SiNextdotjs,
  typescript: SiIcons.SiTypescript,
  javascript: SiIcons.SiJavascript,
  postgres: SiIcons.SiPostgresql,
  postgresql: SiIcons.SiPostgresql,
  mysql: SiIcons.SiMysql,
  mariadb: SiIcons.SiMariadb,
  sqlite: SiIcons.SiSqlite,
  redis: SiIcons.SiRedis,
  mongo: SiIcons.SiMongodb,
  mongodb: SiIcons.SiMongodb,
  prisma: SiIcons.SiPrisma,
  kafka: SiIcons.SiApachekafka,
  git: SiIcons.SiGit,
};

export default function SkillIcon({ name, size = 32, className = "text-[#10B981]" }: SkillIconProps) {
  if (!name) return <LuIcons.LuCode size={size} className={className} />;

  const rawKey = name.trim();
  const normalizedKey = rawKey.replace(/^Si/i, "").toLowerCase().replace(/[^a-z0-9]/g, "");

  let IconComponent = ICON_MAP[normalizedKey] || (SiIcons as any)[rawKey];

  if (!IconComponent && normalizedKey) {
    const pascalKey = "Si" + normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1);
    IconComponent = (SiIcons as any)[pascalKey];
  }

  if (!IconComponent) IconComponent = (FaIcons as any)[rawKey];
  if (!IconComponent) IconComponent = (LuIcons as any)[rawKey];
  if (!IconComponent) return <LuIcons.LuCode size={size} className={className} />;

  return <IconComponent size={size} className={className} />;
}
