import { useRef } from "react";
import useParseBlogContent from "./parse-blog";

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
  const ParsedContent = useParseBlogContent({ content });

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
        <ParsedContent />
      </div>
    </div>
  );
}

export default BlogArticle;
