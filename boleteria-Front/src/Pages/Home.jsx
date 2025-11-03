import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [form, setForm] = useState({
    origen: "",
    destino: "",
    fecha: "",
    pasajeros: 1,
  });
  const [viajes, setViajes] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
  e.preventDefault();

  // Validar campos requeridos
  if (!form.origen || !form.destino || !form.fecha || form.pasajeros < 1) {
    alert("Por favor completá todos los campos antes de buscar.");
    return;
  }

  // Si todo está completo → navegar
  navigate("/viajes");
};


  console.log("🏠 HOME VISIBLE");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Barra superior */}
      <header className="fixed top-0 left-0 w-full bg-white/90 shadow-md z-50 backdrop-blur-sm">
        <div className="flex justify-between items-center py-3 px-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTG77YET_q48VSalRwKigb6FIo536PC-_PXw&s"
              alt="ETAR S.A."
              className="w-16 h-16 rounded-full object-cover shadow-lg border-4 border-blue-100"
            />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
<main className="flex-grow flex flex-col justify-center items-center text-center px-10 pt-16 w-full">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
           BOLETERIA ETAR 
          </h1>
          <p className="text-gray-600 mb-10 max-w-xl">
            Buscá y reservá tus pasajes de forma rápida, simple y segura.
          </p>

          <form
            onSubmit={handleBuscar}
            className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-5xl flex flex-wrap md:flex-nowrap gap-4 justify-center items-center border border-blue-100 backdrop-blur-sm"
          >
            <input
              type="text"
              name="origen"
              placeholder="Origen"
              value={form.origen}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="destino"
              placeholder="Destino"
              value={form.destino}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="pasajeros"
              min="1"
              value={form.pasajeros}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue hover:bg-brand-dark"            >
              Buscar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

