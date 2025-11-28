import React, { useMemo, useState, useEffect } from "react";

/* TYPES */
type Package = {
  id: string;
  name: string;
  price: string;
  status: "active" | "inactive";
  type: string;
  truckStatus: "moving" | "stopped" | "offline";
  created: string;
  features: string[];
  location: {
    city: string;
    lat: number;
    lng: number;
    lastUpdate: string;
  };
};

/* --- 🔥 Fake Location Truck Data --- */
const FAKE_PACKAGES: Package[] = [
  {
    id: "p1",
    name: "Basic Cargo",
    price: "$29",
    status: "active",
    type: "Small",
    truckStatus: "moving",
    created: "2024-01-15",
    features: ["5 KG max", "City delivery", "1 vehicle"],
    location: {
      city: "Dhaka",
      lat: 23.8103,
      lng: 90.4125,
      lastUpdate: "2025-01-12 10:22 AM",
    },
  },
  {
    id: "p2",
    name: "Business Cargo",
    price: "$99",
    status: "active",
    type: "Medium",
    truckStatus: "stopped",
    created: "2024-02-10",
    features: ["50 KG max", "Intercity", "5 vehicles"],
    location: {
      city: "Chattogram",
      lat: 22.3569,
      lng: 91.7832,
      lastUpdate: "2025-01-12 09:40 AM",
    },
  },
  {
    id: "p3",
    name: "Premium Cargo",
    price: "$199",
    status: "inactive",
    type: "Large",
    truckStatus: "offline",
    created: "2024-03-08",
    features: ["100 KG max", "Nationwide shipment", "20 vehicles"],
    location: {
      city: "Sylhet",
      lat: 24.8949,
      lng: 91.8687,
      lastUpdate: "2025-01-11 04:10 PM",
    },
  },
  {
    id: "p4",
    name: "Enterprise Trucks",
    price: "Custom",
    status: "active",
    type: "Fleet",
    truckStatus: "moving",
    created: "2024-04-22",
    features: ["Unlimited cargo", "Full Bangladesh", "50+ vehicles"],
    location: {
      city: "Khulna",
      lat: 22.8456,
      lng: 89.5403,
      lastUpdate: "2025-01-12 11:10 AM",
    },
  },

  /* ▶️ NEW FAKE DATA (More Pages) */
  {
    id: "p5",
    name: "Express Mini",
    price: "$15",
    status: "active",
    type: "Small",
    truckStatus: "moving",
    created: "2024-05-12",
    features: ["2 KG limit", "Inside Dhaka", "Fast delivery"],
    location: { city: "Narayanganj", lat: 23.6238, lng: 90.5, lastUpdate: "2025-01-12 08:00 AM" },
  },
  {
    id: "p6",
    name: "Heavy Duty Load",
    price: "$299",
    status: "active",
    type: "Large",
    truckStatus: "stopped",
    created: "2024-06-01",
    features: ["300 KG", "Full BD", "10 Trucks"],
    location: { city: "Rajshahi", lat: 24.3745, lng: 88.6042, lastUpdate: "2025-01-11 06:45 PM" },
  },
  {
    id: "p7",
    name: "Food Courier",
    price: "$45",
    status: "inactive",
    type: "Small",
    truckStatus: "offline",
    created: "2024-06-20",
    features: ["Perishable goods", "Fast lane", "Thermo box"],
    location: { city: "Gazipur", lat: 23.9999, lng: 90.4203, lastUpdate: "2025-01-10 01:22 PM" },
  },
  {
    id: "p8",
    name: "Mega Transport Fleet",
    price: "$499",
    status: "active",
    type: "Fleet",
    truckStatus: "moving",
    created: "2024-07-15",
    features: ["100+ Trucks", "BD-Wide", "Tracking"],
    location: { city: "Rangpur", lat: 25.7439, lng: 89.2752, lastUpdate: "2025-01-12 12:30 PM" },
  },
  {
    id: "p9",
    name: "Corporate Logistics",
    price: "$399",
    status: "active",
    type: "Large",
    truckStatus: "moving",
    created: "2024-08-10",
    features: ["Corporate-only", "Fleet support", "Insurance"],
    location: { city: "Barishal", lat: 22.7010, lng: 90.3535, lastUpdate: "2025-01-11 09:45 AM" },
  },
  {
    id: "p10",
    name: "School Supply Cargo",
    price: "$79",
    status: "active",
    type: "Medium",
    truckStatus: "stopped",
    created: "2024-09-01",
    features: ["Books & Uniform", "Intercity", "Secure"],
    location: { city: "Comilla", lat: 23.4607, lng: 91.1809, lastUpdate: "2025-01-12 10:30 AM" },
  },
  {
    id: "p11",
    name: "Electronics Transport",
    price: "$159",
    status: "inactive",
    type: "Medium",
    truckStatus: "offline",
    created: "2024-09-21",
    features: ["Electronics", "Anti-shock", "Safe handling"],
    location: { city: "Bogura", lat: 24.8481, lng: 89.3720, lastUpdate: "2025-01-09 07:10 PM" },
  },
  {
    id: "p12",
    name: "Garments Bulk Cargo",
    price: "$299",
    status: "active",
    type: "Large",
    truckStatus: "moving",
    created: "2024-10-15",
    features: ["Export goods", "Warehouse support", "Fast clearance"],
    location: { city: "Savar", lat: 23.8285, lng: 90.2667, lastUpdate: "2025-01-12 11:05 AM" },
  },
  {
    id: "p13",
    name: "Medicine Cooled Truck",
    price: "$199",
    status: "active",
    type: "Medium",
    truckStatus: "moving",
    created: "2024-11-03",
    features: ["Cold chain", "Pharmacy", "Fast care"],
    location: { city: "Mymensingh", lat: 24.7471, lng: 90.4203, lastUpdate: "2025-01-12 07:50 AM" },
  },
  {
    id: "p14",
    name: "Luxury Car Shifting",
    price: "$499",
    status: "inactive",
    type: "Large",
    truckStatus: "stopped",
    created: "2024-11-29",
    features: ["Car lift", "Insurance", "Specialist driver"],
    location: { city: "Jessore", lat: 23.1778, lng: 89.1804, lastUpdate: "2025-01-10 05:00 PM" },
  },
  {
    id: "p15",
    name: "Mega Bulk Freight",
    price: "Custom",
    status: "active",
    type: "Fleet",
    truckStatus: "moving",
    created: "2024-12-05",
    features: ["Ships + Trucks", "Import/Export", "Industrial cargo"],
    location: { city: "Mongla Port", lat: 22.4836, lng: 89.6008, lastUpdate: "2025-01-12 01:00 PM" },
  },
];

