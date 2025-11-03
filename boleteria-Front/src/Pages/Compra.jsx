import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


export default function Compra() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viaje, setViaje] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    email: "",
  });
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    const cargarViaje = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viajes/${id}`);
        setViaje(res.data);
      } catch (err) {
        console.error("Error al obtener viaje:", err);
        // Datos de ejemplo si no hay backend
        setViaje({
          idViaje: id,
          origen: "Rafaela",
          destino: "Santa Fe",
          fechaHoraSalida: "2025-11-01T08:00:00",
          fechaHoraLlegada: "2025-11-01T10:30:00",
          precio: 5000,
        });
      }
    };

    cargarViaje();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simula una compra exitosa
      setConfirmado(true);
      setTimeout(() => navigate("/"), 3000); // vuelve al home
    } catch (err) {
      console.error("Error al confirmar compra:", err);
    }
  };

  if (!viaje) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Cargando información del viaje...</p>
      </div>
    );
  }

  if (confirmado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ ¡Compra confirmada!
        </h1>
        <p className="text-gray-600">
          Gracias por tu compra, {form.nombre}. Serás redirigido al inicio...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Confirmar compra
        </h1>

        {/* Detalle del viaje */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">
            {viaje.origen} → {viaje.destino}
          </h2>
          <p>
            <strong>Salida:</strong>{" "}
            {new Date(viaje.fechaHoraSalida).toLocaleString()}
          </p>
          <p>
            <strong>Llegada:</strong>{" "}
            {new Date(viaje.fechaHoraLlegada).toLocaleString()}
          </p>
          <p>
            <strong>Precio:</strong> ${viaje.precio}
          </p>
        </div>

        {/* Formulario del pasajero */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={form.dni}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  );
}

