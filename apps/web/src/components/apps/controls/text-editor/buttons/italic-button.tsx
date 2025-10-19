import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic } from "@fortawesome/free-solid-svg-icons";

interface ItalicButtonProps {
  editor: Editor;
  className?: string;
}

const ItalicButton = ({ editor, className = "" }: ItalicButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("italic") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Italic"
    >
      <FontAwesomeIcon icon={faItalic} />
    </button>
  );
};

export default ItalicButton;
