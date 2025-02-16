import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        completedPosts: {
          include: {
            post: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const categoryProgress: { [key: string]: number } = {};

    user.completedPosts.forEach((completedPost) => {
      const categoryName = completedPost.post.category.name;
      if (completedPost.isSuccess) {
        if (!categoryProgress[categoryName]) {
          categoryProgress[categoryName] = 0;
        }
        categoryProgress[categoryName] += 1;
      }
    });

    const totalPostsPerCategory = await prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    const progress = totalPostsPerCategory.map((category) => {
      const completedCount = categoryProgress[category.name] || 0;
      const totalCount = category.posts.length;
      const progressPercentage = (completedCount / totalCount) * 100;

      return {
        category: category.name,
        progress: Math.round(progressPercentage),
      };
    });

    return NextResponse.json({
      user,
      progress,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
