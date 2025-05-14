import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Post ID is required", { status: 400 });
    }
    await prisma.$transaction([
      prisma.completedPost.deleteMany({
        where: { postId: id },
      }),
      prisma.postQuiz.deleteMany({
        where: { postId: id },
      }),
      prisma.post.delete({
        where: { id },
      }),
    ]);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Error deleting post", { status: 500 });
  }
}
