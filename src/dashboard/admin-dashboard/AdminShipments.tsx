import React, { memo, useState, useMemo } from 'react';
import {
  Search, ChevronDown, ChevronRight, Check,
  Truck, X, Clock, Box,  Package, 
} from 'lucide-react';

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

const INITIAL_DATA: Shipment[] = [
  { id: '1', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0047', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'UPS', estimatedDate: '7/5/2024', status: 'Delivered' },
  { id: '2', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0046', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'USPS', estimatedDate: '11/21/2024', status: 'In Transit' },
  { id: '3', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0047', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'FedEx', estimatedDate: '7/5/2024', status: 'Cancelled' },
  { id: '4', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0046', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'FedEx', estimatedDate: '11/21/2024', status: 'Pending' },
  { id: '5', customerName: 'María González', customerPhone: '+34 612 345 678', packageId: 'PK-0047', lockerId: 'LCK-127A', routeFrom: 'Barcelona, Spain', routeTo: 'Havana, Cuba', carrier: 'USPS', estimatedDate: '7/5/2024', status: 'Assigned' },
  { id: '6', customerName: 'John Doe', customerPhone: '+1 555 019 283', packageId: 'PK-0048', lockerId: 'LCK-128B', routeFrom: 'Madrid, Spain', routeTo: 'Havana, Cuba', carrier: 'DHL', estimatedDate: '8/10/2024', status: 'In Transit' },
];

const AdminShipments = memo(() => {
  const [data] = useState<Shipment[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [carrierFilter, setCarrierFilter] = useState('Carrier');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modal, setModal] = useState<{ open: boolean; mode: 'view'; data: Shipment | null }>({
    open: false, mode: 'view', data: null
  });

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

  const stats = { total: 857, delivered: 100, inTransit: 11, pending: 15 };

  const handleOpenModal = (item: Shipment, mode: 'view') => {
    setModal({ open: true, mode, data: item });
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-800 relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight">Shipment Management</h1>
          <p className="text-gray-400 mt-1 text-[15px]">Manage all shipments and tracking information</p>
        </div>
        <div className="flex items-center gap-3 bg-[#F9FAFB] pl-1 pr-4 py-1.5 rounded-full shadow-sm border border-gray-100">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-10 h-10 rounded-full bg-green-100" />
          <div className="hidden md:block">
            <h4 className="text-sm font-bold text-gray-800 leading-tight">Tyrion Lannister</h4>
            <p className="text-xs text-gray-400">tyrion@example.com</p>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Shipment" value={String(stats.total)} icon={<Truck className="text-gray-400" size={20} />} />
        <StatCard label="Delivered" value={String(stats.delivered)} icon={<Check className="text-gray-400" size={20} />} />
        <StatCard label="In Transit" value={String(stats.inTransit)} icon={<Truck className="text-gray-400" size={20} />} />
        <StatCard label="Pending" value={String(stats.pending)} icon={<Clock className="text-gray-400" size={20} />} />
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-medium text-gray-700 w-full lg:w-auto">All Shipment</h2>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
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

      {/* TABLE */}
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
                  <td className="p-5"><StatusBadge status={item.status} /></td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(item, 'view')} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-3 py-1.5 rounded text-xs font-medium transition-colors">View</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="p-10 text-center text-gray-400">No shipments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-6 mt-6 text-[14px]">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="text-gray-400 hover:text-gray-600 disabled:opacity-50">Previous</button>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="text-[#16a34a] font-semibold flex items-center gap-1 hover:text-[#15803d] disabled:opacity-50">
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* MODAL */}
      {modal.open && modal.data && (
        <ShipmentModal
          mode={modal.mode}
          data={modal.data}
          onClose={() => setModal({ ...modal, open: false })}
          onSave={(updated) => {
            // In real app, update state here
            setModal({ ...modal, open: false });
          }}
        />
      )}
    </div>
  );
});

/* SUB COMPONENTS */
const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] p-6 rounded-[20px] flex flex-col justify-between h-[130px] relative">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-500 font-medium text-[15px]">{label}</h3>
      <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">{icon}</div>
    </div>
    <div className="text-[32px] font-medium text-gray-900 tracking-tight">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: Shipment['status'] }) => {
  const configs: Record<Shipment['status'], { color: string; icon: React.ReactNode }> = {
    Delivered: { color: 'text-green-600', icon: <Check size={14} strokeWidth={3} /> },
    'In Transit': { color: 'text-blue-600', icon: <Truck size={14} /> },
    Cancelled: { color: 'text-red-600', icon: <X size={14} strokeWidth={3} /> },
    Pending: { color: 'text-amber-600', icon: <Clock size={14} /> },
    Assigned: { color: 'text-purple-600', icon: <Box size={14} /> },
  };
  const { color, icon } = configs[status];
  return <div className={`flex items-center gap-2 ${color} font-medium text-[13px]`}>{icon} {status}</div>;
};

/* NEW VIEW-ONLY MODAL MATCHING THE IMAGE */
const ShipmentModal = ({ mode, data, onClose }: { mode: 'view' | 'edit'; data: Shipment; onClose: () => void; onSave?: (d: Shipment) => void }) => {
  if (mode === 'edit') {
    // Keep simple edit form (or expand if needed)
    return <div>...</div>; // You can keep your previous edit form here
  }

  // Timeline steps with timestamps (matching the image exactly)
  const timelineSteps = [
    { status: 'Assigned', time: '7/22/2025 10:43AM', active: true, icon: <Package className="w-4 h-4" /> },
    { status: 'Pending', time: '7/22/2025 10:44AM', active: true, icon: <Clock className="w-4 h-4" /> },
    { status: 'In Transit', time: '7/22/2025 10:54AM', active: true, icon: <Truck className="w-4 h-4" /> },
    { status: 'Cancelled', time: '7/22/2025 10:34AM', active: false, icon: <X className="w-4 h-4" /> },
    { status: 'Delivered', time: '7/22/2025 10:34AM', active: true, icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#F9FAFB] px-8 py-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Shipment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 font-medium">Customer</div>
                <div className="font-semibold text-gray-900">{data.customerName}</div>
                <div className="text-sm text-gray-500">{data.customerPhone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Tracking Number</div>
                <div className="font-semibold text-gray-900">{data.lockerId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Route</div>
                <div className="font-semibold text-gray-900">{data.routeFrom} → {data.routeTo}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 font-medium">Carrier</div>
                <div className="font-semibold text-gray-900">{data.carrier}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Estimated date</div>
                <div className="font-semibold text-gray-900">{data.estimatedDate}</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipment status Timeline</h3>
            <div className="relative">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 mb-6 last:mb-0">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {step.icon}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-16 ${step.active ? 'bg-green-200' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</div>
                    <div className="text-sm text-gray-500">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button onClick={onClose} className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition">
              Cancel
            </button>
            <button className="px-6 py-3 text-white bg-green-600 rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2">
              <Package size={18} /> Go to Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShipments;