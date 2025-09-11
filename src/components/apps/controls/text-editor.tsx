import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

type propTypes = {
  textContent: string;
  updateTextContentFunction: (text: string) => void;
};

function TextEditor(props: propTypes) {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  const editorContent = useEditorState({
    editor,
    selector: ({ editor }) => editor.getHTML(),
  });

  function onUpdateContent(value: string) {
    props.updateTextContentFunction(value);
  }

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
}

export default TextEditor;
