import { useState, useEffect } from "react";
import axios from "axios";

export default function GestionDestinos() {
  const [destinos, setDestinos] = useState([]);
  const [form, setForm] = useState({
    ciudad: "",
  });
  const [editando, setEditando] = useState(null);

  // 🟢 Cargar destinos al iniciar
  useEffect(() => {
    cargarDestinos();
  }, []);

  const cargarDestinos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/destinos");
      setDestinos(res.data);
    } catch (err) {
      console.error("Error al cargar destinos:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3000/destinos/${editando}`, form);
      } else {
        await axios.post("http://localhost:3000/destinos", form);
      }
      setForm({ ciudad: "" });
      setEditando(null);
      cargarDestinos();
    } catch (err) {
      console.error("Error al guardar destino:", err);
    }
  };

  const handleEditar = (destino) => {
    setForm(destino);
    setEditando(destino.idDestino);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que querés eliminar este destino?")) {
      try {
        await axios.delete(`http://localhost:3000/destinos/${id}`);
        cargarDestinos();
      } catch (err) {
        console.error("Error al eliminar destino:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Gestión de Destinos
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-center"
      >
        <input
          type="text"
          name="ciudad"
          placeholder="Nombre de la ciudad"
          value={form.ciudad}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          {editando ? "Actualizar Destino" : "Agregar Destino"}
        </button>
      </form>

      {/* LISTA DE DESTINOS */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-md rounded-xl">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Ciudad</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {destinos.map((d) => (
              <tr key={d.idDestino} className="text-center border-t">
                <td className="p-2 border">{d.idDestino}</td>
                <td className="p-2 border">{d.ciudad}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => handleEditar(d)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(d.idDestino)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
