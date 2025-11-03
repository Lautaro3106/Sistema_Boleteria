import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Viajes from "../Pages/Viajes";
import Compra from "../Pages/Compra";
import AdminDashboard from "../Pages/AdminDashboard";
import GestionViajes from "../Pages/GestionViajes";
import GestionColectivos from "../Pages/GestionColectivos";
import GestionDestinos from "../Pages/GestionDestinos";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viajes" element={<Viajes />} />
      <Route path="/compra/:id" element={<Compra />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/viajes" element={<GestionViajes />} />
      <Route path="/admin/colectivos" element={<GestionColectivos />} />
      <Route path="/admin/destinos" element={<GestionDestinos />} />
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}



