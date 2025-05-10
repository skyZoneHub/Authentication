// 'use client';

// import { useState } from 'react';

// export default function AdminDashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const stats = [
//     { icon: '👥', value: 120, label: 'Total Users' },
//     { icon: '📊', value: 18, label: 'Active Projects' },
//     { icon: '⚙️', value: 5, label: 'Pending Approvals' },
//   ];

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
//       {/* Sidebar */}
//       <aside
//         className={`fixed z-40 md:static w-64 bg-gray-800 p-4 h-full transition-transform duration-300 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0`}
//       >
//         <div className="md:hidden flex justify-end mb-4">
//           <button onClick={() => setSidebarOpen(false)} className="text-xl">
//             ✖
//           </button>
//         </div>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="mb-4 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400"
//         />
//         <nav className="space-y-4">
//           <a href="#" className="flex items-center gap-2 hover:text-blue-400">📊 Admin Dashboard</a>
//           <a href="#" className="flex items-center gap-2 hover:text-blue-400">🧑‍💻 Manage Users</a>
//           <a href="#" className="flex items-center gap-2 hover:text-blue-400">📂 Project Oversight</a>
//           <a href="#" className="flex items-center gap-2 hover:text-blue-400">⚠️ Approvals</a>
//         </nav>
//         <div className="absolute bottom-4 left-4">
//           <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">A</div>
//         </div>
//       </aside>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-auto">
//         {/* Topbar */}
//         <header className="bg-gray-800 px-4 py-3 flex justify-between items-center md:px-6 relative">
//           <button
//             className="md:hidden text-xl"
//             onClick={() => setSidebarOpen(true)}
//           >
//             ☰
//           </button>

//           <div className="flex items-center gap-4 ml-auto relative">
//             <span className="text-xl cursor-pointer">🔔</span>

//             <div className="relative">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="bg-black text-white px-3 py-1 rounded-full flex items-center"
//               >
//                 Admin
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-50">
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm hover:bg-gray-600"
//                   >
//                     View Profile
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
//                   >
//                     Logout
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="p-4 md:p-6">
//           <h1 className="text-2xl font-bold mb-6">Welcome, Admin</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {stats.map((item, index) => (
//               <div key={index} className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4 shadow-md">
//                 <span className="text-3xl">{item.icon}</span>
//                 <div>
//                   <div className="text-xl font-bold">{item.value}</div>
//                   <div className="text-sm text-gray-400">{item.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
