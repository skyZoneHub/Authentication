// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';

// export default function AuthModal() {
//   const [showModal, setShowModal] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const res = await signIn('credentials', {
//           redirect: false,
//           email: form.email,
//           password: form.password,
//         });

//         if (res?.error) {
//           alert(res.error);
//         } else {
//           router.push('/dashboard');
//         }
//       } else {
//         // Signup ke liye custom API call
//         const res = await fetch('/api/signup', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(form),
//         });

//         const data = await res.json();

//         if (!res.ok) throw new Error(data.message || 'Signup failed');

//         // ✅ Signup ke baad auto-login mat karo
//         alert('Signup successful! Please login to continue.');
//         setIsLogin(true); // Switch to login mode
//         setForm({ email: '', password: '' }); // Clear form
//       }
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         alert(err.message);
//       } else {
//         alert('An unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setShowModal(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded-md"
//       >
//         Get Started
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-lg">
//             <h2 className="text-xl font-semibold text-center">
//               {isLogin ? 'Login' : 'Sign Up'}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
//               </button>
//             </form>

//             <p
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-sm text-center text-blue-600 cursor-pointer mt-2"
//             >
//               {isLogin
//                 ? "Don't have an account? Sign Up"
//                 : 'Already have an account? Login'}
//             </p>

//             <button
//               onClick={() => setShowModal(false)}
//               className="text-center text-sm text-gray-500 block mx-auto"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
