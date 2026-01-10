import Document from '../model/Document.model.js';
import model from '../config/genAI.js';
import extractTextFromFile from '../utils/extractText.js';

export const extractTextOnly = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const extractedText = await extractTextFromFile(req.file);

    res.json({
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      length: extractedText.length,
      preview: extractedText.substring(0, 2000),
      text: extractedText // ⚠️ remove this in prod if large
    });

  } catch (error) {
    console.error('Text extraction error:', error);
    res.status(500).json({
      message: 'Text extraction failed',
      error: error.message
    });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // 1. Extract text
    const extractedText = await extractTextFromFile(req.file);

    // 2. Prepare Gemini prompt
    const prompt = `
You are a document analyst. Analyze the provided text and return ONLY valid JSON.

{
  "summary": "3 sentence summary",
  "sentimentScore": 0.5,
  "keywords": [{ "text": "keyword", "value": 50 }]
}

Sentiment range: -1 to 1
Keyword value range: 10 to 100

Text:
${extractedText.substring(0, 30000)}
`;

    // 3. Call Gemini
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleanJson);

    // 4. Save to DB
    const document = await Document.create({
      filename: req.file.originalname,
      originalText: extractedText,
      analysis
    });

    res.status(201).json(document);

  } catch (error) {
    console.error('Upload controller error:', error);
    res.status(500).json({
      message: 'Document processing failed',
      error: error.message
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadDate: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch documents',
      error: error.message
    });
  }
};
