import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash, faExpand } from "@fortawesome/free-solid-svg-icons";
import {
  TextColorPicker,
  HighlightColorPicker,
  CodeBlockSelector,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  StrikethroughButton,
  InlineCodeButton,
  AlignLeftButton,
  AlignCenterButton,
  AlignRightButton,
  AlignJustifyButton,
  BulletListButton,
  OrderedListButton,
  BlockquoteButton,
  LinkButton,
  TableActionsMenu,
} from "./buttons";

const TextEditorBubbleMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      className="flex items-center gap-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg"
    >
      {/* Text Formatting */}
      <div className="flex gap-1">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <StrikethroughButton editor={editor} />
        <InlineCodeButton editor={editor} />
        <LinkButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Alignment */}
      <div className="flex gap-1">
        <AlignLeftButton editor={editor} />
        <AlignCenterButton editor={editor} />
        <AlignRightButton editor={editor} />
        <AlignJustifyButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Lists */}
      <div className="flex gap-1">
        <BulletListButton editor={editor} />
        <OrderedListButton editor={editor} />
        <BlockquoteButton editor={editor} />
        <CodeBlockSelector editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Colors */}
      <div className="flex gap-1">
        <TextColorPicker editor={editor} />
      </div>

      {/* Highlight Colors */}
      <div className="flex gap-1">
        <HighlightColorPicker editor={editor} />
      </div>

      {/* Image Controls - Only show when an image is selected */}
      {editor.isActive("image") && (
        <>
          <div className="w-px h-6 bg-ctp-surface1 mx-1" />
          <div className="flex gap-1">
            <button
              onClick={() => {
                const { src, alt, title } = editor.getAttributes("image");
                const newAlt = prompt("Enter alt text:", alt || "");
                if (newAlt !== null) {
                  editor.chain().focus().setImage({ src, alt: newAlt }).run();
                }
              }}
              className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
              title="Edit Alt Text"
              type="button"
            >
              <FontAwesomeIcon icon={faImage} />
            </button>
            <button
              onClick={() => {
                const { src } = editor.getAttributes("image");
                const newSrc = prompt("Enter image URL:", src || "");
                if (newSrc !== null && newSrc.trim() !== "") {
                  editor.chain().focus().setImage({ src: newSrc.trim() }).run();
                }
              }}
              className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
              title="Change Image URL"
              type="button"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteNode("image").run()}
              className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
              title="Delete Image"
              type="button"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}

      {/* Tables */}
      {editor.isActive("table") && (
        <>
          <div className="w-px h-6 bg-ctp-surface1 mx-1" />
          <div className="flex gap-1">
            <TableActionsMenu editor={editor} />
          </div>
        </>
      )}
    </BubbleMenu>
  );
};

export default TextEditorBubbleMenu;
