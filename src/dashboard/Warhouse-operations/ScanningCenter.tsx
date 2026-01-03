import React from 'react';
import { Helmet } from 'react-helmet';
import { Package, ShoppingBag, Database, QrCode, Truck, CheckCircle2, XCircle, Clock } from 'lucide-react';

// Define the interface for the StatusButton props
interface StatusButtonProps {
    icon: React.ReactNode;
    label: string;
    color: string;
}

const ScanningCenter: React.FC = () => {
    const scanCards = [
        { title: "Scan Package", icon: <Package size={18} className="text-gray-400" />, placeholder: "Enter package code.." },
        { title: "Scan Bags", icon: <ShoppingBag size={18} className="text-gray-400" />, placeholder: "Enter bag code.." },
        { title: "Scan Containers", icon: <Database size={18} className="text-gray-400" />, placeholder: "Enter container code.." },
    ];

    const warehouseData = [
        { id: "ORD-1001", status: "Assigned", color: "text-purple-600", bg: "bg-purple-50", icon: <Package size={14} />, locker: "LCK-127A" },
        { id: "ORD-1002", status: "Pending", color: "text-orange-500", bg: "bg-orange-50", icon: <Clock size={14} />, locker: "LCK-127A" },
        { id: "ORD-1003", status: "In Transit", color: "text-blue-500", bg: "bg-blue-50", icon: <Truck size={14} />, locker: "LCK-127A" },
    ];

    return (
        <div className="w-full min-h-screen p-8 font-sans">
            <Helmet>
                <title>Scanning Center — Warehouse</title>
            </Helmet>
            {/* Page Title Section */}
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-[#333] tracking-tight">Scanning Center</h1>
                <p className="text-gray-400 text-[15px] mt-1">Scan packages, bags, and containers</p>
            </div>

            {/* Top Scanning Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {scanCards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-gray-50 rounded-full">{card.icon}</div>
                            <h3 className="text-[#555] font-medium text-lg">{card.title}</h3>
                        </div>
                        
                        <div className="w-full h-40 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center bg-[#fafafa] mb-4">
                            <QrCode size={40} className="text-gray-300 opacity-50" />
                        </div>

                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder={card.placeholder}
                                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <button className="bg-[#045d2d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#034d25] transition-colors">
                                Scan
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Details & Status Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left: Current Scanning Details */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-[#555] font-bold text-xl mb-6">Current Scanning Details</h3>
                    <div className="mb-2">
                        <span className="text-gray-500 font-medium">Package ID - </span>
                        <span className="text-gray-400 font-medium">PKG-2024-987654</span>
                    </div>
                    <div className="mb-8">
                        <span className="text-gray-500 font-medium">Status - </span>
                        <span className="text-blue-500 font-medium">In Transit</span>
                    </div>

                    <h4 className="text-[#555] font-bold text-lg mb-4">Update Status</h4>
                    <div className="flex flex-wrap gap-3">
                        <StatusButton icon={<Package size={16}/>} label="Assigned" color="bg-purple-50 text-purple-600 border-purple-100" />
                        <StatusButton icon={<Clock size={16}/>} label="Pending" color="bg-orange-50 text-orange-500 border-orange-100" />
                        <StatusButton icon={<Truck size={16}/>} label="In Transit" color="bg-blue-50 text-blue-600 border-blue-100" />
                        <StatusButton icon={<XCircle size={16}/>} label="Cancelled" color="bg-red-50 text-red-400 border-red-100" />
                        <StatusButton icon={<CheckCircle2 size={16}/>} label="Delivered" color="bg-green-50 text-green-500 border-green-100" />
                    </div>
                </div>

                {/* Right: In Warehouse Status Table */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-[#555] font-bold text-xl mb-6">In Warehouse status</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 text-sm font-medium border-b border-gray-50">
                                    <th className="pb-4 font-medium text-[13px] uppercase tracking-wider">Tracking Number</th>
                                    <th className="pb-4 font-medium text-[13px] uppercase tracking-wider">Status</th>
                                    <th className="pb-4 font-medium text-[13px] uppercase tracking-wider text-right">Locker</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {warehouseData.map((item, idx) => (
                                    <tr key={idx} className="group">
                                        <td className="py-5 text-gray-600 font-medium">{item.id}</td>
                                        <td className="py-5">
                                            <div className={`flex items-center gap-2 ${item.color} font-medium text-sm`}>
                                                {item.icon}
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="py-5 text-gray-500 text-sm text-right">{item.locker}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component with explicit TypeScript types
const StatusButton: React.FC<StatusButtonProps> = ({ icon, label, color }) => (
    <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all hover:opacity-80 font-medium text-sm ${color}`}>
        {icon}
        {label}
    </button>
);

export default ScanningCenter;