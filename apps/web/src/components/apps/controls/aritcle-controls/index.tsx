import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ArticlePublisher from "./article-publisher";
import SuccessNotification from "../notification";
import { useApplicationData } from "@/context/app-context";
import useSystemNotification from "../../notification/use-system-notification";

const ArticleControls = () => {
  const [articleTextContent, setArticleTextContent] = useState<string>("");
  const [titleContent, setTitleContent] = useState<string>("");
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const trpc = useTRPC();
  const createArticle = useMutation(trpc.blog.createArticle.mutationOptions());
  const data = useApplicationData();
  const { summonNotificationWindow } = useSystemNotification({
    content: <SuccessNotification />,
    parentProcess: data.AppId,
    windowSize: {
      width: 450,
      height: 200,
    },
  });

  const onPublish = () => {
    if (!titleContent || !descriptionContent || !articleTextContent) {
      summonNotificationWindow({
        title: "Oops! Looks like you forgot to fill something in!",
      });
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
          summonNotificationWindow({
            title: "Yay! Your article is ready to shine! ✨",
          });
        },
        onError: (error) => {
          summonNotificationWindow({
            title: `Oh no! Something went wrong: ${error.message}`,
          });
        },
        onSettled: () => {},
      }
    );
  };

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
