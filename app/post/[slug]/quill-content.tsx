"use client";

export default function QuillContent({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
