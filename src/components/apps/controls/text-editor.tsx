import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

type propTypes = {
  textContent: string;
  updateTextContentFunction: (text: string) => void;
};

function TextEditor(props: propTypes) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.textContent,
    onUpdate({ editor }) {
      props.updateTextContentFunction(editor.getHTML());
    },
  });

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
}

export default TextEditor;
