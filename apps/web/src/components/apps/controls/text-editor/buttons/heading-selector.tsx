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
        type="button"
        className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
          editor.isActive("heading") ? "bg-holo/18 text-[#c9c9ff]" : ""
        }`}
        title="Headings"
      >
        <FontAwesomeIcon icon={faHeading} />
        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
      </button>
      <div
        className="absolute top-full z-50 left-0 mt-1 p-2 rounded-xl border border-white/12 bg-[rgba(20,19,36,0.96)] shadow-[0_16px_40px_rgba(6,5,16,0.5)] backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-150"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon ${
              editor.isActive("paragraph") ? "bg-holo/18 text-[#c9c9ff]" : ""
            }`}
            title="Paragraph"
          >
            Paragraph
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon ${
              editor.isActive("heading", { level: 1 }) ? "bg-holo/18 text-[#c9c9ff]" : ""
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon ${
              editor.isActive("heading", { level: 2 }) ? "bg-holo/18 text-[#c9c9ff]" : ""
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon ${
              editor.isActive("heading", { level: 3 }) ? "bg-holo/18 text-[#c9c9ff]" : ""
            }`}
            title="H3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon ${
              editor.isActive("heading", { level: 4 }) ? "bg-holo/18 text-[#c9c9ff]" : ""
            }`}
            title="Heading 4"
          >
            H4
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon ${
              editor.isActive("heading", { level: 5 }) ? "bg-holo/18 text-[#c9c9ff]" : ""
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
