import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

interface AlignCenterButtonProps {
  editor: Editor;
  className?: string;
}

const AlignCenterButton = ({
  editor,
  className = "",
}: AlignCenterButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().setTextAlign("center").run()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive({ textAlign: "center" }) ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title="Align Center"
    >
      <FontAwesomeIcon icon={faAlignCenter} />
    </button>
  );
};

export default AlignCenterButton;
