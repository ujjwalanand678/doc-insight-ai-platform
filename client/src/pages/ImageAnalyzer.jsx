import { useState } from 'react';
import axios from 'axios';

const ImageAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const analyze = async () => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('/api/image/analyze', formData);
    setResult(res.data.analysis);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Image Analyzer</h2>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={analyze}
        className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6 bg-white border rounded p-4">
          <h4 className="font-semibold mb-2">Analysis</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;