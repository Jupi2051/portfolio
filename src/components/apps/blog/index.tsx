import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import BlogArticle from "./blog-article";

const Blog = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  const editorContent = useEditorState({
    editor,
    selector: ({ editor }) => editor.getHTML(),
  });

  return (
    <div className="w-full h-full bg-ctp-base flex items-center justify-center px-20">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/2 max-1/2">
          <EditorContent editor={editor} />
          {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
          <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </div>
        <div className="w-1/2">
          <BlogArticle
            content={editorContent}
            id="30"
            title="Hello World"
            description="This is a description"
            dateTime="2021-01-01"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
