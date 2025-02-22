import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      quizzes,
      sandboxUrl,
      sandboxTemplate,
    } = await req.json();

    // First, delete all existing PostQuiz entries for this post
    await prisma.postQuiz.deleteMany({
      where: { postId: params.id },
    });

    // Update the post and create new quizzes
    const post = await prisma.post.update({
      where: {
        id: params.id,
      },
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
        // Create new quizzes and their relationships
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
        category: true,
        quizzes: {
          include: {
            quiz: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return Response.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Error updating post", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Delete in a transaction to ensure all related data is removed
    await prisma.$transaction([
      // First delete PostQuiz entries
      prisma.postQuiz.deleteMany({
        where: { postId: params.id },
      }),
      // Then delete the post
      prisma.post.delete({
        where: { id: params.id },
      }),
    ]);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Error deleting post", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        quizzes: {
          include: {
            quiz: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response("Error fetching post", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body;
  try {
    // Read the body once and store it
    body = await req.json();
    console.log("Request body:", body);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response("Invalid JSON body", { status: 400 });
  }

  try {
    const {
      quizzes,
      categoryId,
      description, // New field
      tags, // New field
      ...updateData
    } = body;

    const postId = params.id;

    // Start a transaction to handle all updates
    const updatedPost = await prisma.$transaction(async (prisma) => {
      // If quizzes are included in the update
      if (quizzes) {
        // Delete existing quiz relationships and quizzes
        await prisma.postQuiz.deleteMany({
          where: { postId },
        });

        // Create new quizzes and their relationships
        await Promise.all(
          quizzes.map(async (quiz: any, index: number) => {
            const createdQuiz = await prisma.quiz.create({
              data: {
                question: quiz.quiz.question, // Adjusted to match structure
                optionA: quiz.quiz.optionA,
                optionB: quiz.quiz.optionB,
                optionC: quiz.quiz.optionC || "", // Handle optional fields
                optionD: quiz.quiz.optionD || "", // Handle optional fields
                correctAnswer: quiz.quiz.correctAnswer,
              },
            });

            await prisma.postQuiz.create({
              data: {
                postId,
                quizId: createdQuiz.id,
                order: index,
              },
            });
          })
        );
      }

      // Update the post with new fields
      return prisma.post.update({
        where: { id: postId },
        data: {
          ...updateData,
          description: description || null, // Handle optional description
          tags: tags || [], // Handle optional tags
          categoryId: categoryId ? categoryId : undefined,
        },
        include: {
          category: true,
          quizzes: {
            include: {
              quiz: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    });

    return Response.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    if (error instanceof Error) {
      return new Response(`Error updating post: ${error.message}`, {
        status: 500,
      });
    }
    return new Response("Error updating post", { status: 500 });
  }
}
