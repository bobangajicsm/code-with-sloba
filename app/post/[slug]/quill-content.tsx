"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

export default function QuillContent({ content }: { content: string }) {
  useEffect(() => {
    document.querySelectorAll("pre.ql-syntax").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
