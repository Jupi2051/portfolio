import { useRef } from "react";
import useParseBlogContent from "./parse-blog";
import "./blog-article.css";

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
    <div className="flex flex-col h-full isolate">
      <div className="flex flex-col w-full border-b-[1.6px] border-solid border-ctp-surface1 bg-ctp-surface0 rounded-t-lg p-6 rounded-xl -mb-5 z-10 hover:scale-[101%] transition-all duration-300">
        <h1 className="@5xl:w-4/5 text-ctp-text font-semibold text-2xl mb-2 hover:translate-y-4">
          {title}
        </h1>
        <div className="flex justify-between">
          <p className="w-4/5 text-ctp-subtext1">{description}</p>
          <time
            className="self-end text-ctp-subtext0 text-sm"
            dateTime={dateTime}
          >
            {formattedDate}
          </time>
        </div>
      </div>
      <article
        className="article-content text-ctp-text flex-1"
        ref={contentRef}
      >
        <ParsedContent content={content} />
      </article>
    </div>
  );
}

export default BlogArticle;
