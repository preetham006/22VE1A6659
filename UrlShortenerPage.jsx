import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Logger } from '../utils/logger';
import { isValidUrl, isValidShortcode, generateShortcode, checkShortcodeUniqueness } from '../utils/helpers';

function UrlShortenerPage() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addUrlInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
      Logger.log('INFO', 'Added new URL input field', { urlCount: urls.length + 1 });
    } else {
      setError('Maximum of 5 URLs can be shortened at once.');
      Logger.log('ERROR', 'Attempted to add more than 5 URLs');
    }
  };

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const validateInputs = () => {
    for (let i = 0; i < urls.length; i++) {
      const { longUrl, validity, shortcode } = urls[i];
      if (!longUrl) {
        setError(`URL at position ${i + 1} is required.`);
        return false;
      }
      if (!isValidUrl(longUrl)) {
        setError(`URL at position ${i + 1} is invalid.`);
        return false;
      }
      if (validity && isNaN(validity)) {
        setError(`Validity at position ${i + 1} must be a number.`);
        return false;
      }
      if (shortcode && !isValidShortcode(shortcode)) {
        setError(`Shortcode at position ${i + 1} must be alphanumeric and 4-10 characters.`);
        return false;
      }
    }
    return true;
  };

  const shortenUrls = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    setError('');

    const newResults = [];
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');

    for (let url of urls) {
      let shortcode = url.shortcode || generateShortcode();

      while (!checkShortcodeUniqueness(shortcode)) {
        shortcode = generateShortcode();
      }

      const validity = url.validity ? parseInt(url.validity) : 30;
      const expiryDate = new Date(Date.now() + validity * 60 * 1000);

      const shortUrlData = {
        longUrl: url.longUrl,
        shortcode,
        shortUrl: `http://localhost:3000/${shortcode}`,
        createdAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
        clicks: [],
      };

      newResults.push(shortUrlData);
      storedUrls.push(shortUrlData);

      Logger.log('INFO', 'Shortened URL', {
        longUrl: url.longUrl,
        shortcode,
        validity,
      });
    }

    localStorage.setItem('shortenedUrls', JSON.stringify(storedUrls));
    setResults(newResults);
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {urls.map((url, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Long URL"
                  value={url.longUrl}
                  onChange={(e) => handleInputChange(index, 'longUrl', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Validity (minutes)"
                  type="number"
                  value={url.validity}
                  onChange={(e) => handleInputChange(index, 'validity', e.target.value)}
                  placeholder="30"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Custom Shortcode (optional)"
                  value={url.shortcode}
                  onChange={(e) => handleInputChange(index, 'shortcode', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={addUrlInput} disabled={urls.length >= 5}>
            Add Another URL
          </Button>
          <Button variant="contained" onClick={shortenUrls} sx={{ ml: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Shorten URLs'}
          </Button>
        </Box>
        {results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Shortened URLs</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Original URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Expires At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.longUrl}</TableCell>
                    <TableCell>
                      <Link
                        to={`/${result.shortcode}`}
                        onClick={() => {
                          Logger.log('INFO', 'Clicked shortened URL', { shortcode: result.shortcode });
                        }}
                      >
                        {result.shortUrl}
                      </Link>
                    </TableCell>
                    <TableCell>{new Date(result.expiresAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" component={Link} to="/stats">
            View Statistics
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default UrlShortenerPage;