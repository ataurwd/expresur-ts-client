import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Truck, Plus, X, Calendar, User, Package, CheckCircle, Search } from 'lucide-react';

/* --- INTERFACE --- */
interface ConsolidationData {
  id: string;
  customer: string;
  date: string;
  packages: number;
  weight: number; // Added weight in kg
  status: "Pending" | "Shipped" | "Delivered";
}

/* --- DUMMY DATA --- */
const INITIAL_DATA: ConsolidationData[] = [
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, weight: 8.5, status: "Pending" },
  { id: "CONS-2024-002", customer: "Mike Ross", date: "12/12/2025", packages: 5, weight: 22.3, status: "Pending" },
  { id: "CONS-2024-003", customer: "Jessica Pearson", date: "12/10/2025", packages: 1, weight: 3.2, status: "Shipped" },
  { id: "CONS-2024-004", customer: "Harvey Specter", date: "12/09/2025", packages: 3, weight: 15.7, status: "Pending" },
  { id: "CONS-2024-005", customer: "Louis Litt", date: "12/08/2025", packages: 4, weight: 18.9, status: "Delivered" },
];

const AdminConsolidations = () => {
  const [consolidations, setConsolidations] = useState<ConsolidationData[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'Pending' | 'History'>('Pending');
  const [search, setSearch] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<ConsolidationData | null>(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    return consolidations.filter(item => {
      const matchesTab = activeTab === 'Pending' ? item.status === 'Pending' : (item.status === 'Shipped' || item.status === 'Delivered');
      const q = search.trim().toLowerCase();
      const matchesSearch = q === '' ||
        item.id.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [consolidations, activeTab, search]);

  // Calculate totals for Pending tab
  const pendingTotals = useMemo(() => {
    const pending = consolidations.filter(item => item.status === 'Pending');
    const totalPackages = pending.reduce((sum, item) => sum + item.packages, 0);
    const totalWeight = pending.reduce((sum, item) => sum + item.weight, 0);
    return { totalPackages, totalWeight };
  }, [consolidations]);

  const handleCreate = (newData: Partial<ConsolidationData>) => {
    const newConsolidation: ConsolidationData = {
      id: `CONS-2024-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-US'),
      status: 'Pending',
      customer: newData.customer || 'Unknown',
      packages: newData.packages || 1,
      weight: newData.weight || 5.0 // default weight
    };
    setConsolidations([newConsolidation, ...consolidations]);
    setIsModalOpen(false);
  };

  const handleApprove = (id: string) => {
    if (window.confirm("Approve and ship this consolidation?")) {
      setConsolidations(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'Shipped' } : item
      ));
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const openViewModal = (item: ConsolidationData) => {
    setModalMode('view');
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 md:p-10 font-sans text-gray-800 relative">
      <Helmet>
        <title>AdminConsolidations | EXPRESUR</title>
      </Helmet>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight">Consolidation Management</h1>
          <p className="text-gray-400 mt-1 text-[15px]">Handle consolidation requests and prepare for shipping</p>
        </div>
        
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        
        <div className="flex items-center gap-4 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('Pending')}
            className={`text-sm font-semibold px-6 py-2 rounded-full transition-all ${
              activeTab === 'Pending' 
              ? 'bg-[#166534] text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab('History')}
            className={`text-sm font-semibold px-6 py-2 rounded-full transition-all ${
              activeTab === 'History' 
              ? 'bg-[#166534] text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            History
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, customer, date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-full shadow-sm text-gray-600"
            />
          </div>

          <button 
            onClick={openCreateModal}
            className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Create Consolidation
          </button>
        </div>
      </div>



      {/* --- GRID CONTENT --- */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData.map((item) => (
            <ConsolidationCard 
              key={item.id} 
              data={item} 
              onApprove={() => handleApprove(item.id)}
              onView={() => openViewModal(item)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
          <Box size={48} className="text-gray-300 mb-4" />
          <h3 className="text-gray-500 font-medium">No consolidations found in {activeTab}</h3>
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <Modal 
          mode={modalMode}
          data={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
};

/* --- CARD COMPONENT --- */
interface CardProps {
  data: ConsolidationData;
  onApprove: () => void;
  onView: () => void;
}

const ConsolidationCard: React.FC<CardProps> = ({ data, onApprove, onView }) => {
  const isShipped = data.status !== 'Pending';

  return (
    <div className="bg-white p-7 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-xl font-bold text-gray-700 tracking-tight">{data.id}</h3>
        <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide ${
          data.status === 'Pending' ? 'bg-[#ffedd5] text-[#c2410c]' : 'bg-green-100 text-green-800'
        }`}>
          {data.status}
        </span>
      </div>

      <div className="space-y-1.5 mb-5 flex-grow">
        <p className="text-[14px] text-gray-400">
          Customer: <span className="text-gray-600 font-medium">{data.customer}</span>
        </p>
          {/* Show weight only if Pending */}
          {data.status === 'Pending' && (
          <p className="text-[14px] text-gray-400">
            Total Weight: <span className="text-gray-600 font-bold">{data.weight.toFixed(1)} kg</span>
          </p>
        )}
        <p className="text-[14px] text-gray-400">
          Requested: <span className="text-gray-600 font-medium">{data.date}</span>
        </p>
        
        
      </div>

      <div className="flex items-center gap-3 bg-[#f9fafb] p-3 rounded-xl mb-6 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
           <Box size={16} />
        </div>
        <span className="text-sm text-gray-500 font-medium">{data.packages} package(s) • {data.weight.toFixed(1)} kg</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <button 
          onClick={onView}
          className="border border-gray-100 bg-white text-gray-500 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          View Details
        </button>
        
        {isShipped ? (
          <button disabled className="bg-gray-100 text-gray-400 py-2.5 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
            <CheckCircle size={16} /> Shipped
          </button>
        ) : (
          <button 
            onClick={onApprove}
            className="bg-[#166534] text-white py-2.5 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#14532d] transition-colors shadow-sm"
          >
            <Truck size={16} /> Approve & Ship
          </button>
        )}
      </div>
    </div>
  );
};

/* --- MODAL COMPONENT (Updated to include weight input when creating) --- */
interface ModalProps {
  mode: 'create' | 'view';
  data: ConsolidationData | null;
  onClose: () => void;
  onSubmit: (data: Partial<ConsolidationData>) => void;
}

const Modal: React.FC<ModalProps> = ({ mode, data, onClose, onSubmit }) => {
  const [customer, setCustomer] = useState("");
  const [packages, setPackages] = useState(1);
  const [weight, setWeight] = useState(5.0); // new state for weight

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ customer, packages, weight });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#f8f9fa]">
          <h3 className="text-lg font-bold text-gray-800">
            {mode === 'create' ? 'New Consolidation' : 'Consolidation Details'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {mode === 'view' && data ? (
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Status</div>
              <div className={`text-lg font-bold ${data.status === 'Pending' ? 'text-orange-600' : 'text-green-600'}`}>{data.status}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={18} />
                <div>
                  <div className="text-xs text-gray-400">Customer</div>
                  <div className="font-medium text-gray-800">{data.customer}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-400" size={18} />
                <div>
                  <div className="text-xs text-gray-400">Date Requested</div>
                  <div className="font-medium text-gray-800">{data.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="text-gray-400" size={18} />
                <div>
                  <div className="text-xs text-gray-400">Packages</div>
                  <div className="font-medium text-gray-800">{data.packages} packages • {data.weight.toFixed(1)} kg</div>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="w-full mt-4 bg-gray-100 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input 
                required
                type="text" 
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Packages</label>
              <input 
                required
                type="number" 
                min="1"
                value={packages}
                onChange={(e) => setPackages(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Weight (kg)</label>
              <input 
                required
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full bg-[#166534] text-white py-2.5 rounded-lg font-semibold hover:bg-[#14532d] transition-colors shadow-md">
                Create Consolidation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminConsolidations;