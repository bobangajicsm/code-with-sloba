"use client";

import { useEffect, useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import type { SandpackFiles } from "@codesandbox/sandpack-react";
import SandboxTemplate from "@/app/utils/sandbox-template-enum";

interface SandboxModule {
  code: string;
  title: string;
  directory_shortid: string;
  id: string;
  is_binary: boolean;
  sha: string | null;
  shortid: string;
  source_id: string;
  updated_at: string;
  inserted_at: string;
  upload_id: string | null;
}

interface SandboxResponse {
  data: {
    modules: SandboxModule[];
  };
}

interface ExistingSandboxProps {
  sanboxUrl: string;
  sandboxTemplate: string | null;
}

const Sandbox = ({ sanboxUrl, sandboxTemplate }: ExistingSandboxProps) => {
  const [files, setFiles] = useState<SandpackFiles | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSandboxFiles = async () => {
      try {
        const sandboxUrlPaths = sanboxUrl.split("/");
        const response = await fetch(
          `https://codesandbox.io/api/v1/sandboxes/${
            sandboxUrlPaths[sandboxUrlPaths.length - 1]
          }`
        );

        const data: SandboxResponse = await response.json();

        const transformedFiles: SandpackFiles = {};
        data.data.modules
          .filter(
            (module) =>
              !module.title.endsWith(".json") &&
              !module.title.includes("config")
          )
          .forEach((module) => {
            transformedFiles[module.title] = {
              code: module.code,
              active: true,
            };
          });

        setFiles(transformedFiles);
      } catch (error) {
        console.error("Error fetching sandbox:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sanboxUrl) {
      fetchSandboxFiles();
    }
  }, [sanboxUrl]);

  if (isLoading) {
    return <div>Loading sandbox...</div>;
  }

  if (!files) {
    return <div>Error loading sandbox</div>;
  }

  return (
    <Sandpack
      template={(sandboxTemplate as SandboxTemplate) || "static"}
      files={files}
      options={{
        showLineNumbers: true,
        showInlineErrors: true,
        wrapContent: true,
        editorHeight: 600,
        autorun: true,
      }}
      theme="dark"
    />
  );
};

export default Sandbox;
