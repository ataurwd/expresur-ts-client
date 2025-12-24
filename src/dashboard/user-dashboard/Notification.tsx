import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { 
  Bell, 
  Filter, 
  MessageCircle, 
  MessageSquare, 
  Mail,
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
  const [notifications] = useState<NotificationItem[]>([
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
  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') return notifications.filter(n => n.isUnread);
    return notifications;
  }, [notifications, filter]);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  // --- Handlers ---
  const handleSupportClick = (type: string) => {
    toast.info(`Opening ${type}...`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-800 p-6 md:p-10 relative pb-20">
      <Toaster position="top-center" richColors closeButton />

      {/* --- Header --- */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Notifications & Support Panel</h1>
          <p className="text-gray-400 mt-2 text-sm">System alerts and important messages</p>
        </div>

        <div className="flex items-center gap-6 mt-6 md:mt-0">
           {/* Notification Bell */}
           <Link to="/dashboard/notifications">
            <button className="relative p-2.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:bg-gray-50 border border-gray-100 transition">
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              )}
            </button>
           </Link>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-full border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md transition">
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
        
        {/* --- Left Column: Notifications List (Now inside a Card like Support) --- */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-[30px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100">
             
             {/* Section Header */}
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                   <Bell size={20} />
                   <h3 className="font-medium text-lg text-gray-600">Notifications</h3>
                </div>
                <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100 transition">
                   <Filter size={16} />
                </button>
             </div>

             {/* Filter Tabs */}
             <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-5 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'all' ? 'bg-[#005f33] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('unread')}
                  className={`px-5 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'unread' ? 'bg-[#005f33] text-white' : 'bg-[#F3F4F6] text-gray-400 hover:bg-gray-200'}`}
                >
                  Unread ({unreadCount})
                </button>
             </div>

             {/* Notification Cards List */}
             <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className="bg-[#F9FAFB] p-6 rounded-[20px] border border-transparent transition hover:border-gray-100 cursor-default"
                    >
                       <div className="flex items-baseline gap-2 mb-1.5">
                          <h4 className="text-gray-600 font-bold text-[15px] tracking-tight">{notif.title}</h4>
                          <span className="text-xs text-gray-400 font-normal">{notif.time}</span>
                       </div>
                       <p className="text-sm text-gray-400 font-medium leading-relaxed">{notif.desc}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400 bg-[#F9FAFB] rounded-[20px]">
                     <p>No notifications found.</p>
                  </div>
                )}
             </div>
           </div>
        </div>

        {/* --- Right Column: Contact Support --- */}
        <div className="lg:col-span-1">
           <div className="bg-white rounded-[30px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100 h-fit sticky top-6">
              
               {/* Section Header */}
               <div className="mb-8">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                     <Headphones size={20} />
                     <h3 className="font-medium text-lg text-gray-600">Contact Support</h3>
                  </div>
                  <p className="text-sm text-gray-400 pl-8">Get in touch with our support team.</p>
               </div>

               {/* Support Options */}
               <div className="space-y-4">
                  
                  {/* WhatsApp */}
                  <button 
                    onClick={() => handleSupportClick('WhatsApp')}
                    className="w-full bg-[#238652] hover:bg-[#1e7547] text-white p-5 rounded-2xl flex items-center gap-4 text-left transition shadow-md active:scale-[0.99] group"
                  >
                     <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition">
                        <MessageCircle size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                        <h4 className="font-bold text-[15px]">WhatsApp</h4>
                        <p className="text-xs text-white/80 mt-1 font-medium">+1 (555) 123-4567</p>
                     </div>
                  </button>

                  {/* Live Chat */}
                  <button 
                    onClick={() => handleSupportClick('Live Chat')}
                    className="w-full bg-[#5876a6] hover:bg-[#4a648f] text-white p-5 rounded-2xl flex items-center gap-4 text-left transition shadow-md active:scale-[0.99] group"
                  >
                     <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition">
                        <MessageSquare size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                        <h4 className="font-bold text-[15px]">Live Chat</h4>
                        <p className="text-xs text-white/80 mt-1 font-medium">Chat with an agent.</p>
                     </div>
                  </button>

                  {/* Email Support */}
                  <button 
                    onClick={() => handleSupportClick('Email')}
                    className="w-full bg-[#a2b6d3] hover:bg-[#91a6c4] text-white p-5 rounded-2xl flex items-center gap-4 text-left transition shadow-md active:scale-[0.99] group"
                  >
                     <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/30 transition">
                        <Mail size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                        <h4 className="font-bold text-[15px]">Email Support</h4>
                        <p className="text-xs text-white/90 mt-1 font-medium">support@example.com</p>
                     </div>
                  </button>

               </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Notification;