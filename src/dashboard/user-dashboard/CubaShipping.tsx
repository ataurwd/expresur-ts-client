import React, { useMemo, useState } from "react";
import { Helmet } from 'react-helmet';

/**
 * CubaShipping.CubaOnly.tsx
 * - At launch: NO transport inside Cuba (no city→city shipments).
 * - Only allows shipments coming FROM Locker Miami → cities in Cuba.
 * - Spanish labels (Cuba friendly).
 */

/* Types */
type Shipment = {
  id: string;
  origin: string;
  originType: "local" | "locker";
  lockerId?: string | null;
  toCity: string;
  service: "standard" | "express";
  weightKg: number;
  consolidated?: boolean;
  fee: number;
  status: "created" | "booked" | "shipped";
  createdAt: string;
  notes?: string;
};

function rnd(prefix = "CUB") {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

/* Only Cuban cities */
const CITIES = [
  "La Habana",
  "Santiago de Cuba",
  "Camagüey",
  "Holguín",
  "Matanzas",
  "Cienfuegos",
  "Pinar del Río",
  "Santa Clara",
  "Baracoa",
  "Guantánamo",
];

/* Initial fake shipments (only locker → Cuba) */
const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: "CUB-1001",
    origin: "Locker Miami (XG15STV)",
    originType: "locker",
    lockerId: "XG15STV",
    toCity: "La Habana",
    service: "standard",
    weightKg: 2.5,
    consolidated: false,
    fee: 32.0,
    status: "created",
    createdAt: "2025-01-12",
    notes: "Frágil",
  },
];

