
# URL Shortener

A React-based URL shortener application built with Vite. This app allows users to shorten URLs, view statistics, and handle redirects using shortcodes.

## Features

- Shorten long URLs to short, shareable links
- View statistics about shortened URLs
- Redirect to original URLs using shortcodes
- Error handling with user-friendly alerts
- Built with React, React Router, and Material UI

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:

```bash
cd my-react-app/url_shortener
```

3. Install dependencies:

```bash
npm install
```

## Running the App

To start the development server with hot reload:

```bash
npm run dev
```

Open your browser and go to the URL shown in the terminal (usually http://localhost:3000).

## Building for Production

To build the app for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

Below is the repository structure for the URL Shortener app:

```
my-react-app/url_shortener/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── UrlShortenerPage.jsx
│   │   ├── StatsPage.jsx
│   │   └── RedirectPage.jsx
│   ├── utils/
│   │   ├── helpers.js
│   │   └── logger.js
│   ├── App.css
│   ├── index.css
│   └── assets/
│       └── react.svg
└── public/
    └── vite.svg
  

## Dependencies

- React 18
- React Router DOM 6
- Material UI (MUI)
- Emotion (CSS-in-JS)
- Vite (build tool)

## License

This project is private and not published under any license.
