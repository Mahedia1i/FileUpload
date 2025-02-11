import express from "express";
import upload from "../middlewares/upload.js";
import { uploadForm } from "../controllers/uploadController.js";

const router = express.Router();

// Upload Form Data Route
router.post("/upload", upload.fields([{ name: "photo" }, { name: "signature" }]), uploadForm);

export default router;
