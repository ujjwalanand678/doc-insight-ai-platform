import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData);
      onUploadSuccess(res.data);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Upload Document</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 border-slate-300 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-slate-400">PDF or TXT (MAX. 10MB)</p>
            </div>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.txt" />
          </label>
        </div>
        {file && <p className="text-sm text-blue-600 font-medium text-center">Selected: {file.name}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? '⚡ Analyzing with Gemini...' : 'Analyze Document'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;