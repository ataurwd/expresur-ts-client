import React, { useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Download, Search, ChevronRight, Bell } from "lucide-react";

const IconClock: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCamera: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGlobe: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12h20M12 2c2.5 3.5 2.5 15 0 20M12 2c-2.5 3.5-2.5 15 0 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
    customerEmail: "carlos@cuba.es",
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
    customerEmail: "carlos@cuba.es",
    amount: "EUR 156.50",
    date: "11/21/2024",
    status: "Delayed",
  },
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
  const [selectedPackage, setSelectedPackage] = useState<PackageRow | null>(null);

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
      case "Delivered": return "text-green-600 bg-green-50";
      case "Delayed": return "text-orange-600 bg-orange-50";
      case "Cancelled": return "text-red-600 bg-red-50";
    }
  };

  const getStatusIcon = (status: PackageRow["status"]) => {
    switch (status) {
      case "Delivered": return "✓";
      case "Delayed": return "●";
      case "Cancelled": return "✕";
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 font-sans text-gray-800">
      <Helmet>
        <title>Reports & Analytics | EXPRESUR</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Generate detailed reports with custom filters</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
            <Bell size={20} />
          </button>
          <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <p className="font-bold text-gray-900 leading-tight">Tyrion Lannister</p>
              <p className="text-gray-400 text-xs">tyrion@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 overflow-x-auto pb-2">
        <div className="bg-white rounded-2xl shadow-sm p-6 min-w-[220px]">
          <div className="bg-[#f9fafb] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Daily Packages</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <path d="M4 12h16M12 4v16" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">{stats.daily}</h3>
              <span className="text-xs text-gray-500">Today</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 min-w-[220px]">
          <div className="bg-[#f9fafb] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Delayed Packages</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <IconClock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">{stats.delayed}</h3>
              <span className="text-xs text-gray-500">Delayed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 min-w-[220px]">
          <div className="bg-[#f9fafb] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Not Scanned</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <IconCamera className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">{stats.notScanned}</h3>
              <span className="text-xs text-gray-500">Packages</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 min-w-[220px]">
          <div className="bg-[#f9fafb] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Status by Country</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <IconGlobe className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">{stats.countries}</h3>
              <span className="text-xs text-gray-500">Countries</span>
            </div>
          </div>
        </div>
      </div>

      

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, locker ID, date..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-600"
            >
              <option value="All">Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => downloadCSV(filtered)}
              className="flex items-center gap-2 px-6 py-3 bg-[#106F3E] text-white rounded-lg text-sm font-medium hover:bg-green-800 transition shadow-sm"
            >
              <Download size={16} />
              Download Report
            </button>
            <button className="px-6 py-3 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
              Export
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-3xl">
          <div className="overflow-x-auto pt-4 rounded-[18px] bg-[#f6f6f6]">
          <table className="w-full text-left  ">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 pl-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Payment ID</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Package ID</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Date</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 pr-4 text-xs font-normal text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={`${row.paymentId}-${row.packageId}`} className="border-b border-gray-100 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                  <td className="py-5 pl-4 text-sm text-gray-900 font-medium">{row.paymentId}</td>
                  <td className="py-5 text-sm text-gray-900 font-medium">{row.packageId}</td>
                  <td className="py-5">
                    <div>
                      <div className="font-medium text-gray-900">{row.customerName}</div>
                      <div className="text-xs text-gray-400">{row.customerEmail}</div>
                    </div>
                  </td>
                  <td className="py-5 text-sm text-gray-900 font-medium">{row.amount}</td>
                  <td className="py-5 text-sm text-gray-700">{row.date}</td>
                  <td className="py-5">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      <span className="text-base">{getStatusIcon(row.status)}</span>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 pr-4 text-right">
                    <button
                      onClick={() => setSelectedPackage(row)}
                      className="px-4 py-1.5 text-xs bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-[#106F3E] transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        

        {/* Pagination */}
        <div className="flex justify-end items-center gap-6 mt-8 pt-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pageCount}
            className="flex items-center gap-1 text-sm font-medium text-[#106F3E] hover:text-green-800 disabled:opacity-50"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modal - unchanged as requested */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <div className="px-8 py-6 md:px-12 md:py-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">Report Details</h2>
            </div>
            <div className="px-8 pb-8 md:px-12 md:pb-12">
              <div className="bg-gray-50 rounded-xl p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-gray-600">Payment ID</p>
                    <p className="font-medium text-gray-900 mt-0.5">{selectedPackage.paymentId}</p>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-medium text-gray-900 mt-0.5">{selectedPackage.customerName}</p>
                      <p className="text-sm text-gray-500">{selectedPackage.customerEmail}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Package ID</p>
                    <p className="font-medium text-gray-900 mt-0.5">{selectedPackage.packageId}</p>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium text-gray-900 mt-0.5 text-lg">{selectedPackage.amount}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium text-gray-900 mt-0.5">{selectedPackage.date}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Status</p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            selectedPackage.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : selectedPackage.status === "Delayed"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {selectedPackage.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="text-green-700 font-semibold hover:text-green-800 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}