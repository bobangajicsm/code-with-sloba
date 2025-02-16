import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const {
      title,
      slug,
      content,
      categoryId,
      difficulty,
      published,
      images,
      sandboxUrl,
      sandboxTemplate,
      quizzes,
    } = await req.json();

    // Create the post first
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        difficulty,
        published,
        images,
        sandboxUrl,
        sandboxTemplate,
        userId: session.user.id,
        // Create quizzes and their relationships in one transaction
        quizzes: {
          create: quizzes.map((quiz: any, index: number) => ({
            order: index,
            quiz: {
              create: {
                question: quiz.question,
                optionA: quiz.optionA,
                optionB: quiz.optionB,
                optionC: quiz.optionC,
                optionD: quiz.optionD,
                correctAnswer: quiz.correctAnswer,
              },
            },
          })),
        },
      },
      include: {
        quizzes: {
          include: {
            quiz: true,
          },
        },
      },
    });

    return Response.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Error creating post", { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
        User: {
          select: {
            name: true,
            email: true,
          },
        },
        quizzes: {
          include: {
            quiz: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Error fetching posts", { status: 500 });
  }
}

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

    // Delete the post and all related quizzes in one transaction
    await prisma.$transaction([
      // Delete all PostQuiz entries for this post
      prisma.postQuiz.deleteMany({
        where: { postId: id },
      }),
      // Delete the post
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
