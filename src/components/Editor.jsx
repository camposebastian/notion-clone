"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/style.css";

export const Editor = ({ onChange, initialContent, editable }) => {
  const { edgestore } = useEdgeStore();
  const hadleUpload = async (file) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });

    return res.url;
  };

  const parsedContent = initialContent
    ? JSON.parse(initialContent)
    : [
        {
          type: "paragraph",
        },
      ];

  if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
    console.error("initialContent must be a non-empty array of blocks");
    return null;
  }

  const editor = useCreateBlockNote({
    editable,
    initialContent: parsedContent,
    uploadFile: hadleUpload,
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme="light" onChange={onChange} />
    </div>
  );
};
