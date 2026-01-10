import { useState } from 'react';
import axios from 'axios';

const ImproveContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const improve = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/ai/improve', {
        text,
        mode: 'ats',
        role: 'MERN Stack Developer'
      });
      setResult(res.data.result.improvedText);
    } catch {
      alert('Improve failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Improve Content with AI</h2>
      <textarea
        className="w-full border rounded p-3 mb-4"
        rows={6}
        placeholder="Paste resume bullet or summary..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={improve}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Improving...' : 'Improve'}
      </button>

      {result && (
        <div className="mt-6 bg-white border rounded p-4">
          <h4 className="font-semibold mb-2">Improved Version</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ImproveContent;