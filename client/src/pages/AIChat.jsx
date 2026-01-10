import { useState } from 'react';
import api from '../lib/api';
import LoadingButton from '../components/LoadingButton';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    setLoading(true);
    setError(null);
    setReply('');

    try {
      const res = await api.post('/api/chat/chat', { message });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        'AI failed to respond. Please try again.'
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
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      {/* Action */}
      <LoadingButton
        loading={loading}
        loadingText="Thinking..."
        onClick={send}
        disabled={loading}
      >
        Ask AI
      </LoadingButton>

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          {error}
        </div>
      )}

      {/* Reply */}
      {reply && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded whitespace-pre-wrap">
          {reply}
        </div>
      )}
    </div>
  );
};

export default AIChat;
