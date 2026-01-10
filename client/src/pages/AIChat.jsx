import { useState } from 'react';
import axios from 'axios';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const send = async () => {
    const res = await axios.post('/api/ai/chat', { message });
    setReply(res.data.reply);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">AI Career Chat</h2>
      <textarea
        className="w-full border rounded p-3 mb-4"
        rows={4}
        placeholder="Ask a career or resume question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={send}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Ask AI
      </button>

      {reply && (
        <div className="mt-6 bg-white border rounded p-4">
          <h4 className="font-semibold mb-2">AI Reply</h4>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;