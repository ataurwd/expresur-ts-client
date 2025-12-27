import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { X } from "lucide-react";

/* --------------------- Types --------------------- */
type ParcelStatus = "Pending" | "In Transit" | "Delivered" | "Cancelled" | "Returned";

type Parcel = {
  id: string;
  orderId: string;
  customer: string;
  phone?: string;
  email?: string;
  origin: string;
  destination: string;
  weightKg: number;
  date: string;
  status: ParcelStatus;
  eta?: string;
  notes?: string;
  lockerId?: string;
  location?: { lat: number; lng: number; lastSeen: string };
};

/* --------------------- Fake Data --------------------- */
/* --------------------- Fake Data – Locker ID = XG15STV for ALL --------------------- */
const FAKE_PARCELS: Parcel[] = [
  { id: "P-1001", orderId: "ORD-1001", customer: "María González", email: "maria.gonzalez@example.com", phone: "+53 51 123456", lockerId: "XG15STV", origin: "Barcelona, Spain", destination: "Havana, Cuba", weightKg: 2.3, date: "2025-02-03", status: "Pending", notes: "Pick up at office" },
  { id: "P-1002", orderId: "ORD-1002", customer: "Carlos Pérez", email: "carlos.perez@example.com", phone: "+53 5 1234567", lockerId: "XG15STV", origin: "Santiago de Cuba", destination: "Miami, USA", weightKg: 5.0, date: "2025-02-01", status: "In Transit" },
  { id: "P-1003", orderId: "ORD-1003", customer: "Ana López", email: "ana.lopez@example.com", phone: "+34 678901234", lockerId: "XG15STV", origin: "Valencia, Spain", destination: "Camagüey, Cuba", weightKg: 1.2, date: "2025-01-30", status: "Delivered" },
  { id: "P-1004", orderId: "ORD-1004", customer: "Luis Fernández", email: "luis.fernandez@example.com", phone: "+1 305 555 0198", lockerId: "XG15STV", origin: "Miami, USA", destination: "Havana, Cuba", weightKg: 12.4, date: "2025-01-29", status: "Delivered" },
  { id: "P-1005", orderId: "ORD-1005", customer: "Elena Martínez", email: "elena.martinez@example.com", phone: "+34 654321987", lockerId: "XG15STV", origin: "Madrid, Spain", destination: "Holguín, Cuba", weightKg: 3.5, date: "2025-02-05", status: "Pending" },
  { id: "P-1006", orderId: "ORD-1006", customer: "Roberto Díaz", email: "roberto.diaz@example.com", phone: "+53 5 9876543", lockerId: "XG15STV", origin: "Varadero, Cuba", destination: "Madrid, Spain", weightKg: 8.1, date: "2025-01-27", status: "Returned", notes: "Customs issue" },
  { id: "P-1007", orderId: "ORD-1007", customer: "Sofia Rivera", email: "sofia.rivera@example.com", phone: "+34 699112233", lockerId: "XG15STV", origin: "Málaga, Spain", destination: "Cuba (Domestic)", weightKg: 0.9, date: "2025-02-02", status: "In Transit" },
  { id: "P-1008", orderId: "ORD-1008", customer: "Jorge Herrera", email: "jorge.herrera@example.com", phone: "+1 7864445566", lockerId: "XG15STV", origin: "New York, USA", destination: "Havana, Cuba", weightKg: 7.7, date: "2025-01-31", status: "Cancelled", notes: "Customer cancelled" },
  { id: "P-1009", orderId: "ORD-1009", customer: "Isabel Torres", email: "isabel.torres@example.com", phone: "+34 622334455", lockerId: "XG15STV", origin: "Sevilla, Spain", destination: "Santa Clara, Cuba", weightKg: 4.4, date: "2025-02-04", status: "Pending" },
  { id: "P-1010", orderId: "ORD-1010", customer: "Miguel Ruiz", email: "miguel.ruiz@example.com", phone: "+53 5 5551234", lockerId: "XG15STV", origin: "Havana, Cuba", destination: "Panama City, Panama", weightKg: 10.0, date: "2025-01-28", status: "In Transit" },
];

/* --------------------- Helpers --------------------- */
function fmt(d: string) {
  return new Date(d).toLocaleDateString();
}

function statusClasses(s: ParcelStatus) {
  const map: Record<ParcelStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    "In Transit": "bg-blue-100 text-blue-800 border border-blue-300",
    Delivered: "bg-green-100 text-green-800 border border-green-300",
    Cancelled: "bg-red-100 text-red-800 border border-red-300",
    Returned: "bg-purple-100 text-purple-800 border border-purple-300",
  };
  return map[s];
}

