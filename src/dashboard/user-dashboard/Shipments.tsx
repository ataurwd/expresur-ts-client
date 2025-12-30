import React, { useState } from 'react';
import { toast } from 'sonner';
import { Bell, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

// --- Data ---
const phoneCountryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
];

const destinationCountries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Bangladesh', flag: '🇧🇩' },
];

const Shipments = () => {
  // --- State ---
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
    if (!formData.city || !formData.address || !formData.postalCode || !formData.fullName || !formData.phoneNumber) {
      toast.error('Please fill in all required fields (*).');
      return;
    }
    toast.success('Shipment created successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20 relative">
      <Helmet>
        <title>Shipments | EXPRESUR</title>
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shipments</h1>
            <p className="text-gray-500 mt-2 text-sm">Enter shipment details to get pricing and carriers</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
            <p className="text-gray-500 text-sm">Enter shipment details</p>
        </div>

        {/* --- Form Card --- */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-gray-100">
          
          {/* Destination Section */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-lg font-bold text-gray-600 mb-6">Destination</h3>
            <div className="space-y-5">
              
              {/* Country Dropdown */}
              <div className="space-y-1.5 relative">
                <label className="text-sm font-medium text-gray-500">Country *</label>
                <div 
                  className="w-full border border-gray-200 rounded-xl p-3.5 flex justify-between items-center cursor-pointer bg-white hover:border-gray-300 transition"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                >
                  <span className="text-gray-700">{formData.country}</span>
                  <ChevronDown className="text-gray-400" size={18} />
                </div>
                {isCountryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto">
                    {destinationCountries.map((country, idx) => (
                      <div key={idx} onClick={() => handleDestinationCountrySelect(country.name)} className="px-4 py-3 hover:bg-green-50 cursor-pointer text-sm text-gray-700">
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
                {isCountryDropdownOpen && <div className="fixed inset-0 z-20" onClick={() => setIsCountryDropdownOpen(false)} />}
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">State</label>
                <input type="text" name="state" placeholder="eg, California" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">City *</label>
                <input type="text" name="city" placeholder="Enter city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" required />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">Address *</label>
                <input type="text" name="address" placeholder="Street address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" required />
              </div>

              {/* Postal Code */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">Postal Code *</label>
                <input type="text" name="postalCode" placeholder="Enter zip code" value={formData.postalCode} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" required />
              </div>

            </div>
          </div>

          {/* Recipient Info Section */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-lg font-bold text-gray-600 mb-6">Recipient Information</h3>
            <div className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">Full Name *</label>
                <input type="text" name="fullName" placeholder="Recipient name" value={formData.fullName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" required />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-sm font-medium text-gray-500">Phone Number *</label>
                <div className="flex">
                  <button type="button" onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)} className="flex items-center border border-r-0 border-gray-200 rounded-l-xl px-3 bg-white min-w-[80px] justify-between">
                    <span className="text-xl">{selectedPhoneCode.flag}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <input type="tel" name="phoneNumber" placeholder="555 000 0000" value={formData.phoneNumber} onChange={handleInputChange} className="w-full border border-gray-200 rounded-r-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" required />
                </div>
                {/* Phone Dropdown Logic Same as above... */}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">Email</label>
                <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#005f33] text-gray-700 placeholder-gray-300" />
              </div>

            </div>
          </div>

          <button type="submit" className="w-full bg-[#005f33] hover:bg-[#004d2a] text-white py-4 rounded-xl font-bold text-base transition-all shadow-md active:scale-[0.98]">
            Ship
          </button>

        </form>
      </div>
    </div>
  );
};

export default Shipments;