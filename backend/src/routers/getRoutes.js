import express from "express";
import { getData } from "../controllers/getdataController.js";
const router = express.Router();

router.get("/get-data", getData);

export default router;
