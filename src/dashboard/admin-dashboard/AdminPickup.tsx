import React from 'react';
import { Search, Filter, PlusCircle, Eye, UserCheck, MapPin, Calendar, Package } from "lucide-react";

interface Pickup {
  id: string;
  customer: string;
  phone: string;
  origin: string;
  destination: string;
  date: string;
  status: "Pending" | "Assigned" | "In Transit" | "Completed" | "Cancelled";
}

const dummyData: Pickup[] = [
  { id: "PK-0047", customer: "María González", phone: "+34 612 345 678", origin: "Barcelona, Spain", destination: "Havana, Cuba", date: "2025-02-03", status: "Pending" },
  { id: "PK-0046", customer: "Carlos Pérez", phone: "+53 5 123 4567", origin: "Santiago de Cuba", destination: "Miami, USA", date: "2025-02-01", status: "Assigned" },
  { id: "PK-0045", customer: "Ana López", phone: "+34 678 901 234", origin: "Valencia, Spain", destination: "Camagüey, Cuba", date: "2025-01-30", status: "In Transit" },
  { id: "PK-0044", customer: "Luis Fernández", phone: "+1 305 555 0198", origin: "Miami, USA", destination: "Havana, Cuba", date: "2025-01-29", status: "Completed" },
  { id: "PK-0043", customer: "Elena Martínez", phone: "+34 654 321 987", origin: "Madrid, Spain", destination: "Holguín, Cuba", date: "2025-02-05", status: "Pending" },
  { id: "PK-0042", customer: "Roberto Díaz", phone: "+53 5 987 6543", origin: "Varadero, Cuba", destination: "Madrid, Spain", date: "2025-01-27", status: "Assigned" },
  { id: "PK-0041", customer: "Sofia Rivera", phone: "+34 699 112 233", origin: "Málaga, Spain", destination: "Cuba (Domestic)", date: "2025-02-02", status: "Pending" },
  { id: "PK-0040", customer: "Jorge Herrera", phone: "+1 786 444 5566", origin: "New York, USA", destination: "Havana, Cuba", date: "2025-01-31", status: "In Transit" },
  { id: "PK-0039", customer: "Isabel Torres", phone: "+34 622 334 455", origin: "Sevilla, Spain", destination: "Santa Clara, Cuba", date: "2025-02-04", status: "Pending" },
  { id: "PK-0038", customer: "Miguel Ruiz", phone: "+53 5 555 1234", origin: "Havana, Cuba", destination: "Panama City, Panama", date: "2025-01-28", status: "Cancelled" },
];

const AdminPickup = () => {
  const getStatusColor = (status: Pickup["status"]) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Assigned": return "bg-blue-100 text-blue-800 border border-blue-300";
      case "In Transit": return "bg-purple-100 text-purple-800 border border-purple-300";
      case "Completed": return "bg-green-100 text-green-800 border border-green-300";
      case "Cancelled": return "bg-red-100 text-red-800 border border-red-300";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <Package className="text-green-700" />
            Pickup Requests
          </h1>
          <p className="text-gray-600 mt-1">Manage international & domestic Cuba pickups</p>
        </div>
      
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-5 rounded-2xl shadow-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search customer..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition"
            />
          </div>

          <select className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition">
            <option>All Status</option>
            <option>Pending</option>
            <option>Assigned</option>
            <option>In Transit</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <input
            type="date"
            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition"
          />

          <button className="flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition shadow-md hover:shadow-xl">
            <Filter size={18} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-green-700" />
            All Pickup Requests
            <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {dummyData.length} active
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Customer</th>
                <th className="px-6 py-4 text-left font-semibold">Route</th>
                <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dummyData.map((pickup) => (
                <tr
                  key={pickup.id}
                  className="hover:bg-gray-50/70 transition-all duration-200 group"
                >
                  <td className="px-6 py-5 font-semibold text-green-700">{pickup.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {pickup.customer.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pickup.customer}</p>
                        <p className="text-xs text-gray-500">{pickup.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium">{pickup.origin}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium text-green-700">{pickup.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(pickup.date).toLocaleDateString("en-GB")}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(pickup.status)}`}>
                      {pickup.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                        <Eye size={16} /> View
                      </button>
                      {pickup.status === "Pending" && (
                        <button className="text-green-700 hover:text-green-900 font-medium flex items-center gap-1 hover:bg-green-50 px-3 py-1.5 rounded-lg transition">
                          <UserCheck size={16} /> Assign
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPickup;