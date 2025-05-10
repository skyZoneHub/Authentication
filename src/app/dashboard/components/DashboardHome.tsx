'use client';

import React from 'react';

const DashboardHome = () => {
  return (
    <div className="text-white space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center space-y-2">
          <h2 className="text-lg font-medium text-gray-400">📄 Projects</h2>
          <p className="text-5xl font-bold text-blue-400">10</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center space-y-2">
          <h2 className="text-lg font-medium text-gray-400">👥 Team  Member</h2>
          <p className="text-5xl font-bold text-green-400">5</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center space-y-2">
          <h2 className="text-lg font-medium text-gray-400">📤 Submissions</h2>
          <p className="text-5xl font-bold text-yellow-400">6</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
