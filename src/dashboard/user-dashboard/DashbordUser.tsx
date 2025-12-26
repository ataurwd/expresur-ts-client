import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Bell, Box, Truck, Wallet, Plus, Layers,
  CheckCircle, AlertTriangle, ArrowUpRight, Clock, X, Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Type Definitions ---
type Package = {
  id: string;
  status: string;
  date: string;
  type: string;
};

// Updated Type to match Frame 2147226127.png requirements
type Alert = {
  id: number;
  title: string;
  desc: string;
  date: string;
  time: string;
  icon: React.ReactNode;
};

const DashboardUser = () => {
  // --- STATE MANAGEMENT ---
  const [stats, setStats] = useState({
    packages: 7523,
    shipments: 1284,
    balance: 11300
  });

  const [recentPackages, setRecentPackages] = useState<Package[]>([
    { id: "ORD-1001", status: "In Transit", date: "1/12/2025", type: "transit" },
    { id: "ORD-1002", status: "Delivered", date: "1/12/2025", type: "delivered" },
    { id: "ORD-1003", status: "Cancelled", date: "1/12/2025", type: "cancelled" },
  ]);

  // Updated Alert Data to match the image content
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      title: "Package Arrived",
      desc: "Your package PKG001234567 has arrived at our facility.",
      date: "Mar 10, 2025",
      time: "9.25AM",
      icon: <CheckCircle className="text-[#4ADE80]" size={20} strokeWidth={1.5} />
    },
    {
      id: 2,
      title: "Shipment Delayed",
      desc: "Shipment SHP2024001 may experience a 1-day delay.",
      date: "Mar 10, 2025",
      time: "9.25AM",
      icon: <AlertTriangle className="text-[#FB7185]" size={20} strokeWidth={1.5} />
    },
    {
      id: 3,
      title: "Special Promotion",
      desc: "Get 10% off on consolidation services this week!",
      date: "Mar 10, 2025",
      time: "9.25AM",
      icon: <Tag className="text-[#60A5FA]" size={20} strokeWidth={1.5} />
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPackageId, setNewPackageId] = useState('');

  // --- HANDLERS ---
  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackageId) return;

    const newPkg: Package = {
      id: newPackageId,
      status: "In Transit",
      date: new Date().toLocaleDateString(),
      type: "transit"
    };

    setRecentPackages([newPkg, ...recentPackages]);
    setStats(prev => ({ ...prev, packages: prev.packages + 1 }));
    setNewPackageId('');
    setIsModalOpen(false);
    toast.success("Package added successfully!");
  };

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'transit': return <span className="flex items-center gap-1 text-blue-500 bg-blue-50 px-2 py-1 rounded text-xs font-medium"><Clock size={12} /> In Transit</span>;
      case 'delivered': return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded text-xs font-medium"><CheckCircle size={12} /> Delivered</span>;
      case 'cancelled': return <span className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-1 rounded text-xs font-medium"><AlertTriangle size={12} /> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6 md:p-10 font-sans text-gray-800 relative">

      {/* --- MODAL FOR ADDING PACKAGE --- */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-[32px] shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Package</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <input
                type="text"
                placeholder="e.g. ORD-9999"
                className="w-full p-4 bg-[#F7F7F7] rounded-2xl focus:outline-none"
                value={newPackageId}
                onChange={(e) => setNewPackageId(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-[#006D35] text-white py-4 rounded-2xl font-semibold hover:bg-[#005a2c] transition">
                Add Package
              </button>
            </form>
          </div>
        </div>
      )} */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          {/* Main Container - Matches Card Selected.png */}
          <div className="bg-white p-8 rounded-[40px] shadow-2xl w-full max-w-4xl animate-in fade-in zoom-in duration-300 relative">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-8 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Header */}
            <h3 className="text-[32px] font-bold text-[#555555] mb-8">
              Add Tracking
            </h3>

            {/* Input Group */}
            <form
              onSubmit={handleAddPackage}
              className="flex items-center bg-[#F7F7F7] rounded-[20px] p-2 pl-8 border border-transparent focus-within:border-[#006D35]/20 transition-all"
            >
              <input
                autoFocus
                type="text"
                placeholder="Enter Tracking number ....."
                className="bg-transparent flex-1 py-4 outline-none text-[18px] text-gray-600 placeholder:text-[#A3A3A3]"
                value={newPackageId}
                onChange={(e) => setNewPackageId(e.target.value)}
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#006D35] text-white px-10 py-4 rounded-[16px] font-semibold text-[18px] hover:bg-[#005a2c] transition-all"
              >
                Add Tracking
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">

        {/* --- MAIN CONTENT --- */}
        <div className="xl:col-span-3 space-y-10">

          {/* Header */}
          <div>
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Welcome back!</h1>
            <p className="text-gray-400 text-[18px]">Welcome to EXPRESUR Client Dashboard</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Packages in Locker', val: stats.packages, icon: <Box />, color: 'text-emerald-500', trend: '+12%' },
              { label: 'Active Shipments', val: stats.shipments, icon: <Truck />, color: 'text-rose-500', trend: '-3%' },
              { label: 'Wallet Balance', val: `$${stats.balance.toLocaleString()}`, icon: <Wallet />, color: 'text-emerald-500', trend: '+15%' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col justify-between h-44">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 font-medium">{s.label}</span>
                  <div className="p-2.5 bg-[#F7F7F7] rounded-full text-gray-400">{s.icon}</div>
                </div>
                <div>
                  <h2 className="text-[36px] font-bold text-gray-800">{s.val}</h2>
                  <p className={`text-sm mt-1 font-bold ${s.color}`}>{s.trend} <span className="text-gray-300 font-normal ml-1">from last period</span></p>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <h3 className="text-[20px] font-bold text-gray-700 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#ffffff] p-8 rounded-[32px] hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 text-left group border border-transparent"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f7f7f7] w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#006D35] group-hover:text-white transition-colors text-gray-300 border border-gray-50">
                    <Box size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[22px] font-semibold text-[#555555]">Add Tracking</h4>
                </div>
                <p className="text-[14px] text-[#A3A3A3] font-medium">Add more packages</p>
              </button>

              <button className="bg-[#ffffff] p-8 rounded-[32px] hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 text-left group border border-transparent">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f7f7f7] w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#006D35] group-hover:text-white transition-colors text-gray-300 border border-gray-50">
                    <Layers size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[22px] font-semibold text-[#555555]">Consolidate</h4>
                </div>
                <p className="text-[14px] text-[#A3A3A3] font-medium">Create Consolidates</p>
              </button>

              <button className="bg-[#ffffff] p-8 rounded-[32px] hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 text-left group border border-transparent">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f7f7f7] w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#006D35] group-hover:text-white transition-colors text-gray-300 border border-gray-50">
                    <Truck size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[22px] font-semibold text-[#555555]">Create Shipment</h4>
                </div>
                <p className="text-[14px] text-[#A3A3A3] font-medium">Add more shipment</p>
              </button>
            </div>
          </div>






          {/* RECENT PACKAGES & TRANSACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#F7F7F7] rounded-full"><Box size={16} className="text-gray-400" /></div>
                <h3 className="text-lg font-bold text-gray-700">Recent Packages</h3>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-300 border-b border-gray-50">
                    <th className="pb-4 font-normal">Tracking Number</th>
                    <th className="pb-4 font-normal">Status</th>
                    <th className="pb-4 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPackages.map((pkg, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-4 font-bold text-gray-600">{pkg.id}</td>
                      <td className="py-4">{getStatusBadge(pkg.type)}</td>
                      <td className="py-4 text-gray-400">{pkg.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50">
              {/* Header Section */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                  <Box className="text-gray-300" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[24px] font-semibold text-[#555555]">Recent Packages</h3>
              </div>

              {/* Table Container with Background and Rounded Corners */}
              <div className="bg-[#F9F9F9] rounded-[24px] overflow-hidden p-2">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[#A3A3A3] text-[16px]">
                      <th className="py-4 px-6 font-medium">Tracking Number</th>
                      <th className="py-4 px-6 font-medium text-center">Status</th>
                      <th className="py-4 px-6 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-[15px]">
                    {recentPackages.map((pkg, i) => (
                      <tr
                        key={i}
                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-transparent'} rounded-xl`}
                      >
                        <td className="py-5 px-6 font-bold text-[#7D7D7D] first:rounded-l-2xl">
                          {pkg.id}
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex justify-center">
                            {getStatusBadge(pkg.type)}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-[#A3A3A3] text-right last:rounded-r-2xl">
                          {pkg.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-[#F7F7F7] rounded-full"><ArrowUpRight size={16} className="text-gray-400"/></div>
                   <h3 className="text-lg font-bold text-gray-700">Recent Transaction</h3>
                </div>
                <button className="text-xs font-bold text-[#006D35] hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#FDFDFD] rounded-xl border border-gray-50">
                    <div>
                      <h4 className="font-bold text-gray-700 text-sm">Sent</h4>
                      <p className="text-[11px] text-gray-300">Today, 11:55 AM</p>
                    </div>
                    <span className="font-bold text-emerald-500">+21.17</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#FDFDFD] rounded-xl border border-gray-50">
                    <div>
                      <h4 className="font-bold text-gray-700 text-sm">Pending</h4>
                      <p className="text-[11px] text-gray-300">Yesterday, 3:15 PM</p>
                    </div>
                    <span className="font-bold text-orange-400">+10.05</span>
                </div>
              </div>
            </div> */}

            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
              {/* Header Section */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F7F7F7] rounded-full">
                    {/* Using a slider-like icon to match image */}
                    <div className="flex flex-col gap-0.5 items-center justify-center w-5 h-5">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-3 h-[1.5px] bg-gray-400"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-[22px] font-bold text-gray-700">Consolidations</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-5 py-2 bg-[#F7F7F7] text-[#A3A3A3] text-sm font-semibold rounded-full hover:bg-gray-100 transition">
                    Show All
                  </button>
                  <button className="p-2 bg-[#F7F7F7] rounded-full text-gray-400 hover:bg-gray-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="6" x2="20" y2="6"></line>
                      <line x1="7" y1="12" x2="17" y2="12"></line>
                      <line x1="10" y1="18" x2="14" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* List Items */}
              <div className="space-y-6">
                {[
                  { id: "ORD-1001", weight: "2.5 kg" },
                  { id: "ORD-1001", weight: "2 kg" },
                  { id: "ORD-1001", weight: "3 kg" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h4 className="text-[18px] font-bold text-gray-700 mb-0.5">{item.id}</h4>
                      <p className="text-[14px] text-gray-400 font-medium">
                        From: <span className="text-gray-400/80">Shanghai, China</span>
                      </p>
                      <p className="text-[14px] text-gray-400 font-medium">Today, 11:55 AM</p>
                    </div>
                    <span className="text-[20px] font-bold text-gray-500">{item.weight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR (Updated to match Frame 2147226127.png) --- */}
        <div className="xl:col-span-1 space-y-8">
          <div className="flex items-center gap-4 justify-end">
            <Link to="/dashboard/notifications">
              <button className="relative p-3 bg-white rounded-full shadow-sm border border-gray-50 hover:bg-gray-50 transition">
                <Bell size={20} className="text-gray-400" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            </Link>
            <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-50 shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-10 h-10 rounded-full border border-green-100" />
              <div>
                <h4 className="text-sm font-bold text-gray-800 leading-none">Tyrion Lannister</h4>
                <span className="text-[11px] text-gray-300 mt-1 block">tyrion@example.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50">
            {/* Sidebar Header from Image */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                <Bell className="text-gray-400" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-[24px] font-semibold text-[#555555]">Important Alerts</h3>
            </div>

            {/* Alert Cards from Image */}
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-[#F8F9FA] p-6 rounded-[24px] relative group border border-transparent hover:bg-white hover:shadow-md hover:shadow-black/5 transition-all cursor-pointer">
                  {/* Remove button logic preserved from your main code */}
                  <button onClick={() => removeAlert(alert.id)} className="absolute top-4 right-4 text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                    <X size={14} />
                  </button>

                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">{alert.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#7D7D7D] text-[18px] mb-1">{alert.title}</h4>
                      <p className="text-[15px] text-[#A3A3A3] leading-snug mb-4">{alert.desc}</p>
                      <div className="flex items-center gap-4 text-[13px] text-[#A3A3A3] font-medium">
                        <span>{alert.date}</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardUser;