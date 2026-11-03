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
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
        editor.isActive("link") ? "bg-holo/18 text-[#c9c9ff]" : ""
      } ${className}`}
      title={editor.isActive("link") ? "Edit Link" : "Add Link"}
    >
      <FontAwesomeIcon icon={editor.isActive("link") ? faUnlink : faLink} />
    </button>
  );
};

export default LinkButton;
