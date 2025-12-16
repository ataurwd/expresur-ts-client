import React, { memo, useState, useMemo } from 'react';
import { 
  Search, ChevronDown, ChevronRight, Check, 
  Truck, X, Clock, Box, Edit, Eye, 
  MapPin, Package, User, Filter, Save, AlertCircle
} from 'lucide-react';

/* --- TYPES --- */
interface Shipment {
  id: string;
  customerName: string;
  customerPhone: string;
  packageId: string;
  lockerId: string;
  routeFrom: string;
  routeTo: string;
  carrier: string;
  estimatedDate: string;
  status: 'Delivered' | 'In Transit' | 'Cancelled' | 'Pending' | 'Assigned';
}

/* --- EXACT DATA FROM IMAGE --- */
const INITIAL_DATA: Shipment[] = [
  { id: '1', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0047', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'UPS', estimatedDate: '7/5/2024', status: 'Delivered' },
  { id: '2', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0046', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'USPS', estimatedDate: '11/21/2024', status: 'In Transit' },
  { id: '3', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0047', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'FedEx', estimatedDate: '7/5/2024', status: 'Cancelled' },
  { id: '4', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0046', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'FedEx', estimatedDate: '11/21/2024', status: 'Pending' },
  { id: '5', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0047', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'USPS', estimatedDate: '7/5/2024', status: 'Assigned' },
  { id: '6', customerName: 'John Doe', customerPhone: '+1 555 019 283', packageId: 'PK-0048', lockerId: 'LCK-128B', routeFrom: 'Madrid, Spain', routeTo: 'Havana, Cuba', carrier: 'DHL', estimatedDate: '8/10/2024', status: 'In Transit' },
];

const AdminShipments = memo(() => {
  /* --- STATE --- */
  const [data, setData] = useState<Shipment[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [carrierFilter, setCarrierFilter] = useState('Carrier');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [modal, setModal] = useState<{ open: boolean; mode: 'view' | 'edit'; data: Shipment | null }>({
    open: false, mode: 'view', data: null
  });

  /* --- LOGIC --- */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = 
        item.customerName.toLowerCase().includes(search.toLowerCase()) || 
        item.packageId.toLowerCase().includes(search.toLowerCase()) ||
        item.lockerId.toLowerCase().includes(search.toLowerCase());
      
      const matchStatus = statusFilter === 'Status' || item.status === statusFilter;
      const matchCarrier = carrierFilter === 'Carrier' || item.carrier === carrierFilter;

      return matchSearch && matchStatus && matchCarrier;
    });
  }, [data, search, statusFilter, carrierFilter]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const stats = {
    total: data.length,
    inTransit: data.filter(d => d.status === 'In Transit').length,
    pending: data.filter(d => d.status === 'Pending').length
  };

  /* --- HANDLERS --- */
  const handleOpenModal = (item: Shipment, mode: 'view' | 'edit') => {
    setModal({ open: true, mode, data: item });
  };

  const handleSave = (updatedItem: Shipment) => {
    setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setModal({ ...modal, open: false });
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-800 relative">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight">Shipment Management</h1>
          <p className="text-gray-400 mt-1 text-[15px]">Manage all shipments and tracking information</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#F9FAFB] pl-1 pr-4 py-1.5 rounded-full shadow-sm border border-gray-100">
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

      {/* --- KPI CARDS (BOX STYLE) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Delivery" value="857" icon={<Truck className="text-gray-400" size={20} />} />
        <StatCard label="In Transit" value={String(stats.inTransit)} icon={<Box className="text-gray-400" size={20} />} />
        <StatCard label="Pending" value={String(stats.pending)} icon={<Clock className="text-gray-400" size={20} />} />
      </div>

      {/* --- CONTROLS --- */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-medium text-gray-700 w-full lg:w-auto">All Shipment</h2>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
          {/* Search */}
          <div className="relative flex-1 lg:flex-none">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
              type="text" 
              placeholder="Search by name, locker ID, date..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-full lg:w-80 shadow-sm text-gray-600"
             />
          </div>

          {/* Status Filter */}
          <div className="relative">
             <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#F9FAFB] border border-transparent hover:border-gray-200 text-gray-500 text-sm px-4 py-2 pr-8 rounded-lg outline-none cursor-pointer font-medium"
             >
               <option>Status</option>
               <option>Delivered</option>
               <option>In Transit</option>
               <option>Cancelled</option>
               <option>Pending</option>
               <option>Assigned</option>
             </select>
             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Carrier Filter */}
          <div className="relative">
             <select 
              value={carrierFilter}
              onChange={(e) => setCarrierFilter(e.target.value)}
              className="appearance-none bg-[#F9FAFB] border border-transparent hover:border-gray-200 text-gray-500 text-sm px-4 py-2 pr-8 rounded-lg outline-none cursor-pointer font-medium"
             >
               <option>Carrier</option>
               <option>UPS</option>
               <option>USPS</option>
               <option>FedEx</option>
               <option>DHL</option>
             </select>
             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- TABLE (BOX STYLE) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] font-medium border-b border-gray-100">
              <tr>
                <th className="p-5 font-normal">Customer</th>
                <th className="p-5 font-normal">Package ID</th>
                <th className="p-5 font-normal">Locker ID</th>
                <th className="p-5 font-normal">Route</th>
                <th className="p-5 font-normal">Carrier</th>
                <th className="p-5 font-normal">Estimated date</th>
                <th className="p-5 font-normal">Status</th>
                <th className="p-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px] divide-y divide-gray-50">
              {paginatedData.length > 0 ? paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-gray-900 mb-0.5">{item.customerName}</div>
                    <div className="text-[13px] text-gray-500">{item.customerPhone}</div>
                  </td>
                  <td className="p-5 text-gray-600">{item.packageId}</td>
                  <td className="p-5 text-gray-600">{item.lockerId}</td>
                  <td className="p-5">
                    <div className="text-gray-600 leading-tight">{item.routeFrom.split(',')[0]},</div>
                    <div className="text-gray-500 text-[13px]">Spain → Havana, Cuba</div>
                  </td>
                  <td className="p-5 text-gray-600">{item.carrier}</td>
                  <td className="p-5 text-gray-600">{item.estimatedDate}</td>
                  <td className="p-5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button onClick={() => handleOpenModal(item, 'edit')} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-3 py-1.5 rounded text-xs font-medium transition-colors">Edit</button>
                       <button onClick={() => handleOpenModal(item, 'view')} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-3 py-1.5 rounded text-xs font-medium transition-colors">View</button>
                    </div>
                  </td>
                </tr>
              )) : (
                 <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-400">No shipments found.</td>
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
        <ShipmentModal 
          mode={modal.mode} 
          data={modal.data} 
          onClose={() => setModal({ ...modal, open: false })} 
          onSave={handleSave}
        />
      )}

    </div>
  );
});

