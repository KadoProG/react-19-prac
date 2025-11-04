import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MyRouter } from './router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyRouter />
  </StrictMode>
);
