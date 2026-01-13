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
  X,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// --- Types & Interfaces ---
interface Transaction {
  id: string;
  type: string;
  details: string;
  date: string;
  amount: string;
  name: string;
  email: string;
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ModalLayoutProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

const Payments = () => {
  // --- State ---
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN-001', type: 'Deposit', details: 'Bank Transfer', date: '7/5/2024', amount: '$500', name: 'Tyrion Lannister', email: 'tyrion@example.com' },
    { id: 'TXN-002', type: 'Payment', details: 'PayPal deposit', date: '7/5/2024', amount: '$500', name: 'Tyrion Lannister', email: 'tyrion@example.com' },
    { id: 'TXN-003', type: 'Remittance', details: 'To John Smith', date: '7/5/2024', amount: '$500', name: 'John Smith', email: 'john.smith@example.com' },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'addFunds' | 'payWallet' | 'remittance' | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    amount: '',
    method: 'Bank Transfer',
    recipient: '',
    email: ''
  });

  // --- Handlers ---
  const closeModal = () => {
    setActiveModal(null);
    setFormData({ amount: '', method: 'Bank Transfer', recipient: '', email: '' });
  };

  const handleAddTransaction = (type: string, details: string) => {
    if (!formData.amount) {
      toast.error("Please enter an amount");
      return;
    }

    const newTx: Transaction = {
      id: `TXN-00${transactions.length + 1}`,
      type: type,
      details: details,
      date: new Date().toLocaleDateString(),
      amount: `$${formData.amount}`,
      name: formData.recipient || 'Tyrion Lannister',
      email: formData.email || 'tyrion@example.com'
    };

    setTransactions([newTx, ...transactions]);
    toast.success(`${type} successful!`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20">
      <Helmet>
        <title>Financial Overview | EXPRESUR</title>
      </Helmet>

      {/* --- MOBILE HEADER --- */}
      <div className="xl:hidden bg-white p-4 sticky top-0 z-20 shadow-sm flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#F97316] ml-14">EXPRESUR</h1>
        <div className="flex items-center gap-3">
          <Link to="#" className="relative p-2 bg-gray-50 rounded-full">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
          </Link>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-8 h-8 rounded-full border border-green-100" />
        </div>
      </div>

      <div className="px-4 md:px-10 space-y-6 md:space-y-8">
        
        {/* --- DESKTOP Header --- */}
        <div className="hidden xl:flex justify-between items-center pt-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Overview</h1>
            <p className="text-gray-500 mt-2 text-sm">Track and manage your finances</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-sm">
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

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <StatCard title="Current Balance" value="$1,250.00" change="+12%" positive />
          <StatCard title="Total Deposits" value="$5,000.00" change="-3%" positive={false} />
          <StatCard title="Total Spent" value="$3,750.00" change="+15%" positive />
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            <span className="text-gray-600 text-sm font-medium">Account Status</span>
            <div>
              <div className="w-4 h-4 rounded-full bg-[#22C55E] mb-2"></div>
              <span className="text-gray-400 text-xs font-normal">Active</span>
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col gap-3">
          <ActionButton icon={<Plus size={16}/>} label="Add Funds" onClick={() => setActiveModal('addFunds')} />
          <ActionButton icon={<Wallet size={16}/>} label="Pay with wallet" onClick={() => setActiveModal('payWallet')} />
          <ActionButton icon={<Send size={16}/>} label="Send Remittance" onClick={() => setActiveModal('remittance')} />
        </div>

        {/* --- RECENT TRANSACTION TABLE --- */}
        <div className="bg-white rounded-[24px] lg:rounded-[32px] p-5 lg:p-8 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg lg:text-xl font-bold text-gray-600 mb-6 lg:mb-8">Recent Transaction</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] text-[15px] text-gray-400 font-medium">
                  <th className="py-4 pl-6 rounded-l-2xl font-medium">Type</th>
                  <th className="py-4 font-medium">Details</th>
                  <th className="py-4 font-medium">Amount</th>
                  <th className="py-4 pr-6 text-right rounded-r-2xl font-medium">Actions</th>
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
                        onClick={() => { setSelectedTransaction(tx); setActiveModal('details'); }}
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
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Add Funds Modal */}
      {activeModal === 'addFunds' && (
        <ModalLayout title="Add Funds" onClose={closeModal}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Select Method</label>
              <div className="relative">
                <select 
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none appearance-none border border-transparent focus:border-[#006D35]"
                  onChange={(e) => setFormData({...formData, method: e.target.value})}
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            <InputField 
              label="Amount ($)" 
              placeholder="0.00" 
              value={formData.amount} 
              onChange={(val: string) => setFormData({...formData, amount: val})} 
            />
            <button 
              onClick={() => handleAddTransaction('Deposit', `${formData.method} Deposit`)} 
              className="w-full bg-[#006D35] text-white py-3.5 rounded-xl font-medium mt-4 hover:bg-[#005a2c] transition"
            >
              Proceed to Pay
            </button>
          </div>
        </ModalLayout>
      )}

      {/* 2. Remittance Modal */}
      {activeModal === 'remittance' && (
        <ModalLayout title="Send Remittance" onClose={closeModal}>
          <div className="space-y-4">
            <InputField 
              label="Recipient Name" 
              placeholder="Enter full name" 
              value={formData.recipient} 
              onChange={(val: string) => setFormData({...formData, recipient: val})} 
            />
            <InputField 
              label="Recipient Email" 
              placeholder="email@example.com" 
              value={formData.email} 
              onChange={(val: string) => setFormData({...formData, email: val})} 
            />
            <InputField 
              label="Amount ($)" 
              placeholder="0.00" 
              value={formData.amount} 
              onChange={(val: string) => setFormData({...formData, amount: val})} 
            />
            <button 
              onClick={() => handleAddTransaction('Remittance', `To ${formData.recipient}`)} 
              className="w-full bg-[#006D35] text-white py-3.5 rounded-xl font-medium mt-4 hover:bg-[#005a2c] transition"
            >
              Send Money
            </button>
          </div>
        </ModalLayout>
      )}

      {/* 3. Transaction Details Modal */}
      {activeModal === 'details' && selectedTransaction && (
        <ModalLayout title="Transaction Details" onClose={closeModal}>
          <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-400">Type</p><p className="text-sm font-medium">{selectedTransaction.type}</p></div>
              <div><p className="text-xs text-gray-400">Amount</p><p className="text-sm font-medium">{selectedTransaction.amount}</p></div>
              <div className="col-span-2"><p className="text-xs text-gray-400">Name</p><p className="text-sm font-medium">{selectedTransaction.name}</p></div>
              <div className="col-span-2"><p className="text-xs text-gray-400">Details</p><p className="text-sm font-medium">{selectedTransaction.details}</p></div>
            </div>
            <button 
              onClick={() => toast.success("Receipt downloaded!")} 
              className="w-full border border-[#006D35] text-[#006D35] py-2.5 rounded-xl text-sm font-medium mt-2"
            >
              Download Receipt
            </button>
          </div>
        </ModalLayout>
      )}

    </div>
  );
};

// --- Sub-Components ---

const StatCard = ({ title, value, change, positive }: StatCardProps) => (
  <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start">
      <span className="text-gray-600 text-sm font-medium">{title}</span>
      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
        <DollarSign size={14} />
      </div>
    </div>
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-[#111827]">{value}</h2>
      <p className={`text-[11px] font-medium mt-1 ${positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{change} from last period</p>
    </div>
  </div>
);

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => (
  <button onClick={onClick} className="bg-white p-4 lg:p-5 rounded-[16px] border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition shadow-sm w-full">
    <span className="text-gray-600 text-[15px] lg:text-lg font-normal">{label}</span>
    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-300 transition bg-[#F9FAFB]">{icon}</div>
  </button>
);

const ModalLayout = ({ title, children, onClose }: ModalLayoutProps) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-[24px] lg:rounded-[32px] w-full max-w-md p-6 shadow-xl animate-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">{title}</h2>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition"><X size={20}/></button>
      </div>
      {children}
    </div>
  </div>
);

const InputField = ({ label, placeholder, value, onChange }: InputFieldProps) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <input 
      type="text" 
      className="w-full p-3 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-[#006D35] transition text-sm" 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Payments;