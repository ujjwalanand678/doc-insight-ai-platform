import React from 'react';
import { TagCloud } from 'react-tagcloud';
import { Bar } from 'react-chartjs-2';
// chartSetup.js OR at top of Dashboard.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);


const Dashboard = ({ data }) => {
  const { analysis, filename } = data;

  const chartData = {
    labels: ['Sentiment'],
    datasets: [{
      label: 'Score',
      data: [analysis.sentimentScore],
      backgroundColor: analysis.sentimentScore > 0 ? '#10b981' : '#ef4444',
      borderRadius: 8
    }]
  };

  return (
    <div className="mt-12 space-y-8 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Analysis: {filename}</h2>
      </header>

      {/* Summary Card */}
      <section className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
        <h3 className="text-indigo-800 font-bold uppercase tracking-wider text-sm mb-2">AI Summary</h3>
        <p className="text-slate-700 leading-relaxed text-lg italic">"{analysis.summary}"</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sentiment Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h3 className="text-slate-800 font-bold mb-4 text-center">Document Sentiment</h3>
          <div className="h-48 flex items-center justify-center">
            <Bar data={chartData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} />
          </div>
        </div>

        {/* Word Cloud */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h3 className="text-slate-800 font-bold mb-4 text-center">Key Themes</h3>
          <div className="flex justify-center p-4">
            <TagCloud minSize={14} maxSize={38} tags={analysis.keywords} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;