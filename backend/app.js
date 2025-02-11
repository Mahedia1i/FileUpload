import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./src/config/db.js";
import uploadRoutes from "./src/routers/uploadRoutes.js";
import getdataRoutes from "./src/routers/getRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 🛠 Connect to Database
connectDB();

// 🔗 Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend access
  })
);
app.use(bodyParser.json({ limit: "10mb" })); // Increase payload limit
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// 📌 Routes
app.use("/api/v1", uploadRoutes);
app.use("/api/v1", getdataRoutes);

// 🛑 Global Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
