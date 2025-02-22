"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const POSTS_PER_PAGE = 10;

export async function fetchPosts(
  category: string,
  sort: string = "newest",
  difficulty?: string,
  search: string = "",
  skip: number = 0
) {
  const categoryData = await prisma.category.findFirst({
    where: { slug: category },
  });

  if (!categoryData) return null;

  const where: Prisma.PostWhereInput = {
    categoryId: categoryData.id,
    published: true,
    ...(difficulty
      ? { difficulty: difficulty as Prisma.EnumdifficultyNullableFilter }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              content: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
          ],
        }
      : {}),
  };

  const posts = await prisma.post.findMany({
    where,
    orderBy: {
      createdAt: sort === "newest" ? "desc" : "asc",
    },
    include: {
      category: true,
      User: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
    take: POSTS_PER_PAGE,
    skip,
  });

  const totalPosts = await prisma.post.count({ where });

  return {
    posts,
    categoryData,
    totalPosts,
  };
}
