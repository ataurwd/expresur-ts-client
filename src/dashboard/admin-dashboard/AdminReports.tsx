import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { X } from "lucide-react";

type ReportRow = {
  id: string;
  date: string;
  type: "Revenue" | "Delivery" | "Pickup";
  amount: number;
  reference?: string;
  customer?: string;
  note?: string;
};

const FAKE_REPORTS: ReportRow[] = [
  { id: "R-1001", date: "2025-01-12", type: "Revenue", amount: 1200, reference: "INV-1001", customer: "Empresa A" },
  { id: "R-1002", date: "2025-01-11", type: "Delivery", amount: 34, reference: "DLV-2001", customer: "Cliente B" },
  { id: "R-1003", date: "2025-01-11", type: "Pickup", amount: 7, reference: "PK-3001", customer: "Cliente C" },
  { id: "R-1004", date: "2025-01-10", type: "Revenue", amount: 850, reference: "INV-1002", customer: "Empresa D" },
  { id: "R-1005", date: "2025-01-09", type: "Delivery", amount: 21, reference: "DLV-2002", customer: "Cliente E" },
  { id: "R-1006", date: "2025-01-08", type: "Revenue", amount: 4300, reference: "INV-1003", customer: "Empresa F" },
  { id: "R-1007", date: "2024-12-29", type: "Pickup", amount: 12, reference: "PK-3002", customer: "Cliente G" },
  { id: "R-1008", date: "2024-12-21", type: "Revenue", amount: 900, reference: "INV-1004", customer: "Empresa H" },
  { id: "R-1009", date: "2024-11-30", type: "Delivery", amount: 48, reference: "DLV-2003", customer: "Cliente I" },
  { id: "R-1010", date: "2024-10-15", type: "Revenue", amount: 700, reference: "INV-1005", customer: "Empresa J" },
  { id: "R-1011", date: "2025-01-07", type: "Delivery", amount: 15, reference: "DLV-2004", customer: "Cliente K" },
  { id: "R-1012", date: "2025-01-06", type: "Pickup", amount: 5, reference: "PK-3003", customer: "Cliente L" },
  { id: "R-1013", date: "2024-12-05", type: "Revenue", amount: 1200, reference: "INV-1006", customer: "Empresa M" },
  { id: "R-1014", date: "2024-12-01", type: "Delivery", amount: 60, reference: "DLV-2005", customer: "Cliente N" },
  { id: "R-1015", date: "2024-11-20", type: "Pickup", amount: 9, reference: "PK-3004", customer: "Cliente O" },
];

function formatDate(d: string) {
  const dt = new Date(d + "T00:00:00");
  // use Cuban Spanish locale
  return dt.toLocaleDateString("es-CU", { year: "numeric", month: "short", day: "numeric" });
}

