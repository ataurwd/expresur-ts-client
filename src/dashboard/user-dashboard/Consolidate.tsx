import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import {
  Bell,
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface PackageData {
  id: string;
  packageId: string;
  from: string;
  to: string;
  receivedDate: string;
  weight: number;
  isSelected: boolean;
}

const Consolidate = () => {
  // --- State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Mock Data ---
  const [packages, setPackages] = useState<PackageData[]>([
    {
      id: '1',
      packageId: 'ORD-1001',
      from: 'Shanghai, China',
      to: 'Sydney, Australia',
      receivedDate: 'Dec 15, 2024',
      weight: 2.5,
      isSelected: false
    },
    {
      id: '2',
      packageId: 'ORD-1001',
      from: 'Shanghai, China',
      to: 'Sydney, Australia',
      receivedDate: 'Dec 15, 2024',
      weight: 10,
      isSelected: false
    },
    {
      id: '3',
      packageId: 'ORD-1001',
      from: 'Shanghai, China',
      to: 'Sydney, Australia',
      receivedDate: 'Dec 15, 2024',
      weight: 5,
      isSelected: false
    },
  ]);

  // --- Logic ---
  const toggleSelection = (id: string) => {
    setPackages(prevPackages =>
      prevPackages.map(pkg =>
        pkg.id === id ? { ...pkg, isSelected: !pkg.isSelected } : pkg
      )
    );
  };

  const summary = useMemo(() => {
    const selected = packages.filter(p => p.isSelected);
    const totalWeight = selected.reduce((sum, p) => sum + p.weight, 0);
    return {
      count: selected.length,
      weight: totalWeight
    };
  }, [packages]);

  const handleCreateShipment = () => {
    if (summary.count === 0) {
      toast.error('Please select at least one package');
      return;
    }
    toast.success('Shipment created successfully!', {
      description: `${summary.count} packages consolidated (${summary.weight} kg)`
    });
  };

  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const currentData = packages.slice(
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
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20 relative">
      <Helmet>
        <title>Consolidation | EXPRESUR</title>
      </Helmet>

      {/* --- MOBILE HEADER (Matches other pages) --- */}
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Consolidation</h1>
            <p className="text-gray-500 mt-2 text-sm">Manage consolidations</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Consolidation</h1>
            <p className="text-gray-500 text-sm">Manage consolidations</p>
        </div>

        {/* --- Consolidation Request Section --- */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
          
          <h3 className="text-xl font-medium text-gray-700 mb-1">Request Consolidation</h3>
          <p className="text-gray-400 text-sm mb-6 md:mb-8">Select packages to consolidate into a single shipment</p>

          {/* Package List */}
          <div className="space-y-4">
            {currentData.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => toggleSelection(pkg.id)}
                className={`relative p-5 md:p-6 rounded-[20px] transition-all cursor-pointer border ${
                  pkg.isSelected ? 'bg-gray-50 border-gray-200' : 'bg-[#F9FAFB] border-transparent hover:border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className={`mt-1 w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                    pkg.isSelected ? 'bg-[#005f33] border-[#005f33]' : 'border-gray-300 bg-white'
                  }`}>
                    {pkg.isSelected && <Check size={16} className="text-white" strokeWidth={3} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-lg font-medium text-gray-700">{pkg.packageId}</h4>
                       <span className="text-base font-medium text-gray-600">{pkg.weight} kg</span>
                    </div>
                    
                    <div className="text-sm text-gray-400 space-y-1">
                      <p><span className="font-medium text-gray-500">From:</span> {pkg.from}</p>
                      <p><span className="font-medium text-gray-500">To:</span> {pkg.to}</p>
                      <p><span className="font-medium text-gray-500">Received:</span> {pkg.receivedDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-6 mt-8 md:mt-10">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`text-sm transition ${currentPage === 1 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`text-sm flex items-center gap-2 transition font-medium ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300' : 'text-[#005f33]'}`}
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* --- Summary Footer Card --- */}
        {/* Only show if items are selected (Optional UX choice, currently always showing per request structure) */}
        <div className="bg-[#F9FAFB] rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[#005f33] font-medium text-sm md:text-lg mb-2">Selected Packages</p>
              <p className="text-3xl md:text-5xl font-semibold text-[#005f33]">
                {summary.count}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#005f33] font-medium text-sm md:text-lg mb-2">Total Weight</p>
              <p className="text-3xl md:text-5xl font-semibold text-[#005f33]">
                {summary.weight} <span className="text-xl md:text-3xl">kg</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleCreateShipment}
            className="w-full bg-[#005f33] hover:bg-[#004d2a] text-white py-3.5 rounded-xl font-medium text-base transition-all active:scale-[0.98] shadow-sm"
          >
            Create shipment
          </button>
        </div>

      </div>
    </div>
  );
};

export default Consolidate;