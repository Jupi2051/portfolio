import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListOl } from "@fortawesome/free-solid-svg-icons";

interface OrderedListButtonProps {
  editor: Editor;
  className?: string;
}

const OrderedListButton = ({
  editor,
  className = "",
}: OrderedListButtonProps) => {
  if (!editor) return null;

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("orderedList") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title="Numbered List"
    >
      <FontAwesomeIcon icon={faListOl} />
    </button>
  );
};

export default OrderedListButton;
