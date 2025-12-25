import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  X, 
  DollarSign,
  FileText,
  Download
} from 'lucide-react';

// --- TYPES ---
interface Transaction {
  id: string;
  date: string; // Format: MM/DD/YYYY
  customerName: string;
  customerEmail: string;
  type: 'Deposit' | 'Withdraw' | 'Refund' | 'Payment';
  amount: number;
  currency: 'USD' | 'EUR';
  balanceAfter: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// --- MOCK DATA ---
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-9907', date: '12/03/2024', customerName: 'Robert Johnson', customerEmail: 'rob@example.com', type: 'Withdraw', amount: 50.00, currency: 'EUR', balanceAfter: '450.00', status: 'Completed' },
  { id: 'TRX-9906', date: '12/02/2024', customerName: 'Jane Smith', customerEmail: 'jane@example.com', type: 'Deposit', amount: 1000.00, currency: 'USD', balanceAfter: '2000.00', status: 'Completed' },
  { id: 'TRX-9905', date: '12/01/2024', customerName: 'John Doe', customerEmail: 'john@example.com', type: 'Payment', amount: 120.00, currency: 'USD', balanceAfter: '1000.00', status: 'Pending' },
  { id: 'TRX-9904', date: '11/22/2024', customerName: 'Carlos Pérez', customerEmail: 'carlos@cuba.es', type: 'Refund', amount: 156.50, currency: 'EUR', balanceAfter: '313.00', status: 'Completed' },
  { id: 'TRX-9902', date: '11/21/2024', customerName: 'Carlos Pérez', customerEmail: 'carlos@cuba.es', type: 'Withdraw', amount: 156.50, currency: 'EUR', balanceAfter: '156.50', status: 'Completed' },
  { id: 'TRX-9903', date: '07/06/2024', customerName: 'María González', customerEmail: 'maria.g@example.com', type: 'Deposit', amount: 500.00, currency: 'USD', balanceAfter: '789.00', status: 'Completed' },
  { id: 'TRX-9901', date: '07/05/2024', customerName: 'María González', customerEmail: 'maria.g@example.com', type: 'Deposit', amount: 289.00, currency: 'USD', balanceAfter: '289.00', status: 'Completed' },
];

