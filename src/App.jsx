import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

// HashRouter é usado de propósito: GitHub Pages não tem servidor com
// roteamento configurável, então URLs como /admin com BrowserRouter dão
// erro 404 ao recarregar a página. Com HashRouter, o painel fica em
// /#/admin, que sempre funciona em hospedagem estática.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}