/* Helpers */
function formatDate(d: string) {
  return new Date(d).toLocaleDateString();
}

function useDebounce<T>(v: T, delay = 300) {
  const [value, setValue] = useState(v);
  useEffect(() => {
    const id = setTimeout(() => setValue(v), delay);
    return () => clearTimeout(id);
  }, [v, delay]);
  return value;
}

export default function AdminPackages() {
  /* --- Search | Filters | Sorting | Pagination --- */
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query);

  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTruck, setFilterTruck] = useState("all");

  const [page, setPage] = useState(1);
  const [perPage] = useState(8);

  const [sortBy, setSortBy] = useState<keyof Package>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [packages] = useState(FAKE_PACKAGES);
  const [selected, setSelected] = useState<Package | null>(null);

  /* Filter + Search + Sort */
  const filtered = useMemo(() => {
    const q = debounced.toLowerCase();

    let list = packages.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q);

      const matchesType = filterType === "all" || p.type === filterType;
      const matchesStatus = filterStatus === "all" || p.status === filterStatus;
      const matchesTruck =
        filterTruck === "all" || p.truckStatus === filterTruck;

      return matchesSearch && matchesType && matchesStatus && matchesTruck;
    });

    // sorting
    list = list.sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      // if sorting by created (date), compare Date
      if (sortBy === "created") {
        const da = new Date(a.created).getTime();
        const db = new Date(b.created).getTime();
        return sortDir === "asc" ? da - db : db - da;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return list;
  }, [debounced, filterType, filterStatus, filterTruck, packages, sortBy, sortDir]);

  /* Pagination */
  useEffect(() => {
    // if page out of range after filters change, reset to 1
    setPage((p) => {
      const pageCountLocal = Math.max(1, Math.ceil(filtered.length / perPage));
      return p > pageCountLocal ? 1 : p;
    });
  }, [filtered.length, perPage]);

  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);
  const pageCount = Math.max(1, Math.ceil(total / perPage));

  function toggleSort(col: keyof Package) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Cargo Packages + Truck Tracking</h2>

          <div className="w-full md:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search package / city / type ..."
              className="px-3 py-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md w-full sm:w-auto"
          >
            <option value="all">All Types</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Fleet">Fleet</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filterTruck}
            onChange={(e) => setFilterTruck(e.target.value)}
            className="px-3 py-2 border rounded-md w-full sm:w-auto"
          >
            <option value="all">All Trucks</option>
            <option value="moving">Moving</option>
            <option value="stopped">Stopped</option>
            <option value="offline">Offline</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => { setFilterType("all"); setFilterStatus("all"); setFilterTruck("all"); setQuery(""); }}
              className="px-3 py-2 border rounded-md text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* TABLE (desktop) */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left">Package</th>
                <th className="p-4 text-left">Price</th>
                <th
                  className="p-4 text-left cursor-pointer select-none"
                  onClick={() => toggleSort("type")}
                >
                  Type {sortBy === "type" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="p-4 text-left">Location (City)</th>
                <th className="p-4 text-left">Truck Status</th>
                <th className="p-4 text-left">Last Update</th>
                <th
                  className="p-4 text-left cursor-pointer select-none"
                  onClick={() => toggleSort("created")}
                >
                  Created{" "}
                  {sortBy === "created" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.price}</td>
                  <td className="p-4">{p.type}</td>
                  <td className="p-4">{p.location.city}</td>

                  <td className="p-4">
                    {p.truckStatus === "moving" && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md inline-flex items-center gap-1">
                        🚚 <span>Moving</span>
                      </span>
                    )}
                    {p.truckStatus === "stopped" && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md inline-flex items-center gap-1">
                        ⛔ <span>Stopped</span>
                      </span>
                    )}
                    {p.truckStatus === "offline" && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md inline-flex items-center gap-1">
                        🔌 <span>Offline</span>
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-sm">{p.location.lastUpdate}</td>

                  <td className="p-4 text-sm">{formatDate(p.created)}</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelected(p)}
                      className="px-3 py-1 rounded-md text-white text-sm"
                      style={{ backgroundColor: "#166534" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-6 text-gray-500">
                    No packages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CARD LIST (mobile) */}
        <div className="md:hidden space-y-3">
          {paged.map((p) => (
            <div key={p.id} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.location.city} • {p.type}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold">{p.price}</div>
                  <div className="text-xs">{formatDate(p.created)}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {p.truckStatus === "moving" && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md inline-flex items-center gap-1">
                    🚚 Moving
                  </span>
                )}
                {p.truckStatus === "stopped" && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md inline-flex items-center gap-1">
                    ⛔ Stopped
                  </span>
                )}
                {p.truckStatus === "offline" && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md inline-flex items-center gap-1">
                    🔌 Offline
                  </span>
                )}

                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => setSelected(p)}
                    className="px-3 py-1 rounded-md text-white text-sm"
                    style={{ backgroundColor: "#166534" }}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 border rounded-md text-sm"
                    onClick={() => { navigator.clipboard?.writeText(`${p.name} • ${p.location.city}`); }}
                    title="Copy quick info"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))}

          {paged.length === 0 && (
            <div className="text-center p-6 text-gray-500 bg-white rounded-md shadow-sm">
              No packages found.
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 mt-4">
          <span className="text-sm text-gray-500">
            Showing {total === 0 ? 0 : start + 1}-{Math.min(start + perPage, total)} of {total}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded-md"
            >
              Prev
            </button>

            <div className="hidden sm:flex gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md ${page === i + 1 ? "text-white" : "border"}`}
                  style={page === i + 1 ? { backgroundColor: "#166534" } : {}}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-3">{selected.name}</h3>

            <div className="space-y-2">
              <p><b>Price:</b> {selected.price}</p>
              <p><b>Type:</b> {selected.type}</p>
              <p><b>Truck Status:</b> {selected.truckStatus}</p>
              <p><b>City:</b> {selected.location.city}</p>
              <p><b>Coordinates:</b> {selected.location.lat}, {selected.location.lng}</p>
              <p><b>Last update:</b> {selected.location.lastUpdate}</p>

              <div>
                <b>Features:</b>
                <ul className="list-disc list-inside">
                  {selected.features.map((f, idx) => (
                    <li key={idx} className="text-sm">{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
              (Fake Map)
              <br />
              lat: {selected.location.lat} / lng: {selected.location.lng}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded-md"
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-white rounded-md"
                style={{ backgroundColor: "#166534" }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
