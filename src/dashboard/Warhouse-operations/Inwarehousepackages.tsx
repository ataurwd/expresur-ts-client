import React from 'react';

const Inwarehousepackages = () => {
    return (
        <div className="w-full bg-[#f6f6f6] min-h-screen p-4">
      <div className="">
      {/* Page Title Section */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#333] tracking-tight">
          In-Warehouse Packages
        </h1>
        <p className="text-gray-400 text-[15px] mt-1">
          Monitor all packages currently inside the warehouse
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Scan Package */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="text-gray-500 font-semibold text-sm mb-4 uppercase tracking-wider">
            Scan Package
          </h3>
          
          <div className="w-full h-52 border-[1px] border-dashed border-red-200 rounded-xl flex items-center justify-center bg-[#fafafa] mb-6">
           
          </div>

          <div className="bg-[#f2faf3] border border-[#e1f0e4] rounded-xl p-5 mb-6">
            <div className="flex items-center space-x-2 text-[#2d7a43] mb-5">
             
              <span className="text-[11px] font-black uppercase tracking-[0.1em]">Existing Package</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Client Name</span>
                <span className="font-bold text-[#444]">María González</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Locker ID</span>
                <span className="font-bold text-[#444]">LCK-127A</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-[#045d2d] text-white font-bold py-3.5 rounded-lg hover:bg-[#034d25] transition-all uppercase text-[13px] tracking-widest">
            Receive
          </button>
        </div>

        {/* Updated Right Side: History Section with design matching Frame 2147226101.png */}
        <div className="bg-[#f9f9f9] rounded-2xl p-6 border border-gray-100/50 shadow-sm h-full">
          <h3 className="text-[#6b6b6b] font-semibold text-lg mb-4">
            History
          </h3>
          
          {/* Search Input with soft gray fill */}
          <div className="relative mb-6">
            
            <input 
              type="text" 
              placeholder="Enter package..." 
              className="w-full bg-[#f1f1f1] border-none rounded-xl py-3 pl-12 pr-4 text-[14px] placeholder-[#a3a3a3] outline-none focus:ring-1 focus:ring-gray-200 transition-all"
            />
          </div>

          <div className="space-y-4">
            
          </div>
        </div>
      </div>
      </div>
    </div>
    );
};

export default Inwarehousepackages;