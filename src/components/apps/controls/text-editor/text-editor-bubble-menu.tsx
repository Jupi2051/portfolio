import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faCode,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faListUl,
  faListOl,
  faQuoteLeft,
  faHighlighter,
  faPalette,
  faChevronDown,
  faImage,
  faTrash,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextEditorBubbleMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  // Easily configurable language list
  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "TypeScript", value: "typescript" },
    { name: "Python", value: "python" },
    { name: "Java", value: "java" },
    { name: "C++", value: "cpp" },
    { name: "C#", value: "csharp" },
    { name: "Go", value: "go" },
    { name: "Rust", value: "rust" },
    { name: "PHP", value: "php" },
    { name: "Ruby", value: "ruby" },
    { name: "Swift", value: "swift" },
    { name: "Kotlin", value: "kotlin" },
    { name: "HTML", value: "html" },
    { name: "CSS", value: "css" },
    { name: "SCSS", value: "scss" },
    { name: "JSON", value: "json" },
    { name: "XML", value: "xml" },
    { name: "YAML", value: "yaml" },
    { name: "Markdown", value: "markdown" },
    { name: "SQL", value: "sql" },
    { name: "Bash", value: "bash" },
    { name: "Shell", value: "shell" },
    { name: "Docker", value: "dockerfile" },
    { name: "Plain Text", value: "text" },
  ];

  const colors = [
    { name: "Red", value: "#f38ba8" },
    { name: "Orange", value: "#fab387" },
    { name: "Yellow", value: "#f9e2af" },
    { name: "Green", value: "#a6e3a1" },
    { name: "Blue", value: "#89b4fa" },
    { name: "Purple", value: "#cba6f7" },
    { name: "Pink", value: "#f5c2e7" },
    { name: "Default", value: "#cdd6f4" },
  ];

  const highlights = [
    { name: "Yellow", value: "#f9e2af" },
    { name: "Green", value: "#a6e3a1" },
    { name: "Blue", value: "#89b4fa" },
    { name: "Purple", value: "#cba6f7" },
    { name: "Pink", value: "#f5c2e7" },
    { name: "Red", value: "#f38ba8" },
  ];

  return (
    <BubbleMenu
      editor={editor}
      className="flex items-center gap-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg"
    >
      {/* Text Formatting */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("bold") ? "bg-ctp-surface2 text-ctp-accent" : ""
          }`}
          title="Bold"
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("italic") ? "bg-ctp-surface2 text-ctp-accent" : ""
          }`}
          title="Italic"
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("underline")
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Underline"
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("strike") ? "bg-ctp-surface2 text-ctp-accent" : ""
          }`}
          title="Strikethrough"
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("code") ? "bg-ctp-surface2 text-ctp-accent" : ""
          }`}
          title="Inline Code"
        >
          <FontAwesomeIcon icon={faCode} />
        </button>
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Alignment */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Align Left"
        >
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Align Center"
        >
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Align Right"
        >
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Justify"
        >
          <FontAwesomeIcon icon={faAlignJustify} />
        </button>
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Lists */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("bulletList")
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Bullet List"
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("orderedList")
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Numbered List"
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
            editor.isActive("blockquote")
              ? "bg-ctp-surface2 text-ctp-accent"
              : ""
          }`}
          title="Blockquote"
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>
        <div className="relative group">
          <button
            onClick={() => editor.chain().focus().setCodeBlock().run()}
            className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
              editor.isActive("codeBlock")
                ? "bg-ctp-surface2 text-ctp-accent"
                : ""
            }`}
            title="Code Block"
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <div className="absolute top-full left-0 mt-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 max-h-60 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs text-ctp-subtext1 font-semibold mb-2 px-2">
                Select Language:
              </div>
              {languages.map((language) => (
                <button
                  key={language.value}
                  onClick={() => {
                    if (editor.isActive("codeBlock")) {
                      editor
                        .chain()
                        .focus()
                        .updateAttributes("codeBlock", {
                          language: language.value,
                          class: `language-${language.value} hljs`,
                        })
                        .run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .setCodeBlock({ language: language.value })
                        .run();
                    }
                  }}
                  className="w-full text-left px-2 py-1 rounded hover:bg-ctp-surface1 text-ctp-text text-sm transition-colors"
                  title={language.name}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-px h-6 bg-ctp-surface1 mx-1" />

      {/* Text Colors */}
      <div className="flex gap-1">
        <div className="relative group">
          <button
            className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
            title="Text Color"
          >
            <FontAwesomeIcon icon={faPalette} />
          </button>
          <div className="absolute top-full left-0 mt-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <div className="grid grid-cols-4 gap-1">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() =>
                    editor.chain().focus().setColor(color.value).run()
                  }
                  className="w-6 h-6 rounded border border-ctp-surface1 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlight Colors */}
      <div className="flex gap-1">
        <div className="relative group">
          <button
            className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
            title="Highlight"
          >
            <FontAwesomeIcon icon={faHighlighter} />
          </button>
          <div className="absolute top-full left-0 mt-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <div className="grid grid-cols-3 gap-1">
              {highlights.map((color) => (
                <button
                  key={color.name}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: color.value })
                      .run()
                  }
                  className="w-6 h-6 rounded border border-ctp-surface1 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Controls - Only show when an image is selected */}
      {editor.isActive("image") && (
        <>
          <div className="w-px h-6 bg-ctp-surface1 mx-1" />
          <div className="flex gap-1">
            <button
              onClick={() => {
                const { src, alt, title } = editor.getAttributes("image");
                const newAlt = prompt("Enter alt text:", alt || "");
                if (newAlt !== null) {
                  editor.chain().focus().setImage({ src, alt: newAlt }).run();
                }
              }}
              className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
              title="Edit Alt Text"
            >
              <FontAwesomeIcon icon={faImage} />
            </button>
            <button
              onClick={() => {
                const { src } = editor.getAttributes("image");
                const newSrc = prompt("Enter image URL:", src || "");
                if (newSrc !== null && newSrc.trim() !== "") {
                  editor.chain().focus().setImage({ src: newSrc.trim() }).run();
                }
              }}
              className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
              title="Change Image URL"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteNode("image").run()}
              className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
              title="Delete Image"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </BubbleMenu>
  );
};

export default TextEditorBubbleMenu;
