import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Plus, X,  Search, Truck, Bell, QrCode, } from 'lucide-react';

/* --- INTERFACE --- */
interface ConsolidationData {
  id: string;
  customer: string;
  date: string;
  packages: number;
  weight: number; // in kg
  status: "Pending" | "Shipped" | "Delivered";
  contents?: string;
  trackingNumber?: string;
}

/* --- DUMMY DATA --- */
const INITIAL_DATA: ConsolidationData[] = [
  { id: "CONS-2024-001", customer: "Sarah Johnson", date: "12/13/2025", packages: 2, weight: 8.5, status: "Pending" },
  { id: "CONS-2024-002", customer: "Mike Ross", date: "12/12/2025", packages: 5, weight: 22.3, status: "Pending" },
  { 
    id: "ORD-1001", 
    customer: "Michael Chen", 
    date: "12/10/2025", 
    packages: 2, 
    weight: 7.3, 
    status: "Shipped", 
    contents: "Electronics and accessories", 
    trackingNumber: "SHIP245235017" 
  },
  { id: "CONS-2024-003", customer: "Jessica Pearson", date: "12/09/2025", packages: 1, weight: 3.2, status: "Shipped", contents: "Books and documents", trackingNumber: "SHIP123456789" },
  { id: "CONS-2024-004", customer: "Harvey Specter", date: "12/08/2025", packages: 3, weight: 15.7, status: "Pending" },
  { 
    id: "CONS-2024-005", 
    customer: "Louis Litt", 
    date: "12/07/2025", 
    packages: 4, 
    weight: 18.9, 
    status: "Delivered", 
    contents: "Clothing and personal items", 
    trackingNumber: "SHIP987654321" 
  },
];

