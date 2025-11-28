import React, { useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joined: string;
};

export default function Users() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [sortBy, setSortBy] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // --- Fake data ---
  const fakeUsers: User[] = useMemo(() => ([
    { id: 'u1', name: 'Arif Hossain', email: 'arif@example.com', role: 'Admin', status: 'active', joined: '2024-02-11' },
    { id: 'u2', name: 'Sabba K', email: 'sabba@example.com', role: 'Manager', status: 'active', joined: '2024-05-03' },
    { id: 'u3', name: 'Rumana Akter', email: 'rumana@example.com', role: 'Editor', status: 'inactive', joined: '2023-10-25' },
    { id: 'u4', name: 'Jahidul Islam', email: 'jahid@example.com', role: 'Support', status: 'active', joined: '2022-08-14' },
    { id: 'u5', name: 'Lima Sultana', email: 'lima@example.com', role: 'Editor', status: 'active', joined: '2024-01-01' },
    { id: 'u6', name: 'Tarek Rahman', email: 'tarek@example.com', role: 'Viewer', status: 'inactive', joined: '2021-12-12' },
    { id: 'u7', name: 'Nadia Noor', email: 'nadia@example.com', role: 'Manager', status: 'active', joined: '2023-06-05' },
    { id: 'u8', name: 'Imran H', email: 'imran@example.com', role: 'Viewer', status: 'active', joined: '2020-03-30' },
    { id: 'u9', name: 'Papon K', email: 'papon@example.com', role: 'Support', status: 'active', joined: '2022-11-20' },
    { id: 'u10', name: 'Fariha Binte', email: 'fariha@example.com', role: 'Editor', status: 'active', joined: '2024-06-07' },
    { id: 'u11', name: 'Rifat Chowdhury', email: 'rifat@example.com', role: 'Viewer', status: 'inactive', joined: '2019-09-18' },
    { id: 'u12', name: 'Sadia S', email: 'sadia@example.com', role: 'Admin', status: 'active', joined: '2024-09-28' }
  ]), []);

  // --- Helpers ---
  function formatDate(d: string) {
    const date = new Date(d);
    return date.toLocaleDateString();
  }

  function avatarInitials(name: string) {
    return name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase();
  }

  // --- Filtering, sorting ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = fakeUsers.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );

    list = list.sort((a,b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      if (aVal === bVal) return 0;
      if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return list;
  }, [query, sortBy, sortDir, fakeUsers]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  function toggleSort(column: keyof User) {
    if (sortBy === column) setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    else { setSortBy(column); setSortDir('asc'); }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[480px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Users</h2>
            <p className="text-sm text-gray-500">Manage application users — search, sort and perform actions.</p>
          </div>
          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={e=>{ setQuery(e.target.value); setPage(1); }}
              placeholder="Search by name, email or role..."
              className="px-3 py-2 border rounded-md shadow-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">New User</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4 cursor-pointer" onClick={()=>toggleSort('email')}>Email</th>
                <th className="text-left p-4 cursor-pointer" onClick={()=>toggleSort('role')}>Role</th>
                <th className="text-left p-4 cursor-pointer" onClick={()=>toggleSort('status')}>Status</th>
                <th className="text-left p-4 cursor-pointer" onClick={()=>toggleSort('joined')}>Joined</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-800 font-semibold">{avatarInitials(u.name)}</div>
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </div>
                  </td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-md border text-gray-700">{u.role}</span>
                  </td>
                  <td className="p-4">
                    {u.status === 'active' ? (
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Inactive</span>
                    )}
                  </td>
                  <td className="p-4">{formatDate(u.joined)}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Edit</button>
                      <button className="px-3 py-1 border rounded-md text-sm text-red-600 hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">Showing {total === 0 ? 0 : start + 1} - {Math.min(start + perPage, total)} of {total} users</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              disabled={page === 1}
            >Prev</button>
            <div className="flex items-center gap-1">
              {Array.from({length: pageCount}).map((_,i) => (
                <button
                  key={i}
                  onClick={() => setPage(i+1)}
                  className={`px-3 py-1 rounded-md ${page===i+1 ? 'bg-indigo-600 text-white' : 'border'}`}
                >{i+1}</button>
              ))}
            </div>
            <button
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              disabled={page === pageCount}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
