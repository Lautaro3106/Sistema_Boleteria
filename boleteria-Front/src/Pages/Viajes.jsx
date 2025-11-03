import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";


export default function Viajes() {
  const [viajes, setViajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarViajes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/viajes");
        setViajes(res.data);
      } catch (err) {
        console.error("Error al obtener viajes:", err);
        // Datos de ejemplo si no hay backend disponible
        setViajes([
          {
            idViaje: 1,
            origen: "Rafaela",
            destino: "Santa Fe",
            fechaHoraSalida: "2025-11-01T08:00:00",
            fechaHoraLlegada: "2025-11-01T10:30:00",
            precio: 5000,
          },
          {
            idViaje: 2,
            origen: "Rafaela",
            destino: "Rosario",
            fechaHoraSalida: "2025-11-01T09:00:00",
            fechaHoraLlegada: "2025-11-01T12:00:00",
            precio: 7500,
          },
        ]);
        setError("No se pudo conectar con el servidor. Mostrando datos simulados.");
      } finally {
        setCargando(false);
      }
    };

    cargarViajes();
  }, []);

if (cargando) {
  return <Loader texto="Cargando viajes disponibles..." />;
}


  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
        VIAJES DISPONIBLES
      </h1>

      {error && (
        <p className="text-center text-yellow-600 mb-4 font-semibold">
          {error}
        </p>
      )}

      {viajes.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay viajes disponibles en este momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viajes.map((v) => (
            <div
              key={v.idViaje}
              className="bg-white border rounded-xl shadow-md p-6 hover:shadow-lg transition text-left"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {v.origen} → {v.destino}
              </h2>
              <p className="text-gray-700">
                <strong>Salida:</strong>{" "}
                {new Date(v.fechaHoraSalida).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Llegada:</strong>{" "}
                {new Date(v.fechaHoraLlegada).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Precio:</strong> ${v.precio}
              </p>

              <Link
                to={`/compra/${v.idViaje}`}
                className="block bg-blue-600 text-center text-white py-2 px-4 rounded-md  hover:bg-blue-700 transition"
              >
                Comprar pasaje
              </Link>
            </div>
          ))}
        </div>
        
      )}
    </div>
  );
}
