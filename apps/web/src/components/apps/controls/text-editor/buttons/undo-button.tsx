import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

interface UndoButtonProps {
  editor: Editor;
  className?: string;
}

const UndoButton = ({ editor, className = "" }: UndoButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().undo()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      title="Undo"
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  );
};

export default UndoButton;
