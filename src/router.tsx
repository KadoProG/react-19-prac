import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Register } from './pages/register';
import { Register2 } from './pages/register-2';

export const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
      </Routes>
    </BrowserRouter>
  );
};
