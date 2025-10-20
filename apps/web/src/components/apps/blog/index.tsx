import BlogArticle from "./blog-article";
import SideBar from "./side-bar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import { useApplicationData } from "@/context/app-context";
import useAppWindowControls from "@/hooks/use-app-window-data";

// Loading skeleton component
const ArticleSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    <div className="flex flex-col w-full border-b-[1.6px] border-solid border-ctp-surface1">
      <div className="h-8 bg-ctp-surface1 rounded-lg mb-4 w-4/5"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-ctp-surface1 rounded w-4/5"></div>
        <div className="h-4 bg-ctp-surface1 rounded w-20"></div>
      </div>
    </div>
    <div className="mt-6 space-y-4">
      <div className="h-4 bg-ctp-surface1 rounded w-full"></div>
      <div className="h-4 bg-ctp-surface1 rounded w-5/6"></div>
      <div className="h-4 bg-ctp-surface1 rounded w-4/6"></div>
      <div className="h-4 bg-ctp-surface1 rounded w-full"></div>
      <div className="h-4 bg-ctp-surface1 rounded w-3/4"></div>
    </div>
  </div>
);

const Blog = () => {
  const trpc = useTRPC();
  const { processData, AppId } = useApplicationData<{ id: string }>();
  const { updateURLParams } = useAppWindowControls(AppId);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    processData?.id ?? null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch article list for initial selection
  const { data: articleList } = useQuery(
    trpc.blog.getArticleList.queryOptions()
  );

  // Fetch selected article
  const {
    data: selectedArticle,
    isLoading: isLoadingArticle,
    error: articleError,
  } = useQuery(
    trpc.blog.getArticle.queryOptions(
      selectedArticleId ? { id: selectedArticleId } : { id: "" }
    )
  );

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
    updateURLParams({ id: articleId }, true);
  };

  return (
    <div className="w-full h-full bg-ctp-base flex relative">
      {/* Toggle Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "@xl/appwindow:hidden absolute top-7 right-4 z-[60] p-2 bg-ctp-base cursor-pointer border border-ctp-surface1 rounded-lg shadow-lg hover:bg-ctp-surface1 transition-colors",
          {
            "bg-ctp-base": isSidebarOpen,
            "bg-ctp-surface2": !isSidebarOpen,
          }
        )}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <SideBar
        selectedArticleId={selectedArticleId}
        onArticleSelect={handleArticleSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {selectedArticleId ? (
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {isLoadingArticle ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArticleSkeleton />
                </motion.div>
              ) : articleError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-lg bg-ctp-red/10 border border-ctp-red/20"
                >
                  <p className="text-ctp-red">
                    Failed to load article: {articleError.message}
                  </p>
                </motion.div>
              ) : selectedArticle ? (
                <motion.div
                  key="article"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full"
                >
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
          // No article selected state
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-ctp-text text-xl font-semibold mb-2">
                Select an Article
              </h3>
              <p className="text-ctp-subtext1">
                Choose an article from the sidebar to start reading
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
