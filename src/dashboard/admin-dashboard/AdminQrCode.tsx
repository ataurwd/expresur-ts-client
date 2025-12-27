import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Database,
  Truck,
  Bell,
  Scan,
  Box,
  QrCode,
  LucideIcon,
  Clock,
  X,
  Trash2,
  Filter,
  ListFilter
} from 'lucide-react';
import { Helmet } from 'react-helmet';

// --- Interfaces ---
interface ModeConfigType {
  label: string;
  Icon: LucideIcon;
  colorClass: string;
  prefix: string;
  listLabel: string;
}

interface ScanHistoryItem {
  id: string;
  type: string;
  customer: string;
  destination: string;
  weight: string;
  time: string;
  timestamp: number;
}

// --- Configuration ---
const MODE_CONFIG: Record<string, ModeConfigType> = {
  package: {
    label: 'Package',
    Icon: Box,
    colorClass: 'bg-green-100 text-green-700',
    prefix: 'PKG',
    listLabel: 'Packages'
  },
  bag: {
    label: 'Bag',
    Icon: ShoppingBag,
    colorClass: 'bg-blue-100 text-blue-700',
    prefix: 'BAG',
    listLabel: 'Bags'
  },
  container: {
    label: 'Container',
    Icon: Database,
    colorClass: 'bg-purple-100 text-purple-700',
    prefix: 'CONT',
    listLabel: 'Containers'
  },
  delivery: {
    label: 'Delivery',
    Icon: Truck,
    colorClass: 'bg-orange-100 text-orange-700',
    prefix: 'DEL',
    listLabel: 'Deliveries'
  }
};

const NAMES = ['John Martinez', 'Sarah Connor', 'Kyle Reese', 'Rick Deckard', 'Ellen Ripley', 'Bruce Wayne'];
const CITIES = ['Cuba - Havana', 'USA - New York', 'Japan - Tokyo', 'UK - London', 'Germany - Berlin', 'France - Paris'];

