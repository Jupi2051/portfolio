import { lazy, Suspense, useState } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";

const TextEditor = lazy(() =>
  import("@/components/apps/controls/text-editor").then((module) => {
    return { default: module.default };
  })
);

function ArticleControls() {
  const [articleTextContent, setArticleTextContent] = useState<string>("");
  const [titleContent, setTitleContent] = useState<string>("");
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const trpc = useTRPC();
  const createArticle = useMutation(trpc.blog.createArticle.mutationOptions());

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setTitleContent(event.target.value);
  }

  function onDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setDescriptionContent(event.target.value);
  }

  function onCreateArticle() {
    if (!titleContent || !descriptionContent || !articleTextContent) {
      alert("Please fill in all fields");
      return;
    }

    setIsCreating(true);

    // This would use a protected procedure to create the article
    // You'll need to create this endpoint in your blog router
    createArticle.mutate(
      {
        title: titleContent,
        description: descriptionContent,
        content: articleTextContent,
      },
      {
        onSuccess: () => {
          setTitleContent("");
          setDescriptionContent("");
          setArticleTextContent("");
          alert("Article created successfully!");
        },
        onError: (error) => {
          alert(`Failed to create article: ${error.message}`);
        },
      }
    );
  }

  return (
    <div className="flex">
      <div className="rounded-2xl border-2 border-solid border-gray-700 bg-[linear-gradient(45deg,_#080808,_#080808)] text-white font-sans flex flex-col items-center justify-center gap-4 p-4 w-fit mx-auto max-w-3/4">
        <div className="flex flex-wrap gap-5">
          <div className="flex w-full items-center justify-center gap-2.5 text-xl">
            <label>Title</label>
            <input
              className="w-full px-2 py-1 bg-black border-solid border-2 border-gray-800 rounded-xl text-white text-base"
              value={titleContent}
              placeholder="Changing title with...."
              onChange={onTitleChange}
              disabled={isCreating}
            />
          </div>
          <div className="flex w-full items-center justify-start gap-2.5 text-xl">
            <label>Description</label>
            <input
              className="w-full px-2 py-1 bg-black border-solid border-2 border-gray-800 rounded-xl text-white text-base"
              placeholder="This article talks about...."
              value={descriptionContent}
              onChange={onDescriptionChange}
              disabled={isCreating}
            />
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TextEditor
            value={articleTextContent}
            setValue={setArticleTextContent}
          />
        </Suspense>
        <button
          type="button"
          className="border-2 border-solid border-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out px-4 py-8 text-base font-bold hover:bg-white hover:text-black hover:border-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onCreateArticle}
          disabled={isCreating}
        >
          {isCreating ? "Creating Article..." : "Create Article"}
        </button>
      </div>
    </div>
  );
}

export default ArticleControls;
