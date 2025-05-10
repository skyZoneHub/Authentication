'use client';

import { useEffect, useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function MyTeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [form, setForm] = useState<Omit<TeamMember, 'id'> & { id: number | null }>({
    name: '',
    email: '',
    role: '',
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all team members
  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/Team');
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.error('Failed to fetch team:', error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Handle form submission for add or update
  const handleSubmit = async () => {
    const endpoint = form.id ? `/api/Team/${form.id}` : '/api/Team';
    const method = form.id ? 'PUT' : 'POST';
    const payload = form.id ? form : { ...form, addedBy: 1 }; // Replace with dynamic user ID if needed

    try {
      await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      resetForm();
      fetchTeam();
      setIsModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  // Open the modal with data (either new or edit)
  const handleEdit = (member: TeamMember) => {
    setForm(member);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Open the modal for adding new member
  const handleAddNew = () => {
    setForm({ name: '', email: '', role: '', id: null });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/Team/${id}`, { method: 'DELETE' });
      fetchTeam();
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', role: '', id: null });
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>

      {/* Button to open modal for adding new member */}
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded mb-4"
      >
        Add New Member
      </button>

      {/* Team List */}
      <ul className="space-y-3 bg-gray-700 p-4 rounded-lg">
        {team.map((member) => (
          <li
            key={member.id}
            className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {member.name} <span className="text-sm text-gray-400">({member.role})</span>
              </p>
              <p className="text-sm text-gray-400">{member.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(member)}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Add/Edit Member */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {isEditing ? 'Edit Member' : 'Add Member'}
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            
            {/* Role Dropdown */}
            <label htmlFor="role-select" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              id="role-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full mb-4 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Role</option>
              <option value="Developer">Frontend Developer</option>
              <option value="Designer">Backend Developer</option>
              <option value="Manager">Full Stack Developer</option>
              <option value="QA">MERN Stack Developer</option>
              <option value="DevOps">DevOps Specialist</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Data Scientist">Data Analytics</option>
              <option value="Data Scientist"> AI Engineer</option>
              <option value="Data Scientist"> Prompt Engineer</option>
              <option value="Product Manager">Cloud Engineer</option>
              {/* Add other roles here */}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
