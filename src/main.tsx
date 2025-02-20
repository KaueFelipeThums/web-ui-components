import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ComponentsProvider } from './providers/components-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComponentsProvider>
      <App />
    </ComponentsProvider>
  </StrictMode>,
);
