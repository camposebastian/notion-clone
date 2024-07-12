"use client";

import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore";

import { Alert } from "./Alert";
import { RiAlertFill } from "react-icons/ri";
import { ImImages } from "react-icons/im";
import { HiOutlineGlobeAlt } from "react-icons/hi";

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

  // Custom Slash Menu item to insert a block after the current one.
  const insertHelloWorldItem = (editor) => ({
    title: "Insert Hello World",
    onItemClick: () => {
      // Block that the text cursor is currently in.
      const currentBlock = editor.getTextCursorPosition().block;

      // New block we want to insert.
      const helloWorldBlock = {
        type: "paragraph",
        content: [
          { type: "text", text: "Hello World", styles: { bold: true } },
        ],
      };

      // Inserting the new block after the current one.
      editor.insertBlocks([helloWorldBlock], currentBlock, "after");
    },
    aliases: ["helloworld", "hw"],
    group: "Others",
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: "Used to insert a block with 'Hello World' below.",
  });
  const insertImages = (editor) => ({
    title: "Images", //Alert
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "image", //alert
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
    group: "Media", //Others
    subtext: "Used to insert a group of Images.", //subtitle vacio
    icon: <ImImages />, //<RiAlertFill />
  });
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
    group: "Others",
    subtext: "Used to insert an Alert.",
    icon: <RiAlertFill />,
  });

  const editor = useCreateBlockNote({
    schema,
    initialContent: parsedContent,
    uploadFile: hadleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={onChange}
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            // Gets all default slash menu items and `insertAlert` item.
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                insertImages(editor),
                insertAlert(editor),
                insertHelloWorldItem(editor),
              ],
              query
            )
          }
        />
      </BlockNoteView>
    </div>
  );
};
