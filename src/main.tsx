import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import App from './App.tsx';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </HelmetProvider>
  </StrictMode>
);
