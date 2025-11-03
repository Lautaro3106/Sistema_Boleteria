import { Link } from "react-router-dom";

export default function ViajeCard({ viaje }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <h2 className="text-xl font-semibold text-blue-600">
        {viaje.origen} → {viaje.destino}
      </h2>
      <p className="text-gray-700">Salida: {new Date(viaje.fechaHoraSalida).toLocaleString()}</p>
      <p className="text-gray-700">Precio: ${viaje.precio}</p>
      <Link
        to={`/compra/${viaje.idViaje}`}
        className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Seleccionar
      </Link>
    </div>
  );
}
