import React from 'react';
import { QrCode, CheckCircle2, Info, Search } from 'lucide-react';

// 1. Define an Interface for the History Item props
interface HistoryItemProps {
  id: string;
  user: string;
  locker: string;
  time: string;
  type: 'success' | 'info'; // Restricts type to only these two strings
}

const Intake: React.FC = () => {
  return (
    <div className="w-full">
      {/* Page Title Section */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#111] tracking-tight">
          Intake/Receiving
        </h1>
        <p className="text-gray-400 text-[15px] mt-1">
          Scan incoming packages to log them into the system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Scan Package (Receiving.png Design) */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100/50">
          <h3 className="text-gray-500 font-semibold text-sm mb-4 uppercase tracking-wider">
            Scan Package
          </h3>
          
          <div className="w-full h-52 border-[1px] border-dashed border-red-200 rounded-xl flex items-center justify-center bg-[#fafafa] mb-6">
            <QrCode size={40} className="text-gray-300 opacity-60" />
          </div>

          <div className="bg-[#f2faf3] border border-[#e1f0e4] rounded-xl p-5 mb-6">
            <div className="flex items-center space-x-2 text-[#2d7a43] mb-5">
              <CheckCircle2 size={18} />
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

          <button className="w-full bg-[#045d2d] text-white font-bold py-3.5 rounded-lg hover:bg-[#034d25] transition-all uppercase text-[13px] tracking-widest shadow-md">
            Receive
          </button>
        </div>

        {/* Right Side: History Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100/50">
          <h3 className="text-gray-500 font-semibold text-sm mb-4 uppercase tracking-wider">
            History
          </h3>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Enter package..." 
              className="w-full bg-[#f4f4f4] border-none rounded-lg py-3 pl-11 pr-4 text-[14px] outline-none"
            />
          </div>

          <div className="space-y-4">
            <HistoryItem 
              id="PKG-2024-987654" 
              user="Juan Prez" 
              locker="LCK-127A" 
              time="10 mins ago" 
              type="success" 
            />
            <HistoryItem 
              id="PKG-2024-987654" 
              user="Juan Prez" 
              locker="LCK-127A" 
              time="10 mins ago" 
              type="info" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Updated Reusable Component with TypeScript Types
const HistoryItem: React.FC<HistoryItemProps> = ({ id, user, locker, time, type }) => {
  const isSuccess = type === 'success';
  return (
    <div className="bg-[#f9f9f9] rounded-xl p-5 flex items-start space-x-4 border border-transparent hover:border-gray-200 transition-colors">
      <div className={`mt-0.5 ${isSuccess ? 'text-[#34a853]' : 'text-[#f18a21]'}`}>
        {isSuccess ? <CheckCircle2 size={22} /> : <Info size={22} />}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-[#555] text-[15px]">{id}</h4>
        <div className="text-[12px] text-gray-400 mt-1 leading-relaxed">
          Assigned to <span className="font-bold text-gray-600">{user}</span><br />
          To Locker <span className="font-bold text-gray-600">{locker}</span>
        </div>
        <p className="text-[11px] text-gray-300 mt-3 font-medium">{time}</p>
      </div>
    </div>
  );
};

export default Intake;