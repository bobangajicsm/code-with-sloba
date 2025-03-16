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

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return Response.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}
