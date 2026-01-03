import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';

const Inwarehousepackages: React.FC = () => {
  // State to manage which package is being viewed in the popup
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const packageData = [
    { id: 'PKG123456', client: 'Juan Perez', status: 'Delivered', color: 'text-green-500', time: '5 min ago' },
    { id: 'PKG123456', client: 'Juan Perez', status: 'Pending', color: 'text-orange-400', time: '25 min ago' },
    { id: 'PKG123456', client: 'Juan Perez', status: 'In Transit', color: 'text-blue-500', time: '40 min ago' },
    { id: 'PKG123456', client: 'Juan Perez', status: 'In Transit', color: 'text-blue-500', time: '40 min ago' },
    { id: 'PKG123456', client: 'Juan Perez', status: 'Assigned', color: 'text-purple-500', time: '12 min ago' },
  ];

  return (
    <div className="relative w-full bg-[#f6f6f6] min-h-screen font-sans">
      <Helmet>
        <title>In-Warehouse Packages — Warehouse</title>
      </Helmet>
      <div className="px-6 py-10">
        
        {/* Page Title Section */}
        <div className="mb-10 bg-transparent">
          <h1 className="text-[32px] font-bold text-[#333] tracking-tight">
            In-Warehouse Packages
          </h1>
          <p className="text-gray-400 text-[16px] mt-1">
            Monitor all packages currently inside the warehouse
          </p>
        </div>

        {/* MAIN WHITE CARD */}
        <div className="bg-white rounded-[15px] shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="p-10">
            
            {/* Filter Row */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-10 bg-[#f1f1f1] px-4 py-2 rounded-lg cursor-pointer">
                <span className="text-gray-400 text-[14px]">Client</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>

              <div className="flex items-center gap-10 bg-[#f1f1f1] px-4 py-2 rounded-lg cursor-pointer">
                <span className="text-gray-400 text-[14px]">All Status</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>

              <div className="flex items-center gap-4 bg-[#f1f1f1] px-4 py-2 rounded-lg cursor-pointer">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-gray-400 text-[14px]">12/07/2024</span>
                <span className="text-gray-400">-</span>
                <span className="text-gray-400 text-[14px]">10/05/2025</span>
                <Calendar size={14} className="text-gray-400" />
              </div>

              <button className="ml-auto bg-[#005e2b] text-white px-10 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#004d23] transition-all">
                Filter
              </button>
            </div>

            {/* Table Section */}
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-gray-400 text-[14px] font-normal">
                    <th className="pb-6 font-normal text-left px-4">Package ID</th>
                    <th className="pb-6 font-normal text-left px-4">Client</th>
                    <th className="pb-6 font-normal text-left px-4">Status</th>
                    <th className="pb-6 font-normal text-left px-4">Last update</th>
                    <th className="pb-6 font-normal text-right px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packageData.map((pkg, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} transition-colors`}
                    >
                      <td className="py-6 px-4 text-gray-500 text-[14px]">{pkg.id}</td>
                      <td className="py-6 px-4 text-gray-500 text-[14px]">{pkg.client}</td>
                      <td className={`py-6 px-4 text-[14px] font-medium ${pkg.color}`}>
                        {pkg.status}
                      </td>
                      <td className="py-6 px-4 text-gray-400 text-[14px]">{pkg.time}</td>
                      <td className="py-6 px-4 text-right">
                        <button 
                          onClick={() => setSelectedPackage(pkg)}
                          className="bg-[#f5f5f5] text-gray-400 px-6 py-1.5 rounded-full text-[13px] font-medium hover:bg-gray-200 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-end mt-12 gap-8 px-4">
              <button className="text-gray-400 text-[14px] hover:text-gray-600 transition-colors">
                Previous
              </button>
              <button className="flex items-center gap-2 text-[#005e2b] text-[14px] font-bold hover:opacity-80 transition-opacity">
                Next
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL - Matches Reference Image Exactly */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-[600px] rounded-[24px] p-8 shadow-xl">
            {/* Modal Heading */}
            <h2 className="text-[28px] font-bold text-[#777] mb-6">Package Details</h2>
            
            {/* Inner Gray Container */}
            <div className="bg-[#f8f8f8] rounded-[18px] p-8 grid grid-cols-2 gap-y-10">
              {/* Customer Column */}
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Customer</p>
                <p className="text-[#666] font-medium text-[16px]">{selectedPackage.client}</p>
              </div>
              {/* Package ID Column */}
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Package ID</p>
                <p className="text-[#666] font-medium text-[16px]">{selectedPackage.id}</p>
              </div>
              {/* Last Update Column */}
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Last Update</p>
                <p className="text-[#666] font-medium text-[16px]">{selectedPackage.time}</p>
              </div>
              {/* Status Column */}
              <div>
                <p className="text-gray-400 text-[14px] mb-2">Status</p>
                <div className="inline-flex items-center bg-[#dcfce7] text-[#22c55e] px-4 py-1.5 rounded-full text-[14px] font-medium">
                  {selectedPackage.status}
                </div>
              </div>
            </div>

            {/* Cancel Button Footer */}
            <div className="flex justify-end mt-10">
              <button 
                onClick={() => setSelectedPackage(null)}
                className="text-gray-400 font-medium text-[18px] hover:text-gray-600 transition-colors px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inwarehousepackages;