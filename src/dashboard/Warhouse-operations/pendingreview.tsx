import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, AlertCircle, Clock, XCircle, RotateCcw, UserMinus } from 'lucide-react';

const PendingReview: React.FC = () => {
  // State for handling the popup
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const reviewData = [
    { id: 'PKG123456', status: 'Unassign', issue: 'Unassign Client', date: 'April 12, 2025', time: '5 min ago', color: 'text-[#9b1c1c]', icon: <RotateCcw size={14} /> },
    { id: 'PKG123456', status: 'Scan Mismatch', issue: 'Scanning discrepancies', date: 'April 12, 2025', time: '5 min ago', color: 'text-[#c27803]', icon: <AlertCircle size={14} /> },
    { id: 'PKG123456', status: 'Delay', issue: 'Abnormal delays', date: 'April 12, 2025', time: '5 min ago', color: 'text-[#c27803]', icon: <Clock size={14} /> },
    { id: 'PKG123456', status: 'Error', issue: 'System Error', date: 'April 12, 2025', time: '5 min ago', color: 'text-[#9b1c1c]', icon: <XCircle size={14} /> },
    { id: 'PKG123456', status: 'Delay', issue: 'Abnormal delays', date: 'April 12, 2025', time: '5 min ago', color: 'text-[#c27803]', icon: <Clock size={14} /> },
  ];

  return (
    <div className="relative w-full bg-[#f6f6f6] min-h-screen font-sans pb-10">
      <Helmet>
        <title>Pending Review — Warehouse</title>
      </Helmet>
      
      <div className="px-6 py-8">
        {/* Page Title Section */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#333] tracking-tight">
            Pending Review
          </h1>
          <p className="text-gray-400 text-[15px] mt-1">
            Resolve packages that require special attention
          </p>
        </div>

        {/* Main White Card Container */}
        <div className="bg-white rounded-[15px] shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="p-8">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 bg-[#fff8e6] text-[#c27803] px-4 py-2 rounded-lg border border-[#fef0c7] text-[14px] font-medium">
                <AlertCircle size={16} /> Scan Mismatch
              </button>
              <button className="flex items-center gap-2 bg-[#fdf2f2] text-[#9b1c1c] px-4 py-2 rounded-lg border border-[#fde2e2] text-[14px] font-medium">
                <RotateCcw size={16} /> Unassign
              </button>
              <button className="flex items-center gap-2 bg-[#fff8e6] text-[#c27803] px-4 py-2 rounded-lg border border-[#fef0c7] text-[14px] font-medium">
                <Clock size={16} /> Delay
              </button>
              <button className="flex items-center gap-2 bg-[#fdf2f2] text-[#9b1c1c] px-4 py-2 rounded-lg border border-[#fde2e2] text-[14px] font-medium">
                <XCircle size={16} /> Error
              </button>

              <button className="ml-auto bg-[#005e2b] text-white px-8 py-2 rounded-lg font-bold text-[14px] hover:bg-[#004d23] transition-all">
                Filter
              </button>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-x-auto shadow-sm rounded-lg border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-gray-400 text-[14px] font-normal border-b border-gray-50">
                    <th className="px-4 py-4 font-normal text-left">Package ID</th>
                    <th className="px-4 py-4 font-normal text-left">Status</th>
                    <th className="px-4 py-4 font-normal text-left">Issue Type</th>
                    <th className="px-4 py-4 font-normal text-left">Arrival Date</th>
                    <th className="px-4 py-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} transition-colors`}
                    >
                      <td className="px-4 py-6 text-gray-500 text-[14px]">{item.id}</td>
                      <td className={`px-4 py-6 text-[14px] font-medium ${item.color}`}>
                        <div className="flex items-center gap-2">
                          {item.icon}
                          {item.status}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-gray-500 text-[14px]">{item.issue}</td>
                      <td className="px-4 py-6 text-gray-400 text-[14px]">
                        {item.date} <span className="mx-1">-</span> {item.time}
                      </td>
                      <td className="px-4 py-6 text-right">
                        <button 
                          onClick={() => setSelectedItem(item)}
                          className="bg-[#f5f5f5] text-gray-400 px-6 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors"
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
            <div className="flex items-center justify-end mt-10 gap-8 px-4">
              <button className="text-gray-300 text-[14px] hover:text-gray-600 transition-colors">
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

      {/* POPUP MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-[600px] rounded-[24px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <h2 className="text-[28px] font-bold text-[#666] mb-6">Pending Review</h2>
            
            {/* Gray Content Card */}
            <div className="bg-[#f8f8f8] rounded-[20px] p-8 grid grid-cols-2 gap-y-10">
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Package ID</p>
                <p className="text-[#666] font-semibold text-[16px]">{selectedItem.id}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Issue Type</p>
                <p className="text-[#666] font-semibold text-[16px]">{selectedItem.issue}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Arrival Date</p>
                <p className="text-[#666] font-semibold text-[16px]">
                  {selectedItem.date} - <span className="text-gray-400 font-normal">{selectedItem.time}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-[14px] mb-1">Status</p>
                <div className={`flex items-center gap-2 font-semibold ${selectedItem.color}`}>
                  <UserMinus size={18} />
                  <span>{selectedItem.status}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 font-medium text-[17px] hover:text-gray-600 px-6 py-2 transition-colors"
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

export default PendingReview;