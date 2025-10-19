import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

interface InlineCodeButtonProps {
  editor: Editor;
  className?: string;
}

const InlineCodeButton = ({
  editor,
  className = "",
}: InlineCodeButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleCode().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("code") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Inline Code"
    >
      <FontAwesomeIcon icon={faCode} />
    </button>
  );
};

export default InlineCodeButton;
