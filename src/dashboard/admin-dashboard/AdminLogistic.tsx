import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Info, Plus, Box, Plane, Ship, 
  ChevronRight, Package, X, Save, Trash2, Check, Bell
} from 'lucide-react';

import { Helmet } from 'react-helmet';

/* --- TYPES --- */
interface LogisticsGroup {
  id: string;
  name: string;
  type: 'Express' | 'Air' | 'Maritime';
  origin: string;
  destination: string;
  departTime: string;
  arriveDate: string;
  currentWeight: number;
  maxWeight: number;
  packageCount: number;
  status: 'Active' | 'Departed';
}

/* --- EXACT DATA --- */
const INITIAL_DATA: LogisticsGroup[] = [
  { 
    id: '1', 
    name: 'BAG-EXPRESS-2024-0456', 
    type: 'Express', 
    origin: 'Miami, USA', 
    destination: 'Havana, Cuba', 
    departTime: '12/9/2025 09:17 AM', 
    arriveDate: '12/19/2025', 
    currentWeight: 3200, 
    maxWeight: 5000, 
    packageCount: 3, 
    status: 'Active' 
  },
  { 
    id: '2', 
    name: 'FLIGHT-2024-AIR-045', 
    type: 'Air', 
    origin: 'Miami, USA', 
    destination: 'Havana, Cuba', 
    departTime: '12/9/2025 09:17 AM', 
    arriveDate: '12/19/2025', 
    currentWeight: 24800, 
    maxWeight: 25000, 
    packageCount: 2, 
    status: 'Departed' 
  },
  { 
    id: '3', 
    name: 'SHIP-2024-MAR-002', 
    type: 'Maritime', 
    origin: 'Miami, USA', 
    destination: 'Havana, Cuba', 
    departTime: '12/9/2025 09:17 AM', 
    arriveDate: '12/19/2025', 
    currentWeight: 18500, 
    maxWeight: 20000, 
    packageCount: 4, 
    status: 'Departed' 
  },
];

