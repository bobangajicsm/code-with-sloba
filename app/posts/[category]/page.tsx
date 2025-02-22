import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FilterBar from "./filter-bar";
import styles from "./page.module.scss";
import { Prisma } from "@prisma/client";
import { POST_META } from "@/app/constants";
import buttonStyles from "@/app/components/button.module.scss";
import { ArrowLeft } from "lucide-react";
import PostCard from "@/app/components/post-card/post-card";
import { Post } from "@/app/types/shared";

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    sort?: "newest" | "oldest";
    difficulty?: "easy" | "medium" | "hard";
    search?: string;
  };
}

export default async function CategoryPage({
  params: { category },
  searchParams: { sort = "newest", difficulty, search = "" },
}: CategoryPageProps) {
  const categoryData = await prisma.category.findFirst({
    where: { slug: category },
  });

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  const where = {
    categoryId: categoryData.id,
    published: true,
    ...(difficulty ? { difficulty } : {}),
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

  const posts: Post[] = await prisma.post.findMany({
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
  });

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {POST_META[categoryData.name]?.title}
          </h1>
          <Link href="/learn" className={buttonStyles.button}>
            <ArrowLeft size={16} /> Back to Categories
          </Link>
        </div>
        <h2 className={styles.subtitle}>
          {POST_META[categoryData.name]?.subtitle}
        </h2>
      </div>

      <FilterBar
        currentSort={sort}
        currentDifficulty={difficulty}
        currentSearch={search}
      />

      <div className={styles.posts}>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
