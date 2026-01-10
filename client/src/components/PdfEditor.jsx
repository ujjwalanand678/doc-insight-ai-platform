import { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

const PdfEditor = ({ extractedText }) => {
  const [text, setText] = useState(extractedText || '');
  const [downloading, setDownloading] = useState(false);

  const downloadEditedPdf = async () => {
    setDownloading(true);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fontSize = 12;
    const margin = 50;
    let y = 800;

    text.split('\n').forEach((line) => {
      if (y < margin) {
        y = 800;
        pdfDoc.addPage();
      }
      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
      });
      y -= fontSize + 6;
    });

    const bytes = await pdfDoc.save();
    const blob = new Blob([bytes], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited-document.pdf';
    a.click();
    URL.revokeObjectURL(url);

    setDownloading(false);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-bold mb-3">Edit PDF Content</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={downloadEditedPdf}
        disabled={downloading}
        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {downloading ? 'Generating PDF…' : 'Download Modified PDF'}
      </button>
    </div>
  );
};

export default PdfEditor;
