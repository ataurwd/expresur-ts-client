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
  const navigate = useNavigate();
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

  // Pagination Logic
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const stats = { total: 857, delivered: 100, inTransit: 11, pending: 15 };

  const handleOpenModal = (item: Shipment, mode: 'view' | 'edit') => {
    setModal({ open: true, mode, data: item });
  };

  return (
    <>
      <Helmet>
        <title>Shipment Management</title>
      </Helmet>

      <div className="min-h-screen bg-[#F6F6F6] p-6 md:p-10 font-sans text-gray-800 relative">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-[30px] font-bold text-[#111827] tracking-tight leading-tight">Shipment Management</h1>
            <p className="text-gray-400 mt-1 text-[16px]">Manage all shipments and tracking information</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
              <Bell size={20} />
            </button>
            <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion"
                alt="Profile"
                className="w-10 h-10 rounded-full bg-green-100 border border-white"
              />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight text-sm">Tyrion Lannister</p>
                <p className="text-gray-400 text-xs">tyrion@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Total Shipment" value={String(stats.total)} icon={<Box className="text-gray-400" size={20} />} />
              <StatCard label="Delivered" value={String(stats.delivered)} icon={<Check className="text-gray-400" size={20} />} />
              <StatCard label="In Transit" value={String(stats.inTransit)} icon={<Box className="text-gray-400" size={20} />} />
              <StatCard label="Pending" value={String(stats.pending)} icon={<Clock className="text-gray-400" size={20} />} />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-6 border border-gray-100/50">
          
          {/* CONTROLS */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-lg font-medium text-gray-600 w-full lg:w-auto">All Shipment</h2>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
              <div className="relative flex-1 lg:flex-none">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, locker ID, date..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#F9FAFB] border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 w-full lg:w-72 text-gray-600 placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-[#F9FAFB] border-none text-gray-500 text-sm px-4 py-2 pr-8 rounded-lg outline-none cursor-pointer font-medium hover:bg-gray-100 transition"
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
                  className="appearance-none bg-[#F9FAFB] border-none text-gray-500 text-sm px-4 py-2 pr-8 rounded-lg outline-none cursor-pointer font-medium hover:bg-gray-100 transition"
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
          <div className="rounded-xl overflow-hidden border border-gray-50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] font-medium border-b border-gray-100">
                  <tr>
                    <th className="p-5 font-normal">Client</th>
                    <th className="p-5 font-normal">Client ID</th>
                    <th className="p-5 font-normal">Tracking Number</th>
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
                      <td className="p-5 align-top">
                        <div className="font-bold text-gray-800 text-[14px]">{item.clientName}</div>
                        <div className="text-[13px] text-gray-400 mt-0.5">{item.clientEmail}</div>
                      </td>
                      <td className="p-5 align-top text-gray-500">{item.clientId}</td>
                      <td className="p-5 align-top text-gray-500">{item.trackingNumber}</td>
                      <td className="p-5 align-top">
                        <div className="text-gray-600 leading-tight mb-0.5">{item.routeFrom.split(',')[0]},</div>
                        <div className="text-gray-400 text-[13px]">{item.routeFrom.split(',')[1]} → {item.routeTo}</div>
                      </td>
                      <td className="p-5 align-top text-gray-500">{item.carrier}</td>
                      <td className="p-5 align-top text-gray-500">{item.estimatedDate}</td>
                      <td className="p-5 align-top">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-5 align-top text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button onClick={() => handleOpenModal(item, 'edit')} className="bg-white border border-gray-100 hover:border-gray-300 text-gray-500 px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm">Edit</button>
                           <button onClick={() => handleOpenModal(item, 'view')} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">View</button>
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
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors">Previous</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="text-[#16a34a] font-medium flex items-center gap-1 hover:text-[#15803d] disabled:opacity-50 transition-colors">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* MODAL COMPONENTS */}
        {modal.open && modal.data && (
          modal.mode === 'view' ? (
             <ShipmentViewModal data={modal.data} onClose={() => setModal({ ...modal, open: false })} />
          ) : (
             <ShipmentEditModal data={modal.data} onClose={() => setModal({ ...modal, open: false })} />
          )
        )}
      </div>
    </>
  );
});

// --- 3. Sub Components ---

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] p-6 rounded-[24px] flex flex-col justify-between h-[130px] relative">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-500 font-medium text-[15px]">{label}</h3>
      <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center opacity-70">{icon}</div>
    </div>
    <div className="text-[32px] font-medium text-gray-900 tracking-tight">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: Shipment['status'] }) => {
  const configs: Record<Shipment['status'], { color: string; icon: React.ReactNode }> = {
    Delivered: { color: 'text-green-500', icon: <Check size={15} strokeWidth={3} /> },
    'In Transit': { color: 'text-blue-500', icon: <Truck size={15} /> },
    Cancelled: { color: 'text-red-500', icon: <X size={15} strokeWidth={3} /> },
    Pending: { color: 'text-orange-400', icon: <Info size={15} strokeWidth={2.5} /> },
    Assigned: { color: 'text-purple-500', icon: <Package size={15} /> },
  };
  const { color, icon } = configs[status];
  return <div className={`flex items-center gap-2 ${color} font-medium text-[13px]`}>{icon} {status}</div>;
};

