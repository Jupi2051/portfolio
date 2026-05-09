import { useState } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import SuccessNotification from "../notification";
import { useApplicationData } from "@/context/app-context";
import useSystemNotification from "../../notification/use-system-notification";

export function useArticlePublishFlow() {
  const [articleTextContent, setArticleTextContent] = useState("");
  const [titleContent, setTitleContent] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");
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
      },
    );
  };

  return {
    articleTextContent,
    setArticleTextContent,
    titleContent,
    setTitleContent,
    descriptionContent,
    setDescriptionContent,
    onPublish,
    isCreating: createArticle.isPending,
  };
}
