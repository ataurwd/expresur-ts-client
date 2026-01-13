import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import {
  Bell,
  Copy,
  Search,
  Check,
  Info,
  ArrowRightLeft, // Status indicator
  Eye,
  Shuffle, // Consolidate Icon
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// --- Types ---
interface Package {
  id: string;
  status: string;
  statusType: 'success' | 'warning' | 'info' | 'consolidate';
}

const Locker: React.FC = () => {
  // --- State Management ---
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Initial Data matched to Screenshot
  const [packages, setPackages] = useState<Package[]>([
    { id: 'ORD-1001', status: 'Arrived', statusType: 'success' },
    { id: 'ORD-1002', status: 'Under Review', statusType: 'warning' },
    { id: 'ORD-1001', status: 'Consolidate', statusType: 'consolidate' },
    { id: 'ORD-1004', status: 'Arrived', statusType: 'success' },
  ]);

  // --- Functionalities ---
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied successfully');
  };

  const handleAddTracking = () => {
    if (!trackingInput.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    const newPackage: Package = {
      id: trackingInput.toUpperCase(),
      status: 'Under Review',
      statusType: 'warning',
    };

    setPackages([newPackage, ...packages]);
    setTrackingInput('');
    toast.success('New tracking added');
  };

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const currentData = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Status Renderer
  const renderStatus = (pkg: Package) => {
    switch (pkg.statusType) {
      case 'success':
        return (
          <div className="flex items-center gap-1.5 text-[#22C55E]">
            <Check size={16} strokeWidth={3} />
            <span className="font-medium text-[14px] md:text-[15px]">{pkg.status}</span>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-1.5 text-[#FBBF24]">
            <Info size={16} strokeWidth={2.5} />
            <span className="font-medium text-[14px] md:text-[15px]">{pkg.status}</span>
          </div>
        );
      case 'consolidate':
        return (
          <div className="flex items-center gap-1.5 text-[#3B82F6]">
            <ArrowRightLeft size={16} strokeWidth={2.5} />
            <span className="font-medium text-[14px] md:text-[15px]">{pkg.status}</span>
          </div>
        );
      default:
        return <span className="text-gray-500">{pkg.status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 pb-10">
      <Helmet>
        <title>My Locker | EXPRESUR</title>
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Locker</h1>
            <p className="text-gray-500 mt-2 text-sm">Welcome to EXPRESUR Client Dashboard</p>
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
            <h1 className="text-2xl font-bold text-gray-900">My Locker</h1>
            <p className="text-gray-500 text-sm">Welcome to EXPRESUR Client Dashboard</p>
        </div>

        {/* --- Locker Details Card --- */}
        <div className="bg-[#F9FAFB] rounded-[24px] md:rounded-3xl p-5 md:p-8 border border-gray-100 shadow-sm">
          
          {/* Locker ID Row */}
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <span className="text-gray-500 font-semibold text-base md:text-[20px]">Locker ID</span>
            <span className="text-gray-600 font-medium text-base md:text-[20px]">LCK-127A</span>
          </div>

          <h3 className="text-lg md:text-[20px] font-semibold text-gray-600 mb-4 md:mb-8">Locker Shipping Address</h3>

          {/* --- PERFECTED Address List (Mobile Optimized) --- */}
          <div className="space-y-0 md:space-y-4">
            {[
              { label: "Name", value: "Client Name" },
              { label: "Address Line 1", value: "8852 SW 215th LN" },
              { label: "Address Line 2", value: "Expresur (US123456)" },
              { label: "City", value: "Cutler Bay" },
              { label: "State", value: "Florida" },
              { label: "Zip Code", value: "33189" },
              { label: "Phone Number", value: "(786) 314-4045" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 md:border-none md:py-0"
              >
                {/* Left: Label & Value */}
                <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-2 flex-1 pr-4">
                  <span className="text-gray-500 font-normal text-xs md:text-[15px] md:w-36 flex-shrink-0">
                    {item.label}:
                  </span>
                  <span className="text-gray-800 font-medium md:font-normal text-sm md:text-[15px] break-words">
                    {item.value}
                  </span>
                </div>

                {/* Right: Copy Button */}
                <button
                  onClick={() => handleCopy(item.value)}
                  className="flex-shrink-0 flex items-center gap-2 text-[12px] md:text-[13px] text-gray-400 bg-white md:bg-transparent px-3 py-1.5 md:p-0 rounded-lg md:rounded-none border border-gray-100 md:border-none hover:bg-gray-50 md:hover:bg-transparent transition active:scale-95 md:hover:text-gray-600"
                >
                  <Copy size={15} className="md:w-3.5 md:h-3.5" /> 
                  <span className="md:inline">Copy</span>
                </button>
              </div>
            ))}
          </div>

          {/* Notification Banner */}
          <div className="mt-6 md:mt-10 bg-[#FEF9C3]/40 border border-[#FEF9C3] rounded-2xl p-4 md:p-6 flex items-start md:items-center gap-4">
            <div className="w-6 h-6 rounded-full border border-[#D97706] text-[#D97706] flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0 font-serif font-bold text-sm">
              i
            </div>
            <span className="text-[#B45309] text-sm md:text-[16px] font-medium leading-tight">Use this address to receive your packages.</span>
          </div>
        </div>

        {/* --- Add Tracking Input ---
        <div className="bg-[#F9FAFB] rounded-2xl p-2 border border-gray-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-8">
          <input
            type="text"
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value)}
            placeholder="Enter Tracking number ....."
            className="flex-1 bg-transparent outline-none text-gray-600 px-4 py-3 placeholder-gray-400 font-normal text-sm md:text-[15px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTracking();
              }
            }}
          />
          <button
            onClick={handleAddTracking}
            className="bg-[#006D35] hover:bg-[#005a2c] text-white px-6 md:px-8 py-3 rounded-xl font-medium text-[15px] transition-all active:scale-95 whitespace-nowrap"
          >
            Add Tracking
          </button>
        </div> */}

        {/* --- Packages Section --- */}
        <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
          <h3 className="text-lg md:text-[22px] font-bold text-gray-600 mb-6">Your Packages</h3>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8 gap-3 md:gap-4">
            <button className="bg-[#006D35] text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm w-full md:w-auto">
              All
            </button>
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tracking number, customer....."
                className="w-full bg-[#F3F4F6]/50 border-none pl-4 pr-11 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-100 transition placeholder-gray-400"
              />
              <Search className="absolute right-4 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* --- DESKTOP Table View --- */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-gray-50 flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] text-[15px] text-gray-400 font-medium">
                  <th className="py-4 px-6 font-medium w-1/3">Tracking Number</th>
                  <th className="py-4 px-6 font-medium w-1/3">Status</th>
                  <th className="py-4 px-6 font-medium text-right w-1/3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {currentData.length > 0 ? (
                  currentData.map((pkg, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6 text-gray-600 font-normal">{pkg.id}</td>
                      <td className="py-5 px-6">
                        {renderStatus(pkg)}
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex justify-end items-center gap-3">
                          {/* Desktop: Button with TEXT "Consolidate" + Shuffle Icon */}
                          {pkg.statusType === 'consolidate' && (
                            <button
                              onClick={() => toast.info(`Expanding consolidation details`)}
                              className="flex items-center gap-2 bg-[#006D35] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a2c] transition shadow-sm"
                            >
                              <Shuffle size={16} /> 
                              Consolidate
                            </button>
                          )}
                          <button
                            onClick={() => toast('Details for ' + pkg.id)}
                            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
                          >
                            <Eye size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-20 text-gray-400">
                      No packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE List View --- */}
          <div className="md:hidden">
             {currentData.length > 0 ? (
                 <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                     {currentData.map((pkg, idx) => (
                         <div key={idx} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-none">
                             {/* Tracking Number */}
                             <div className="text-gray-600 font-medium text-[14px]">
                                {pkg.id}
                             </div>
                             
                             {/* Status */}
                             <div className="flex-1 flex justify-center">
                                {renderStatus(pkg)}
                             </div>
                             
                             {/* Actions */}
                             <div className="flex items-center gap-2">
                                 {/* Mobile: Button with Shuffle ICON only */}
                                 {pkg.statusType === 'consolidate' && (
                                    <button 
                                        onClick={() => toast.info(`Expand`)}
                                        className="bg-[#006D35] text-white p-2 rounded-lg shadow-sm"
                                    >
                                        <Shuffle size={18} strokeWidth={2.5} /> 
                                    </button>
                                 )}
                                 <button 
                                    onClick={() => toast('View ' + pkg.id)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                 >
                                     <Eye size={20} />
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
                    <p>No packages found.</p>
                </div>
             )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 md:border-t border-gray-50">
            <div className="text-xs text-gray-400 hidden md:block">
              Showing {currentData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredPackages.length)}
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 transition ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <ArrowLeft size={16} strokeWidth={2.5} /> Previous
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`flex items-center gap-2 transition ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#006D35] hover:text-[#005a2c]'}`}
              >
                Next <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locker;