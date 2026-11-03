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
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive("italic") ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title="Italic"
    >
      <FontAwesomeIcon icon={faItalic} />
    </button>
  );
};

export default ItalicButton;
