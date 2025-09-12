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
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().undo()}
      className={`p-2 rounded hover:bg-ctp-surface1 disabled:opacity-50 disabled:cursor-not-allowed text-ctp-text transition-colors ${className}`}
      title="Undo"
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  );
};

export default UndoButton;