const ShipmentViewModal = ({ data, onClose }: { data: Shipment; onClose: () => void }) => {
  const timelineSteps = [
    { status: 'Assigned', time: '7/22/2025 10:43AM', active: true, color: 'text-purple-600', icon: <Package size={14} /> },
    { status: 'Pending', time: '7/22/2025 10:44AM', active: true, color: 'text-orange-500', icon: <Clock size={14} /> },
    { status: 'In Transit', time: '7/22/2025 10:54AM', active: true, color: 'text-blue-500', icon: <Truck size={14} /> },
    { status: 'Canceled', time: '7/22/2025 10:34AM', active: false, color: 'text-gray-400', icon: <X size={14} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-normal text-gray-500">Shipment Details</h2>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div className="bg-gray-50/50 rounded-2xl p-6 grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">Customer</div>
              <div className="font-bold text-gray-700">{data.clientName}</div>
              <div className="text-xs text-gray-400">{data.clientEmail}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">Tracking Number</div>
              <div className="font-bold text-gray-700 text-sm">{data.trackingNumber}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">Route</div>
              <div className="font-bold text-gray-700 text-sm">{data.routeFrom} → {data.routeTo}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">Carrier</div>
              <div className="font-bold text-gray-700 text-sm">{data.carrier}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">Estimated date</div>
              <div className="font-bold text-gray-700 text-sm">{data.estimatedDate}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">Status</div>
               <div className="inline-block"><StatusBadge status={data.status} /></div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-gray-50/50 rounded-2xl p-6">
            <h3 className="text-[16px] text-gray-400 font-normal mb-6">Shipment status Timeline</h3>
            <div className="relative pl-4 border-l-2 border-gray-200 ml-2 space-y-8">
              {timelineSteps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className={`absolute -left-[25px] mt-1.5 w-4 h-4 rounded-full border-2 border-white ${step.active ? 'bg-green-600' : 'bg-gray-300'}`} />
                  <div className="flex-1 flex gap-3">
                    <div className={`${step.color} mt-1`}>{step.icon}</div>
                    <div>
                      <div className={`text-sm font-bold ${step.color}`}>{step.status}</div>
                      <div className="text-[10px] text-gray-400 tracking-tight uppercase">{step.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center gap-6 pt-4">
            <button onClick={onClose} className="text-[15px] text-gray-400 hover:text-gray-600 font-normal transition-colors">Cancel</button>
            <button onClick={onClose} className="px-4 py-2.5 text-[#066333] rounded-lg text-[15px] font-medium transition-all flex items-center gap-2 hover:bg-green-50">Go to Packages <ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShipmentEditModal = ({ data, onClose }: { data: Shipment; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Edit Shipment</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
                </div>
                <p className="text-gray-500 mb-6">Editing details for {data.clientName}...</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
                    <button onClick={onClose} className="px-4 py-2 text-white bg-green-600 rounded-lg text-sm font-medium hover:bg-green-700">Save</button>
                </div>
            </div>
        </div>
    )
}

export default AdminShipments;