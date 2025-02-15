// app/posts/[category]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FilterBar from "./filter-bar";
import styles from "./page.module.scss";
import { Prisma } from "@prisma/client";

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

  // Build the where clause for posts query
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

  // Fetch posts with filters
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
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{categoryData.name} Posts</h1>
        <Link href="/learn" className={styles.backLink}>
          Back to Categories
        </Link>
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
          posts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <Link href={`/post/${post.slug}`}>
                <h2>{post.title}</h2>
                <div className={styles.postMeta}>
                  <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                  {post.difficulty && (
                    <span
                      className={`${styles.difficulty} ${
                        styles[post.difficulty]
                      }`}
                    >
                      {post.difficulty}
                    </span>
                  )}
                </div>
                <p className={styles.excerpt}>
                  {post.content.slice(0, 150)}...
                </p>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
