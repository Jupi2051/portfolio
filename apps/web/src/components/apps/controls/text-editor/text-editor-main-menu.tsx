import { Editor } from "@tiptap/react";
import {
  HeadingSelector,
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
  UndoButton,
  RedoButton,
  BlockquoteButton,
  ImageUploadButton,
  LinkButton,
  TableActionsMenu,
} from "./buttons";

const TextEditorMainMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-0.5 border-b border-white/6 bg-[rgba(19,18,37,0.6)] px-4 py-2 @2xl/appwindow:px-6">
      {/* History */}
      <div className="flex gap-0.5">
        <UndoButton editor={editor} />
        <RedoButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Headings */}
      <div className="flex gap-0.5">
        <HeadingSelector editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Text Formatting */}
      <div className="flex gap-0.5">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <StrikethroughButton editor={editor} />
        <InlineCodeButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Text Alignment */}
      <div className="flex gap-0.5">
        <AlignLeftButton editor={editor} />
        <AlignCenterButton editor={editor} />
        <AlignRightButton editor={editor} />
        <AlignJustifyButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Lists */}
      <div className="flex gap-0.5">
        <BulletListButton editor={editor} />
        <OrderedListButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Block Elements */}
      <div className="flex gap-0.5">
        <CodeBlockSelector editor={editor} />
        <BlockquoteButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Image Upload */}
      <div className="flex gap-0.5">
        <ImageUploadButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Links */}
      <div className="flex gap-0.5">
        <LinkButton editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Tables */}
      <div className="flex gap-0.5">
        <TableActionsMenu editor={editor} />
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {/* Text Colors */}
      <div className="flex gap-0.5">
        <TextColorPicker editor={editor} />
      </div>

      {/* Highlight Colors */}
      <div className="flex gap-0.5">
        <HighlightColorPicker editor={editor} />
      </div>
    </div>
  );
};

export default TextEditorMainMenu;
