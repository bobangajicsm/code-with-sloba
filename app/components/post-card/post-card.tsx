import React from "react";
import styles from "./post-card.module.scss";
import Glassbox from "@/app/components/glassbox/glassbox";
import { CircleGauge, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@prisma/client";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className={styles.post}>
      <Link className={styles.postLink} href={`/post/${post.slug}`}>
        <Glassbox className={styles.largeReflectionFix}>
          <div className={styles.postWrapper}>
            <div className={styles.postImageWrapper}>
              <Image
                width={150}
                height={80}
                alt={post.title}
                className={styles.postImage}
                decoding="async"
                loading="lazy"
                src={post.images[0]}
              />
            </div>
            <div className={styles.postContent}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postDescription}>{post.description}</p>
              <div className={styles.postMeta}>
                <span
                  className={`${styles.postLevel} ${
                    post.difficulty === "medium"
                      ? styles.postLevelMedium
                      : post.difficulty === "hard"
                      ? styles.postLevelHard
                      : styles.postLevelEasy
                  }`}
                >
                  <CircleGauge size={20} />
                  {post.difficulty}
                </span>
                <span className={styles.postDate}>
                  {post.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className={styles.postTags}>
                  {post.tags?.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </span>
              </div>
            </div>
            <ArrowRight className={styles.arrowRight} size={20} />
          </div>
        </Glassbox>
      </Link>
    </div>
  );
};

export default PostCard;
