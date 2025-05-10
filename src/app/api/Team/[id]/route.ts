import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TeamMemberData } from '@/types/TeamTypes';
import { NextRequest } from 'next/server';

// ✅ PUT (Update team member)
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract ID from URL

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const body: TeamMemberData = await req.json();
  const { name, email, role } = body;

  try {
    const updated = await prisma.teamMember.update({
      where: { id: Number(id) },
      data: { name, email, role },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Member not found or update failed' },
      { status: 500 }
    );
  }
}

// ✅ DELETE (Delete team member)
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract ID from URL

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    const deleted = await prisma.teamMember.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Member not found or delete failed' },
      { status: 500 }
    );
  }
}
