import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { 
  Bell, 
  Camera, 
  ChevronDown, 
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative pb-20">
      <Toaster position="top-center" richColors closeButton />

      {/* --- Header --- */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile & Settings</h1>
          <p className="text-gray-500 mt-2 text-sm">Track your packages</p>
        </div>

        <div className="flex items-center gap-6 mt-6 md:mt-0">
          
          {/* Notification Bell with Link */}
          <Link to="/dashboard/notifications">
            <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </Link>
          
          <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border border-green-200">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-full h-full object-cover"/>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none">Tyrion Lannister</h4>
              <span className="text-xs text-gray-400 mt-1 block">tyrion@example.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* --- 1. Personal Information Card --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          
          {/* User Avatar Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-[#005f33] rounded-full text-white hover:bg-[#004d2a] transition border-2 border-white">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Nitesh Mirbagheri</h3>
              <p className="text-gray-400 text-sm">nitesh@email.com</p>
              <p className="text-gray-500 text-xs mt-1 font-medium">Locker ID : <span className="text-gray-400">452354685466</span></p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Username</label>
              <input 
                type="text" 
                name="username"
                placeholder="Enter your name" 
                value={formData.username}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Country</label>
              <div className="relative">
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-500 appearance-none bg-white cursor-pointer text-sm"
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
              className="bg-[#005f33] hover:bg-[#004d2a] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-md active:scale-[0.99]"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* --- 2. Security Section --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-700 mb-6">Security</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">New password</label>
                <input 
                  type="password" 
                  name="newPassword"
                  placeholder="Enter new password" 
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Re-enter password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Re-enter password" 
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300 text-sm"
                />
              </div>
           </div>

           {/* 2FA Toggle */}
           <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-700 font-medium text-sm">Enable Two Factor Authentication</span>
              
              <button 
                onClick={toggleTwoFactor}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center ${isTwoFactorEnabled ? 'bg-[#005f33]' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isTwoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
           </div>
        </div>

        {/* --- 3. Sessions Section --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-700 mb-6">Sessions</h3>

           <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
              <div className="text-gray-400">
                 <Monitor size={24} />
              </div>
              <div>
                 <h4 className="text-gray-800 font-bold text-sm">This Device</h4>
                 <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs text-gray-500 font-medium">Active Now</span>
                 </div>
                 <p className="text-xs text-gray-400 mt-1">Chrome on windows</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;