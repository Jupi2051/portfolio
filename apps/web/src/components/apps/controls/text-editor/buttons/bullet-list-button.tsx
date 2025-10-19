import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

interface BulletListButtonProps {
  editor: Editor;
  className?: string;
}

const BulletListButton = ({
  editor,
  className = "",
}: BulletListButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("bulletList") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Bullet List"
    >
      <FontAwesomeIcon icon={faListUl} />
    </button>
  );
};

export default BulletListButton;
