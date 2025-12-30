import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import {
  Bell,
  Search,
  Clock,
  Check, 
  RefreshCw,
  ArrowRight,
  XCircle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
type TransferStatus = 'Delivered' | 'Delayed' | 'In Transit' | 'Processing';

interface Transfer {
  id: string;
  recipient: string;
  amount: string;
  status: TransferStatus;
  date: string;
  fee: string;
}

const Remittances = () => {
  // --- State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TransferStatus | null>(null);
  const itemsPerPage = 5;

  // --- Mock Data ---
  const transfers: Transfer[] = [
    { id: 'TRX-001', recipient: 'John Smith', amount: '$500', status: 'Delivered', date: '7/5/2024', fee: '$4.99' },
    { id: 'TRX-002', recipient: 'John Smith', amount: '$500', status: 'Delayed', date: '7/5/2024', fee: '$4.99' },
    { id: 'TRX-003', recipient: 'John Smith', amount: '$500', status: 'In Transit', date: '7/6/2024', fee: '$4.99' },
    { id: 'TRX-004', recipient: 'John Smith', amount: '$500', status: 'In Transit', date: '7/6/2024', fee: '$4.99' },
    { id: 'TRX-005', recipient: 'John Smith', amount: '$500', status: 'Delivered', date: '7/4/2024', fee: '$4.99' },
    { id: 'TRX-006', recipient: 'Michael Scott', amount: '$100', status: 'Delayed', date: '7/3/2024', fee: '$2.99' },
    { id: 'TRX-007', recipient: 'Jim Halpert', amount: '$250', status: 'Delivered', date: '7/2/2024', fee: '$3.50' },
  ];

  // --- Logic: Filtering ---
  const filteredTransfers = useMemo(() => {
    if (!statusFilter) return transfers;
    if (statusFilter === 'Processing') {
      return transfers.filter(t => t.status === 'Processing' || t.status === 'In Transit'); 
    }
    return transfers.filter(t => t.status === statusFilter);
  }, [transfers, statusFilter]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const currentData = filteredTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Handlers ---
  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleFilterClick = (status: TransferStatus) => {
    if (statusFilter === status) {
      setStatusFilter(null);
    } else {
      setStatusFilter(status);
      setCurrentPage(1);
    }
  };

  // Helper for Status Styles
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { color: 'text-[#22C55E]', icon: <Check size={14} strokeWidth={3} /> }; 
      case 'Delayed':
        return { color: 'text-[#F59E0B]', icon: <Info size={14} strokeWidth={2.5} /> }; 
      case 'In Transit':
      case 'Processing':
        return { color: 'text-[#3B82F6]', icon: <RefreshCw size={14} strokeWidth={2.5} /> }; 
      default:
        return { color: 'text-gray-500', icon: <Search size={14} /> };
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20 relative">
      <Helmet>
        <title>Remittances | EXPRESUR</title>
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Remittances</h1>
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
            <h1 className="text-2xl font-bold text-gray-900">Remittances</h1>
            <p className="text-gray-500 text-sm">Track your packages</p>
        </div>

        {/* --- Status Cards (UPDATED: Side-by-Side on Mobile) --- */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-medium text-gray-600">Transfer Status</h3>
            {statusFilter && (
              <button onClick={() => setStatusFilter(null)} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                <XCircle size={14} /> Clear
              </button>
            )}
          </div>

          {/* FIX: grid-cols-3 used for mobile to show side-by-side */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            
            {/* Processing Card */}
            <div onClick={() => handleFilterClick('Processing')} className={`bg-[#F9FAFB] p-3 md:p-5 rounded-[16px] md:rounded-[20px] cursor-pointer border-2 transition flex flex-col justify-between h-32 md:h-40 ${statusFilter === 'Processing' ? 'border-gray-300' : 'border-transparent'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-600 font-medium text-[11px] md:text-[15px]">Processing</span>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF]">
                  <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
              <p className="text-[10px] md:text-[13px] text-gray-400 leading-snug">Your transfer is in progress.</p>
            </div>

            {/* Delayed Card */}
            <div onClick={() => handleFilterClick('Delayed')} className={`bg-[#F9FAFB] p-3 md:p-5 rounded-[16px] md:rounded-[20px] cursor-pointer border-2 transition flex flex-col justify-between h-32 md:h-40 ${statusFilter === 'Delayed' ? 'border-gray-300' : 'border-transparent'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-600 font-medium text-[11px] md:text-[15px]">Delayed</span>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF]">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
              <p className="text-[10px] md:text-[13px] text-gray-400 leading-snug">Transfer delayed. Please wait.</p>
            </div>

            {/* Delivered Card */}
            <div onClick={() => handleFilterClick('Delivered')} className={`bg-[#F9FAFB] p-3 md:p-5 rounded-[16px] md:rounded-[20px] cursor-pointer border-2 transition flex flex-col justify-between h-32 md:h-40 ${statusFilter === 'Delivered' ? 'border-gray-300' : 'border-transparent'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-600 font-medium text-[11px] md:text-[15px]">Delivered</span>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF]">
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
              <p className="text-[10px] md:text-[13px] text-gray-400 leading-snug">Money delivered.</p>
            </div>

          </div>
        </div>

        {/* --- Transfer History --- */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-6">Transfer History</h3>

          {/* DESKTOP Table View */}
          <div className="hidden md:block overflow-x-auto rounded-[18px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] text-sm text-gray-400 font-medium">
                  <th className="py-4 pl-6 font-medium">Recipient</th>
                  <th className="py-4 font-medium">Amount</th>
                  <th className="py-4 font-medium">Status</th>
                  <th className="py-4 font-medium text-right pr-6">Fee</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentData.length > 0 ? (
                  currentData.map((item, idx) => {
                    const style = getStatusConfig(item.status);
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                        <td className="py-6 pl-6 text-gray-500 font-normal">{item.recipient}</td>
                        <td className="py-6 text-gray-500 font-normal">{item.amount}</td>
                        <td className="py-6">
                          <div className={`flex items-center gap-1.5 font-medium ${style.color}`}>
                            {style.icon}
                            <span className="text-[15px]">{item.status}</span>
                          </div>
                        </td>
                        <td className="py-6 text-gray-500 text-right pr-6 font-normal">{item.fee}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan={4} className="py-12 text-center text-gray-400">No transfers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE List View */}
          <div className="md:hidden space-y-0">
             {/* Header Row */}
             <div className="flex bg-[#F9FAFB] p-3 rounded-t-xl text-[12px] font-medium text-gray-400 mb-1">
                <div className="w-[35%] pl-1">Recipient</div>
                <div className="w-[20%]">Amount</div>
                <div className="w-[30%]">Status</div>
                <div className="w-[15%] text-right pr-1">Fee</div>
             </div>

             {/* Rows */}
             {currentData.map((item, idx) => {
                 const style = getStatusConfig(item.status);
                 return (
                     <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none">
                         <div className="w-[35%] text-[13px] text-gray-600 font-normal">{item.recipient}</div>
                         <div className="w-[20%] text-[13px] text-gray-600 font-normal">{item.amount}</div>
                         <div className={`w-[30%] flex items-center gap-1 text-[11px] font-medium ${style.color}`}>
                             {style.icon} {item.status}
                         </div>
                         <div className="w-[15%] text-[13px] text-gray-500 text-right font-normal">{item.fee}</div>
                     </div>
                 )
             })}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-4 mt-8 md:mt-12 text-sm font-medium">
            <button
              onClick={() => handlePageChange('prev')}
              className={`transition ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange('next')}
              className={`flex items-center gap-1 transition ${currentPage >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-[#005f33] hover:text-[#004d2a]'}`}
              disabled={currentPage >= totalPages}
            >
              Next <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Remittances;