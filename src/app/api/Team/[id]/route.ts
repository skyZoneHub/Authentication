import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { name, email, role } = body;

  try {
    const { id } = await params; // Yeh sahi tareeka hai

    const updated = await prisma.teamMember.update({
      where: { id: Number(id) }, // Directly id ko use karo
      data: { name, email, role },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Member not found or update failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // Yeh sahi tareeka hai
    const deleted = await prisma.teamMember.delete({
      where: { id: Number(id) }, // Directly id ko use karo
    });
    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json({ error: 'Member not found or delete failed' }, { status: 500 });
  }
}
