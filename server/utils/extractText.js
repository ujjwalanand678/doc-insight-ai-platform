import { PDFParse } from 'pdf-parse';

const extractTextFromFile = async (file) => {
  if (file.mimetype !== 'application/pdf') {
    return file.buffer.toString('utf-8');
  }

  const parser = new PDFParse({
    data: file.buffer // IMPORTANT: wrap buffer in options . data : 
  });

  const textResult = await parser.getText();
  await parser.destroy(); // clean up worker/resources

  // textResult has structure: { pages: [...], text: "..." }
  return textResult.text || '';
};

export default extractTextFromFile;
