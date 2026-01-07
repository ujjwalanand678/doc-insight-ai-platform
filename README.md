# 📄 DocuMind AI - Document Summarization & Insight Platform

A full-stack MERN application that leverages the OpenAI API to analyze uploaded documents (PDF/TXT). It extracts key insights, generates concise summaries, performs sentiment analysis, and visualizes keyword frequency in real-time.

## ✨ Key Features

- **Document Parsing**: Extracts text from PDF and TXT files using `pdf-parse`.
- **AI-Powered Analysis**: Uses OpenAI (GPT-3.5-turbo) to generate:
  - **Summary**: A concise paragraph summarizing the document.
  - **Sentiment Score**: Numerical analysis (-1.0 to 1.0) of the document's tone.
  - **Keyword Extraction**: Identifies top topics for visualization.
- **Data Visualization**:
  - **Sentiment Bar Chart**: Visual representation of tone (Positive/Negative).
  - **Word Cloud**: Interactive display of frequent keywords using `react-tagcloud`.
- **Robust Error Handling**: Manages API timeouts and unsupported file types.

## 🛠️ Tech Stack

- **Frontend**: React.js, Chart.js, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Engine**: Gemini Api
- **File Handling**: Multer (Memory Storage)





