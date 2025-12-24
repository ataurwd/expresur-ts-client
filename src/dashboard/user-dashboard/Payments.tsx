import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { 
  Bell, 
  DollarSign, 
  Plus, 
  CreditCard, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  X
} from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState(1);
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
      <Toaster position="top-center" richColors closeButton />

      {/* --- Header --- */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Overview</h1>
          <p className="text-gray-500 mt-2 text-sm">Track your packages</p>
        </div>

        <div className="flex items-center gap-6 mt-6 md:mt-0">
          <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border border-green-200">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover"/>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
              <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* --- Stats Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Current Balance */}
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

          {/* Card 2: Total Deposits */}
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

          {/* Card 3: Total Spent */}
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

          {/* Card 4: Account Status */}
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative flex flex-col justify-between">
             <span className="text-gray-500 font-medium mb-6 block">Account Status</span>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
                </div>
                <span className="text-sm text-gray-400">Active</span>
             </div>
          </div>

        </div>

        {/* --- Action Buttons Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>

        {/* --- Recent Transaction Table --- */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 min-h-[400px]">
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

          {/* Pagination */}
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

        </div>

      </div>

      {/* --- TRANSACTION DETAILS MODAL --- */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <h2 className="text-xl font-medium text-gray-700 mb-6">Transaction Details</h2>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
               
               <div>
                 <p className="text-xs text-gray-400 mb-1">Name</p>
                 <p className="text-sm font-medium text-gray-600">{selectedTransaction.name}</p>
               </div>

               <div>
                 <p className="text-xs text-gray-400 mb-1">Email</p>
                 <p className="text-sm font-medium text-gray-600">{selectedTransaction.email}</p>
               </div>

               <div>
                 <p className="text-xs text-gray-400 mb-1">Type</p>
                 <p className="text-sm font-medium text-gray-600">{selectedTransaction.type}</p>
               </div>

               <div>
                 <p className="text-xs text-gray-400 mb-1">Details</p>
                 <p className="text-sm font-medium text-gray-600">{selectedTransaction.details}</p>
               </div>

               <div>
                 <p className="text-xs text-gray-400 mb-1">Date</p>
                 <p className="text-sm font-medium text-gray-600">{selectedTransaction.date}</p>
               </div>

               <div>
                 <p className="text-xs text-gray-400 mb-1">Amount</p>
                 <p className="text-sm font-medium text-gray-600">{selectedTransaction.amount}</p>
               </div>

            </div>

            {/* Receipt Button */}
            <div className="mb-6">
               <button 
                 onClick={handleDownloadReceipt}
                 className="bg-[#005f33] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004d2a] transition shadow-sm"
               >
                 Download Receipt
               </button>
            </div>

            {/* Cancel Button (Bottom Right) */}
            <div className="flex justify-end">
               <button 
                 onClick={() => setIsModalOpen(false)}
                 className="text-[#005f33] font-medium hover:text-[#004d2a] transition text-sm"
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