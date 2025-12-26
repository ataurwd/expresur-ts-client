import React, { useState, useMemo } from 'react';
import { toast } from 'sonner'; // Toaster removed to avoid duplicates
import {
  Bell,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  X,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface PackageData {
  id: string;
  from: string;
  destination: string;
  weight: string;
  carrier: string;
  date: string;
  status: 'Delivered' | 'Consolidated' | 'Shipped' | 'In Warehouse' | 'Delayed';
  desc: string;
}

const Packages = () => {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State for New Package
  const [newPackage, setNewPackage] = useState({
    item: '',
    trackingNumber: '',
    category: '',
    customer: '',
    note: ''
  });

  // --- Initial Data ---
  const [packages, setPackages] = useState<PackageData[]>([
    { id: 'ORD-1001', from: 'Shanghai, China', destination: 'Sydney, Australia', weight: '2.5kg', carrier: 'UPS', date: '7/5/2024', status: 'Delivered', desc: 'Fashion items' },
    { id: 'ORD-1002', from: 'Shanghai, China', destination: 'Sydney, Australia', weight: '3kg', carrier: 'Fedex', date: '7/5/2024', status: 'Consolidated', desc: 'Fragile - contains glassware' },
    { id: 'ORD-1001', from: 'Shanghai, China', destination: 'Sydney, Australia', weight: '5kg', carrier: 'USPS', date: '7/5/2024', status: 'Shipped', desc: 'Fashion items' },
    { id: 'ORD-1002', from: 'Shanghai, China', destination: 'Sydney, Australia', weight: '3kg', carrier: 'Fedex', date: '7/5/2024', status: 'In Warehouse', desc: 'Fashion items' },
  ]);

  // --- 1. Dynamic Stats Calculation ---
  const stats = useMemo(() => {
    const total = packages.length;
    const delivered = packages.filter(p => p.status === 'Delivered').length;
    const inTransit = packages.filter(p => p.status === 'Shipped' || p.status === 'In Warehouse').length;
    const delayed = packages.filter(p => p.status === 'Delayed' || p.status === 'Consolidated').length;

    return [
      { title: 'Total Packages', count: total, change: '+12% from last period', isPositive: true, icon: <Package size={20} className="text-gray-500" /> },
      { title: 'In Transit', count: inTransit, change: '-3% from last period', isPositive: false, icon: <Truck size={20} className="text-gray-500" /> },
      { title: 'Delivered', count: delivered, change: '+15% from last period', isPositive: true, icon: <CheckCircle size={20} className="text-gray-500" /> },
      { title: 'Delayed', count: delayed, change: '+2% from last period', isPositive: false, icon: <AlertCircle size={20} className="text-gray-500" /> }
    ];
  }, [packages]);

  // --- 2. Add Package Logic ---
  const handleAddPackage = () => {
    // Validation
    if (!newPackage.item || !newPackage.trackingNumber || !newPackage.category || !newPackage.customer) {
      toast.error('Please fill in all required fields (*)');
      return;
    }

    const pkg: PackageData = {
      id: newPackage.trackingNumber,
      from: 'Processing...',
      destination: newPackage.customer,
      weight: 'N/A',
      carrier: newPackage.category,
      date: new Date().toLocaleDateString(),
      status: 'In Warehouse',
      desc: newPackage.item
    };

    setPackages([pkg, ...packages]);
    setIsModalOpen(false);
    setNewPackage({ item: '', trackingNumber: '', category: '', customer: '', note: '' });
    toast.success('Package added successfully');
  };

  // --- 3. Search & Filter Logic ---
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.carrier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  // --- 4. Pagination Logic ---
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const currentData = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper for Status Colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-500';
      case 'Consolidated': return 'text-orange-400';
      case 'Shipped': return 'text-blue-500';
      case 'In Warehouse': return 'text-fuchsia-500';
      case 'Delayed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative">

      {/* NOTE: <Toaster /> removed to use the global one in App/Layout */}

      {/* --- Header --- */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Packages</h1>
          <p className="text-gray-500 mt-2 text-sm">Track your packages</p>
        </div>

        <div className="flex items-center gap-6 mt-6 md:mt-0">
          {/* Notification Bell with Link */}
          <Link to="/dashboard/notifications">
            <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </Link>

          <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border border-green-200">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
              <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto space-y-8">

        {/* --- Dynamic Stats Cards --- */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">{stat.title}</span>
                <div className="p-2 bg-gray-50 rounded-full">{stat.icon}</div>
              </div>
              <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">{stat.count}</h2>
                <p className={`text-xs mt-2 font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        {/* --- Dynamic Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB] p-8 rounded-[2rem] border border-gray-100 relative shadow-sm"
            >
              <div className="flex justify-between items-start">
                {/* Title matches the gray, medium-weight text in the image */}
                <span className="text-[#6B7280] font-medium text-lg">{stat.title}</span>
                {/* Icon container with light gray background circle */}
                <div className="p-2 bg-[#E5E7EB] rounded-full text-[#9CA3AF]">
                  {stat.icon}
                </div>
              </div>

              <div className="mt-6">
                {/* Large, dark count text */}
                <h2 className="text-5xl font-semibold text-[#111827]">{stat.count}</h2>
                {/* Percentage change with specific green/red colors from the design */}
                <p className={`text-sm mt-3 font-medium ${stat.isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}>
                  {stat.change} from last period
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Package History & Controls --- */}
        {/* <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Package History</h3>

       
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="bg-[#005f33] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
                All ({filteredPackages.length})
              </button>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tracking number, item..."
                  className="w-full bg-[#F9FAFB] border-none outline-none text-gray-700 pl-11 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-green-100 transition placeholder-gray-400"
                />
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#005f33] hover:bg-[#004d2a] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition w-full md:w-auto justify-center"
            >
              <Plus size={18} /> Add Package
            </button>
          </div>

   
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] text-xs text-gray-400 uppercase tracking-wider">
                  <th className="py-4 pl-6 rounded-l-xl font-medium">Tracking Number</th>
                  <th className="py-4 font-medium">From</th>
                  <th className="py-4 font-medium">Destination</th>
                  <th className="py-4 font-medium">Weight</th>
                  <th className="py-4 font-medium">Carrier</th>
                  <th className="py-4 font-medium">Arrival Date</th>
                  <th className="py-4 font-medium">Status</th>
                  <th className="py-4 pr-6 rounded-r-xl font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentData.length > 0 ? currentData.map((pkg, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition group">
                    <td className="py-5 pl-6 font-medium text-gray-600">{pkg.id}</td>
                    <td className="py-5 text-gray-500">{pkg.from}</td>
                    <td className="py-5 text-gray-500">{pkg.destination}</td>
                    <td className="py-5 text-gray-500">{pkg.weight}</td>
                    <td className="py-5 text-gray-500">{pkg.carrier}</td>
                    <td className="py-5 text-gray-500">{pkg.date}</td>
                    <td className="py-5">
                      <span className={`font-medium ${getStatusColor(pkg.status)}`}>
                        {pkg.status}
                      </span>
                    </td>
                    <td className="py-5 pr-6 text-gray-500">{pkg.desc}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400">No packages found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

         
          <div className="flex justify-end items-center gap-8 mt-8 text-sm font-medium select-none">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 transition ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft size={16} strokeWidth={2.5} /> Previous
            </button>
            <span className="text-gray-400 font-normal">Page {currentPage} of {totalPages || 1}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`flex items-center gap-2 transition ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#005f33] hover:text-[#004d2a]'}`}
            >
              Next <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>

        </div> */}


        <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 min-h-[500px]">
          <h3 className="text-xl font-medium text-gray-700 mb-8">Package History</h3>

          {/* Toolbar - Matches image layout */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* "All" button with exact dark green */}
              <button className="bg-[#005f33] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm">
                All
              </button>

              {/* Search Bar - Icon on the right per design */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tracking number, customer....."
                  className="w-full bg-[#F3F4F6] border-none outline-none text-gray-600 px-4 py-2.5 rounded-xl text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-200"
                />
                <Search className="absolute right-4 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Add Package Button - Dark green with white plus icon */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#005f33] hover:bg-[#004d2a] text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 transition"
            >
              <Plus size={18} /> Add Package
            </button>
          </div>

          {/* Table - Header and Row styles updated */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {/* Semi-bold gray headers on light background */}
                <tr className="bg-[#F9FAFB] text-sm text-gray-400">
                  <th className="py-4 pl-6 rounded-l-2xl font-semibold">Tracking Number</th>
                  <th className="py-4 font-semibold">From</th>
                  <th className="py-4 font-semibold">Destination</th>
                  <th className="py-4 font-semibold">Weight</th>
                  <th className="py-4 font-semibold">Carrier</th>
                  <th className="py-4 font-semibold">Arrival Date</th>
                  <th className="py-4 font-semibold">Status</th>
                  <th className="py-4 pr-6 rounded-r-2xl font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {currentData.length > 0 ? currentData.map((pkg, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">
                    <td className="py-6 pl-6 text-gray-600 font-normal">{pkg.id}</td>
                    <td className="py-6 text-gray-500 font-normal">{pkg.from}</td>
                    <td className="py-6 text-gray-500 font-normal">{pkg.destination}</td>
                    <td className="py-6 text-gray-500 font-normal">{pkg.weight}</td>
                    <td className="py-6 text-gray-500 font-normal text-sm">{pkg.carrier}</td>
                    <td className="py-6 text-gray-500 font-normal">{pkg.date}</td>
                    <td className="py-6">
                      {/* Vibrant status colors per image */}
                      <span className={`font-normal ${pkg.status === 'Delivered' ? 'text-green-500' :
                        pkg.status === 'Consolidated' ? 'text-orange-400' :
                          pkg.status === 'Shipped' ? 'text-blue-500' :
                            'text-purple-500'
                        }`}>
                        {pkg.status}
                      </span>
                    </td>
                    <td className="py-6 pr-6 text-gray-500 font-normal text-sm italic">{pkg.desc}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="text-center py-20 text-gray-400">No packages found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Aligned with 'Next' arrow style */}
          <div className="flex justify-end items-center gap-8 mt-10">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`text-sm transition ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`text-sm flex items-center gap-2 transition ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300' : 'text-[#005f33] font-medium'
                }`}
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- ADD PACKAGE MODAL (Updated) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-xl w-full max-w-4xl p-8 shadow-2xl transform transition-all relative">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Package</h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Item *</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-50 focus:border-green-500 transition text-gray-700"
                  value={newPackage.item}
                  onChange={(e) => setNewPackage({ ...newPackage, item: e.target.value })}
                />
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Tracking Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-50 focus:border-green-500 transition text-gray-700"
                  value={newPackage.trackingNumber}
                  onChange={(e) => setNewPackage({ ...newPackage, trackingNumber: e.target.value })}
                />
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Category *</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-50 focus:border-green-500 transition text-gray-700 appearance-none bg-white"
                    value={newPackage.category}
                    onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                  >
                    <option value="" disabled>Select a type</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Fragile">Fragile</option>
                    <option value="Documents">Documents</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Customer *</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-50 focus:border-green-500 transition text-gray-700"
                  value={newPackage.customer}
                  onChange={(e) => setNewPackage({ ...newPackage, customer: e.target.value })}
                />
              </div>
            </div>


            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium text-gray-500">Note (Optional)</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-50 focus:border-green-500 transition text-gray-700 resize-none h-24"
                value={newPackage.note}
                onChange={(e) => setNewPackage({ ...newPackage, note: e.target.value })}
              />
            </div>


            <div className="flex justify-end items-center gap-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 font-medium hover:text-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPackage}
                className="text-[#005f33] font-bold hover:text-[#004d2a] transition"
              >
                Add Package
              </button>
            </div>

          </div>
        </div>
      )}




    </div>
  );
};

export default Packages;