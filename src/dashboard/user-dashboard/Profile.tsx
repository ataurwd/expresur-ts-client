import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Bell, 
  Camera, 
  ChevronDown, 
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Profile = () => {
  // --- State ---
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    country: ''
  });

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const toggleTwoFactor = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
    toast.info(`Two-Factor Authentication ${!isTwoFactorEnabled ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20 relative">
      <Helmet>
        <title>Profile & Settings | EXPRESUR</title>
      </Helmet>

      {/* --- MOBILE HEADER --- */}
      <div className="xl:hidden bg-white p-4 sticky top-0 z-20 shadow-sm flex justify-between items-center mb-6">
        <div>
           <h1 className="text-xl font-bold text-[#F97316] ml-14">EXPRESUR</h1>
        </div>
        <div className="flex items-center gap-3">
             <Link to="/dashboard/notifications" className="relative p-2 bg-gray-50 rounded-full">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
             </Link>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-8 h-8 rounded-full border border-green-100" />
        </div>
      </div>

      <div className="px-4 md:px-10 space-y-6 md:space-y-8">
        
        {/* --- DESKTOP Header --- */}
        <div className="hidden xl:flex justify-between items-center mb-10 pt-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile & Settings</h1>
            <p className="text-gray-500 mt-2 text-sm">Track your packages</p>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/dashboard/notifications">
              <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            </Link>

            <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border border-green-200">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
                <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Title --- */}
        <div className="xl:hidden">
            <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
            <p className="text-gray-500 text-sm">Track your packages</p>
        </div>

        {/* --- Personal Information Card --- */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100">
          
          {/* User Avatar Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-1 bg-[#006D35] rounded-full text-white hover:bg-[#005a2c] transition border-2 border-white">
                <Camera size={10} />
              </button>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800">Nitesh Mirbagheri</h3>
              <p className="text-gray-400 text-xs md:text-sm">nitesh@email.com</p>
              <p className="text-gray-500 text-[10px] md:text-xs mt-0.5 font-medium">Locker ID : <span className="text-gray-400">452354685466</span></p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-500">Username</label>
              <input 
                type="text" 
                name="username"
                placeholder="Enter your name" 
                value={formData.username}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#006D35] transition text-gray-700 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-500">Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#006D35] transition text-gray-700 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#006D35] transition text-gray-700 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-500">Country</label>
              <div className="relative">
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#006D35] transition text-gray-500 appearance-none bg-white cursor-pointer text-sm"
                >
                  <option value="" disabled>Select a country</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
                <ChevronDown className="absolute right-4 top-4 text-gray-300 pointer-events-none" size={16} />
              </div>
            </div>

          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleUpdateProfile}
              className="bg-[#006D35] hover:bg-[#005a2c] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-sm active:scale-[0.99]"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* --- Security Section --- */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-600 mb-6">Security</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-gray-500">New password</label>
               <input 
                 type="password" 
                 name="newPassword"
                 placeholder="Enter new password" 
                 value={passwords.newPassword}
                 onChange={handlePasswordChange}
                 className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#006D35] transition text-gray-700 placeholder-gray-300 text-sm"
               />
             </div>

             <div className="space-y-1.5">
               <label className="text-sm font-medium text-gray-500">Re-enter password</label>
               <input 
                 type="password" 
                 name="confirmPassword"
                 placeholder="Re-enter password" 
                 value={passwords.confirmPassword}
                 onChange={handlePasswordChange}
                 className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#006D35] transition text-gray-700 placeholder-gray-300 text-sm"
               />
             </div>
           </div>

           {/* 2FA Toggle */}
           <div className="bg-[#F9FAFB] rounded-xl p-4 flex justify-between items-center border border-gray-50">
             <span className="text-gray-600 font-medium text-sm">Enable Two Factor Authentication</span>
             
             <button 
               onClick={toggleTwoFactor}
               className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center ${isTwoFactorEnabled ? 'bg-[#006D35]' : 'bg-gray-300'}`}
             >
               <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isTwoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
             </button>
           </div>
        </div>

        {/* --- Sessions Section --- */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-600 mb-6">Sessions</h3>

           <div className="bg-[#F9FAFB] rounded-xl p-4 flex items-center gap-4 border border-gray-50">
             <div className="text-gray-400">
                 <Monitor size={24} />
             </div>
             <div>
                 <h4 className="text-gray-600 font-medium text-sm">This Device</h4>
                 <div className="flex items-center gap-2 mt-0.5">
                   <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                   <span className="text-xs text-gray-400 font-normal">Active Now</span>
                 </div>
                 <p className="text-[11px] text-gray-400 mt-0.5">Chrome on windows</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;