import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folder,
    });

    await fs.unlink(localFilePath);
    return response.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);

    // Delete file if upload fails
    try {
      await fs.unlink(localFilePath);
    } catch (err) {
      console.error("❌ Failed to delete temp file:", err);
    }

    return null;
  }
};

export default uploadToCloudinary;
