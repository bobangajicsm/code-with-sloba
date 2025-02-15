"use client";
import { Sandpack } from "@codesandbox/sandpack-react";
import styles from "./code-sandbox.module.scss";
import { Snippet } from "@/app/types/snippet";

const createFiles = (snippets: Snippet[]) => {
  const files: Record<string, { code: string; hidden?: boolean }> = {
    "/index.html": {
      code: "",
    },
    "/index.js": {
      code: "",
    },
  };

  snippets.forEach((snippet) => {
    switch (snippet.language.toLowerCase()) {
      case "javascript":
        files["/index.js"] = {
          code: snippet.code,
        };
        break;
      case "typescript":
        files["/index.ts"] = {
          code: snippet.code,
        };
        break;
      case "css":
      case "scss":
      case "less":
        files["/styles.css"] = { code: snippet.code };
        break;
      case "html":
        files["/index.html"] = {
          code: snippet.code,
        };
        break;
      case "markdown":
      case "mdx":
        files["/README.md"] = { code: snippet.code };
        break;
      default:
        files[
          `/${snippet.title.toLowerCase().replace(/\s+/g, "-")}.${
            snippet.language
          }`
        ] = {
          code: snippet.code,
        };
    }
  });

  return files;
};

export default function CodeSandbox({ snippets }: { snippets: Snippet[] }) {
  const files = createFiles(snippets);

  return (
    <div className={styles.sandboxContainer}>
      <Sandpack
        theme="dark"
        files={files}
        options={{
          showConsole: true,
          showNavigator: true,
          showTabs: true,
          showLineNumbers: true,
          layout: "console",
          wrapContent: true,
          editorHeight: 400,
          classes: {
            "sp-wrapper": styles.sandpackWrapper,
            "sp-layout": styles.sandpackLayout,
          },
        }}
      />
    </div>
  );
}
