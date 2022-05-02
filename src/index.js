import React from 'react';
import { createRoot, ReactDOM } from 'react-dom/client';
import './index.css';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);

