import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { text, postId } = await req.json();

  const comment = await prisma.comment.create({
    data: {
      text,
      postId,
      userId: session.user.id,
    },
  });

  return Response.json(comment);
}
