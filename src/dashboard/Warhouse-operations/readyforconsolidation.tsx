import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, X, Check, RotateCcw, Box,  } from 'lucide-react';

const ReadyForConsolidation = () => {
    const tableData = [
        { id: 'BG123456', packages: '5', weight: '25 kg', time: '5 min ago', selected: true },
        { id: 'BG123456', packages: '4', weight: '35,6 kg', time: '5 min ago', selected: true },
        { id: 'BG123456', packages: '3', weight: '10 kg', time: '5 min ago', selected: true },
        { id: 'BG123456', packages: '6', weight: '12.8 kg', time: '5 min ago', selected: true },
        { id: 'PKG123456', packages: '6', weight: '12.8 kg', time: '5 min ago', selected: false },
        { id: 'PKG123456', packages: '2', weight: '42.5 kg', time: '5 min ago', selected: false },
    ];

    return (
        <div className="w-full bg-[#f6f6f6] min-h-screen font-sans pb-10">
            <Helmet>
                <title>Ready for Consolidation — Warehouse</title>
            </Helmet>
            {/* Page Title Section - Aligned with your red line margin */}
            <div className="px-6 py-8">
                <div className="mb-8 bg-transparent">
                    <h1 className="text-[32px] font-bold text-[#333] tracking-tight">Ready for Consolidation</h1>
                    <p className="text-gray-400 text-[16px] mt-1">prepare and select packages to initialize the consolidation process</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* LEFT SIDE: Package Table */}
                    <div className="lg:col-span-2 bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-gray-400 text-[14px] font-normal border-b border-gray-50">
                                        <th className="w-12 pb-6"></th>
                                        <th className="pb-6 text-left font-normal">Package ID</th>
                                        <th className="pb-6 text-left font-normal">Packages</th>
                                        <th className="pb-6 text-left font-normal">Weight</th>
                                        <th className="pb-6 text-left font-normal">Last update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} className={index % 2 === 1 ? 'bg-[#f9f9f9]' : 'bg-white'}>
                                            <td className="py-5 text-center">
                                                <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center border ${row.selected ? 'bg-[#005e2b] border-[#005e2b]' : 'border-gray-300'}`}>
                                                    {row.selected && <Check size={12} className="text-white" />}
                                                </div>
                                            </td>
                                            <td className="py-5 text-gray-500 text-[14px]">{row.id}</td>
                                            <td className="py-5 text-gray-500 text-[14px]">{row.packages}</td>
                                            <td className="py-5 text-gray-500 text-[14px]">{row.weight}</td>
                                            <td className="py-5 text-gray-400 text-[14px]">{row.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {/* Pagination */}
                            <div className="flex items-center justify-end mt-10 gap-8">
                                <button className="text-gray-300 text-[14px]">Previous</button>
                                <div className="flex items-center gap-2 text-[#005e2b] font-bold text-[14px] cursor-pointer">
                                    Next <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    {/* RIGHT SIDE: Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Consolidation Card */}
                        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-[#f9f9f9] rounded-full border border-gray-100 shadow-sm">
                                    <RotateCcw size={18} className="text-gray-300" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-gray-700 font-bold text-[18px]">Consolidation</h2>
                            </div>

                            <div className="flex justify-between text-[12px] font-bold text-gray-400 mb-4 px-1">
                                <span>Selected - 4 Bags</span>
                                <span className="text-gray-600">45 Kg</span>
                            </div>

                            {/* Bag Items List - Matching icons */}
                            <div className="space-y-2 mb-6">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between bg-[#f9f9f9] p-3 rounded-xl border border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-white rounded-full border border-gray-100 shadow-xs">
                                                <Box size={14} className="text-gray-300" />
                                            </div>
                                            <span className="text-[12px] text-gray-400 font-medium">BAG-EXPRESS-2024-0456</span>
                                        </div>
                                        <X size={16} className="text-red-400 cursor-pointer hover:text-red-600 transition-colors" />
                                    </div>
                                ))}
                            </div>

                            <button className="w-full bg-[#005e2b] text-white py-3.5 rounded-lg font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#004d23] transition-colors shadow-sm">
                                Mark as Consolidated
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                            <h2 className="text-gray-700 font-bold text-[18px] mb-4">Quick Stats</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center bg-[#f9f9f9] p-4 rounded-xl border border-gray-50">
                                    <span className="text-gray-400 text-[14px] font-medium">Total Packages</span>
                                    <span className="text-gray-700 font-bold text-[18px]">40</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#f9f9f9] p-4 rounded-xl border border-gray-50">
                                    <span className="text-gray-400 text-[14px] font-medium">Total Weight</span>
                                    <span className="text-gray-700 font-bold text-[18px]">112,5 Kg</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadyForConsolidation;