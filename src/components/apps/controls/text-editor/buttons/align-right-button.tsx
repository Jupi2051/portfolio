import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";

interface AlignRightButtonProps {
  editor: Editor;
  className?: string;
}

const AlignRightButton = ({
  editor,
  className = "",
}: AlignRightButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign("right").run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive({ textAlign: "right" }) ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Align Right"
    >
      <FontAwesomeIcon icon={faAlignRight} />
    </button>
  );
};

export default AlignRightButton;
