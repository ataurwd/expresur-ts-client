import React, { useState } from 'react';
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
  Clock // Added for time icon
} from 'lucide-react';

interface ModeConfigType {
  label: string;
  Icon: LucideIcon;
  colorClass: string;
  prefix: string;
  listLabel: string;
}

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

const NAMES = ['John Martinez', 'Sarah Connor', 'Kyle Reese', 'Rick Deckard', 'Ellen Ripley'];
const CITIES = ['Cuba - Havana', 'USA - New York', 'Japan - Tokyo', 'UK - London', 'Germany - Berlin'];

const AdminQrCode = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<string>('package');
  const [inputCode, setInputCode] = useState('');

  const [history, setHistory] = useState([
    {
      id: 'PKG-2024-987654',
      type: 'package',
      customer: 'John Martinez',
      destination: 'Cuba - Havana',
      weight: '2.5 kg',
      time: '9:15:17 AM',
    },
    {
      id: 'CONT-MARITIME-2024-0123',
      type: 'container',
      customer: 'John Martinez',
      destination: 'Cuba - Havana',
      weight: '500 kg',
      time: '9:15:17 AM',
    },
    {
      id: 'DEL-2024-321098',
      type: 'delivery',
      customer: 'Kyle Reese',
      destination: 'Japan - Tokyo',
      weight: '15.7 kg',
      time: '11:28:33 AM',
    },
    {
      id: 'CONT-MARITIME-2024-0123',
      type: 'container',
      customer: 'Ellen Ripley',
      destination: 'Germany - Berlin',
      weight: '1200 kg',
      time: '12:05:50 PM',
    }
  ]);

  const getCount = (typeKey: string) => history.filter(h => h.type === typeKey).length;

  const handleScan = () => {
    let finalCode = inputCode.trim();
    if (!finalCode) {
      const prefix = MODE_CONFIG[activeMode]?.prefix || 'SCAN';
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      finalCode = `${prefix}-2024-${randomNum}`;
    }

    const randomCustomer = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomWeight = (Math.random() * 10 + 0.5).toFixed(1) + ' kg';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    const newEntry = {
      id: finalCode,
      type: activeMode,
      customer: randomCustomer,
      destination: randomCity,
      weight: randomWeight,
      time: currentTime,
    };

    setHistory([newEntry, ...history]);
    setInputCode('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Scanning Center</h1>
          <p className="text-gray-400 mt-1">Scan packages, bags, containers, and deliveries</p>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scan Mode Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-gray-500 mb-4">Scan Mode</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(MODE_CONFIG).map((key) => {
                const config = MODE_CONFIG[key];
                const isActive = activeMode === key;
                const IconComponent = config.Icon;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveMode(key)}
                    className={`flex flex-col items-center justify-center py-8 px-4 rounded-xl border-2 transition-all duration-200 ${
                      isActive
                        ? 'border-orange-300 bg-white shadow-md transform scale-[1.02]'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`mb-3 ${isActive ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                      {config.label}
                    </span>
                    <div className={isActive ? 'text-gray-800' : 'text-gray-400'}>
                      <IconComponent size={32} strokeWidth={isActive ? 1.5 : 2} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <h2 className="text-gray-500 mb-2">Scan or Enter Code</h2>
              <div className="flex gap-3">
                <input
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

          {/* Updated Scan History */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-500">Scan History ({history.length})</h2>
              <button
                onClick={() => setHistory([])}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Clear History
              </button>
            </div>

            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-12 text-gray-300">
                  <Scan size={48} className="mx-auto mb-2 opacity-20" />
                  <p>No scans yet today</p>
                </div>
              ) : (
                history.map((item, index) => {
                  const config = MODE_CONFIG[item.type] || MODE_CONFIG['package'];
                  const IconComponent = config.Icon;

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-2xl p-6 flex items-start gap-5 animate-fadeIn"
                    >
                      {/* Left Icon */}
                      <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <IconComponent size={24} className="text-gray-500" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* ID + Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl font-bold text-gray-900">{item.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.colorClass}`}>
                            {config.label}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-gray-600">
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Customer:</span> {item.customer}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Destination:</span> {item.destination}
                          </p>
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
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Quick Stats Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center h-[380px] relative transition-colors">
            <h2 className="text-gray-500 w-full text-left">Quick Stats</h2>
            <div className="mt-8">
              <p className="text-gray-500 mb-2">Today's Scans</p>
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

          {/* Scan Types List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-gray-100 rounded text-gray-400">
                <Scan size={16} />
              </div>
              <h2 className="text-gray-600 font-medium">Scan Types</h2>
            </div>
            <div className="space-y-4">
              {Object.keys(MODE_CONFIG).map(key => (
                <div key={key} className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    {MODE_CONFIG[key].listLabel}
                  </span>
                  <span className="text-gray-800 font-bold bg-gray-50 px-2 py-1 rounded min-w-[30px] text-center">
                    {getCount(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
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
  );
};

export default AdminQrCode;