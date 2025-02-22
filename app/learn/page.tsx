import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import {
  ArrowRight,
  MessageSquareCode,
  Star,
  CircleHelp,
  BugPlay,
  GitPullRequestCreateArrow,
} from "lucide-react";
import Glassbox from "@/app/components/glassbox/glassbox";
import LatestPosts, {
  Post,
} from "@/app/learn/components/latest-posts/latest-posts";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  postCount?: number;
}

async function getCategoriesWithPostCount() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    postCount: category._count.posts,
  }));
}

export default async function PostsPage() {
  const categories = await getCategoriesWithPostCount();
  const latestPosts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { category: true },
  });

  return (
    <div className={styles.container}>
      <section className={styles.categoriesSection}>
        <h1 className={styles.title}>
          Pick Your Tech
          <span className={styles.premiumBadge}>
            <Star className={styles.premiumBadgeIcon} size={12} />
            Premium
          </span>
        </h1>
        <p className={styles.subtitle}>
          Choose a technology, language, or framework to find relevant posts.
        </p>
        <p className={styles.titleFacts}>
          <span className={styles.titleFact}>
            <CircleHelp size={20} className={styles.titleFactsIcon} /> Curated
            questions
          </span>
          <span className={styles.titleFact}>
            <BugPlay size={20} className={styles.titleFactsIcon} /> Interactive
            learning
          </span>
          <span className={styles.titleFact}>
            <GitPullRequestCreateArrow
              size={20}
              className={styles.titleFactsIcon}
            />
            Detailed topic explanation
          </span>
        </p>

        <div className={styles.topics}>
          {categories.map((category: Category) => (
            <div key={category.id} className={styles.topic}>
              <Link
                href={`/posts/${category.slug}`}
                className={styles.topicLink}
              >
                <Glassbox>
                  <div className={styles.topicWrapper}>
                    <div className={styles.topicLogo}>
                      <Image
                        width={40}
                        height={40}
                        src={category.image || ""}
                        alt={`Logo angular`}
                      />
                    </div>
                    <div className={styles.topicContent}>
                      <h4 className={styles.topicTitle}>{category.name}</h4>
                      <p className={styles.topicDescription}>
                        <MessageSquareCode size={20} /> {category.postCount}{" "}
                        posts
                      </p>
                    </div>
                    <ArrowRight className={styles.topicArrow} size={24} />
                  </div>
                </Glassbox>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <LatestPosts posts={latestPosts} />
    </div>
  );
}
