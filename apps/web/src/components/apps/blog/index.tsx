import BlogArticle from "./blog-article";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@catppuccin/highlightjs/css/catppuccin-frappe.css";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";

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

// Sidebar article list item skeleton
const ArticleListItemSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-ctp-surface1 rounded mb-2"></div>
    <div className="h-3 bg-ctp-surface1 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-ctp-surface1 rounded w-1/2"></div>
  </div>
);

const Blog = () => {
  const trpc = useTRPC();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );

  // Fetch article list
  const {
    data: articleList,
    isLoading: isLoadingList,
    error: listError,
  } = useQuery(trpc.blog.getArticleList.queryOptions());

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
  useState(() => {
    if (articleList && articleList.length > 0 && !selectedArticleId) {
      setSelectedArticleId(articleList[0].id);
    }
  });

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  return (
    <div className="w-full h-full bg-ctp-base flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="@container w-80 bg-ctp-surface0 border-r border-ctp-surface1 flex flex-col"
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-ctp-surface1"
              >
                <ArticleListItemSkeleton />
              </motion.div>
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
            articleList.map((article, index) => (
              <motion.button
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleArticleSelect(article.id)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedArticleId === article.id
                    ? "bg-ctp-blue/20 border border-ctp-blue/30 shadow-lg"
                    : "bg-ctp-surface1 hover:bg-ctp-surface2 border border-transparent"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.button>
            ))
          ) : (
            // Empty state
            <div className="p-4 rounded-lg bg-ctp-surface1 text-center">
              <p className="text-ctp-subtext1 text-sm">No articles found</p>
            </div>
          )}
        </div>
      </motion.div>

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
