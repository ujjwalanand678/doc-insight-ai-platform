import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now },
  originalText: String, // Extracted text from PDF
  analysis: {
    summary: String,
    sentimentScore: Number, // -1 to 1
    keywords: [{ text: String, value: Number }] // For Word Cloud
  }
});

const Document = mongoose.model('Document', DocumentSchema);
export default Document