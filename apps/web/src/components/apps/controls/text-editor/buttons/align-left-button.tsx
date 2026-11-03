import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";

interface AlignLeftButtonProps {
  editor: Editor;
  className?: string;
}

const AlignLeftButton = ({ editor, className = "" }: AlignLeftButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().setTextAlign("left").run()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive({ textAlign: "left" }) ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title="Align Left"
    >
      <FontAwesomeIcon icon={faAlignLeft} />
    </button>
  );
};

export default AlignLeftButton;
