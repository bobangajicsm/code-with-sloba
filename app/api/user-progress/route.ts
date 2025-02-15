import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch user details
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      createdAt: true,
      points: true,
      avatarUrl: true,
      profileUrl: true,
      completedPosts: {
        select: {
          post: {
            select: {
              categoryId: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get all categories user has progress in
  const categoryIds = [
    ...new Set(user.completedPosts.map((cp) => cp.post.categoryId)),
  ];

  const categoryProgress = await Promise.all(
    categoryIds.map(async (categoryId) => {
      const totalPosts = await prisma.post.count({ where: { categoryId } });
      const completedPosts = user.completedPosts.filter(
        (cp) => cp.post.categoryId === categoryId
      ).length;

      if (totalPosts === 0) return null;

      const category = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { name: true },
      });
      return {
        category: category?.name || "Unknown",
        progress: Math.round((completedPosts / totalPosts) * 100),
      };
    })
  );

  return NextResponse.json({
    user,
    progress: categoryProgress.filter(Boolean),
  });
}
