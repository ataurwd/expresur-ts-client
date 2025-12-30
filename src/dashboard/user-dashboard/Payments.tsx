import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Bell,
  DollarSign,
  Plus,
  Send,
  Wallet,
  Eye,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// --- Types ---
interface Transaction {
  id: string;
  type: string;
  details: string;
  date: string;
  amount: string;
  status?: string;
  name: string;
  email: string;
}

const Payments = () => {
  // --- State ---
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Added pagination state
  const itemsPerPage = 5;

  // --- Mock Data ---
  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      type: 'Deposit',
      details: 'Bank Transfer',
      date: '7/5/2024',
      amount: '$500',
      name: 'Tyrion Lannister',
      email: 'tyrion@example.com'
    },
    {
      id: 'TXN-002',
      type: 'Payment',
      details: 'PayPal deposit',
      date: '7/5/2024',
      amount: '$500',
      name: 'Tyrion Lannister',
      email: 'tyrion@example.com'
    },
    {
      id: 'TXN-003',
      type: 'Remittance',
      details: 'To John Smith',
      date: '7/5/2024',
      amount: '$500',
      name: 'John Smith',
      email: 'john.smith@example.com'
    },
    {
      id: 'TXN-004',
      type: 'Deposit',
      details: 'Wire Transfer',
      date: '8/5/2024',
      amount: '$1200',
      name: 'Tyrion Lannister',
      email: 'tyrion@example.com'
    },
  ];

  // --- Handlers ---
  const handleActionClick = (action: string) => {
    toast.info(`Action triggered: ${action}`);
  };

  const handleViewTransaction = (txn: Transaction) => {
    setSelectedTransaction(txn);
    setIsModalOpen(true);
  };

  const handleDownloadReceipt = () => {
    toast.success('Receipt downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20 relative">
      <Helmet>
        <title>Financial Overview | EXPRESUR</title>
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Overview</h1>
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
            <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
            <p className="text-gray-500 text-sm">Track your packages</p>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-600 text-sm lg:text-[16px] font-medium">Current Balance</span>
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <DollarSign size={14} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827]">$0.00</h2>
              <p className="text-[11px] lg:text-xs font-medium text-[#22C55E] mt-1">+12% from last period</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-600 text-sm lg:text-[16px] font-medium">Total Deposits</span>
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <DollarSign size={14} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827]">$0.00</h2>
              <p className="text-[11px] lg:text-xs font-medium text-[#EF4444] mt-1">-3% from last period</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-600 text-sm lg:text-[16px] font-medium">Total Spent</span>
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <DollarSign size={14} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827]">$0.00</h2>
              <p className="text-[11px] lg:text-xs font-medium text-[#22C55E] mt-1">+15% from last period</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            <span className="text-gray-600 text-sm lg:text-[16px] font-medium">Account Status</span>
            <div>
              <div className="w-4 h-4 rounded-full bg-[#22C55E] mb-2"></div>
              <span className="text-gray-400 text-xs lg:text-[13px] font-normal">Active</span>
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col gap-3">
          <button onClick={() => handleActionClick('Add Funds')} className="bg-white p-4 lg:p-5 rounded-[16px] border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition shadow-sm">
            <span className="text-gray-600 text-[15px] lg:text-lg font-normal">Add Funds</span>
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition bg-[#F9FAFB]"><Plus size={16} /></div>
          </button>
          <button onClick={() => handleActionClick('Pay with wallet')} className="bg-white p-4 lg:p-5 rounded-[16px] border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition shadow-sm">
            <span className="text-gray-600 text-[15px] lg:text-lg font-normal">Pay with wallet</span>
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition bg-[#F9FAFB]"><Wallet size={16} /></div>
          </button>
          <button onClick={() => handleActionClick('Send Remittance')} className="bg-white p-4 lg:p-5 rounded-[16px] border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition shadow-sm">
            <span className="text-gray-600 text-[15px] lg:text-lg font-normal">Send Remittance</span>
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition bg-[#F9FAFB]"><Send size={16} /></div>
          </button>
        </div>

        {/* --- RECENT TRANSACTION TABLE (IMPROVED) --- */}
        <div className="bg-white rounded-[24px] lg:rounded-[32px] p-5 lg:p-8 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg lg:text-xl font-bold text-gray-600 mb-6 lg:mb-8">Recent Transaction</h3>

          {/* DESKTOP Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] text-[15px] text-gray-400 font-medium">
                  <th className="py-4 pl-6 rounded-l-2xl font-medium w-1/4">Type</th>
                  <th className="py-4 font-medium w-1/4">Details</th>
                  <th className="py-4 font-medium w-1/4">Amount</th>
                  <th className="py-4 pr-6 text-right rounded-r-2xl font-medium w-1/4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 pl-6 text-gray-600 font-normal">{tx.type}</td>
                    <td className="py-5 text-gray-500 font-normal">{tx.details}</td>
                    <td className="py-5 text-gray-600 font-medium">{tx.amount}</td>
                    <td className="py-5 pr-6 text-right">
                      <button
                        onClick={() => handleViewTransaction(tx)}
                        className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE List View (Better Design) */}
          <div className="lg:hidden space-y-0">
             {/* Header Row */}
             <div className="flex bg-[#F9FAFB] p-3 rounded-t-xl text-[11px] font-semibold text-gray-400 mb-1">
                <div className="w-[30%] pl-2">Type</div>
                <div className="w-[40%]">Details</div>
                <div className="w-[20%] text-right">Amount</div>
                <div className="w-[10%]"></div>
             </div>

             {transactions.map((tx, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none">
                     <div className="w-[30%] text-[13px] text-gray-700 font-medium">{tx.type}</div>
                     <div className="w-[40%] text-[13px] text-gray-500 truncate pr-2">{tx.details}</div>
                     <div className="w-[20%] text-[13px] text-gray-700 font-bold text-right">{tx.amount}</div>
                     <div className="w-[10%] text-right">
                        <button 
                            onClick={() => handleViewTransaction(tx)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <Eye size={18} />
                        </button>
                     </div>
                 </div>
             ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-6 mt-8 lg:mt-12 text-sm font-normal">
            <button className="text-gray-400 hover:text-gray-600 transition disabled:opacity-30" disabled>
              Previous
            </button>
            <button className="flex items-center gap-2 text-[#006D35] font-medium hover:text-[#005a2c] transition">
              Next <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>

      {/* --- TRANSACTION DETAILS MODAL --- */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-[24px] lg:rounded-[32px] w-full max-w-lg p-6 lg:p-8 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-gray-600 mb-6">Transaction Details</h2>
            <div className="bg-[#F9FAFB] rounded-[20px] p-6 mb-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="col-span-1">
                  <p className="text-[11px] text-gray-400 mb-1">Name</p>
                  <p className="text-[13px] text-gray-600 break-words">{selectedTransaction.name}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[11px] text-gray-400 mb-1">Email</p>
                  <p className="text-[13px] text-gray-600 break-all">{selectedTransaction.email}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[11px] text-gray-400 mb-1">Type</p>
                  <p className="text-[13px] text-gray-600">{selectedTransaction.type}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[11px] text-gray-400 mb-1">Details</p>
                  <p className="text-[13px] text-gray-600">{selectedTransaction.details}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[11px] text-gray-400 mb-1">Date</p>
                  <p className="text-[13px] text-gray-600">{selectedTransaction.date}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[11px] text-gray-400 mb-1">Amount</p>
                  <p className="text-[13px] text-gray-600">{selectedTransaction.amount}</p>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={handleDownloadReceipt} className="bg-[#006D35] text-white px-5 py-2.5 rounded-lg text-xs font-medium hover:bg-[#005a2c] transition shadow-sm">
                  Download Receipt
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-[#006D35] text-base font-normal hover:text-[#005a2c] transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Payments;