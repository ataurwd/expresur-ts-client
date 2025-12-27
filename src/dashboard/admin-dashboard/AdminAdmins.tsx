import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  Layers, 
  DollarSign, 
  CreditCard, 
  Bell, 
  BarChart3,
} from 'lucide-react';
import { Helmet } from 'react-helmet';

/* --- INTERFACES --- */
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  icon: React.ReactNode;
}

interface TableRowProps {
  id: string;
  name: string;
  status: 'In Transit' | 'Delivered' | 'Cancelled';
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
  pct: number;
  color: string;
}

const AdminAdmins = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | EXPRESUR</title>
      </Helmet>

      <div className="min-h-screen bg-[#f6f6f6] font-sans relative">
      <main className="w-full p-8">
        {/* HEADER */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-[30px] font-bold text-gray-800">Admin Panel</h2>
            <p className="text-gray-400 mt-1 text-[18px]">Welcome to EXPRESUR Admin Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard/admin-notifications')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
              <Bell size={20} />
            </button>

            <div onClick={() => navigate('/dashboard/admin-notifications')} className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
              {/* Overlapping small icons like in the image */}
              <div className="relative">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <div className="hidden md:block">
                <h4 className="text-sm font-bold text-gray-800">Tyrion Lannister</h4>
                <p className="text-xs text-gray-500">tyrion@example.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Packages Today" 
            value="7523" 
            change="+12% from last period"
            changeColor="text-green-500"
            icon={<Package size={20} className="text-gray-400" />} 
          />
          <StatCard 
            title="Delayed Packages" 
            value="1284" 
            change="-3% from last period"
            changeColor="text-red-500"
            icon={<Clock size={20} className="text-gray-400" />} 
          />
          <StatCard 
            title="Total pickup requests" 
            value="42" 
            change="Pending pickups"
            changeColor="text-gray-400"
            icon={<Layers size={20} className="text-gray-400" />} 
          />
          <StatCard 
            title="Income" 
            value="$11,300" 
            change="+15% from last period"
            changeColor="text-green-500"
            icon={<DollarSign size={20} className="text-gray-400" />} 
          />
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Packages */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <Package size={16} />
              </span>
              Recent Packages
            </h3>

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="pb-4 font-normal">Tracking Number</th>
                  <th className="pb-4 font-normal">Customer</th>
                  <th className="pb-4 font-normal">Status</th>
                  <th className="pb-4 font-normal text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                <TableRow id="ORD-1001" name="Customer A" status="In Transit" date="1/12/2025" />
                <TableRow id="ORD-1001" name="Customer A" status="Delivered" date="1/12/2025" />
                <TableRow id="ORD-1001" name="Customer A" status="Cancelled" date="1/12/2025" />
              </tbody>
            </table>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <CreditCard size={16} />
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

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Revenue */}
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

            <div className="relative h-64 mt-8">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 256" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                {/* Rising line matching the image */}
                <path d="M0 200 L80 180 L160 160 L240 140 L320 120 L400 100 L480 80 L560 60 L640 40 L720 30 L800 20" 
                      fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                <path d="M0 200 L80 180 L160 160 L240 140 L320 120 L400 100 L480 80 L560 60 L640 40 L720 30 L800 20 L800 256 L0 256 Z" 
                      fill="url(#grad)" />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-4">
                <span>12000</span>
                <span>9000</span>
                <span>6000</span>
                <span>3000</span>
                <span>0</span>
              </div>
            </div>
          </div>

          {/* Shipment Status Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-8">Shipment Status Distribution</h3>
            <div className="space-y-6">
              <ProgressBar label="In Transit" pct={47} color="bg-blue-500" />
              <ProgressBar label="Delivered" pct={30} color="bg-green-500" />
              <ProgressBar label="Assigned" pct={20} color="bg-[#ca4ac8]" />
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

/* --- SUB COMPONENTS --- */
const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeColor, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
    <div className={`text-sm font-medium ${changeColor}`}>{change}</div>
  </div>
);

const TableRow: React.FC<TableRowProps> = ({ id, name, status, date }) => {
  let statusIcon: React.ReactNode;
  let statusColor: string;

  if (status === 'In Transit') {
    statusColor = "text-blue-500";
    statusIcon = <div className="w-5 h-5 rounded-full border-3 border-blue-500" />;
  } else if (status === 'Delivered') {
    statusColor = "text-green-500";
    statusIcon = <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">✓</div>;
  } else {
    statusColor = "text-red-500";
    statusIcon = <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">✕</div>;
  }

  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
      <td className="py-4 text-gray-600 font-medium">{id}</td>
      <td className="py-4 text-gray-600">{name}</td>
      <td className="py-4">
        <div className={`flex items-center gap-2 text-sm font-semibold ${statusColor}`}>
          {statusIcon}
          {status}
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
    <div className="flex justify-between text-sm text-gray-500 mb-2">
      <span>{label}</span>
      <span>{pct}%</span>
    </div>
    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  </div>
);

export default AdminAdmins;