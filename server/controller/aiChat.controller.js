import model from '../config/genAI.js';

export const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const prompt = `
You are a career assistant and resume expert.

Context (optional):
${context || 'N/A'}

User Question:
${message}
`;

    const result = await model.generateContent(prompt);

    res.json({
      reply: result.response.text()
    });

  } catch (error) {
    res.status(500).json({
      message: 'AI chat failed',
      error: error.message
    });
  }
};
