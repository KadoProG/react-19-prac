import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import { Register } from './pages/register';
import { Register2 } from './pages/register-2';
import { Register3 } from './pages/register-3';
import { UseExample } from './pages/use-example';
import { SeparatingEventsFromEffects } from './pages/separating-events-from-effects';
import { UseLayoutEffect } from './pages/use-layout-effect';
import { UseSyncExternalStore } from './pages/use-sync-external-store';

export const MyRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_PATH}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/register3" element={<Register3 />} />
        <Route path="/use-example" element={<UseExample />} />
        <Route path="/separating-events-from-effects" element={<SeparatingEventsFromEffects />} />
        <Route path="/use-layout-effect" element={<UseLayoutEffect />} />
        <Route path="/use-sync-external-store" element={<UseSyncExternalStore />} />
      </Routes>
    </BrowserRouter>
  );
};
