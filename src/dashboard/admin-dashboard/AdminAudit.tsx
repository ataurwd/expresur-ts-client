import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  FileText, 
  ShieldAlert, 
  XCircle, 
  ChevronRight, 
  Save,
  X,
  Edit2,
  Trash2
} from 'lucide-react';

// --- TYPES ---
interface LogItem {
  id: number;
  user: string;
  date: string;
  entityType: string;
  entityId: string;
  description: string;
  event: 'Scan' | 'Price Change' | 'Edit' | 'Deletion' | 'Status Change';
  status: 'Success' | 'Failed'; // Added for filtering logic
}

// --- MOCK DATA (Matches Screenshot Exactly) ---
const INITIAL_LOGS: LogItem[] = [
  { id: 1, user: 'Warehouse Operator 1', date: '7/5/2024', entityType: 'package', entityId: 'TRK002468013', description: 'Package scanned at warehouse station', event: 'Scan', status: 'Success' },
  { id: 2, user: 'Warehouse Operator 2', date: '11/21/2024', entityType: 'locker', entityId: 'L-1001', description: 'Storage fee rate updated', event: 'Price Change', status: 'Success' },
  { id: 3, user: 'Dashboard Viewer', date: '7/5/2024', entityType: 'package', entityId: 'TRK999999999', description: 'Package update failed', event: 'Edit', status: 'Failed' },
  { id: 4, user: 'System Administrator', date: '11/21/2024', entityType: 'package', entityId: 'TRK999999999', description: 'Package record permanently deleted', event: 'Deletion', status: 'Success' },
  { id: 5, user: 'Operations Manager', date: '7/5/2024', entityType: 'consolidation', entityId: 'CONS-2024-001', description: 'Consolidation approved for shipment', event: 'Status Change', status: 'Success' },
];

