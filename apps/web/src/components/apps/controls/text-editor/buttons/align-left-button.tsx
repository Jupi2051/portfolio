import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";

interface AlignLeftButtonProps {
  editor: Editor;
  className?: string;
}

const AlignLeftButton = ({ editor, className = "" }: AlignLeftButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign("left").run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive({ textAlign: "left" }) ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Align Left"
    >
      <FontAwesomeIcon icon={faAlignLeft} />
    </button>
  );
};

export default AlignLeftButton;
