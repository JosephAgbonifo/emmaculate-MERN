import sharp from "sharp";
import path from "path";
import fs from "fs";

// Make sure the uploads directory exists
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Compress and save an image file from multer
 * @param {Object} file - The file object from multer
 * @returns {Promise<string>} - The saved filename (e.g. img-1717700457893.jpg)
 */
const compressAndSaveImage = async (file) => {
  if (!file || !file.buffer || !file.originalname) {
    throw new Error("Invalid file input");
  }

  const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
  const timestamp = Date.now();
  const filename = `img-${timestamp}${ext}`;
  const outputPath = path.join(uploadsDir, filename);

  await sharp(file.buffer)
    .resize(800) // optional
    .toFormat("jpeg")
    .jpeg({ quality: 60 })
    .toFile(outputPath);

  return filename;
};

export default compressAndSaveImage;