const AdminAudit = () => {
  // --- STATE ---
  const [logs, setLogs] = useState<LogItem[]>(INITIAL_LOGS);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('Event'); // Default placeholder
  const [statusFilter, setStatusFilter] = useState('Status'); // Default placeholder
  const [dateFilter, setDateFilter] = useState('Last 30 Days');

  // UI State (Dropdowns & Modals)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<LogItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- LOGIC ---

  // 1. Filter Data
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Search Logic
      const matchesSearch = 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Dropdown Filter Logic
      const matchesEvent = eventFilter === 'Event' || log.event === eventFilter;
      const matchesStatus = statusFilter === 'Status' || log.status === statusFilter;
      
      // (Date logic is mocked for this demo to always return true unless "Last Year" is picked)
      const matchesDate = true; 

      return matchesSearch && matchesEvent && matchesStatus && matchesDate;
    });
  }, [logs, searchTerm, eventFilter, statusFilter, dateFilter]);

  // 2. Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  // 3. Handlers
  const handleDelete = (id: number) => {
    if(window.confirm("Are you sure you want to delete this log?")) {
      setLogs(logs.filter(l => l.id !== id));
    }
  };

  const handleEdit = (log: LogItem) => {
    setEditingLog({ ...log });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editingLog) {
      setLogs(logs.map(l => l.id === editingLog.id ? editingLog : l));
      setIsEditModalOpen(false);
      setEditingLog(null);
    }
  };

  // Helper to colorize events
  const getEventColor = (event: string) => {
    switch (event) {
      case 'Scan': return 'text-green-600';
      case 'Price Change': return 'text-purple-600';
      case 'Edit': return 'text-blue-500';
      case 'Deletion': return 'text-red-500';
      case 'Status Change': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 font-sans text-gray-800" onClick={() => setActiveDropdown(null)}>
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
          <p className="text-gray-400 mt-1">Complete system activity and change history</p>
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
            <div className="text-sm">
              <p className="font-bold text-gray-900 leading-tight">Tyrion Lannister</p>
              <p className="text-gray-400 text-xs">tyrion@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Total Events</span>
            <div className="p-2 bg-gray-100 rounded-full text-gray-400"><FileText size={18} /></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">1200</h3>
          <p className="text-xs text-gray-400">+12% from last period</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Critical Actions</span>
            <div className="p-2 bg-gray-100 rounded-full text-gray-400"><ShieldAlert size={18} /></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">3</h3>
          <p className="text-xs text-gray-400">-3% from last period</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Failed Operations</span>
            <div className="p-2 bg-gray-100 rounded-full text-gray-400"><XCircle size={18} /></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">10</h3>
          <p className="text-xs text-gray-400">-3% from last period</p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="bg-white rounded-3xl shadow-sm p-6 min-h-[500px] flex flex-col">
        
        {/* Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
          
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
            {/* Search */}
            <div className="relative flex-grow md:flex-grow-0 md:w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by action, entity...." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 pl-12 pr-4 py-2.5 rounded-lg text-sm border-none outline-none focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
                className="flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-500 hover:bg-gray-100 min-w-[110px]"
              >
                {statusFilter} <ChevronDown size={14} />
              </button>
              {activeDropdown === 'status' && (
                <div className="absolute top-full mt-2 left-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-1 animate-fadeIn">
                   {['Status', 'Success', 'Failed'].map(opt => (
                     <button key={opt} onClick={() => { setStatusFilter(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                       {opt}
                     </button>
                   ))}
                </div>
              )}
            </div>

            {/* Event Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'event' ? null : 'event')}
                className="flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-500 hover:bg-gray-100 min-w-[130px]"
              >
                {eventFilter} <ChevronDown size={14} />
              </button>
              {activeDropdown === 'event' && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-1 animate-fadeIn">
                   {['Event', 'Scan', 'Price Change', 'Edit', 'Deletion', 'Status Change'].map(opt => (
                     <button key={opt} onClick={() => { setEventFilter(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                       {opt}
                     </button>
                   ))}
                </div>
              )}
            </div>

            {/* Date Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
                className="flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-500 hover:bg-gray-100 min-w-[140px]"
              >
                {dateFilter} <ChevronDown size={14} />
              </button>
              {activeDropdown === 'date' && (
                <div className="absolute top-full mt-2 left-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-1 animate-fadeIn">
                   {['Last 30 Days', 'Last 7 Days', 'Last Year'].map(opt => (
                     <button key={opt} onClick={() => { setDateFilter(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                       {opt}
                     </button>
                   ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert("Downloading Report...")}
              className="px-5 py-2.5 bg-[#106F3E] text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors shadow-sm"
            >
              Download Report
            </button>
            <button className="px-5 py-2.5 bg-gray-50 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-4 pl-4 text-xs font-normal text-gray-400">User</th>
                <th className="py-4 text-xs font-normal text-gray-400">Date</th>
                <th className="py-4 text-xs font-normal text-gray-400">Entity</th>
                <th className="py-4 text-xs font-normal text-gray-400">Description</th>
                <th className="py-4 text-xs font-normal text-gray-400">Event</th>
                <th className="py-4 pr-4 text-xs font-normal text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length > 0 ? (
                currentLogs.map((log) => (
                  <tr key={log.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                    <td className="py-5 pl-4 text-sm text-gray-600">{log.user}</td>
                    <td className="py-5 text-sm text-gray-500">{log.date}</td>
                    <td className="py-5">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">{log.entityType}</span>
                        <span className="text-xs text-gray-400 font-mono">{log.entityId}</span>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-gray-600 max-w-[250px]">{log.description}</td>
                    <td className={`py-5 text-sm font-medium ${getEventColor(log.event)}`}>
                      {log.event}
                    </td>
                    <td className="py-5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(log)}
                          className="px-3 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(log.id)}
                          className="px-3 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded hover:bg-white hover:text-red-500 hover:shadow-sm transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={6} className="text-center py-20 text-gray-400">
                     No logs found matching filters.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex justify-end items-center gap-6 mt-8 pt-4 border-t border-gray-50">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`text-sm text-gray-400 hover:text-gray-600 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`flex items-center gap-1 text-sm font-medium text-[#106F3E] hover:text-green-800 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditModalOpen && editingLog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">Edit Audit Log</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-red-500">
                  <X size={20} />
                </button>
             </div>
             
             <div className="p-6 space-y-4">
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                   <textarea 
                      className="w-full p-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-[#106F3E] focus:ring-1 focus:ring-[#106F3E] outline-none transition-all text-sm text-gray-700"
                      rows={3}
                      value={editingLog.description}
                      onChange={(e) => setEditingLog({...editingLog, description: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">User</label>
                   <input 
                      type="text" 
                      value={editingLog.user}
                      onChange={(e) => setEditingLog({...editingLog, user: e.target.value})}
                      className="w-full p-3 bg-gray-50 rounded-xl text-gray-800 text-sm focus:bg-white focus:border-[#106F3E] border border-transparent outline-none"
                   />
                </div>
             </div>

             <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 text-gray-500 font-medium hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-[#106F3E] text-white rounded-xl font-medium hover:bg-green-800 shadow-md shadow-green-100 flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminAudit;