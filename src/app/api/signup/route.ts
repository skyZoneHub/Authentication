import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 👈 yahan se use ho raha hai
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, message: 'User created successfully' }, { status: 201 });

  } catch (error: unknown) {
    console.error('[SIGNUP_ERROR]', error instanceof Error ? error.message : error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
