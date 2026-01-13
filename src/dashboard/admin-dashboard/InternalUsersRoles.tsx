import React, { memo, useState, useMemo } from 'react';
import { 
  Bell, Shield, Users, Box, X, Search, Trash2, 
  Edit3, ChevronDown, CheckCircle2, LayoutGrid 
} from 'lucide-react';
import { Helmet } from 'react-helmet';

// --- Types (Strictly as per your request) ---
type UserRole = 'Admin' | 'Warehouse Supervisor' | 'user';

interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    accessType: 'Full Admin' | 'Limited Access' | 'Restricted';
    joinedDate: string;
    status: 'Active' | 'Inactive';
}

const INITIAL_STAFF: StaffMember[] = [
    { id: '1', name: 'María González', email: 'maria@gmail.com', role: 'Admin', accessType: 'Full Admin', joinedDate: '7/5/2024', status: 'Active' },
    { id: '2', name: 'John Smith', email: 'john@example.com', role: 'user', accessType: 'Limited Access', joinedDate: '11/21/2024', status: 'Active' },
    { id: '3', name: 'Ricardo Milos', email: 'ricardo@logistics.com', role: 'Warehouse Supervisor', accessType: 'Limited Access', joinedDate: '7/5/2024', status: 'Active' },
    { id: '4', name: 'Ana Belén', email: 'ana@gmail.com', role: 'user', accessType: 'Restricted', joinedDate: '11/21/2024', status: 'Inactive' },
];

const InternalUsersRoles = memo(() => {
    const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
    const [search, setSearch] = useState('');
    const [activeRoleFilter, setActiveRoleFilter] = useState<string>('All');
    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<StaffMember | null>(null);

    // --- Filter Logic ---
    const filteredStaff = useMemo(() => {
        return staff.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
            const matchesRole = activeRoleFilter === 'All' || user.role === activeRoleFilter;
            return matchesSearch && matchesRole;
        });
    }, [staff, search, activeRoleFilter]);

    // --- Actions ---
    const handleUpdateRole = () => {
        if (selectedUser) {
            setStaff(prev => prev.map(u => u.id === selectedUser.id ? selectedUser : u));
            setIsEditModalOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex text-left font-sans">
            <Helmet><title>Internal Users | EXPRESUR</title></Helmet>

            <div className="flex-1 p-6 lg:p-10">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Internal Users & Roles</h1>
                        <p className="text-gray-500">Manage staff accounts and permissions</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer text-gray-400 hover:text-green-600">
                            <Bell size={20} />
                        </div>
                        <div className="flex items-center gap-3 bg-white p-1.5 pr-5 rounded-full shadow-sm border border-gray-100">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" className="w-9 h-9 rounded-full bg-green-100" alt="avatar"/>
                            <div>
                                <p className="text-sm font-bold text-gray-800 leading-tight">Tyrion Lannister</p>
                                <p className="text-[10px] text-gray-400 font-medium">tyrion@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* LEFT SIDE: TABLE */}
                    <div className="col-span-12 lg:col-span-9 bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                            <h3 className="font-bold text-gray-700 text-lg">Staff Members</h3>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                        type="text" placeholder="Search user..."
                                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500/10 w-64 outline-none"
                                        value={search} onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <button className="bg-[#006D35] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#005a2c] transition-all">
                                    + Add User
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr className="text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                                        <th className="px-6 py-4 text-left">User</th>
                                        <th className="px-6 py-4 text-left">Role</th>
                                        <th className="px-6 py-4 text-left">Joined Date</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredStaff.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-[#006D35] font-bold text-sm">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-700">{user.name}</p>
                                                        <p className="text-[11px] text-gray-400 leading-tight">{user.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-medium">{user.accessType}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{user.joinedDate}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    ● {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => {setSelectedUser(user); setIsEditModalOpen(true)}}
                                                    className="text-[11px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all border border-gray-100"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT SIDE: ROLES (As per image) */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="font-bold text-gray-800">Roles</h3>
                                <button className="text-[10px] bg-green-600 text-white px-2 py-1 rounded-md font-bold">+ Add Role</button>
                            </div>
                            
                            <div className="space-y-2">
                                <RoleItem label="Admin" sub="System Role" active={activeRoleFilter === 'Admin'} onClick={() => setActiveRoleFilter('Admin')} />
                                
                                <div className="space-y-1">
                                    <button 
                                        onClick={() => setIsWarehouseOpen(!isWarehouseOpen)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
                                    >
                                        <span className="text-sm font-bold text-gray-600">Warehouse</span>
                                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isWarehouseOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isWarehouseOpen && (
                                        <button 
                                            onClick={() => setActiveRoleFilter('Warehouse Supervisor')}
                                            className={`w-full text-left ml-4 p-2 text-xs font-bold border-l-2 transition-all ${activeRoleFilter === 'Warehouse Supervisor' ? 'border-green-600 text-green-600' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
                                        >
                                            Supervisor
                                        </button>
                                    )}
                                </div>

                                <RoleItem label="user" active={activeRoleFilter === 'user'} onClick={() => setActiveRoleFilter('user')} />
                                
                                <button 
                                    onClick={() => setActiveRoleFilter('All')}
                                    className="w-full mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-green-600 transition-colors"
                                >
                                    View All Staff
                                </button>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <LayoutGrid size={16} />
                                <h3 className="text-xs font-bold uppercase tracking-tighter">Quick Stats</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Total Users</span>
                                    <span className="text-sm font-bold">{staff.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Active Users</span>
                                    <span className="text-sm font-bold text-green-600">{staff.filter(u=>u.status==='Active').length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold">Edit User Role</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400"><X size={20}/></button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Select New Role</label>
                                <select 
                                    className="w-full bg-gray-50 border-none p-4 rounded-2xl font-bold text-sm outline-none"
                                    value={selectedUser.role}
                                    onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value as UserRole})}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Warehouse Supervisor">Warehouse Supervisor</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleUpdateRole}
                                className="w-full py-4 bg-[#006D35] text-white rounded-2xl font-bold shadow-lg shadow-green-900/10"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

const RoleItem = ({ label, sub, active, onClick }: any) => (
    <div 
        onClick={onClick}
        className={`p-3 rounded-xl cursor-pointer border transition-all ${active ? 'bg-green-50 border-green-200' : 'bg-white border-transparent hover:bg-gray-50'}`}
    >
        <div className="flex justify-between items-center">
            <div>
                <p className={`text-sm font-bold ${active ? 'text-green-700' : 'text-gray-600'}`}>{label}</p>
                {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
            </div>
            {active && <CheckCircle2 size={14} className="text-green-500" />}
        </div>
    </div>
);

export default InternalUsersRoles;