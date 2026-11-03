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
        type="button"
        onClick={() => editor.chain().focus().setCodeBlock().run()}
        className={`flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon ${
          editor.isActive("codeBlock") ? "bg-holo/18 text-[#c9c9ff]" : ""
        }`}
        title="Code Block"
      >
        <FontAwesomeIcon icon={faCode} />
      </button>
      <div
        className="absolute top-full z-50 left-0 mt-1 p-2 rounded-xl border border-white/12 bg-[rgba(20,19,36,0.96)] shadow-[0_16px_40px_rgba(6,5,16,0.5)] backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-150 max-h-60 overflow-y-auto hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.value}
              type="button"
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
              className="w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-[13px] text-lilac transition-colors duration-150 hover:bg-white/8 hover:text-moon"
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
