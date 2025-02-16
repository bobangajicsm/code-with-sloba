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
    ["link", "image"],
    ["clean"],
  ],
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
];

const transformContent = (content: string) => {
  return content.replace(
    /(https:\/\/codesandbox.io\/embed\/[a-zA-Z0-9-]+)/g,
    `<iframe src="$1" width="100%" height="500" style="border:0; border-radius:4px; overflow:hidden;"></iframe>`
  );
};

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

      // Use MutationObserver to track content changes instead of deprecated DOM events
      const observer = new MutationObserver(() => {
        editor.update(); // Ensures Quill properly registers the changes
      });

      observer.observe(editorContainer, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      return () => observer.disconnect();
    }, []);

    onChange(transformContent(value));

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