function downloadCSV(rows: ReportRow[]) {
  const header = ["id", "date", "type", "amount", "reference", "customer", "note"];
  const csv = [
    header.join(","),
    ...rows.map(r =>
      [
        r.id,
        r.date,
        r.type,
        String(r.amount),
        r.reference ?? "",
        r.customer ?? "",
        r.note ? `"${String(r.note).replace(/"/g, '""')}"` : ""
      ].join(",")
    )
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `informes_export_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminReports() {
  const [from, setFrom] = useState<string>("2024-11-01");
  const [to, setTo] = useState<string>("2025-01-31");
  const [typeFilter, setTypeFilter] = useState<"All" | ReportRow["type"]>("All");
  const [search, setSearch] = useState<string>("");
  const [selectedReport, setSelectedReport] = useState<ReportRow | null>(null);

  const [page, setPage] = useState<number>(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const f = new Date(from + "T00:00:00");
    const t = new Date(to + "T23:59:59");

    return FAKE_REPORTS.filter(r => {
      const rd = new Date(r.date + "T00:00:00");
      if (rd < f || rd > t) return false;
      if (typeFilter !== "All" && r.type !== typeFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        (r.reference ?? "").toLowerCase().includes(q) ||
        (r.customer ?? "").toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
      );
    }).sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [from, to, typeFilter, search]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const kpi = useMemo(() => {
    const revenue = filtered.filter(r => r.type === "Revenue").reduce((s, r) => s + r.amount, 0);
    const deliveries = filtered.filter(r => r.type === "Delivery").reduce((s, r) => s + r.amount, 0);
    const pickups = filtered.filter(r => r.type === "Pickup").reduce((s, r) => s + r.amount, 0);
    return { revenue, deliveries, pickups };
  }, [filtered]);

  const getTypeColor = (type: ReportRow["type"]) => {
    switch (type) {
      case "Revenue": return "bg-green-100 text-green-800 border border-green-300";
      case "Delivery": return "bg-blue-100 text-blue-800 border border-blue-300";
      case "Pickup": return "bg-purple-100 text-purple-800 border border-purple-300";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Helmet><title>Admin Reports | EXPRESUR</title></Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Informes</h1>
        <p className="text-gray-600 mt-2">Análisis y seguimiento — resumen de ingresos, entregas y recogidas</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-xs text-gray-500 font-medium">Desde</label>
            <input
              type="date"
              value={from}
              onChange={(e) => { setFrom(e.target.value); setPage(1); }}
              className="w-full px-4 py-3.5 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-medium">Hasta</label>
            <input
              type="date"
              value={to}
              onChange={(e) => { setTo(e.target.value); setPage(1); }}
              className="w-full px-4 py-3.5 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-medium">Tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value as any); setPage(1); }}
              className="w-full px-4 py-3.5 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            >
              <option value="All">Todos</option>
              <option value="Revenue">Ingresos</option>
              <option value="Delivery">Entrega</option>
              <option value="Pickup">Recogida</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="text-xs text-gray-500 font-medium">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por ID, referencia, cliente..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full px-4 py-3.5 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{total}</span> resultados
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setFrom("2024-11-01"); setTo("2025-01-31"); setTypeFilter("All"); setSearch(""); setPage(1); }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Restablecer
            </button>
            <button
              onClick={() => downloadCSV(filtered)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
            >
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
          <div className="text-sm text-gray-500 font-medium">Ingresos Totales</div>
          <div className="text-3xl font-bold text-green-700 mt-2">${kpi.revenue.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-2">Suma de ingresos en el rango filtrado</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
          <div className="text-sm text-gray-500 font-medium">Total Entregas</div>
          <div className="text-3xl font-bold text-blue-700 mt-2">{kpi.deliveries}</div>
          <p className="text-xs text-gray-500 mt-2">Cantidad de entregas registradas</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
          <div className="text-sm text-gray-500 font-medium">Total Recogidas</div>
          <div className="text-3xl font-bold text-purple-700 mt-2">{kpi.pickups}</div>
          <p className="text-xs text-gray-500 mt-2">Cantidad de recogidas registradas</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Registros de Informes</h2>
          <p className="text-sm text-gray-500 mt-1">
            {total} registros • {pageCount} página(s)
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Fecha</th>
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                <th className="px-6 py-4 text-left font-semibold">Referencia</th>
                <th className="px-6 py-4 text-left font-semibold">Cliente</th>
                <th className="px-6 py-4 text-right font-semibold">Monto</th>
                <th className="px-6 py-4 text-center font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paged.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-600">{formatDate(r.date)}</td>
                  <td className="px-6 py-4 font-semibold text-green-700">{r.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(r.type)}`}>
                      {r.type === "Revenue" ? "Ingresos" : r.type === "Delivery" ? "Entrega" : "Recogida"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{r.reference ?? "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{r.customer ?? "—"}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {r.type === "Revenue" ? (
                      <span className="text-green-700">${r.amount.toLocaleString()}</span>
                    ) : (
                      <span className="text-gray-700">{r.amount}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedReport(r)}
                      className="text-green-700 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition"
                    >
                      Ver Detalles →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paged.length === 0 && (
            <div className="text-center py-12 text-gray-500">No hay registros que coincidan con los filtros.</div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {paged.map((r) => (
            <div key={r.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm font-semibold text-green-700">{r.id}</div>
                  <div className="text-xs text-gray-500 mt-1">{formatDate(r.date)}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(r.type)}`}>
                  {r.type === "Revenue" ? "Ingresos" : r.type === "Delivery" ? "Entrega" : "Recogida"}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <div><span className="text-gray-500">Cliente:</span> {r.customer ?? "—"}</div>
                <div><span className="text-gray-500">Referencia:</span> {r.reference ?? "—"}</div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div>
                  {r.type === "Revenue" ? (
                    <div className="text-lg font-bold text-green-700">${r.amount.toLocaleString()}</div>
                  ) : (
                    <div className="text-lg font-bold text-gray-700">{r.amount} registros</div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(r)}
                className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-sm"
              >
                Ver Detalles
              </button>
            </div>
          ))}
          {paged.length === 0 && (
            <div className="p-6 text-center text-gray-500">No hay registros que coincidan con los filtros.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          Mostrando {start + 1}–{Math.min(start + perPage, total)} de {total}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>
          <div className="flex gap-1">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  page === i + 1
                    ? "bg-green-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={page === pageCount}
            onClick={() => setPage(p => Math.min(pageCount, p + 1))}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Detalles del Informe</h2>
                <p className="text-green-700 font-semibold text-lg mt-1">{selectedReport.id}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mt-1 ${getTypeColor(selectedReport.type)}`}>
                    {selectedReport.type === "Revenue" ? "Ingresos" : selectedReport.type === "Delivery" ? "Entrega" : "Recogida"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-semibold text-gray-900 mt-1">{formatDate(selectedReport.date)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedReport.customer ?? "—"}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Monto</p>
                  {selectedReport.type === "Revenue" ? (
                    <p className="text-3xl font-bold text-green-700 mt-1">${selectedReport.amount.toLocaleString()}</p>
                  ) : (
                    <p className="text-3xl font-bold text-gray-700 mt-1">{selectedReport.amount}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Referencia</p>
                  <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg mt-1">
                    {selectedReport.reference ?? "—"}
                  </p>
                </div>
              </div>
            </div>

            {selectedReport.note && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">Notas</p>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg mt-2">{selectedReport.note}</p>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cerrar
              </button>
              <button
                onClick={() => downloadCSV([selectedReport])}
                className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
