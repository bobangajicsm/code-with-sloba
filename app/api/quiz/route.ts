import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, postId, isCorrect } = await req.json();

    if (!userId || !postId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Get the post to find its category
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { categoryId: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (isCorrect) {
      // Create completed post record with success
      await prisma.completedPost.create({
        data: {
          userId,
          postId,
          isSuccess: true,
        },
      });

      // Update user points
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: { increment: 10 },
        },
      });

      // Update or create user progress for the category
      await prisma.$transaction(async (tx) => {
        const categoryProgress = await tx.userProgress.findFirst({
          where: {
            userId,
            categoryId: post.categoryId,
          },
        });

        if (categoryProgress) {
          await tx.userProgress.update({
            where: { id: categoryProgress.id },
            data: {
              completedPosts: { increment: 1 },
              progress:
                ((categoryProgress.completedPosts + 1) /
                  categoryProgress.totalPosts) *
                100,
            },
          });
        } else {
          const totalPosts = await tx.post.count({
            where: { categoryId: post.categoryId },
          });

          await tx.userProgress.create({
            data: {
              userId,
              categoryId: post.categoryId,
              completedPosts: 1,
              totalPosts,
              progress: (1 / totalPosts) * 100,
            },
          });
        }
      });

      return NextResponse.json({
        success: true,
        message: "Quiz completed successfully!",
      });
    } else {
      // For incorrect answers, store the attempt with isSuccess = false
      const currentTime = new Date();

      await prisma.completedPost.create({
        data: {
          userId,
          postId,
          isSuccess: false,
          completedAt: currentTime,
        },
      });

      return NextResponse.json({
        success: false,
        isDisabled: true,
        message: "Quiz failed. Try again in 24 hours.",
        nextAttemptTime: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000),
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
