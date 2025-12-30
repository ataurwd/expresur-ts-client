import React from 'react';
import { ArrowRight, X, Box, Check } from 'lucide-react';

const ReadyForConsolidation: React.FC = () => {
  const tableData = [
    { id: 'BG123456', packages: '5', weight: '25 kg', time: '5 min ago', selected: true },
    { id: 'BG123456', packages: '4', weight: '35.6 kg', time: '5 min ago', selected: true },
    { id: 'BG123456', packages: '3', weight: '10 kg', time: '5 min ago', selected: true },
    { id: 'BG123456', packages: '6', weight: '12.8 kg', time: '5 min ago', selected: true },
    { id: 'PKG123456', packages: '6', weight: '12.8 kg', time: '5 min ago', selected: false },
    { id: 'PKG123456', packages: '2', weight: '42.5 kg', time: '5 min ago', selected: false },
  ];

  return (
    <div className="w-full bg-[#f6f6f6] min-h-screen font-sans pb-10">
      {/* Aligned Container: px-6 matches your WarehouseDashboard exactly */}
      <div className="px-6 py-8">
        
        {/* Page Title Section */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#333] tracking-tight">
            Ready for Consolidation
          </h1>
          <p className="text-gray-400 text-[15px] mt-1">
            Prepare and select packages to initialize the consolidation process
          </p>
        </div>

        {/* TWO COLUMN LAYOUT: matches Frame 2147226396.png logic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: Package Selection Table */}
          <div className="lg:col-span-2 bg-white rounded-[15px] shadow-sm border border-gray-100/50 overflow-hidden">
            <div className="p-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-gray-400 text-[13px] font-normal border-b border-gray-50">
                    <th className="w-12 pb-4 text-center"></th>
                    <th className="pb-4 text-left font-normal">Package ID</th>
                    <th className="pb-4 text-left font-normal">Packages</th>
                    <th className="pb-4 text-left font-normal">Weight</th>
                    <th className="pb-4 text-left font-normal">Last update</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 1 ? 'bg-[#f9f9f9]' : 'bg-white'} transition-colors`}
                    >
                      <td className="py-6 text-center">
                        <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center border transition-all ${
                          item.selected ? 'bg-[#005e2b] border-[#005e2b]' : 'bg-white border-gray-300'
                        }`}>
                          {item.selected && <Check size={12} className="text-white" />}
                        </div>
                      </td>
                      <td className="py-6 text-gray-600 text-[14px] font-medium">{item.id}</td>
                      <td className="py-6 text-gray-500 text-[14px]">{item.packages}</td>
                      <td className="py-6 text-gray-600 text-[14px] font-semibold">{item.weight}</td>
                      <td className="py-6 text-gray-400 text-[14px]">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination matching design */}
              <div className="flex items-center justify-end mt-8 gap-8">
                <button className="text-gray-300 text-[14px] hover:text-gray-500 transition-colors">Previous</button>
                <button className="flex items-center gap-2 text-[#005e2b] text-[14px] font-bold hover:opacity-80 transition-opacity">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Consolidation Summary & Quick Stats */}
          <div className="space-y-6">
            
            {/* Consolidation Panel */}
            <div className="bg-white rounded-[15px] p-6 shadow-sm border border-gray-100/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#f9f9f9] p-2 rounded-full border border-gray-50">
                   <Box size={18} className="text-gray-400" />
                </div>
                <h3 className="text-gray-600 font-bold text-lg">Consolidation</h3>
              </div>

              <div className="flex justify-between text-sm font-bold text-gray-400 mb-4 px-1">
                <span>Selected - 4 Bags</span>
                <span className="text-gray-600">45 Kg</span>
              </div>

              {/* Items List inside card */}
              <div className="space-y-2 mb-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#f9f9f9] p-3 rounded-xl border border-gray-50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Box size={14} className="text-gray-300 flex-shrink-0" />
                      <span className="text-[12px] text-gray-400 font-medium truncate">BAG-EXPRESS-2024-0456</span>
                    </div>
                    <X size={14} className="text-red-400 cursor-pointer hover:text-red-600 flex-shrink-0" />
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#005e2b] text-white py-3.5 rounded-lg font-bold text-[13px] uppercase tracking-widest hover:bg-[#004d23] transition-all">
                Mark as Consolidated
              </button>
            </div>

            {/* Quick Stats Panel */}
            <div className="bg-white rounded-[15px] p-6 shadow-sm border border-gray-100/50">
              <h3 className="text-gray-600 font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#f9f9f9] p-4 rounded-xl">
                  <span className="text-gray-400 text-sm font-medium">Total Packages</span>
                  <span className="text-gray-600 font-bold text-xl">40</span>
                </div>
                <div className="flex justify-between items-center bg-[#f9f9f9] p-4 rounded-xl">
                  <span className="text-gray-400 text-sm font-medium">Total Weight</span>
                  <span className="text-gray-600 font-bold text-xl">112,5 Kg</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyForConsolidation;