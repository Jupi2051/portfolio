import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface ImageUploadButtonProps {
  editor: Editor;
  className?: string;
}

const ImageUploadButton = ({
  editor,
  className = "",
}: ImageUploadButtonProps) => {
  if (!editor) return null;

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const src = event.target?.result as string;
              editor.chain().focus().setImage({ src }).run();
            };
            reader.readAsDataURL(file);
          }
          // Reset the input so the same file can be selected again
          e.target.value = "";
        }}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text cursor-pointer transition-colors"
        title="Insert Image"
      >
        <FontAwesomeIcon icon={faImage} />
      </label>
    </div>
  );
};

export default ImageUploadButton;
