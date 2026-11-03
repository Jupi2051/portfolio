import { lazy, Suspense, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames"
import BlogArticle from "@/components/apps/blog/blog-article"
import ControlsPanelHeader from "@/components/apps/controls/controls-panel-header"
import { EASE_OUT } from "@/lib/motion"

const TextEditor = lazy(() =>
  import("@/components/apps/controls/text-editor").then((module) => {
    return { default: module.default }
  }),
)

interface ArticlePublisherProps {
  articleTextContent: string
  setArticleTextContent: (articleTextContent: string) => void
  titleContent: string
  setTitleContent: (titleContent: string) => void
  descriptionContent: string
  setDescriptionContent: (descriptionContent: string) => void
  onPublish: () => void
  isCreating: boolean
}

type Mode = "write" | "preview"

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: EASE_OUT } },
}

function ArticlePublisher({
  articleTextContent,
  setArticleTextContent,
  titleContent,
  setTitleContent,
  descriptionContent,
  setDescriptionContent,
  onPublish,
  isCreating,
}: ArticlePublisherProps) {
  const [mode, setMode] = useState<Mode>("write")
  const hasContent = Boolean(
    titleContent || descriptionContent || articleTextContent,
  )

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <ControlsPanelHeader
        title={
          <span className="flex items-center gap-3">
            <span className="font-normal text-haze-dim">Articles</span>
            <span className="font-normal text-haze-dim">/</span>
            <span>{titleContent ? "Draft" : "New article"}</span>
            <span className="flex h-5.5 items-center gap-1.5 rounded-full bg-white/6 px-2 text-xs font-normal text-haze">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  hasContent ? "bg-spark" : "bg-haze-dim",
                )}
              />
              {hasContent ? "Unpublished" : "Empty"}
            </span>
          </span>
        }
        actions={
          <>
            <div className="flex items-center rounded-[10px] border border-white/8 bg-white/5 p-0.75">
              {(["write", "preview"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value)}
                  className={cn(
                    "h-7 cursor-pointer rounded-[7px] px-3 text-[13px] font-medium capitalize transition-colors duration-150 ease-out-strong",
                    mode === value
                      ? "bg-white/10 text-moon-bright"
                      : "text-haze hover:text-moon",
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onPublish}
              disabled={isCreating}
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] bg-holo px-3.5 text-[13px] font-semibold text-ink-deep transition-[background-color,scale] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating ? (
                <span className="size-3.5 animate-spin rounded-full border-2 border-ink-deep border-t-transparent" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              )}
              {isCreating ? "Publishing…" : "Publish"}
            </button>
          </>
        }
      />

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {mode === "write" ? (
            <motion.div key="write" className="absolute inset-0" {...fade}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center gap-2 text-sm text-haze">
                    <span className="size-4 animate-spin rounded-full border-2 border-holo border-t-transparent" />
                    Loading editor…
                  </div>
                }
              >
                <TextEditor
                  value={articleTextContent}
                  setValue={setArticleTextContent}
                  header={
                    <div className="mb-6 flex flex-col gap-3.5">
                      <input
                        type="text"
                        value={titleContent}
                        onChange={(event) => setTitleContent(event.target.value)}
                        disabled={isCreating}
                        placeholder="Untitled article"
                        aria-label="Title"
                        className="w-full bg-transparent font-serif text-[42px] leading-11.5 tracking-[-0.01em] text-moon-bright outline-none placeholder:text-haze-dim/60"
                      />
                      <input
                        type="text"
                        value={descriptionContent}
                        onChange={(event) =>
                          setDescriptionContent(event.target.value)
                        }
                        disabled={isCreating}
                        placeholder="A one-line description for the article list"
                        aria-label="Description"
                        className="w-full bg-transparent text-base leading-6 text-haze outline-none placeholder:text-haze-dim/70"
                      />
                      <div className="mt-1.5 h-px w-10 bg-white/18" />
                    </div>
                  }
                />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              className="absolute inset-0 overflow-y-auto px-6 py-8 [scrollbar-color:rgba(255,255,255,0.14)_transparent] scrollbar-thin @2xl/appwindow:px-10"
              {...fade}
            >
              <BlogArticle
                id="preview"
                dateTime={new Date().toISOString()}
                title={titleContent || "Untitled article"}
                description={descriptionContent}
                content={
                  articleTextContent ||
                  "<p>Nothing written yet — switch back to Write to start.</p>"
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ArticlePublisher
