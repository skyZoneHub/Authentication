"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleAuthMode = () => setIsSignup(!isSignup);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Signup failed');
          return;
        }

        alert('Signup successful! Please log in.');
        setIsSignup(false);
        setFormData({ email: '', password: '', name: '' });
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      }
    } else {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError('Incorrect email or password');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const handleOAuth = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#a1c4fd] px-4">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Welcome to My App
      </h1>
      <button
        onClick={toggleModal}
        className="cursor-pointer px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        Get Started
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-white/30">
            <button
              className="cursor-pointer absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              {isSignup ? 'Sign Up' : 'Login'}
            </h2>

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="bg-white/40 text-black placeholder-gray-700 p-3 rounded-lg focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="bg-white/40 text-black placeholder-gray-700 p-3 rounded-lg focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-white/40 text-black placeholder-gray-700 p-3 rounded-lg focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="cursor-pointer bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {isSignup ? 'Create Account' : 'Login'}
              </button>
            </form>

            {error && <p className="text-red-300 mt-4 text-center">{error}</p>}

            <div className="flex items-center my-5">
              <div className="flex-grow h-px bg-white/30" />
              <span className="mx-3 text-white text-sm">OR</span>
              <div className="flex-grow h-px bg-white/30" />
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="cursor-pointer flex items-center justify-center gap-3 bg-white/80 text-black py-2 rounded-lg hover:bg-white transition font-medium"
                onClick={() => handleOAuth('google')}
              >
                <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
                <span>Continue with Google</span>
              </button>
              <button
                className="cursor-pointer flex items-center justify-center gap-3 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition font-medium"
                onClick={() => handleOAuth('github')}
              >
                <Image src="/github-icon.svg" alt="GitHub" width={20} height={20} />
                <span>Continue with GitHub</span>
              </button>
            </div>

            <p className="text-center text-sm text-white mt-6">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button onClick={toggleAuthMode} className="cursor-pointer text-blue-200 font-semibold underline">
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
