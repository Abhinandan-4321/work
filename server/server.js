import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import ingestPdf from "./routes/ingest.js";
import searchRoutes from "./routes/search.js";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";
import documentRoutes from "./routes/document.js";
import ocrRoutes from "./routes/ocr.js";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Set up static file serving for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"));

app.use("/api/ingest", ingestPdf);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/ocr", ocrRoutes);

app.listen(3000, () => {
  console.log("Server running on 3000");
});
