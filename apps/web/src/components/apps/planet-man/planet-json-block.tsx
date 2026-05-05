import "@/components/apps/blog/blog-article.css";

type Props = {
  /** Raw text or formatted JSON string */
  content: string;
};

/**
 * Same structure as blog-rendered markdown: `.article-content` &gt; `pre` &gt; `code`,
 * so `blog-article.css` code-block styles apply.
 */
export default function PlanetJsonBlock({ content }: Props) {
  return (
    <article className="article-content planet-json-block h-full min-h-0 w-full">
      <pre>
        <code>{content || "—"}</code>
      </pre>
    </article>
  );
}
