import React, { useState } from 'react';
import { Settings, ChevronDown } from 'lucide-react';

const WarehouseDashboard = () => {
  const [activeTab, setActiveTab] = useState("Intake / Receiving");

  const menuItems = [
    "Intake / Receiving",
    "Scanning Center",
    "In-Warehouse Packages",
    "Pending Review",
    "Ready for Consolidation",
    "Ready for Shipment"
  ];

  return (
    <div className="w-full bg-white p-4">
      {/* SECTION 1: THE GREEN PART (Sidebar.png) */}
      <header className="bg-[#005e2b] rounded-[10px] px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          {/* Logo with specific orange and font weight */}
          <h1 className="text-[#f18a21] text-2xl font-extrabold tracking-tighter">
            EXPRESUR
          </h1>
          
          {/* Subtle separator */}
          <div className="h-6 w-[1px] bg-white/30 mx-5"></div>
          
          <h2 className="text-white text-lg font-medium">
            Warehouse Operations
          </h2>
        </div>

        <div className="flex items-center text-white space-x-6">
          {/* User Section */}
          <button className="flex items-center space-x-1 hover:opacity-80 transition">
            <span className="text-lg font-normal">Supervisor</span>
            <ChevronDown size={20} strokeWidth={2} />
          </button>
          
          <div className="h-6 w-[1px] bg-white/30"></div>
          
          {/* Logout Section with Gear Icon */}
          <button className="flex items-center space-x-2 hover:opacity-80 transition">
            <Settings size={22} strokeWidth={2} />
            <span className="text-lg font-normal">Logout</span>
          </button>
        </div>
      </header>

      {/* SECTION 2: THE MENU PART (Logo.png) */}
      <nav className="mt-4 px-4">
        <ul className="flex items-center justify-between w-full">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveTab(item)}
                className={`text-lg font-bold transition-colors duration-200 ${
                  activeTab === item 
                    ? "text-[#f18a21]" // Active Orange from Logo.png
                    : "text-[#005e2b] hover:text-[#f18a21]" // Forest Green from Logo.png
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default WarehouseDashboard;