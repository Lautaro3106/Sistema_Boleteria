import { useState } from "react";

export default function BusquedaForm({ onBuscar }) {
  const [form, setForm] = useState({
    origen: "",
    destino: "",
    fecha: "",
    pasajeros: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4">
      <input name="origen" placeholder="Origen" className="border p-2 rounded-md" onChange={handleChange} />
      <input name="destino" placeholder="Destino" className="border p-2 rounded-md" onChange={handleChange} />
      <input type="date" name="fecha" className="border p-2 rounded-md" onChange={handleChange} />
      <input type="number" name="pasajeros" min="1" className="border p-2 rounded-md" onChange={handleChange} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Buscar
      </button>
    </form>
  );
}
