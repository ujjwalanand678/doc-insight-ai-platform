import { useState } from 'react';
import api from '../lib/api';
import LoadingButton from '../components/LoadingButton';

const ATSChecker = () => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkATS = async () => {
    if (!resume || !jd.trim()) {
      alert('Resume and Job Description are required');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('jobDescription', jd);

      const res = await api.post(
        '/api/ats/check',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        'ATS check failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-4 space-y-4">
      {/* Resume Upload */}
      <div>
        <label className="block font-medium mb-1">Upload Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="block w-full border rounded p-2"
        />
        {resume && (
          <p className="text-sm text-gray-500 mt-1">
            Selected: {resume.name}
          </p>
        )}
      </div>

      {/* Job Description */}
      <div>
        <label className="block font-medium mb-1">Job Description</label>
        <textarea
          className="w-full border rounded p-3"
          rows={6}
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      {/* Action Button */}
      <LoadingButton
        loading={loading}
        loadingText="Checking ATS..."
        onClick={checkATS}
        disabled={loading}
      >
        Check ATS
      </LoadingButton>

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <pre className="bg-gray-900 text-green-200 p-4 rounded overflow-x-auto text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ATSChecker;
