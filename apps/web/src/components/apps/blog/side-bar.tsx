import cn from "classnames"
import { useTRPC } from "@/lib/trpc/trpc"
import { useQuery } from "@tanstack/react-query"

const formatListDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

const ArticleListItemSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-2 rounded-xl p-3">
    <div className="h-3.5 w-4/5 rounded bg-white/8" />
    <div className="h-3 w-2/5 rounded bg-white/6" />
  </div>
)

interface SideBarProps {
  selectedArticleId: string | null
  onArticleSelect: (articleId: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function SideBar({
  selectedArticleId,
  onArticleSelect,
  isOpen,
  onClose,
}: SideBarProps) {
  const trpc = useTRPC()

  const {
    data: articleList,
    isLoading: isLoadingList,
    error: listError,
  } = useQuery(trpc.blog.getArticleList.queryOptions())

  return (
    <div
      className={cn(
        "absolute top-0 left-0 z-50 flex h-full w-full flex-col gap-1 border-r border-white/6 bg-panel-sunken px-3 py-5",
        "transition-transform duration-300 ease-drawer",
        "@xl/appwindow:static @xl/appwindow:w-66 @xl/appwindow:shrink-0 @xl/appwindow:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-baseline justify-between px-2.5 pb-2.5">
        <span className="text-xs leading-4 font-semibold tracking-[0.14em] text-haze uppercase">
          Articles
        </span>
        <span className="text-xs leading-4 font-medium text-holo">
          {isLoadingList ? "…" : (articleList?.length ?? 0)}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto [scrollbar-color:rgba(255,255,255,0.14)_transparent] scrollbar-thin">
        {isLoadingList ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ArticleListItemSkeleton key={index} />
          ))
        ) : listError ? (
          <p className="rounded-xl bg-melon/10 p-3 text-[13px] text-[#ffb3c2]">
            Couldn't load articles: {listError.message}
          </p>
        ) : articleList && articleList.length > 0 ? (
          articleList.map((article) => {
            const isSelected = selectedArticleId === article.id

            return (
              <button
                key={article.id}
                type="button"
                aria-current={isSelected ? "page" : undefined}
                onClick={() => {
                  onArticleSelect(article.id)
                  if (isOpen) onClose()
                }}
                className={cn(
                  "flex flex-col gap-1 rounded-xl p-3 text-left outline-none",
                  "transition-colors duration-150 ease-out-strong focus-visible:bg-white/8",
                  isSelected ? "bg-holo/14" : "hover:bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "line-clamp-2 text-sm leading-4.75 font-medium",
                    isSelected ? "text-moon-bright" : "text-lilac",
                  )}
                >
                  {article.title}
                </span>
                <time
                  dateTime={article.createdAt}
                  className={cn(
                    "text-xs leading-4",
                    isSelected ? "text-[#a9a6cc]" : "text-haze-dim",
                  )}
                >
                  {formatListDate(article.createdAt)}
                </time>
              </button>
            )
          })
        ) : (
          <p className="p-3 text-[13px] text-haze">No articles yet.</p>
        )}
      </div>
    </div>
  )
}
