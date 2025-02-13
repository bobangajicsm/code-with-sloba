import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "./page.module.scss";

export default async function PostsPage() {
  // Fetch categories and latest posts from the database
  const categories = await prisma.category.findMany();
  const latestPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { category: true },
  });

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.categories}>
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/posts/${category.slug}`}
            className={styles.categoryButton}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <h2>Latest Posts</h2>
      <div className={styles.posts}>
        {latestPosts.map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className={styles.postCard}
          >
            <div>
              <h3>{post.title}</h3>
              <p className={styles.category}>{post.category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
