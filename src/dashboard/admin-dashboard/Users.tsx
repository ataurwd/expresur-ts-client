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
  }, [v]);
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
  const [perPage] = useState(6);

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
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return list;
  }, [debounced, filterType, filterStatus, filterTruck, packages, sortBy, sortDir]);

  /* Pagination */
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);
  const pageCount = Math.ceil(total / perPage);

  function toggleSort(col: keyof Package) {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Cargo Packages + Truck Tracking</h2>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search package / city / type ..."
            className="px-3 py-2 border rounded-md w-72"
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md"
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
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filterTruck}
            onChange={(e) => setFilterTruck(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Trucks</option>
            <option value="moving">Moving</option>
            <option value="stopped">Stopped</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">Package</th>
                <th className="p-4">Price</th>
                <th className="p-4 cursor-pointer" onClick={() => toggleSort("type")}>
                  Type {sortBy === "type" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="p-4">Location (City)</th>
                <th className="p-4">Truck Status</th>
                <th className="p-4">Last Update</th>
                <th className="p-4 cursor-pointer" onClick={() => toggleSort("created")}>
                  Created {sortBy === "created" ? (sortDir === "asc" ? "▲" : "▼") : ""}
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

                  {/* CITY */}
                  <td className="p-4">
                    <div>{p.location.city}</div>
                  </td>

                  {/* TRUCK STATUS */}
                  <td className="p-4">
                    {p.truckStatus === "moving" && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                        🚚 Moving
                      </span>
                    )}
                    {p.truckStatus === "stopped" && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md">
                        ⛔ Stopped
                      </span>
                    )}
                    {p.truckStatus === "offline" && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md">
                        🔌 Offline
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-sm">{p.location.lastUpdate}</td>

                  <td className="p-4 text-sm">{formatDate(p.created)}</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelected(p)}
                      className="px-3 py-1 border rounded-md"
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

        {/* PAGINATION */}
        <div className="flex justify-between mt-4">
          <span className="text-sm text-gray-500">
            Showing {start + 1}-{Math.min(start + perPage, total)} of {total}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded-md"
            >
              Prev
            </button>

            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  page === i + 1 ? "bg-indigo-600 text-white" : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg">

            <h3 className="text-xl font-bold mb-3">{selected.name}</h3>

            <div className="space-y-2">
              <p><b>Price:</b> {selected.price}</p>
              <p><b>Type:</b> {selected.type}</p>
              <p><b>Truck Status:</b> {selected.truckStatus}</p>
              <p><b>City:</b> {selected.location.city}</p>
              <p><b>Coordinates:</b> {selected.location.lat}, {selected.location.lng}</p>
            </div>

            <div className="mt-4 w-full h-40 bg-gray-300 rounded-md flex items-center justify-center text-sm text-gray-700">
              (Fake Map Placeholder)
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
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                Edit
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
