import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { tossSDK } from './sdk/tossSDK';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import ChallengePage from './pages/ChallengePage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

export default function App() {
  useEffect(() => {
    tossSDK.ready();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
