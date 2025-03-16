// app/api/admin/comments/[id]/route.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and has admin privileges
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const commentId = params.id;

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response("Failed to delete comment", { status: 500 });
  }
}
