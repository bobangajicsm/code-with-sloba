"use client";

import Editor from "@monaco-editor/react";
import styles from "./code-editor.module.scss";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  return (
    <div className={styles.editorContainer}>
      <Editor
        height="300px"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
          wordWrap: "on",
        }}
        loading={<div className={styles.loading}>Loading editor...</div>}
      />
    </div>
  );
}
