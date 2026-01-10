import { useState } from 'react';
import api from '../lib/api';
import LoadingButton from '../components/LoadingButton';

const ImageAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!file) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);
    setResult('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await api.post(
        '/api/image/analyze',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        'Image analysis failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full border rounded p-2"
      />

      {file && (
        <p className="text-sm text-gray-500">
          Selected: {file.name}
        </p>
      )}

      {/* Action */}
      <LoadingButton
        loading={loading}
        loadingText="Analyzing image..."
        onClick={analyze}
        disabled={loading}
      >
        Analyze Image
      </LoadingButton>

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
