import express from "express";
import Document from "../models/Document.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({
      id: doc._id,
      text: doc.text,
      entities: doc.entities,
      originalImage: doc.originalImage,
      filename: doc.filename,
      agency: doc.agency,
      createdAt: doc.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Document endpoints moved to separate OCR route file
// This file now only handles document retrieval and management

export default router;
