import { lazy, Suspense } from "react";
import { motion, Variants } from "framer-motion";
import BlogArticle from "@/components/apps/blog/blog-article";
import useMediaQuery from "@/hooks/use-media-query";

const TextEditor = lazy(() =>
  import("@/components/apps/controls/text-editor").then((module) => {
    return { default: module.default };
  })
);

interface ArticlePublisherProps {
  articleTextContent: string;
  setArticleTextContent: (articleTextContent: string) => void;
  titleContent: string;
  setTitleContent: (titleContent: string) => void;
  descriptionContent: string;
  setDescriptionContent: (descriptionContent: string) => void;
  onPublish: () => void;
  isCreating: boolean;
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
  const isDesktop = useMediaQuery("sm", true);

  function onCreateArticle(event: React.FormEvent) {
    event.preventDefault(); // Prevent form submission
    event.stopPropagation();
    onPublish();
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.1 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  // Live Preview Component using BlogArticle
  const LivePreview = () => {
    const previewData = {
      id: "preview",
      dateTime: new Date().toISOString(),
      title: titleContent || "Your Amazing Title Will Appear Here! ✨",
      description:
        descriptionContent || "Your description will show up here...",
      content:
        articleTextContent ||
        "<p>Start writing to see your content appear here! 🎉</p>",
    };

    return (
      <motion.div className="bg-ctp-surface0/50 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-ctp-surface1/20 h-full overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-ctp-blue to-ctp-sapphire rounded-full flex items-center justify-center">
            <span className="text-sm">👁️</span>
          </div>
          <h3 className="text-lg font-bold text-ctp-text font-capirola">
            Live Preview
          </h3>
        </div>

        <div className="h-full overflow-auto">
          <BlogArticle {...previewData} />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-ctp-base to-ctp-mantle p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Smaller Header */}
        <motion.div className="text-center mb-2" variants={itemVariants}>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-ctp-pink to-ctp-mauve rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg">
              <span className="text-xs">📝</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-lg font-bold text-ctp-text font-capirola"
            variants={itemVariants}
          >
            Create Your Masterpiece! ✨
          </motion.h1>

          <motion.p
            className="text-ctp-subtext1 text-xs font-lato"
            variants={itemVariants}
          >
            Let's craft something amazing together!
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div
          className={`flex gap-6 h-full ${isDesktop ? "flex-row" : "flex-col"}`}
        >
          {/* Editor Section */}
          <motion.div
            className={`bg-ctp-surface0/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-ctp-surface1/20 ${
              isDesktop ? "flex-1" : "w-full"
            }`}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-ctp-green to-ctp-teal rounded-full flex items-center justify-center">
                <span className="text-sm">✏️</span>
              </div>
              <h3 className="text-lg font-bold text-ctp-text font-capirola">
                Editor
              </h3>
            </div>

            <form onSubmit={onCreateArticle} className="space-y-4">
              {/* Title Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-ctp-text font-semibold mb-2 font-lato">
                  Title 🎯
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-ctp-base/50 border border-ctp-surface1/30 rounded-xl text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 focus:ring-ctp-blue/50 focus:border-ctp-blue font-lato"
                  value={titleContent}
                  placeholder="What's your amazing story about? 🌟"
                  onChange={(event) => setTitleContent(event.target.value)}
                  disabled={isCreating}
                />
              </motion.div>

              {/* Description Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-ctp-text font-semibold mb-2 font-lato">
                  Description 📝
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-ctp-base/50 border border-ctp-surface1/30 rounded-xl text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 focus:ring-ctp-blue/50 focus:border-ctp-blue font-lato"
                  placeholder="Give us a sneak peek! 👀"
                  value={descriptionContent}
                  onChange={(event) =>
                    setDescriptionContent(event.target.value)
                  }
                  disabled={isCreating}
                />
              </motion.div>

              {/* Text Editor */}
              <motion.div variants={itemVariants}>
                <label className="block text-ctp-text font-semibold mb-2 font-lato">
                  Content ✨
                </label>
                <Suspense
                  fallback={
                    <div className="w-full h-48 bg-ctp-surface1/20 rounded-xl flex items-center justify-center">
                      <div className="flex items-center gap-2 text-ctp-subtext1">
                        <div className="w-5 h-5 border-2 border-ctp-blue border-t-transparent rounded-full animate-spin"></div>
                        Loading editor...
                      </div>
                    </div>
                  }
                >
                  <TextEditor
                    value={articleTextContent}
                    setValue={setArticleTextContent}
                  />
                </Suspense>
              </motion.div>

              {/* Create Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-ctp-pink to-ctp-mauve text-ctp-base font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-lato"
                  disabled={isCreating}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="flex items-center justify-center gap-2 uppercase">
                    {isCreating ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-ctp-base border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Creating Magic... ✨
                      </>
                    ) : (
                      "Publish"
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Live Preview Section - Only on Desktop */}
          {isDesktop && (
            <div className="flex-1">
              <LivePreview />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ArticlePublisher;
