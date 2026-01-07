import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white shadow-sm py-4 mb-10">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">DOCUMIND<span className="text-slate-400">.AI</span></h1>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-3">Extract Insights Instantly</h2>
          <p className="text-slate-500 text-lg">Upload any document and let Gemini 1.5 handle the heavy lifting.</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <FileUpload onUploadSuccess={(data) => setResult(data)} />
          </div>
        </div>

        {result && <Dashboard data={result} />}
      </main>
    </div>
  );
}

export default App;