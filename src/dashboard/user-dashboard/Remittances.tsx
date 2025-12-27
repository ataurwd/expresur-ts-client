import React, { useState, useMemo } from 'react';
import { toast } from 'sonner'; // Toaster removed to avoid duplicates
import {
  Bell,
  Search,
  Clock,
  CheckCircle,
  RefreshCw,
  ArrowRight,
  XCircle,
  CheckSquare,
  RotateCw
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
  const [showPageIndicator, setShowPageIndicator] = useState(true);
  const itemsPerPage = 5;

  // --- Mock Data ---
  const transfers: Transfer[] = [
    { id: 'TRX-001', recipient: 'John Smith', amount: '$500', status: 'Delivered', date: '7/5/2024', fee: '$4.99' },
    { id: 'TRX-002', recipient: 'Maria Garcia', amount: '$1200', status: 'Delayed', date: '7/5/2024', fee: '$8.50' },
    { id: 'TRX-003', recipient: 'Robert Doe', amount: '$300', status: 'Processing', date: '7/6/2024', fee: '$3.99' },
    { id: 'TRX-004', recipient: 'Sarah Connor', amount: '$450', status: 'In Transit', date: '7/6/2024', fee: '$4.99' },
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
      setShowPageIndicator(false);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setShowPageIndicator(false);
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

  // Helper for Status Styles in Table
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { color: 'text-green-500', icon: <CheckCircle size={16} /> };
      case 'Delayed':
        return { color: 'text-orange-400', icon: <Clock size={16} /> };
      case 'In Transit':
      case 'Processing':
        return { color: 'text-gray-500', icon: <RefreshCw size={16} /> };
      default:
        return { color: 'text-gray-500', icon: <Search size={16} /> };
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative pb-20">

      {/* NOTE: <Toaster /> removed to use the global one in App/Layout */}

      {/* --- Header --- */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Remittances</h1>
          <p className="text-gray-500 mt-2 text-sm">Track your packages</p>
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
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
              <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto space-y-8">



        <div className="p-4 bg-white rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-600">Transfer Status</h3>
            {statusFilter && (
              <button
                onClick={() => setStatusFilter(null)}
                className="text-sm text-red-500 flex items-center gap-1 hover:underline"
              >
                <XCircle size={14} /> Clear Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Card 1: Processing */}
            <div
              onClick={() => handleFilterClick('Processing')}
              className={`p-8 rounded-[2rem] h-44 flex flex-col justify-between cursor-pointer transition-all active:scale-[0.98] bg-[#f7f7f7] border-2 ${statusFilter === 'Processing' ? 'border-gray-300' : 'border-transparent'
                }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl font-semibold text-gray-500">Processing</span>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <RotateCw size={20} />
                </div>
              </div>
              <p className="text-base text-gray-400">Your transfer is in progress.</p>
            </div>

            {/* Card 2: Delayed */}
            <div
              onClick={() => handleFilterClick('Delayed')}
              className={`p-8 rounded-[2rem] h-44 flex flex-col justify-between cursor-pointer transition-all active:scale-[0.98] bg-[#f7f7f7] border-2 ${statusFilter === 'Delayed' ? 'border-gray-300' : 'border-transparent'
                }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl font-semibold text-gray-500">Delayed</span>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <Clock size={20} />
                </div>
              </div>
              <p className="text-base text-gray-400">Transfer delayed. Please wait.</p>
            </div>

            {/* Card 3: Delivered */}
            <div
              onClick={() => handleFilterClick('Delivered')}
              className={`p-8 rounded-[2rem] h-44 flex flex-col justify-between cursor-pointer transition-all active:scale-[0.98] bg-[#f7f7f7] border-2 ${statusFilter === 'Delivered' ? 'border-gray-300' : 'border-transparent'
                }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl font-semibold text-gray-500">Delivered</span>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <CheckSquare size={20} />
                </div>
              </div>
              <p className="text-base text-gray-400">Money delivered.</p>
            </div>

          </div>
        </div>

        {/* --- Transfer History Table --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-medium text-gray-700">Transfer History</h3>
            <span className="text-xs text-gray-400">Showing {currentData.length} of {filteredTransfers.length}</span>
          </div>

          <div className="overflow-x-auto rounded-[18px] overflow-hidden">
            <table className="w-full text-left border-collapse ">
              <thead>
                <tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wider font-medium bg-[#f6f6f6] rounded-[18px]">
                  <th className="py-4 pl-2 font-medium">Recipient</th>
                  <th className="py-4 font-medium">Amount</th>
                  <th className="py-4 font-medium">Status</th>
                  <th className="py-4 font-medium">Date</th>
                  <th className="py-4 font-medium text-right pr-2">Fee</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentData.length > 0 ? (
                  currentData.map((item, idx) => {
                    const style = getStatusConfig(item.status);
                    return (
                      <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition cursor-pointer" onClick={() => toast.info(`Viewing details for ${item.id}`)}>
                        <td className="py-6 pl-2 text-gray-500 font-medium">{item.recipient}</td>
                        <td className="py-6 text-gray-500">{item.amount}</td>
                        <td className="py-6">
                          <div className={`flex items-center gap-2 font-medium ${style.color}`}>
                            {style.icon}
                            <span>{item.status}</span>
                          </div>
                        </td>
                        <td className="py-6 text-gray-500">{item.date}</td>
                        <td className="py-6 text-gray-500 text-right pr-2">{item.fee}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      No transfers found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-6 mt-12 text-sm font-medium select-none">
            <button
              onClick={() => handlePageChange('prev')}
              className={`transition ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {showPageIndicator && (
              <span className="text-xs text-gray-400">Page {currentPage} of {totalPages || 1}</span>
            )}
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