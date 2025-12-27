import React, { useState } from 'react';
import { toast } from 'sonner'; // Toaster removed
import {
  Bell,
  DollarSign,
  Plus,
  Send,
  ArrowRight,
  Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface Transaction {
  id: string;
  type: string;
  details: string;
  date: string;
  amount: string;
  status?: string;
  // Extra details for modal
  name: string;
  email: string;
}

const Payments = () => {
  // --- State ---
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative pb-20">

      {/* NOTE: <Toaster /> removed to use the global one in App/Layout */}

      {/* --- Header --- */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Overview</h1>
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

        {/* --- Stats Cards Grid --- */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative">
             <div className="flex justify-between items-start mb-4">
                <span className="text-gray-500 font-medium">Current Balance</span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                   <DollarSign size={16} />
                </div>
             </div>
             <h2 className="text-3xl font-bold text-gray-900">$0.00</h2>
             <p className="text-xs font-medium text-green-500 mt-2">+12% from last period</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative">
             <div className="flex justify-between items-start mb-4">
                <span className="text-gray-500 font-medium">Total Deposits</span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                   <DollarSign size={16} />
                </div>
             </div>
             <h2 className="text-3xl font-bold text-gray-900">$0.00</h2>
             <p className="text-xs font-medium text-red-500 mt-2">-3% from last period</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative">
             <div className="flex justify-between items-start mb-4">
                <span className="text-gray-500 font-medium">Total Spent</span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                   <DollarSign size={16} />
                </div>
             </div>
             <h2 className="text-3xl font-bold text-gray-900">$0.00</h2>
             <p className="text-xs font-medium text-green-500 mt-2">+15% from last period</p>
          </div>

  
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative flex flex-col justify-between">
             <span className="text-gray-500 font-medium mb-6 block">Account Status</span>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
                </div>
                <span className="text-sm text-gray-400">Active</span>
             </div>
          </div>

        </div> */}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-[28px]">

          {/* Card 1: Current Balance */}
          <div className="bg-[#f6f6f6] p-7 rounded-[28px] flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[#6b6b6b] text-[17px] font-medium">Current Balance</span>
              <div className="w-8 h-8 rounded-full bg-[#e5e5e5] flex items-center justify-center text-[#a3a3a3]">
                <DollarSign size={14} strokeWidth={3} />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-[40px] font-bold text-[#111111] leading-tight">$0.00</h2>
              <p className="text-[13px] font-medium text-[#46cf68] mt-1">+12% from last period</p>
            </div>
          </div>

          {/* Card 2: Total Deposits */}
          <div className="bg-[#f6f6f6] p-7 rounded-[28px] flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[#6b6b6b] text-[17px] font-medium">Total Deposits</span>
              <div className="w-8 h-8 rounded-full bg-[#e5e5e5] flex items-center justify-center text-[#a3a3a3]">
                <DollarSign size={14} strokeWidth={3} />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-[40px] font-bold text-[#111111] leading-tight">$0.00</h2>
              <p className="text-[13px] font-medium text-[#ef4444] mt-1">-3% from last period</p>
            </div>
          </div>

          {/* Card 3: Total Spent */}
          <div className="bg-[#f6f6f6] p-7 rounded-[28px] flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[#6b6b6b] text-[17px] font-medium">Total Spent</span>
              <div className="w-8 h-8 rounded-full bg-[#e5e5e5] flex items-center justify-center text-[#a3a3a3]">
                <DollarSign size={14} strokeWidth={3} />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-[40px] font-bold text-[#111111] leading-tight">$0.00</h2>
              <p className="text-[13px] font-medium text-[#46cf68] mt-1">+15% from last period</p>
            </div>
          </div>

          {/* Card 4: Account Status */}
          <div className="bg-[#f6f6f6] p-7 rounded-[28px] flex flex-col justify-between min-h-[160px]">
            <span className="text-[#6b6b6b] text-[17px] font-medium">Account Status</span>
            <div className="mt-2">
              <div className="w-4 h-4 rounded-full bg-[#46cf68] mb-2"></div>
              <span className="text-[#a3a3a3] text-[13px] font-medium">Active</span>
            </div>
          </div>

        </div>

        {/* --- Action Buttons Grid --- */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleActionClick('Add Funds')}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-gray-200 transition"
          >
            <span className="text-gray-600 font-medium">Add Funds</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition">
              <Plus size={16} />
            </div>
          </button>

          <button
            onClick={() => handleActionClick('Pay with wallet')}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-gray-200 transition"
          >
            <span className="text-gray-600 font-medium">Pay with wallet</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition">
              <CreditCard size={16} />
            </div>
          </button>

          <button
            onClick={() => handleActionClick('Send Remittance')}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-gray-200 transition"
          >
            <span className="text-gray-600 font-medium">Send Remittance</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition">
              <Send size={16} />
            </div>
          </button>
        </div> */}

        {/* --- Action Buttons Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-[28px]">
          <button
            onClick={() => handleActionClick('Add Funds')}
            className="bg-[#F8F8F8] p-6 rounded-[20px] border border-gray-100 flex items-center justify-between group hover:bg-[#F3F3F3] transition-all duration-200"
          >
            <span className="text-[#666666] text-lg font-normal">Add Funds</span>
            <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition">
              <Plus size={18} strokeWidth={1.5} />
            </div>
          </button>

          <button
            onClick={() => handleActionClick('Pay with wallet')}
            className="bg-[#F8F8F8] p-6 rounded-[20px] border border-gray-100 flex items-center justify-between group hover:bg-[#F3F3F3] transition-all duration-200"
          >
            <span className="text-[#666666] text-lg font-normal">Pay with wallet</span>
            <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition">
              <Wallet size={18} strokeWidth={1.5} />
            </div>
          </button>

          <button
            onClick={() => handleActionClick('Send Remittance')}
            className="bg-[#F8F8F8] p-6 rounded-[20px] border border-gray-100 flex items-center justify-between group hover:bg-[#F3F3F3] transition-all duration-200"
          >
            <span className="text-[#666666] text-lg font-normal">Send Remittance</span>
            <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition">
              <Send size={18} strokeWidth={1.5} />
            </div>
          </button>
        </div>

        {/* --- Recent Transaction Table --- */}
        {/* <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-medium text-gray-700 mb-8">Recent Transaction</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wider font-medium">
                  <th className="py-4 pl-2 font-medium w-1/4">Type</th>
                  <th className="py-4 font-medium w-1/4">Details</th>
                  <th className="py-4 font-medium w-1/4">Date</th>
                  <th className="py-4 font-medium w-1/6">Amount</th>
                  <th className="py-4 font-medium text-right pr-2">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    <td className="py-6 pl-2 text-gray-500 font-medium">{tx.type}</td>
                    <td className="py-6 text-gray-500">{tx.details}</td>
                    <td className="py-6 text-gray-500">{tx.date}</td>
                    <td className="py-6 text-gray-500">{tx.amount}</td>
                    <td className="py-6 text-right pr-2">
                      <button
                        onClick={() => handleViewTransaction(tx)}
                        className="bg-[#F9FAFB] text-gray-400 px-6 py-2 rounded-lg text-xs font-medium hover:bg-gray-100 hover:text-gray-600 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="flex justify-end items-center gap-6 mt-12 text-sm font-medium select-none">
            <button
              className="text-gray-300 cursor-not-allowed"
              disabled
            >
              Previous
            </button>
            <button
              className="flex items-center gap-1 text-[#005f33] hover:text-[#004d2a] transition"
            >
              Next <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>

        </div> */}

        {/* --- Recent Transaction Table --- */}
<div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 min-h-[400px]">
  <h3 className="text-xl font-normal text-gray-600 mb-8">Recent Transaction</h3>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-separate border-spacing-y-2">
      <thead>
        <tr className="bg-[#F8F8F8] text-sm text-gray-400 font-normal">
          <th className="py-5 pl-6 rounded-l-[16px] font-normal">Type</th>
          <th className="py-5 font-normal">Details</th>
          <th className="py-5 font-normal">Date</th>
          <th className="py-5 font-normal">Amount</th>
          <th className="py-5 pr-6 text-right rounded-r-[16px] font-normal">Amount</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {transactions.map((tx, idx) => (
          <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
            <td className="py-6 pl-6 text-gray-500 font-normal border-b border-gray-50 group-last:border-0">{tx.type}</td>
            <td className="py-6 text-gray-500 font-normal border-b border-gray-50 group-last:border-0">{tx.details}</td>
            <td className="py-6 text-gray-500 font-normal border-b border-gray-50 group-last:border-0">{tx.date}</td>
            <td className="py-6 text-gray-500 font-normal border-b border-gray-50 group-last:border-0">{tx.amount}</td>
            <td className="py-6 pr-6 text-right border-b border-gray-50 group-last:border-0">
              <button
                onClick={() => handleViewTransaction(tx)}
                className="bg-[#F8F8F8] text-gray-400 px-6 py-2 rounded-full text-xs font-normal hover:bg-[#F3F3F3] hover:text-gray-600 transition"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-end items-center gap-8 mt-12 text-sm font-normal">
    <button
      className="text-gray-400 hover:text-gray-600 transition disabled:opacity-30"
      disabled
    >
      Previous
    </button>
    <button
      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition"
    >
      Next <ArrowRight size={18} strokeWidth={1.5} />
    </button>
  </div>
</div>

      </div>

    

      {/* --- TRANSACTION DETAILS MODAL --- */}
{isModalOpen && selectedTransaction && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 font-sans">
    <div className="bg-white rounded-[32px] w-full max-w-3xl p-10 shadow-xl relative animate-in fade-in zoom-in duration-200">
      
      {/* Title */}
      <h2 className="text-2xl font-normal text-gray-600 mb-6">Transaction Details</h2>

      {/* Inner Gray Card */}
      <div className="bg-[#F8F8F8] rounded-[24px] p-8 mb-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4">

          <div>
            <p className="text-sm text-gray-400 mb-1">Name</p>
            <p className="text-base font-normal text-gray-600">{selectedTransaction.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p className="text-base font-normal text-gray-600">{selectedTransaction.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Type</p>
            <p className="text-base font-normal text-gray-600">{selectedTransaction.type}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Details</p>
            <p className="text-base font-normal text-gray-600">{selectedTransaction.details}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Date</p>
            <p className="text-base font-normal text-gray-600">{selectedTransaction.date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Amount</p>
            <p className="text-base font-normal text-gray-600">{selectedTransaction.amount}</p>
          </div>

        </div>

        {/* Download Receipt Button */}
        <div className="mt-8">
          <button
            onClick={handleDownloadReceipt}
            className="bg-[#006837] text-white px-6 py-3 rounded-[12px] text-sm font-medium hover:bg-[#00522b] transition shadow-sm"
          >
            Download Receipt
          </button>
        </div>
      </div>

      {/* Cancel Button (Bottom Right) */}
      <div className="flex justify-end pr-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-[#2D7A4D] text-lg font-normal hover:text-[#1e5334] transition"
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

export default Payments;