import React from 'react';
import { 
  Package, Users, CreditCard, BarChart3, 
  Bell, ArrowUpRight
} from 'lucide-react';

/* --- INTERFACES --- */

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}

interface TableRowProps {
  id: string;
  name: string;
  status: string;
  date: string;
}

interface TransactionItemProps {
  type: string;
  time: string;
  amount: string;
  color: string;
}

interface ProgressBarProps {
  label: string;
  pct: string;
  color: string;
}

const AdminAdmins = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* MAIN CONTENT */}
      <main className="w-full p-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-gray-400 mt-1">Welcome to EXPRESUR Admin Dashboard</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 pr-6 pl-2 rounded-full shadow-sm">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" 
              alt="User" 
              className="w-10 h-10 rounded-full bg-green-100"
            />
            <div className="hidden md:block">
              <h4 className="text-sm font-bold text-gray-800">Tyrion Lannister</h4>
              <p className="text-xs text-gray-500">tyrion@example.com</p>
            </div>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Packages Today" 
            value="7523" 
            sub="+12% from last period" 
            icon={<Package className="text-gray-400" />} 
          />
          <StatCard 
            title="Delayed Packages" 
            value="1284" 
            sub="-3% from last period" 
            icon={<Users className="text-gray-400" />} 
          />
          <StatCard 
            title="Total pickup requests" 
            value="42" 
            sub="Pending pickups" 
            icon={<Bell className="text-gray-400" />} 
          />
          <StatCard 
            title="Income" 
            value="$11,300" 
            sub="+15% from last period" 
            icon={<CreditCard className="text-gray-400" />} 
          />
        </div>

        {/* MIDDLE SECTION: Table & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Recent Packages Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                   <Package size={16} />
                </span>
                Recent Packages
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-gray-100">
                    <th className="pb-4 font-normal">Tracking Number</th>
                    <th className="pb-4 font-normal">Customer</th>
                    <th className="pb-4 font-normal">Status</th>
                    <th className="pb-4 font-normal text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <TableRow id="ORD-1001" name="Customer A" status="In Transit" date="1/12/2025" />
                  <TableRow id="ORD-1001" name="Customer A" status="Delivered" date="1/12/2025" />
                  <TableRow id="ORD-1001" name="Customer A" status="Cancelled" date="1/12/2025" />
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Transaction */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                   <ArrowUpRight size={16} />
                </span>
                Recent Transaction
              </h3>
              <button className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">Show All</button>
            </div>
            
            <div className="space-y-6">
              <TransactionItem type="Received" time="Today, 11:55 AM" amount="+21.17" color="text-green-500" />
              <TransactionItem type="Pending" time="Yesterday, 3:15 PM" amount="+10.05" color="text-orange-400" />
              <TransactionItem type="Received" time="Yesterday, 3:55 PM" amount="+15.48" color="text-green-500" />
              <TransactionItem type="Pending" time="02/05/2025, 4:24 PM" amount="+20.55" color="text-orange-400" />
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Charts Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
             <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                   <BarChart3 size={16} />
                </span>
                Monthly Revenue
              </h3>
              <button className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">Show All</button>
            </div>
            {/* Simple SVG Chart Mockup */}
            <div className="h-32 flex items-end justify-between px-2 relative">
               <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                 <path d="M0,100 C100,50 200,80 300,20 C400,60 500,10 800,0" fill="none" stroke="#10b981" strokeWidth="2" />
                 <path d="M0,100 C100,50 200,80 300,20 C400,60 500,10 800,0 V128 H0 Z" fill="url(#gradient)" opacity="0.1" />
                 <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                 </defs>
               </svg>
               <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-300">
                 <span>12000</span>
                 <span>9000</span>
               </div>
            </div>
          </div>

          {/* Shipment Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6">Shipment Status Distribution</h3>
            <div className="space-y-6">
              <ProgressBar label="In Transit" pct="47%" color="bg-blue-500" />
              <ProgressBar label="Delivered" pct="30%" color="bg-green-500" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const StatCard: React.FC<StatCardProps> = ({ title, value, sub, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
    <div className={`text-xs ${sub.includes('-') ? 'text-red-400' : sub.includes('Pending') ? 'text-gray-400' : 'text-green-500'}`}>
      {sub}
    </div>
  </div>
);

const TableRow: React.FC<TableRowProps> = ({ id, name, status, date }) => {
  let statusStyles = "";
  let icon: React.ReactNode = null;
  
  if (status === 'In Transit') {
    statusStyles = "text-blue-500";
    icon = <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center"><span className="text-[8px]">i</span></div>;
  } else if (status === 'Delivered') {
    statusStyles = "text-green-500";
    icon = <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">✓</div>;
  } else {
    statusStyles = "text-red-500";
    icon = <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">✕</div>;
  }

  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <td className="py-4 text-gray-600 font-medium">{id}</td>
      <td className="py-4 text-gray-600">{name}</td>
      <td className="py-4">
        <div className={`flex items-center gap-2 ${statusStyles} text-xs font-semibold`}>
          {icon} {status}
        </div>
      </td>
      <td className="py-4 text-right text-gray-500">{date}</td>
    </tr>
  );
};

const TransactionItem: React.FC<TransactionItemProps> = ({ type, time, amount, color }) => (
  <div className="flex justify-between items-center">
    <div>
      <h4 className="text-sm font-semibold text-gray-700">{type}</h4>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
    <span className={`text-sm font-bold ${color}`}>{amount}</span>
  </div>
);

const ProgressBar: React.FC<ProgressBarProps> = ({ label, pct, color }) => (
  <div>
    <div className="flex justify-between text-xs text-gray-500 mb-2">
      <span>{label}</span>
      <span>{pct}</span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: pct }}></div>
    </div>
  </div>
);

export default AdminAdmins;