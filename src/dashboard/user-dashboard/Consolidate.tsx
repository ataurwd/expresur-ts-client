import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
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
      weight: 10,
      isSelected: false 
    },
    { 
      id: '2',
      packageId: 'ORD-1001', 
      from: 'Shanghai, China',
      to: 'Sydney, Australia',
      receivedDate: 'Dec 15, 2024',
      weight: 5,
      isSelected: true 
    },
    { 
      id: '3',
      packageId: 'ORD-1002',
      from: 'Beijing, China',
      to: 'Dhaka, BD',
      receivedDate: 'Dec 16, 2024',
      weight: 2.5,
      isSelected: false
    },
    { 
      id: '4',
      packageId: 'ORD-1003',
      from: 'London, UK',
      to: 'NY, USA',
      receivedDate: 'Dec 17, 2024',
      weight: 1.5,
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

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative pb-40">
      <Toaster position="top-center" richColors closeButton />

      {/* --- Header --- */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Consolidation</h1>
          <p className="text-gray-500 mt-2 text-sm">Manage consolidations</p>
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
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover"/>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
              <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto space-y-6">
        
        {/* --- Main Section --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px] relative">
          <h3 className="text-xl font-bold text-gray-800">Request Consolidation</h3>
          <p className="text-gray-500 mt-2 mb-8 text-sm">Select packages to consolidate into a single shipment</p>

          {/* --- Package List --- */}
          <div className="space-y-4">
            {currentData.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`flex justify-between items-start p-5 rounded-xl border transition-all cursor-pointer ${
                  pkg.isSelected ? 'bg-gray-50 border-gray-200' : 'bg-[#F9FAFB] border-transparent hover:border-gray-200'
                }`}
                onClick={() => toggleSelection(pkg.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className={`mt-1 w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
                    pkg.isSelected ? 'bg-[#005f33] border-[#005f33]' : 'border-gray-300 bg-transparent'
                  }`}>
                    {pkg.isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  
                  {/* Details (Font sizes adjusted to text-sm) */}
                  <div>
                    <h4 className="text-base font-bold text-gray-700 mb-2">{pkg.packageId}</h4>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p><span className="font-medium text-gray-600">From:</span> {pkg.from}</p>
                      <p><span className="font-medium text-gray-600">To:</span> {pkg.to}</p>
                      <p><span className="font-medium text-gray-600">Received:</span> {pkg.receivedDate}</p>
                    </div>
                  </div>
                </div>
                
                {/* Weight (Font size adjusted) */}
                <div className="text-sm font-bold text-gray-800 mt-1">
                  {pkg.weight} kg
                </div>
              </div>
            ))}
          </div>

          {/* --- Pagination --- */}
          <div className="flex justify-end items-center gap-6 mt-10 text-sm font-medium select-none mb-4">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`transition ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`flex items-center gap-1 transition ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#005f33] hover:text-[#004d2a]'}`}
            >
              Next <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>

        </div>

        {/* --- Summary Footer Section --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <div className="flex justify-between items-end mb-6">
              {/* Left Side: Count */}
              <div>
                <p className="text-[#005f33] font-bold text-sm mb-1">Selected Packages</p>
                {/* Adjusted number size to 3xl */}
                <p className="text-3xl font-bold text-gray-900">{summary.count}</p>
              </div>

              {/* Right Side: Weight */}
              <div className="text-right">
                <p className="text-[#005f33] font-bold text-sm mb-1">Total Weight</p>
                {/* Adjusted number size to 3xl */}
                <p className="text-3xl font-bold text-[#005f33]">{summary.weight} <span className="text-xl">kg</span></p>
              </div>
           </div>

           {/* Full Width Button */}
           <button 
              onClick={handleCreateShipment}
              className="w-full bg-[#005f33] hover:bg-[#004d2a] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.99]"
           >
              Create shipment
           </button>
        </div>

      </div>
    </div>
  );
};

export default Consolidate;