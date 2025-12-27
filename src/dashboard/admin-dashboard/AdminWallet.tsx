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
  ArrowRight
} from 'lucide-react';

import { Helmet } from 'react-helmet';

interface Transaction {
  id: string;
  date: string; // MM/DD/YYYY
  customerName: string;
  customerEmail: string;
  type: 'Deposit' | 'Withdraw' | 'Refund';
  amount: number;
  currency: 'USD' | 'EUR';
  balanceAfter: number;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '07/05/2024',
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
    date: '07/05/2024',
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
  // Add more mock transactions if needed for pagination demo
];

const AdminWallet = () => {
  const [filterPeriod, setFilterPeriod] = useState('This month');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // For demo purposes, we show all transactions (or filter by month if needed)
  const filteredTransactions = INITIAL_TRANSACTIONS;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterSelect = (period: string) => {
    setFilterPeriod(period);
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const handleView = (trx: Transaction) => {
    setSelectedTransaction(trx);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Date,Customer,Type,Amount,Currency,Balance After\n"
      + filteredTransactions.map(e => 
          `${e.date},${e.customerName},${e.type},${e.currency} ${e.amount.toFixed(2)},${e.currency},${e.currency} ${e.balanceAfter.toFixed(2)}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>Internal Wallet | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 font-sans text-gray-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">Internal Wallet</h1>
          <p className="text-[18px] text-gray-400 mt-1">Manage customer wallet transactions</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
            <Bell size={20} />
          </button>
          <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <p className="font-bold text-gray-900 leading-tight">Tyrion Lannister</p>
              <p className="text-gray-400 text-xs">tyrion@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="bg-[#F8F9FB] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Credits</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <DollarSign size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">$11,300</h3>
              <span className="text-xs text-green-600">+15% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="bg-[#F8F9FB] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Debits</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <DollarSign size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">$1,200</h3>
              <span className="text-xs text-red-600">-15% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="bg-[#F8F9FB] rounded-xl p-6 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Transactions</span>
              <div className="bg-white p-2 rounded-full text-gray-400">
                <FileText size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">785</h3>
              <span className="text-xs text-green-600">+15% from last period</span>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl text-gray-600 font-medium">Transaction History</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
              >
                {filterPeriod} <ChevronDown size={14} />
              </button>
              {isFilterOpen && (
                <div className="absolute top-full mt-2 right-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-2">
                  {['All Time', 'This month', 'Last Month'].map(opt => (
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

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 pl-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Date</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="py-4 text-xs font-normal text-gray-400 uppercase tracking-wider">Balance After</th>
                <th className="py-4 pr-4 text-xs font-normal text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-gray-100 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
                  <td className="py-5 pl-4 text-sm text-gray-700">{trx.date}</td>
                  <td className="py-5">
                    <div>
                      <div className="font-medium text-gray-900">{trx.customerName}</div>
                      <div className="text-xs text-gray-400">{trx.customerEmail}</div>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trx.type === 'Deposit' ? 'bg-green-100 text-green-700' :
                      trx.type === 'Withdraw' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {trx.type}
                    </span>
                  </td>
                  <td className="py-5 text-sm text-gray-700">
                    {trx.currency} {trx.amount.toFixed(2)}
                  </td>
                  <td className="py-5 text-sm text-gray-700">
                    {trx.currency} {trx.balanceAfter.toFixed(2)}
                  </td>
                  <td className="py-5 pr-4 text-right">
                    <button
                      onClick={() => handleView(trx)}
                      className="text-xs px-4 py-1.5 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-[#106F3E] transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-1 text-sm text-[#106F3E] hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>


      <div className="bg-white rounded-3xl shadow-sm p-8">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
    <h2 className="text-2xl text-gray-500 font-normal">Transaction History</h2>
    <div className="flex items-center gap-3">
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-400 hover:bg-gray-100 transition-colors"
        >
          {filterPeriod} <ChevronDown size={14} />
        </button>
        {isFilterOpen && (
          <div className="absolute top-full mt-2 right-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-2">
            {['All Time', 'This month', 'Last Month'].map(opt => (
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
      
      <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
        <Filter size={18} />
      </button>

      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-[#066333] text-white rounded-lg text-sm font-medium hover:bg-green-900 transition-colors"
      >
        Download Report
      </button>
      
      <button className="px-6 py-2 border border-gray-100 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
        Export
      </button>
    </div>
  </div>

  {/* Table Section */}
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="pb-6 pl-2 text-sm font-medium text-gray-400">Date</th>
          <th className="pb-6 text-sm font-medium text-gray-400">Customer</th>
          <th className="pb-6 text-sm font-medium text-gray-400">Type</th>
          <th className="pb-6 text-sm font-medium text-gray-400">Amount</th>
          <th className="pb-6 text-sm font-medium text-gray-400">Balance After</th>
          <th className="pb-6 pr-2 text-sm font-medium text-gray-400 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {currentTransactions.map((trx) => (
          <tr key={trx.id} className="group hover:bg-gray-50/50 transition-colors">
            <td className="py-6 pl-2 text-sm text-gray-500">{trx.date}</td>
            <td className="py-6">
              <div>
                <div className="font-bold text-gray-700">{trx.customerName}</div>
                <div className="text-sm text-gray-400">{trx.customerEmail}</div>
              </div>
            </td>
            <td className="py-6 text-sm text-gray-500">{trx.type}</td>
            <td className="py-6 text-sm text-gray-500">
              {trx.currency} {trx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </td>
            <td className="py-6 text-sm text-gray-500">
              {trx.currency} {trx.balanceAfter.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </td>
            <td className="py-6 pr-2 text-right">
              <button
                onClick={() => handleView(trx)}
                className="text-xs px-5 py-2 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-all"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination Section */}
  <div className="flex justify-end items-center gap-8 mt-10">
    <button
      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
    >
      Previous
    </button>
    <button
      onClick={() => setCurrentPage(p => p + 1)}
      disabled={currentPage >= totalPages}
      className="flex items-center gap-2 text-sm text-[#066333] font-medium hover:opacity-80 disabled:opacity-30 transition-all"
    >
      Next <ArrowRight size={18} />
    </button>
  </div>
</div>

      {/* MODAL - same as before, omitted for brevity but kept in full code */}
      {isModalOpen && selectedTransaction && (
        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 md:p-8">
            <h3 className="text-gray-700 text-xl md:text-2xl font-semibold mb-4">Payment Details</h3>

            <div className="bg-gray-100 rounded-xl p-6 md:p-8 text-base text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-400">Customer</p>
                    <p className="font-semibold text-gray-900 text-lg">{selectedTransaction.customerName}</p>
                    <p className="text-sm text-gray-500">{selectedTransaction.customerEmail}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="text-base text-gray-900">{selectedTransaction.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-base text-gray-900">{selectedTransaction.date}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-400">Amount</p>
                    <p className="font-semibold text-gray-900 text-lg">{selectedTransaction.currency} {selectedTransaction.amount.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Balance After</p>
                    <p className="text-base text-gray-900">{selectedTransaction.currency} {selectedTransaction.balanceAfter.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-[#106F3E] font-semibold text-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminWallet;