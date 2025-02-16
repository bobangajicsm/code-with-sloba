import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import styles from "./page.module.scss";
import Quiz from "@/app/post/[slug]/quiz";
import SlickSlider from "./slick-slider";
import CommentsSection from "@/app/post/[slug]/comment-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import QuillContent from "@/app/post/[slug]/quill-content";
import Sandbox from "@/app/post/[slug]/sandbox";

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

      {post.sandboxUrl && (
        <Sandbox
          sanboxUrl={post.sandboxUrl}
          sandboxTemplate={post.sandboxTemplate}
        />
      )}

      <QuillContent content={post.content} />

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
