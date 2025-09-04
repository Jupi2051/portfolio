import hljs from "highlight.js/lib/core";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import javascript from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("css", css);

type propTypes = {
  textContent: string;
  updateTextContentFunction: (text: string) => void;
};

function TextEditor(props: propTypes) {
  hljs.configure({
    languages: ["javascript", "ruby", "python", "rust"],
  });

  const modules: any = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  const formats: any = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
  ];

  function onUpdateContent(value: string) {
    props.updateTextContentFunction(value);
  }

  return (
    <div className="w-full">
      <div className="ql-snow">
        <ReactQuill
          className="react-quill-item"
          theme={"snow"}
          value={props.textContent}
          onChange={onUpdateContent}
          placeholder="content"
          formats={formats}
          modules={modules}
        />
      </div>
    </div>
  );
}

export default TextEditor;
