import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, X, Check, Box, Truck, Package, Layers } from 'lucide-react';

const ReadyForShipment = () => {
    const tableData = [
        { id: 'BG123456', client: 'Juan Perez', type: 'Package', qty: '8', dest: 'Miami, FL', time: '5 min ago', selected: true },
        { id: 'BG123456', client: 'Juan Perez', type: 'Package', qty: '4', dest: 'Los angeles, CA', time: '5 min ago', selected: true },
        { id: 'BG123456', client: 'Juan Perez', type: 'Package', qty: '5', dest: 'New york', time: '5 min ago', selected: true },
        { id: 'BG123456', client: 'Juan Perez', type: 'Consolidation', qty: '3', dest: 'Miami, FL', time: '5 min ago', selected: true },
        { id: 'PKG123456', client: 'Juan Perez', type: 'Package', qty: '6', dest: 'Miami, FL', time: '5 min ago', selected: false },
        { id: 'PKG123456', client: 'Juan Perez', type: 'Package', qty: '2', dest: 'Los angeles, CA', time: '5 min ago', selected: false },
    ];

    return (
        <div className="w-full bg-[#f6f6f6] min-h-screen font-sans pb-10">
            <Helmet>
                <title>Ready for Shipment — Warehouse</title>
            </Helmet>
            {/* Page Title Section - Aligned to your red line margin */}
            <div className="px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-[32px] font-bold text-[#333] tracking-tight">Ready for Shipment</h1>
                    <p className="text-gray-400 text-[16px] mt-1">Review and process package ready for shipment</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT: Shipments Table */}
                    <div className="lg:col-span-2 bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-gray-400 text-[14px] font-normal border-b border-gray-50">
                                        <th className="w-12 pb-6 text-center"></th>
                                        <th className="pb-6 text-left font-normal">Package ID</th>
                                        <th className="pb-6 text-left font-normal">Client</th>
                                        <th className="pb-6 text-left font-normal">Type</th>
                                        <th className="pb-6 text-left font-normal">Packages</th>
                                        <th className="pb-6 text-left font-normal">Destination</th>
                                        <th className="pb-6 text-left font-normal">Last update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index} className={`${index % 2 === 1 ? 'bg-[#f9f9f9]' : 'bg-white'}`}>
                                            <td className="py-6 text-center">
                                                <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center border ${item.selected ? 'bg-[#005e2b] border-[#005e2b]' : 'border-gray-300'}`}>
                                                    {item.selected && <Check size={12} className="text-white" />}
                                                </div>
                                            </td>
                                            <td className="py-6 text-gray-600 text-[14px] font-medium">{item.id}</td>
                                            <td className="py-6 text-gray-500 text-[14px]">{item.client}</td>
                                            <td className="py-6 text-gray-500 text-[14px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 border border-gray-100 rounded-full bg-white shadow-sm">
                                                        {item.type === 'Package' ? <Package size={14} className="text-gray-300" /> : <Layers size={14} className="text-gray-300" />}
                                                    </div>
                                                    {item.type}
                                                </div>
                                            </td>
                                            <td className="py-6 text-gray-500 text-[14px]">{item.qty}</td>
                                            <td className="py-6 text-gray-500 text-[14px]">{item.dest}</td>
                                            <td className="py-6 text-gray-400 text-[14px]">{item.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination matching design */}
                            <div className="flex items-center justify-end mt-10 gap-8">
                                <button className="text-gray-300 text-[14px]">Previous</button>
                                <button className="flex items-center gap-2 text-[#005e2b] text-[14px] font-bold">
                                    Next <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Shipment Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Shipment Panel */}
                        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-[#f9f9f9] rounded-full border border-gray-50">
                                   <Truck size={18} className="text-gray-300" />
                                </div>
                                <h3 className="text-gray-700 font-bold text-lg">Shipment</h3>
                            </div>

                            <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-4 bg-[#f9f9f9] p-3 rounded-lg">
                                <span>Selected - 5 Shipment</span>
                                <span className="text-gray-600">19 Packages</span>
                            </div>

                            {/* Shipment Items List */}
                            <div className="space-y-2 mb-6">
                                {['PKG-2024-987654', 'BAG-EXPRESS-2024-0456', 'CONT-MARITIME-2024-0123', 'BAG-EXPRESS-2024-0456'].map((id, i) => (
                                    <div key={i} className="flex items-center justify-between px-2 py-1">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm">
                                                <Box size={14} className="text-gray-300" />
                                            </div>
                                            <span className="text-[12px] text-gray-400 font-medium truncate max-w-[140px]">{id}</span>
                                        </div>
                                        <X size={16} className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                                    </div>
                                ))}
                            </div>

                            <button className="w-full bg-[#005e2b] text-white py-3.5 rounded-lg font-bold text-[13px] hover:bg-[#004d23] transition-colors">
                                Send to Shipment
                            </button>
                        </div>

                        {/* Quick Stats Panel */}
                        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                            <h3 className="text-gray-700 font-bold text-lg mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-[#f9f9f9] p-4 rounded-xl border border-gray-50">
                                    <span className="text-gray-400 text-sm font-medium">Total Shipment</span>
                                    <span className="text-gray-600 font-bold text-lg">40</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#f9f9f9] p-4 rounded-xl border border-gray-50">
                                    <span className="text-gray-400 text-sm font-medium">Total Packages</span>
                                    <span className="text-gray-600 font-bold text-lg">93</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadyForShipment;