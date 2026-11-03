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
      type="button"
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive("underline") ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title="Underline"
    >
      <FontAwesomeIcon icon={faUnderline} />
    </button>
  );
};

export default UnderlineButton;
