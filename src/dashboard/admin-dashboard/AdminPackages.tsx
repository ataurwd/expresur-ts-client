import React, { useMemo, useState } from "react";
import { 
  Search, Plus, Calendar, ChevronDown, Check, 
  Info, X, Package as PackageIcon, DollarSign, 
  Box, ChevronLeft, ChevronRight, MoreHorizontal 
} from "lucide-react";

/** ---------------- Types ---------------- */
type PackageData = {
  id: string; // Internal ID
  trackingId: string; // ORD-1001
  itemName: string;
  itemDesc: string;
  customerName: string;
  customerPhone: string;
  category: string;
  price: number;
  created: string;
  status: "Delivered" | "In Transit" | "Cancelled";
};

/** ---------------- Fake Data (Matches Image) ---------------- */
const PACKAGES: PackageData[] = [
  { id: "1", trackingId: "ORD-1001", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: 19, created: "2024-07-05", status: "Delivered" },
  { id: "2", trackingId: "ORD-1003", itemName: "Local SMB", itemDesc: "Strong in local control and analytics.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Small Businesses", price: 29, created: "2024-11-21", status: "In Transit" },
  { id: "3", trackingId: "ORD-1005", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: 19, created: "2024-07-05", status: "Cancelled" },
  { id: "4", trackingId: "ORD-1006", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: 19, created: "2024-07-05", status: "In Transit" },
  { id: "5", trackingId: "ORD-1007", itemName: "Enterprise Pack", itemDesc: "Full scale solution.", customerName: "John Doe", customerPhone: "+1 555 019 283", category: "Enterprise", price: 99, created: "2024-08-10", status: "Delivered" },
  { id: "6", trackingId: "ORD-1008", itemName: "Micro Test", itemDesc: "Single item shipment.", customerName: "Jane Smith", customerPhone: "+44 7700 900077", category: "Micro", price: 12, created: "2024-09-15", status: "Delivered" },
  { id: "7", trackingId: "ORD-1009", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: 19, created: "2024-07-05", status: "Delivered" },
];

/** ---------------- Helpers ---------------- */
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: 'numeric', day: 'numeric', year: 'numeric' });
}

export default function PackageManagement() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Filtering Logic
  const filteredData = useMemo(() => {
    return PACKAGES.filter(p => {
      const matchesQuery = 
        p.itemName.toLowerCase().includes(query.toLowerCase()) || 
        p.trackingId.toLowerCase().includes(query.toLowerCase()) ||
        p.customerName.toLowerCase().includes(query.toLowerCase());
      
      const matchesStatus = statusFilter === "All Status" || p.status === statusFilter;
      
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8 font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Package Management</h1>
          <p className="text-gray-400 mt-1">View and manage all packages with detailed analytics</p>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-sm">
           <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" 
              alt="User" 
              className="w-10 h-10 rounded-full bg-green-100"
            />
            <div className="hidden md:block pr-2">
              <h4 className="text-sm font-bold text-gray-800 leading-tight">Tyrion Lannister</h4>
              <p className="text-xs text-gray-400">tyrion@example.com</p>
            </div>
        </div>
      </div>

      {/* --- KPI CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Packages" value="12" icon={<PackageIcon size={20} />} />
        <StatCard title="Active Packages" value="11" icon={<Box size={20} />} />
        <StatCard title="Total Profit" value="$1,440" icon={<DollarSign size={20} />} />
      </div>

      {/* --- ACTIONS BAR --- */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Left Side Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Active Tab */}
          <button className="bg-[#054d35] text-white px-4 py-2 rounded-lg text-sm font-medium">All</button>
          
          {/* Status Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
              {statusFilter} <ChevronDown size={16} />
            </button>
            {/* Simple Dropdown Mockup */}
            <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg hidden group-hover:block border z-10">
              {["All Status", "Delivered", "In Transit", "Cancelled"].map(s => (
                <div key={s} onClick={() => setStatusFilter(s)} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">{s}</div>
              ))}
            </div>
          </div>

          {/* Date Picker Mockup */}
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">
            01/11/24 <Calendar size={16} className="text-gray-400" />
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 xl:flex-none">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tracking number, customer..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 w-full xl:w-80"
            />
          </div>
        </div>

        {/* Right Side Action */}
        <button className="bg-[#054d35] hover:bg-[#043b29] text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition w-full xl:w-auto justify-center">
          <Plus size={18} /> Add Package
        </button>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="p-4 rounded-tl-xl">Item</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Tracking Number</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Created</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Item Column */}
                  <td className="p-4 max-w-[200px]">
                    <div className="font-bold text-gray-800">{item.itemName}</div>
                    <div className="text-xs text-gray-500 truncate">{item.itemDesc}</div>
                  </td>

                  {/* Customer Column */}
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{item.customerName}</div>
                    <div className="text-xs text-gray-500">{item.customerPhone}</div>
                  </td>

                  {/* Tracking */}
                  <td className="p-4 text-gray-600">{item.trackingId}</td>

                  {/* Category */}
                  <td className="p-4 text-gray-600">{item.category}</td>

                  {/* Price */}
                  <td className="p-4 text-gray-600">{item.price} USD/mes</td>

                  {/* Created */}
                  <td className="p-4 text-gray-600">{fmtDate(item.created)}</td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <button className="hover:text-gray-600 text-xs font-medium px-2 py-1 rounded">Edit</button>
                      <button className="hover:text-gray-600 text-xs font-medium px-2 py-1 rounded">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No packages found matching your criteria.
          </div>
        )}
      </div>

      {/* --- PAGINATION --- */}
      <div className="flex justify-end items-center gap-4 mt-6 text-sm text-gray-500">
        <span className="mr-2">Previous</span>
        <button className="text-green-700 font-medium flex items-center gap-1 hover:underline">
          Next <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}

/* --- SUB COMPONENTS --- */

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
        {icon}
      </div>
    </div>
    <div className="text-4xl font-bold text-gray-900 z-10">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "Delivered") {
    return (
      <div className="flex items-center gap-1.5 text-green-600 font-medium text-xs">
        <Check size={14} strokeWidth={3} /> Delivered
      </div>
    );
  }
  if (status === "In Transit") {
    return (
      <div className="flex items-center gap-1.5 text-blue-500 font-medium text-xs">
        <div className="w-4 h-4 border border-blue-500 rounded-full flex items-center justify-center">
             <Info size={10} strokeWidth={2} />
        </div>
        In Transit
      </div>
    );
  }
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-1.5 text-red-500 font-medium text-xs">
        <X size={14} strokeWidth={3} /> Cancelled
      </div>
    );
  }
  return <span className="text-gray-500">{status}</span>;
};