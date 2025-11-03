import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 shadow-md z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center py-3 px-6 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTG77YET_q48VSalRwKigb6FIo536PC-_PXw&s"
            alt="ETAR S.A."
            className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-blue-100"
          />
        </div>

        {/* Navegación */}
        <nav aria-label="Principal">
          <ul className="flex gap-6 items-center text-sm font-medium">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/viajes" className="text-gray-700 hover:text-blue-600 transition">
                Viajes
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition">
                Administración
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

