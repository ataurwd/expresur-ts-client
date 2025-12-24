import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { 
  Bell, 
  Filter, 
  MessageCircle, 
  MessageSquare, 
  Mail,
  Phone,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface NotificationItem {
  id: number;
  title: string;
  time: string;
  desc: string;
  isUnread: boolean;
}

const Notification = () => {
  // --- State ---
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // --- Mock Data ---
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { 
      id: 1, 
      title: 'Transfer Completed', 
      time: '10 mins ago', 
      desc: 'Your $500 transfer to Maria González has been delivered successfully.', 
      isUnread: true 
    },
    { 
      id: 2, 
      title: 'Support Chat', 
      time: '10 mins ago', 
      desc: 'You have a new message from support.', 
      isUnread: true 
    },
    { 
      id: 3, 
      title: 'Wallet Deposit', 
      time: '10 mins ago', 
      desc: 'Your wallet received a $1,000 bank transfer deposit.', 
      isUnread: false 
    },
    { 
      id: 4, 
      title: 'Transfer Delayed', 
      time: '10 mins ago', 
      desc: 'Your transfer to John Smith is delayed. Please allow some processing time.', 
      isUnread: false 
    },
    { 
      id: 5, 
      title: 'Wallet Balance Low', 
      time: '10 mins ago', 
      desc: 'Your wallet balance is low ($50.00). Consider adding funds for future transactions.', 
      isUnread: false 
    },
  ]);

  // --- Logic ---
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return n.isUnread;
    return true;
  });

  const unreadCount = notifications.filter(n => n.isUnread).length;

  // --- Handlers ---
  const handleSupportClick = (type: string) => {
    toast.info(`Opening ${type} support...`);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-10 relative pb-20">
      <Toaster position="top-center" richColors closeButton />

      {/* --- Header --- */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Notifications & Support Panel</h1>
          <p className="text-gray-500 mt-2 text-sm">System alerts and important messages</p>
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

      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Notifications List --- */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Section Header */}
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700">
                 <Bell size={18} />
                 <h3 className="font-medium text-lg">Notifications</h3>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">
                 <Filter size={18} />
              </button>
           </div>

           {/* Filter Tabs */}
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'all' ? 'bg-[#005f33] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('unread')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'unread' ? 'bg-[#005f33] text-white' : 'bg-[#E5E7EB] text-gray-400 hover:bg-gray-200'}`}
              >
                Unread ({unreadCount})
              </button>
           </div>

           {/* Notification Cards */}
           <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <div key={notif.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
                     <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-700 font-bold text-sm">{notif.title}</h4>
                        <span className="text-xs text-gray-400 font-medium">{notif.time}</span>
                     </div>
                     <p className="text-sm text-gray-400 leading-relaxed">{notif.desc}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 bg-white rounded-2xl border border-gray-100">
                   <p>No notifications found.</p>
                </div>
              )}
           </div>

        </div>

        {/* --- Right Column: Contact Support --- */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Section Header */}
           <div>
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                 <Headphones size={18} />
                 <h3 className="font-medium text-lg">Contact Support</h3>
              </div>
              <p className="text-sm text-gray-400">Get in touch with our support team.</p>
           </div>

           {/* Support Options */}
           <div className="space-y-4">
              
              {/* WhatsApp */}
              <button 
                onClick={() => handleSupportClick('WhatsApp')}
                className="w-full bg-[#2E8555] hover:bg-[#256e46] text-white p-5 rounded-2xl flex items-center gap-4 text-left transition shadow-sm group active:scale-[0.99]"
              >
                 <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition">
                    <MessageCircle size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">WhatsApp</h4>
                    <p className="text-xs text-white/80 mt-0.5 font-medium">+1 (555) 123-4567</p>
                 </div>
              </button>

              {/* Live Chat */}
              <button 
                onClick={() => handleSupportClick('Live Chat')}
                className="w-full bg-[#5674A6] hover:bg-[#455e8a] text-white p-5 rounded-2xl flex items-center gap-4 text-left transition shadow-sm group active:scale-[0.99]"
              >
                 <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition">
                    <MessageSquare size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Live Chat</h4>
                    <p className="text-xs text-white/80 mt-0.5 font-medium">Chat with an agent.</p>
                 </div>
              </button>

              {/* Email Support */}
              <button 
                onClick={() => handleSupportClick('Email')}
                className="w-full bg-[#9FB3D0] hover:bg-[#8da3c2] text-white p-5 rounded-2xl flex items-center gap-4 text-left transition shadow-sm group active:scale-[0.99]"
              >
                 <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition">
                    <Mail size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Email Support</h4>
                    <p className="text-xs text-white/90 mt-0.5 font-medium">support@example.com</p>
                 </div>
              </button>

           </div>

        </div>

      </div>
    </div>
  );
};

export default Notification;