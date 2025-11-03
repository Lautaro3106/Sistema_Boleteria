import { useState, useEffect } from "react";
import axios from "axios";

export default function GestionColectivos() {
  const [colectivos, setColectivos] = useState([]);
  const [form, setForm] = useState({
    patente: "",
    modelo: "",
    capacidad: "",
  });
  const [editando, setEditando] = useState(null);

  // 🟢 Cargar colectivos al iniciar
  useEffect(() => {
    cargarColectivos();
  }, []);

  const cargarColectivos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/colectivos");
      setColectivos(res.data);
    } catch (err) {
      console.error("Error al cargar colectivos:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3000/colectivos/${editando}`, form);
      } else {
        await axios.post("http://localhost:3000/colectivos", form);
      }
      setForm({ patente: "", modelo: "", capacidad: "" });
      setEditando(null);
      cargarColectivos();
    } catch (err) {
      console.error("Error al guardar colectivo:", err);
    }
  };

  const handleEditar = (colectivo) => {
    setForm(colectivo);
    setEditando(colectivo.idColectivo);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que querés eliminar este colectivo?")) {
      try {
        await axios.delete(`http://localhost:3000/colectivos/${id}`);
        cargarColectivos();
      } catch (err) {
        console.error("Error al eliminar colectivo:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Gestión de Colectivos
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="patente"
          placeholder="Patente"
          value={form.patente}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          value={form.capacidad}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {editando ? "Actualizar Colectivo" : "Agregar Colectivo"}
        </button>
      </form>

      {/* LISTA DE COLECTIVOS */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-md rounded-xl">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Patente</th>
              <th className="p-2 border">Modelo</th>
              <th className="p-2 border">Capacidad</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colectivos.map((c) => (
              <tr key={c.idColectivo} className="text-center border-t">
                <td className="p-2 border">{c.idColectivo}</td>
                <td className="p-2 border">{c.patente}</td>
                <td className="p-2 border">{c.modelo}</td>
                <td className="p-2 border">{c.capacidad}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => handleEditar(c)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(c.idColectivo)}
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