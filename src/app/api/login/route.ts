// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//     }

//     const isMatch = await bcrypt.compare(password, user.password || '');

//     if (!isMatch) {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//     }

//     // Make sure JWT_SECRET is defined
//     if (!process.env.JWT_SECRET) {
//       return NextResponse.json({ message: 'JWT secret is not configured' }, { status: 500 });
//     }

//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//   }
// }
