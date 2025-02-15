// app/posts/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import { Clock, ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  images: string[];
  createdAt: Date;
  category: {
    name: string;
    slug: string;
  };
}

export default async function PostsPage() {
  const categories = await prisma.category.findMany();
  const latestPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { category: true },
  });

  return (
    <div className={styles.container}>
      <section className={styles.categoriesSection}>
        <h1>Browse Categories</h1>
        <p className={styles.subtitle}>
          Explore our collection of tutorials and guides
        </p>

        <div className={styles.categories}>
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/posts/${category.slug}`}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImage}>
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    {category.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.categoryContent}>
                <h3>{category.name}</h3>
                <ArrowRight className={styles.arrow} size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.postsSection}>
        <div className={styles.sectionHeader}>
          <h2>Latest Posts</h2>
          <Link href="/posts/all" className={styles.viewAll}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.posts}>
          {latestPosts.map((post: Post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className={styles.postCard}
            >
              <div className={styles.postImage}>
                {post.images[0] ? (
                  <Image
                    src={post.images[0]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    {post.title[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.postContent}>
                <div className={styles.postMeta}>
                  <span className={styles.category}>{post.category.name}</span>
                  <span className={styles.date}>
                    <Clock size={14} />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3>{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
