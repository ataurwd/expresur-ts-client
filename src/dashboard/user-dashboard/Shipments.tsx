import React, { useState } from 'react';
import { toast } from 'sonner'; // Toaster removed
import { Bell, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Form Data Interface ---
interface ShipmentFormData {
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  weight: number;
  declaredValue: number;
  description: string;
}

// --- Data for Phone Codes ---
const phoneCountryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+1', flag: '🌴', name: 'Miami' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
];

// --- Data for Destination Countries ---
const destinationCountries = [
  { name: 'United States', flag: '' },
  { name: 'Canada', flag: '' },
  { name: 'United Kingdom', flag: '' },
  { name: 'Australia', flag: '' },
  { name: 'Bangladesh', flag: '' },
  { name: 'China', flag: '' },
];

const Shipments = () => {
  // --- State for Form Data ---
  const [formData, setFormData] = useState<ShipmentFormData>({
    country: 'United States',
    state: '',
    city: '',
    address: '',
    postalCode: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    weight: 1,
    declaredValue: 0,
    description: '',
  });

  // --- Dropdown States ---
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(phoneCountryCodes[0]);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handlePhoneCodeSelect = (country: typeof phoneCountryCodes[0]) => {
    setSelectedPhoneCode(country);
    setIsPhoneDropdownOpen(false);
  };

  const handleDestinationCountrySelect = (countryName: string) => {
    setFormData(prev => ({ ...prev, country: countryName }));
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city || !formData.address || !formData.postalCode || !formData.fullName || !formData.phoneNumber || formData.weight <= 0) {
      toast.error('Please fill in all required fields (*).');
      return;
    }
    console.log('Final Data:', { 
      ...formData, 
      fullPhone: `${selectedPhoneCode.code} ${formData.phoneNumber}` 
    });
    toast.success('Shipment created successfully!');
  };

  // Helper to find flag for currently selected destination country
  const currentDestinationFlag = destinationCountries.find(c => c.name === formData.country)?.flag ;

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative pb-20">
      
      {/* NOTE: <Toaster /> removed to use the global one in App/Layout */}

      {/* --- Header --- */}
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shipments</h1>
          <p className="text-gray-500 mt-2 text-sm">Enter shipment details to get pricing and carriers</p>
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

      <div className="mx-auto">
        
        {/* --- Main Form Card --- */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative">
          
          {/* --- 1. Destination Section --- */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Destination</h3>
            <div className="space-y-6">
              
              {/* CUSTOM COUNTRY DROPDOWN WITH FLAGS */}
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-600">Country *</label>
                
                <div 
                  className="w-full border border-gray-200 rounded-lg p-3.5 flex justify-between items-center cursor-pointer bg-white hover:border-gray-300 transition"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={`${formData.country} flag`} style={{ fontFamily: 'Segoe UI Emoji, Noto Color Emoji, Apple Color Emoji, "Twemoji Mozilla", "EmojiOne"' }}>{currentDestinationFlag}</span>
                    <span className="text-gray-700">{formData.country}</span>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} size={18} />
                </div>

                {/* Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <>
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto">
                      {destinationCountries.map((country, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleDestinationCountrySelect(country.name)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer transition border-b border-gray-50 last:border-0"
                        >
                          <span className="text-xl" role="img" aria-label={`${country.name} flag`} style={{ fontFamily: 'Segoe UI Emoji, Noto Color Emoji, Apple Color Emoji, "Twemoji Mozilla", "EmojiOne"' }}>{country.flag}</span>
                          <span className="text-sm text-gray-700 font-medium">{country.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-20" onClick={() => setIsCountryDropdownOpen(false)}></div>
                  </>
                )}
              </div>

              {/* State & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">State</label>
                  <input 
                    type="text" 
                    name="state"
                    placeholder="eg, California" 
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">City *</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Enter city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Address & Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Address *</label>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Street address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Postal Code *</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="Enter zip code" 
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                    required
                  />
                </div>
              </div>

            </div>
          </div>

          {/* --- 2. Recipient Information Section --- */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Recipient Information</h3>
            <div className="space-y-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Recipient name" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                  required
                />
              </div>

              {/* Phone Number & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CUSTOM PHONE DROPDOWN */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-600">Phone Number *</label>
                  <div className="flex relative">
                    <button 
                      type="button"
                      onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                      className="flex items-center border border-r-0 border-gray-200 rounded-l-lg px-3 bg-gray-50/50 hover:bg-gray-100 transition cursor-pointer min-w-[100px] justify-between"
                    >
                      <span className="text-xl mr-2">{selectedPhoneCode.flag}</span>
                      <span className="text-gray-600 font-medium text-sm">{selectedPhoneCode.code}</span>
                      <ChevronDown size={14} className="text-gray-400 ml-1" />
                    </button>

                    {isPhoneDropdownOpen && (
                      <>
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto">
                          {phoneCountryCodes.map((country, idx) => (
                            <div 
                              key={idx}
                              onClick={() => handlePhoneCodeSelect(country)}
                              className="flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer transition border-b border-gray-50 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{country.flag}</span>
                                <span className="text-sm text-gray-700 font-medium">{country.name}</span>
                              </div>
                              <span className="text-xs text-gray-400 font-mono">{country.code}</span>
                            </div>
                          ))}
                        </div>
                        <div className="fixed inset-0 z-20" onClick={() => setIsPhoneDropdownOpen(false)}></div>
                      </>
                    )}

                    <input 
                      type="tel" 
                      name="phoneNumber"
                      placeholder="555 000 0000" 
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-r-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                      required
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="email@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* --- 3. Package Details Section --- */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Package Details</h3>
            <div className="space-y-6">
              
              {/* Weight & Declared Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Weight (kg) *</label>
                  <input 
                    type="number" 
                    name="weight"
                    min="0.1"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Declared Value ($)</label>
                  <input 
                    type="number" 
                    name="declaredValue"
                    min="0"
                    step="0.01"
                    value={formData.declaredValue}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-600">Description</label>
                 <textarea 
                    name="description"
                    placeholder="Brief description of package....."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-3.5 outline-none focus:ring-2 focus:ring-green-50 focus:border-[#005f33] transition text-gray-700 resize-none h-32 placeholder-gray-300"
                 />
              </div>

            </div>
          </div>

          {/* --- Submit Button --- */}
          <button 
            type="submit"
            className="w-full bg-[#005f33] hover:bg-[#004d2a] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.99]"
          >
            Create Shipment
          </button>

        </form>

      </div>
    </div>
  );
};

export default Shipments;