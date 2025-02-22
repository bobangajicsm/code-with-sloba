import React from "react";
import styles from "./latest-posts.module.scss";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import buttonStyles from "@/app/components/button.module.scss";
import { Post } from "@/app/types/shared";
import PostCard from "@/app/components/post-card/post-card";

const LatestPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.postsHeader}>
        <h2 className={styles.title}>Latest Posts</h2>
        <Link href="/posts/all" className={buttonStyles.button}>
          View All <ArrowRight size={16} />
        </Link>
      </div>
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
