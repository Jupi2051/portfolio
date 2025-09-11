import parse from "html-react-parser";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useEffect, useRef } from "react";

export type BlogArticleType = {
  id: string;
  dateTime: string;
  title: string;
  description: string;
  content: string;
};

function BlogArticle({
  content,
  dateTime,
  title,
  description,
}: BlogArticleType) {
  const contentRef = useRef<HTMLDivElement>(null);

  const dateTimeFormatted = new Date(dateTime);
  const formattedDate = dateTimeFormatted.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full border-b-[1.6px] border-solid border-white">
        <h1 className="@5xl:w-4/5">{title}</h1>
        <div className="flex justify-between">
          <p className="w-4/5">{description}</p>
          <time className="self-end" dateTime={dateTime}>
            {formattedDate}
          </time>
        </div>
      </div>
      <div className="article-content text-ctp-text" ref={contentRef}>
        {parse(content)}
        <style>
          {`
          .article-content pre {
            background-color: #303446;
            padding: 0.5rem 0.5rem;
          }
          `}
        </style>
        <SyntaxHighlighter
          language="javascript"
          useInlineStyles={false}
          showLineNumbers={true}
        >
          {`const plastic_love = 3
          
if (plastic_love === 3) {
  console.log("plastic_love is 3")
} else {
  console.log("plastic_love is not 3")
}`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default BlogArticle;
