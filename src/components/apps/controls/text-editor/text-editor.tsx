import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { createLowlight } from "lowlight";
import TextEditorMainMenu from "./text-editor-main-menu";
import TextEditorBubbleMenu from "./text-editor-bubble-menu";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";
import "./tiptap-styles.css";

// Custom CodeBlock extension that adds language attribute
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
      Underline,
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
    <div className="w-full bg-ctp-base border border-ctp-surface0 rounded-lg overflow-hidden">
      <TextEditorMainMenu editor={editor} />
      <div className="border-t border-ctp-surface0">
        <EditorContent editor={editor} />
        <TextEditorBubbleMenu editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
