'use client';

import { useState } from 'react';
import DashboardHome from './components/DashboardHome';
import MyTeamSection from './components/MyTeamSection';
import MyProjectsSection from './components/MyProjectsSection';
import SubmitFilesSection from './components/SubmitFilesSection';
import FeedbackSection from './components/FeedbackSection';
import SettingsSection from './components/SettingsSection';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('dashboard');

  interface HandleSidebarClickProps {
    (page: string): void;
  }

  const handleSidebarClick: HandleSidebarClickProps = (page) => {
    setSelectedPage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className={`fixed z-40 md:static w-64 bg-gray-800 shadow-2xs p-4 h-full transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl md:shadow-2xl`}>
        <div className="mb-6 ">
          <div className=" text-2xl font-bold">Welcome, User 👋</div>
        </div>
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)} className="text-xl">✖</button>
        </div>

        <nav className="space-y-4">
          <button onClick={() => handleSidebarClick('dashboard')} className="flex items-center gap-2 hover:text-blue-400">🏠 Dashboard</button>
          <button onClick={() => handleSidebarClick('myProjects')} className="flex items-center gap-2 hover:text-blue-400">📄 My Projects</button>
          <button onClick={() => handleSidebarClick('submitFiles')} className="flex items-center gap-2 hover:text-blue-400">📤 Submit Files</button>
          <button onClick={() => handleSidebarClick('myTeam')} className="flex items-center gap-2 hover:text-blue-400">👥 My Team</button>
          <button onClick={() => handleSidebarClick('feedback')} className="flex items-center gap-2 hover:text-blue-400">💬 Feedback</button>
          <button onClick={() => handleSidebarClick('settings')} className="flex items-center gap-2 hover:text-blue-400" >⚙️ Settings</button>
        </nav>

        <div className="absolute bottom-4 left-4">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">U</div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-50 bg-gray-800 px-4 py-3 flex justify-between items-center md:px-6 shadow-md">
          <button className="md:hidden text-xl" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="flex items-center gap-4 ml-auto relative">
            <span className="text-xl cursor-pointer">🔔</span>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="bg-black text-white px-3 py-1 rounded-full flex items-center">My Profile</button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-50">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">View Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-600">Logout</a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="p-4 md:p-6">
          {selectedPage === 'dashboard' && <DashboardHome />}
          {selectedPage === 'myTeam' && <MyTeamSection />}
          {selectedPage === 'myProjects' && <MyProjectsSection />}
          {selectedPage === 'submitFiles' && <SubmitFilesSection />}
          {selectedPage === 'feedback' && <FeedbackSection />}
          {selectedPage === 'settings' && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}
