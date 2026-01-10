import { Routes, Route } from 'react-router-dom';
import ToolLayout from './layouts/ToolLayout';

import Home from './pages/Home';
import DocumentAnalyzer from './pages/DocumentAnalyzer';
import ATSChecker from './pages/ATSChecker';
import ImproveContent from './pages/ImproveContent';
import AIChat from './pages/AIChat';
import ImageAnalyzer from './pages/ImageAnalyzer';

function App() {
  return (
    <Routes>
      <Route element={<ToolLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<DocumentAnalyzer />} />
        <Route path="/ats" element={<ATSChecker />} />
        <Route path="/improve" element={<ImproveContent />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/image" element={<ImageAnalyzer />} />
      </Route>
    </Routes>
  );
}

export default App;
