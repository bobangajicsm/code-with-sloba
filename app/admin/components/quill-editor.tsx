"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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

    return (
      <div className="quill-editor-container">
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
