import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.resolve(
  __dirname,
  "../public/img/avatars/gaya.jpg"
);
const outputPath = path.resolve(
  __dirname,
  "../public/img/avatars/gaya_cropped.jpg"
);

// Get image metadata first
const metadata = await sharp(inputPath).metadata();
console.log(`Original size: ${metadata.width}x${metadata.height}`);

// Crop ~28% from the left to remove the "Gayathri" text
// Keep from x=28% to the right edge, full height
const cropLeft = Math.round(metadata.width * 0.28);
const cropWidth = metadata.width - cropLeft;

await sharp(inputPath)
  .extract({
    left: cropLeft,
    top: 0,
    width: cropWidth,
    height: metadata.height,
  })
  .jpeg({ quality: 95 })
  .toFile(outputPath);

console.log(`Cropped image saved: ${cropWidth}x${metadata.height}`);
console.log(`Removed ${cropLeft}px from the left (${28}%)`);
console.log(`Output: ${outputPath}`);
