import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, postId, isCorrect } = await req.json();

    if (!userId || !postId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { categoryId: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (isCorrect) {
      await prisma.completedPost.create({
        data: {
          userId,
          postId,
          isSuccess: true,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          points: { increment: 10 },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Quiz completed successfully!",
      });
    } else {
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
