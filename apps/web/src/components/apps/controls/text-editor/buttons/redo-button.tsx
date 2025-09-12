import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

interface RedoButtonProps {
  editor: Editor;
  className?: string;
}

const RedoButton = ({ editor, className = "" }: RedoButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().redo()}
      className={`p-2 rounded hover:bg-ctp-surface1 disabled:opacity-50 disabled:cursor-not-allowed text-ctp-text transition-colors ${className}`}
      title="Redo"
    >
      <FontAwesomeIcon icon={faRedo} />
    </button>
  );
};

export default RedoButton;
