import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

interface AlignCenterButtonProps {
  editor: Editor;
  className?: string;
}

const AlignCenterButton = ({
  editor,
  className = "",
}: AlignCenterButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().setTextAlign("center").run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive({ textAlign: "center" }) ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Align Center"
    >
      <FontAwesomeIcon icon={faAlignCenter} />
    </button>
  );
};

export default AlignCenterButton;