const AdminQrCode = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [activeMode, setActiveMode] = useState<string>('package');
  const [isFilterActive, setIsFilterActive] = useState<boolean>(true); // New State for filtering logic
  const [inputCode, setInputCode] = useState('');
  
  // Load initial history
  const [history, setHistory] = useState<ScanHistoryItem[]>(() => {
    const saved = localStorage.getItem('scanHistory');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'PKG-2024-987654',
        type: 'package',
        customer: 'John Martinez',
        destination: 'Cuba - Havana',
        weight: '2.5 kg',
        time: '9:15:17 AM',
        timestamp: Date.now()
      },
      {
        id: 'BAG-2024-555555',
        type: 'bag',
        customer: 'Sarah Connor',
        destination: 'USA - Los Angeles',
        weight: '1.2 kg',
        time: '10:30:00 AM',
        timestamp: Date.now() - 1000
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('scanHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history, activeMode]);

  // --- Logic to Handle Mode Selection ---
  const handleModeClick = (key: string) => {
    if (activeMode === key) {
      // If clicking the SAME button again, toggle the filter (On/Off)
      setIsFilterActive(!isFilterActive);
    } else {
      // If clicking a NEW button, switch mode and turn ON filter
      setActiveMode(key);
      setIsFilterActive(true);
    }
  };

  // --- Logic to Filter History ---
  // If isFilterActive is true, show only activeMode items. If false, show ALL.
  const filteredHistory = isFilterActive 
    ? history.filter(item => item.type === activeMode)
    : history;

  const getCount = (typeKey: string) => history.filter(h => h.type === typeKey).length;

  const handleScan = () => {
    let finalCode = inputCode.trim();
    const config = MODE_CONFIG[activeMode];
    
    if (!finalCode) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      finalCode = `${config.prefix}-2024-${randomNum}`;
    }

    const randomCustomer = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomWeight = (Math.random() * 10 + 0.5).toFixed(1) + ' kg';
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    const newEntry: ScanHistoryItem = {
      id: finalCode,
      type: activeMode,
      customer: randomCustomer,
      destination: randomCity,
      weight: randomWeight,
      time: currentTime,
      timestamp: now.getTime()
    };

    setHistory(prev => [newEntry, ...prev]);
    setInputCode('');
    // When scanning new item, auto-enable filter to show what was just scanned?
    // Optional: setIsFilterActive(true); 
  };

  const deleteItem = (timestamp: number) => {
    setHistory(prev => prev.filter(item => item.timestamp !== timestamp));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <>
      <Helmet>
        <title>QR Scanning Center | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[30px] font-bold text-gray-900">QR Scanning Center</h1>
          <p className=" text-[18px] text-gray-400 mt-1">Scan packages, bags, containers, and deliveries</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/admin-notifications')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400">
            <Bell size={20} />
          </button>
          <div onClick={() => navigate('/dashboard/admin-notifications')} className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion"
              alt="Profile"
              className="w-10 h-10 rounded-full bg-green-100"
            />
            <div className="text-sm">
              <p className="font-bold text-gray-900 leading-tight">Tyrion Lannister</p>
              <p className="text-gray-400 text-xs">tyrion@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Scan Mode Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-500">Scan Mode</h2>
              <span className={`text-xs px-2 py-1 rounded ${isFilterActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {isFilterActive ? 'Filtering ON' : 'Showing ALL History'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(MODE_CONFIG).map((key) => {
                const config = MODE_CONFIG[key];
                // Button is active if it's the scanning mode.
                // We add visual cue if it's also filtering.
                const isActiveMode = activeMode === key;
                const IconComponent = config.Icon;

                return (
                  <button
                    key={key}
                    onClick={() => handleModeClick(key)}
                    className={`flex flex-col items-center justify-center py-8 px-4 rounded-xl border-2 transition-all duration-200 ${
                      isActiveMode
                        ? 'border-orange-300 bg-white shadow-md transform scale-[1.02]'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    } relative`}
                  >
                    {/* Visual indicator dot if this mode is actively filtering */}
                    {isActiveMode && isFilterActive && (
                       <span className="absolute top-3 right-3 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                    )}

                    <span className={`mb-3 ${isActiveMode ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                      {config.label}
                    </span>
                    <div className={isActiveMode ? 'text-gray-800' : 'text-gray-400'}>
                      <IconComponent size={32} strokeWidth={isActiveMode ? 1.5 : 2} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <h2 className="text-gray-500 mb-2">Scan or Enter Code</h2>
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Scan ${MODE_CONFIG[activeMode]?.label || 'package'} code..`}
                  className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all placeholder:text-gray-300"
                />
                <button
                  onClick={handleScan}
                  className="bg-[#106F3E] hover:bg-green-800 active:scale-95 text-white font-medium px-8 py-3 rounded-lg transition-all shadow-sm flex items-center gap-2"
                >
                  Scan
                </button>
              </div>
            </div>
          </div>

          {/* Scan History (Dynamic Header) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-gray-500">
                  {isFilterActive ? `${MODE_CONFIG[activeMode].label} History` : 'All History'}
                </h2>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {filteredHistory.length}
                </span>
                
                {/* Visual icon to show if filtered */}
                {isFilterActive ? (
                  <Filter size={16} className="text-orange-400 ml-1" />
                ) : (
                  <ListFilter size={16} className="text-gray-300 ml-1" />
                )}
              </div>
              
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} /> Clear All
                </button>
              )}
            </div>

            <div className="space-y-4">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-300">
                  <Scan size={48} className="mx-auto mb-2 opacity-20" />
                  <p>No {isFilterActive ? MODE_CONFIG[activeMode].label.toLowerCase() : ''} scans found</p>
                </div>
              ) : (
                filteredHistory.map((item) => {
                  const config = MODE_CONFIG[item.type] || MODE_CONFIG['package'];
                  const IconComponent = config.Icon;

                  return (
                    <div
                      key={item.timestamp}
                      className="bg-gray-50 rounded-2xl p-6 flex items-start gap-5 animate-fadeIn group relative"
                    >
                       <button 
                         onClick={() => deleteItem(item.timestamp)}
                         className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                         title="Remove item"
                       >
                         <X size={18} />
                       </button>

                      <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <IconComponent size={24} className="text-gray-500" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl font-bold text-gray-900">{item.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.colorClass}`}>
                            {config.label}
                          </span>
                        </div>

                        <div className="space-y-2 text-gray-600">
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Customer:</span> {item.customer}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Destination:</span> {item.destination}
                          </p>
                          <div className="flex gap-4">
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">Weight:</span> {item.weight}
                            </p>
                            <p className="text-sm flex items-center gap-2 text-gray-500">
                              <Clock size={14} />
                              {item.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center h-[380px] relative transition-colors">
            <h2 className="text-gray-500 w-full text-left">Quick Stats</h2>
            <div className="mt-8">
              <p className="text-gray-500 mb-2">Total Scans</p>
              <p className="text-6xl font-bold text-gray-800 tracking-tight">{history.length}</p>
            </div>
            <div className="mt-8 mb-auto text-gray-200">
              <QrCode size={80} strokeWidth={0.5} />
            </div>
            <div className="w-full bg-[#106F3E] text-white py-4 rounded-xl mt-auto shadow-md">
              <p className="text-xs opacity-80 mb-1 uppercase tracking-wider">Current Mode</p>
              <p className="text-2xl font-bold capitalize">{activeMode}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-gray-100 rounded text-gray-400">
                <Scan size={16} />
              </div>
              <h2 className="text-gray-600 font-medium">Scan Types</h2>
            </div>
            <div className="space-y-4">
              {Object.keys(MODE_CONFIG).map(key => (
                <div 
                  key={key} 
                  onClick={() => handleModeClick(key)}
                  className={`flex justify-between items-center group cursor-pointer p-2 rounded ${activeMode === key ? 'bg-gray-50' : ''}`}
                >
                  <span className={`transition-colors ${activeMode === key ? 'text-gray-900 font-medium' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {MODE_CONFIG[key].listLabel}
                  </span>
                  <span className={`font-bold px-2 py-1 rounded min-w-[30px] text-center ${activeMode === key ? 'bg-white shadow-sm text-gray-900' : 'bg-gray-50 text-gray-800'}`}>
                    {getCount(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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

export default AdminQrCode;