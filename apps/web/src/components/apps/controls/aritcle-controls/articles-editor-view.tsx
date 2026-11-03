import ArticlePublisher from "./article-publisher"

type Props = {
  articleTextContent: string
  setArticleTextContent: (v: string) => void
  titleContent: string
  setTitleContent: (v: string) => void
  descriptionContent: string
  setDescriptionContent: (v: string) => void
  onPublish: () => void
  isCreating: boolean
}

export default function ArticlesEditorView(props: Props) {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col">
      <ArticlePublisher {...props} />
    </div>
  )
}
