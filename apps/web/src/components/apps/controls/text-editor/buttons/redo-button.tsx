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
      type="button"
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().redo()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      title="Redo"
    >
      <FontAwesomeIcon icon={faRedo} />
    </button>
  );
};

export default RedoButton;
