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
      quiz,
      sandboxUrl,
      sandboxTemplate,
    } = await req.json();

    // Update the quiz
    if (quiz) {
      await prisma.quiz.update({
        where: {
          id: quiz.id,
        },
        data: {
          question: quiz.question,
          optionA: quiz.optionA,
          optionB: quiz.optionB,
          optionC: quiz.optionC,
          optionD: quiz.optionD,
          correctAnswer: quiz.correctAnswer,
        },
      });
    }

    // Update the post
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
    // Delete the post (this will cascade delete the quiz due to the schema relation)
    await prisma.post.delete({
      where: {
        id: params.id,
      },
    });

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
        quiz: true,
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

  try {
    const updateData = await req.json();
    const postId = params.id;

    // Find the existing post to get the quiz ID if it exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { quiz: true },
    });

    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }

    // Prepare the quiz update/create operation
    let quizOperation = {};
    if (updateData.quiz) {
      if (existingPost.quiz) {
        // Update existing quiz
        quizOperation = {
          quiz: {
            update: {
              question: updateData.quiz.question,
              optionA: updateData.quiz.optionA,
              optionB: updateData.quiz.optionB,
              optionC: updateData.quiz.optionC,
              optionD: updateData.quiz.optionD,
              correctAnswer: updateData.quiz.correctAnswer,
            },
          },
        };
      } else {
        // Create new quiz
        quizOperation = {
          quiz: {
            create: {
              question: updateData.quiz.question,
              optionA: updateData.quiz.optionA,
              optionB: updateData.quiz.optionB,
              optionC: updateData.quiz.optionC,
              optionD: updateData.quiz.optionD,
              correctAnswer: updateData.quiz.correctAnswer,
            },
          },
        };
      }
    }

    // Remove quiz and categoryId from updateData as they're handled separately
    const { quiz, categoryId, ...postUpdateData } = updateData;

    // Update the post with proper nested relations
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...postUpdateData,
        ...quizOperation,
        // Handle category relation properly
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        category: true,
        quiz: true,
      },
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
