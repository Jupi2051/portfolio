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
      className="flex items-center gap-1 p-2 rounded-xl border border-white/12 bg-[rgba(20,19,36,0.96)] shadow-[0_16px_40px_rgba(6,5,16,0.5)] backdrop-blur-xl"
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

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Text Alignment */}
      <div className="flex gap-1">
        <AlignLeftButton editor={editor} />
        <AlignCenterButton editor={editor} />
        <AlignRightButton editor={editor} />
        <AlignJustifyButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Lists */}
      <div className="flex gap-1">
        <BulletListButton editor={editor} />
        <OrderedListButton editor={editor} />
        <BlockquoteButton editor={editor} />
        <CodeBlockSelector editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

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
          <div className="mx-1 h-5 w-px bg-white/10" />
          <div className="flex gap-1">
            <button
              onClick={() => {
                const { src, alt, title } = editor.getAttributes("image");
                const newAlt = prompt("Enter alt text:", alt || "");
                if (newAlt !== null) {
                  editor.chain().focus().setImage({ src, alt: newAlt }).run();
                }
              }}
              className="flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon"
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
              className="flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon"
              title="Change Image URL"
              type="button"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteNode("image").run()}
              className="flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon"
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
          <div className="mx-1 h-5 w-px bg-white/10" />
          <div className="flex gap-1">
            <TableActionsMenu editor={editor} />
          </div>
        </>
      )}
    </BubbleMenu>
  );
};

export default TextEditorBubbleMenu;
