import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">
        PANEL ADMINISTRATIVO
      </h1>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Card - Gestión de Viajes */}
        <Link
          to="/admin/viajes"
          className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <span className="text-5xl mb-4">🗺️</span>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Gestión de Viajes
          </h2>
          <p className="text-gray-600">
            Crear, modificar o eliminar los viajes programados.
          </p>
        </Link>

        {/* Card - Gestión de Colectivos */}
        <Link
          to="/admin/colectivos"
          className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <span className="text-5xl mb-4">🚌</span>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Gestión de Colectivos
          </h2>
          <p className="text-gray-600">
            Registrar, actualizar o eliminar unidades del servicio.
          </p>
        </Link>

        {/* Card - Gestión de Destinos */}
        <Link
          to="/admin/destinos"
          className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <span className="text-5xl mb-4">📍</span>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Gestión de Destinos
          </h2>
          <p className="text-gray-600">
            Agregar o modificar las ciudades disponibles.
          </p>
        </Link>
      </div>
    </div>
  );
}
