import React, { useMemo, useState } from "react";
import { 
  Search, Plus, Calendar, ChevronDown, Check, 
  Info, X, Package as PackageIcon, DollarSign, 
  Box, ChevronRight, Save, Trash2, ArrowUpDown
} from "lucide-react";

/** ---------------- Types ---------------- */
type PackageData = {
  id: string;
  trackingId: string;
  itemName: string;
  itemDesc: string;
  customerName: string;
  customerPhone: string;
  category: string;
  price: string;
  created: string;
  status: "Delivered" | "In Transit" | "Cancelled";
};

type SortConfig = {
  key: keyof PackageData | null;
  direction: 'asc' | 'desc';
};

/** ---------------- Initial Data ---------------- */
const INITIAL_PACKAGES: PackageData[] = [
  { id: "1", trackingId: "ORD-1001", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: "19", created: "2024-07-05", status: "Delivered" },
  { id: "2", trackingId: "ORD-1003", itemName: "Local SMB", itemDesc: "Strong in local control and analytics.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Small Businesses", price: "29", created: "2024-11-21", status: "In Transit" },
  { id: "3", trackingId: "ORD-1005", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: "19", created: "2024-07-05", status: "Cancelled" },
  { id: "4", trackingId: "ORD-1006", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerPhone: "+34 612 345 678", category: "Micro", price: "19", created: "2024-07-05", status: "In Transit" },
  { id: "5", trackingId: "ORD-1007", itemName: "Pro Enterprise", itemDesc: "Full scale solution.", customerName: "John Doe", customerPhone: "+1 555 019 283", category: "Enterprise", price: "99", created: "2024-08-10", status: "Delivered" },
  { id: "6", trackingId: "ORD-1008", itemName: "Micro Test", itemDesc: "Single item shipment.", customerName: "Jane Smith", customerPhone: "+44 7700 900077", category: "Micro", price: "12", created: "2024-09-15", status: "Delivered" },
];

