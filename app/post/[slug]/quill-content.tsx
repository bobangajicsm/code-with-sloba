"use client";
import React, { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import styles from "./quill-content.module.scss";

interface CodeBlockProps {
  code: string;
  language: string;
}

interface QuillContentProps {
  content: string;
}

interface CodeBlockData {
  code: string;
  language: string;
}

const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const decodeHTML = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const cleanCodeContent = (htmlContent: string): string => {
  return decodeHTML(htmlContent.replace(/<[^>]+>/g, ""));
};

const addLineNumbers = (code: string): string => {
  const lines = code.split("\n");
  return lines
    .map(
      (line, index) => `<span class="line-number">${index + 1}</span> ${line}`
    )
    .join("\n");
};

const detectLanguage = (code: string): string => {
  const cleanedCode = cleanCodeContent(code);
  const firstLine = cleanedCode.split("\n")[0].trim();
  const fileMatch = firstLine.match(/(?:\/\/|\/\*|#)\s*([\w-]+\.(\w+))/i);

  if (fileMatch && fileMatch[2]) {
    const extension = fileMatch[2].toLowerCase();
    const languageMap: { [key: string]: string } = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      rb: "ruby",
      java: "java",
      cpp: "cpp",
      cs: "csharp",
      go: "go",
      rs: "rust",
      php: "php",
      html: "html",
      css: "css",
      json: "json",
      md: "markdown",
      sh: "bash",
      sql: "sql",
    };
    return languageMap[extension] || "plaintext";
  }
  return "plaintext";
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const cleanedCode = cleanCodeContent(code);
  const highlightedRef = useRef<string>("");

  useEffect(() => {
    if (codeRef.current && !highlightedRef.current) {
      const highlighted = hljs.highlight(cleanedCode, { language }).value;
      highlightedRef.current = addLineNumbers(highlighted);
      codeRef.current.innerHTML = highlightedRef.current;
    }
  }, [cleanedCode, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          type="button"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className={styles.codeContainer}>
        <pre>
          <code ref={codeRef} className={`hljs ${language}`} />
        </pre>
      </div>
    </div>
  );
};

const QuillContent: React.FC<QuillContentProps> = ({ content }) => {
  const [processedContent, setProcessedContent] = useState<React.ReactNode[]>([
    <div key="content" dangerouslySetInnerHTML={{ __html: content }} />,
  ]);

  useEffect(() => {
    const processContent = (): React.ReactNode[] => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;

      const codeBlocks = tempDiv.querySelectorAll("pre.ql-syntax");
      const codeBlocksData: CodeBlockData[] = Array.from(codeBlocks).map(
        (block) => ({
          code: block.innerHTML,
          language: detectLanguage(block.innerHTML),
        })
      );

      codeBlocks.forEach((block, index) => {
        const placeholder = `<!--CODE_BLOCK_${index}-->`;
        block.outerHTML = placeholder;
      });

      const parts = tempDiv.innerHTML.split(/<!--CODE_BLOCK_\d+-->/);

      return parts.reduce<React.ReactNode[]>((acc, part, index) => {
        acc.push(
          <div
            key={`content-${index}`}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        );
        if (codeBlocksData[index]) {
          acc.push(
            <CodeBlock
              key={`code-${index}`}
              code={codeBlocksData[index].code}
              language={codeBlocksData[index].language}
            />
          );
        }
        return acc;
      }, []);
    };

    // Only process content on the client side
    setProcessedContent(processContent());
  }, [content]);

  return <div className={styles.quillContent}>{processedContent}</div>;
};

export default QuillContent;
