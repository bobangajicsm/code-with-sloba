import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import styles from "./page.module.scss";
import quizStyles from "./quiz.module.scss";
import metaStyles from "@/app/components/post-card/post-card.module.scss";
import Quiz from "@/app/post/[slug]/quiz";
import SlickSlider from "./slick-slider";
import CommentsSection from "@/app/post/[slug]/comment-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import QuillContent from "@/app/post/[slug]/quill-content";
import Sandbox from "@/app/post/[slug]/sandbox";
import ArticleAside from "@/app/post/[slug]/article-aside";
import { ArrowLeft, CircleGauge } from "lucide-react";
import Image from "next/image";
import SocialShare from "@/app/post/[slug]/social-share";
import Link from "next/link";
import buttonStyles from "@/app/components/button.module.scss";

function readingTime(text: string) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      quizzes: {
        include: {
          quiz: true,
        },
        orderBy: {
          order: "asc",
        },
      },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, avatarUrl: true },
          },
        },
      },
      User: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) return notFound();

  let canTakeQuiz = false;
  let hasCompletedQuiz = false;
  let lastAttemptTime: Date | null = null;

  if (userId) {
    const successfulAttempt = await prisma.completedPost.findFirst({
      where: {
        userId,
        postId: post.id,
        isSuccess: true,
      },
    });

    hasCompletedQuiz = !!successfulAttempt;

    if (!hasCompletedQuiz) {
      const lastFailedAttempt = await prisma.completedPost.findFirst({
        where: {
          userId,
          postId: post.id,
          isSuccess: false,
        },
        orderBy: { completedAt: "desc" },
      });

      if (lastFailedAttempt) {
        lastAttemptTime = new Date(lastFailedAttempt.completedAt);
        canTakeQuiz =
          new Date().getTime() - lastAttemptTime.getTime() >
          24 * 60 * 60 * 1000;
      } else {
        canTakeQuiz = true;
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link
          href={`/posts/${post.category.name.toLocaleLowerCase()}`}
          className={buttonStyles.button}
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
      <div className={styles.wrapper}>
        <article className={styles.article}>
          <header>
            <h1 className={styles.title}>{post.title}</h1>
            <h2 className={styles.description}>{post.description}</h2>
            <div className={`${metaStyles.postMeta} ${styles.meta}`}>
              <span
                className={`${metaStyles.postLevel} ${
                  post.difficulty === "medium"
                    ? metaStyles.postLevelMedium
                    : metaStyles.difficulty === "hard"
                    ? metaStyles.postLevelHard
                    : metaStyles.postLevelEasy
                }`}
              >
                <CircleGauge size={20} />
                {post.difficulty}
              </span>

              <span className={metaStyles.postTags}>
                {post.tags?.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </span>
            </div>
            <div className={styles.authorContainer}>
              <div className={styles.author}>
                <Image
                  width={40}
                  height={40}
                  src={post.User?.avatarUrl || "/images/default-avatar.png"}
                  alt={post.User?.name || "Author avatar"}
                  className={styles.avatar}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{post.User?.name}</span>
                  <span className={styles.postDate}>
                    <span>{readingTime(post.content)} min read</span>
                    <span className={styles.dot} />
                    <span>
                      {post.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              </div>
              <SocialShare post={post} />
            </div>
          </header>
          <SlickSlider post={post} />

          <QuillContent content={post.content} />
        </article>
        <ArticleAside content={post.content} />
      </div>

      {post.sandboxUrl && (
        <Sandbox
          sanboxUrl={post.sandboxUrl}
          sandboxTemplate={post.sandboxTemplate}
        />
      )}

      {post.quizzes.length > 0 && (
        <>
          {userId ? (
            canTakeQuiz ? (
              <Quiz questions={post.quizzes} postId={post.id} userId={userId} />
            ) : hasCompletedQuiz ? (
              <div className={quizStyles.quizContainer}>
                <h3 className={quizStyles.caption}>Quiz</h3>
                <h2 className={quizStyles.title}>Test Your Knowledge</h2>
                <p className={quizStyles.message}>
                  🎉 Congratulations! You have successfully completed this quiz.
                </p>
              </div>
            ) : (
              <div className={quizStyles.quizContainer}>
                <h3 className={quizStyles.caption}>Quiz</h3>
                <h2 className={quizStyles.title}>Test Your Knowledge</h2>
                <p className={quizStyles.message}>
                  ❌ You have already attempted this quiz. Please wait 24 hours
                  before trying again.
                </p>
              </div>
            )
          ) : (
            <div className={quizStyles.quizContainer}>
              <h3 className={quizStyles.caption}>Quiz</h3>
              <h2 className={quizStyles.title}>Test Your Knowledge</h2>
              <p className={quizStyles.message}>
                Please log in to access the quiz.
              </p>
            </div>
          )}
        </>
      )}

      <CommentsSection postId={post.id} comments={post.comments} />
    </div>
  );
}