export default function PackageManagement() {
  // --- State ---
  const [packages, setPackages] = useState<PackageData[]>(INITIAL_PACKAGES);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [currentPackage, setCurrentPackage] = useState<PackageData | null>(null);

  // --- Logic ---

  // 1. Filtering
  const filteredData = useMemo(() => {
    let data = packages.filter(p => {
      const matchesQuery = 
        p.itemName.toLowerCase().includes(query.toLowerCase()) || 
        p.trackingId.toLowerCase().includes(query.toLowerCase()) ||
        p.customerName.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });

    // 2. Sorting
    if (sortConfig.key) {
      data.sort((a, b) => {
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [packages, query, statusFilter, sortConfig]);

  // 3. Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- Handlers ---

  const handleSort = (key: keyof PackageData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleOpenModal = (pkg: PackageData | null, mode: 'view' | 'edit' | 'add') => {
    if (mode === 'add') {
      // Empty template for new package
      setCurrentPackage({
        id: Math.random().toString(36).substr(2, 9),
        trackingId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        itemName: "",
        itemDesc: "",
        customerName: "",
        customerPhone: "",
        category: "",
        price: "",
        created: new Date().toISOString().split('T')[0],
        status: "In Transit"
      });
    } else {
      setCurrentPackage(pkg);
    }
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSave = (data: PackageData) => {
    if (modalMode === 'add') {
      setPackages([data, ...packages]);
    } else {
      setPackages(packages.map(p => p.id === data.id ? data : p));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter(p => p.id !== id));
      setIsModalOpen(false);
    }
  };

  // KPI Calculations
  const totalProfit = packages.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  const activeCount = packages.filter(p => p.status !== 'Cancelled').length;

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-800 relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight">Package Management</h1>
          <p className="text-gray-400 mt-1 text-[15px]">View and manage all packages with detailed analytics</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Packages" value={String(packages.length)} icon={<PackageIcon size={20} className="text-gray-400" />} />
        <StatCard title="Active Packages" value={String(activeCount)} icon={<Box size={20} className="text-gray-400" />} />
        <StatCard title="Total Profit" value={`$${totalProfit.toLocaleString()}`} icon={<DollarSign size={20} className="text-gray-400" />} />
      </div>

      {/* ACTIONS BAR */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* All Button */}
          <button 
            onClick={() => setStatusFilter("All Status")} 
            className={`px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors ${statusFilter === 'All Status' ? 'bg-[#166534] text-white' : 'bg-[#F9FAFB] text-gray-500 hover:bg-gray-100'}`}
          >
            All
          </button>
          
          {/* Status Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)} 
              className="flex items-center gap-3 bg-[#F9FAFB] text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition border border-transparent hover:border-gray-200 w-40 justify-between"
            >
              {statusFilter} <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {/* Dropdown Menu */}
            {isStatusDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden">
                {["All Status", "Delivered", "In Transit", "Cancelled"].map(status => (
                  <div 
                    key={status} 
                    onClick={() => { setStatusFilter(status); setIsStatusDropdownOpen(false); }} 
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
            
            {/* Backdrop to close dropdown on click outside */}
            {isStatusDropdownOpen && (
              <div className="fixed inset-0 z-10" onClick={() => setIsStatusDropdownOpen(false)}></div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-[#F9FAFB] text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium">
            01/11/24 <Calendar size={16} className="text-gray-400 ml-2" />
          </div>

          <div className="relative flex-1 xl:flex-none">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 py-2.5 bg-[#F9FAFB] rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 w-full xl:w-80"
            />
          </div>
        </div>

        <button onClick={() => handleOpenModal(null, 'add')} className="bg-[#166534] hover:bg-[#14532d] text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition w-full xl:w-auto justify-center shadow-sm">
          <Plus size={18} /> Add Package
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden mb-4 min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] font-medium">
              <tr>
                <SortableHeader label="Item" sortKey="itemName" currentSort={sortConfig} onSort={handleSort} />
                <SortableHeader label="Customer" sortKey="customerName" currentSort={sortConfig} onSort={handleSort} />
                <th className="p-5 font-normal">Tracking Number</th>
                <th className="p-5 font-normal">Category</th>
                <SortableHeader label="Price" sortKey="price" currentSort={sortConfig} onSort={handleSort} />
                <SortableHeader label="Created" sortKey="created" currentSort={sortConfig} onSort={handleSort} />
                <SortableHeader label="Status" sortKey="status" currentSort={sortConfig} onSort={handleSort} />
                <th className="p-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px] divide-y divide-gray-50">
              {paginatedData.length > 0 ? paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-gray-900 mb-0.5">{item.itemName}</div>
                    <div className="text-[13px] text-gray-500 leading-tight">{item.itemDesc}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-gray-900 mb-0.5">{item.customerName}</div>
                    <div className="text-[13px] text-gray-500">{item.customerPhone}</div>
                  </td>
                  <td className="p-5 text-gray-600">{item.trackingId}</td>
                  <td className="p-5 text-gray-600">{item.category}</td>
                  <td className="p-5 text-gray-600">${item.price} USD</td>
                  <td className="p-5 text-gray-600">{item.created}</td>
                  <td className="p-5"><StatusBadge status={item.status} /></td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-500">
                      <button onClick={() => handleOpenModal(item, 'edit')} className="hover:bg-gray-100 hover:text-green-700 px-3 py-1 rounded-md text-[13px] font-medium transition-colors bg-[#F9FAFB]">Edit</button>
                      <button onClick={() => handleOpenModal(item, 'view')} className="hover:bg-gray-100 hover:text-blue-600 px-3 py-1 rounded-md text-[13px] font-medium transition-colors bg-[#F9FAFB]">View</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-400">No packages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6 text-[14px] border-t border-gray-100 pt-4">
        <span className="text-gray-400">Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries</span>
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 px-3 py-1"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
             <button 
               key={idx}
               onClick={() => setCurrentPage(idx + 1)}
               className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${currentPage === idx + 1 ? 'bg-[#166534] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
             >
               {idx + 1}
             </button>
          ))}
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="text-[#16a34a] font-semibold flex items-center gap-1 hover:text-[#15803d] disabled:opacity-50 px-3 py-1"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && currentPackage && (
        <Modal 
          isOpen={isModalOpen} 
          mode={modalMode} 
          data={currentPackage} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

/* --- SUB COMPONENTS --- */

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] p-6 rounded-[20px] flex flex-col justify-between h-[140px] relative">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-500 font-medium text-[15px]">{title}</h3>
      <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">{icon}</div>
    </div>
    <div className="text-[32px] font-medium text-gray-900 tracking-tight">{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Delivered: { color: "text-[#4ade80]", icon: <Check size={14} strokeWidth={3} /> },
    "In Transit": { color: "text-[#3b82f6]", icon: <div className="w-3.5 h-3.5 border-[1.5px] border-[#3b82f6] rounded-full flex items-center justify-center"><span className="text-[8px] font-bold">i</span></div> },
    Cancelled: { color: "text-[#ef4444]", icon: <X size={14} strokeWidth={3} /> },
  };
  const style = styles[status as keyof typeof styles] || { color: "text-gray-500", icon: null };

  return (
    <div className={`flex items-center gap-2 ${style.color} font-medium text-[13px]`}>
      {style.icon} {status}
    </div>
  );
};

const SortableHeader = ({ label, sortKey, currentSort, onSort }: any) => (
  <th className="p-5 font-normal cursor-pointer hover:bg-gray-100 transition-colors select-none" onClick={() => onSort(sortKey)}>
    <div className="flex items-center gap-1">
      {label}
      <ArrowUpDown size={12} className={`transition-opacity ${currentSort.key === sortKey ? 'opacity-100' : 'opacity-30'}`} />
    </div>
  </th>
);

/* --- MODAL --- */
interface ModalProps {
  isOpen: boolean;
  mode: 'view' | 'edit' | 'add';
  data: PackageData;
  onClose: () => void;
  onSave: (data: PackageData) => void;
  onDelete: (id: string) => void;
}

const Modal = ({ isOpen, mode, data, onClose, onSave, onDelete }: ModalProps) => {
  const [formData, setFormData] = useState<PackageData>(data);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
          <h3 className="text-lg font-bold text-gray-900">
            {mode === 'add' ? 'Add New Package' : mode === 'edit' ? 'Edit Package' : 'Package Details'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Tracking ID</label>
              <input 
                name="trackingId" 
                disabled={mode !== 'add'} 
                value={formData.trackingId} 
                onChange={handleChange} 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Status</label>
              <select 
                name="status" 
                disabled={mode === 'view'} 
                value={formData.status} 
                onChange={handleChange} 
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white border-gray-300"
              >
                <option value="Delivered">Delivered</option>
                <option value="In Transit">In Transit</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Item Name</label>
            <input 
              name="itemName" 
              disabled={mode === 'view'} 
              value={formData.itemName} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Customer Name</label>
            <input 
              name="customerName" 
              disabled={mode === 'view'} 
              value={formData.customerName} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Customer Phone</label>
            <input 
              name="customerPhone" 
              disabled={mode === 'view'} 
              value={formData.customerPhone} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Category</label>
              <input 
                name="category" 
                disabled={mode === 'view'} 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Price ($)</label>
              <input 
                type="number" 
                name="price" 
                disabled={mode === 'view'} 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
          </div>

          {/* Note (optional) – now placed directly under Category & Price */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Note (optional)</label>
            <input 
              name="itemDesc" 
              disabled={mode === 'view'} 
              value={formData.itemDesc} 
              onChange={handleChange}
              placeholder="Add any additional notes here..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            {mode === 'edit' ? (
              <button type="button" onClick={() => onDelete(data.id)} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center gap-2">
                <Trash2 size={16} /> Delete
              </button>
            ) : <div></div>}
            
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                {mode === 'view' ? 'Close' : 'Cancel'}
              </button>
              {mode !== 'view' && (
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#166534] rounded-lg hover:bg-[#14532d] flex items-center gap-2">
                  <Save size={16} /> Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};