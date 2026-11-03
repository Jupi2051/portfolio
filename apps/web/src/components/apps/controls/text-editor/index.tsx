import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { createLowlight } from "lowlight";
import TextEditorMainMenu from "./text-editor-main-menu";
import TextEditorBubbleMenu from "./text-editor-bubble-menu";
import type { ReactNode } from "react";
import cn from "classnames";
import { proseClassName } from "@/components/apps/blog/blog-article";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";
import "./tiptap-styles.css";

// Custom CodeBlock extension that adds language attribute and tab indentation
const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  renderHTML({ node, HTMLAttributes }) {
    const language = node.attrs.language || "text";
    return [
      "pre",
      HTMLAttributes,
      [
        "code",
        {
          ...HTMLAttributes,
          class: `language-${language} hljs`,
          language: language,
        },
        0,
      ],
    ];
  },

  addKeyboardShortcuts() {
    const isInCodeBlock = (editor: any) => {
      const parentType = editor.state.selection.$from.parent.type.name;
      return (
        editor.isActive("codeBlock") ||
        parentType === "codeBlock" ||
        parentType === "codeBlockLowlight"
      );
    };

    return {
      Tab: ({ editor }) => {
        if (isInCodeBlock(editor)) {
          editor.commands.insertContent("\t");
          return true;
        }
        return false;
      },
      "Shift-Tab": ({ editor }) => {
        if (isInCodeBlock(editor)) {
          const { state } = editor;
          const { $from } = state.selection;
          const lineStart = $from.start($from.depth);
          const lineEnd = $from.end($from.depth);
          const lineText = state.doc.textBetween(lineStart, lineEnd);

          if (lineText.startsWith("\t")) {
            editor.commands.setTextSelection({ from: lineStart, to: lineEnd });
            editor.commands.insertContent(lineText.substring(1));
            return true;
          }
        }
        return false;
      },
    };
  },
});

type propTypes = {
  value: string;
  setValue: (text: string) => void;
  /** Rendered above the document inside the scroll area (title / description inputs). */
  header?: ReactNode;
};

function TextEditor(props: propTypes) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color.configure({
        types: [TextStyle.name],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
      }),
      CustomCodeBlockLowlight.configure({
        lowlight: createLowlight(),
        defaultLanguage: "javascript",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: props.value,
    onUpdate({ editor }) {
      props.setValue(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(proseClassName, "min-h-60 focus:outline-none"),
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <TextEditorMainMenu editor={editor} />
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7 [scrollbar-color:rgba(255,255,255,0.14)_transparent] scrollbar-thin @2xl/appwindow:px-10 @2xl/appwindow:py-8">
        {props.header}
        <EditorContent editor={editor} />
        <TextEditorBubbleMenu editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
