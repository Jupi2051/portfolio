import BlogArticle from "./blog-article"
import SideBar from "./side-bar"
import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import "@catppuccin/highlightjs/css/catppuccin-frappe.css"
import { useTRPC } from "@/lib/trpc/trpc"
import { useQuery } from "@tanstack/react-query"
import cn from "classnames"
import { useApplicationData } from "@/context/app-context"
import useAppWindowControls from "@/hooks/use-app-window-data"
import { MenuIcon } from "@/components/ui/icons"
import { EASE_OUT } from "@/lib/motion"

const ArticleSkeleton = () => (
  <div className="flex max-w-160 animate-pulse flex-col gap-4.5">
    <div className="h-3 w-40 rounded bg-holo/20" />
    <div className="h-10 w-4/5 rounded-lg bg-white/8" />
    <div className="h-px w-10 bg-white/18" />
    <div className="flex flex-col gap-3">
      <div className="h-3.5 w-full rounded bg-white/6" />
      <div className="h-3.5 w-11/12 rounded bg-white/6" />
      <div className="h-3.5 w-4/6 rounded bg-white/6" />
      <div className="h-3.5 w-full rounded bg-white/6" />
    </div>
  </div>
)

const Blog = () => {
  const trpc = useTRPC()
  const reduceMotion = useReducedMotion()
  const { processData, AppId } = useApplicationData<{ id: string }>()
  const { updateURLParams } = useAppWindowControls(AppId)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    processData?.id ?? null,
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    processData?.id ? false : true,
  )

  const {
    data: selectedArticle,
    isLoading: isLoadingArticle,
    error: articleError,
  } = useQuery(
    trpc.blog.getArticle.queryOptions(
      selectedArticleId ? { id: selectedArticleId } : { id: "" },
    ),
  )

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId)
    updateURLParams({ id: articleId }, true)
  }

  const fade = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } },
    exit: { opacity: 0, transition: { duration: 0.15, ease: EASE_OUT } },
  }

  return (
    <div className="relative flex h-full w-full bg-panel">
      {/* Sidebar toggle — only when the window is too narrow for both panes */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "absolute top-4 right-4 z-60 flex size-9 items-center justify-center rounded-xl border border-white/10 text-lilac outline-none @xl/appwindow:hidden",
          "transition-colors duration-150 ease-out-strong hover:bg-white/8 focus-visible:bg-white/10",
          isSidebarOpen ? "bg-white/8" : "bg-panel/90 backdrop-blur-md",
        )}
        aria-label="Toggle article list"
        aria-expanded={isSidebarOpen}
      >
        <MenuIcon className="size-5" />
      </button>

      <SideBar
        selectedArticleId={selectedArticleId}
        onArticleSelect={handleArticleSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {selectedArticleId ? (
          <div className="flex-1 overflow-y-auto px-6 py-8 [scrollbar-color:rgba(255,255,255,0.14)_transparent] scrollbar-thin @xl/appwindow:px-14 @xl/appwindow:py-10">
            <AnimatePresence mode="wait" initial={false}>
              {isLoadingArticle ? (
                <motion.div key="loading" {...fade}>
                  <ArticleSkeleton />
                </motion.div>
              ) : articleError ? (
                <motion.p
                  key="error"
                  {...fade}
                  className="max-w-160 rounded-xl bg-melon/10 p-4 text-sm text-[#ffb3c2]"
                >
                  Couldn't load this article: {articleError.message}
                </motion.p>
              ) : selectedArticle ? (
                <motion.div key={selectedArticle.id} {...fade}>
                  <BlogArticle
                    content={selectedArticle.content ?? ""}
                    id={selectedArticle.id}
                    title={selectedArticle.title}
                    description={selectedArticle.description}
                    dateTime={selectedArticle.createdAt}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8">
            <motion.div {...fade} className="flex flex-col items-center gap-2 text-center">
              <h3 className="font-serif text-4xl leading-10 text-moon-bright italic">
                Pick something to read.
              </h3>
              <p className="text-sm text-haze">
                Choose an article from the list to start reading.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
