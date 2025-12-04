// import React, { useMemo, useState, useEffect } from "react";
// import { Helmet } from "react-helmet";

// type User = {
//   id: string;
//   fullName: string;
//   language: string; // 2-letter code
//   lockerId: string;
//   email: string;
//   phone: string;
//   address: string;
//   country: string;
//   city: string;
//   registrationDate: string;
//   role: string;
//   accountStatus: "active" | "inactive";
// };

// const FAKE_USERS: User[] = [
//   { id: "1", fullName: "Rahim Khan", language: "bn", lockerId: "LKR-1001", email: "rahim.khan@example.com", phone: "+8801711000001", address: "Mirpur 10, Dhaka", country: "Bangladesh", city: "Dhaka", registrationDate: "2025-01-10", role: "client", accountStatus: "active" },
//   { id: "2", fullName: "Ayesha Begum", language: "bn", lockerId: "LKR-1002", email: "ayesha.begum@example.com", phone: "+8801711000002", address: "Banani DOHS, Dhaka", country: "Bangladesh", city: "Dhaka", registrationDate: "2025-01-11", role: "client", accountStatus: "active" },
//   { id: "3", fullName: "Mohammed Al-Saud", language: "ar", lockerId: "LKR-1003", email: "mohammed.alsaud@example.com", phone: "+966500000003", address: "Riyadh Olaya Street", country: "Saudi Arabia", city: "Riyadh", registrationDate: "2025-01-08", role: "client", accountStatus: "active" },
//   { id: "4", fullName: "Priya Sharma", language: "hi", lockerId: "LKR-2001", email: "priya.sharma@example.com", phone: "+919900000004", address: "Andheri East, Mumbai", country: "India", city: "Mumbai", registrationDate: "2025-01-09", role: "client", accountStatus: "inactive" },
//   { id: "5", fullName: "John Smith", language: "en", lockerId: "LKR-3001", email: "john.smith@example.co.uk", phone: "+447700000005", address: "Heathrow Airport, London", country: "United Kingdom", city: "London", registrationDate: "2025-01-05", role: "client", accountStatus: "active" },
//   { id: "6", fullName: "Fatema Akter", language: "bn", lockerId: "LKR-1004", email: "—", phone: "—", address: "Sylhet Ambarkhana", country: "Bangladesh", city: "Sylhet", registrationDate: "2025-01-07", role: "client", accountStatus: "active" },
//   { id: "7", fullName: "Marie Dubois", language: "fr", lockerId: "LKR-4001", email: "—", phone: "—", address: "Paris CDG Airport", country: "France", city: "Paris", registrationDate: "2025-01-06", role: "client", accountStatus: "active" },
//   { id: "8", fullName: "Li Wei", language: "zh", lockerId: "LKR-5001", email: "—", phone: "—", address: "Shanghai Pudong", country: "China", city: "Shanghai", registrationDate: "2025-01-04", role: "client", accountStatus: "active" },
//   { id: "9", fullName: "Carlos Mendoza", language: "es", lockerId: "LKR-6001", email: "carlos.m@example.com", phone: "+34600000009", address: "Madrid Barajas Airport", country: "Spain", city: "Madrid", registrationDate: "2025-01-03", role: "client", accountStatus: "active" },
//   { id: "10", fullName: "Anna Müller", language: "de", lockerId: "LKR-7001", email: "anna.mueller@example.de", phone: "+491700000010", address: "Frankfurt Airport", country: "Germany", city: "Frankfurt", registrationDate: "2025-01-02", role: "client", accountStatus: "active" },
//   { id: "11", fullName: "Sofia Ahmed", language: "bn", lockerId: "LKR-1005", email: "sofia.ahmed@example.com", phone: "+8801911000011", address: "Uttara Sector 14, Dhaka", country: "Bangladesh", city: "Dhaka", registrationDate: "2025-01-12", role: "client", accountStatus: "active" },
//   { id: "12", fullName: "Abdul Karim", language: "bn", lockerId: "LKR-1006", email: "—", phone: "—", address: "Chattogram Port Area", country: "Bangladesh", city: "Chattogram", registrationDate: "2025-01-01", role: "client", accountStatus: "inactive" },
//   { id: "13", fullName: "Hassan Ali", language: "ar", lockerId: "LKR-8001", email: "hassan.ali@example.ae", phone: "+971500000013", address: "Dubai Marina", country: "UAE", city: "Dubai", registrationDate: "2024-12-30", role: "client", accountStatus: "active" },
//   { id: "14", fullName: "Elena Petrova", language: "ru", lockerId: "LKR-9001", email: "elena.p@example.ru", phone: "+79000000014", address: "Moscow Sheremetyevo", country: "Russia", city: "Moscow", registrationDate: "2024-12-28", role: "client", accountStatus: "active" },
//   { id: "15", fullName: "Kim Ji-hoon", language: "ko", lockerId: "LKR-1101", email: "—", phone: "—", address: "Incheon Airport", country: "South Korea", city: "Seoul", registrationDate: "2025-01-10", role: "client", accountStatus: "active" },
//   { id: "16", fullName: "Lucas Silva", language: "pt", lockerId: "LKR-1201", email: "lucas.silva@example.br", phone: "+5511900000016", address: "São Paulo Guarulhos", country: "Brazil", city: "São Paulo", registrationDate: "2025-01-09", role: "client", accountStatus: "inactive" },
//   { id: "17", fullName: "Fatima Zahra", language: "ar", lockerId: "LKR-1301", email: "fatima.z@example.ma", phone: "+212600000017", address: "Casablanca Mohammed V", country: "Morocco", city: "Casablanca", registrationDate: "2025-01-07", role: "client", accountStatus: "active" },
//   { id: "18", fullName: "Tanvir Rahman", language: "bn", lockerId: "LKR-1007", email: "tanvir.rahman@example.com", phone: "+8801811000018", address: "Khulna University Road", country: "Bangladesh", city: "Khulna", registrationDate: "2025-01-11", role: "client", accountStatus: "active" },
//   { id: "19", fullName: "Mei Chen", language: "zh", lockerId: "LKR-1401", email: "mei.chen@example.cn", phone: "+8613800000019", address: "Beijing Capital Airport", country: "China", city: "Beijing", registrationDate: "2025-01-04", role: "client", accountStatus: "active" },
//   { id: "20", fullName: "Omar Farooq", language: "ur", lockerId: "LKR-1501", email: "omar.farooq@example.pk", phone: "+923000000020", address: "Karachi Jinnah Airport", country: "Pakistan", city: "Karachi", registrationDate: "2025-01-06", role: "client", accountStatus: "active" }
// ];

