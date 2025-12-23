import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  RefreshCw, 
  Bell, 
  ChevronRight, 
  X,
  User as UserIcon,
  Trash2  // Added for Delete icon
} from 'lucide-react';

// --- TYPES ---
interface UserType {
  id: number;
  name: string;
  lockerId: string;
  email: string;
  phone: string;
  address: string;
  date: string;
}

// --- MOCK DATA ---
const INITIAL_USERS: UserType[] = [
  { id: 1, name: 'Rahim Khan', lockerId: 'LKR-1001', email: 'rahim.khan@example.com', phone: '+8801711000001', address: 'Mirpur 10, Dhaka, Bangladesh • Dhaka', date: '2025-01-10' },
  { id: 2, name: 'Ayesha Begum', lockerId: 'LKR-1002', email: 'ayesha.begum@example.com', phone: '+8801711000002', address: 'Banani DOHS, Dhaka, Bangladesh • Dhaka', date: '2025-01-10' },
  { id: 3, name: 'Karim Uddin', lockerId: 'LKR-1003', email: 'karim.uddin@example.com', phone: '+8801711000003', address: 'Uttara Sector 7, Dhaka, Bangladesh • Dhaka', date: '2025-01-11' },
  { id: 4, name: 'Nusrat Jahan', lockerId: 'LKR-1004', email: 'nusrat.jahan@example.com', phone: '+8801711000004', address: 'Dhanmondi 32, Dhaka, Bangladesh • Dhaka', date: '2025-01-12' },
  { id: 5, name: 'Tanvir Ahmed', lockerId: 'LKR-1005', email: 'tanvir.ahmed@example.com', phone: '+8801711000005', address: 'Gulshan 1, Dhaka, Bangladesh • Dhaka', date: '2025-01-12' },
  { id: 6, name: 'Sadia Islam', lockerId: 'LKR-1006', email: 'sadia.islam@example.com', phone: '+8801711000006', address: 'Mohammadpur, Dhaka, Bangladesh • Dhaka', date: '2025-01-13' },
  { id: 7, name: 'Rafiqul Islam', lockerId: 'LKR-1007', email: 'rafiqul.islam@example.com', phone: '+8801711000007', address: 'Badda Link Road, Dhaka, Bangladesh • Dhaka', date: '2025-01-13' },
  { id: 8, name: 'Farhana Akter', lockerId: 'LKR-1008', email: 'farhana.akter@example.com', phone: '+8801711000008', address: 'Bashundhara R/A, Dhaka, Bangladesh • Dhaka', date: '2025-01-14' },
];

const ITEMS_PER_PAGE = 5;

// --- MODAL COMPONENT (View only now) ---
const UserModal = ({ 
  isOpen, 
  user, 
  onClose, 
}: { 
  isOpen: boolean; 
  user: UserType | null; 
  onClose: () => void; 
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Details</h2>
            <p className="text-sm text-gray-500 mt-1">Viewing customer profile information</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Field: Name */}
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="w-full p-4 rounded-xl bg-gray-50 border border-transparent text-gray-600">
                {user.name}
              </div>
            </div>

            {/* Field: Email */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="w-full p-4 rounded-xl bg-gray-50 border border-transparent text-gray-600">
                {user.email}
              </div>
            </div>

            {/* Field: Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
              <div className="w-full p-4 rounded-xl bg-gray-50 border border-transparent text-gray-600">
                {user.phone}
              </div>
            </div>

            {/* Field: Locker ID */}
            <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Locker ID</label>
               <div className="w-full p-4 rounded-xl bg-gray-50 border border-transparent text-gray-500 font-mono">
                 {user.lockerId}
               </div>
            </div>

            {/* Field: Date */}
            <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Registration Date</label>
               <div className="w-full p-4 rounded-xl bg-gray-50 border border-transparent text-gray-500">
                 {user.date}
               </div>
            </div>

             {/* Field: Address */}
             <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Address</label>
              <div className="w-full p-4 rounded-xl bg-gray-50 border border-transparent text-gray-600">
                {user.address}
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-2.5 rounded-xl text-gray-500 font-medium hover:bg-white hover:text-gray-800 hover:shadow-sm transition-all border border-transparent hover:border-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const Users = () => {
  const navigate = useNavigate();
  // --- STATE ---
  const [users, setUsers] = useState<UserType[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal State (View only)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // --- LOGIC ---
  
  // 1. Filter Data based on Search
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lockerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 3. Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setUsers(INITIAL_USERS);
      setSearchTerm('');
      setCurrentPage(1);
      setIsRefreshing(false);
    }, 800);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // --- MODAL HANDLER (View only) ---
  const handleView = (user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-400 mt-1">Manage all customer and admin accounts</p>
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

      {/* --- CONTROLS --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, locker ID, date...." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full bg-white pl-12 pr-4 py-3 rounded-full shadow-sm border-none outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 text-sm"
          />
        </div>

        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all text-sm font-medium"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide">Full Name</th>
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide">Locker ID</th>
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide">Email</th>
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide">Phone</th>
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide">Address</th>
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide">Registration Date</th>
                <th className="p-6 text-xs font-normal text-gray-400 uppercase tracking-wide text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}
                  >
                    <td className="p-6 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                           <UserIcon size={14} />
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="p-6 text-sm text-gray-500 font-mono">{user.lockerId}</td>
                    <td className="p-6 text-sm text-gray-500">{user.email}</td>
                    <td className="p-6 text-sm text-gray-500">{user.phone}</td>
                    <td className="p-6 text-sm text-gray-500 max-w-[200px] leading-relaxed truncate">
                      {user.address}
                    </td>
                    <td className="p-6 text-sm text-gray-500">{user.date}</td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Delete button (no functionality) */}
                        <button 
                          className="px-4 py-1.5 rounded-lg bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                        <button 
                          onClick={() => handleView(user)}
                          className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium hover:bg-gray-200 transition-colors"
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
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        <div className="p-6 flex justify-end items-center gap-6 border-t border-gray-50">
           <button 
             onClick={handlePrev}
             disabled={currentPage === 1}
             className={`text-sm font-medium transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-800'}`}
           >
             Previous
           </button>

           <div className="text-sm font-medium text-gray-400">
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
           </div>

           <button 
             onClick={handleNext}
             disabled={currentPage === totalPages || totalPages === 0}
             className={`flex items-center gap-1 text-sm font-medium transition-colors ${
               currentPage === totalPages || totalPages === 0
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-[#106F3E] hover:text-green-800'
             }`}
           >
             Next <ChevronRight size={16} />
           </button>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <UserModal 
        isOpen={isModalOpen} 
        user={selectedUser} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Users;