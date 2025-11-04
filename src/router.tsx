import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Register } from './pages/register';

export const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
