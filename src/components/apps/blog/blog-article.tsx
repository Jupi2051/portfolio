import parse from "html-react-parser";
import "@/Styles/BlogArticle.css";
import "../../../../node_modules/highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import go from "highlight.js/lib/languages/go";
import json from "highlight.js/lib/languages/json";
import css from "highlight.js/lib/languages/css";
import csharp from "highlight.js/lib/languages/csharp";
import html from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("go", go);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("xml", html);
hljs.registerLanguage("bash", bash);

export type BlogArticleType = {
  id: string;
  dateTime: string;
  title: string;
  description: string;
  content: string;
};

function replaceHtmlEntities(text: string): string {
  const entityMap: { [key: string]: string } = {
    "&nbsp;": " ", // Tab character
    "&lt;": "<", // Less than
    "&gt;": ">", // Greater than
    "&quot;": '"', // Double quote
    "&apos;": "'", // Single quote
    // Add more HTML entities as needed
  };

  return Object.keys(entityMap).reduce((acc, entity) => {
    const regex = new RegExp(entity, "g");
    return acc.replace(regex, entityMap[entity]);
  }, text);
}

function BlogArticle(props: BlogArticleType) {
  let htmlString = props.content;
  const preElements = htmlString.match(
    /(<pre class="ql-syntax" spellcheck="false">[\s\S]*?<\/pre>)/gs
  );

  const codeSnippets: string[] = [];
  if (preElements) {
    for (const preContent of preElements) {
      const codeSnippet = preContent.replace(/<.*?>/g, ""); // Remove HTML tags
      // const formattedSnippet = codeSnippet.replace(/&nbsp;/g, '\t'); // Replace &nbsp; with tab character
      const formattedSnippet = replaceHtmlEntities(codeSnippet);
      codeSnippets.push(`${formattedSnippet}`);
    }
  }

  const highlightedSnippets: string[] = [];
  for (const snippet of codeSnippets) {
    const highlighted = hljs.highlightAuto(snippet).value; // Adjust the language as needed
    highlightedSnippets.push(highlighted);
  }

  if (preElements) {
    for (let i = 0; i < preElements.length; i++) {
      htmlString = htmlString.replace(
        preElements[i],
        `<pre><code>${highlightedSnippets[i]}</code></pre>`
      );
    }
  }

  const parsedContent = parse(htmlString);

  const dateTime = new Date(props.dateTime);
  const formattedDate = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full border-b-[1.6px] border-solid border-white">
        <h1 className="@5xl:w-4/5">{props.title}</h1>
        <div className="flex justify-between">
          <p className="w-4/5">{props.description}</p>
          <time className="self-end" dateTime={props.dateTime}>
            {formattedDate}
          </time>
        </div>
      </div>
      <div className="blog-reader-content">{parsedContent}</div>
    </div>
  );
}

export default BlogArticle;
