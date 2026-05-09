import ArticlePublisher from "./article-publisher";
import ControlsBackBar from "./controls-back-bar";

type Props = {
  onBack: () => void;
  articleTextContent: string;
  setArticleTextContent: (v: string) => void;
  titleContent: string;
  setTitleContent: (v: string) => void;
  descriptionContent: string;
  setDescriptionContent: (v: string) => void;
  onPublish: () => void;
  isCreating: boolean;
};

export default function ArticlesEditorView({
  onBack,
  articleTextContent,
  setArticleTextContent,
  titleContent,
  setTitleContent,
  descriptionContent,
  setDescriptionContent,
  onPublish,
  isCreating,
}: Props) {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col">
      <ControlsBackBar onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-auto">
        <ArticlePublisher
          articleTextContent={articleTextContent}
          setArticleTextContent={setArticleTextContent}
          titleContent={titleContent}
          setTitleContent={setTitleContent}
          descriptionContent={descriptionContent}
          setDescriptionContent={setDescriptionContent}
          onPublish={onPublish}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
}
