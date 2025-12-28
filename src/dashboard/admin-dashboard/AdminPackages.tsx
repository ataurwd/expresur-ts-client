import React, { useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, Calendar, ChevronDown, Check,
  X,
  Box, ChevronRight, Save, Trash2, ArrowUpDown, Bell, Truck
} from "lucide-react";

import { Helmet } from 'react-helmet';

/** ---------------- Types ---------------- */
type PackageData = {
  id: string;
  trackingId: string;
  itemName: string;
  itemDesc: string;
  customerName: string;
  clientId?: string;
  customerPhone: string;
  customerEmail?: string;
  category: string;
  price: string;
  created: string;
  status: "Delivered" | "In Transit" | "Cancelled";
};

type SortConfig = {
  key: keyof PackageData | null;
  direction: 'asc' | 'desc';
};

type Note = {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  date: string;
};

/** ---------------- Initial Data ---------------- */
const INITIAL_PACKAGES: PackageData[] = [
  { id: "ORD 1001", clientId: '0001002', trackingId: "ORD-1001", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerEmail: "maria.g@example.com", customerPhone: "+34 612 345 678", category: "Micro", price: "19", created: "2024-07-05", status: "Delivered" },
  { id: "ORD 1002", clientId: '0001003', trackingId: "ORD-1003", itemName: "Local SMB", itemDesc: "Strong in local control and analytics.", customerName: "Maria González", customerEmail: "maria.g@example.com", customerPhone: "+34 612 345 678", category: "Small Businesses", price: "29", created: "2024-11-21", status: "In Transit" },
  { id: "ORD 1003", clientId: '0001004', trackingId: "ORD-1005", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerEmail: "maria.g@example.com", customerPhone: "+34 612 345 678", category: "Micro", price: "19", created: "2024-07-05", status: "Cancelled" },
  { id: "ORD 1004", clientId: '0001005', trackingId: "ORD-1006", itemName: "Starter Light", itemDesc: "Very economical for testing.", customerName: "Maria González", customerEmail: "maria.g@example.com", customerPhone: "+34 612 345 678", category: "Micro", price: "19", created: "2024-07-05", status: "In Transit" },
  { id: "ORD 1005", clientId: '0001006', trackingId: "ORD-1007", itemName: "Pro Enterprise", itemDesc: "Full scale solution.", customerName: "John Doe", customerEmail: "john.doe@example.com", customerPhone: "+1 555 019 283", category: "Enterprise", price: "99", created: "2024-08-10", status: "Delivered" },
  { id: "ORD 1006", clientId: '0001007', trackingId: "ORD-1008", itemName: "Micro Test", itemDesc: "Single item shipment.", customerName: "Jane Smith", customerEmail: "jane.smith@example.com", customerPhone: "+44 7700 900077", category: "Micro", price: "12", created: "2024-09-15", status: "Delivered" },
];

