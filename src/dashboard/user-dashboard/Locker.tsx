import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { 
  Bell, 
  Copy, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  ArrowRightLeft, 
  ArrowRight,
  ArrowLeft,
  Plus
} from 'lucide-react';

// --- Types ---
interface Package {
  id: string;
  arrivalDate: string;
  status: string;
  statusType: 'success' | 'warning' | 'info';
  showConsolidate: boolean;
}

const Locker: React.FC = () => {
  // --- State Management ---
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Initial Data
  const [packages, setPackages] = useState<Package[]>([
    { id: 'ORD-1001', arrivalDate: '7/5/2024', status: 'Arrived', statusType: 'success', showConsolidate: false },
    { id: 'ORD-1002', arrivalDate: '7/5/2024', status: 'Under Review', statusType: 'warning', showConsolidate: false },
    { id: 'ORD-1003', arrivalDate: '7/5/2024', status: 'Ready To Consolidate', statusType: 'info', showConsolidate: true },
    { id: 'ORD-1004', arrivalDate: '6/5/2024', status: 'Arrived', statusType: 'success', showConsolidate: false },
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
      arrivalDate: new Date().toLocaleDateString(), 
      status: 'Under Review',
      statusType: 'warning', 
      showConsolidate: false
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

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10">
      
      <Toaster position="top-center" richColors closeButton />

      {/* --- Header --- */}
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Locker</h1>
          <p className="text-gray-500 mt-2 text-sm">Welcome to EXPRESUR Client Dashboard</p>
        </div>

        <div className="flex items-center gap-6 mt-6 md:mt-0">
          <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
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
      </div>

      <div className=" mx-auto space-y-8">
        
        {/* --- Locker Details Card --- */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100">
          
          {/* Locker ID Row */}
          <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-6">
            <span className="text-gray-500 font-medium text-base">Locker ID</span>
            <span className="text-gray-800 font-bold text-lg">LCK-127A</span>
          </div>

          <h3 className="text-lg font-medium text-gray-500 mb-6">Locker Shipping Address</h3>

          {/* Address List - Border removed here */}
          <div className="space-y-3 w-full"> 
            {[
              "Maria González",
              "123 Warehouse Ave",
              "Suite 456 (Locker ID: US123456)",
              "Miami, FL 33152",
              "+1 (305) 555-7890"
            ].map((text, index) => (
              // border-dashed removed from class below
              <div key={index} className="flex items-center justify-between group py-1">
                <span className="text-gray-800 font-medium text-[15px]">{text}</span>
                <button 
                  onClick={() => handleCopy(text)}
                  className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 hover:bg-green-50 hover:text-[#005f33] hover:border-green-100 transition active:scale-95 ml-4"
                >
                  <Copy size={14} /> Copy
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl p-4 flex items-center gap-4 text-[#92400E]">
            <div className="w-8 h-8 rounded-full bg-[#FDE68A] flex items-center justify-center flex-shrink-0">
               <AlertCircle size={18} className="text-[#B45309]" />
            </div>
            <span className="text-sm font-semibold">Use this address to receive your packages.</span>
          </div>
        </div>

        {/* --- Add Tracking Input --- */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center gap-4">
            <input 
              type="text" 
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="Enter Tracking number ....." 
              className="flex-1 bg-[#F9FAFB] border-none outline-none text-gray-700 px-6 py-4 rounded-xl focus:ring-2 focus:ring-green-100 transition placeholder-gray-400 font-medium"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  handleAddTracking();
                }
              }}
            />
            <button 
              onClick={handleAddTracking}
              className="bg-[#005f33] hover:bg-[#004d2a] text-white px-8 py-4 rounded-xl font-semibold text-sm w-full md:w-auto transition-all shadow-lg shadow-green-900/10 active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Tracking
            </button>
        </div>

        {/* --- Packages Table --- */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 min-h-[500px] flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Your Packages</h3>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
             <div className="flex gap-2 w-full md:w-auto">
                <button className="bg-[#005f33] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm w-full md:w-auto">
                  All ({filteredPackages.length})
                </button>
             </div>
             <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tracking number, status..." 
                  className="w-full bg-[#F9FAFB] border border-gray-100 pl-11 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-50 transition"
                />
             </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-grow">
            {currentData.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="py-5 font-semibold pl-2">Tracking Number</th>
                    <th className="py-5 font-semibold">Arrival Date</th>
                    <th className="py-5 font-semibold">Status</th>
                    <th className="py-5 font-semibold text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentData.map((pkg, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/60 transition group">
                      <td className="py-5 pl-2 font-medium text-gray-600">{pkg.id}</td>
                      <td className="py-5 text-gray-500">{pkg.arrivalDate}</td>
                      <td className="py-5">
                        <div className="flex items-center gap-2.5">
                          {pkg.statusType === 'success' && <CheckCircle size={18} className="text-green-500" />}
                          {pkg.statusType === 'warning' && <AlertCircle size={18} className="text-orange-400" />}
                          {pkg.statusType === 'info' && <ArrowRightLeft size={18} className="text-blue-500" />}
                          
                          <span className={`font-semibold 
                            ${pkg.statusType === 'success' ? 'text-green-600' : ''}
                            ${pkg.statusType === 'warning' ? 'text-orange-500' : ''}
                            ${pkg.statusType === 'info' ? 'text-blue-500' : ''}
                          `}>
                            {pkg.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 pr-2">
                        <div className="flex justify-end items-center gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                          {pkg.showConsolidate && (
                            <button 
                              onClick={() => toast.info(`Consolidation initiated for ${pkg.id}`)}
                              className="bg-[#005f33] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#004d2a] shadow-sm transition active:scale-95"
                            >
                              Consolidate
                            </button>
                          )}
                          <button 
                            onClick={() => toast('Showing details', { description: `Package ID: ${pkg.id}` })}
                            className="bg-[#F3F4F6] text-gray-600 px-5 py-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition active:scale-95"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p>No packages found.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
            <div className="text-xs text-gray-400">
              Showing {currentData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredPackages.length)} of {filteredPackages.length} entries
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 transition ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft size={16} strokeWidth={2.5} /> Previous
              </button>
              
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`flex items-center gap-2 transition ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#005f33] hover:text-[#004d2a]'}`}
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