import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const members = await prisma.teamMember.findMany();
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, role, addedBy } = body;

  const newMember = await prisma.teamMember.create({
    data: { name, email, role, addedBy },
  });

    return NextResponse.json(newMember);
  }