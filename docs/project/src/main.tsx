import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PuzzleDataProvider } from './contexts/PuzzleDataContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PuzzleDataProvider year={2026}>
      <App />
    </PuzzleDataProvider>
  </StrictMode>
);
