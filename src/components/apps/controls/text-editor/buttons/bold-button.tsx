import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";

interface BoldButtonProps {
  editor: Editor;
  className?: string;
}

const BoldButton = ({ editor, className = "" }: BoldButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("bold") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Bold"
    >
      <FontAwesomeIcon icon={faBold} />
    </button>
  );
};

export default BoldButton;
