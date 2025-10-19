import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faUnlink } from "@fortawesome/free-solid-svg-icons";

interface LinkButtonProps {
  editor: Editor;
  className?: string;
}

const LinkButton = ({ editor, className = "" }: LinkButtonProps) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <button
      type="button"
      onClick={setLink}
      className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
        editor.isActive("link") ? "bg-ctp-surface2" : ""
      } ${className}`}
      title={editor.isActive("link") ? "Edit Link" : "Add Link"}
    >
      <FontAwesomeIcon icon={editor.isActive("link") ? faUnlink : faLink} />
    </button>
  );
};

export default LinkButton;
