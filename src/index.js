import React from 'react';
import { createRoot, ReactDOM } from 'react-dom/client';
import './index.css';
import App from './App';


const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
