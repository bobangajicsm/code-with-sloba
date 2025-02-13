import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import styles from "./page.module.scss";
import CodeSandboxSwitcher from "@/app/post/[slug]/code-sandbox-switcher";
import Quiz from "@/app/post/[slug]/quiz";
import SlickSlider from "./slick-slider";
import CommentsSection from "@/app/post/[slug]/comment-section";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      quiz: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  if (!post) return notFound();

  const codeSnippets = post.code as { language: string; code: string };

  return (
    <div className={styles.container}>
      <SlickSlider post={post} />

      <ReactMarkdown className={styles.content}>{post.content}</ReactMarkdown>

      <h3>Try the Code:</h3>
      <CodeSandboxSwitcher snippets={codeSnippets} />

      {post.quiz && <Quiz questionData={post.quiz} />}

      <CommentsSection postId={post.id} comments={post.comments} />
    </div>
  );
}
