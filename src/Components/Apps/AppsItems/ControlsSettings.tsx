import TextEditor from "./TextEditor";
import "../../../Styles/Apps/Controls.css";
import { useState } from "react";
import ArticleControls from "./Controls/ArticleControls";

function ControlsSettings()
{
    return <div className="controls-main-container">
        <ArticleControls />
    </div>
}

export default ControlsSettings;