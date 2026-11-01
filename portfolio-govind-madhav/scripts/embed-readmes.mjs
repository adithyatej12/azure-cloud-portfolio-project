import fs from 'fs';
import path from 'path';

const root = process.cwd();
const proofDir = path.join(root, 'Proof of projects');

const map = {
  'titan-arena': 'Titan arena',
  'intrusion-detection-system': 'Intrusion-detection-system',
  'pdf-editor': 'PDF Editor',
  'lung-cancer-detection': 'lung cancer',
  'authcore': 'AUth module',
  'dbt-project-wallet': 'DBT project wallet'
};

let staticReadmesObj = {};

for (const [slug, folder] of Object.entries(map)) {
  const readmePath = path.join(proofDir, folder, 'README.md');
  if (fs.existsSync(readmePath)) {
    const text = fs.readFileSync(readmePath, 'utf-8');
    staticReadmesObj[slug] = text;
    console.log(`Loaded ${slug}: ${text.length} chars`);
  } else {
    console.error(`Missing README at ${readmePath}`);
  }
}

const fileContent = `/**
 * @file lib/project-readmes.ts
 * @description Embedded full README documents and filesystem fallback resolver for project detail pages.
 */

import fs from "fs";
import path from "path";

const FOLDER_MAP: Record<string, string> = ${JSON.stringify(map, null, 2)};

const STATIC_READMES: Record<string, string> = ${JSON.stringify(staticReadmesObj, null, 2)};

export function getProjectReadme(slug: string, dbLongDesc?: string | null): string {
  // 1. Try reading directly from Proof of projects filesystem
  const folderName = FOLDER_MAP[slug];
  if (folderName) {
    try {
      const readmePath = path.join(process.cwd(), "Proof of projects", folderName, "README.md");
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, "utf-8");
        if (content && content.trim().length > 200) {
          return content;
        }
      }
    } catch (e) {
      // Fallback
    }
  }

  // 2. Try static rich README bundle
  const staticReadme = STATIC_READMES[slug];
  if (staticReadme && staticReadme.trim().length > (dbLongDesc?.trim().length || 0)) {
    return staticReadme;
  }

  // 3. Fallback to DB longDesc or empty string
  return dbLongDesc || staticReadme || "";
}
`;

fs.writeFileSync(path.join(root, 'lib', 'project-readmes.ts'), fileContent, 'utf-8');
console.log('Successfully updated lib/project-readmes.ts with 100% full README specs!');
