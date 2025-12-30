import React from 'react';
import { Outlet } from "react-router-dom";
import WarehouseDashboard from '../dashboard/Warhouse-operations/warhouseDashord'; // তোমার এই ফাইলটি ইমপোর্ট করো

const Waehouse = () => {
    
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
            
            {/* ১. ড্যাশবোর্ড মেনু (এটি সব পেজে ফিক্সড থাকবে) */}
            <div className="w-full sticky top-0 z-50">
               <WarehouseDashboard />
            </div>

            {/* ২. আউটলেট: এখানে Intake, Scanning বা অন্য পেজগুলো লোড হবে */}
            <div className="flex-1 w-full p-4">
                <Outlet />
            </div>
            
        </div>
    );
};

export default Waehouse;