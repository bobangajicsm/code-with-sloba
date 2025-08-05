"use client";

// import React, {
//   useEffect,
//   useRef,
//   forwardRef,
//   useState,
//   useCallback,
//   useMemo,
//   useImperativeHandle,
// } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
import styles from "./quill-editor.module.scss";
// import hljs from "highlight.js";
// import "highlight.js/styles/vs2015.css";

// // ✅ This must import the forwarded ref component you created
// const ReactQuill = dynamic(() => import("./ForwardedReactQuill"), {
//   ssr: false,
//   loading: () => <div>Loading editor...</div>,
// });

// interface QuillEditorProps {
//   value: string;
//   onChange: (content: string) => void;
// }

// export interface QuillEditorRef {
//   getEditor: () => any;
// }

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
  "code-block",
];

// const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(
//   ({ value, onChange }, ref) => {
//     const quillRef = useRef<any>(null);
//     const [isClient, setIsClient] = useState(false);

//     useEffect(() => {
//       setIsClient(true);
//     }, []);

//     useImperativeHandle(
//       ref,
//       () => ({
//         getEditor: () => quillRef.current?.getEditor?.() ?? null,
//       }),
//       []
//     );

//     useEffect(() => {
//       console.log("quillRef", quillRef.current);
//       console.log("editor", quillRef.current?.getEditor?.());
//     }, []);

//     const imageHandler = useCallback(() => {
//       const quill = quillRef.current?.getEditor();
//       if (!quill) {
//         alert("Editor is not ready. Please try again.");
//         return;
//       }

//       const input = document.createElement("input");
//       input.setAttribute("type", "file");
//       input.setAttribute("accept", "image/*");
//       input.click();

//       input.onchange = async () => {
//         const file = input.files?.[0];
//         if (!file) return;

//         try {
//           const range = quill.getSelection(true) || { index: 0 };
//           quill.insertText(range.index, "[Uploading image...]", "user");
//           quill.setSelection(range.index + "[Uploading image...]".length);

//           const formData = new FormData();
//           formData.append("file", file);

//           const response = await fetch("/api/upload", {
//             method: "POST",
//             body: formData,
//           });

//           if (!response.ok) throw new Error("Upload failed");

//           const { url } = await response.json();
//           quill.deleteText(range.index, "[Uploading image...]".length);
//           quill.insertEmbed(range.index, "image", url, "user");
//           quill.setSelection(range.index + 1);
//         } catch (error) {
//           alert("Failed to upload image");
//           const text = quill.getText();
//           const index = text.indexOf("[Uploading image...]");
//           if (index !== -1) {
//             quill.deleteText(index, "[Uploading image...]".length);
//           }
//         }
//       };
//     }, []);

//     const handlePaste = useCallback(async (event: ClipboardEvent) => {
//       const quill = quillRef.current?.getEditor();
//       if (!quill) return;

//       const items = Array.from(event.clipboardData?.items || []);
//       const imageItem = items.find((item) => item.type.startsWith("image/"));

//       if (imageItem) {
//         event.preventDefault();
//         const file = imageItem.getAsFile();
//         if (!file) return;

//         try {
//           const range = quill.getSelection(true) || { index: 0 };

//           quill.insertText(range.index, "[Uploading pasted image...]", "user");
//           quill.setSelection(
//             range.index + "[Uploading pasted image...]".length
//           );

//           const formData = new FormData();
//           formData.append("file", file);

//           const response = await fetch("/api/upload", {
//             method: "POST",
//             body: formData,
//           });

//           if (!response.ok) throw new Error("Upload failed");

//           const { url } = await response.json();
//           quill.deleteText(range.index, "[Uploading pasted image...]".length);
//           quill.insertEmbed(range.index, "image", url, "user");
//           quill.setSelection(range.index + 1);
//         } catch (error) {
//           const index = quill.getText().indexOf("[Uploading pasted image...]");
//           if (index !== -1) {
//             quill.deleteText(index, "[Uploading pasted image...]".length);
//           }
//           alert("Failed to upload pasted image");
//         }
//       }
//     }, []);

//     const modules = useMemo(
//       () => ({
//         toolbar: {
//           container: [
//             [{ header: [1, 2, 3, false] }],
//             ["bold", "italic", "underline", "strike"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             [{ align: [] }],
//             ["link", "image", "code-block"],
//             ["clean"],
//           ],
//           handlers: {
//             image: imageHandler,
//           },
//         },
//         syntax: {
//           highlight: (text: string) => hljs.highlightAuto(text).value,
//         },
//         clipboard: {
//           matchVisual: false,
//         },
//       }),
//       [imageHandler]
//     );

