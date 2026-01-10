import model from '../config/genAI.js';

export const improveContentWithAI = async (req, res) => {
  try {
    const { text, mode = 'ats', role = '' } = req.body;

    if (!text) {
      return res.status(400).json({
        message: 'Text is required'
      });
    }

    const prompt = `
You are an expert resume writer and ATS optimization engine.

TASK:
Improve the given content.

MODE: ${mode}
TARGET ROLE: ${role || 'General Software Developer'}

RULES:
- Keep the original meaning
- Use strong action verbs
- Optimize for ATS readability
- Avoid fake experience
- Keep it concise and professional

Return ONLY valid JSON in this format:

{
  "improvedText": "string",
  "changesMade": [
    "Added action verbs",
    "Improved clarity",
    "Optimized for ATS"
  ],
  "addedKeywords": ["React", "Node.js"]
}

ORIGINAL TEXT:
${text}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.json({
      success: true,
      result: parsed
    });

  } catch (error) {
    console.error('Improve content error:', error);
    res.status(500).json({
      message: 'Content improvement failed',
      error: error.message
    });
  }
};
