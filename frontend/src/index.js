import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in BrowserRouter
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);