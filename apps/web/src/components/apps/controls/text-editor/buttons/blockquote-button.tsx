import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

interface BlockquoteButtonProps {
  editor: Editor;
  className?: string;
}

const BlockquoteButton = ({
  editor,
  className = "",
}: BlockquoteButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("blockquote") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Blockquote"
    >
      <FontAwesomeIcon icon={faQuoteLeft} />
    </button>
  );
};

export default BlockquoteButton;
