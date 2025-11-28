import React, { useMemo, useState } from "react";

const Admin_Packages = () => {
  type Package = {
    id: string;
    title: string;
    price: number;
    status: "active" | "inactive";
    created: string;
    features: string[];
  };

  type SortKey = "title" | "price" | "status" | "created";

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const perPage = 8;
  const [sortBy, setSortBy] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Fake Data
  const packages = useMemo<Package[]>(
    () => [
      { id: "p1", title: "Basic Plan", price: 9.99, status: "active", created: "2024-01-10", features: ["1 project", "Email support"] },
      { id: "p2", title: "Starter", price: 19.99, status: "active", created: "2024-03-05", features: ["5 projects", "Priority email"] },
      { id: "p3", title: "Pro", price: 39.99, status: "active", created: "2024-06-20", features: ["Unlimited projects", "Phone support"] },
      { id: "p4", title: "Team", price: 79.99, status: "inactive", created: "2023-11-11", features: ["Teams & roles", "SSO"] },
      { id: "p5", title: "Enterprise", price: 199.99, status: "active", created: "2022-08-01", features: ["Dedicated manager", "SLA"] },
      { id: "p6", title: "Student", price: 4.99, status: "active", created: "2024-02-14", features: ["1 project", "Community support"] },
      { id: "p7", title: "Freelancer", price: 14.99, status: "inactive", created: "2021-10-07", features: ["3 projects", "Basic analytics"] },
      { id: "p8", title: "Business", price: 59.99, status: "active", created: "2023-05-25", features: ["Multiple seats", "Export"] },
      { id: "p9", title: "Launch", price: 29.99, status: "active", created: "2024-07-01", features: ["6 projects", "Integration"] },
      { id: "p10", title: "Custom", price: 0.0, status: "inactive", created: "2020-12-31", features: ["Custom quote"] },
    ],
    []
  );

  // typed helper
  function formatDate(d: string): string {
    return new Date(d).toLocaleDateString();
  }

  // safe comparator using SortKey
  function compare(a: Package, b: Package): number {
    let aVal: string | number = "";
    let bVal: string | number = "";

    switch (sortBy) {
      case "price":
        aVal = a.price;
        bVal = b.price;
        break;
      case "created":
        aVal = new Date(a.created).getTime();
        bVal = new Date(b.created).getTime();
        break;
      case "status":
        aVal = a.status;
        bVal = b.status;
        break;
      case "title":
      default:
        aVal = a.title.toLowerCase();
        bVal = b.title.toLowerCase();
        break;
    }

    if (aVal === bVal) return 0;
    if (sortDir === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  }

  // typed parameter
  function toggleSort(col: SortKey): void {
    if (sortBy === col) setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  // filtering + safe sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = packages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        p.features.join(" ").toLowerCase().includes(q)
    );

    list = [...list].sort(compare);
    return list;
  }, [query, sortBy, sortDir, packages]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Packages</h2>
            <p className="text-sm text-gray-500">Manage pricing packages</p>
          </div>

          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search packages..."
              className="px-3 py-2 border rounded-md shadow-sm w-72 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">
              New Package
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left cursor-pointer" onClick={() => toggleSort("title")}>Title</th>
                <th className="p-4 text-left cursor-pointer" onClick={() => toggleSort("price")}>Price</th>
                <th className="p-4 text-left">Features</th>
                <th className="p-4 text-left cursor-pointer" onClick={() => toggleSort("status")}>Status</th>
                <th className="p-4 text-left cursor-pointer" onClick={() => toggleSort("created")}>Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((pkg) => (
                <tr key={pkg.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{pkg.title}</td>
                  <td className="p-4">${pkg.price.toFixed(2)}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {pkg.features.slice(0, 2).join(" • ")}
                    {pkg.features.length > 2 && <span className="text-gray-400"> +{pkg.features.length - 2}</span>}
                  </td>
                  <td className="p-4">
                    {pkg.status === "active" ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Inactive</span>
                    )}
                  </td>
                  <td className="p-4">{formatDate(pkg.created)}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">Edit</button>
                      <button className="px-3 py-1 border rounded text-sm text-red-600 hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">No packages found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            Showing {total === 0 ? 0 : start + 1}-{Math.min(start + perPage, total)} of {total}
          </p>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded disabled:opacity-40" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>

            {Array.from({ length: pageCount }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? "bg-indigo-600 text-white" : "border"}`}>{i + 1}</button>
            ))}

            <button className="px-3 py-1 border rounded disabled:opacity-40" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Packages;
