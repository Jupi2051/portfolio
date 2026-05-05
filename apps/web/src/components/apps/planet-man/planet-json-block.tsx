import SyntaxHighlighter from "react-syntax-highlighter"
import "@catppuccin/highlightjs/css/catppuccin-frappe.css"
import "@/components/apps/blog/blog-article.css"

type Props = {
  /** Raw text or formatted JSON string */
  content: string
}

function highlightLanguage(text: string): string {
  const t = text.trim()
  if (!t || t === "—") return "plaintext"
  if (
    (t.startsWith("{") && t.endsWith("}")) ||
    (t.startsWith("[") && t.endsWith("]"))
  ) {
    return "json"
  }
  if (t.startsWith("<")) return "xml"
  return "plaintext"
}

/**
 * Blog posts get colors from `parse-blog.tsx` via `SyntaxHighlighter` + hljs +
 * `@catppuccin/highlightjs`. Plain `<pre><code>` only gets layout from
 * `blog-article.css`, not tokens — so we use the same highlighter here.
 */
export default function PlanetJsonBlock({ content }: Props) {
  const text = content || "—"
  const language = highlightLanguage(text)

  return (
    <article className="article-content planet-json-block flex min-h-0 w-full flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-ctp-surface0">
        <div className="planet-man-scrollbar min-h-0 flex-1 overflow-auto rounded-lg">
          <SyntaxHighlighter
            language={language}
            customStyle={{
              margin: 0,
              padding: "1rem",
              borderRadius: "0.5rem",
              background: "transparent",
              lineHeight: 1.5,
              minHeight: "100%",
            }}
            codeTagProps={{
              className: "hljs",
              style: { background: "var(--ctp-surface0)" },
            }}
            useInlineStyles={false}
            showLineNumbers={false}
          >
            {text}
          </SyntaxHighlighter>
        </div>
      </div>
    </article>
  )
}
