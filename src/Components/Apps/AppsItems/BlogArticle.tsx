import parse from "html-react-parser";

export type BlogArticleType = {
    id: string,
    dateTime: string
    title: string,
    description: string,
    content: string,
}

function BlogArticle(props: BlogArticleType)
{
    return <div>
        <h1>{props.title}</h1>
        <time dateTime={""}>{props.dateTime}</time>
        <div>
            {parse(props.content)}
        </div>
    </div>;
}

export default BlogArticle;