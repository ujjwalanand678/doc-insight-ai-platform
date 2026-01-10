import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';

const DocumentAnalyzer = () => {
  const [result, setResult] = useState(null);

  return (
    <main className="max-w-5xl mx-auto px-4 pb-20">
      <FileUpload onUploadSuccess={setResult} />
      {result && <Dashboard data={result} />}
    </main>
  );
};

export default DocumentAnalyzer;