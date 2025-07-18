export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidShortcode = (shortcode) => {
  return /^[a-zA-Z0-9]{4,10}$/.test(shortcode);
};

export const checkShortcodeUniqueness = (shortcode) => {
  const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
  return !storedUrls.some(url => url.shortcode === shortcode);
};