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
    <div className="flex flex-wrap items-center gap-1 p-2 bg-ctp-surface0 border-b border-ctp-surface1">
      {/* History */}
      <div className="flex gap-1 mr-2">
        <UndoButton editor={editor} />
        <RedoButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Headings */}
      <div className="flex gap-1 mr-2">
        <HeadingSelector editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Formatting */}
      <div className="flex gap-1 mr-2">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <StrikethroughButton editor={editor} />
        <InlineCodeButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Alignment */}
      <div className="flex gap-1 mr-2">
        <AlignLeftButton editor={editor} />
        <AlignCenterButton editor={editor} />
        <AlignRightButton editor={editor} />
        <AlignJustifyButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Lists */}
      <div className="flex gap-1 mr-2">
        <BulletListButton editor={editor} />
        <OrderedListButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Block Elements */}
      <div className="flex gap-1 mr-2">
        <CodeBlockSelector editor={editor} />
        <BlockquoteButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Image Upload */}
      <div className="flex gap-1 mr-2">
        <ImageUploadButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Links */}
      <div className="flex gap-1 mr-2">
        <LinkButton editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Tables */}
      <div className="flex gap-1 mr-2">
        <TableActionsMenu editor={editor} />
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Colors */}
      <div className="flex gap-1 mr-2">
        <TextColorPicker editor={editor} />
      </div>

      {/* Highlight Colors */}
      <div className="flex gap-1">
        <HighlightColorPicker editor={editor} />
      </div>
    </div>
  );
};

export default TextEditorMainMenu;
