// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col justify-between">
        <div>
          <div className="p-6 text-xl font-bold text-center text-gray-800">My App</div>
          <nav className="flex flex-col space-y-2 px-4">
            {['Dashboard', 'Projects', 'Tasks', 'Notes', 'Settings'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 font-medium py-2 px-3 rounded hover:bg-gray-100"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
            N
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>
          </div>

          <div className="ml-auto pl-4">
            <Image
              src="/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
        </header>

        {/* Dashboard Cards */}
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Projects" icon="📁" />
            <Card title="Tasks" icon="📝" />
            <Card title="Notes" icon="🗒️" />
            <Card title="Settings" icon="⚙️" />
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-lg font-semibold text-gray-800">{title}</div>
    </div>
  );
}
