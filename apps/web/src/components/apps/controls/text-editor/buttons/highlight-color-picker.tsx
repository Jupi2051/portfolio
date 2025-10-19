import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";

interface HighlightColorPickerProps {
  editor: Editor;
  className?: string;
}

const HighlightColorPicker = ({
  editor,
  className = "",
}: HighlightColorPickerProps) => {
  if (!editor) return null;

  const highlights = [
    { name: "Yellow", value: "#f9e2af" },
    { name: "Green", value: "#a6e3a1" },
    { name: "Blue", value: "#89b4fa" },
    { name: "Purple", value: "#cba6f7" },
    { name: "Pink", value: "#f5c2e7" },
    { name: "Red", value: "#f38ba8" },
  ];

  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors"
        title="Highlight"
      >
        <FontAwesomeIcon icon={faHighlighter} />
      </button>
      <div className="absolute top-full left-0 mt-1 -mx-10 p-2 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="grid grid-cols-3 gap-1">
          {highlights.map((color) => (
            <button
              key={color.name}
              type="button"
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
  );
};

export default HighlightColorPicker;
