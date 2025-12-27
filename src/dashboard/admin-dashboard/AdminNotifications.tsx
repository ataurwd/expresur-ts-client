import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Bell } from 'lucide-react';

type NotificationItem = {
  id: string;
  title: string;
  time: string;
  body: string;
  read: boolean;
};

const SAMPLE: NotificationItem[] = [
  { id: 'n1', title: 'Notification title', time: '10 mins ago', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the', read: false },
  { id: 'n2', title: 'Notification title', time: '13 mins ago', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the', read: false },
  { id: 'n3', title: 'Notification title', time: '20 mins ago', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the', read: true },
  { id: 'n4', title: 'Notification title', time: '35 mins ago', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the', read: true },
  { id: 'n5', title: 'Notification title', time: '1 hour ago', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the', read: true },
];

const AdminNotifications: React.FC = () => {
  const [items, setItems] = useState<NotificationItem[]>(SAMPLE);
  const [tab, setTab] = useState<'All' | 'Unread'>('All');

  const visible = items.filter(i => (tab === 'All' ? true : !i.read));

  const markRead = (id: string) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, read: true } : p));
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#f8f9fa]">
      <Helmet>
        <title>Notifications Panel | EXPRESUR</title>
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[30px] font-bold text-gray-900">Notifications Panel</h1>
          <p className=" text-[18px] text-gray-500 mt-1">System alerts and important messages</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-400 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
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

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('All')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${tab === 'All' ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              All
            </button>
            <button
              onClick={() => setTab('Unread')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${tab === 'Unread' ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Unread ({items.filter(i => !i.read).length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {visible.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No notifications</div>
          ) : (
            visible.map(n => (
              <div key={n.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-800">{n.title}</h3>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 max-w-[900px]">{n.body}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {!n.read ? (
                      <button onClick={() => markRead(n.id)} className="text-sm text-green-600 font-medium">Mark read</button>
                    ) : (
                      <span className="text-sm text-gray-400">Read</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
