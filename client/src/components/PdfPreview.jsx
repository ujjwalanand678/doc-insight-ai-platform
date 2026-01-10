import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfPreview = ({ file }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="border rounded-xl p-4 bg-slate-50 ">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            className="mb-4 shadow"
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfPreview;
