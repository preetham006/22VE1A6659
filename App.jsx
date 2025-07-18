import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import UrlShortenerPage from './pages/UrlShortenerPage';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';
import { Logger } from './utils/logger';

function App() {
  const location = useLocation();
  const [error, setError] = useState(location.state?.error || '');

  useEffect(() => {
    if (error) {
      Logger.log('ERROR', 'Displayed error message', { error });
      setTimeout(() => setError(''), 5000);
    }
  }, [error]);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </>
  );
}

export default App;