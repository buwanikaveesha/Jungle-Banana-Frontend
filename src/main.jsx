import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Ensure this path is correct
import './index.css'; // Import your CSS file

// Create the root and render the App component
const root = createRoot(document.getElementById('root')); // Only create the root once
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
