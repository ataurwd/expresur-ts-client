import React, { useState } from "react";

export default function PickupForm(){
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    fecha: "",
    franja: "",
    paquete: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // replace with your submit logic
    console.log("submit", form);
    alert("Formulario enviado (demo)\nRevisa la consola");
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-center text-orange-400 font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-8">
        Ideal para clientes ocupados
      </h2>

      <div className="max-w-6xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-green-800 border border-orange-400 rounded-3xl shadow-[0_8px_0_rgba(243,152,30,0.2)] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
        >
          {/* Left column */}
          <div className="space-y-4">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              placeholder="Ciudad/Zona"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <input
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              placeholder="Fecha"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              name="franja"
              value={form.franja}
              onChange={handleChange}
              placeholder="Franja horaria"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              name="paquete"
              value={form.paquete}
              onChange={handleChange}
              placeholder="Tipo de paquete"
              className="w-full rounded-full py-3 px-6 bg-transparent placeholder:text-orange-200 text-white border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <div className="flex justify-end md:justify-center lg:justify-end pt-2">
              <button
                type="submit"
                className="inline-block rounded-full py-3 px-8 bg-orange-400 text-white font-semibold tracking-wider shadow-md hover:shadow-lg transition"
              >
                PROGRAMAR RECOGIDA
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
