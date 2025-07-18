import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { Logger } from '../utils/logger';

function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const urlData = urls.find(url => url.shortcode === shortcode);

    if (urlData && new Date(urlData.expiresAt) > new Date()) {
      const clickData = {
        timestamp: new Date().toISOString(),
        source: document.referrer || 'Direct',
        location: 'Unknown' // Simulated; in real app, use geolocation API
      };

      urlData.clicks.push(clickData);
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));

      Logger.log('INFO', 'Redirected to original URL', {
        shortcode,
        longUrl: urlData.longUrl,
        clickCount: urlData.clicks.length
      });

      window.location.href = urlData.longUrl;
    } else {
      Logger.log('ERROR', 'Invalid or expired shortcode', { shortcode });
      navigate('/', { state: { error: 'Invalid or expired URL' } });
    }
  }, [shortcode, navigate]);

  return <CircularProgress />;
}

export default RedirectPage;