import fs from "fs";
import path from "path";

const src = "E:\\My projects\\Portfolio\\ChatGPT_Image_Aug_19__2026__02_52_54_AM-removebg-preview.png";

const destinations = [
  "app/favicon.ico",
  "app/icon.png",
  "app/apple-icon.png",
  "public/favicon.ico",
  "public/favicon-32x32.png",
  "public/icon.png",
  "public/apple-icon.png",
  "public/logo.png",
  "public/logo.svg",
  "public/web-app-manifest-192x192.png",
  "public/web-app-manifest-512x512.png"
];

for (const dest of destinations) {
  const fullPath = path.resolve("e:/My projects/Portfolio", dest);
  fs.copyFileSync(src, fullPath);
  console.log(`Updated ${dest} from ${src}`);
}