const AdminWallet = () => {
  // --- STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPeriod, setFilterPeriod] = useState('All Time'); // Default to All Time so you see data immediately
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Modal State
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FILTER LOGIC ---
  const filteredTransactions = useMemo(() => {
    // We mock "Current Date" as December 2024 for this demo
    const CURRENT_MONTH = 11; // December (0-indexed)
    const CURRENT_YEAR = 2024;

    if (filterPeriod === 'All Time') return INITIAL_TRANSACTIONS;

    return INITIAL_TRANSACTIONS.filter(t => {
      const tDate = new Date(t.date);
      const tMonth = tDate.getMonth();
      const tYear = tDate.getFullYear();

      if (filterPeriod === 'This Month') {
        return tMonth === CURRENT_MONTH && tYear === CURRENT_YEAR;
      }
      if (filterPeriod === 'Last Month') {
        return tMonth === CURRENT_MONTH - 1 && tYear === CURRENT_YEAR;
      }
      return true;
    });
  }, [filterPeriod]);

  // --- PAGINATION LOGIC ---
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // --- HANDLERS ---
  const handleFilterSelect = (period: string) => {
    setFilterPeriod(period);
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handleView = (trx: Transaction) => {
    setSelectedTransaction(trx);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleDownload = () => {
    // Logic to simulate CSV download
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Customer,Type,Amount,Currency\n"
      + filteredTransactions.map(e => `${e.date},${e.customerName},${e.type},${e.amount},${e.currency}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Internal Wallet</h1>
          <p className="text-gray-400 mt-1">Manage customer wallet transactions</p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/admin-notifications')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
            <Bell size={20} />
          </button>
          <div onClick={() => navigate('/dashboard/admin-notifications')} className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" 
              alt="Profile" 
              className="w-10 h-10 rounded-full bg-green-100 border border-white"
            />
            <div className="text-sm">
              <p className="font-bold text-gray-900 leading-tight">Tyrion Lannister</p>
              <p className="text-gray-400 text-xs">tyrion@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between h-[160px]">
           <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Credits</span>
              <div className="p-2 bg-gray-100 rounded-full text-gray-400">
                <DollarSign size={16} />
              </div>
           </div>
           <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">$11,300</h3>
              <span className="text-xs text-gray-400">+15% from last period</span>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between h-[160px]">
           <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Debits</span>
              <div className="p-2 bg-gray-100 rounded-full text-gray-400">
                <DollarSign size={16} />
              </div>
           </div>
           <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">$1,200</h3>
              <span className="text-xs text-gray-400">-15% from last period</span>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between h-[160px]">
           <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Transactions</span>
              <div className="p-2 bg-gray-100 rounded-full text-gray-400">
                <FileText size={16} />
              </div>
           </div>
           <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{filteredTransactions.length}</h3>
              <span className="text-xs text-gray-400">+15% from last period</span>
           </div>
        </div>
      </div>

      {/* --- TRANSACTION TABLE SECTION --- */}
      <div className="bg-white rounded-3xl shadow-sm p-6 min-h-[500px] flex flex-col">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl text-gray-600 font-medium">Transaction History</h2>
            
            <div className="flex flex-wrap items-center gap-3">
                {/* Date Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        {filterPeriod} <ChevronDown size={14} />
                    </button>
                    {isFilterOpen && (
                        <div className="absolute top-full mt-2 right-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-2 animate-fadeIn">
                             {['All Time', 'This Month', 'Last Month'].map(opt => (
                                 <button 
                                    key={opt}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    onClick={() => handleFilterSelect(opt)}
                                 >
                                    {opt}
                                 </button>
                             ))}
                        </div>
                    )}
                </div>

                <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                    <Filter size={18} />
                </button>

                <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2 bg-[#106F3E] text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors shadow-sm"
                >
                    <Download size={14} /> Download Report
                </button>

                <button className="px-6 py-2 bg-gray-50 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Export
                </button>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-50">
                        <th className="py-4 pl-4 text-xs font-normal text-gray-400 uppercase tracking-wide">Date</th>
                        <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wide">Customer</th>
                        <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wide">Type</th>
                        <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wide">Amount</th>
                        <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wide">Balance After</th>
                        <th className="py-4 pr-4 text-xs font-normal text-gray-400 uppercase tracking-wide text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions.length > 0 ? (
                        currentTransactions.map((trx, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="py-5 pl-4 text-sm text-gray-500">{trx.date}</td>
                                <td className="py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700">{trx.customerName}</span>
                                        <span className="text-xs text-gray-400">{trx.customerEmail}</span>
                                    </div>
                                </td>
                                <td className="py-5">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium 
                                        ${trx.type === 'Deposit' ? 'bg-green-100 text-green-700' : 
                                          trx.type === 'Withdraw' ? 'bg-red-100 text-red-700' : 
                                          'bg-blue-100 text-blue-700'}`}>
                                        {trx.type}
                                    </span>
                                </td>
                                <td className="py-5 text-sm text-gray-500 font-medium font-mono">
                                    {trx.currency} {trx.amount.toFixed(2)}
                                </td>
                                <td className="py-5 text-sm text-gray-500 font-mono">
                                    {trx.currency} {trx.balanceAfter}
                                </td>
                                <td className="py-5 pr-4 text-right">
                                    <button 
                                        onClick={() => handleView(trx)}
                                        className="px-4 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded-lg hover:bg-white hover:text-[#106F3E] hover:shadow-md transition-all border border-transparent hover:border-gray-100"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                         <tr>
                            <td colSpan={6} className="text-center py-20 text-gray-400 bg-gray-50/50 rounded-lg mt-4">
                                No transactions found for {filterPeriod}
                            </td>
                         </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex justify-end items-center gap-6 mt-8 pt-4 border-t border-gray-50">
             <button 
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`text-sm text-gray-400 hover:text-gray-600 transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
             >
                Previous
             </button>
             
             <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages || 1}
             </span>

             <button 
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`flex items-center gap-1 text-sm font-medium text-[#106F3E] hover:text-green-800 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
                Next <ChevronRight size={16} />
             </button>
        </div>

      </div>

      {/* --- TRANSACTION DETAILS MODAL (compact payment details) --- */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400">Customer</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedTransaction.customerName}</p>
                    <p className="text-xs text-gray-400">{selectedTransaction.customerEmail}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Type</p>
                    <p className="text-sm text-gray-800">{selectedTransaction.type}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-sm text-gray-800">{selectedTransaction.date}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400">Amount</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedTransaction.currency} {selectedTransaction.amount.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Balance After</p>
                    <p className="text-sm text-gray-800">{selectedTransaction.currency} {selectedTransaction.balanceAfter}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Transaction ID</p>
                    <p className="text-sm text-gray-800 font-mono">{selectedTransaction.id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="text-[#106F3E] font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminWallet;