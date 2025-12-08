import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MyRouter } from './router.tsx';
import './index.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyRouter />
    <ToastContainer />
  </StrictMode>
);