const AdminConsolidations = () => {
  const navigate = useNavigate();
  const [consolidations, setConsolidations] = useState<ConsolidationData[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'Pending' | 'History'>('Pending');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<ConsolidationData | null>(null);

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

  const handleCreate = (newData: Partial<ConsolidationData>) => {
    const newConsolidation: ConsolidationData = {
      id: `CONS-2024-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('en-US'),
      status: 'Pending',
      customer: newData.customer || 'Unknown',
      packages: newData.packages || 1,
      weight: newData.weight ?? 5.0
    };
    setConsolidations([newConsolidation, ...consolidations]);
    setIsModalOpen(false);
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
        <title>Admin Consolidations | EXPRESUR</title>
      </Helmet>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[30px] font-bold text-[#111827] tracking-tight leading-tight">Consolidation Management</h1>
          <p className="text-gray-400 mt-1 text-[20px]">Handle consolidation requests and prepare for shipping</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/admin-notifications')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
            <Bell size={20} />
          </button>
          <div onClick={() => navigate('/dashboard/admin-notifications')} className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-10 h-10 rounded-full bg-green-100" />
            <div className="hidden md:block">
              <h4 className="text-sm font-bold text-gray-800 leading-tight">Tyrion Lannister</h4>
              <p className="text-xs text-gray-400">tyrion@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
          <button onClick={() => setActiveTab('Pending')} className={`text-sm font-semibold px-6 py-2 rounded-full transition-all ${activeTab === 'Pending' ? 'bg-[#166534] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
            Pending
          </button>
          <button onClick={() => setActiveTab('History')} className={`text-sm font-semibold px-6 py-2 rounded-full transition-all ${activeTab === 'History' ? 'bg-[#166534] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
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
          <button onClick={openCreateModal} className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm w-full sm:w-auto justify-center">
            <Plus size={18} /> Create Consolidation
          </button>
        </div>
      </div>

      {/* GRID CONTENT */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData.map((item) => (
            <ConsolidationCard
              key={item.id}
              data={item}
              isHistory={activeTab === 'History'}
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

      {/* MODAL */}
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

/* CARD COMPONENT */
interface CardProps {
  data: ConsolidationData;
  isHistory: boolean;
  onView: () => void;
}

const ConsolidationCard: React.FC<CardProps> = ({ data, isHistory, onView }) => {
  if (isHistory) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 hover:shadow-lg transition-shadow duration-200 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-gray-800">{data.id}</h3>
          <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide bg-green-100 text-green-800">
            {data.status}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">Customer: <span className="font-medium text-gray-800">{data.customer}</span></p>
          <p className="text-gray-600">Requested: <span className="font-medium text-gray-800">{data.date}</span></p>

          <div className="pt-3">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Weight</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{data.weight.toFixed(1)} kg</p>
          </div>

          {data.contents && (
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Contents</p>
              <p className="text-gray-800 font-medium mt-1">{data.contents}</p>
            </div>
          )}

          {data.trackingNumber && (
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Truck size={16} className="text-gray-500" />
                Shipment Tracking
              </p>
              <p className="text-lg font-bold text-gray-800 mt-1">{data.trackingNumber}</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-[#f9fafb] p-3 rounded-xl border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <Box size={16} />
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {data.packages} package(s) in this consolidation
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Pending Card
  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-xl font-bold text-gray-700 tracking-tight">{data.id}</h3>
        <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide bg-[#ffedd5] text-[#c2410c]">
          Pending
        </span>
      </div>

      <div className="space-y-1.5 mb-5 flex-grow">
        <p className="text-[14px] text-gray-400">Customer: <span className="text-gray-600 font-medium">{data.customer}</span></p>
        <p className="text-[14px] text-gray-400">Total Weight: <span className="text-gray-600 font-bold">{data.weight.toFixed(1)} kg</span></p>
        <p className="text-[14px] text-gray-400">Requested: <span className="text-gray-600 font-medium">{data.date}</span></p>
      </div>

      <div className="flex items-center gap-3 bg-[#f9fafb] p-3 rounded-xl mb-6 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          <Box size={16} />
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {data.packages} package(s) • {data.weight.toFixed(1)} kg
        </span>
      </div>

      <div className="mt-auto">
        <button
          onClick={onView}
          className="w-full border border-gray-100 bg-white text-gray-500 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

/* MODAL COMPONENT */
interface ModalProps {
  mode: 'create' | 'view';
  data: ConsolidationData | null;
  onClose: () => void;
  onSubmit: (data: Partial<ConsolidationData>) => void;
}

const Modal: React.FC<ModalProps> = ({ mode, data, onClose, onSubmit }) => {
  const [customer, ] = useState("");
  const [weight, ] = useState(5.0);

  // For create-mode advanced UI
  const [scanInput, setScanInput] = useState('');
  const [availablePackages] = useState([
    { id: 'TRK001234567', desc: 'UPS • 2.5 kg • 30×20×15 cm' },
    { id: 'TRK001234568', desc: 'UPS • 2.5 kg • 30×20×15 cm' },
    { id: 'TRK007283945', desc: 'UPS • 4.2 kg • 45×35×25 cm' },
  ]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([availablePackages[2].id]);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden">
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
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{data.id}</h2>
              <p className="text-sm text-gray-500">Packages in Consolidation</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="grid grid-cols-12 gap-4 items-center text-xs text-gray-400 border-b border-gray-100 pb-3 mb-3">
                <div className="col-span-4">Tracking</div>
                <div className="col-span-3">Carrier</div>
                <div className="col-span-2">Weight</div>
                <div className="col-span-3 text-right">Created Date</div>
              </div>

              <div className="space-y-2">
                {availablePackages.map((pkg, idx) => (
                  <div
                    key={pkg.id + idx}
                    className={`bg-white px-4 py-3 grid grid-cols-12 items-center rounded-lg shadow-sm ${idx < availablePackages.length - 1 ? '' : ''}`}
                  >
                    <div className="col-span-4 font-medium text-gray-800">{pkg.id.replace('TRK00','PK-').replace('TRK0','PK-')}</div>
                    <div className="col-span-3 text-gray-600">UPS</div>
                    <div className="col-span-2 text-gray-600">2.5 kg</div>
                    <div className="col-span-3 text-right text-gray-500">{data.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="text-xs text-gray-400 mb-1 font-semibold">Status</div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${data.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {data.status}
                </span>
              </div>

              <div>
                <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white border border-green-100 text-green-600 font-medium hover:bg-green-50">Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          // Create-mode: show scan input + selectable package list matching design
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scan to Add Package</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Scan Tracking Number"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
                />
                <button onClick={() => { /* simulate scan action */ }} type="button" className="bg-[#166534] text-white p-2 rounded-lg">
                  <QrCode size={18} />
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Select Packages ({selectedPackageIds.length} selected)</div>
              <div className="space-y-3">
                {availablePackages.map(pkg => (
                  <label key={pkg.id} className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedPackageIds.includes(pkg.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedPackageIds(prev => [...prev, pkg.id]);
                        else setSelectedPackageIds(prev => prev.filter(id => id !== pkg.id));
                      }}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">{pkg.id}</div>
                      <div className="text-gray-500 text-xs mt-1">{pkg.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end items-center gap-6">
              <button onClick={onClose} className="text-gray-600">Cancel</button>
              <button onClick={() => { onSubmit({ customer, packages: selectedPackageIds.length, weight }); }} className="text-green-600 font-semibold">Create</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConsolidations;