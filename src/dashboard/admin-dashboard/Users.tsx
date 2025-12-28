import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  RefreshCw, 
  Bell, 
  ChevronRight, 
  X,
  User as UserIcon,
  Trash2
} from 'lucide-react';

import { Helmet } from 'react-helmet';

// --- TYPES ---
interface UserType {
  id: number;
  name: string;
  lockerId: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  date: string;
}

// --- MOCK DATA ---
const INITIAL_USERS: UserType[] = [
  { id: 1, name: 'Rahim Khan', lockerId: 'LKR-1001', email: 'rahim.khan@example.com', phone: '+8801711000001', addressLine1: 'Mirpur 10,', addressLine2: 'Dhaka, Bangladesh • Dhaka', date: '2025/10/12' },
  { id: 2, name: 'Ayesha Begum', lockerId: 'LKR-1002', email: 'ayesha.begum@example.com', phone: '+8801711000002', addressLine1: 'Banani DOHS,', addressLine2: 'Dhaka, Bangladesh • Dhaka', date: '2025/10/12' },
  { id: 3, name: 'Rahim Khan', lockerId: 'LKR-1001', email: 'rahim.khan@example.com', phone: '+8801711000001', addressLine1: 'Mirpur 10,', addressLine2: 'Dhaka, Bangladesh • Dhaka', date: '2025/10/12' },
  { id: 4, name: 'Ayesha Begum', lockerId: 'LKR-1002', email: 'ayesha.begum@example.com', phone: '+8801711000002', addressLine1: 'Banani DOHS,', addressLine2: 'Dhaka, Bangladesh • Dhaka', date: '2025/10/12' },
  { id: 5, name: 'Rahim Khan', lockerId: 'LKR-1001', email: 'rahim.khan@example.com', phone: '+8801711000001', addressLine1: 'Mirpur 10,', addressLine2: 'Dhaka, Bangladesh • Dhaka', date: '2025/10/12' },
  { id: 6, name: 'Ayesha Begum', lockerId: 'LKR-1002', email: 'ayesha.begum@example.com', phone: '+8801711000002', addressLine1: 'Banani DOHS,', addressLine2: 'Dhaka, Bangladesh • Dhaka', date: '2025/10/12' },
];

const ITEMS_PER_PAGE = 5;

// --- VIEW MODAL ---
const UserModal = ({ isOpen, user, onClose }: { isOpen: boolean; user: UserType | null; onClose: () => void; }) => {
  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl mx-4 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">User Details</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
        </div>
        <div className="p-8 bg-[#F9FAFB]">
           <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                  <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Full Name</label>
                  <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
              </div>
              <div>
                  <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Locker ID</label>
                  <p className="font-mono text-gray-600 text-sm bg-white border border-gray-200 px-2 py-0.5 rounded inline-block">{user.lockerId}</p>
              </div>
              <div className="col-span-2">
                  <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Email Address</label>
                  <p className="text-gray-700 text-sm">{user.email}</p>
              </div>
              <div className="col-span-2">
                  <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Phone Number</label>
                  <p className="text-gray-700 text-sm">{user.phone}</p>
              </div>
              <div className="col-span-2">
                  <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Address</label>
                  <p className="text-gray-700 text-sm leading-relaxed">{user.addressLine1} {user.addressLine2}</p>
              </div>
           </div>
        </div>
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="text-white bg-green-600 hover:bg-green-700 font-medium text-sm px-6 py-2 rounded-lg transition shadow-sm">Close</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lockerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setUsers(INITIAL_USERS);
      setSearchTerm('');
      setCurrentPage(1);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>User Management</title>
      </Helmet>

      <div className="min-h-screen bg-[#F6F6F6] p-6 md:p-10 font-sans text-gray-800 relative">
      
        {/* --- HEADER ROW --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#111827] tracking-tight leading-tight">User Management</h1>
            <p className="text-gray-400 mt-1 text-[16px]">Manage all customer and admin accounts</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
              <Bell size={20} />
            </button>
            <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" 
                alt="Profile" 
                className="w-10 h-10 rounded-full bg-green-100 border border-white"
              />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight text-sm">Tyrion Lannister</p>
                <p className="text-gray-400 text-xs">tyrion@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH & REFRESH ROW --- */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          {/* Long Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, locker ID, date...." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white pl-12 pr-6 py-3.5 rounded-full shadow-sm border-none outline-none focus:ring-0 placeholder:text-gray-400 text-sm text-gray-600"
            />
          </div>

          {/* Refresh Button */}
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-white px-6 py-3.5 rounded-full shadow-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all text-sm font-medium whitespace-nowrap"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* --- TABLE CARD --- */}
        <div className="bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col border border-gray-50 pb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="p-6 text-[13px] font-normal text-gray-400 pl-8">Full Name</th>
                  <th className="p-6 text-[13px] font-normal text-gray-400">Locker ID</th>
                  <th className="p-6 text-[13px] font-normal text-gray-400">Email</th>
                  <th className="p-6 text-[13px] font-normal text-gray-400">Phone</th>
                  <th className="p-6 text-[13px] font-normal text-gray-400">Address</th>
                  <th className="p-6 text-[13px] font-normal text-gray-400">Registration Date</th>
                  <th className="p-6 text-[13px] font-normal text-gray-400 text-right pr-8">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-50/50">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="p-6 text-[14px] text-gray-600 font-medium pl-8 align-top">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                             <UserIcon size={14} />
                           </div>
                           {user.name}
                         </div>
                      </td>
                      <td className="p-6 text-[14px] text-gray-500 align-top">{user.lockerId}</td>
                      <td className="p-6 text-[14px] text-gray-500 align-top">{user.email}</td>
                      <td className="p-6 text-[14px] text-gray-500 align-top">{user.phone}</td>
                      <td className="p-6 text-[14px] text-gray-500 min-w-[220px] align-top">
                        <div className="leading-snug">{user.addressLine1}</div>
                        <div className="text-gray-400 text-[13px] mt-0.5">{user.addressLine2}</div>
                      </td>
                      <td className="p-6 text-[14px] text-gray-500 align-top">{user.date}</td>
                      <td className="p-6 align-top pr-8">
                        <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button className="px-4 py-1.5 rounded-md bg-[#F5F5F5]  text-xs font-bold hover:bg-red-50 transition-colors flex items-center gap-1">
                            <Trash2 size={12} /> Delete
                          </button>
                          <button 
                            onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                            className="px-4 py-1.5 rounded-md bg-[#F5F5F5] text-gray-400 text-xs font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION --- */}
          <div className="px-8 pt-4 pb-2 flex justify-end items-center gap-8 bg-white">
             <button 
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               className="text-sm font-medium text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
             >
               Previous
             </button>

             <button 
               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages || totalPages === 0}
               className="flex items-center gap-1 text-sm font-semibold text-[#16a34a] hover:text-[#15803d] disabled:opacity-50 transition-colors"
             >
               Next <ChevronRight size={16} strokeWidth={2.5} />
             </button>
          </div>
        </div>

        {/* --- MODAL --- */}
        <UserModal isOpen={isModalOpen} user={selectedUser} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default Users;