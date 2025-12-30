import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import {
  Bell,
  Search,
  Plus,
  ArrowRight,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  ChevronDown // Dropdown Icon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

  // Form State
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

  // --- Stats Calculation ---
  const stats = useMemo(() => {
    return [
      { title: 'Total Packages', count: 33, change: '+12% from last period', isPositive: true, icon: <Package size={16} /> },
      { title: 'In Transit', count: 20, change: '-3% from last period', isPositive: false, icon: <Truck size={16} /> },
      { title: 'Delivered', count: 8, change: '+15% from last period', isPositive: true, icon: <CheckCircle size={16} /> },
      { title: 'Delayed', count: 5, change: '-3% from last period', isPositive: false, icon: <AlertCircle size={16} /> }
    ];
  }, [packages]);

  // --- Helper Functions ---
  const handleAddPackage = () => {
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

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.carrier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const currentData = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-[#22C55E]';
      case 'Consolidated': return 'text-[#F59E0B]';
      case 'Shipped': return 'text-[#3B82F6]';
      case 'In Warehouse': return 'text-[#D946EF]';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-10">
      <Helmet>
        <title>My Packages | EXPRESUR</title>
      </Helmet>

      {/* --- MOBILE HEADER --- */}
      <div className="xl:hidden bg-white p-4 sticky top-0 z-20 shadow-sm flex justify-between items-center mb-6">
        <div>
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

      <div className="px-4 md:px-10 space-y-6 md:space-y-8">
        
        {/* --- DESKTOP Header --- */}
        <div className="hidden xl:flex justify-between items-center mb-10 pt-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Packages</h1>
            <p className="text-gray-500 mt-2 text-sm">Track your packages</p>
          </div>
          <div className="flex items-center gap-6">
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

        {/* --- Mobile Title --- */}
        <div className="xl:hidden">
            <h1 className="text-2xl font-bold text-gray-900">My Packages</h1>
            <p className="text-gray-500 text-sm">Track your packages</p>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB] lg:bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[2rem] border border-gray-100 shadow-sm lg:shadow-none"
            >
              <div className="flex justify-between items-start mb-3 lg:mb-6">
                <span className="text-[#6B7280] font-medium text-sm lg:text-lg">{stat.title}</span>
                <div className="p-1.5 lg:p-2 bg-[#E5E7EB] rounded-full text-[#9CA3AF]">
                  {React.cloneElement(stat.icon as React.ReactElement<any>)}
                </div>
              </div>
              <div>
                <h2 className="text-2xl lg:text-5xl font-semibold text-[#111827]">{stat.count}</h2>
                <p className={`text-[11px] lg:text-sm mt-1 lg:mt-3 font-medium ${stat.isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Package History Container --- */}
        <div className="bg-white rounded-[24px] lg:rounded-[32px] p-5 lg:p-8 shadow-sm border border-gray-100 min-h-[500px]">
          <h3 className="text-lg lg:text-xl font-medium text-gray-600 mb-6 lg:mb-8">Package History</h3>

          {/* --- Toolbar --- */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <button className="bg-[#005f33] text-white px-4 lg:px-5 py-2 rounded-lg text-xs lg:text-sm font-medium shadow-sm flex-shrink-0">
                All
              </button>
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder="Tracking number, customer....."
                  className="w-full bg-[#F3F4F6] border-none outline-none text-gray-600 px-3 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2 lg:top-2.5 text-gray-400" size={16} />
              </div>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#005f33] hover:bg-[#004d2a] text-white p-2 lg:px-4 lg:py-2.5 rounded-lg shadow-sm flex items-center justify-center transition"
            >
              <Plus size={20} />
              <span className="hidden lg:inline ml-2 text-sm font-medium">Add Package</span>
            </button>
          </div>

          {/* --- DESKTOP Table View --- */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] text-sm text-gray-400">
                  <th className="py-4 pl-6 rounded-l-2xl font-semibold">Tracking Number</th>
                  <th className="py-4 font-semibold">Destination</th>
                  <th className="py-4 font-semibold">Carrier</th>
                  <th className="py-4 pr-6 rounded-r-2xl font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {currentData.length > 0 ? currentData.map((pkg, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">
                    <td className="py-6 pl-6 text-gray-600 font-normal">{pkg.id}</td>
                    <td className="py-6 text-gray-500 font-normal">
                      <div className="flex flex-col">
                        <span>{pkg.destination}</span>
                      </div>
                    </td>
                    <td className="py-6 text-gray-500 font-normal">{pkg.carrier}</td>
                    <td className="py-6 pr-6 text-right">
                      <span className={`font-medium ${getStatusColor(pkg.status)}`}>
                        {pkg.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="text-center py-20 text-gray-400">No packages found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE List View --- */}
          <div className="lg:hidden">
             <div className="flex bg-[#F3F4F6] p-3 rounded-t-xl text-[11px] font-semibold text-gray-400">
                <div className="w-[30%]">Tracking Number</div>
                <div className="w-[30%] text-center">Destination</div>
                <div className="w-[20%] text-center">Carrier</div>
                <div className="w-[20%] text-right">Status</div>
             </div>

             <div className="space-y-0">
               {currentData.length > 0 ? currentData.map((pkg, idx) => (
                 <div 
                    key={idx} 
                    className={`flex items-center p-4 border-b border-gray-50 last:border-none ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                 >
                    <div className="w-[30%] text-[11px] text-gray-600 font-medium break-all">
                       {pkg.id}
                    </div>
                    <div className="w-[30%] text-[11px] text-gray-500 text-center leading-tight px-1">
                       {pkg.destination.split(',')[0]}<br/>
                       <span className="text-[9px] text-gray-400">{pkg.destination.split(',')[1]}</span>
                    </div>
                    <div className="w-[20%] text-[11px] text-gray-500 text-center">
                       {pkg.carrier}
                    </div>
                    <div className="w-[20%] text-right">
                       <span className={`text-[10px] font-medium ${getStatusColor(pkg.status)}`}>
                          {pkg.status}
                       </span>
                    </div>
                 </div>
               )) : (
                 <div className="text-center py-10 text-gray-400 text-sm">No packages found</div>
               )}
             </div>
          </div>

          {/* --- Pagination --- */}
          <div className="flex justify-end items-center gap-6 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`text-sm transition ${currentPage === 1 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`text-sm flex items-center gap-2 transition font-medium ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300' : 'text-[#005f33]'}`}
            >
              Next <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* --- ADD PACKAGE MODAL (Matched image_bef7f8.png) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-[16px] w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-gray-600 mb-6">Add Package</h2>
            
            <div className="grid grid-cols-1 gap-5 mb-8">
               {/* Item Input */}
               <div className="space-y-1.5">
                  <label className="text-[13px] text-gray-500 font-medium">Item *</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#005f33] transition" 
                    value={newPackage.item} 
                    onChange={(e) => setNewPackage({ ...newPackage, item: e.target.value })} 
                  />
               </div>

               {/* Tracking Number Input */}
               <div className="space-y-1.5">
                  <label className="text-[13px] text-gray-500 font-medium">Tracking Number *</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#005f33] transition" 
                    value={newPackage.trackingNumber} 
                    onChange={(e) => setNewPackage({ ...newPackage, trackingNumber: e.target.value })} 
                  />
               </div>

               {/* Category Select */}
               <div className="space-y-1.5">
                  <label className="text-[13px] text-gray-500 font-medium">Category *</label>
                  <div className="relative">
                    <select 
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#005f33] transition appearance-none bg-white text-gray-500" 
                      value={newPackage.category} 
                      onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                    >
                      <option value="" disabled>Select a type</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Fragile">Fragile</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
               </div>

               {/* Customer Input */}
               <div className="space-y-1.5">
                  <label className="text-[13px] text-gray-500 font-medium">Customer *</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#005f33] transition" 
                    value={newPackage.customer} 
                    onChange={(e) => setNewPackage({ ...newPackage, customer: e.target.value })} 
                  />
               </div>

               {/* Note Textarea */}
               <div className="space-y-1.5">
                  <label className="text-[13px] text-gray-500 font-medium">Note (Optional)</label>
                  <textarea 
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#005f33] transition h-24 resize-none" 
                    value={newPackage.note} 
                    onChange={(e) => setNewPackage({ ...newPackage, note: e.target.value })} 
                  />
               </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-6">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 text-[15px] font-normal hover:text-gray-600 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPackage} 
                className="text-[#005f33] text-[15px] font-medium hover:text-[#004d2a] transition"
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