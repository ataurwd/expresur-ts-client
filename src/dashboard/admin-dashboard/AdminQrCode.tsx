import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Database, 
  Truck, 
  Bell, 
  Scan, 
  Box,
  QrCode,
  LucideIcon // Import the type for the icons
} from 'lucide-react';

// Define the shape of our config
interface ModeConfigType {
  label: string;
  Icon: LucideIcon; // Store the component reference, not JSX
  colorClass: string;
  prefix: string;
  listLabel: string;
}

// Configuration for each Scan Mode
const MODE_CONFIG: Record<string, ModeConfigType> = {
  package: {
    label: 'Package',
    Icon: Box, // Just the name of the component
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
  // --- STATE ---
  const [activeMode, setActiveMode] = useState<string>('package');
  const [inputCode, setInputCode] = useState('');
  
  // Initial Mock Data
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
    }
  ]);

  // --- LOGIC ---

  // Calculate counts dynamically
  const getCount = (typeKey: string) => history.filter(h => h.type === typeKey).length;

  const handleScan = () => {
    // 1. Generate ID if input is empty or use input
    let finalCode = inputCode.trim();
    if (!finalCode) {
        // Safe access to prefix
        const prefix = MODE_CONFIG[activeMode]?.prefix || 'SCAN';
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        finalCode = `${prefix}-2025-${randomNum}`;
    }

    // 2. Generate random details
    const randomCustomer = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomWeight = (Math.random() * 10).toFixed(1) + ' kg';
    const currentTime = new Date().toLocaleTimeString();

    // 3. Create new Entry
    const newEntry = {
      id: finalCode,
      type: activeMode,
      customer: randomCustomer,
      destination: randomCity,
      weight: randomWeight,
      time: currentTime,
    };

    // 4. Update State (Add to top)
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
      
      {/* --- Header --- */}
      <div className=" mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Scanning Center</h1>
          <p className="text-gray-400 mt-1">Scan packages, bags, containers, and deliveries</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400">
            <Bell size={20} />
          </button>
          <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
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

      {/* --- Main Grid --- */}
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Scan Mode Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-gray-500 mb-4">Scan Mode</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(MODE_CONFIG).map((key) => {
                const config = MODE_CONFIG[key];
                const isActive = activeMode === key;
                const IconComponent = config.Icon; // Access the component
                
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
                        {/* Render Component directly with props */}
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

          {/* Scan History */}
          <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-gray-500">Scan History ({history.length})</h2>
                 <button 
                    onClick={() => setHistory([])}
                    className="text-xs text-red-400 hover:text-red-600"
                 >
                    Clear History
                 </button>
            </div>
           
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-center py-12 text-gray-300">
                    <Scan size={48} className="mx-auto mb-2 opacity-20" />
                    <p>No scans yet today</p>
                </div>
              ) : (
                history.map((item, index) => {
                    const config = MODE_CONFIG[item.type] || MODE_CONFIG['package'];
                    const IconComponent = config.Icon; // Access the component

                    return (
                        <div key={index} className="bg-[#F8F9FB] p-5 rounded-xl flex items-start gap-4 animate-fadeIn">
                        <div className="p-3 bg-white rounded-full shadow-sm text-gray-400">
                            {/* Render icon directly */}
                            <IconComponent size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-700 text-lg break-all">{item.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium uppercase tracking-wide ${config.colorClass}`}>
                                {config.label}
                            </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm text-gray-400">
                            <p><span className="font-medium text-gray-500">Customer:</span> {item.customer}</p>
                            <p><span className="font-medium text-gray-500">Destination:</span> {item.destination}</p>
                            <p><span className="font-medium text-gray-500">Weight:</span> {item.weight}</p>
                            <p className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-[8px]">L</span>
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

        {/* RIGHT COLUMN (1/3 width) */}
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
                {Object.keys(MODE_CONFIG).map(key => {
                    const modeKey = key;
                    return (
                        <div key={key} className="flex justify-between items-center group">
                            <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                {MODE_CONFIG[modeKey].listLabel}
                            </span>
                            <span className="text-gray-800 font-bold bg-gray-50 px-2 py-1 rounded min-w-[30px] text-center">
                                {getCount(modeKey)}
                            </span>
                        </div>
                    )
                })}
            </div>
          </div>

        </div>
      </div>
      
      {/* Simple Fade In Animation Style */}
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