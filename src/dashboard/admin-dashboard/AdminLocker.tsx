import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, ChevronDown, ChevronRight,
  Bell, X, Check, QrCode
} from 'lucide-react';

import { Helmet } from 'react-helmet';

interface PackageItem {
  clientId: string;
  clientName: string;
  clientEmail: string;
  trackingNumber: string;
  lockerId: string;
  totalPackages: number;
  createdDate: string;
}

const INITIAL_DATA: PackageItem[] = [
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1001', lockerId: 'LCK-127A', totalPackages: 2, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1002', lockerId: 'LCK-127A', totalPackages: 1, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1001', lockerId: 'LCK-127A', totalPackages: 5, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1002', lockerId: 'LCK-127A', totalPackages: 3, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1001', lockerId: 'LCK-127A', totalPackages: 2, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1002', lockerId: 'LCK-127A', totalPackages: 3, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1001', lockerId: 'LCK-127A', totalPackages: 2, createdDate: '7/5/2024' },
  { clientId: '0001002', clientName: 'María González', clientEmail: 'maria@gmail.com', trackingNumber: 'ORD-1002', lockerId: 'LCK-127A', totalPackages: 3, createdDate: '7/5/2024' },
];

const AdminLocker = () => {
  const navigate = useNavigate();

  const [data] = useState<PackageItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [lockerFilter, setLockerFilter] = useState('All Lockers');
  const [isLockerDropdownOpen, setIsLockerDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal for adding package
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ trackingNumber: '', carrier: 'UPS', locker: '', weight: '', note: '' });
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [scanResult,] = useState({ trackingNumber: 'ORD-1001', carrier: 'UPS', method: 'Barcode', clientName: 'María González', clientId: '0001002', lockerId: 'LCK-127A', identified: true });
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState<PackageItem | null>(null);

  const uniqueLockers = useMemo(() => {
    const lockers = new Set(data.map(item => item.lockerId));
    return ['All Lockers', ...Array.from(lockers)];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch =
        item.clientName.toLowerCase().includes(search.toLowerCase()) ||
        item.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
        item.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.clientId.includes(search);
      const matchLocker = lockerFilter === 'All Lockers' || item.lockerId === lockerFilter;
      return matchSearch && matchLocker;
    });
  }, [data, search, lockerFilter]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Helmet>
        <title>Locker Management | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight text-[30px]">Locker Management</h1>
          <p className="text-gray-400 mt-1 text-[20px]">Manage packages and locker assignments</p>
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

      {/* CONTROLS + TABLE WRAPPER */}
      <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button className="bg-[#166534] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:bg-[#14532d] transition-colors">
            All
          </button>

          <div className="relative">
            <button
              onClick={() => setIsLockerDropdownOpen(!isLockerDropdownOpen)}
              className="flex items-center justify-between gap-3 bg-[#F9FAFB] text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition border border-transparent hover:border-gray-200 min-w-[140px]"
            >
              {lockerFilter} <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isLockerDropdownOpen && (
              <>
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden">
                  {uniqueLockers.map(locker => (
                    <div
                      key={locker}
                      onClick={() => { setLockerFilter(locker); setIsLockerDropdownOpen(false); }}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-green-700 transition-colors"
                    >
                      {locker}
                    </div>
                  ))}
                </div>
                <div className="fixed inset-0 z-10" onClick={() => setIsLockerDropdownOpen(false)}></div>
              </>
            )}
          </div>

          <div className="relative flex-1 lg:flex-none">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tracking number, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-[#F9FAFB] rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 w-full lg:w-80"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsScanOpen(true)} className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition justify-center shadow-sm">
            <QrCode size={16} /> Scan Package
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#166534] hover:bg-[#14532d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition justify-center shadow-sm">
            <Plus size={18} /> Add Package
          </button>
        </div>
      </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] text-gray-400 text-[13px] font-medium border-b border-gray-100">
              <tr>
                <th className="p-5 font-normal">Client ID</th>
                <th className="p-5 font-normal">Client</th>
                <th className="p-5 font-normal">Tracking Number</th>
                <th className="p-5 font-normal">Locker ID</th>
                <th className="p-5 font-normal">Total Packages</th>
                <th className="p-5 font-normal">Locker created date</th>
                <th className="p-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px] divide-y divide-gray-50">
              {paginatedData.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <td className="p-5 text-gray-700">{item.clientId}</td>
                  <td className="p-5">
                    <div className="font-bold text-gray-900 mb-0.5">{item.clientName}</div>
                    <div className="text-[13px] text-gray-500">{item.clientEmail}</div>
                  </td>
                  <td className="p-5 text-gray-700">{item.trackingNumber}</td>
                  <td className="p-5 text-gray-700">{item.lockerId}</td>
                  <td className="p-5 text-gray-700">{item.totalPackages}</td>
                  <td className="p-5 text-gray-700">{item.createdDate}</td>
                  <td className="p-5 text-right">
                    <button onClick={() => { setSelectedLocker(item); setIsViewOpen(true); }} className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 px-4 py-1.5 rounded text-xs font-medium transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            {/* ADD PACKAGE MODAL */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
                    <h3 className="text-lg font-bold text-gray-900">Add Package Manually</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Tracking Number *</label>
                        <input value={form.trackingNumber} onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Carrier *</label>
                        <select value={form.carrier} onChange={(e) => setForm({ ...form, carrier: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                          <option>UPS</option>
                          <option>USPS</option>
                          <option>FedEx</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Locker *</label>
                        <select value={form.locker} onChange={(e) => setForm({ ...form, locker: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                          <option value="">Select Locker</option>
                          {uniqueLockers.filter(l => l !== 'All Lockers').map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Weight (kg)</label>
                        <input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Note (Optional)</label>
                      <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none h-28" />
                    </div>

                    <div className="flex justify-end items-center gap-6">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-600">Cancel</button>
                      <button type="submit" className="text-green-600 font-semibold">Add Package</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* SCAN PACKAGE MODAL */}
            {isScanOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
                    <h3 className="text-lg font-bold text-gray-900">Scan Barcode/QR</h3>
                    <button onClick={() => setIsScanOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="border-2 border-dashed border-[#F3F4F6] rounded-lg h-36 flex items-center justify-center text-gray-300">
                      <QrCode size={28} />
                    </div>

                    <div className="bg-[#F9FAFB] p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Package Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Tracking Number</div><div className="text-right font-medium">{scanResult.trackingNumber}</div>
                        <div>Carrier</div><div className="text-right">{scanResult.carrier}</div>
                        <div>Scan Method</div><div className="text-right">{scanResult.method}</div>
                      </div>
                    </div>

                    <div className="bg-[#F9FAFB] p-4 rounded-lg flex items-start gap-4">
                      <div className="text-green-500"><Check size={20} /></div>
                      <div>
                        <div className="text-sm font-semibold text-green-600">Client Identified</div>
                        <div className="text-sm text-gray-700 mt-2">Client Name <span className="float-right text-gray-600">{scanResult.clientName}</span></div>
                        <div className="text-sm text-gray-700">Client ID <span className="float-right text-gray-600">{scanResult.clientId}</span></div>
                        <div className="text-sm text-gray-700">Locker ID <span className="float-right text-gray-600">{scanResult.lockerId}</span></div>
                      </div>
                    </div>

                    <div className="flex justify-end items-center gap-6">
                      <button onClick={() => setIsScanOpen(false)} className="text-gray-600">Cancel</button>
                      <button onClick={() => { /* confirm + add package logic can go here */ setIsScanOpen(false); }} className="text-green-600 font-semibold">Confirm & Add Package</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LOCKER DETAILS VIEW MODAL */}
            {isViewOpen && selectedLocker && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F9FAFB]">
                    <h3 className="text-lg font-bold text-gray-900">Locker Details</h3>
                    <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>

                  <div className="p-6">
                    <div className="bg-[#F9FAFB] rounded-lg p-6 text-sm text-gray-700 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-500">Client</div>
                        <div className="font-medium text-gray-900 mt-1">{selectedLocker.clientName}</div>
                        <div className="text-gray-500 text-xs mt-1">{selectedLocker.clientEmail}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Tracking Number</div>
                        <div className="font-medium text-gray-900 mt-1">{selectedLocker.trackingNumber}</div>
                      </div>

                      <div>
                        <div className="text-gray-500">Locker created Date</div>
                        <div className="font-medium text-gray-900 mt-1">{selectedLocker.createdDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Total Packages</div>
                        <div className="font-medium text-gray-900 mt-1">{selectedLocker.totalPackages}</div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button onClick={() => setIsViewOpen(false)} className="text-gray-600">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>

        {/* PAGINATION */}
        <div className="flex justify-end items-center gap-6 mt-6 text-[14px]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="text-[#16a34a] font-semibold flex items-center gap-1 hover:text-[#15803d] transition-colors disabled:opacity-50"
        >
          Next <ChevronRight size={16} />
        </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLocker;