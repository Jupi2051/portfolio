import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faChevronDown,
  faParagraph,
} from "@fortawesome/free-solid-svg-icons";

interface HeadingSelectorProps {
  editor: Editor;
  className?: string;
}

const HeadingSelector = ({ editor, className = "" }: HeadingSelectorProps) => {
  if (!editor) return null;

  return (
    <div className={`relative group ${className}`}>
      <button
        className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
          editor.isActive("heading") ? "bg-ctp-surface2" : ""
        }`}
        title="Headings"
      >
        <FontAwesomeIcon icon={faHeading} />
        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
      </button>
      <div
        className="absolute top-full z-50 left-0 mt-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-1">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors ${
              editor.isActive("paragraph") ? "bg-ctp-surface2" : ""
            }`}
            title="Paragraph"
          >
            Paragraph
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors ${
              editor.isActive("heading", { level: 1 }) ? "bg-ctp-surface2" : ""
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors ${
              editor.isActive("heading", { level: 2 }) ? "bg-ctp-surface2" : ""
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors ${
              editor.isActive("heading", { level: 3 }) ? "bg-ctp-surface2" : ""
            }`}
            title="H3"
          >
            H3
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors ${
              editor.isActive("heading", { level: 4 }) ? "bg-ctp-surface2" : ""
            }`}
            title="Heading 4"
          >
            H4
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors ${
              editor.isActive("heading", { level: 5 }) ? "bg-ctp-surface2" : ""
            }`}
            title="Heading 5"
          >
            H5
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadingSelector;
