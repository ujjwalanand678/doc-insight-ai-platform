import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';

const DocumentAnalyzer = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = (data) => {
    setResult(data);
    setLoading(false);
    setError(null);
  };

  const handleError = (err) => {
    setError(
      err?.message || 'Document analysis failed. Please try again.'
    );
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">
        Document Analyzer
      </h1>

      {!result && (
        <FileUpload
          onUploadStart={() => setLoading(true)}
          onUploadSuccess={handleSuccess}
          onUploadError={handleError}
        />
      )}

      {loading && (
        <div className="text-gray-500">
          Analyzing document…
        </div>
      )}

      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          {error}
        </div>
      )}

      {result && (
        <>
          <Dashboard data={result} />
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 rounded bg-slate-200 dark:bg-slate-700"
          >
            Analyze another document
          </button>
        </>
      )}
    </section>
  );
};

export default DocumentAnalyzer;
