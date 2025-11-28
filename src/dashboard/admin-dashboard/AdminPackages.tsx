import React, { useState, useMemo } from "react";

type PackageType = {
  id: string;
  name: string;
  price: string;
  category: string;
  storage: string;
  users: string;
  speed: string;
  security: string;
  support: string;
  description: string;
};

const PACKAGES: PackageType[] = [
  {
    id: "PKG-1001",
    name: "Plan Básico",
    price: "39 USD/mes",
    category: "Pequeñas Empresas",
    storage: "20 GB",
    users: "3 Usuarios",
    speed: "Normal",
    security: "Protección estándar",
    support: "Soporte por Email",
    description:
      "Ideal para pequeños negocios y emprendedores en Cuba que inician su digitalización.",
  },
  {
    id: "PKG-1002",
    name: "Plan Inicial",
    price: "49 USD/mes",
    category: "Pequeñas Empresas",
    storage: "50 GB",
    users: "5 Usuarios",
    speed: "Alta",
    security: "Firewall Básico",
    support: "Soporte por Email y Chat",
    description:
      "Paquete con herramientas esenciales para gestión diaria de empresas pequeñas.",
  },
  {
    id: "PKG-1003",
    name: "Plan Empresarial",
    price: "129 USD/mes",
    category: "Empresas Medianas",
    storage: "200 GB",
    users: "25 Usuarios",
    speed: "Premium",
    security: "Firewall Avanzado",
    support: "Soporte Prioritario",
    description:
      "Diseñado para empresas en crecimiento que requieren mayor rendimiento y control.",
  },
  {
    id: "PKG-1004",
    name: "Plan Premium",
    price: "249 USD/mes",
    category: "Empresas Medianas",
    storage: "500 GB",
    users: "Ilimitados",
    speed: "Ultra",
    security: "Seguridad Avanzada + Auditorías",
    support: "Soporte 24/7",
    description:
      "Perfecto para organizaciones que buscan escalabilidad, automatización y seguridad avanzada.",
  },
  {
    id: "PKG-1005",
    name: "Suite Corporativa",
    price: "Precio Personalizado",
    category: "Grandes Organizaciones",
    storage: "Ilimitado",
    users: "Ilimitados",
    speed: "Ultra Max",
    security: "Cumplimiento GDPR + SOC2",
    support: "Equipo Dedicado 24/7",
    description:
      "Solución empresarial completa para grandes compañías con infraestructura dedicada.",
  },
  {
    id: "PKG-1006",
    name: "Plan Avanzado Internacional",
    price: "299 USD/mes",
    category: "Empresas Internacionales",
    storage: "1 TB",
    users: "50 Usuarios",
    speed: "Ultra Global",
    security: "Cifrado Multi-Región",
    support: "Soporte Multilingüe",
    description:
      "Pensado para compañías que operan fuera de Cuba y requieren conectividad global.",
  },
];

export default function AdminPackages() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<PackageType | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return PACKAGES.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchCategory = category === "all" || p.category === category;

      return matchQuery && matchCategory;
    });
  }, [query, category]);

  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(PACKAGES.map((p) => p.category)))];
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paquetes</h1>
          <p className="text-gray-600">
            Administrar todos los paquetes disponibles en Shining Company.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Buscar paquete..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Todas las categorías" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#166534] text-white text-left">
            <tr>
              <th className="px-5 py-4 font-medium">ID</th>
              <th className="px-5 py-4 font-medium">Nombre</th>
              <th className="px-5 py-4 font-medium">Categoría</th>
              <th className="px-5 py-4 font-medium">Precio</th>
              <th className="px-5 py-4 font-medium">Usuarios</th>
              <th className="px-5 py-4 font-medium">Almacenamiento</th>
              <th className="px-5 py-4 font-medium text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((pkg) => (
              <tr
                key={pkg.id}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-5 py-4 font-semibold text-[#166534]">
                  {pkg.id}
                </td>
                <td className="px-5 py-4">{pkg.name}</td>
                <td className="px-5 py-4">{pkg.category}</td>
                <td className="px-5 py-4">{pkg.price}</td>
                <td className="px-5 py-4">{pkg.users}</td>
                <td className="px-5 py-4">{pkg.storage}</td>

                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => setSelected(pkg)}
                    className="px-4 py-1.5 bg-[#166534] text-white rounded-md hover:bg-green-800 transition"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="px-5 py-6 text-center text-gray-500" colSpan={7}>
                  No se encontraron paquetes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl border">
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{selected.category}</p>

            <div className="mt-4 space-y-2 text-gray-700">
              <p><b>Precio:</b> {selected.price}</p>
              <p><b>Usuarios Permitidos:</b> {selected.users}</p>
              <p><b>Almacenamiento:</b> {selected.storage}</p>
              <p><b>Velocidad:</b> {selected.speed}</p>
              <p><b>Seguridad:</b> {selected.security}</p>
              <p><b>Soporte:</b> {selected.support}</p>
            </div>

            <p className="mt-4 text-gray-700">{selected.description}</p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cerrar
              </button>

              <button className="px-4 py-2 bg-[#166534] text-white rounded-md hover:bg-green-800">
                Contratar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
