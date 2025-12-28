import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Filter,
  ChevronRight,
  ChevronDown,
  DollarSign,
  FileText,
  Download,
  ArrowRight,
  CreditCard,
  Wallet
} from 'lucide-react';

import { Helmet } from 'react-helmet';

// --- TYPES ---
interface Transaction {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  type: 'Deposit' | 'Withdraw' | 'Refund';
  amount: number;
  currency: 'USD' | 'EUR';
  balanceAfter: number;
}

// --- MOCK DATA ---
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '7/5/2024',
    customerName: 'María González',
    customerEmail: 'maria.g@example.com',
    type: 'Deposit',
    amount: 289.00,
    currency: 'USD',
    balanceAfter: 289.00
  },
  {
    id: '2',
    date: '11/21/2024',
    customerName: 'Carlos Pérez',
    customerEmail: 'carlos@cuba.es',
    type: 'Withdraw',
    amount: 156.50,
    currency: 'EUR',
    balanceAfter: 156.50
  },
  {
    id: '3',
    date: '7/5/2024',
    customerName: 'María González',
    customerEmail: 'maria.g@example.com',
    type: 'Deposit',
    amount: 289.00,
    currency: 'USD',
    balanceAfter: 289.00
  },
  {
    id: '4',
    date: '11/21/2024',
    customerName: 'Carlos Pérez',
    customerEmail: 'carlos@cuba.es',
    type: 'Refund',
    amount: 156.50,
    currency: 'EUR',
    balanceAfter: 156.50
  },
];

