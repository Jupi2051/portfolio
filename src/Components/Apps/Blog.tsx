import { AnimatePresence, motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useEffect, useState } from "react";
import "../../Styles/Apps/Blog.css";
import BlogArticleLink from "./AppsItems/BlogArticleLink";
import BlogArticle, { BlogArticleType } from "./AppsItems/BlogArticle";
import { fetchArticle, fetchArticlesLinks } from "../../API/BlogList";
import ArticleReadLoader from "./Loaders/ArticleReadLoader";
import ArticleLinkLoader from "./Loaders/ArticleLinkLoader";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

export type articleLinkItem = {
    id: string,
    title: string,
    dateTime: string,
    description: string
}

function Blog(Props: PropTypes)
{
    const [articlesList, setArticlesList] = useState<articleLinkItem[]>([]);
    const [currentlyReadingId, setCurrentlyReadingId] = useState<string | null>(null);
    const [cachedArticles, setCachedArticles] = useState<BlogArticleType[]>([]);
    const [isLoadingArticle, setIsLoadingArticle] = useState<boolean>(false);    
    const [isLoadingLinks, setIsLoadingLinks] = useState<boolean>(true);
    const [listExpanded, setListExpanded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoadingLinks(true);
        fetchArticlesLinks().then((data) => {
            if (data === null) {
                setCachedArticles([{id: "-1", content: "No article", title: "Error", dateTime: "right now", description: "no article detected"}]);
                setCurrentlyReadingId("-1");
                return;
            } else {
                setArticlesList(data);
            }
        }).finally(() => setIsLoadingLinks(false));
    }, [])

    useEffect(() => {
        setListExpanded(false);
        if (currentlyReadingId)
        {
            const isCached = cachedArticles.find((article) => article.id === currentlyReadingId);
            if (isCached) {
                return;
            }
            setIsLoadingArticle(true);
            fetchArticle(currentlyReadingId).then((data) => {
                if (data !== null) {
                    setCachedArticles([...cachedArticles, data]);   
                }
            }).catch((error) => {
                console.log("Failed to load article");
            }).finally(() => setIsLoadingArticle(false));
        }
    }, [currentlyReadingId])

    function onExpandList()
    {
        setListExpanded(!listExpanded);
    }

    function onArticleClick()
    {
        if (listExpanded) {
            setListExpanded(false);
        }
    }

    const foundArticle = cachedArticles.find((article) => article.id === currentlyReadingId);
    
    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div style={{width: "100%", height: "100%", border: "none"}}>
                    <div style={{width: "100%", height: "100%", background: "black"}}>
                        <div className="blog-browser-layout">
                            <motion.div className={`blogs-articles-list ${listExpanded? "" : "list-hidden"}`}>
                                {
                                    isLoadingLinks === false?
                                        articlesList.length === 0?
                                        <>
                                            <h2>No articles posted yet!</h2>
                                        </>
                                        :
                                        <>
                                            <h1 className="blog-list-title">Articles</h1>
                                            {
                                            articlesList.sort((a, b) => {
                                                const date1 = new Date(a.dateTime);
                                                const date2 = new Date(b.dateTime);
                                                return date2.getTime() - date1.getTime();
                                            })
                                            .map((article) => <BlogArticleLink key={article.id} id={article.id} title={article.title} description={article.description} dateTime={article.dateTime} idAssignFunction={setCurrentlyReadingId}/>)}
                                        </>
                                    :
                                    <>
                                        <ArticleLinkLoader />
                                        <ArticleLinkLoader />
                                        <ArticleLinkLoader />
                                        <ArticleLinkLoader />
                                        <ArticleLinkLoader />
                                    </>
                                }
                            </motion.div>
                            <div className="blogs-article-reader" onClick={onArticleClick}>
                                <button className="blog-expand-button" onClick={onExpandList} aria-label="expand-list">
                                        <div><div></div><div></div><div></div></div>
                                </button>
                                {
                                    isLoadingArticle?
                                        <ArticleReadLoader />
                                    :
                                        foundArticle ?
                                        <BlogArticle id={foundArticle.id} content={foundArticle.content} description={foundArticle.description} title={foundArticle.title} dateTime={foundArticle.dateTime} key={foundArticle.id} /> 
                                        :
                                        <h1>No blog is being read!</h1>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Blog;