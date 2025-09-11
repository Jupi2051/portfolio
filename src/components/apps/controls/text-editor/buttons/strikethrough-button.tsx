import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";

interface StrikethroughButtonProps {
  editor: Editor;
  className?: string;
}

const StrikethroughButton = ({
  editor,
  className = "",
}: StrikethroughButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("strike") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Strikethrough"
    >
      <FontAwesomeIcon icon={faStrikethrough} />
    </button>
  );
};

export default StrikethroughButton;