export default function PackageManagement() {
  const navigate = useNavigate();
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
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add' | 'notes'>('view');
  const [currentPackage, setCurrentPackage] = useState<PackageData | null>(null);

  // Notes map (packageId -> notes[])
  const [notesMap, setNotesMap] = useState<Record<string, Note[]>>({
    "1": [
      { id: 'n1', author: 'María González', avatar: 'https://i.pravatar.cc/40?u=maria', text: 'Client requested to hold the shipment until Monday.', date: '7/22/2025 10:14AM' },
      { id: 'n2', author: 'Tyrion Lannister', avatar: 'https://i.pravatar.cc/40?u=tyrion', text: 'Reminder: Verify with shipping partner regarding custom clearance.', date: '7/22/2025 10:14PM' }
    ]
  });

  const addNoteToPackage = (pkgId: string, text: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'Tyrion Lannister',
      avatar: 'https://i.pravatar.cc/40?u=tyrion',
      text,
      date: new Date().toLocaleString(),
    };
    setNotesMap(prev => ({ ...prev, [pkgId]: [newNote, ...(prev[pkgId] || [])] }));
  };

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

  const handleOpenModal = (pkg: PackageData | null, mode: 'view' | 'edit' | 'add' | 'notes') => {
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
  const activeCount = packages.filter(p => p.status !== 'Cancelled').length;

  return (
    <>
      <Helmet>
        <title>Package Management | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#f6f6f6] p-6 md:p-10 font-sans text-gray-800 relative">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#111827] tracking-tight">Package Management</h1>
            <p className="text-gray-400 mt-1 text-[15px]">View and manage all packages with detailed analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard/admin-notifications')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
              <Bell size={20} />
            </button>
            <div onClick={() => navigate('/dashboard/admin-notifications')} className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
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

        {/* KPI CARDS */}
        <div className="mb-10">
          <div className="bg-white p-4 rounded-3xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard title="Total Packages" value={String(packages.length)} icon={<Truck size={28} className="text-gray-400" />} valueClass="text-[40px] font-bold" iconWrapperClass="w-11 h-11 rounded-full bg-[#E5E7EB] flex items-center justify-center" titleClass="text-[30px]  text-gray-500" />
              <StatCard title="Active Packages" value={String(activeCount)} icon={<Box size={20} className="text-gray-400" />} valueClass="text-[40px] font-bold" iconWrapperClass="w-11 h-11 rounded-full bg-[#E5E7EB] flex items-center justify-center" titleClass="text-[30px]  text-gray-500" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-[18px]">
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
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsStatusDropdownOpen(false)}></div>
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
                  </>
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
                    <th className="p-5 font-normal text-[16px]">Order</th>
                    <th className="p-5 font-normal text-[16px]">Client ID</th>
                    <th className="p-5 font-normal text-[16px]">Client</th>
                    <th className="p-5 font-normal text-[16px]">Tracking Number</th>
                    <th className="p-5 font-normal text-[16px]">Created date</th>
                    <th className="p-5 font-normal text-right text-[16px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] divide-y divide-gray-50">
                  {paginatedData.length > 0 ? paginatedData.map((item, idx) => {
                    const isEven = idx % 2 === 0;
                    const rowBg = isEven ? 'bg-white' : 'bg-[#f6f6f6]';
                    const actionText = isEven ? 'text-gray-500' : 'text-gray-500';
                    const buttonBg = isEven ? 'bg-[#f6f6f6]' : 'bg-[#f6f6f6]';
                    return (
                      <tr key={item.id} className={`${rowBg} transition-colors group`}>
                        <td className="p-5 text-gray-700">{item.id}</td>
                        <td className="p-5 text-gray-700">{item.clientId || ''}</td>
                        <td className="p-5">
                          <div className="font-bold text-gray-900 mb-0.5">{item.customerName}</div>
                          <div className="text-[13px] text-gray-500">{item.customerEmail || item.customerPhone}</div>
                        </td>
                        <td className="p-5 text-gray-700">{item.trackingId}</td>
                        <td className="p-5 text-gray-700">{item.created}</td>
                        <td className={`p-5 text-right`}>
                          <div className={`flex items-center justify-end gap-2 ${actionText}`}>
                            <button onClick={() => handleOpenModal(item, 'notes')} className={`hover:bg-gray-100 hover:text-green-700 px-3 py-1 rounded-[18px] text-[13px] font-medium transition-colors ${buttonBg}`}>Notes</button>
                            <button onClick={() => handleOpenModal(item, 'view')} className={`hover:bg-gray-100 hover:text-green-600 px-3 py-1 rounded-[18px] text-[13px] font-medium transition-colors ${buttonBg}`}>View</button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-gray-400">No packages found.</td>
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
              notes={notesMap[currentPackage.id] || []}
              onAddNote={addNoteToPackage}
            />
          )}
        </div>
      </div>
    </>
  );
}

/* --- SUB COMPONENTS --- */

const StatCard = ({ title, value, icon, valueClass, iconWrapperClass, titleClass }: { title: string, value: string, icon: React.ReactNode, valueClass?: string, iconWrapperClass?: string, titleClass?: string }) => (
  <div className="bg-[#F9FAFB] p-6 rounded-[20px] flex flex-col justify-between h-[140px] relative">
    <div className="flex justify-between items-start">
      <h3 className={`${titleClass || 'text-gray-500 font-medium text-[15px]'}`}>{title}</h3>
      <div className={`${iconWrapperClass || 'w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center'}`}>{icon}</div>
    </div>
    <div className={`${valueClass || 'text-[32px] font-medium'} text-gray-900 tracking-tight`}>{value}</div>
  </div>
);

/* --- MODAL --- */
interface ModalProps {
  isOpen: boolean;
  mode: 'view' | 'edit' | 'add' | 'notes';
  data: PackageData;
  onClose: () => void;
  onSave: (data: PackageData) => void;
  onDelete: (id: string) => void;
  notes?: Note[];
  onAddNote?: (pkgId: string, text: string) => void;
}

const Modal = ({ isOpen, mode, data, onClose, onSave, onDelete, notes = [], onAddNote }: ModalProps) => {
  const [formData, setFormData] = useState<PackageData>(data);
  const [noteText, setNoteText] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 mx-4">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
          <h3 className="text-lg font-bold text-gray-900">
            {mode === 'add' ? 'Add New Package' : mode === 'edit' ? 'Edit Package' : 'Package Details'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        {mode === 'add' ? (
          <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Item *</label>
                <input
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Item"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tracking Number *</label>
                <input
                  name="trackingId"
                  value={formData.trackingId}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tracking #"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select a type</option>
                  <option>Micro</option>
                  <option>Small Businesses</option>
                  <option>Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer *</label>
                <input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Customer"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Note (Optional)</label>
              <textarea
                name="itemDesc"
                value={formData.itemDesc}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 min-h-[120px] resize-none"
                placeholder=""
              />
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <div />
              <div className="flex items-center gap-6">
                <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
                <button type="submit" className="text-green-600 font-semibold">Add Package</button>
              </div>
            </div>
          </form>
        ) : mode === 'notes' ? (
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto w-full">
            <h3 className="text-lg font-semibold text-gray-900">Note Details</h3>
            <div className="space-y-4">
              {notes.length === 0 ? (
                <div className="text-sm text-gray-400">No notes yet.</div>
              ) : (
                notes.map(n => (
                  <div key={n.id} className="bg-[#F9FAFB] p-4 rounded-lg flex gap-3">
                    <img src={n.avatar} alt={n.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-400">{n.date}</div>
                      <div className="text-sm text-gray-700 mt-1">{n.text}</div>
                      <div className="text-xs text-gray-400 mt-2">{n.author}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 flex gap-3">
              <input value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add an internal note...." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
              <button onClick={() => { if (onAddNote && data.id) { onAddNote(data.id, noteText); setNoteText(''); } }} className="px-4 py-2 bg-green-600 text-white rounded-lg">Add Note</button>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={onClose} className="text-gray-600">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            {mode === 'view' ? (
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white">
                    <h4 className="text-sm text-gray-500 mb-2">Client</h4>
                    <div className="font-bold text-gray-900">{formData.customerName}</div>
                    <div className="text-sm text-gray-400 mb-4">{formData.customerPhone}</div>

                    <div className="text-sm text-gray-500">Package weight</div>
                    <div className="font-medium text-gray-900">5kg</div>

                    <div className="mt-4 text-sm text-gray-500">Price</div>
                    <div className="font-medium text-gray-900">${formData.price}</div>

                    <button className="mt-6 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg">Download</button>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Tracking Number</div>
                    <div className="font-bold text-gray-900 mb-3">{formData.trackingId}</div>

                    <div className="text-sm text-gray-500">Dimensions</div>
                    <div className="font-medium text-gray-900 mb-3">12×12×12</div>

                    <div className="text-sm text-gray-500">Description</div>
                    <div className="text-gray-700">{formData.itemDesc || '—'}</div>
                  </div>
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                  <button onClick={onClose} className="text-gray-600">Cancel</button>
                  <a href={`/dashboard/admin-shipments/${data.id}`} onClick={() => onClose()} className="text-green-600 font-semibold">Go to shipment</a>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Tracking ID</label>
                    <input
                      name="trackingId"
                      disabled={true}
                      value={formData.trackingId}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Status</label>
                    <select
                      name="status"
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
                    value={formData.itemName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Customer Name</label>
                  <input
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Customer Phone</label>
                  <input
                    name="customerPhone"
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
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Note (optional)</label>
                  <input
                    name="itemDesc"
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
                  ) : <div />}

                  <div className="flex gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#166534] rounded-lg hover:bg-[#14532d] flex items-center gap-2">
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};