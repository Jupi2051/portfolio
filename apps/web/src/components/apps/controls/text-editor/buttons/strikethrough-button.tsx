import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";

interface StrikethroughButtonProps {
  editor: Editor;
  className?: string;
}

const StrikethroughButton = ({
  editor,
  className = "",
}: StrikethroughButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive("strike") ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title="Strikethrough"
    >
      <FontAwesomeIcon icon={faStrikethrough} />
    </button>
  );
};

export default StrikethroughButton;
