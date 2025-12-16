import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Truck, Plus } from 'lucide-react';

/* --- INTERFACE --- */
interface ConsolidationData {
  id: string;
  customer: string;
  date: string;
  packages: number;
  status: string;
}

/* --- DUMMY DATA --- */
const CONSOLIDATIONS: ConsolidationData[] = [
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, status: "Pending" },
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, status: "Pending" },
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, status: "Pending" },
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, status: "Pending" },
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, status: "Pending" },
];

const AdminConsolidations = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 md:p-10 font-sans text-gray-800">
      <Helmet>
        <title>AdminConsolidations | EXPRESUR</title>
      </Helmet>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight">Consolidation Management</h1>
          <p className="text-gray-400 mt-1 text-[15px]">Handle consolidation requests and prepare for shipping</p>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 bg-white pl-1 pr-4 py-1.5 rounded-full shadow-sm border border-gray-100">
           <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" 
              alt="User" 
              className="w-10 h-10 rounded-full bg-green-100"
            />
            <div className="hidden md:block">
              <h4 className="text-sm font-bold text-gray-800 leading-tight">Tyrion Lannister</h4>
              <p className="text-xs text-gray-400">tyrion@example.com</p>
            </div>
        </div>
      </div>

      {/* --- ACTIONS BAR --- */}
      <div className="flex justify-between items-center mb-8">
        
        {/* Tabs */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('Pending')}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
              activeTab === 'Pending' 
              ? 'bg-[#166534] text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab('History')}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
              activeTab === 'History' 
              ? 'bg-[#166534] text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            History
          </button>
        </div>

        {/* Create Button */}
        <button className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm">
          <Plus size={18} /> Create Consolidation
        </button>
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CONSOLIDATIONS.map((item, index) => (
          <ConsolidationCard key={index} data={item} />
        ))}
      </div>
     
    </div>
  );
};

/* --- CARD COMPONENT --- */
// Fixed: Added TypeScript type definition for props
const ConsolidationCard: React.FC<{ data: ConsolidationData }> = ({ data }) => {
  return (
    <div className="bg-white p-7 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 hover:shadow-lg transition-shadow duration-200">
      
      {/* Top Row: ID & Status */}
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-xl font-bold text-gray-700 tracking-tight">{data.id}</h3>
        <span className="bg-[#ffedd5] text-[#c2410c] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
          {data.status}
        </span>
      </div>

      {/* Info Rows */}
      <div className="space-y-1.5 mb-5">
        <p className="text-[14px] text-gray-400">
          Customer: <span className="text-gray-600 font-medium">{data.customer}</span>
        </p>
        <p className="text-[14px] text-gray-400">
          Requested: <span className="text-gray-600 font-medium">{data.date}</span>
        </p>
      </div>

      {/* Package Count Box */}
      <div className="flex items-center gap-3 bg-[#f9fafb] p-3 rounded-xl mb-6 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
           <Box size={16} />
        </div>
        <span className="text-sm text-gray-500 font-medium">{data.packages} package(s) in this consolidation</span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="border border-gray-100 bg-white text-gray-500 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm">
          View Details
        </button>
        <button className="bg-[#166534] text-white py-2.5 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#14532d] transition-colors shadow-sm">
          <Truck size={16} /> Approve & Ship
        </button>
      </div>
      
    </div>
  );
};

export default AdminConsolidations;