// function useDebounce<T>(value: T, delay = 300): T {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return debounced;
// }

// export default function AdminUsers() {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query);
//   const [page, setPage] = useState(1);
//   const perPage = 10;
//   const [selected, setSelected] = useState<User | null>(null);

//   const filtered = useMemo(() => {
//     const q = debouncedQuery.toLowerCase();
//     return FAKE_USERS.filter(u =>
//       `${u.fullName} ${u.lockerId} ${u.email} ${u.phone} ${u.address} ${u.country}`.toLowerCase().includes(q)
//     );
//   }, [debouncedQuery]);

//   const totalPages = Math.ceil(filtered.length / perPage);
//   const paged = filtered.slice((page - 1) * perPage, page * perPage);

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
//         <Helmet><title>Admin Users | EXPRESUR</title></Helmet>
//         <div className="max-w-screen-2xl mx-auto p-6">
//           {/* Header */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-[#0f172a] mb-4">All Users</h2>
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name, locker ID, email, phone..."
//               className="w-full max-w-lg px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#166534] text-base"
//             />
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-[#166534] text-white text-left text-sm">
//                 <tr>
//                   <th className="px-4 py-3">Full Name</th>
//                   <th className="px-4 py-3 w-16 text-center">Lang</th>
//                   <th className="px-4 py-3">Locker ID</th>
//                   <th className="px-4 py-3">Email Address</th>
//                   <th className="px-4 py-3">Phone</th>
//                   <th className="px-4 py-3">Address / Country / City</th>
//                   <th className="px-4 py-3">Registration Date</th>
//                   <th className="px-4 py-3">User Role</th>
//                   <th className="px-4 py-3">Account Status</th>
//                   <th className="px-4 py-3 text-right pr-8">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm">
//                 {paged.map((user) => (
//                   <tr key={user.id} className="border-b hover:bg-[#f0fdf4] transition">
//                     <td className="px-4 py-4 font-medium">{user.fullName}</td>
//                     <td className="px-4 py-4 text-center">
//                       <span className="inline-block w-8 h-8 rounded-full overflow-hidden border">
//                         <img src={`https://flagcdn.com/48x36/${user.language === "bn" ? "bd" : user.language === "ar" ? "sa" : user.language === "hi" ? "in" : user.language === "en" ? "gb" : user.language === "fr" ? "fr" : user.language === "zh" ? "cn" : "bd"}.png`} alt={user.language} className="w-full h-full object-cover" />
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 font-mono font-bold text-[#166534] text-base">{user.lockerId}</td>
//                     <td className="px-4 py-4 text-gray-700">{user.email}</td>
//                     <td className="px-4 py-4 text-gray-700">{user.phone}</td>
//                     <td className="px-4 py-4 text-gray-700 max-w-md">
//                       <span className="truncate block">{user.address}, {user.country} • {user.city}</span>
//                     </td>
//                     <td className="px-4 py-4">{user.registrationDate}</td>
//                     <td className="px-4 py-4 capitalize">{user.role}</td>
//                     <td className="px-4 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.accountStatus === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                         {user.accountStatus}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 text-right">
//                       <button
//                         onClick={() => setSelected(user)}
//                         className="px-5 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#114e2a] text-sm font-medium transition"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-4">
//             {paged.map((user) => (
//               <div key={user.id} className="bg-white rounded-xl shadow border p-5">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="font-bold text-lg">{user.fullName}</h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <img src={`https://flagcdn.com/32x24/${user.language === "bn" ? "bd" : user.language === "ar" ? "sa" : user.language === "hi" ? "in" : user.language === "en" ? "gb" : user.language === "fr" ? "fr" : user.language === "zh" ? "cn" : "bd"}.png`} alt="" className="w-8 h-6 rounded" />
//                       <span className="font-mono font-bold text-[#166534] text-xl">{user.lockerId}</span>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.accountStatus === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                     {user.accountStatus}
//                   </span>
//                 </div>

//                 <div className="text-sm space-y-1 text-gray-600">
//                   <p><strong>Email:</strong> {user.email}</p>
//                   <p><strong>Phone:</strong> {user.phone}</p>
//                   <p><strong>Address:</strong> {user.address}, {user.city}, {user.country}</p>
//                   <p><strong>Registered:</strong> {user.registrationDate}</p>
//                 </div>

//                 <button
//                   onClick={() => setSelected(user)}
//                   className="mt-4 w-full py-3 bg-[#166534] text-white rounded-lg hover:bg-[#114e2a] font-medium"
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="mt-10 flex justify-center items-center gap-4">
//             <button
//               onClick={() => setPage(p => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-8 py-3 border-2 border-[#166534] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             <span className="text-lg">Page {page} of {totalPages}</span>
//             <button
//               onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="px-8 py-3 border-2 border-[#166534] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Detail Modal */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
//           <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
//             <h3 className="text-2xl font-bold text-[#166534] mb-6">{selected.fullName}'s Profile</h3>
//             <div className="grid md:grid-cols-2 gap-6 text-lg">
//               <div>
//                 <p><strong>Full Name:</strong> {selected.fullName}</p>
//                 <p><strong>Email:</strong> {selected.email}</p>
//                 <p><strong>Phone:</strong> {selected.phone}</p>
//                 <p><strong>Locker ID:</strong> <span className="font-mono font-bold text-[#166534]">{selected.lockerId}</span></p>
//               </div>
//               <div>
//                 <p><strong>Address:</strong> {selected.address}, {selected.city}, {selected.country}</p>
//                 <p><strong>Registration Date:</strong> {selected.registrationDate}</p>
//                 <p><strong>Role:</strong> {selected.role}</p>
//                 <p><strong>Status:</strong> <span className={`capitalize ${selected.accountStatus === "active" ? "text-green-600" : "text-red-600"}`}>{selected.accountStatus}</span></p>
//               </div>
//             </div>
//             <div className="mt-10 text-right">
//               <button onClick={() => setSelected(null)} className="px-12 py-4 bg-[#166534] text-white rounded-xl hover:bg-[#114e2a] text-lg">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet";

type User = {
  id: string;
  fullName: string;
  lockerId: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  registrationDate: string;
};

const FAKE_USERS: User[] = [
  { id: "1", fullName: "Rahim Khan", lockerId: "LKR-1001", email: "rahim.khan@example.com", phone: "+8801711000001", address: "Mirpur 10, Dhaka", country: "Bangladesh", city: "Dhaka", registrationDate: "2025-01-10" },
  { id: "2", fullName: "Ayesha Begum", lockerId: "LKR-1002", email: "ayesha.begum@example.com", phone: "+8801711000002", address: "Banani DOHS, Dhaka", country: "Bangladesh", city: "Dhaka", registrationDate: "2025-01-11" },
  { id: "3", fullName: "Mohammed Al-Saud", lockerId: "LKR-1003", email: "mohammed.alsaud@example.com", phone: "+966500000003", address: "Riyadh Olaya Street", country: "Saudi Arabia", city: "Riyadh", registrationDate: "2025-01-08" },
  { id: "4", fullName: "Priya Sharma", lockerId: "LKR-2001", email: "priya.sharma@example.com", phone: "+919900000004", address: "Andheri East, Mumbai", country: "India", city: "Mumbai", registrationDate: "2025-01-09" },
  { id: "5", fullName: "John Smith", lockerId: "LKR-3001", email: "john.smith@example.co.uk", phone: "+447700000005", address: "Heathrow Airport, London", country: "United Kingdom", city: "London", registrationDate: "2025-01-05" },
  { id: "6", fullName: "Fatema Akter", lockerId: "LKR-1004", email: "—", phone: "—", address: "Sylhet Ambarkhana", country: "Bangladesh", city: "Sylhet", registrationDate: "2025-01-07" },
  { id: "7", fullName: "Marie Dubois", lockerId: "LKR-4001", email: "—", phone: "—", address: "Paris CDG Airport", country: "France", city: "Paris", registrationDate: "2025-01-06" },
  { id: "8", fullName: "Li Wei", lockerId: "LKR-5001", email: "—", phone: "—", address: "Shanghai Pudong", country: "China", city: "Shanghai", registrationDate: "2025-01-04" },
  { id: "9", fullName: "Carlos Mendoza", lockerId: "LKR-6001", email: "carlos.m@example.com", phone: "+34600000009", address: "Madrid Barajas Airport", country: "Spain", city: "Madrid", registrationDate: "2025-01-03" },
  { id: "10", fullName: "Anna Müller", lockerId: "LKR-7001", email: "anna.mueller@example.de", phone: "+491700000010", address: "Frankfurt Airport", country: "Germany", city: "Frankfurt", registrationDate: "2025-01-02" },
  { id: "11", fullName: "Sofia Ahmed", lockerId: "LKR-1005", email: "sofia.ahmed@example.com", phone: "+8801911000011", address: "Uttara Sector 14, Dhaka", country: "Bangladesh", city: "Dhaka", registrationDate: "2025-01-12" },
  { id: "12", fullName: "Abdul Karim", lockerId: "LKR-1006", email: "—", phone: "—", address: "Chattogram Port Area", country: "Bangladesh", city: "Chattogram", registrationDate: "2025-01-01" },
  { id: "13", fullName: "Hassan Ali", lockerId: "LKR-8001", email: "hassan.ali@example.ae", phone: "+971500000013", address: "Dubai Marina", country: "UAE", city: "Dubai", registrationDate: "2024-12-30" },
  { id: "14", fullName: "Elena Petrova", lockerId: "LKR-9001", email: "elena.p@example.ru", phone: "+79000000014", address: "Moscow Sheremetyevo", country: "Russia", city: "Moscow", registrationDate: "2024-12-28" },
  { id: "15", fullName: "Kim Ji-hoon", lockerId: "LKR-1101", email: "—", phone: "—", address: "Incheon Airport", country: "South Korea", city: "Seoul", registrationDate: "2025-01-10" },
  { id: "16", fullName: "Lucas Silva", lockerId: "LKR-1201", email: "lucas.silva@example.br", phone: "+5511900000016", address: "São Paulo Guarulhos", country: "Brazil", city: "São Paulo", registrationDate: "2025-01-09" },
  { id: "17", fullName: "Fatima Zahra", lockerId: "LKR-1301", email: "fatima.z@example.ma", phone: "+212600000017", address: "Casablanca Mohammed V", country: "Morocco", city: "Casablanca", registrationDate: "2025-01-07" },
  { id: "18", fullName: "Tanvir Rahman", lockerId: "LKR-1007", email: "tanvir.rahman@example.com", phone: "+8801811000018", address: "Khulna University Road", country: "Bangladesh", city: "Khulna", registrationDate: "2025-01-11" },
  { id: "19", fullName: "Mei Chen", lockerId: "LKR-1401", email: "mei.chen@example.cn", phone: "+8613800000019", address: "Beijing Capital Airport", country: "China", city: "Beijing", registrationDate: "2025-01-04" },
  { id: "20", fullName: "Omar Farooq", lockerId: "LKR-1501", email: "omar.farooq@example.pk", phone: "+923000000020", address: "Karachi Jinnah Airport", country: "Pakistan", city: "Karachi", registrationDate: "2025-01-06" }
];

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return FAKE_USERS.filter(u =>
      `${u.fullName} ${u.lockerId} ${u.email} ${u.phone} ${u.address} ${u.country}`.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
        <Helmet><title>Admin Users | EXPRESUR</title></Helmet>
        <div className="max-w-screen-2xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">All Users</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, locker ID, email, phone..."
              className="w-full max-w-lg px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#166534] text-base"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#166534] text-white text-left text-sm">
                <tr>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Locker ID</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Address / Country / City</th>
                  <th className="px-4 py-3">Registration Date</th>
                  <th className="px-4 py-3 text-right pr-8">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paged.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-[#f0fdf4] transition">
                    <td className="px-4 py-4 font-medium">{user.fullName}</td>
                    <td className="px-4 py-4 font-mono font-bold text-[#166534] text-base">{user.lockerId}</td>
                    <td className="px-4 py-4 text-gray-700">{user.email}</td>
                    <td className="px-4 py-4 text-gray-700">{user.phone}</td>
                    <td className="px-4 py-4 text-gray-700 max-w-md">
                      <span className="truncate block">{user.address}, {user.country} • {user.city}</span>
                    </td>
                    <td className="px-4 py-4">{user.registrationDate}</td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => setSelected(user)}
                        className="px-5 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#114e2a] text-sm font-medium transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {paged.map((user) => (
              <div key={user.id} className="bg-white rounded-xl shadow border p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{user.fullName}</h3>
                    <p className="font-mono font-bold text-[#166534] text-xl mt-1">{user.lockerId}</p>
                  </div>
                </div>
                <div className="text-sm space-y-1 text-gray-600">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Address:</strong> {user.address}, {user.city}, {user.country}</p>
                  <p><strong>Registered:</strong> {user.registrationDate}</p>
                </div>
                <button
                  onClick={() => setSelected(user)}
                  className="mt-4 w-full py-3 bg-[#166534] text-white rounded-lg hover:bg-[#114e2a] font-medium"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-8 py-3 border-2 border-[#166534] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-lg">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-8 py-3 border-2 border-[#166534] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-[#166534] mb-6">{selected.fullName}'s Profile</h3>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div>
                <p><strong>Full Name:</strong> {selected.fullName}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Phone:</strong> {selected.phone}</p>
                <p><strong>Locker ID:</strong> <span className="font-mono font-bold text-[#166534]">{selected.lockerId}</span></p>
              </div>
              <div>
                <p><strong>Address:</strong> {selected.address}, {selected.city}, {selected.country}</p>
                <p><strong>Registration Date:</strong> {selected.registrationDate}</p>
              </div>
            </div>
            <div className="mt-10 text-right">
              <button onClick={() => setSelected(null)} className="px-12 py-4 bg-[#166534] text-white rounded-xl hover:bg-[#114e2a] text-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}