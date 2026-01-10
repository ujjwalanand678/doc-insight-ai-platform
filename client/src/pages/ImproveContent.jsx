import { useState } from 'react';
import api from '../lib/api';
import LoadingButton from '../components/LoadingButton';

const ImproveContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const improve = async () => {
    if (!text.trim()) {
      alert('Please enter text to improve');
      return;
    }

    setLoading(true);
    setError(null);
    setResult('');

    try {
      const res = await api.post('/api/ai/improve', {
        text,
        mode: 'ats',
      });

      const improved =
        res?.data?.result?.improvedText ||
        res?.data?.improvedText ||
        '';

      setResult(improved);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        'Failed to improve content. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      {/* Input */}
      <textarea
        className="w-full border rounded p-3"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your resume content or text here..."
      />

      {/* Action */}
      <LoadingButton
        loading={loading}
        loadingText="Improving..."
        onClick={improve}
        disabled={loading}
      >
        Improve
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

export default ImproveContent;
