// app/api/admin/comments/[id]/read/route.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and has admin privileges
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const commentId = params.id;

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        isRead: true,
      },
    });

    return Response.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response("Failed to update comment", { status: 500 });
  }
}
