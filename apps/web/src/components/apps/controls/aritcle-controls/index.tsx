import { useState } from "react";
import ControlsHome from "./controls-home";
import ArticlesEditorView from "./articles-editor-view";
import VicoApprovalPanel from "../vico-approval/vico-approval-panel";
import { useArticlePublishFlow } from "./use-article-publish-flow";
import type { ControlsPanel } from "./controls-panel-types";

const ArticleControls = () => {
  const [panel, setPanel] = useState<ControlsPanel>("home");
  const publish = useArticlePublishFlow();

  if (panel === "home") {
    return (
      <ControlsHome
        onSelectArticles={() => setPanel("articles")}
        onSelectVico={() => setPanel("vico")}
      />
    );
  }

  if (panel === "vico") {
    return <VicoApprovalPanel onBack={() => setPanel("home")} />;
  }

  return (
    <ArticlesEditorView
      onBack={() => setPanel("home")}
      articleTextContent={publish.articleTextContent}
      setArticleTextContent={publish.setArticleTextContent}
      titleContent={publish.titleContent}
      setTitleContent={publish.setTitleContent}
      descriptionContent={publish.descriptionContent}
      setDescriptionContent={publish.setDescriptionContent}
      onPublish={publish.onPublish}
      isCreating={publish.isCreating}
    />
  );
};

export default ArticleControls;
