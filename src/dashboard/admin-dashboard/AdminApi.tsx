import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  RefreshCw, 
  Activity, 
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

// --- TYPES ---
interface Integration {
  id: string;
  name: string;
  lastSync: string; // e.g., "2 minutes ago"
  totalRequests: number;
  errors: number;
  status: 'active' | 'issue';
}

interface Log {
  id: number;
  title: string;
  description: string;
  time: string;
}

// --- MOCK DATA ---
const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'usps', name: 'USPS Tracking API', lastSync: '2 minutes ago', totalRequests: 1247, errors: 3, status: 'active' },
  { id: 'fedex', name: 'FedEx API', lastSync: '5 minutes ago', totalRequests: 892, errors: 0, status: 'active' },
  { id: 'dhl', name: 'DHL Express', lastSync: '1 minute ago', totalRequests: 654, errors: 1, status: 'active' },
  { id: 'ups', name: 'UPS Integration', lastSync: '2 minutes ago', totalRequests: 1247, errors: 45, status: 'issue' },
  { id: 'stripe', name: 'Stripe Payments', lastSync: '5 minutes ago', totalRequests: 892, errors: 0, status: 'active' },
];

const INITIAL_LOGS: Log[] = [
  { id: 1, title: 'USPS Tracking API - Rate fetch successful', description: 'Retrieved 45 tracking updates', time: '1 min ago' },
  { id: 2, title: 'USPS Tracking API - Rate fetch successful', description: 'Retrieved 45 tracking updates', time: '13 min ago' },
  { id: 3, title: 'USPS Tracking API - Rate fetch successful', description: 'Retrieved 45 tracking updates', time: '20 min ago' },
];

const AdminApi = () => {
  // --- STATE ---
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  
  // Modal State
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState<Integration | null>(null);

  // --- HANDLERS ---
  const handleSync = (id: string) => {
    setSyncingId(id);
    
    // Simulate network request
    setTimeout(() => {
      setIntegrations(prev => prev.map(item => 
        item.id === id ? { ...item, lastSync: 'Just now', totalRequests: item.totalRequests + 1 } : item
      ));
      setSyncingId(null);
    }, 1500);
  };

  const handleConfigure = (api: Integration) => {
    setSelectedApi(api);
    setIsConfigOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">API Integrations</h1>
          <p className="text-gray-400 mt-1">Monitor and manage external API connections</p>
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

      {/* --- API CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {integrations.map((api) => (
          <div key={api.id} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-gray-100 transition-all">
            
            {/* Card Header */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-700">{api.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Last sync: {api.lastSync}</p>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                <span className="text-xs text-gray-400 block mb-1">Total Requests</span>
                <span className="text-xl font-bold text-gray-700">{api.totalRequests.toLocaleString()}</span>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                <span className="text-xs text-gray-400 block mb-1">Errors</span>
                <span className={`text-xl font-bold ${api.errors > 0 ? 'text-red-500' : 'text-gray-700'}`}>
                  {api.errors}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => handleConfigure(api)}
                className="flex-1 bg-[#106F3E] hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm"
              >
                Configure
              </button>
              <button 
                onClick={() => handleSync(api.id)}
                className="w-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors border border-gray-100"
                disabled={syncingId === api.id}
              >
                <RefreshCw size={18} className={syncingId === api.id ? 'animate-spin text-[#106F3E]' : ''} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- RECENT SYNC LOGS --- */}
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold text-gray-700 mb-6">Recent Sync Logs</h2>
        
        <div className="space-y-4">
          {INITIAL_LOGS.map((log) => (
            <div key={log.id} className="flex items-start justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-default">
              <div>
                <h4 className="font-bold text-gray-700 text-sm mb-1">{log.title}</h4>
                <p className="text-xs text-gray-400">{log.description}</p>
              </div>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- CONFIGURE MODAL --- */}
      {isConfigOpen && selectedApi && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Configure {selectedApi.name}</h3>
              <button onClick={() => setIsConfigOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">API Key</label>
                  <input type="password" value="************************" readOnly className="w-full p-3 bg-gray-50 rounded-xl text-gray-600 text-sm outline-none border border-transparent focus:bg-white focus:border-[#106F3E] transition-all" />
               </div>
               
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-gray-700">Auto-Sync</p>
                    <p className="text-xs text-gray-400">Sync data automatically every 15 mins</p>
                  </div>
                  <div className="w-10 h-6 bg-[#106F3E] rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
               <button onClick={() => setIsConfigOpen(false)} className="px-5 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-lg text-sm">Cancel</button>
               <button onClick={() => { setIsConfigOpen(false); alert('Settings Saved'); }} className="px-5 py-2 bg-[#106F3E] text-white font-medium rounded-lg text-sm shadow-md hover:bg-green-800">Save Changes</button>
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

export default AdminApi;