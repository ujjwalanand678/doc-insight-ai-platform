import model from '../config/genAI.js';

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file required' });
    }

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype
      }
    };

    const prompt = `
Analyze this image.
If it's a resume, extract skills, experience, and suggestions.
If it's a JD, extract key requirements.
`;

    const result = await model.generateContent([prompt, imagePart]);

    res.json({
      analysis: result.response.text()
    });

  } catch (error) {
    res.status(500).json({
      message: 'Image analysis failed',
      error: error.message
    });
  }
};
