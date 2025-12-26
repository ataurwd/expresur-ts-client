import React, { useState } from 'react';
import { toast } from 'sonner'; // Toaster removed
import { 
  Bell, Box, Truck, Wallet, Plus, Layers, Send, 
  CheckCircle, AlertTriangle, Tag,  
  ArrowUpRight, Clock, X
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
  time: string;
  icon: React.ReactNode;
  bg: string;
};

const DashboardUser = () => {
  // --- STATE MANAGEMENT (Data Store) ---
  
  // 1. Stats State
  const [stats, setStats] = useState({
    packages: 7523,
    shipments: 1284,
    balance: 11300
  });

  // 2. Packages List State
  const [recentPackages, setRecentPackages] = useState<Package[]>([
    { id: "ORD-1001", status: "In Transit", date: "1/12/2025", type: "transit" },
    { id: "ORD-1002", status: "Delivered", date: "1/12/2025", type: "delivered" },
    { id: "ORD-1003", status: "Cancelled", date: "1/12/2025", type: "cancelled" },
  ]);

  // 3. Alerts State (With Delete Functionality)
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, title: "Package Arrived", desc: "Your package PKG001 has arrived.", time: "Mar 10, 9:25AM", icon: <CheckCircle className="text-emerald-500" size={18} />, bg: "bg-emerald-50" },
    { id: 2, title: "Shipment Delayed", desc: "Shipment SHP2024 may be delayed.", time: "Mar 10, 9:25AM", icon: <AlertTriangle className="text-rose-500" size={18} />, bg: "bg-rose-50" },
    { id: 3, title: "Special Promotion", desc: "Get 10% off this week!", time: "Mar 10, 9:25AM", icon: <Tag className="text-blue-500" size={18} />, bg: "bg-blue-50" },
  ]);

  // 4. Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPackageId, setNewPackageId] = useState('');

  // --- HANDLERS (Functions) ---

  // Handle adding a new package
  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackageId) return;

    const newPkg: Package = {
      id: newPackageId,
      status: "In Transit",
      date: new Date().toLocaleDateString(),
      type: "transit"
    };

    // Update List
    setRecentPackages([newPkg, ...recentPackages]);
    
    // Update Stats (Increment Counter)
    setStats(prev => ({ ...prev, packages: prev.packages + 1 }));

    // Reset & Close
    setNewPackageId('');
    setIsModalOpen(false);
    toast.success("Package added successfully!");
  };

  // Handle removing an alert
  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  // Helper for badges
  const getStatusBadge = (type: string) => {
    switch(type) {
      case 'transit': return <span className="flex items-center gap-1 text-blue-500 bg-blue-50 px-2 py-1 rounded text-xs font-medium"><Clock size={12}/> In Transit</span>;
      case 'delivered': return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded text-xs font-medium"><CheckCircle size={12}/> Delivered</span>;
      case 'cancelled': return <span className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-1 rounded text-xs font-medium"><AlertTriangle size={12}/> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 font-sans text-gray-800 relative">
      
      {/* NOTE: <Toaster /> removed to use the global one in App/Layout */}

      {/* --- MODAL FOR ADDING PACKAGE --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Package</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. ORD-9999"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPackageId}
                  onChange={(e) => setNewPackageId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                Add Package
              </button>
            </form>
          </div>
        </div>
      )}

      <div className=" mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* --- Main Content Area --- */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-500 mt-1">Welcome to EXPRESUR Client Dashboard</p>
          </div>

          {/* Dynamic Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">Packages in Locker</span>
                <div className="p-2 bg-gray-100 rounded-full"><Box size={20} className="text-gray-500" /></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">{stats.packages}</h2>
                <p className="text-sm mt-2 font-medium text-emerald-500">+12% <span className="text-gray-400 font-normal">from last period</span></p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">Active Shipments</span>
                <div className="p-2 bg-gray-100 rounded-full"><Truck size={20} className="text-gray-500" /></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">{stats.shipments}</h2>
                <p className="text-sm mt-2 font-medium text-rose-500">-3% <span className="text-gray-400 font-normal">from last period</span></p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">Wallet Balance</span>
                <div className="p-2 bg-gray-100 rounded-full"><Wallet size={20} className="text-gray-500" /></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">${stats.balance.toLocaleString()}</h2>
                <p className="text-sm mt-2 font-medium text-emerald-500">+15% <span className="text-gray-400 font-normal">from last period</span></p>
              </div>
            </div>
          </div>

          {/* Functional Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Add Package Button - Opens Modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 text-left border border-transparent hover:border-gray-100 group cursor-pointer"
              >
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-black group-hover:text-white transition-colors text-gray-600">
                  <Plus size={20} />
                </div>
                <h4 className="font-semibold text-gray-800">Add Package</h4>
                <p className="text-xs text-gray-400 mt-1">Add more packages</p>
              </button>

              {/* Other Static Buttons (Placeholders) */}
              <button className="bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 text-left border border-transparent hover:border-gray-100 group">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-gray-50 text-gray-600">
                  <Layers size={20} />
                </div>
                <h4 className="font-semibold text-gray-800">Consolidate</h4>
                <p className="text-xs text-gray-400 mt-1">Create Consolidates</p>
              </button>

              <button className="bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 text-left border border-transparent hover:border-gray-100 group">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-gray-50 text-gray-600">
                  <Truck size={20} />
                </div>
                <h4 className="font-semibold text-gray-800">Create Shipment</h4>
                <p className="text-xs text-gray-400 mt-1">Add more shipment</p>
              </button>

              <button className="bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 text-left border border-transparent hover:border-gray-100 group">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-gray-50 text-gray-600">
                  <Send size={20} />
                </div>
                <h4 className="font-semibold text-gray-800">Send Money</h4>
                <p className="text-xs text-gray-400 mt-1">Money transactions</p>
              </button>
            </div>
          </div>

          {/* Dynamic Recent Packages List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-gray-100 rounded-full"><Box size={16} className="text-gray-500"/></div>
                <h3 className="text-lg font-bold text-gray-800">Recent Packages</h3>
              </div>
              
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white">
                    <tr className="text-gray-400 text-sm border-b border-gray-50">
                      <th className="pb-3 font-normal">Tracking Number</th>
                      <th className="pb-3 font-normal">Status</th>
                      <th className="pb-3 font-normal">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentPackages.map((pkg, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-medium text-gray-700">{pkg.id}</td>
                        <td className="py-4">{getStatusBadge(pkg.type)}</td>
                        <td className="py-4 text-gray-500">{pkg.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {recentPackages.length === 0 && <p className="text-center text-gray-400 py-8">No packages found.</p>}
              </div>
            </div>

            {/* Recent Transaction (Static for demo) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-gray-100 rounded-full"><ArrowUpRight size={16} className="text-gray-500"/></div>
                   <h3 className="text-lg font-bold text-gray-800">Recent Transaction</h3>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition">Show All</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Sent</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Today, 11:55 AM</p>
                    </div>
                    <span className="font-bold text-sm text-emerald-500">+21.17</span>
                </div>
                {/* More static transactions can be added here */}
                 <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Pending</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Yesterday, 3:15 PM</p>
                    </div>
                    <span className="font-bold text-sm text-orange-500">+10.05</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Sidebar (Alerts) --- */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* Profile Header */}
          <div className="flex items-center gap-6 mt-6 md:mt-0 justify-end">
            {/* Notification Bell with Link */}
            <Link to="/dashboard/notifications">
              <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
                <Bell size={20} className="text-gray-600" />
                {/* Alert Dot Added */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            </Link>
            
            <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border border-green-200">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover"/>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
                <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
              </div>
            </div>
          </div>

          {/* Interactive Alerts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
            <div className="flex items-center gap-2 mb-6">
               <div className="p-1.5 bg-gray-50 rounded-full border border-gray-100"><Bell size={16} className="text-gray-500"/></div>
               <h3 className="text-lg font-bold text-gray-800">Important Alerts</h3>
            </div>

            <div className="space-y-4">
              {alerts.length === 0 ? (
                <p className="text-gray-400 text-center text-sm">No new alerts</p>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all group relative">
                    <button 
                      onClick={() => removeAlert(alert.id)}
                      className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X size={14}/>
                    </button>
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 min-w-[20px]`}>{alert.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{alert.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{alert.desc}</p>
                        <p className="text-[10px] text-gray-400 mt-2">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardUser;