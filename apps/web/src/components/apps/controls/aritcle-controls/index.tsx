import { lazy, Suspense, useState } from "react";
import ControlsHome from "./controls-home";
import ArticlesEditorView from "./articles-editor-view";
import VicoApprovalPanel from "../vico-approval/vico-approval-panel";
import ControlsLoadingScreen from "../controls-loading-screen";
import { useArticlePublishFlow } from "./use-article-publish-flow";
import type { ControlsPanel } from "./controls-panel-types";

const RivalsRandomizerControlsPanel = lazy(
  () => import("../rivals-randomizer-controls/rivals-randomizer-controls-panel"),
);
const ValorantRandomizerControlsPanel = lazy(
  () => import("../valorant-randomizer-controls/valorant-randomizer-controls-panel"),
);

const ArticleControls = () => {
  const [panel, setPanel] = useState<ControlsPanel>("home");
  const publish = useArticlePublishFlow();

  if (panel === "home") {
    return (
      <ControlsHome
        onSelectArticles={() => setPanel("articles")}
        onSelectVico={() => setPanel("vico")}
        onSelectRivalsRandomizer={() => setPanel("rivals-randomizer")}
        onSelectValorantRandomizer={() => setPanel("valorant-randomizer")}
      />
    );
  }

  if (panel === "vico") {
    return <VicoApprovalPanel onBack={() => setPanel("home")} />;
  }

  if (panel === "rivals-randomizer") {
    return (
      <Suspense fallback={<ControlsLoadingScreen />}>
        <RivalsRandomizerControlsPanel onBack={() => setPanel("home")} />
      </Suspense>
    );
  }

  if (panel === "valorant-randomizer") {
    return (
      <Suspense fallback={<ControlsLoadingScreen />}>
        <ValorantRandomizerControlsPanel onBack={() => setPanel("home")} />
      </Suspense>
    );
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
