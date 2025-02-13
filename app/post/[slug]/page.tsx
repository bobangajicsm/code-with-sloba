import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import ReactMarkdown from "react-markdown";

import styles from "./page.module.scss";
import CodeSandboxSwitcher from "@/app/post/[slug]/code-sandbox-switcher";
import Quiz from "@/app/post/[slug]/quiz";
import SlickSlider from "./slick-slider";
import CommentsSection from "@/app/post/[slug]/comment-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

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
      quiz: true,
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, avatarUrl: true },
          },
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
      <SlickSlider post={post} />

      <ReactMarkdown className={styles.content}>{post.content}</ReactMarkdown>

      <h3>Try the Code:</h3>
      <CodeSandboxSwitcher
        snippets={post.code as { language: string; code: string }}
      />

      {post.quiz && (
        <>
          {userId ? (
            canTakeQuiz ? (
              <Quiz questionData={post.quiz} postId={post.id} userId={userId} />
            ) : hasCompletedQuiz ? (
              <p>
                🎉 Congratulations! You have successfully completed this quiz.
              </p>
            ) : (
              <p>
                ❌ You have already attempted this quiz. Please wait 24 hours
                before trying again.
              </p>
            )
          ) : (
            <p>Please log in to access the quiz.</p>
          )}
        </>
      )}

      <CommentsSection postId={post.id} comments={post.comments} />
    </div>
  );
}
