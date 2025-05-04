// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (no 'name' provided in your form)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[SIGNUP_ERROR]', error.message);
    } else {
      console.error('[SIGNUP_ERROR]', error);
    }
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
