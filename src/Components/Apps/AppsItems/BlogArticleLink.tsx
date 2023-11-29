import { articleLinkItem } from "../Blog";


function BlogArticleLink(props: articleLinkItem & {idAssignFunction: (id: string | null) => void})
{
    function onOpenArticle()
    {
        props.idAssignFunction(props.id);
    }

    return <div className="article-link-container" onClick={onOpenArticle}>
        <h1 className="article-link-title">{props.title}</h1>
        <time dateTime="">{props.dateTime}</time>
        <p>{props.description}</p>
    </div>
}

export default BlogArticleLink;