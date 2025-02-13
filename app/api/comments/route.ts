import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text, postId } = await req.json();

  const comment = await prisma.comment.create({
    data: {
      text,
      postId,
      user: { connect: { id: session.user.id } }, // Ensure correct user relation
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
