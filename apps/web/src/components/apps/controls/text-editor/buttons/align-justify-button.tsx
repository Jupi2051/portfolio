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
      type="button"
      onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive({ textAlign: "justify" }) ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title="Justify"
    >
      <FontAwesomeIcon icon={faAlignJustify} />
    </button>
  );
};

export default AlignJustifyButton;
