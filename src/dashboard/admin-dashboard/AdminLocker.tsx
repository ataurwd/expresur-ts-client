import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, ChevronDown, ChevronRight, 
  Info, AlertTriangle, Check, X, Save, 
  QrCode, Trash2
} from 'lucide-react';

/* --- TYPES --- */
interface LockerItem {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  lockerId: string;
  carrier: string;
  weight: string;
  days: number;
  status: 'Arrived' | 'Pending';
}

/* --- EXACT DATA --- */
const INITIAL_DATA: LockerItem[] = [
  { id: '1', trackingNumber: 'ORD-1001', customerName: 'María González', customerPhone: '+34 612 345 678', lockerId: 'LCK-127A', carrier: 'UPS', weight: '1.2 kg', days: 1, status: 'Arrived' },
  { id: '2', trackingNumber: 'ORD-1002', customerName: 'María González', customerPhone: '+34 612 345 678', lockerId: 'LCK-127A', carrier: 'FedEx', weight: '0.6 kg', days: 1, status: 'Pending' },
  { id: '3', trackingNumber: 'ORD-1003', customerName: 'John Doe', customerPhone: '+1 555 019 283', lockerId: 'LCK-128B', carrier: 'UPS', weight: '2.5 kg', days: 8, status: 'Arrived' },
  { id: '4', trackingNumber: 'ORD-1004', customerName: 'Jane Smith', customerPhone: '+44 7700 900077', lockerId: 'LCK-129C', carrier: 'FedEx', weight: '0.6 kg', days: 7, status: 'Pending' },
  { id: '5', trackingNumber: 'ORD-1005', customerName: 'María González', customerPhone: '+34 612 345 678', lockerId: 'LCK-127A', carrier: 'UPS', weight: '1.2 kg', days: 2, status: 'Arrived' },
];

