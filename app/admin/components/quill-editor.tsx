"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./quill-editor.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ForwardedQuill = forwardRef<any, any>((props, ref) => (
  <ReactQuill {...props} forwardedRef={ref} />
));

ForwardedQuill.displayName = "ForwardedQuill";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export interface QuillEditorRef {
  getEditor: () => any;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "code-block"], // Add "code-block"
    ["clean"],
  ],
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value, // Enables syntax highlighting
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "code-block", // Add code-block
];

const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(
  ({ value, onChange }, ref) => {
    const quillRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current?.getEditor(),
    }));

    useEffect(() => {
      if (!quillRef.current) return;

      const editor = quillRef.current.getEditor();
      const editorContainer = editor.root;

      const observer = new MutationObserver(() => {
        editor.update();
      });

      observer.observe(editorContainer, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      return () => observer.disconnect();
    }, []);

    return (
      <div className={styles.quillEditorContainer}>
        <ForwardedQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
        />
      </div>
    );
  }
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