const AdminWallet = () => {
  const [filterPeriod, setFilterPeriod] = useState('This month');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination Logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(INITIAL_TRANSACTIONS.length / itemsPerPage);
  const currentTransactions = INITIAL_TRANSACTIONS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (trx: Transaction) => {
    setSelectedTransaction(trx);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Internal Wallet</title>
      </Helmet>

      <div className="min-h-screen bg-[#F6F6F6] p-6 md:p-10 font-sans text-gray-800 relative">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-[30px] font-bold text-[#111827] tracking-tight leading-tight">Internal Wallet</h1>
            <p className="text-gray-400 mt-1 text-[16px]">Manage customer wallet transactions</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
              <Bell size={20} />
            </button>
            <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion"
                alt="Profile"
                className="w-10 h-10 rounded-full bg-green-100 border border-white"
              />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight text-sm">Tyrion Lannister</p>
                <p className="text-gray-400 text-xs">tyrion@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           {/* Total Credits */}
           <div className="bg-[#F9FAFB] p-6 rounded-[24px] h-[160px] relative flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <h3 className="text-gray-500 font-medium text-[15px]">Total Credits</h3>
                 <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center opacity-70 text-gray-600">
                    <DollarSign size={16} />
                 </div>
              </div>
              <div>
                 <div className="text-[36px] font-bold text-gray-900 tracking-tight">$11,300</div>
                 <div className="text-[13px] font-medium text-[#16a34a] mt-1">+15% from last period</div>
              </div>
           </div>

           {/* Total Debits */}
           <div className="bg-[#F9FAFB] p-6 rounded-[24px] h-[160px] relative flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <h3 className="text-gray-500 font-medium text-[15px]">Total Debits</h3>
                 <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center opacity-70 text-gray-600">
                    <DollarSign size={16} />
                 </div>
              </div>
              <div>
                 <div className="text-[36px] font-bold text-gray-900 tracking-tight">$1200</div>
                 <div className="text-[13px] font-medium text-red-500 mt-1">-15% from last period</div>
              </div>
           </div>

           {/* Total Transactions */}
           <div className="bg-[#F9FAFB] p-6 rounded-[24px] h-[160px] relative flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <h3 className="text-gray-500 font-medium text-[15px]">Total Transactions</h3>
                 <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center opacity-70 text-gray-600">
                    <Wallet size={16} />
                 </div>
              </div>
              <div>
                 <div className="text-[36px] font-bold text-gray-900 tracking-tight">785</div>
                 <div className="text-[13px] font-medium text-[#16a34a] mt-1">+15% from last period</div>
              </div>
           </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm mb-6">
          
          {/* CONTROLS */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-[20px] font-normal text-gray-500 w-full lg:w-auto">Transaction History</h2>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
               
               {/* Period Dropdown */}
               <div className="relative">
                 <button
                   onClick={() => setIsFilterOpen(!isFilterOpen)}
                   className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-100 transition-colors"
                 >
                   {filterPeriod} <ChevronDown size={16} />
                 </button>
                 {isFilterOpen && (
                   <>
                     <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                     <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-20 overflow-hidden py-1">
                       {['All Time', 'This month', 'Last Month'].map(opt => (
                         <button
                           key={opt}
                           onClick={() => { setFilterPeriod(opt); setIsFilterOpen(false); }}
                           className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                         >
                           {opt}
                         </button>
                       ))}
                     </div>
                   </>
                 )}
               </div>

               {/* Filter Icon */}
               <button className="p-2.5 bg-[#F9FAFB] rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                 <Filter size={18} />
               </button>

               {/* Download Button */}
               <button className="px-5 py-2.5 bg-[#166534] text-white rounded-lg text-sm font-medium hover:bg-[#14532d] transition-colors shadow-sm">
                 Download Report
               </button>

               {/* Export Button */}
               <button className="px-5 py-2.5 bg-[#F9FAFB] text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                 Export
               </button>

            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] font-medium border-b border-gray-50">
                <tr>
                  <th className="p-5 font-normal pl-4">Date</th>
                  <th className="p-5 font-normal">Customer</th>
                  <th className="p-5 font-normal">Type</th>
                  <th className="p-5 font-normal">Amount</th>
                  <th className="p-5 font-normal">Balance After</th>
                  <th className="p-5 font-normal text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {currentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0">
                    <td className="p-5 pl-4 text-gray-500">{trx.date}</td>
                    <td className="p-5">
                      <div className="font-bold text-gray-800">{trx.customerName}</div>
                      <div className="text-[13px] text-gray-400 mt-0.5">{trx.customerEmail}</div>
                    </td>
                    <td className="p-5 text-gray-500">{trx.type}</td>
                    <td className="p-5 text-gray-500">
                      {trx.currency} {trx.amount.toFixed(2)}
                    </td>
                    <td className="p-5 text-gray-500">
                      {trx.currency} {trx.balanceAfter.toFixed(2)}
                    </td>
                    <td className="p-5 pr-4 text-right">
                       <button 
                         onClick={() => handleView(trx)}
                         className="px-6 py-2 rounded-[20px] bg-[#F9FAFB] text-gray-400 text-xs font-medium hover:bg-gray-100 hover:text-gray-600 transition-colors"
                       >
                         View
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-end items-center gap-6 mt-10">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button 
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="flex items-center gap-1 text-sm text-[#166534] font-semibold hover:text-[#14532d] disabled:opacity-50 transition-colors"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && selectedTransaction && (
           <TransactionModal data={selectedTransaction} onClose={() => setIsModalOpen(false)} />
        )}

      </div>
    </>
  );
};

// --- MODAL COMPONENT ---
const TransactionModal = ({ data, onClose }: { data: Transaction; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Transaction Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><ChevronDown className="rotate-180" size={24} /></button>
        </div>
        
        <div className="p-8">
           <div className="bg-[#F9FAFB] rounded-2xl p-6 grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                 <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Customer</div>
                 <div className="font-bold text-gray-900">{data.customerName}</div>
                 <div className="text-xs text-gray-500">{data.customerEmail}</div>
              </div>
              <div>
                 <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Date</div>
                 <div className="text-gray-900">{data.date}</div>
              </div>
              <div>
                 <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Type</div>
                 <div className="text-gray-900">{data.type}</div>
              </div>
              <div>
                 <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Amount</div>
                 <div className="text-xl font-bold text-gray-900">{data.currency} {data.amount.toFixed(2)}</div>
              </div>
              <div>
                 <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Balance After</div>
                 <div className="text-gray-900">{data.currency} {data.balanceAfter.toFixed(2)}</div>
              </div>
           </div>
           
           <div className="mt-8 flex justify-end">
              <button onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition">Close</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWallet;