import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

interface TextColorPickerProps {
  editor: Editor;
  className?: string;
}

const TextColorPicker = ({ editor, className = "" }: TextColorPickerProps) => {
  if (!editor) return null;

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

  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        className="flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-[13px] text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon"
        title="Text Color"
      >
        <FontAwesomeIcon icon={faPalette} />
      </button>
      <div className="absolute top-full left-0 mt-1 -mx-10 p-2 rounded-xl border border-white/12 bg-[rgba(20,19,36,0.96)] shadow-[0_16px_40px_rgba(6,5,16,0.5)] backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-150 z-10">
        <div className="grid grid-cols-4 gap-1">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => editor.chain().focus().setColor(color.value).run()}
              className="size-6 cursor-pointer rounded-md border border-white/14 transition-transform duration-150 ease-out-strong hover:scale-110"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextColorPicker;