const AdminLocker = () => {
  /* --- STATE --- */
  const [data, setData] = useState<LockerItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  
  // Filter States
  const [lockerFilter, setLockerFilter] = useState('All Lockers');
  const [isLockerDropdownOpen, setIsLockerDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [modal, setModal] = useState<{ open: boolean; mode: 'view' | 'edit' | 'add'; data: LockerItem | null }>({
    open: false, mode: 'view', data: null
  });

  /* --- LOGIC --- */
  
  // Get unique Locker IDs for the dropdown
  const uniqueLockers = useMemo(() => {
    const lockers = new Set(data.map(item => item.lockerId));
    return ['All Lockers', ...Array.from(lockers)];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = 
        item.customerName.toLowerCase().includes(search.toLowerCase()) || 
        item.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.lockerId.toLowerCase().includes(search.toLowerCase());
      
      const matchLocker = lockerFilter === 'All Lockers' || item.lockerId === lockerFilter;

      return matchSearch && matchLocker;
    });
  }, [data, search, lockerFilter]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Dynamic Stats
  const stats = {
    pending: data.filter(d => d.status === 'Pending').length,
    delayed: data.filter(d => d.days >= 7).length
  };

  /* --- HANDLERS --- */
  const handleOpenModal = (item: LockerItem | null, mode: 'view' | 'edit' | 'add') => {
    if (mode === 'add') {
      const newItem: LockerItem = {
        id: Math.random().toString(36).substr(2, 9),
        trackingNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: '',
        customerPhone: '',
        lockerId: '',
        carrier: 'UPS',
        weight: '',
        days: 0,
        status: 'Arrived'
      };
      setModal({ open: true, mode: 'add', data: newItem });
    } else {
      setModal({ open: true, mode, data: item });
    }
  };

  const handleSave = (item: LockerItem) => {
    if (modal.mode === 'add') {
      setData([item, ...data]);
    } else {
      setData(prev => prev.map(d => d.id === item.id ? item : d));
    }
    setModal({ ...modal, open: false });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this package from the locker?")) {
      setData(prev => prev.filter(item => item.id !== id));
      setModal({ ...modal, open: false });
    }
  };

  const handleScan = () => {
    const code = window.prompt("Simulate Scanner: Enter Tracking Number (e.g., ORD-1001)");
    if (code) {
      setSearch(code);
      const found = data.find(d => d.trackingNumber.toLowerCase() === code.toLowerCase());
      if (found) {
        handleOpenModal(found, 'view');
      } else {
        alert("Package not found in system. Try adding it.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-800 relative">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight">Locker Management</h1>
          <p className="text-gray-400 mt-1 text-[15px]">Manage packages and locker assignments</p>
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

      {/* --- ALERT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Yellow Card */}
        <div className="bg-[#FEFCE8] p-6 rounded-2xl flex flex-col justify-between h-[120px]">
           <div className="flex items-center gap-2 text-[#D97706] mb-2">
             <div className="w-5 h-5 rounded-full border border-[#D97706] flex items-center justify-center">
                <Info size={12} strokeWidth={3} />
             </div>
             <h3 className="font-semibold text-lg">Pending Review</h3>
           </div>
           <p className="text-[#D97706] text-sm font-medium">{stats.pending} package(s) need review</p>
        </div>

        {/* Red Card */}
        <div className="bg-[#FEF2F2] p-6 rounded-2xl flex flex-col justify-between h-[120px]">
           <div className="flex items-center gap-2 text-[#991B1B] mb-2">
             <div className="w-5 h-5 rounded-full border border-[#991B1B] flex items-center justify-center">
                <AlertTriangle size={12} strokeWidth={3} />
             </div>
             <h3 className="font-semibold text-lg">Storage Delay Warning</h3>
           </div>
           <p className="text-[#991B1B] text-sm font-medium">{stats.delayed} package(s) stored for more than 7 days</p>
        </div>
      </div>

      {/* --- CONTROLS --- */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        
        {/* Left Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button 
            onClick={() => {setSearch(''); setLockerFilter('All Lockers')}} 
            className="bg-[#166534] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:bg-[#14532d] transition-colors"
          >
            All
          </button>
          
          {/* Locker Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLockerDropdownOpen(!isLockerDropdownOpen)}
              className="flex items-center gap-3 bg-[#F9FAFB] text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition border border-transparent hover:border-gray-200 min-w-[140px] justify-between"
            >
              {lockerFilter} <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {/* Dropdown Menu */}
            {isLockerDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden">
                {uniqueLockers.map(locker => (
                  <div 
                    key={locker}
                    onClick={() => { setLockerFilter(locker); setIsLockerDropdownOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {locker}
                  </div>
                ))}
              </div>
            )}
             {/* Backdrop */}
            {isLockerDropdownOpen && (
              <div className="fixed inset-0 z-10" onClick={() => setIsLockerDropdownOpen(false)}></div>
            )}
          </div>

          <div className="relative flex-1 lg:flex-none">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tracking number, customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-[#F9FAFB] rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 w-full lg:w-80"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex gap-3 w-full lg:w-auto">
          <button onClick={handleScan} className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition justify-center shadow-sm">
            <QrCode size={18} /> Scan Package
          </button>
          <button onClick={() => handleOpenModal(null, 'add')} className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition justify-center shadow-sm">
            <Plus size={18} /> Add Package
          </button>
        </div>

      </div>

      {/* --- TABLE (BOX STYLE) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] font-medium border-b border-gray-100">
              <tr>
                <th className="p-5 font-normal">Tracking Number</th>
                <th className="p-5 font-normal">Customer</th>
                <th className="p-5 font-normal">Locker ID</th>
                <th className="p-5 font-normal">Carrier</th>
                <th className="p-5 font-normal">Weight</th>
                <th className="p-5 font-normal">Days</th>
                <th className="p-5 font-normal">Status</th>
                <th className="p-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px] divide-y divide-gray-50">
              {paginatedData.length > 0 ? paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-5 text-gray-600">{item.trackingNumber}</td>
                  <td className="p-5">
                    <div className="font-bold text-gray-900 mb-0.5">{item.customerName}</div>
                    <div className="text-[13px] text-gray-500">{item.customerPhone}</div>
                  </td>
                  <td className="p-5 text-gray-600">{item.lockerId}</td>
                  <td className="p-5 text-gray-600">{item.carrier}</td>
                  <td className="p-5 text-gray-600">{item.weight}</td>
                  <td className="p-5 text-gray-600">{item.days}</td>
                  <td className="p-5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button onClick={() => handleOpenModal(item, 'edit')} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-4 py-1.5 rounded text-xs font-medium transition-colors">Edit</button>
                       <button onClick={() => handleOpenModal(item, 'view')} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-4 py-1.5 rounded text-xs font-medium transition-colors">View</button>
                    </div>
                  </td>
                </tr>
              )) : (
                 <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-400">No lockers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAGINATION --- */}
      <div className="flex justify-end items-center gap-6 mt-6 text-[14px]">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="text-[#16a34a] font-semibold flex items-center gap-1 hover:text-[#15803d] transition-colors disabled:opacity-50"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* --- MODAL --- */}
      {modal.open && modal.data && (
        <LockerModal 
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

/* --- SUB COMPONENTS --- */

const StatusBadge = ({ status }: { status: LockerItem['status'] }) => {
  if (status === 'Arrived') {
    return (
      <div className="flex items-center gap-2 text-[#16a34a] font-medium text-[13px]">
        <Check size={14} strokeWidth={3} /> Arrived
      </div>
    );
  }
  if (status === 'Pending') {
    return (
      <div className="flex items-center gap-2 text-[#F59E0B] font-medium text-[13px]">
        <div className="w-3.5 h-3.5 border-[1.5px] border-[#F59E0B] rounded-full flex items-center justify-center">
           <span className="text-[8px] font-bold">i</span>
        </div>
        Pending
      </div>
    );
  }
  return null;
};

/* --- MODAL COMPONENT --- */
interface LockerModalProps {
  mode: 'view' | 'edit' | 'add';
  data: LockerItem;
  onClose: () => void;
  onSave: (d: LockerItem) => void;
  onDelete: (id: string) => void;
}

const LockerModal = ({ mode, data, onClose, onSave, onDelete }: LockerModalProps) => {
  const [formData, setFormData] = useState<LockerItem>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
          <h3 className="text-lg font-bold text-gray-900">
            {mode === 'add' ? 'Add New Package' : mode === 'edit' ? 'Edit Locker Assignment' : 'Assignment Details'}
          </h3>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
           {/* Row 1 */}
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Tracking Number</label>
               <input disabled={mode === 'view'} value={formData.trackingNumber} onChange={e => setFormData({...formData, trackingNumber: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
             </div>
             <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Locker ID</label>
               <input disabled={mode === 'view'} value={formData.lockerId} onChange={e => setFormData({...formData, lockerId: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
             </div>
           </div>
           
           {/* Row 2 */}
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Customer</label>
               <input disabled={mode === 'view'} value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
             </div>
             <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Phone</label>
               <input disabled={mode === 'view'} value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
             </div>
           </div>

           {/* Row 3 */}
           <div className="grid grid-cols-3 gap-4">
              <div>
                 <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Carrier</label>
                 <select disabled={mode === 'view'} value={formData.carrier} onChange={e => setFormData({...formData, carrier: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500 bg-white">
                   <option>UPS</option><option>FedEx</option><option>USPS</option><option>DHL</option>
                 </select>
              </div>
              <div>
                 <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Weight</label>
                 <input disabled={mode === 'view'} value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
               <div>
                 <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Days Stored</label>
                 <input type="number" disabled={mode === 'view'} value={formData.days} onChange={e => setFormData({...formData, days: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
           </div>

           {/* Status */}
           <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Status</label>
               <select disabled={mode === 'view'} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500 bg-white">
                   <option value="Arrived">Arrived</option>
                   <option value="Pending">Pending</option>
               </select>
           </div>

           <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
              {mode === 'edit' ? (
                <button type="button" onClick={() => onDelete(data.id)} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center gap-2">
                  <Trash2 size={16} /> Delete
                </button>
              ) : <div></div>}

              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
                {mode !== 'view' && (
                  <button type="submit" className="bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#14532d] flex items-center gap-2"><Save size={16} /> Save Changes</button>
                )}
              </div>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLocker;