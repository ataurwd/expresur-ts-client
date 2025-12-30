import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster, toast } from 'sonner';
import { 
  Bell, 
  Filter, // For the filter icon in notifications
  MessageCircle, 
  MessageSquare, 
  Mail,
  Headset,
  Menu // Hamburger menu icon
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
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 pb-20 relative">
      <Helmet>
        <title>Notifications | EXPRESUR</title>
      </Helmet>
      <Toaster position="top-center" richColors closeButton />

      {/* --- TOP HEADER (Matches Screenshot) --- */}
      <div className="bg-[#F9FAFB] p-5 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
           {/* Menu Icon */}
           <button className="text-gray-600">
             <Menu size={24} />
           </button>
           {/* EXPRESUR Logo Text */}
           <h1 className="text-2xl font-black text-[#F97316] tracking-tight ml-4">EXPRESUR</h1>
        </div>
        
        <div className="flex items-center gap-4">
             {/* Bell Icon */}
             <Link to="/dashboard/notifications" className="relative p-2 bg-white rounded-full shadow-sm">
                <Bell size={20} className="text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                )}
             </Link>
             {/* Profile Image */}
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrion" alt="User" className="w-9 h-9 rounded-full border border-green-100 bg-white" />
        </div>
      </div>

      <div className="px-5 space-y-6">
        
        {/* --- Page Title --- */}
        <div className="mt-2">
            <h1 className="text-[26px] font-bold text-[#1F2937] leading-tight">Notifications & Support Panel</h1>
            <p className="text-gray-400 text-sm mt-1">System alerts and important messages</p>
        </div>

        {/* --- Notifications Section --- */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50">
           
           {/* Section Header */}
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                    <Bell size={16} />
                 </div>
                 <h3 className="text-lg font-medium text-gray-600">Notifications</h3>
              </div>
              <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition">
                 <Filter size={14} />
              </button>
           </div>

           {/* Tabs (All / Unread) */}
           <div className="flex items-center gap-2 mb-6">
              <button 
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition shadow-sm ${filter === 'all' ? 'bg-[#005f33] text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('unread')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition ${filter === 'unread' ? 'bg-[#005f33] text-white' : 'bg-[#F3F4F6] text-gray-400'}`}
              >
                Unread ({unreadCount})
              </button>
           </div>

           {/* List */}
           <div className="space-y-3">
              {filteredNotifications.map((notif) => (
                <div key={notif.id} className="bg-[#F9FAFB] p-5 rounded-[20px] border border-transparent">
                   <div className="flex flex-wrap justify-between items-baseline mb-2">
                      <h4 className="text-gray-700 font-bold text-[15px]">{notif.title}</h4>
                      <span className="text-[11px] text-gray-400">{notif.time}</span>
                   </div>
                   <p className="text-[13px] text-gray-400 font-medium leading-relaxed">{notif.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* --- Contact Support Section --- */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50 pb-8">
           
           {/* Section Header */}
           <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                    <Headset size={16} />
                 </div>
                 <h3 className="text-lg font-medium text-gray-600">Contact Support</h3>
              </div>
              <p className="text-[13px] text-gray-400 pl-11">Get in touch with our support team.</p>
           </div>

           {/* Support Buttons */}
           <div className="space-y-3">
              
              {/* WhatsApp (Green) */}
              <button onClick={() => handleSupportClick('WhatsApp')} className="w-full bg-[#2E8B57] text-white p-4 rounded-[20px] flex items-center gap-4 text-left shadow-md active:scale-[0.98] transition">
                  <div className="bg-white/20 p-2.5 rounded-full">
                     <MessageCircle size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-[15px]">WhatsApp</h4>
                     <p className="text-[11px] text-white/80 mt-0.5">+1 (555) 123-4567</p>
                  </div>
              </button>

              {/* Live Chat (Blue) */}
              <button onClick={() => handleSupportClick('Live Chat')} className="w-full bg-[#4A6FA5] text-white p-4 rounded-[20px] flex items-center gap-4 text-left shadow-md active:scale-[0.98] transition">
                  <div className="bg-white/20 p-2.5 rounded-full">
                     <MessageSquare size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-[15px]">Live Chat</h4>
                     <p className="text-[11px] text-white/80 mt-0.5">Chat with an agent.</p>
                  </div>
              </button>

              {/* Email Support (Light Blue) */}
              <button onClick={() => handleSupportClick('Email')} className="w-full bg-[#8FA3C3] text-white p-4 rounded-[20px] flex items-center gap-4 text-left shadow-md active:scale-[0.98] transition">
                  <div className="bg-white/20 p-2.5 rounded-full">
                     <Mail size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-[15px]">Email Support</h4>
                     <p className="text-[11px] text-white/90 mt-0.5">support@example.com</p>
                  </div>
              </button>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Notification;