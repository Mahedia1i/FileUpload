import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import Demo from "../model/demoModel.js";

export const uploadForm = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and Email are required!" });
    }

    if (!req.files || !req.files["photo"] || !req.files["signature"]) {
      return res.status(400).json({ success: false, message: "Photo and Signature are required!" });
    }

    const photoFile = req.files["photo"][0].path;
    const signatureFile = req.files["signature"][0].path;

    const photoUrl = await uploadToCloudinary(photoFile, "makjiya_photo");
    const signatureUrl = await uploadToCloudinary(signatureFile, "makjiya_sig");

    if (!photoUrl || !signatureUrl) {
      return res.status(500).json({ success: false, message: "File upload failed!" });
    }

    const newUser = new Demo({ name, email, photo: photoUrl, signature: signatureUrl });
    await newUser.save();

    return res.status(201).json({ success: true, message: "Data saved successfully", user: newUser });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
