"use client";

import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock, } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { SuggestionMenuController, getDefaultReactSlashMenuItems,useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore";

import { Alert } from "./Alert";
import { RiAlertFill } from "react-icons/ri";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: Alert,
  },
});




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

  const insertAlert = (editor) => ({
    title: "Alert",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "alert",
      });
    },
    aliases: [
      "alert",
      "notification",
      "emphasize",
      "warning",
      "error",
      "info",
      "success",
    ],
    group: "Other",
    icon: <RiAlertFill />,
  });

  const editor = useCreateBlockNote({
    schema,
    initialContent: parsedContent,
    uploadFile: hadleUpload,
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme="light" onChange={onChange} slashMenu={false}>
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          // Gets all default slash menu items and `insertAlert` item.
          filterSuggestionItems(
            [...getDefaultReactSlashMenuItems(editor), insertAlert(editor)],
            query
          )
        }
      />
      </BlockNoteView>
    </div>
  );
};
