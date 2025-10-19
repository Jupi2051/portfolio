import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ArticlePublisher from "./article-publisher";

const ArticleControls = () => {
  const [articleTextContent, setArticleTextContent] = useState<string>("");
  const [titleContent, setTitleContent] = useState<string>("");
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const trpc = useTRPC();
  const createArticle = useMutation(trpc.blog.createArticle.mutationOptions());

  function onPublish() {
    if (!titleContent || !descriptionContent || !articleTextContent) {
      alert("Oops! Looks like you forgot to fill something in! 🥺");
      return;
    }

    createArticle.mutate(
      {
        title: titleContent,
        description: descriptionContent,
        content: articleTextContent,
        published: true,
        authorName: "Jupi",
      },
      {
        onSuccess: () => {
          setTitleContent("");
          setDescriptionContent("");
          setArticleTextContent("");
          alert("Yay! Your article is ready to shine! ✨");
        },
        onError: (error) => {
          alert(`Oh no! Something went wrong: ${error.message} 😅`);
        },
        onSettled: () => {},
      }
    );
  }

  return (
    <ArticlePublisher
      articleTextContent={articleTextContent}
      setArticleTextContent={setArticleTextContent}
      titleContent={titleContent}
      setTitleContent={setTitleContent}
      descriptionContent={descriptionContent}
      setDescriptionContent={setDescriptionContent}
      onPublish={onPublish}
      isCreating={createArticle.isPending}
    />
  );
};

export default ArticleControls;
