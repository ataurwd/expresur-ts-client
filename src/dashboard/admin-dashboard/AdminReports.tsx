import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react";

type PackageRow = {
  paymentId: string;
  packageId: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  date: string;
  status: "Delivered" | "Delayed" | "Cancelled";
};

const FAKE_PACKAGES: PackageRow[] = [
  {
    paymentId: "PMT-4098",
    packageId: "PK-0047",
    customerName: "María González",
    customerEmail: "maria.g@example.com",
    amount: "USD 289.00",
    date: "7/5/2024",
    status: "Delivered",
  },
  {
    paymentId: "PMT-4097",
    packageId: "PK-0046",
    customerName: "Carlos Pérez",
    customerEmail: "carlos@cubaea.es",
    amount: "EUR 156.50",
    date: "11/21/2024",
    status: "Delayed",
  },
  {
    paymentId: "PMT-4098",
    packageId: "PK-0047",
    customerName: "María González",
    customerEmail: "maria.g@example.com",
    amount: "USD 289.00",
    date: "7/5/2024",
    status: "Cancelled",
  },
  {
    paymentId: "PMT-4097",
    packageId: "PK-0046",
    customerName: "Carlos Pérez",
    customerEmail: "carlos@cubaea.es",
    amount: "EUR 156.50",
    date: "11/21/2024",
    status: "Delayed",
  },
  ...Array.from({ length: 40 }, (_, i) => ({
    paymentId: `PMT-${4100 + i}`,
    packageId: `PK-00${48 + i}`,
    customerName: i % 2 === 0 ? "María González" : "Carlos Pérez",
    customerEmail: i % 2 === 0 ? "maria.g@example.com" : "carlos@cubaea.es",
    amount: i % 2 === 0 ? "USD 289.00" : "EUR 156.50",
    date: i % 3 === 0 ? "7/5/2024" : "11/21/2024",
    status: ["Delivered", "Delayed", "Cancelled"][i % 3] as PackageRow["status"],
  })),
];

function downloadCSV(rows: PackageRow[]) {
  const header = ["Payment ID", "Package ID", "Customer Name", "Customer Email", "Amount", "Date", "Status"];
  const csv = [
    header.join(","),
    ...rows.map((r) => [
      r.paymentId,
      r.packageId,
      `"${r.customerName.replace(/"/g, '""')}"`,
      r.customerEmail,
      r.amount,
      r.date,
      r.status,
    ].join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `packages_report_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PackageTrackingDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PackageRow["status"]>("All");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    return FAKE_PACKAGES.filter((row) => {
      const matchesSearch =
        row.paymentId.toLowerCase().includes(search.toLowerCase()) ||
        row.packageId.toLowerCase().includes(search.toLowerCase()) ||
        row.customerName.toLowerCase().includes(search.toLowerCase()) ||
        row.customerEmail.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || row.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = {
    daily: 1250,
    delayed: 25,
    notScanned: 18,
    countries: 15,
  };

  const getStatusColor = (status: PackageRow["status"]) => {
    switch (status) {
      case "Delivered":
        return "text-green-700 bg-green-50";
      case "Delayed":
        return "text-orange-700 bg-orange-50";
      case "Cancelled":
        return "text-red-700 bg-red-50";
    }
  };

  const getStatusIcon = (status: PackageRow["status"]) => {
    switch (status) {
      case "Delivered":
        return "✓";
      case "Delayed":
        return "●";
      case "Cancelled":
        return "✕";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <Helmet>
        <title>Package Tracking | EXPRESUR</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Package Tracking</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Real-time shipment management and monitoring</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-3xl font-bold text-gray-900">{stats.daily}</p>
          <p className="text-base text-gray-700 mt-1">Daily Packages</p>
          <p className="text-xs text-gray-500">Today</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-3xl font-bold text-gray-900">{stats.delayed}</p>
          <p className="text-base text-gray-700 mt-1">Delayed Packages</p>
          <p className="text-xs text-gray-500">Delayed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-3xl font-bold text-gray-900">{stats.notScanned}</p>
          <p className="text-base text-gray-700 mt-1">Not Scanned</p>
          <p className="text-xs text-gray-500">Packages</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-3xl font-bold text-gray-900">{stats.countries}</p>
          <p className="text-base text-gray-700 mt-1">Status by Country</p>
          <p className="text-xs text-gray-500">Countries</p>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, locker ID, date..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => downloadCSV(filtered)}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>

              <button className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Payment ID</th>
                <th className="px-5 py-3 text-left font-medium">Package ID</th>
                <th className="px-5 py-3 text-left font-medium">Customer</th>
                <th className="px-5 py-3 text-left font-medium">Amount</th>
                <th className="px-5 py-3 text-left font-medium">Date</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paged.map((row) => (
                <tr key={`${row.paymentId}-${row.packageId}`} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-medium text-gray-900">{row.paymentId}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{row.packageId}</td>
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{row.customerName}</div>
                      <div className="text-xs text-gray-500">{row.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-900">{row.amount}</td>
                  <td className="px-5 py-4 text-gray-600">{row.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        row.status
                      )}`}
                    >
                      <span className="text-base leading-none">{getStatusIcon(row.status)}</span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button className="text-green-600 font-medium hover:text-green-800 transition text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paged.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No packages found matching the current filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > perPage && (
          <div className="px-5 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}