import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  RefreshCw, 
  X,
  Eye,
  EyeOff
} from 'lucide-react';

import { Helmet } from 'react-helmet';

// --- TYPES ---
interface Integration {
  id: string;
  name: string;
  lastSync: string; 
  totalRequests: number;
  errors: number;
}

interface Log {
  id: number;
  title: string;
  description: string;
  time: string;
}

// --- MOCK DATA (Matches Screenshot Numbers) ---
const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'usps', name: 'USPS Tracking API', lastSync: '2 minutes ago', totalRequests: 1247, errors: 3 },
  { id: 'fedex', name: 'FedEx API', lastSync: '5 minutes ago', totalRequests: 892, errors: 0 },
  { id: 'dhl', name: 'DHL Express', lastSync: '1 minute ago', totalRequests: 654, errors: 1 },
  { id: 'ups', name: 'UPS Integration', lastSync: '2 minutes ago', totalRequests: 1247, errors: 45 }, // High errors
  { id: 'stripe', name: 'Stripe Payments', lastSync: '5 minutes ago', totalRequests: 892, errors: 0 },
];

const INITIAL_LOGS: Log[] = [
  { id: 1, title: 'USPS Tracking API - Rate fetch successful', description: 'Retrieved 45 tracking updates', time: '1 min ago' },
  { id: 2, title: 'USPS Tracking API - Rate fetch successful', description: 'Retrieved 45 tracking updates', time: '13 min ago' },
  { id: 3, title: 'USPS Tracking API - Rate fetch successful', description: 'Retrieved 45 tracking updates', time: '20 min ago' },
];

const AdminApi = () => {
  const navigate = useNavigate();
  // --- STATE ---
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  
  // Modal State
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState<Integration | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  // --- HANDLERS ---

  // 1. Sync Handler (Updates Card & Adds Log)
  const handleSync = (id: string) => {
    setSyncingId(id);
    
    // Simulate network delay
    setTimeout(() => {
      // Update the specific API card
      setIntegrations(prev => prev.map(item => 
        item.id === id 
        ? { 
            ...item, 
            lastSync: 'Just now', 
            totalRequests: item.totalRequests + 15 // Simulate new requests
          } 
        : item
      ));

      // Add a new log entry
      const apiName = integrations.find(i => i.id === id)?.name || 'API';
      const newLog: Log = {
        id: Date.now(),
        title: `${apiName} - Manual sync completed`,
        description: 'Data refreshed successfully',
        time: 'Just now'
      };
      setLogs(prev => [newLog, ...prev]);

      setSyncingId(null);
    }, 1200);
  };

  // 2. Configuration Handlers
  const handleConfigure = (api: Integration) => {
    setSelectedApi(api);
    setShowApiKey(false); // Reset visibility
    setIsConfigOpen(true);
  };

  const handleSaveConfig = () => {
    setIsConfigOpen(false);
    // In a real app, you would save the autoSyncEnabled state to backend here
    alert(`Configuration for ${selectedApi?.name} saved!`);
  };

  return (
    <>
      <Helmet>
        <title>API Integrations | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">API Integrations</h1>
          <p className="text-gray-400 mt-1 text-[20px]">Monitor and manage external API connections</p>
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

      {/* --- API CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {integrations.map((api) => (
          <div key={api.id} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-gray-100 transition-all">
            
            {/* Card Header */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-700">{api.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Last sync: <span className={api.lastSync === 'Just now' ? 'text-green-600 font-medium' : ''}>{api.lastSync}</span></p>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                <span className="text-xs text-gray-400 block mb-1">Total Requests</span>
                <span className="text-xl font-bold text-gray-700">{api.totalRequests.toLocaleString()}</span>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                <span className="text-xs text-gray-400 block mb-1">Errors</span>
                {/* Logic for RED text if errors > 0 */}
                <span className={`text-xl font-bold ${api.errors > 0 ? 'text-red-500' : 'text-gray-700'}`}>
                  {api.errors}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => handleConfigure(api)}
                className="flex-1 bg-[#106F3E] hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm active:scale-95"
              >
                Configure
              </button>
              <button 
                onClick={() => handleSync(api.id)}
                className="w-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors border border-gray-100 active:bg-gray-200"
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
        
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-default animate-fadeIn">
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-all scale-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Configure {selectedApi.name}</h3>
              <button onClick={() => setIsConfigOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
               {/* API Key Field */}
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">API Key</label>
                  <div className="relative">
                    <input 
                        type={showApiKey ? "text" : "password"} 
                        value="sk_live_51Mz92...x8Y2" 
                        readOnly 
                        className="w-full p-3 bg-gray-50 rounded-xl text-gray-600 text-sm outline-none border border-transparent focus:bg-white focus:border-[#106F3E] transition-all pr-10 font-mono" 
                    />
                    <button 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showApiKey ? <EyeOff size={16}/> : <Eye size={16} />}
                    </button>
                  </div>
               </div>
               
               {/* Auto-Sync Toggle */}
               <div 
                    onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
               >
                  <div>
                    <p className="text-sm font-bold text-gray-700">Auto-Sync</p>
                    <p className="text-xs text-gray-400">Sync data automatically every 15 mins</p>
                  </div>
                  {/* Custom Toggle Switch */}
                  <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${autoSyncEnabled ? 'bg-[#106F3E]' : 'bg-gray-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200 ${autoSyncEnabled ? 'left-[22px]' : 'left-[2px]'}`}></div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
               <button 
                    onClick={() => setIsConfigOpen(false)} 
                    className="px-5 py-2.5 text-gray-500 font-medium hover:text-gray-700 hover:bg-gray-100 rounded-xl text-sm transition-colors"
               >
                    Cancel
               </button>
               <button 
                    onClick={handleSaveConfig} 
                    className="px-5 py-2.5 bg-[#106F3E] text-white font-medium rounded-xl text-sm shadow-md shadow-green-100 hover:bg-green-800 active:scale-95 transition-all"
               >
                    Save Changes
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
    </>
  );
};

export default AdminApi;