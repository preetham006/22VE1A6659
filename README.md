URL Shortener Web App
A React-based URL shortener built with Vite and Material-UI, running on http://localhost:3000. It allows shortening up to 5 URLs with client-side validation, custom shortcodes, 30-minute default validity, and click tracking. Features a statistics page and client-side routing.
Features

Shorten up to 5 URLs at once
Client-side validation for URLs and shortcodes
Custom shortcodes (alphanumeric, 4-10 characters)
Default 30-minute validity, customizable
Statistics page with click tracking
Client-side routing with react-router-dom
Material-UI styling with Roboto font
Simulated Logging Middleware (replace with your own)

Prerequisites

Node.js (v18 or higher)
npm (v8 or higher)

Setup

Clone the repository:git clone <repository-url>
cd url-shortener


Install dependencies:npm install


Start the development server:npm run dev

The app runs on http://localhost:3000.

Project Structure
url_shortener/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/
│   │   ├── UrlShortenerPage.jsx
│   │   ├── StatsPage.jsx
│   │   └── RedirectPage.jsx
│   ├── utils/
│   │   ├── logger.js
│   │   └── helpers.js
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css (optional)
├── index.html
├── package.json
├── vite.config.js
└── README.md

Usage

Shorten URLs: On the homepage (/), enter up to 5 URLs, optional validity (minutes), and custom shortcodes. Click "Shorten URLs" to generate short links.
View Statistics: Navigate to /stats to see shortened URLs, creation/expiry dates, and click details.
Redirect: Access shortened URLs (e.g., /abc123) to redirect to the original URL with click tracking.

Dependencies

@mui/material, @emotion/react, @emotion/styled for styling
@fontsource/roboto for typography
react-router-dom for routing
@vitejs/plugin-react for Vite React support

Notes

Replace src/utils/logger.js with your Pre-Test Setup Logging Middleware.
The app uses localStorage for persistence.
Runs on port 3000 (configured in vite.config.js).

License
MIT License
