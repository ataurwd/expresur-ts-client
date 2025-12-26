import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Shield, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface StaffMember {
  id: string;
  name: string;
  subRole: string; 
  role: string;   
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

const STAFF_DATA: StaffMember[] = [
  { id: '1', name: 'María González', subRole: 'Administrator', role: 'Full Admin', joinedDate: '7/5/2024', status: 'Active' },
  { id: '2', name: 'María González', subRole: 'Manager', role: 'Limited Access', joinedDate: '11/21/2024', status: 'Active' },
  { id: '3', name: 'María González', subRole: 'Operator', role: 'Limited Access', joinedDate: '7/5/2024', status: 'Active' },
  { id: '4', name: 'María González', subRole: 'Administrator', role: 'Restricted', joinedDate: '11/21/2024', status: 'Inactive' },
  { id: '5', name: 'María González', subRole: 'Operator', role: 'Limited Access', joinedDate: '7/5/2024', status: 'Inactive' },
  { id: '6', name: 'María González', subRole: 'Reviewer', role: 'Restricted', joinedDate: '11/21/2024', status: 'Inactive' },
  { id: '7', name: 'María González', subRole: 'Operator', role: 'Limited Access', joinedDate: '7/5/2024', status: 'Active' },
];

const ROLES = [
  { name: 'Admin', sub: 'System Role', hasShield: true },
  { name: 'Manager', sub: null, hasShield: false },
  { name: 'Operator', sub: null, hasShield: false },
  { name: 'Reviewer', sub: null, hasShield: false },
  { name: 'Viewer', sub: null, hasShield: false },
  { name: 'Staff', sub: null, hasShield: false },
];

const InternalUsersRoles = memo(() => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Internal Users & Roles | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#F6F6F6] p-6 md:p-10 font-sans text-gray-800">
        
        {/* HEADER - UNTOUCHED */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-[30px] font-bold text-[#111827] tracking-tight leading-tight">
              Internal Users & Roles
            </h1>
            <p className="text-gray-400 mt-1 text-[18px]">Manage staff accounts and permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard/admin-notifications')}
              className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors"
            >
              <Bell size={20} />
            </button>
            <div
              onClick={() => navigate('/dashboard/admin-notifications')}
              className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold border border-white">
                T
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900 leading-tight">Tyrion Lannister</p>
                <p className="text-gray-400 text-xs">tyrion@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT: TABLE AREA */}
          <div className="flex-1 bg-white rounded-[24px] shadow-sm p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-[20px] font-semibold text-gray-500">Staff Members</h2>
              <div className="flex gap-3 items-center">
                <button className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-gray-400 bg-white rounded-lg border border-gray-100">
                  <Shield size={16} />
                  Manage Roles
                </button>
                <button className="px-5 py-2 text-[14px] font-medium text-white bg-[#006D35] rounded-lg flex items-center gap-2">
                  <span className="text-xl">+</span> Add User
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[14px] text-gray-300 font-normal">
                    <th className="pb-4 font-normal">User</th>
                    <th className="pb-4 font-normal">Role</th>
                    <th className="pb-4 font-normal">Joined Date</th>
                    <th className="pb-4 font-normal">Status</th>
                    <th className="pb-4 text-right font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {STAFF_DATA.map((member) => (
                      <tr key={member.id}>
                      <td className="py-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-700 text-[14px]">{member.name}</div>
                          <div className="text-[12px] text-gray-400">{member.subRole}</div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 text-[14px]">{member.role}</td>
                      <td className="py-4 text-gray-500 text-[14px]">{member.joinedDate}</td>
                      <td className="py-4">
                        <span className={`flex items-center gap-2 text-[14px] font-medium ${member.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-400 text-[13px] font-medium bg-[#F8F8F8] px-4 py-1.5 rounded-full border border-gray-100">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end items-center mt-8 gap-8">
              <button className="text-[14px] text-gray-300">Previous</button>
              <button className="text-[14px] text-green-600 font-bold flex items-center gap-1">
                Next <span className="text-lg">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT: ROLES SIDEBAR (MATCHED TO NEW IMAGE) */}
          <div className="lg:w-[300px] space-y-6">
            <div className="bg-white rounded-[24px] p-6 shadow-sm">
              <h3 className="text-[20px] font-semibold text-gray-500 mb-6">Roles</h3>
              <div className="flex flex-col gap-3">
                {ROLES.map((role) => (
                  <div 
                    key={role.name} 
                    className="bg-[#F8F8F8] rounded-[16px] p-5 flex justify-between items-start"
                  >
                    <div className="flex flex-col">
                      <span className="text-[18px] text-gray-500 font-medium leading-tight">
                        {role.name}
                      </span>
                      {role.sub && (
                        <span className="text-[13px] text-gray-400 mt-1">
                          {role.sub}
                        </span>
                      )}
                    </div>
                    {role.hasShield && (
                      <Shield size={20} className="text-[#FDB022] fill-none stroke-[1.5]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                  <Zap size={16} className="text-gray-300" />
                </div>
                <h3 className="text-[16px] font-semibold text-gray-600">Quick Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-400">Total Users</span>
                  <span className="font-bold text-gray-500">10</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-400">Active Users</span>
                  <span className="font-bold text-gray-500">5</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-400">Total Roles</span>
                  <span className="font-bold text-gray-500">4</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});

export default InternalUsersRoles;