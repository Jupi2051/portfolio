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
        placeholder: "Start writing your content...",
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
        class:
          "prose prose-invert max-w-none focus:outline-none px-4 py-3 min-h-[200px]",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full bg-ctp-base border border-ctp-surface0 rounded-lg">
      <TextEditorMainMenu editor={editor} />
      <div className="border-t border-ctp-surface0">
        <EditorContent editor={editor} />
        <TextEditorBubbleMenu editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
