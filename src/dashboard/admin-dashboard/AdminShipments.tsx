import React, { memo, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ChevronDown, ChevronRight, Check,
  Truck, X, Clock, Box, Package, Bell, Info
} from 'lucide-react';
import { Helmet } from 'react-helmet';

// --- 1. Interface & Data Setup ---
interface Shipment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientId: string;
  trackingNumber: string;
  routeFrom: string;
  routeTo: string;
  carrier: string;
  estimatedDate: string;
  status: 'Delivered' | 'In Transit' | 'Cancelled' | 'Pending' | 'Assigned';
}

const INITIAL_DATA: Shipment[] = [
  { id: '1', clientName: 'María González', clientEmail: 'maria@gmail.com', clientPhone: '+34 612 345 678', clientId: '0001002', trackingNumber: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'UPS', estimatedDate: '7/5/2024', status: 'Delivered' },
  { id: '2', clientName: 'María González', clientEmail: 'maria@gmail.com', clientPhone: '+34 612 345 678', clientId: '0001002', trackingNumber: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'USPS', estimatedDate: '11/21/2024', status: 'In Transit' },
  { id: '3', clientName: 'María González', clientEmail: 'maria@gmail.com', clientPhone: '+34 612 345 678', clientId: '0001002', trackingNumber: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'FedEx', estimatedDate: '7/5/2024', status: 'Cancelled' },
  { id: '4', clientName: 'María González', clientEmail: 'maria@gmail.com', clientPhone: '+34 612 345 678', clientId: '0001002', trackingNumber: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'FedEx', estimatedDate: '11/21/2024', status: 'Pending' },
  { id: '5', clientName: 'María González', clientEmail: 'maria@gmail.com', clientPhone: '+34 612 345 678', clientId: '0001002', trackingNumber: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'USPS', estimatedDate: '7/5/2024', status: 'Assigned' },
  { id: '6', clientName: 'John Doe', clientEmail: 'john.doe@example.com', clientPhone: '+1 555 019 283', clientId: '0001007', trackingNumber: 'LCK-777B', routeFrom: 'Madrid, Spain', routeTo: 'Havana, Cuba', carrier: 'DHL', estimatedDate: '8/10/2024', status: 'In Transit' },
];

// --- 2. Main Component ---
const AdminShipments = memo(() => {
  const [data, setData] = useState<Shipment[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [carrierFilter, setCarrierFilter] = useState('Carrier');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modal, setModal] = useState<{ open: boolean; mode: 'view' | 'edit'; data: Shipment | null }>({
    open: false, mode: 'view', data: null
  });

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch =
        item.clientName.toLowerCase().includes(search.toLowerCase()) ||
        item.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.clientId.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'Status' || item.status === statusFilter;
      const matchCarrier = carrierFilter === 'Carrier' || item.carrier === carrierFilter;
      return matchSearch && matchStatus && matchCarrier;
    });
  }, [data, search, statusFilter, carrierFilter]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const stats = { total: 857, delivered: 100, inTransit: 11, pending: 15 };

  const handleOpenModal = (item: Shipment, mode: 'view' | 'edit') => {
    setModal({ open: true, mode, data: item });
  };

  const handleUpdateShipment = (updatedItem: Shipment) => {
    setData(prev => prev.map(s => s.id === updatedItem.id ? updatedItem : s));
    setModal({ open: false, mode: 'view', data: null });
  };

  return (
    <>
      <Helmet>
        <title>Shipment Management</title>
      </Helmet>

      <div className="min-h-screen bg-[#F6F6F6] p-6 md:p-10 font-sans text-gray-800">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-[30px] font-bold text-[#111827] tracking-tight">Shipment Management</h1>
            <p className="text-gray-400 mt-1">Manage all shipments and tracking information</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400">
              <Bell size={20} />
            </button>
            <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="Profile" className="w-10 h-10 rounded-full border border-green-100" />
              <div className="text-left">
                <p className="font-bold text-gray-900 text-sm">Tyrion Lannister</p>
                <p className="text-gray-400 text-xs text-nowrap">tyrion@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Shipment" value={String(stats.total)} icon={<Box className="text-gray-400" size={20} />} />
            <StatCard label="Delivered" value={String(stats.delivered)} icon={<Check className="text-gray-400" size={20} />} />
            <StatCard label="In Transit" value={String(stats.inTransit)} icon={<Box className="text-gray-400" size={20} />} />
            <StatCard label="Pending" value={String(stats.pending)} icon={<Clock className="text-gray-400" size={20} />} />
          </div>
        </div>

        {/* MAIN TABLE AREA */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-lg font-medium text-gray-600 w-full lg:w-auto">All Shipment</h2>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tracking, client..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#F9FAFB] rounded-lg text-sm outline-none w-full lg:w-72"
                />
              </div>
              <div className="relative">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none bg-[#F9FAFB] px-4 py-2 pr-8 rounded-lg text-sm outline-none cursor-pointer">
                  <option>Status</option>
                  <option>Delivered</option><option>In Transit</option><option>Cancelled</option><option>Pending</option><option>Assigned</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-50">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] border-b border-gray-100">
                <tr>
                  <th className="p-5 font-normal">Client</th>
                  <th className="p-5 font-normal">Tracking Number</th>
                  <th className="p-5 font-normal">Carrier</th>
                  <th className="p-5 font-normal">Status</th>
                  <th className="p-5 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[14px] divide-y divide-gray-50">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-gray-800">{item.clientName}</div>
                      <div className="text-[12px] text-gray-400">{item.clientEmail}</div>
                    </td>
                    <td className="p-5 text-gray-500 font-medium">{item.trackingNumber}</td>
                    <td className="p-5 text-gray-500">{item.carrier}</td>
                    <td className="p-5"><StatusBadge status={item.status} /></td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(item, 'edit')} className="bg-white border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-50 transition-all">Edit</button>
                        <button onClick={() => handleOpenModal(item, 'view')} className="bg-[#F3F4F6] text-gray-500 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-end items-center gap-6 mt-6">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="text-gray-400 disabled:opacity-50">Previous</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="text-[#16a34a] font-medium flex items-center gap-1 disabled:opacity-50">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* MODALS */}
        {modal.open && modal.data && (
          modal.mode === 'view' ? (
            <ShipmentViewModal data={modal.data} onClose={() => setModal({ ...modal, open: false })} />
          ) : (
            <ShipmentEditModal 
              data={modal.data} 
              onClose={() => setModal({ ...modal, open: false })} 
              onSave={handleUpdateShipment} 
            />
          )
        )}
      </div>
    </>
  );
});

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] p-6 rounded-[24px] flex flex-col justify-between h-[130px]">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-500 font-medium text-[15px]">{label}</h3>
      <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">{icon}</div>
    </div>
    <div className="text-[32px] font-medium text-gray-900">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: Shipment['status'] }) => {
  const configs: Record<Shipment['status'], { color: string; icon: React.ReactNode }> = {
    Delivered: { color: 'text-green-500', icon: <Check size={14} /> },
    'In Transit': { color: 'text-blue-500', icon: <Truck size={14} /> },
    Cancelled: { color: 'text-red-500', icon: <X size={14} /> },
    Pending: { color: 'text-orange-400', icon: <Info size={14} /> },
    Assigned: { color: 'text-purple-500', icon: <Package size={14} /> },
  };
  const { color, icon } = configs[status];
  return <div className={`flex items-center gap-2 ${color} font-medium text-[13px]`}>{icon} {status}</div>;
};