/* --------------------- Component --------------------- */
export default function AdminTracking() {
  const [parcels] = useState<Parcel[]>(FAKE_PARCELS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Parcel | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return parcels.filter((p) => {
      const matchesSearch =
        p.orderId.toLowerCase().includes(q) ||
        p.customer.toLowerCase().includes(q) ||
        (p.email ?? "").toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [parcels, search, statusFilter]);

  const totals = useMemo(() => {
    const t = { total: parcels.length, pending: 0, inTransit: 0, delivered: 0, cancelled: 0, returned: 0 };
    parcels.forEach((p) => {
      if (p.status === "Pending") t.pending++;
      if (p.status === "In Transit") t.inTransit++;
      if (p.status === "Delivered") t.delivered++;
      if (p.status === "Cancelled") t.cancelled++;
      if (p.status === "Returned") t.returned++;
    });
    t.total = parcels.length;
    return t;
  }, [parcels]);

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Helmet><title>Admin Tracking | EXPRESUR</title></Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold text-gray-900">Tracking — Parcels</h1>
        <p className="text-[18px] text-gray-600 mt-2">Gestión y seguimiento de todos los envíos</p>
      </div>

      {/* Filter + Search Section */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por Order, Cliente, Email..."
            className="px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
          >
            <option value="all">Todos los estados</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); }}
            className="px-4 py-3.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
          >
            Reset
          </button>
        </div>
      </div>

          {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total", value: totals.total, color: "gray" },
            { label: "Pending", value: totals.pending, color: "yellow" },
            { label: "In Transit", value: totals.inTransit, color: "blue" },
            { label: "Delivered", value: totals.delivered, color: "green" },
            { label: "Cancelled", value: totals.cancelled, color: "red" },
            { label: "Returned", value: totals.returned, color: "purple" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-xs text-gray-500">{kpi.label}</div>
              <div className={`text-2xl font-bold text-${kpi.color}-600`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Table - Desktop */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#166534] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Cliente</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Route</th>
                  <th className="px-4 py-3 text-left">Weight</th>
                  <th className="px-4 py-3 text-left">Locker ID</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-[#166534]">{p.orderId}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{p.customer}</div>
                      {p.phone && <div className="text-xs text-gray-500">{p.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm">{p.email ?? "—"}</td>
                    <td className="px-4 py-3 text-sm">
                      <div>{p.origin}</div>
                      <div className="text-gray-500 text-xs">→ {p.destination}</div>
                    </td>
                    <td className="px-4 py-3">{p.weightKg} kg</td>
                    <td className="px-4 py-3 font-medium">{p.lockerId ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelected(p)}
                        className="px-4 py-2 bg-[#166534] text-white text-sm rounded hover:bg-[#145c2e] transition"
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">No parcels found.</div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y">
            {filtered.map((p) => (
              <div key={p.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-[#166534]">{p.orderId}</div>
                    <div className="font-medium">{p.customer}</div>
                    <div className="text-sm text-gray-600">{p.email ?? "—"}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(p.status)}`}>
                    {p.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {p.origin} → {p.destination}
                </div>
                <div className="grid grid-cols-3 text-sm gap-2 mb-3">
                  <div><span className="text-gray-500">Weight:</span> {p.weightKg} kg</div>
                  <div><span className="text-gray-500">Locker:</span> {p.lockerId ?? "—"}</div>
                </div>
                <button
                  onClick={() => setSelected(p)}
                  className="w-full py-2 bg-[#166534] text-white rounded hover:bg-[#145c2e]"
                >
                  Detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600">Mostrando {filtered.length} resultados</div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg">Export CSV</button>
            <button className="px-4 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#145c2e]">
              Live Map
            </button>
          </div>
        </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Parcel Details</h2>
                <p className="text-green-700 font-semibold text-lg mt-1">{selected.orderId}</p>
              </div>

              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">
                <X size={28} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <div><strong>Cliente:</strong> {selected.customer}</div>
                {selected.phone && <div><strong>Teléfono:</strong> {selected.phone}</div>}
                {selected.email && <div><strong>Email:</strong> {selected.email}</div>}
                <div><strong>Peso:</strong> {selected.weightKg} kg</div>
                <div><strong>Locker ID:</strong> {selected.lockerId ?? "—"}</div>
                <div><strong>Fecha:</strong> {fmt(selected.date)}</div>
                {selected.notes && <div><strong>Notas:</strong> {selected.notes}</div>}
              </div>

              <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
                Mapa en vivo (simulado)
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="px-5 py-2 border rounded-lg">
                Cerrar
              </button>
              <button className="px-5 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#145c2e]">
                Ver Logs
              </button>
              <button className="px-5 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#145c2e]">
                Notificar Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}