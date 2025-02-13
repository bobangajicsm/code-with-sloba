"use client";
import { useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import styles from "./code-sandbox-switcher.module.scss";

interface Snippets {
  language: string;
  code: string;
}

export default function CodeSandboxSwitcher({
  snippets,
}: {
  snippets: Snippets;
}) {
  return (
    <div className={styles.sandboxContainer}>
      <Sandpack
        template="vanilla"
        files={{
          "index.js": snippets.code,
        }}
        options={{ showConsole: true }}
      />
    </div>
  );
}
