import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronDown } from 'lucide-react';

// ১. এখানে MenuItem এর টাইপ ডিফাইন করা হলো
interface MenuItem {
  label: string;
  path: string;
}

const WarehouseDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("Intake / Receiving");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  const menuItems: MenuItem[] = [
    { label: "Intake / Receiving", path: "/waehouse/intake" },
    { label: "Scanning Center", path: "/waehouse/ScanningCenter" },
    { label: "In-Warehouse Packages", path: "/waehouse/inwarehousepackages" },
    { label: "Pending Review", path: "/waehouse/pendingreview" },
    { label: "Ready for Consolidation", path: "/waehouse/readyforconsolidation" },
    { label: "Ready for Shipment", path: "/waehouse/readyforshipment" }
  ];

  // ২. এখানে (item: MenuItem) বলে দেওয়া হয়েছে
  const handleNavigation = (item: MenuItem) => {
    setActiveTab(item.label); 
    navigate(item.path);      
  };

  return (
    <div className="w-full bg-[#f6f6f6] p-4">
      {/* SECTION 1: THE GREEN PART */}
      <header className="bg-[#005e2b] rounded-[10px] px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <h1 className="text-[#f18a21] text-2xl font-extrabold tracking-tighter">
            EXPRESUR
          </h1>
          <div className="h-6 w-[1px] bg-white/30 mx-5"></div>
          <h2 className="text-white text-lg font-medium">
            Warehouse Operations
          </h2>
        </div>

        <div className="flex items-center text-white space-x-6">
          <button className="flex items-center space-x-1 hover:opacity-80 transition">
            <span className="text-lg font-normal">Supervisor</span>
            <ChevronDown size={20} strokeWidth={2} />
          </button>
          <div className="h-6 w-[1px] bg-white/30"></div>
          <button onClick={handleLogout} className="flex items-center space-x-2 hover:opacity-80 transition">
            <Settings size={22} strokeWidth={2} />
            <span className="text-lg font-normal">Logout</span>
          </button>
        </div>
      </header>

      {/* SECTION 2: THE MENU PART */}
      <nav className="mt-4">
        <ul className="flex items-center justify-between w-full p-4 bg-white rounded-[10px] shadow-sm">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavigation(item)}
                className={`text-lg font-bold transition-colors duration-200 ${
                  activeTab === item.label 
                    ? "text-[#f18a21]" 
                    : "text-[#005e2b] hover:text-[#f18a21]"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default WarehouseDashboard;