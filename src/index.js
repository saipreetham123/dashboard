import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider ';
import { LoadingProvider } from './LoadingContext';
import LoadingHandler from './Layout/LoadingHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <LoadingProvider>
        <LoadingHandler/>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  </BrowserRouter>
);
