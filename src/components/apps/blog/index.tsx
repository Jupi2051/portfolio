import BlogArticle from "./blog-article";
import TextEditor from "../controls/text-editor/text-editor";
import { useState } from "react";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";

const Blog = () => {
  const [editorContent, setEditorContent] = useState<string>("");

  return (
    <div className="w-full h-full bg-ctp-base flex items-center justify-center px-20">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/2 max-1/2">
          <TextEditor value={editorContent} setValue={setEditorContent} />
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
