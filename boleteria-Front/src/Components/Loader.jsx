export default function Loader({ texto = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-blue-600">
      {/* Spinner animado */}
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 border-solid mb-4"></div>

      {/* Texto opcional */}
      <p className="text-lg font-medium">{texto}</p>
    </div>
  );
}
