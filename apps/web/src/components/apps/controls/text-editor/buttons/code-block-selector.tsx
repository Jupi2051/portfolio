import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

interface CodeBlockSelectorProps {
  editor: Editor;
  className?: string;
}

const CodeBlockSelector = ({
  editor,
  className = "",
}: CodeBlockSelectorProps) => {
  if (!editor) return null;

  // Easily configurable language list
  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "TypeScript", value: "typescript" },
    { name: "TSX", value: "typescriptreact" },
    { name: "JSX", value: "javascriptreact" },
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

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={() => editor.chain().focus().setCodeBlock().run()}
        className={`p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors ${
          editor.isActive("codeBlock") ? "bg-ctp-surface2" : ""
        }`}
        title="Code Block"
      >
        <FontAwesomeIcon icon={faCode} />
      </button>
      <div
        className="absolute top-full z-50 left-0 mt-1 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-60 overflow-y-auto hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-1">
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
  );
};

export default CodeBlockSelector;
