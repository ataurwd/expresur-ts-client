import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  FileText, 
  ShieldAlert, 
  XCircle, 
  ChevronRight,
 // For close button
} from 'lucide-react';

import { Helmet } from 'react-helmet';

// --- TYPES ---
interface LogItem {
  id: number;
  user: string;
  date: string;
  entityType: string;
  entityId: string;
  description: string;
  event: 'Scan' | 'Price Change' | 'Edit' | 'Deletion' | 'Status Change';
  status: 'Success' | 'Failed';
}

// --- MOCK DATA ---
const INITIAL_LOGS: LogItem[] = [
  { id: 1, user: 'Warehouse Operator 1', date: '7/5/2024', entityType: 'package', entityId: 'TRK002468013', description: 'Package scanned at warehouse station', event: 'Scan', status: 'Success' },
  { id: 2, user: 'Warehouse Operator 2', date: '11/21/2024', entityType: 'locker', entityId: 'L-1001', description: 'Storage fee rate updated', event: 'Price Change', status: 'Success' },
  { id: 3, user: 'Dashboard Viewer', date: '7/5/2024', entityType: 'package', entityId: 'TRK999999999', description: 'Package update failed', event: 'Edit', status: 'Failed' },
  { id: 4, user: 'System Administrator', date: '11/21/2024', entityType: 'package', entityId: 'TRK999999999', description: 'Package record permanently deleted', event: 'Deletion', status: 'Success' },
  { id: 5, user: 'Operations Manager', date: '7/5/2024', entityType: 'consolidation', entityId: 'CONS-2024-001', description: 'Consolidation approved for shipment', event: 'Status Change', status: 'Success' },
];

const AdminAudit = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [logs] = useState<LogItem[]>(INITIAL_LOGS);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('Event');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [dateFilter, setDateFilter] = useState('Last 30 Days');

  // Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);

  // UI State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // --- LOGIC ---
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEvent = eventFilter === 'Event' || log.event === eventFilter;
      const matchesStatus = statusFilter === 'Status' || log.status === statusFilter;
      const matchesDate = true;

      return matchesSearch && matchesEvent && matchesStatus && matchesDate;
    });
  }, [logs, searchTerm, eventFilter, statusFilter]);

  const currentLogs = filteredLogs.slice(0, 5); // Show only 5 for screenshot match

  // Event color
  const getEventColor = (event: string) => {
    switch (event) {
      case 'Scan': return 'text-green-600';
      case 'Price Change': return 'text-purple-600';
      case 'Edit': return 'text-blue-600';
      case 'Deletion': return 'text-red-600';
      case 'Status Change': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleView = (log: LogItem) => {
    setSelectedLog(log);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedLog(null);
  };

  return (
    <>
      <Helmet>
        <title>Audit Logs | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 font-sans text-gray-800" onClick={() => setActiveDropdown(null)}>
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">Audit Logs</h1>
          <p className="text-gray-400 mt-1 text-[20px]">Complete system activity and change history</p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/admin-notifications')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
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
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Total Events</span>
            <div className="p-2 bg-gray-100 rounded-full text-gray-400"><FileText size={18} /></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">1200</h3>
          <p className="text-xs text-green-600">+12% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Critical Actions</span>
            <div className="p-2 bg-gray-100 rounded-full text-gray-400"><ShieldAlert size={18} /></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">3</h3>
          <p className="text-xs text-red-600">-3% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Failed Operations</span>
            <div className="p-2 bg-gray-100 rounded-full text-gray-400"><XCircle size={18} /></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">10</h3>
          <p className="text-xs text-red-600">-3% from last period</p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="bg-white rounded-3xl shadow-sm p-6 min-h-[500px] flex flex-col">
        
        {/* Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
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
                <div className="absolute top-full mt-2 left-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-1">
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
                <div className="absolute top-full mt-2 left-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-1">
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
                <div className="absolute top-full mt-2 left-0 w-40 bg-white shadow-xl rounded-xl border border-gray-100 z-10 py-1">
                  {['Last 30 Days', 'Last 7 Days', 'Last Year'].map(opt => (
                    <button key={opt} onClick={() => { setDateFilter(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

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
          <table className="w-full text-left rounded-3xl border-collapse">
            <thead className='bg-gray-100 '>
              <tr className="border-b border-gray-50">
                <th className="py-4 pl-4 text-xs font-normal ">User</th>
                <th className="py-4 text-xs font-normal ">Date</th>
                <th className="py-4 text-xs font-normal ">Entity</th>
                <th className="py-4 text-xs font-normal ">Description</th>
                <th className="py-4 text-xs font-normal ">Event</th>
                <th className="py-4 pr-4 text-xs font-normal  text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors group border-b border-gray-50 last:border-none">
                  <td className="py-5 pl-4 text-sm text-gray-700">{log.user}</td>
                  <td className="py-5 text-sm text-gray-500">{log.date}</td>
                  <td className="py-5">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700">{log.entityType}</span>
                      <span className="text-xs text-gray-400 font-mono">{log.entityId}</span>
                    </div>
                  </td>
                  <td className="py-5 text-sm text-gray-700 max-w-[250px]">{log.description}</td>
                  <td className={`py-5 text-sm font-medium ${getEventColor(log.event)}`}>
                    {log.event}
                  </td>
                  <td className="py-5 pr-4 text-right">
                    <button 
                      onClick={() => handleView(log)}
                      className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-6 mt-8 pt-4 border-t border-gray-50">
          <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors opacity-50 cursor-not-allowed">
            Previous
          </button>
          <button className="flex items-center gap-1 text-sm font-medium text-[#106F3E] hover:text-green-800 transition-colors">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* --- VIEW DETAILS MODAL --- */}
      {isViewModalOpen && selectedLog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6 backdrop-blur-sm" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-[28px] shadow-2xl w-full max-w-3xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Audit Details</h2>

            <div className="bg-[#F8F9FB] rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-700">
                <div>
                  <p className="text-sm md:text-sm text-gray-400 mb-2">User</p>
                  <p className="text-lg md:text-xl text-gray-900 font-medium">{selectedLog.user}</p>
                </div>

                <div>
                  <p className="text-sm md:text-sm text-gray-400 mb-2">Entity</p>
                  <p className="text-lg md:text-xl text-gray-900 font-medium">{selectedLog.entityType}</p>
                  <p className="text-sm text-gray-400 mt-2 font-mono">{selectedLog.entityId}</p>
                </div>

                <div className="md:col-span-1">
                  <p className="text-sm text-gray-400 mb-2">Description</p>
                  <p className="text-lg text-gray-900">{selectedLog.description}</p>
                </div>

                <div className="md:col-span-1">
                  <p className="text-sm text-gray-400 mb-2">Date</p>
                  <p className="text-lg text-gray-900 font-medium">{selectedLog.date}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Status</p>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-base font-medium ${
                  selectedLog.event === 'Scan' || selectedLog.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>{selectedLog.event}</span>
              </div>

              <div>
                <button onClick={closeModal} className="text-[#106F3E] font-medium text-base">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminAudit;