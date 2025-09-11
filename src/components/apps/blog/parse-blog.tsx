import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import SyntaxHighlighter from "react-syntax-highlighter";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";
`   `;
const useParseBlogContent = ({ content }: { content?: string }) => {
  // Function to detect language from class attribute (TipTap uses class="language-xxx")
  const detectLanguage = (classAttr?: string): string => {
    if (classAttr) {
      // Extract language from class like "language-javascript" or "language-js"
      const match = classAttr.match(/language-(\w+)/);
      if (match) {
        return match[1];
      }
    }
    return "javascript"; // default fallback
  };

  // Options for html-react-parser to handle pre/code elements
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const codeElement = domNode.children.find(
          (child) => child instanceof Element && child.name === "code"
        ) as Element | undefined;

        if (codeElement) {
          // Get text content instead of innerHTML to avoid HTML entities
          const codeContent =
            codeElement.children
              ?.map((child) => {
                if (child.type === "text") return child.data;

                return "";
              })
              .join("") || "";

          const language = detectLanguage(codeElement.attribs?.class);

          return (
            <div className="max-w-full overflow-x-auto my-4 bg-ctp-surface0 rounded-lg">
              <SyntaxHighlighter
                language={language}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  background: "transparent",
                  lineHeight: 1.1,
                }}
                codeTagProps={{
                  className: `hljs`,
                  style: { background: "var(--ctp-surface0)" },
                }}
                useInlineStyles={false}
                showLineNumbers={false}
              >
                {codeContent}
              </SyntaxHighlighter>
            </div>
          );
        }
      }
    },
  };

  const ParsedContent = () => {
    if (!content) return null;
    return parse(content, parserOptions);
  };

  return ParsedContent;
};

export default useParseBlogContent;
