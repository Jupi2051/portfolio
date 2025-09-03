import { articleLinkItem } from "@/Components/Apps/Blog";


function BlogArticleLink(props: articleLinkItem & {idAssignFunction: (id: string | null) => void})
{
    function onOpenArticle()
    {
        props.idAssignFunction(props.id);
    }

    const dateTime = new Date(props.dateTime);

    const formattedDate = dateTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });

    return <div className="article-link-container" onClick={onOpenArticle}>
        <h1 className="article-link-title">{props.title}</h1>
        <time dateTime="">{formattedDate}</time>
        <p>{props.description}</p>
    </div>
}

export default BlogArticleLink;