// --- VIEW MODAL ---
const ShipmentViewModal = ({ data, onClose }: { data: Shipment; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 text-left">
      <div className="bg-white rounded-[32px] shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 animate-in zoom-in duration-200">
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Shipment Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-2 gap-6">
            <div><p className="text-xs text-gray-400 uppercase font-bold mb-1">Customer</p><p className="font-bold text-gray-700">{data.clientName}</p></div>
            <div><p className="text-xs text-gray-400 uppercase font-bold mb-1">Tracking</p><p className="font-bold text-gray-700">{data.trackingNumber}</p></div>
            <div><p className="text-xs text-gray-400 uppercase font-bold mb-1">Route</p><p className="text-sm text-gray-600">{data.routeFrom} → {data.routeTo}</p></div>
            <div><p className="text-xs text-gray-400 uppercase font-bold mb-1">Carrier</p><p className="font-bold text-gray-700">{data.carrier}</p></div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all">Close</button>
            <button className="px-6 py-2.5 bg-[#066333] text-white rounded-xl font-medium text-sm hover:bg-[#05522b] transition-all">Download Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- EDIT MODAL (Functional & Improved) ---
const ShipmentEditModal = ({ data, onClose, onSave }: { data: Shipment; onClose: () => void; onSave: (updated: Shipment) => void }) => {
  const [formData, setFormData] = useState<Shipment>({ ...data });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 text-left">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Shipment</h2>
            <p className="text-gray-400 text-sm mt-1">Update tracking and carrier details</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Client Name</label>
            <input 
              type="text" 
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tracking #</label>
              <input 
                type="text" 
                value={formData.trackingNumber}
                onChange={(e) => setFormData({...formData, trackingNumber: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500/20 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Carrier</label>
              <select 
                value={formData.carrier}
                onChange={(e) => setFormData({...formData, carrier: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option>UPS</option><option>USPS</option><option>FedEx</option><option>DHL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option>Delivered</option><option>In Transit</option><option>Pending</option><option>Assigned</option><option>Cancelled</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-4 mt-8">
            <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
            <button 
              onClick={() => onSave(formData)}
              className="px-10 py-3.5 bg-[#066333] hover:bg-[#05522b] text-white rounded-2xl text-sm font-bold shadow-lg shadow-green-900/10 transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShipments;