import extractTextFromFile from '../utils/extractText.js';
import model from '../config/genAI.js';

export const checkATS = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file || !jobDescription) {
      return res.status(400).json({
        message: 'Resume file and job description are required'
      });
    }

    const resumeText = await extractTextFromFile(req.file);

    const prompt = `
You are an ATS (Applicant Tracking System) engine.

Compare the RESUME with the JOB DESCRIPTION and return ONLY valid JSON:

{
  "atsScore": 0-100,
  "matchedKeywords": ["React", "Node.js"],
  "missingKeywords": ["AWS", "Docker"],
  "improvements": [
    "Add measurable achievements",
    "Include cloud experience"
  ],
  "summary": "2 line recruiter-friendly summary"
}

RESUME:
${resumeText.substring(0, 25000)}

JOB DESCRIPTION:
${jobDescription.substring(0, 10000)}
`;

    const result = await model.generateContent(prompt);
    const clean = result.response.text().replace(/```json|```/g, '');
    const atsResult = JSON.parse(clean);

    res.json({
      success: true,
      ats: atsResult
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'ATS analysis failed',
      error: error.message
    });
  }
};
