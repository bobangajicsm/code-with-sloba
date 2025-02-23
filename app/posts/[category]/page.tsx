"use client";

import Link from "next/link";
import FilterBar from "./filter-bar";
import styles from "./page.module.scss";
import { POST_META } from "@/app/constants";
import buttonStyles from "@/app/components/button.module.scss";
import { ArrowLeft } from "lucide-react";
import PostCard from "@/app/components/post-card/post-card";

import { useEffect, useState } from "react";
import { fetchPosts } from "./actions";
import Loader from "@/app/components/loader/loader";
import { Post } from "@prisma/client";

const POSTS_PER_PAGE = 10;

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

export default function CategoryPage({
  params: { category },
  searchParams: { sort = "newest", difficulty, search = "" },
}: CategoryPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      const result = await fetchPosts(
        category === "all" ? undefined : category,
        sort,
        difficulty,
        search
      );

      if (result) {
        setPosts(result.posts as Post[]);
        // For 'all' category, we can set a default categoryData
        if (category === "all") {
          setCategoryData({
            name: "all",
            title: "All Posts",
            subtitle: "Browse all available posts",
          });
        } else {
          setCategoryData(result.categoryData);
        }
        setHasMore(result.posts.length === POSTS_PER_PAGE);
      }
      setLoading(false);
    };

    loadInitialPosts();
    setPage(0);
  }, [category, sort, difficulty, search]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);

    const result = await fetchPosts(
      category === "all" ? undefined : category,
      sort,
      difficulty,
      search,
      nextPage * POSTS_PER_PAGE
    );

    if (result) {
      setPosts((prevPosts) => [...prevPosts, ...(result.posts as Post[])]);
      setHasMore(result.posts.length === POSTS_PER_PAGE);
      setPage(nextPage);
    }
    setLoadingMore(false);
  };

  if (!categoryData && !loading) {
    return <div className={styles.container}>Category not found</div>;
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {category === "all"
              ? "All Posts"
              : POST_META[categoryData.name?.toLowerCase()]?.title}
          </h1>
          <Link href="/learn" className={buttonStyles.button}>
            <ArrowLeft size={16} /> Back to Categories
          </Link>
        </div>
        <h2 className={styles.subtitle}>
          {category === "all"
            ? "Browse all available posts"
            : POST_META[categoryData.name?.toLowerCase()]?.subtitle}
        </h2>
      </div>

      <FilterBar
        currentSort={sort}
        currentDifficulty={difficulty}
        currentSearch={search}
      />

      <div className={styles.posts}>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {hasMore && (
              <div>
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className={`${buttonStyles.button} ${styles.loadMore}`}
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
