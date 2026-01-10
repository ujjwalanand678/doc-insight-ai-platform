import { Routes, Route } from 'react-router-dom';
import ToolLayout from './layouts/ToolLayout';

import Home from './pages/Home';
import DocumentAnalyzer from './pages/DocumentAnalyzer';
import ATSChecker from './pages/ATSChecker';
import ImproveContent from './pages/ImproveContent';
import AIChat from './pages/AIChat';
import ImageAnalyzer from './pages/ImageAnalyzer';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<ToolLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Tools */}
        <Route path="analyze" element={<DocumentAnalyzer />} />
        <Route path="ats" element={<ATSChecker />} />
        <Route path="improve" element={<ImproveContent />} />
        <Route path="chat" element={<AIChat />} />
        <Route path="image" element={<ImageAnalyzer />} />

        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
