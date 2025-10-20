import { motion } from "framer-motion";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";

// Sidebar article list item skeleton
const ArticleListItemSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-ctp-surface1 rounded mb-2"></div>
    <div className="h-3 bg-ctp-surface1 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-ctp-surface1 rounded w-1/2"></div>
  </div>
);

interface SideBarProps {
  selectedArticleId: string | null;
  onArticleSelect: (articleId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({
  selectedArticleId,
  onArticleSelect,
  isOpen,
  onClose,
}: SideBarProps) {
  const trpc = useTRPC();

  // Fetch article list
  const {
    data: articleList,
    isLoading: isLoadingList,
    error: listError,
  } = useQuery(trpc.blog.getArticleList.queryOptions());

  return (
    <>
      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      <div
        className={`
          @xl/appwindow:hidden absolute top-2 bg-black/50 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Sidebar - always visible on PC, conditional on mobile */}
      <div
        className={`
          @container bg-ctp-surface0 border-r border-ctp-surface1 flex flex-col
          @xl/appwindow:static @xl/appwindow:w-80 @xl/appwindow:h-auto @xl/appwindow:opacity-100 @xl/appwindow:translate-x-0
          absolute left-0 top-0 w-full h-full z-50 transition-transform duration-300 ease-out
          ${
            isOpen
              ? "translate-x-0"
              : "@xl/appwindow:translate-x-0 -translate-x-full"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-ctp-surface1">
          <h2 className="text-ctp-text text-xl font-semibold">Blog Articles</h2>
          <p className="text-ctp-subtext1 text-sm mt-1">
            {isLoadingList
              ? "Loading..."
              : `${articleList?.length || 0} articles`}
          </p>
        </div>

        {/* Article List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoadingList ? (
            // Loading skeletons for article list
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-ctp-surface1 animate-pulse"
              >
                <ArticleListItemSkeleton />
              </div>
            ))
          ) : listError ? (
            // Error state
            <div className="p-4 rounded-lg bg-ctp-red/10 border border-ctp-red/20">
              <p className="text-ctp-red text-sm">
                Failed to load articles: {listError.message}
              </p>
            </div>
          ) : articleList && articleList.length > 0 ? (
            // Article list
            articleList.map((article) => (
              <button
                key={article.id}
                onClick={() => {
                  onArticleSelect(article.id);
                  if (isOpen) onClose();
                }}
                className={`w-full p-4 rounded-lg text-left cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedArticleId === article.id
                    ? "bg-ctp-blue/20 border border-ctp-blue/30 shadow-lg"
                    : "bg-ctp-surface1 hover:bg-ctp-surface2 border border-transparent"
                }`}
              >
                <h3 className="text-ctp-text font-medium text-sm mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-ctp-subtext1 text-xs mb-2 line-clamp-2">
                  {article.description}
                </p>
                <time className="text-ctp-subtext0 text-xs">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
              </button>
            ))
          ) : (
            // Empty state
            <div className="p-4 rounded-lg bg-ctp-surface1 text-center">
              <p className="text-ctp-subtext1 text-sm">No articles found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
