import TextEditor from "../TextEditor";
import "../../../../Styles/Apps/Controls.css";
import { useState } from "react";
import { createArticle } from "../../../../API/BlogList";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Storage/Store";

function ArticleControls()
{
    const [articleTextContent, setArticleTextContent] = useState<string>("");
    const [titleContent, setTitleContent] = useState<string>("");
    const [descriptionContent, setDescriptionContent] = useState<string>("");
    const ControlsState = useSelector((x: RootState) => x.controlsState);

    function onTitleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        event.preventDefault();
        setTitleContent(event.target.value);
    }

    function onDescriptionChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        event.preventDefault();
        setDescriptionContent(event.target.value);
    }

    async function onCreateArticle()
    {
        const title = titleContent;
        const description = descriptionContent;
        const content = articleTextContent;
        const password = ControlsState.password;
        const response = await createArticle(title, description, content, password);
        // post here
    }

    return <div className="main-article-writing-container"> 
        <div className="article-writing-section">
            <div className="meta-data-container">
                <div className="input-combo-container">
                    <label>Title</label>
                    <input className="article-input-field" value={titleContent} placeholder="Changing title with...." onChange={(onTitleChange)}/>
                </div>
                <div className="input-combo-container">
                    <label>Description</label>
                    <input className="article-input-field" placeholder="This article talks about...." value={descriptionContent} onChange={onDescriptionChange}/>
                </div>
            </div>

            <TextEditor textContent={articleTextContent} updateTextContentFunction={setArticleTextContent}/>
            <button type="button" className="create-article-button" onClick={onCreateArticle}>Create Article</button>
        </div>
    </div>
}

export default ArticleControls;