const fs = require('fs');
const path = require('path');

const root = process.cwd();
const proofDir = path.join(root, 'Proof of projects');
const publicProjectsDir = path.join(root, 'public', 'projects');

const folderMap = {
  'titan-arena': 'Titan arena',
  'intrusion-detection-system': 'Intrusion-detection-system',
  'pdf-editor': 'PDF Editor',
  'lung-cancer-detection': 'lung cancer',
  'authcore': 'AUth module',
  'dbt-project-wallet': 'DBT project wallet'
};

const galleryMap = {};

for (const [slug, folderName] of Object.entries(folderMap)) {
  const dirPath = path.join(proofDir, folderName);
  const targetDir = path.join(publicProjectsDir, slug);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (!fs.existsSync(dirPath)) {
    console.warn(`Folder not found: ${dirPath}`);
    continue;
  }

  const files = fs.readdirSync(dirPath).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  
  // Sort files so templates come first, then screenshots in logical order
  files.sort((a, b) => {
    if (a.toLowerCase().includes('template')) return -1;
    if (b.toLowerCase().includes('template')) return 1;
    return a.localeCompare(b);
  });

  const relativePaths = [];

  files.forEach((file, idx) => {
    const srcFile = path.join(dirPath, file);
    const ext = path.extname(file);
    // Sanitize filename or use numbered index
    const cleanFileName = `img-${idx + 1}${ext}`;
    const destFile = path.join(targetDir, cleanFileName);

    fs.copyFileSync(srcFile, destFile);
    relativePaths.push(`/projects/${slug}/${cleanFileName}`);
  });

  // Also maintain root cover image /projects/<slug>.png
  if (relativePaths.length > 0) {
    fs.copyFileSync(path.join(dirPath, files[0]), path.join(publicProjectsDir, `${slug}.png`));
  }

  galleryMap[slug] = relativePaths;
  console.log(`Copied ${relativePaths.length} images for ${slug}`);
}

const mapFile = path.join(root, 'lib', 'project-gallery-data.json');
fs.writeFileSync(mapFile, JSON.stringify(galleryMap, null, 2), 'utf-8');
console.log('Successfully created lib/project-gallery-data.json!');