//     useEffect(() => {
//       if (!quillRef.current || !isClient) return;

//       const editor = quillRef.current.getEditor?.();
//       if (!editor) return;

//       const container = editor.root;
//       container.addEventListener("paste", handlePaste);

//       const observer = new MutationObserver(() => editor.update());
//       observer.observe(container, {
//         childList: true,
//         subtree: true,
//         characterData: true,
//       });

//       return () => {
//         container.removeEventListener("paste", handlePaste);
//         observer.disconnect();
//       };
//     }, [isClient, handlePaste]);

//     if (!isClient) {
//       return (
//         <div className={styles.quillEditorContainer}>
//           <div>Loading editor...</div>
//         </div>
//       );
//     }

//     return (
//       <div className={styles.quillEditorContainer}>
//         <ReactQuill
//           ref={quillRef}
//           value={value}
//           onChange={onChange}
//           theme="snow"
//           modules={modules}
//           formats={formats}
//         />
//       </div>
//     );
//   }
// );

// QuillEditor.displayName = "QuillEditor";

// export default QuillEditor;

// quill-editor.tsx

import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
  useCallback,
  useState,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import hljs from "highlight.js";

export interface QuillEditorRef {
  getEditor: () => ReactQuill | null;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = forwardRef<QuillEditorRef, Props>(
  ({ value, onChange }, ref) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const handlePaste = useCallback(async (event: ClipboardEvent) => {
      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      const items = Array.from(event.clipboardData?.items || []);
      const imageItem = items.find((item) => item.type.startsWith("image/"));

      if (imageItem) {
        event.preventDefault();
        const file = imageItem.getAsFile();
        if (!file) return;

        try {
          const range = quill.getSelection(true) || { index: 0 };

          quill.insertText(range.index, "[Uploading pasted image...]", "user");
          quill.setSelection({
            index: range.index + "[Uploading pasted image...]".length,
            length: 0,
          });

          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Upload failed");

          const { url } = await response.json();
          quill.deleteText(range.index, "[Uploading pasted image...]".length);
          quill.setSelection({ index: range.index + 1, length: 0 });
          quill.setSelection({ index: range.index + 1, length: 0 });
        } catch (error) {
          const index = quill.getText().indexOf("[Uploading pasted image...]");
          if (index !== -1) {
            quill.deleteText(index, "[Uploading pasted image...]".length);
          }
          alert("Failed to upload pasted image");
        }
      }
    }, []);

    useEffect(() => {
      if (!quillRef.current || !isClient) return;

      const editor = quillRef.current.getEditor?.();
      if (!editor) return;

      const container = editor.root;
      container.addEventListener("paste", handlePaste);

      const observer = new MutationObserver(() => editor.update());
      observer.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      return () => {
        container.removeEventListener("paste", handlePaste);
        observer.disconnect();
      };
    }, [isClient, handlePaste]);

    const quillRef = useRef<ReactQuill>(null);

    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current,
    }));

    const imageHandler = useCallback(() => {
      const quill = quillRef.current?.getEditor();
      if (!quill) {
        alert("Editor is not ready. Please try again.");
        return;
      }

      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;

        try {
          const range = quill.getSelection(true) || { index: 0 };
          quill.insertText(range.index, "[Uploading image...]", "user");
          quill.setSelection({
            index: range.index + "[Uploading image...]".length,
            length: 0,
          });

          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Upload failed");

          const { url } = await response.json();
          quill.deleteText(range.index, "[Uploading image...]".length);
          quill.insertEmbed(range.index, "image", url, "user");
          quill.setSelection({ index: range.index + 1, length: 0 });
        } catch (error) {
          alert("Failed to upload image");
          const text = quill.getText();
          const index = text.indexOf("[Uploading image...]");
          if (index !== -1) {
            quill.deleteText(index, "[Uploading image...]".length);
          }
        }
      };
    }, []);

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        syntax: {
          highlight: (text: string) => hljs.highlightAuto(text).value,
        },
        clipboard: {
          matchVisual: false,
        },
      }),
      [imageHandler]
    );

    if (!isClient) {
      return (
        <div className={styles.quillEditorContainer}>
          <div>Loading editor...</div>
        </div>
      );
    }

    return (
      <div className={styles.quillEditorContainer}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          formats={formats}
          modules={modules}
        />
      </div>
    );
  }
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
