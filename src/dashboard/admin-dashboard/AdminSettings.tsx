import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Bell, 
  Truck, 
  DollarSign, 
  FileText, 
  Settings, 
  Save, 
  Plus, 
  ChevronsUpDown,
  Check,
  GitMerge, // Icon for Workflow
  QrCode,   // Icon for QR Labels
  ChevronRight
} from 'lucide-react';

// --- TYPES ---
type TabType = 'pricing' | 'carriers' | 'workflow' | 'qr_labels' | 'notifications' | 'reports' | 'general';

interface Route {
  id: number;
  name: string;
  price: string;
}

// --- MAIN COMPONENT ---
const AdminSettings = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('pricing');
  const [isSaving, setIsSaving] = useState(false);

  // --- MOCK STATE ---
  
  // 1. Pricing
  const [pricing, setPricing] = useState({
    maritime: '8.5',
    air: '12.00',
    express: '18.50'
  });
  const [routes, setRoutes] = useState<Route[]>([
    { id: 1, name: 'USA → Cuba (Express)', price: '8.5' },
    { id: 2, name: 'USA → Mexico (Standard)', price: '8.5' }
  ]);

  // 2. Carriers
  const [carriers, setCarriers] = useState([
    { id: 'usps', label: 'USPS', enabled: true },
    { id: 'fedex', label: 'FedEx', enabled: false },
    { id: 'dhl', label: 'DHL', enabled: true },
    { id: 'ups', label: 'UPS', enabled: true },
    { id: 'local', label: 'Local Courier', enabled: true },
  ]);

  // 3. Workflow (New)
  const [workflows, setWorkflows] = useState([
    { id: 1, from: 'Pending', to: 'Arrived', enabled: true },
    { id: 2, from: 'Arrived', to: 'In Consolidation', enabled: true },
    { id: 3, from: 'In Consolidation', to: 'Ready To Ship', enabled: true },
    { id: 4, from: 'Ready To Ship', to: 'Shipped', enabled: true },
    { id: 5, from: 'Shipped', to: 'In Transit', enabled: true },
    { id: 6, from: 'In Transit', to: 'Delivered', enabled: true },
  ]);

  // 4. QR Labels (New)
  const [qrConfig, setQrConfig] = useState({
    format: 'Standard (100*100mm)',
    fields: [
        { id: 'tracking', label: 'Tracking Number', enabled: true },
        { id: 'customer', label: 'Customer Name', enabled: true },
        { id: 'destination', label: 'Destination', enabled: true },
        { id: 'weight', label: 'Weight', enabled: true },
        { id: 'service', label: 'Service Type', enabled: false },
    ]
  });

  // 5. Notifications
  const [notifications, setNotifications] = useState([
    { id: 'unassigned', label: 'Unassigned Packages', enabled: true },
    { id: 'delays', label: 'Automatic Delays', enabled: false },
    { id: 'incomplete', label: 'Incomplete Bags', enabled: true },
    { id: 'api_fail', label: 'API Failures', enabled: true },
    { id: 'validation', label: 'Validation Errors', enabled: true },
    { id: 'unscanned', label: 'Unscanned Packages', enabled: true },
  ]);

  // 6. Reports / General
  const [config, setConfig] = useState({
    recipients: 'admin@example.com, manager@example.com....',
    format: 'Pdf'
  });

  // --- HANDLERS ---
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); alert('Settings saved!'); }, 800);
  };

  const toggleCarrier = (id: string) => {
    setCarriers(carriers.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const toggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const toggleQrField = (id: string) => {
    setQrConfig({
        ...qrConfig,
        fields: qrConfig.fields.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f)
    });
  };

  const handlePriceChange = (routeId: number, val: string) => {
    setRoutes(routes.map(r => r.id === routeId ? { ...r, price: val } : r));
  };

  const handleAddRoute = () => {
    const newId = routes.length + 1;
    setRoutes([...routes, { id: newId, name: 'New Route', price: '0.0' }]);
  };

  // --- RENDERERS ---

  // 1. PRICING TAB
  const renderPricing = () => (
    <div className="animate-fadeIn space-y-8">
       <div>
         <h2 className="text-[30px] font-bold text-gray-800 mb-1">Pricing Configuration</h2>
         <p className="text-[18px] text-gray-400 mb-6">Configure shipping rates for different services and destinations</p>
         
         <h3 className="text-gray-500 font-medium mb-4">Cuba Pricing</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Maritime', 'Air', 'Express'].map((type) => {
                const key = type.toLowerCase() as keyof typeof pricing;
                return (
                    <div key={type}>
                        <label className="block text-xs text-gray-500 mb-2">{type} ($/kg)</label>
                        <div className="relative">
                            <input 
                            type="number" 
                            value={pricing[key]}
                            onChange={(e) => setPricing({...pricing, [key]: e.target.value})}
                            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-1 focus:ring-green-600 focus:border-green-600 outline-none transition-all pr-8"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-40 pointer-events-none">
                                <ChevronsUpDown size={14} />
                            </div>
                        </div>
                    </div>
                )
            })}
         </div>
       </div>

       <div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Special Routes</h3>
            <button onClick={handleAddRoute} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded text-xs transition-colors">
               <Plus size={14} /> Add Route
            </button>
         </div>
         
         <div className="space-y-3">
            {routes.map((route) => (
               <div key={route.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">{route.name}</span>
                  <div className="relative w-24">
                     <input 
                        type="number" 
                        value={route.price}
                        onChange={(e) => handlePriceChange(route.id, e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-700 text-right focus:border-green-600 outline-none pr-7"
                     />
                     <div className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                       <ChevronsUpDown size={12} />
                     </div>
                  </div>
               </div>
            ))}
         </div>
       </div>
    </div>
  );

  // 2. CARRIERS TAB
  const renderCarriers = () => (
    <div className="animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Available Carriers</h2>
        <p className="text-sm text-gray-400 mb-6">Manage shipping carrier integrations</p>

        <div className="space-y-3">
            {carriers.map(carrier => (
                <div 
                  key={carrier.id} 
                  onClick={() => toggleCarrier(carrier.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all border group ${carrier.enabled ? 'bg-gray-50 border-transparent' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                >
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${carrier.enabled ? 'bg-[#106F3E] border-[#106F3E]' : 'bg-white border-gray-300'}`}>
                        {carrier.enabled && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-medium text-gray-600">{carrier.label}</span>
                </div>
            ))}
        </div>
    </div>
  );

  // 3. WORKFLOW TAB (New)
  const renderWorkflow = () => (
    <div className="animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Status Workflows</h2>
        <p className="text-sm text-gray-400 mb-6">Define package lifecycle and status transitions</p>

        <div className="space-y-3">
            {workflows.map(flow => (
                <div 
                  key={flow.id} 
                  onClick={() => toggleWorkflow(flow.id)}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border group ${flow.enabled ? 'bg-gray-50 border-transparent' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                >
                    {/* Status Flow Visualization */}
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                            {flow.from}
                        </span>
                        <span className="text-gray-400">
                            <ChevronRight size={14} />
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {flow.to}
                        </span>
                    </div>

                    {/* Checkbox RIGHT */}
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${flow.enabled ? 'bg-[#106F3E] border-[#106F3E]' : 'bg-white border-gray-300'}`}>
                        {flow.enabled && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  // 4. QR LABELS TAB (New)
  const renderQrLabels = () => (
    <div className="animate-fadeIn space-y-8">
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">QR Label Configuration</h2>
            <p className="text-sm text-gray-400 mb-6">Configure QR code format and printing options</p>
            
            <label className="block text-sm text-gray-500 mb-2">QR Code Format</label>
            <div className="relative">
                <select 
                    value={qrConfig.format}
                    onChange={(e) => setQrConfig({...qrConfig, format: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-gray-700 appearance-none outline-none focus:bg-white focus:border-green-600 transition-colors cursor-pointer"
                >
                    <option>Standard (100*100mm)</option>
                    <option>Compact (50*50mm)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronsUpDown size={16} />
                </div>
            </div>
        </div>

        <div>
            <label className="block text-sm text-gray-500 mb-4">Include Information</label>
            <div className="space-y-3">
                {qrConfig.fields.map(field => (
                    <div 
                        key={field.id} 
                        onClick={() => toggleQrField(field.id)}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        {/* Checkbox LEFT */}
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${field.enabled ? 'bg-[#106F3E] border-[#106F3E]' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                            {field.enabled && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-sm ${field.enabled ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                            {field.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  // 5. NOTIFICATIONS TAB
  const renderNotifications = () => (
    <div className="animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Notification Settings</h2>
        <p className="text-sm text-gray-400 mb-6">Configure which alerts to receive</p>

        <div className="space-y-3">
            {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  onClick={() => toggleNotification(notif.id)}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border group ${notif.enabled ? 'bg-gray-50 border-transparent' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                >
                    <span className="font-medium text-gray-600">{notif.label}</span>
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${notif.enabled ? 'bg-[#106F3E] border-[#106F3E]' : 'bg-white border-gray-300'}`}>
                        {notif.enabled && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  // 6. REPORTS TAB
  const renderReports = () => (
    <div className="animate-fadeIn space-y-6">
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">Report Scheduling</h2>
            <p className="text-sm text-gray-400 mb-6">Configure automatic report generation</p>
            
            <label className="block text-sm text-gray-500 mb-2">Report Recipients</label>
            <textarea 
                rows={4}
                value={config.recipients}
                onChange={(e) => setConfig({...config, recipients: e.target.value})}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-1 focus:ring-green-600 focus:border-green-600 outline-none resize-none placeholder-gray-300"
            />
        </div>

        <div>
            <label className="block text-sm text-gray-500 mb-2">Default Export Format</label>
            <div className="relative">
                <select 
                    value={config.format}
                    onChange={(e) => setConfig({...config, format: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-gray-700 appearance-none outline-none focus:bg-white focus:border-green-600 transition-colors cursor-pointer"
                >
                    <option>Pdf</option>
                    <option>Csv</option>
                    <option>Excel</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronsUpDown size={16} />
                </div>
            </div>
        </div>
    </div>
  );

  // 7. GENERAL TAB
  const renderGeneral = () => (
    <div className="animate-fadeIn space-y-6">
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">General Settings</h2>
            <p className="text-sm text-gray-400 mb-6">Basic system configuration</p>
            
            <label className="block text-sm text-gray-500 mb-2">Report Recipients</label>
            <textarea 
                rows={4}
                value={config.recipients}
                onChange={(e) => setConfig({...config, recipients: e.target.value})}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-1 focus:ring-green-600 focus:border-green-600 outline-none resize-none placeholder-gray-300"
            />
        </div>

        <div>
            <label className="block text-sm text-gray-500 mb-2">Default Export Format</label>
            <div className="relative">
                <select 
                    value={config.format}
                    onChange={(e) => setConfig({...config, format: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-gray-700 appearance-none outline-none focus:bg-white focus:border-green-600 transition-colors cursor-pointer"
                >
                    <option>Pdf</option>
                    <option>Csv</option>
                    <option>Excel</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronsUpDown size={16} />
                </div>
            </div>
        </div>
    </div>
  );

  // --- MENU CONFIG ---
  const menuItems = [
      { id: 'pricing', label: 'Pricing', icon: DollarSign },
      { id: 'carriers', label: 'Carriers', icon: Truck },
      { id: 'workflow', label: 'Workflow', icon: GitMerge },
      { id: 'qr_labels', label: 'QR Lables', icon: QrCode },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'general', label: 'General', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans text-gray-800">
        <Helmet><title>AdminSettings | EXPRESUR</title></Helmet>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                <p className="text-gray-400 mt-1">Configure system preferences and options</p>
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

        {/* --- MAIN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-3">
                {menuItems.map(item => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as TabType)}
                            className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive 
                                    ? 'bg-[#F2FDF5] text-gray-700 border border-[#106F3E] shadow-sm' 
                                    : 'bg-[#F9FAFB] text-gray-500 border border-transparent hover:bg-white hover:shadow-sm'
                                }
                            `}
                        >
                            <span>{item.label}</span>
                            <item.icon size={18} className={isActive ? 'text-[#106F3E]' : 'text-gray-300'} />
                        </button>
                    )
                })}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 bg-white rounded-[32px] p-8 shadow-sm w-full min-h-[600px] flex flex-col justify-between">
                
                {/* Dynamic Content */}
                <div>
                    {activeTab === 'pricing' && renderPricing()}
                    {activeTab === 'carriers' && renderCarriers()}
                    {activeTab === 'workflow' && renderWorkflow()}
                    {activeTab === 'qr_labels' && renderQrLabels()}
                    {activeTab === 'notifications' && renderNotifications()}
                    {activeTab === 'reports' && renderReports()}
                    {activeTab === 'general' && renderGeneral()}
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-12">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#106F3E] text-white rounded-lg text-sm font-medium hover:bg-green-800 active:scale-95 transition-all shadow-md shadow-green-100 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>

        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
            }
            input[type=number]::-webkit-inner-spin-button, 
            input[type=number]::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
        `}</style>
    </div>
  );
};

export default AdminSettings;