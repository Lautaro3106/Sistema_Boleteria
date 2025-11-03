import { useState, useEffect } from "react";
import axios from "axios";

export default function GestionViajes() {
  const [viajes, setViajes] = useState([]);
  const [form, setForm] = useState({
    idColectivo: "",
    idDestinoOrigen: "",
    idDestinoDestino: "",
    fechaHoraSalida: "",
    fechaHoraLlegada: "",
    precio: "",
  });
  const [editando, setEditando] = useState(null);

  // 🟢 Cargar viajes al iniciar
  useEffect(() => {
    cargarViajes();
  }, []);

  const cargarViajes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viajes");
      setViajes(res.data);
    } catch (err) {
      console.error("Error al cargar viajes:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        // Actualizar viaje
        await axios.put(`http://localhost:3000/viajes/${editando}`, form);
      } else {
        // Crear nuevo viaje
        await axios.post("http://localhost:3000/viajes", form);
      }
      setForm({
        idColectivo: "",
        idDestinoOrigen: "",
        idDestinoDestino: "",
        fechaHoraSalida: "",
        fechaHoraLlegada: "",
        precio: "",
      });
      setEditando(null);
      cargarViajes();
    } catch (err) {
      console.error("Error al guardar viaje:", err);
    }
  };

  const handleEditar = (viaje) => {
    setForm(viaje);
    setEditando(viaje.idViaje);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que querés eliminar este viaje?")) {
      try {
        await axios.delete(`http://localhost:3000/viajes/${id}`);
        cargarViajes();
      } catch (err) {
        console.error("Error al eliminar viaje:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Gestión de Viajes
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="idColectivo"
          placeholder="ID Colectivo"
          value={form.idColectivo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="idDestinoOrigen"
          placeholder="Origen (ID destino)"
          value={form.idDestinoOrigen}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="idDestinoDestino"
          placeholder="Destino (ID destino)"
          value={form.idDestinoDestino}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="fechaHoraSalida"
          value={form.fechaHoraSalida}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="fechaHoraLlegada"
          value={form.fechaHoraLlegada}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {editando ? "Actualizar Viaje" : "Agregar Viaje"}
        </button>
      </form>

      {/* LISTA DE VIAJES */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-md rounded-xl">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Colectivo</th>
              <th className="p-2 border">Origen</th>
              <th className="p-2 border">Destino</th>
              <th className="p-2 border">Salida</th>
              <th className="p-2 border">Llegada</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((v) => (
              <tr key={v.idViaje} className="text-center border-t">
                <td className="p-2 border">{v.idViaje}</td>
                <td className="p-2 border">{v.idColectivo}</td>
                <td className="p-2 border">{v.idDestinoOrigen}</td>
                <td className="p-2 border">{v.idDestinoDestino}</td>
                <td className="p-2 border">
                  {new Date(v.fechaHoraSalida).toLocaleString()}
                </td>
                <td className="p-2 border">
                  {new Date(v.fechaHoraLlegada).toLocaleString()}
                </td>
                <td className="p-2 border">${v.precio}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => handleEditar(v)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(v.idViaje)}
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
