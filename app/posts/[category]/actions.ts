"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function fetchPosts(
  category?: string,
  sort: string = "newest",
  difficulty?: string,
  search: string = "",
  skip: number = 0,
  published?: boolean,
  take: number = 10
) {
  let categoryData: {
    image: string | null;
    id: string;
    slug: string;
    name: string;
  } | null = null;

  if (category) {
    categoryData = await prisma.category.findFirst({
      where: { slug: category },
    });

    if (!categoryData) return null;
  }

  const where: Prisma.PostWhereInput = {
    published,
    ...(category ? { categoryId: categoryData!.id } : {}),
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
    take,
    skip,
  });

  const totalPosts = await prisma.post.count({ where });

  return {
    posts,
    categoryData: category
      ? categoryData
      : {
          id: "all",
          name: "all",
          slug: "all",
          title: "All Posts",
          subtitle: "Browse all available posts",
        },
    totalPosts,
  };
}
