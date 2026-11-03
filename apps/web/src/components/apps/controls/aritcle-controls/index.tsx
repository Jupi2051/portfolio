import { lazy, Suspense, useState } from "react"
import AuthenticatedShell from "../authenticated-shell"
import ControlsOverview from "../overview"
import ArticlesEditorView from "./articles-editor-view"
import VicoApprovalPanel from "../vico-approval/vico-approval-panel"
import ControlsLoadingScreen from "../controls-loading-screen"
import { useArticlePublishFlow } from "./use-article-publish-flow"
import type { ControlsPanel } from "./controls-panel-types"

const RivalsRandomizerControlsPanel = lazy(
  () => import("../rivals-randomizer-controls/rivals-randomizer-controls-panel"),
)
const ValorantRandomizerControlsPanel = lazy(
  () =>
    import("../valorant-randomizer-controls/valorant-randomizer-controls-panel"),
)

type Props = {
  onLoggedOut: () => void
}

/**
 * Signed-in Controls: owns which panel is showing and the article draft, so
 * switching panels never throws away unsaved writing.
 */
const ControlsPanels = ({ onLoggedOut }: Props) => {
  const [panel, setPanel] = useState<ControlsPanel>("overview")
  const publish = useArticlePublishFlow()

  const content = (() => {
    switch (panel) {
      case "overview":
        return <ControlsOverview onNavigate={setPanel} />
      case "vico":
        return <VicoApprovalPanel />
      case "rivals-randomizer":
        return (
          <Suspense fallback={<ControlsLoadingScreen />}>
            <RivalsRandomizerControlsPanel />
          </Suspense>
        )
      case "valorant-randomizer":
        return (
          <Suspense fallback={<ControlsLoadingScreen />}>
            <ValorantRandomizerControlsPanel />
          </Suspense>
        )
      case "articles":
        return (
          <ArticlesEditorView
            articleTextContent={publish.articleTextContent}
            setArticleTextContent={publish.setArticleTextContent}
            titleContent={publish.titleContent}
            setTitleContent={publish.setTitleContent}
            descriptionContent={publish.descriptionContent}
            setDescriptionContent={publish.setDescriptionContent}
            onPublish={publish.onPublish}
            isCreating={publish.isCreating}
          />
        )
    }
  })()

  return (
    <AuthenticatedShell
      panel={panel}
      onNavigate={setPanel}
      onLoggedOut={onLoggedOut}
    >
      {content}
    </AuthenticatedShell>
  )
}

export default ControlsPanels