export default function CubaShippingCubaOnly() {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);

  /* Form state */
  // 🔒 No local origin for now – only locker
  const [lockerId, setLockerId] = useState<string>("XG15STV");
  const [toCity, setToCity] = useState<string>(CITIES[0]);
  const [service, setService] = useState<"standard" | "express">("standard");
  const [weightKg, setWeightKg] = useState<number>(1);
  const [consolidate, setConsolidate] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [selected, setSelected] = useState<Shipment | null>(null);

  /* Fee calculation (only locker → Cuba) */
  const fee = useMemo(() => {
    const base = service === "express" ? 18 : 8;
    const weightCost =
      Math.max(1, weightKg) * (service === "express" ? 6 : 3);
    const lockerSurcharge = 10; // always from locker
    const consolidatedDiscount = consolidate ? -5 : 0;

    const raw =
      base + weightCost + lockerSurcharge + consolidatedDiscount;

    return Math.max(
      0,
      Math.round(raw * 100) / 100
    );
  }, [service, weightKg, consolidate]);

  function handleCreate() {
    // validation
    if (!lockerId) return alert("Ingrese Locker ID.");
    if (!toCity) return alert("Seleccione ciudad destino en Cuba.");

    const newShip: Shipment = {
      id: rnd("CUB"),
      origin: `Locker Miami (${lockerId})`,
      originType: "locker",
      lockerId,
      toCity,
      service,
      weightKg,
      consolidated: consolidate,
      fee,
      status: "created",
      createdAt: new Date().toISOString().slice(0, 10),
      notes: notes || undefined,
    };

    setShipments((prev) => [newShip, ...prev]);
    // reset some fields
    setWeightKg(1);
    setNotes("");
    setConsolidate(false);
    setService("standard");

    alert(
      `Envío creado: ${newShip.id} — Tarifa: $${newShip.fee} (Locker Miami → Cuba)`
    );
  }

  function downloadManifest(s: Shipment) {
    const payload = {
      shipment: s,
      note: "Manifesto generado (demo) — EXPRESUR Cuba",
      createdAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${s.id}_manifest.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function markBooked(id: string) {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "booked" } : s
      )
    );
  }

  function markShipped(id: string) {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "shipped" } : s
      )
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Cuba Shipping | EXPRESUR</title>
      </Helmet>
      <div className="mx-auto">
        {/* Top notice: only locker → Cuba, no intra-Cuba transport yet */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 border-l-4 border-[#166534]">
          <h2 className="text-lg font-semibold text-[#166534]">
            Envíos desde Locker Miami hacia Cuba
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            En esta primera etapa{" "}
            <b>
              no está disponible el transporte entre ciudades dentro
              de Cuba
            </b>{" "}
            (por ejemplo, de La Habana a Santiago de Cuba).
            <br />
            Solo puedes crear envíos que salen desde tu{" "}
            <b>locker en Miami</b> y llegan a una ciudad de Cuba.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Origen
              </label>
              <div className="text-sm font-medium text-gray-800 mb-1">
                Locker Miami
              </div>
              <div className="mt-2">
                <label className="text-xs text-gray-500">
                  Locker ID
                </label>
                <input
                  value={lockerId}
                  onChange={(e) => setLockerId(e.target.value)}
                  className="w-full border p-2 rounded-md"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Ej: XG15STV — Casillero en Miami
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500 bg-amber-50 border border-amber-100 p-2 rounded">
                El servicio de envíos locales dentro de Cuba estará
                disponible próximamente.
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Destino (Ciudad en Cuba)
              </label>
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full border p-2 rounded-md"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="text-sm text-gray-600 block mt-3 mb-1">
                Servicio
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setService("standard")}
                  className={`px-3 py-2 border rounded-md ${
                    service === "standard"
                      ? "bg-[#166534] text-white"
                      : ""
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setService("express")}
                  className={`px-3 py-2 border rounded-md ${
                    service === "express"
                      ? "bg-[#166534] text-white"
                      : ""
                  }`}
                >
                  Express
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={weightKg}
                onChange={(e) =>
                  setWeightKg(Number(e.target.value))
                }
                className="w-full border p-2 rounded-md"
              />

              <label className="text-sm text-gray-600 block mt-3 mb-1">
                Consolidar
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="consolidate"
                  type="checkbox"
                  checked={consolidate}
                  onChange={(e) =>
                    setConsolidate(e.target.checked)
                  }
                />
                <label
                  htmlFor="consolidate"
                  className="text-sm text-gray-700"
                >
                  Agregar a consolidación
                </label>
              </div>

              <label className="text-sm text-gray-600 block mt-3 mb-1">
                Notas
              </label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instrucciones (ej: frágil)"
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>

          {/* Fee summary & actions */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-sm text-gray-500">
                Tarifa estimada
              </div>
              <div className="text-2xl font-bold text-[#166534]">
                ${fee.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">
                Cálculo demo — tarifas aproximadas
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-[#166534] text-white rounded-md"
              >
                Crear Envío
              </button>
              <button
                onClick={() => {
                  setWeightKg(1);
                  setNotes("");
                  setConsolidate(false);
                  setService("standard");
                }}
                className="px-4 py-2 border rounded-md"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Shipments list */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Tus Envíos (Locker → Cuba)</h3>
            <div className="text-sm text-gray-500">
              {shipments.length} envíos
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Origen</th>
                  <th className="p-2">Destino</th>
                  <th className="p-2">Servicio</th>
                  <th className="p-2">Peso</th>
                  <th className="p-2">Consol.</th>
                  <th className="p-2">Tarifa</th>
                  <th className="p-2">Estado</th>
                  <th className="p-2 text-right">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {shipments.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-2 font-medium">{s.id}</td>
                    <td className="p-2">{s.origin}</td>
                    <td className="p-2">{s.toCity}</td>
                    <td className="p-2 capitalize">{s.service}</td>
                    <td className="p-2">{s.weightKg} kg</td>
                    <td className="p-2">
                      {s.consolidated ? "Sí" : "No"}
                    </td>
                    <td className="p-2">
                      ${s.fee.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          s.status === "shipped"
                            ? "bg-green-100 text-green-800"
                            : s.status === "booked"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => setSelected(s)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          Ver
                        </button>
                        {s.status === "created" && (
                          <button
                            onClick={() => markBooked(s.id)}
                            className="px-3 py-1 bg-[#166534] text-white rounded text-sm"
                          >
                            Reservar
                          </button>
                        )}
                        {s.status === "booked" && (
                          <button
                            onClick={() => markShipped(s.id)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                          >
                            Marcar Enviado
                          </button>
                        )}
                        <button
                          onClick={() => downloadManifest(s)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          Manifiesto
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal — details */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{selected.id}</h3>
                <p className="text-sm text-gray-500">
                  {selected.origin} → {selected.toCity}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-gray-500">Servicio</div>
                <div className="font-medium capitalize">
                  {selected.service}
                </div>

                <div className="text-xs text-gray-500 mt-3">Peso</div>
                <div className="font-medium">
                  {selected.weightKg} kg
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  Consolidado
                </div>
                <div className="font-medium">
                  {selected.consolidated ? "Sí" : "No"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Tarifa</div>
                <div className="font-medium">
                  ${selected.fee.toFixed(2)}
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  Estado
                </div>
                <div className="font-medium">{selected.status}</div>

                <div className="text-xs text-gray-500 mt-3">
                  Notas
                </div>
                <div className="text-sm">
                  {selected.notes ?? "—"}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => downloadManifest(selected)}
                className="px-4 py-2 border rounded-md"
              >
                Descargar Manifiesto
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-[#166534] text-white rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