/* --- SUB COMPONENTS --- */

const StatCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] p-6 rounded-[20px] flex flex-col justify-between h-[130px] relative">
     <div className="flex justify-between items-start">
      <h3 className="text-gray-500 font-medium text-[15px]">{label}</h3>
      <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="text-[32px] font-medium text-gray-900 tracking-tight">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: Shipment['status'] }) => {
  const styles = {
    Delivered: { color: 'text-[#10B981]', icon: <Check size={14} strokeWidth={3} /> },
    'In Transit': { color: 'text-[#3B82F6]', icon: <Truck size={14} /> },
    Cancelled: { color: 'text-[#EF4444]', icon: <X size={14} strokeWidth={3} /> },
    Pending: { color: 'text-[#F59E0B]', icon: <Clock size={14} /> },
    Assigned: { color: 'text-[#8B5CF6]', icon: <Box size={14} /> },
  };
  const style = styles[status];

  return (
    <div className={`flex items-center gap-2 ${style.color} font-medium text-[13px]`}>
      {style.icon} {status}
    </div>
  );
};

/* --- MODAL COMPONENT --- */
const ShipmentModal = ({ mode, data, onClose, onSave }: { mode: 'view' | 'edit', data: Shipment, onClose: () => void, onSave: (d: Shipment) => void }) => {
  const [formData, setFormData] = useState<Shipment>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
          <h3 className="text-lg font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Shipment' : 'Shipment Details'}
          </h3>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
           {/* Row 1 */}
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
           
           {/* Row 2 */}
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Package ID</label>
               <input disabled={mode === 'view'} value={formData.packageId} onChange={e => setFormData({...formData, packageId: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
             </div>
             <div>
               <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Locker ID</label>
               <input disabled={mode === 'view'} value={formData.lockerId} onChange={e => setFormData({...formData, lockerId: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
             </div>
           </div>

           {/* Row 3 */}
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Status</label>
                 <select disabled={mode === 'view'} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500 bg-white">
                   <option value="Delivered">Delivered</option>
                   <option value="In Transit">In Transit</option>
                   <option value="Cancelled">Cancelled</option>
                   <option value="Pending">Pending</option>
                   <option value="Assigned">Assigned</option>
                 </select>
              </div>
              <div>
                 <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Date</label>
                 <input disabled={mode === 'view'} value={formData.estimatedDate} onChange={e => setFormData({...formData, estimatedDate: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
           </div>

           <div className="flex justify-end pt-4 gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
              {mode === 'edit' && (
                <button type="submit" className="bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#14532d] flex items-center gap-2"><Save size={16} /> Save Changes</button>
              )}
           </div>
        </form>
      </div>
    </div>
  );
};

export default AdminShipments;