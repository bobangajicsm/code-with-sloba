// ForwardedReactQuill.tsx
"use client";
import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import ReactQuillProps from "react-quill";

// 👇 This wraps the real ReactQuill component with forwardRef
const ForwardedReactQuill = forwardRef<ReactQuill, ReactQuillProps>(
  (props, ref) => {
    return <ReactQuill ref={ref} {...props} />;
  }
);

ForwardedReactQuill.displayName = "ForwardedReactQuill";

export default ForwardedReactQuill;
