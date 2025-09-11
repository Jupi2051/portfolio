import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";

interface AlignJustifyButtonProps {
  editor: Editor;
  className?: string;
}

const AlignJustifyButton = ({
  editor,
  className = "",
}: AlignJustifyButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive({ textAlign: "justify" }) ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Justify"
    >
      <FontAwesomeIcon icon={faAlignJustify} />
    </button>
  );
};

export default AlignJustifyButton;
