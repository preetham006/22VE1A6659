import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Logger } from '../utils/logger';

function StatsPage() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setShortenedUrls(urls);
    Logger.log('INFO', 'Loaded statistics page', { urlCount: urls.length });
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener Statistics
        </Typography>
        {shortenedUrls.length === 0 ? (
          <Typography>No URLs have been shortened yet.</Typography>
        ) : (
          shortenedUrls.map((url, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">
                <Link
                  to={`/${url.shortcode}`}
                  onClick={() => {
                    Logger.log('INFO', 'Clicked shortened URL from stats', { shortcode: url.shortcode });
                  }}
                >
                  {url.shortUrl}
                </Link>
              </Typography>
              <Typography>Original: {url.longUrl}</Typography>
              <Typography>Created: {new Date(url.createdAt).toLocaleString()}</Typography>
              <Typography>Expires: {new Date(url.expiresAt).toLocaleString()}</Typography>
              <Typography>Total Clicks: {url.clicks.length}</Typography>
              {url.clicks.length > 0 && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1">Click Details:</Typography>
                  <List dense>
                    {url.clicks.map((click, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={`Clicked at ${new Date(click.timestamp).toLocaleString()}`}
                          secondary={`Source: ${click.source || 'Unknown'}, Location: ${click.location || 'Unknown'}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          ))
        )}
        <Button variant="outlined" component={Link} to="/">
          Back to Shortener
        </Button>
      </Box>
    </Container>
  );
}

export default StatsPage;