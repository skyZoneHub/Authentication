// src/app/api/Team/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TeamMemberData } from '@/types/TeamTypes';
import { NextRequest } from 'next/server';

// ✅ GET: Fetch all team members
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      include: {
        user: { select: { name: true, email: true } }, // Include the name/email of the user who added
      },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new team member
export async function POST(req: NextRequest) {
  const body: TeamMemberData = await req.json();
  const { name, email, role, addedBy } = body;

  // Check that addedBy is present
  if (typeof addedBy !== 'number') {
    return NextResponse.json(
      { error: "'addedBy' is required and must be a number" },
      { status: 400 }
    );
  }

  try {
    const newMember = await prisma.teamMember.create({
      data: {
        name,
        email,
        role,
        addedBy,
      },
    });

    return NextResponse.json(newMember);
  } catch (error) {
    console.error('Error creating new member:', error);
    return NextResponse.json(
      { error: 'Failed to create new member' },
      { status: 500 }
    );
  }
}
