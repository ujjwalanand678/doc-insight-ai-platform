// Dashboard.jsx
import React, { useMemo, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleString();
}

function sentimentToPercent(score = 0) {
  // score range -1..1 -> percent 0..100
  return Math.round(((score + 1) / 2) * 100);
}
function sentimentColor(score = 0) {
  if (score >= 0.4) return '#059669'; // green
  if (score >= 0.05) return '#f59e0b'; // amber
  return '#dc2626'; // red
}

// Simple sentence splitter (works well enough for previews)
function splitSentences(text = '') {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

const Dashboard = ({ data = {} }) => {
  const { filename, uploadDate, originalText = '', analysis = {} } = data;
  const { summary = 'No summary', sentimentScore = 0, keywords = [], actionItems = [], entities = [], confidence } = analysis;

  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [showFullText, setShowFullText] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Sentence scoring (very simple): count occurrences of each keyword
  const sentences = useMemo(() => splitSentences(originalText), [originalText]);
  const rankedSentences = useMemo(() => {
    const kwTexts = (keywords || []).map(k => (k.text || k).toString().toLowerCase());
    return sentences
      .map(s => {
        const sLower = s.toLowerCase();
        const score = kwTexts.reduce((acc, kw) => acc + (sLower.includes(kw) ? 1 : 0), 0);
        return { text: s, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [sentences, keywords]);

  // Filtered sentences when a keyword is selected
  const filteredSentences = useMemo(() => {
    if (!selectedKeyword) return rankedSentences;
    const k = selectedKeyword.toLowerCase();
    return rankedSentences.filter(s => s.text.toLowerCase().includes(k));
  }, [rankedSentences, selectedKeyword]);

  const chartData = {
    labels: ['Sentiment'],
    datasets: [{
      label: 'Score',
      data: [sentimentToPercent(sentimentScore)],
      backgroundColor: sentimentColor(sentimentScore),
      borderRadius: 8
    }]
  };

  // Actions
  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      alert('Summary copied to clipboard');
    } catch (e) {
      alert('Copy failed');
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename || 'document'}-analysis.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regenerate = async () => {
    // Make best-effort UI for regenerate; expects backend route to re-run analysis:
    // POST /api/documents/:id/regenerate  (returns updated document)
    if (!data._id) {
      alert('Regenerate requires a saved document with an _id');
      return;
    }
    try {
      setRegenerating(true);
      const res = await fetch(`/api/documents/${data._id}/regenerate`, { method: 'POST' });
      if (!res.ok) throw new Error('Regenerate failed');
      const updated = await res.json();
      window.location.reload(); // replace with state update if integrated into parent
    } catch (err) {
      console.error(err);
      alert('Regenerate failed. Check console.');
    } finally {
      setRegenerating(false);
    }
  };

  const readTime = Math.max(1, Math.round((originalText.split(/\s+/).length / 200)));

  return (
    <div className="mt-8 space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{filename || 'Untitled document'}</h2>
          <div className="text-sm text-slate-500">{formatDate(uploadDate)} • ≈ {readTime} min read</div>
        </div>

        <div className="flex gap-2">
          <button onClick={copySummary} className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200">Copy summary</button>
          <button onClick={downloadJSON} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Download JSON</button>
          <button
            onClick={regenerate}
            disabled={regenerating}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50"
          >
            {regenerating ? 'Regenerating…' : 'Regenerate'}
          </button>
        </div>
      </header>

      {/* Summary and Insights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-indigo-700 font-semibold mb-2">AI Summary</h3>
          <p className="text-slate-700 italic mb-4">"{summary}"</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-slate-500">Sentiment</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-full">
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${sentimentToPercent(sentimentScore)}%`,
                        height: '100%',
                        background: sentimentColor(sentimentScore)
                      }}
                    />
                  </div>
                </div>
                <div className="text-sm font-medium">{(sentimentScore).toFixed(2)}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Confidence (model)</div>
              <div className="mt-2 text-sm font-medium">{confidence ? `${(confidence*100).toFixed(0)}%` : '—'}</div>
            </div>

            <div className="col-span-2 mt-2">
              <div className="text-xs text-slate-500">Actionable items (from AI)</div>
              {actionItems && actionItems.length ? (
                <ul className="mt-2 list-disc ml-5 text-slate-700">
                  {actionItems.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              ) : (
                <div className="mt-2 text-slate-400">No action items provided by the model. Consider updating the prompt to request `actionItems` (see docs).</div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: keyword cloud + small chart */}
        <aside className="p-6 bg-white rounded-xl shadow-sm border flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Key Themes</h4>
            <div className="h-36">
              <TagCloud minSize={12} maxSize={35} tags={keywords} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Sentiment snapshot</h4>
            <div className="h-20">
              <Bar data={chartData} options={{ maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { display: false } } }} />
            </div>
          </div>
        </aside>
      </section>

      {/* Keywords chips */}
      <section className="bg-white p-4 rounded-lg border">
        <div className="flex flex-wrap gap-2">
          {(keywords || []).map((k, i) => {
            const text = k.text || k;
            const active = selectedKeyword === String(text);
            return (
              <button
                key={i}
                onClick={() => setSelectedKeyword(active ? null : String(text))}
                className={`px-3 py-1 rounded-full border ${active ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
              >
                {text} <span className="ml-2 text-xs text-slate-400">{k.value ?? ''}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Ranked sentences / evidence */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-slate-800 font-semibold mb-3">Top sentences (evidence)</h3>
          <div className="space-y-3">
            {filteredSentences.length ? filteredSentences.map((s, i) => (
              <div key={i} className="p-3 border rounded hover:bg-slate-50">
                <div className="text-sm text-slate-700">{s.text}</div>
                <div className="text-xs text-slate-400 mt-1">matches: {s.score}</div>
              </div>
            )) : <div className="text-slate-400">No sentences matched the selected keyword.</div>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-slate-800 font-semibold mb-3">Entities & quick facts</h3>
          {entities && entities.length ? (
            <ul className="list-disc ml-5 text-slate-700">
              {entities.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          ) : (
            <div className="text-slate-400">No entities extracted. Add `entities` to the AI output for better extraction.</div>
          )}

          <div className="mt-4">
            <h4 className="text-sm font-semibold">Quick Q&A</h4>
            {(analysis.qaPairs || []).length ? (
              <div className="mt-2 space-y-2">
                {analysis.qaPairs.slice(0,3).map((q, i) => (
                  <div key={i}>
                    <div className="text-xs text-slate-500">{q.q}</div>
                    <div className="text-sm">{q.a}</div>
                  </div>
                ))}
              </div>
            ) : <div className="text-slate-400 mt-2">No QA pairs available.</div>}
          </div>
        </div>
      </section>

      {/* Original text preview */}
      <section className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-slate-800 font-semibold mb-3">Original text (preview)</h3>
        <div className="prose max-w-none text-slate-700">
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {showFullText ? originalText : originalText.substring(0, 1600) + (originalText.length > 1600 ? '…' : '')}
          </div>
        </div>
        {originalText.length > 1600 && (
          <div className="mt-3">
            <button onClick={() => setShowFullText(!showFullText)} className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200">
              {showFullText ? 'Show less' : 'Show full text'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
