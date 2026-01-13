import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import {
  Bell, Box, Truck, Wallet, Layers,
  CheckCircle, AlertTriangle, Clock, X, Tag
} from 'lucide-react'; 
import { Link } from 'react-router-dom';

// --- Type Definitions ---
type Package = {
  id: string;
  status: string;
  date: string;
  type: string;
};

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
    <div className="min-h-screen bg-[#F8F9FA] pb-10 font-sans text-gray-800 relative">
      <Helmet>
        <title>Dashboard | EXPRESUR</title>
      </Helmet>

      {/* --- MOBILE HEADER (Visible only on Mobile) --- */}
      <div className="xl:hidden bg-white p-4 sticky top-0 z-20 shadow-sm flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
            {/* Added ml-4 for extra left margin */}
            <h1 className="text-xl font-bold text-[#F97316] ml-14">EXPRESUR</h1>
        </div>
        <div className="flex items-center gap-3">
             <Link to="/dashboard/notifications" className="relative p-2 bg-gray-50 rounded-full">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
             </Link>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-8 h-8 rounded-full border border-green-100" />
        </div>
      </div>

      <div className="p-4 md:p-10">
        {/* --- MODAL FOR ADDING PACKAGE --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-300 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-8 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
              <h3 className="text-xl md:text-[32px] font-bold text-[#555555] mb-6 md:mb-8">
                Add Tracking
              </h3>
              <form
                onSubmit={handleAddPackage}
                className="flex flex-col md:flex-row items-center bg-[#F7F7F7] rounded-[20px] p-2 md:pl-8 border border-transparent focus-within:border-[#006D35]/20 transition-all gap-2"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter Tracking number..."
                  className="bg-transparent flex-1 py-3 md:py-4 outline-none text-base md:text-[18px] text-gray-600 placeholder:text-[#A3A3A3] w-full px-2"
                  value={newPackageId}
                  onChange={(e) => setNewPackageId(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#006D35] text-white px-8 py-3 md:py-4 rounded-[16px] font-semibold text-base md:text-[18px] hover:bg-[#005a2c] transition-all"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">

          {/* --- MAIN CONTENT --- */}
          <div className="xl:col-span-3 space-y-6 md:space-y-10">

            {/* Header (Desktop only for Greeting, Mobile uses TopBar) */}
            <div className="hidden xl:block">
              <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Welcome back!</h1>
              <p className="text-gray-400 text-[18px]">Welcome to EXPRESUR Client Dashboard</p>
            </div>

             {/* Mobile Greeting */}
             <div className="xl:hidden">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-gray-400 text-sm">Welcome to EXPRESUR Client Dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: 'Packages in Locker', val: stats.packages, icon: <Box />, color: 'text-emerald-500', trend: '+12%' },
                { label: 'Active Shipments', val: stats.shipments, icon: <Truck />, color: 'text-rose-500', trend: '-3%' },
                { label: 'Wallet Balance', val: `$${stats.balance.toLocaleString()}`, icon: <Wallet />, color: 'text-emerald-500', trend: '+15%' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col justify-between h-auto md:h-44 gap-4 md:gap-0">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500 font-medium text-sm md:text-base">{s.label}</span>
                    <div className="p-2 md:p-2.5 bg-[#F7F7F7] rounded-full text-gray-400 scale-90 md:scale-100">{s.icon}</div>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-[36px] font-bold text-gray-800">{s.val}</h2>
                    <p className={`text-xs md:text-sm mt-1 font-bold ${s.color}`}>{s.trend} <span className="text-gray-300 font-normal ml-1">from last period</span></p>
                  </div>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS */}
            <div>
              <h3 className="text-lg md:text-[20px] font-bold text-gray-700 mb-4 md:mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {[
                  { title: "Add Tracking", desc: "Add more packages", icon: <Box size={22}  />, action: () => {} },
                  { title: "Consolidate", desc: "Create Consolidates", icon: <Layers size={22} />, action: () => {} },
                  { title: "Create Shipment", desc: "Add more shipment", icon: <Truck size={22} />, action: () => {} }
                ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="bg-white p-4 md:p-8 rounded-[24px] md:rounded-[32px] hover:shadow-xl hover:shadow-black/5 transition-all duration-300 text-left group border border-transparent flex md:block items-center md:items-start gap-4"
                    >
                      <div className="bg-[#f7f7f7] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#006D35] group-hover:text-white transition-colors text-gray-300 border border-gray-50 flex-shrink-0">
                        {React.cloneElement(item.icon as React.ReactElement<any>, { strokeWidth: 1.5 })}
                      </div>
                      <div className="md:mt-8">
                        <h4 className="text-base md:text-[22px] font-semibold text-[#555555]">{item.title}</h4>
                        <p className="text-xs md:text-[14px] text-[#A3A3A3] font-medium">{item.desc}</p>
                      </div>
                    </button>
                ))}
              </div>
            </div>

            {/* RECENT PACKAGES & CONSOLIDATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* RECENT PACKAGES */}
              <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center shadow-sm bg-white">
                    <Box className="text-gray-300" size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-[24px] font-semibold text-[#555555]">Recent Packages</h3>
                </div>

                {/* Desktop Table (Hidden on Mobile) */}
                <div className="hidden md:block bg-[#F9F9F9] rounded-[24px] overflow-hidden p-2">
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
                        <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-transparent'} rounded-xl`}>
                          <td className="py-5 px-6 font-bold text-[#7D7D7D] first:rounded-l-2xl">{pkg.id}</td>
                          <td className="py-5 px-6"><div className="flex justify-center">{getStatusBadge(pkg.type)}</div></td>
                          <td className="py-5 px-6 text-[#A3A3A3] text-right last:rounded-r-2xl">{pkg.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List View (Visible only on Mobile) */}
                <div className="md:hidden space-y-3">
                    {recentPackages.map((pkg, i) => (
                        <div key={i} className="bg-[#F9F9F9] p-4 rounded-2xl flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-700 text-sm mb-1">{pkg.id}</h4>
                                <p className="text-xs text-gray-400">{pkg.date}</p>
                            </div>
                            <div>{getStatusBadge(pkg.type)}</div>
                        </div>
                    ))}
                </div>
              </div>

              {/* CONSOLIDATIONS */}
              <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F7F7F7] rounded-full">
                      <div className="flex flex-col gap-0.5 items-center justify-center w-4 h-4 md:w-5 md:h-5">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-3 h-[1.5px] bg-gray-400"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-lg md:text-[22px] font-bold text-gray-700">Consolidations</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 md:px-5 md:py-2 bg-[#F7F7F7] text-[#A3A3A3] text-xs md:text-sm font-semibold rounded-full hover:bg-gray-100 transition">
                      Show All
                    </button>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {[
                    { id: "ORD-1001", weight: "2.5 kg" },
                    { id: "ORD-1001", weight: "2 kg" },
                    { id: "ORD-1001", weight: "3 kg" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="text-base md:text-[18px] font-bold text-gray-700 mb-0.5">{item.id}</h4>
                        <p className="text-xs md:text-[14px] text-gray-400 font-medium">
                          From: <span className="text-gray-400/80">Shanghai, China</span>
                        </p>
                        <p className="text-xs md:text-[14px] text-gray-400 font-medium">Today, 11:55 AM</p>
                      </div>
                      <span className="text-base md:text-[20px] font-bold text-gray-500">{item.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- SIDEBAR (Alerts) --- */}
          <div className="xl:col-span-1 space-y-6 md:space-y-8">
            {/* Desktop Profile Header (Hidden on Mobile) */}
            <div className="hidden xl:flex items-center gap-4 justify-end">
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

            <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-50">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                  <Bell className="text-gray-400 w-5 h-5 md:w-[22px] md:h-[22px]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-[24px] font-semibold text-[#555555]">Important Alerts</h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="bg-[#F8F9FA] p-4 md:p-6 rounded-[20px] md:rounded-[24px] relative group border border-transparent hover:bg-white hover:shadow-md hover:shadow-black/5 transition-all cursor-pointer">
                    <button onClick={() => removeAlert(alert.id)} className="absolute top-4 right-4 text-gray-300 opacity-100 md:opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                      <X size={14} />
                    </button>

                    <div className="flex gap-3 md:gap-4">
                      <div className="mt-1 flex-shrink-0">{alert.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#7D7D7D] text-base md:text-[18px] mb-1">{alert.title}</h4>
                        <p className="text-xs md:text-[15px] text-[#A3A3A3] leading-snug mb-3 md:mb-4">{alert.desc}</p>
                        <div className="flex items-center gap-3 md:gap-4 text-[11px] md:text-[13px] text-[#A3A3A3] font-medium">
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
    </div>
  );
};

export default DashboardUser;