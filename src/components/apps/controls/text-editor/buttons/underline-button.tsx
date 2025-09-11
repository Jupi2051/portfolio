import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";

interface UnderlineButtonProps {
  editor: Editor;
  className?: string;
}

const UnderlineButton = ({ editor, className = "" }: UnderlineButtonProps) => {
  if (!editor) return null;

  return (
    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("underline") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Underline"
    >
      <FontAwesomeIcon icon={faUnderline} />
    </button>
  );
};

export default UnderlineButton;
