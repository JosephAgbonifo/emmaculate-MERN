import multer from "multer";
import compressAndSaveImage from "../../utils/upload/compressAndSaveImage.js";

const upload = multer({ storage: multer.memoryStorage() });
export const uploadImage = upload.single("image");

export const saveImage = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    const savedFileName = await compressAndSaveImage(file);
    return savedFileName;
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
};
