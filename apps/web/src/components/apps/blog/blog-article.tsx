import cn from "classnames"
import useParseBlogContent from "./parse-blog"

export type BlogArticleType = {
  id: string
  dateTime: string
  title: string
  description: string
  content: string
}

/**
 * Article body is TipTap HTML, so it's styled with Tailwind Typography
 * (`prose`) tuned to the Hologram palette rather than a hand-written sheet.
 */
export const proseClassName = cn(
  "prose prose-invert max-w-160",
  "prose-p:text-[15px] prose-p:leading-6.5 prose-p:text-[#cfcdea]",
  "prose-li:text-[15px] prose-li:leading-6.5 prose-li:text-[#cfcdea] prose-li:marker:text-holo",
  "prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.01em] prose-headings:text-moon-bright",
  "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl",
  "prose-a:font-medium prose-a:text-holo-soft prose-a:underline-offset-2 hover:prose-a:text-moon",
  "prose-strong:text-moon prose-em:text-lilac",
  "prose-code:rounded-md prose-code:border prose-code:border-white/10 prose-code:bg-white/6 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em] prose-code:font-normal prose-code:text-spark prose-code:before:content-none prose-code:after:content-none",
  "prose-blockquote:border-l-holo prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-normal prose-blockquote:text-lilac prose-blockquote:not-italic",
  "prose-hr:border-white/12",
  "prose-img:rounded-2xl prose-img:border prose-img:border-white/10",
  "prose-th:text-haze prose-td:text-[#cfcdea] prose-thead:border-white/14 prose-tr:border-white/8",
  "prose-mark:rounded prose-mark:bg-spark prose-mark:px-1 prose-mark:text-ink",
)

function BlogArticle({ content, dateTime, title, description }: BlogArticleType) {
  const ParsedContent = useParseBlogContent()

  const formattedDate = new Date(dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="flex flex-col gap-4.5">
      <time
        dateTime={dateTime}
        className="text-xs leading-4 font-semibold tracking-[0.14em] text-holo uppercase"
      >
        {formattedDate}
      </time>
      <h1 className="max-w-160 font-serif text-4xl leading-10 tracking-[-0.01em] text-moon-bright @xl/appwindow:text-[44px] @xl/appwindow:leading-12">
        {title}
      </h1>
      {description && (
        <p className="max-w-160 text-base leading-6.5 text-haze">
          {description}
        </p>
      )}
      <div className="h-px w-10 bg-white/18" />
      <div className={proseClassName}>
        <ParsedContent content={content} />
      </div>
    </article>
  )
}

export default BlogArticle