/* --- CARD COMPONENT --- */
const GroupCard: React.FC<{
  data: LogisticsGroup;
  onView: () => void;
  onAdd: () => void;
}> = ({ data, onView, onAdd }) => {
  const percent = Math.round((data.currentWeight / data.maxWeight) * 100);
  const isGreen = data.status === 'Active';
  

  const Icon = () => {
    if (data.type === 'Air') return <Plane size={20} className="text-gray-400" />;
    if (data.type === 'Maritime') return <Ship size={20} className="text-gray-400" />;
    return <Box size={20} className="text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
            <Icon />
          </div>
          <div className="min-w-0">
            <h3 className="text-gray-600 font-medium text-lg truncate">{data.name}</h3>
            <p className="text-xs text-gray-400 uppercase">{data.type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded text-xs font-medium uppercase ${
          isGreen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'
        }`}>
          {data.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-8 text-[13px]">
        <div className="flex gap-1">
          <span className="text-gray-400 font-bold uppercase">ORIGIN -</span>
          <span className="text-gray-400">{data.origin}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-gray-400 font-bold">Destination:</span>
          <span className="text-gray-400">{data.destination}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-gray-400 font-bold uppercase">DEPART -</span>
          <span className="text-gray-400">{data.departTime}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-gray-400 font-bold uppercase">ARRIVE -</span>
          <span className="text-gray-400">{data.arriveDate}</span>
        </div>
      </div>

      {/* Progress + Actions */}
      <div className="mt-auto">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
            <span className="font-medium text-gray-600">Weight Capacity</span>
            <span className="text-sm text-gray-500">{data.currentWeight}/{data.maxWeight} kg</span>
          </div>

          <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-gray-100">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                percent < 80 ? 'bg-[#22c55e]' : percent < 95 ? 'bg-orange-400' : 'bg-[#ef4444]'
              }`} 
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>

          <div className="flex justify-end mt-2">
            <div className="text-xs text-gray-400">{percent}% full • {data.packageCount} packages</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onView} className="flex-1 bg-[#166534] hover:bg-[#14532d] text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors">
            View Details
          </button>
          <button onClick={onAdd} className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors bg-white">
            <Package size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- MODAL COMPONENT --- */
interface GroupModalProps {
  mode: 'view' | 'create';
  data: LogisticsGroup;
  onClose: () => void;
  onSave: (item: LogisticsGroup) => void;
  onDelete: (id: string) => void;
}

const GroupModal: React.FC<GroupModalProps> = ({ mode, data: initialData, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<LogisticsGroup>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'currentWeight' || name === 'maxWeight' || name === 'packageCount'
        ? Number(value)
        : value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
          <h3 className="text-lg font-bold text-gray-900">
            {mode === 'create' ? 'Create Logistics Group' : 'Group Details'}
          </h3>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Group Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option>Express</option>
                <option>Air</option>
                <option>Maritime</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option>Active</option>
                <option>Departed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Origin</label>
              <input 
                name="origin" 
                value={formData.origin} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Destination</label>
              <input 
                name="destination" 
                value={formData.destination} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Max Weight (kg)</label>
              <input 
                type="number" 
                name="maxWeight" 
                value={formData.maxWeight} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Current Weight</label>
              <input 
                type="number" 
                name="currentWeight" 
                value={formData.currentWeight} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" 
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
            {mode === 'view' ? (
              <button 
                type="button" 
                onClick={() => onDelete(initialData.id)} 
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            ) : <div />}

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                type="submit" 
                className="bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#14532d] flex items-center gap-2"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */
const AdminLogistic: React.FC = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState<LogisticsGroup[]>(INITIAL_DATA);
  const [filter, setFilter] = useState<'All' | 'Express' | 'Air' | 'Maritime'>('All');
  
  const [modal, setModal] = useState<{
    open: boolean;
    mode: 'view' | 'create';
    data: LogisticsGroup | null;
  }>({
    open: false,
    mode: 'view',
    data: null
  });

  const filteredData = useMemo(() => {
    if (filter === 'All') return data;
    return data.filter(item => item.type === filter);
  }, [data, filter]);

  const incompleteCount = data.filter(item => 
    (item.currentWeight / item.maxWeight) < 0.7 && item.status === 'Active'
  ).length;

  const handleOpenModal = (item: LogisticsGroup | null, mode: 'view' | 'create') => {
    if (mode === 'create') {
      const newGroup: LogisticsGroup = {
        id: Math.random().toString(36).substr(2, 9),
        name: `NEW-GROUP-${Math.floor(Math.random() * 1000)}`,
        type: 'Air',
        origin: 'Miami, USA',
        destination: 'Havana, Cuba',
        departTime: new Date().toLocaleString(),
        arriveDate: new Date(Date.now() + 86400000 * 10).toLocaleDateString(),
        currentWeight: 0,
        maxWeight: 10000,
        packageCount: 0,
        status: 'Active'
      };
      setModal({ open: true, mode: 'create', data: newGroup });
    } else {
      setModal({ open: true, mode: 'view', data: item });
    }
  };

  const handleSave = (item: LogisticsGroup) => {
    if (modal.mode === 'create') {
      setData([item, ...data]);
    } else {
      setData(prev => prev.map(d => d.id === item.id ? item : d));
    }
    setModal({ ...modal, open: false });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this logistics group?")) {
      setData(prev => prev.filter(d => d.id !== id));
      setModal({ ...modal, open: false });
    }
  };

  const handleAddPackage = (id: string) => {
    const weightToAdd = Number(prompt("Enter package weight (kg):", "50"));
    if (weightToAdd && !isNaN(weightToAdd) && weightToAdd > 0) {
      setData(prev => prev.map(item => {
        if (item.id === id) {
          const newWeight = Math.min(item.currentWeight + weightToAdd, item.maxWeight);
          return { 
            ...item, 
            currentWeight: newWeight, 
            packageCount: item.packageCount + 1 
          };
        }
        return item;
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-800">
      <Helmet>
        <title>Logistics Groups | EXPRESUR</title>
      </Helmet>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[30px] font-bold text-[#111827] tracking-tight leading-tight">Logistics Groups</h1>
          <p className="text-gray-400 mt-1 text-[18px]">Manage maritime containers, air flights, and express bags</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/admin-notifications')} 
            className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors"
          >
            <Bell size={20} />
          </button>
          <div 
            onClick={() => navigate('/dashboard/admin-notifications')} 
            className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition"
          >
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

      {/* ALERT BOX */}
      {incompleteCount > 0 ? (
        <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-3xl p-6 mb-10 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full border border-[#D97706] flex items-center justify-center text-[#D97706]">
              <Info size={12} strokeWidth={3} />
            </div>
            <h3 className="text-[#D97706] font-bold text-lg">Incomplete Bags/Containers</h3>
          </div>
          <p className="text-[#D97706] text-sm font-medium">{incompleteCount} group(s) have low capacity. Fill these before departure.</p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-10 flex items-center gap-3 transition-all">
          <Check className="text-green-600" />
          <p className="text-green-800 font-medium">All active groups are operating at optimal capacity.</p>
        </div>
      )}

      {/* CONTROLS + CARDS */}
      <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            {(['All', 'Maritime', 'Air', 'Express'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab 
                    ? 'bg-[#166534] text-white' 
                    : 'bg-[#F3F4F6] text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button 
            onClick={() => handleOpenModal(null, 'create')} 
            className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Create Group
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(item => (
            <GroupCard 
              key={item.id} 
              data={item} 
              onView={() => handleOpenModal(item, 'view')}
              onAdd={() => handleAddPackage(item.id)}
            />
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-6 mt-10 text-[14px]">
        <span className="text-gray-300 cursor-not-allowed">Previous</span>
        <button className="text-[#16a34a] font-semibold flex items-center gap-1 hover:text-[#15803d] transition-colors">
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* MODAL */}
      {modal.open && modal.data && (
        <GroupModal 
          mode={modal.mode} 
          data={modal.data} 
          onClose={() => setModal({ ...modal, open: false })} 
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminLogistic;