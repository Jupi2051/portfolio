import parse from "html-react-parser";
import "../../../Styles/Components/BlogArticle.css";
import "../../../../node_modules/highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export type BlogArticleType = {
    id: string,
    dateTime: string
    title: string,
    description: string,
    content: string,
}

function replaceHtmlEntities(text: string): string {
    const entityMap: { [key: string]: string } = {
      '&nbsp;': ' ', // Tab character
      '&lt;': '<',     // Less than
      '&gt;': '>',     // Greater than
      '&quot;': '"',   // Double quote
      '&apos;': "'",   // Single quote
      // Add more HTML entities as needed
    };
  
    return Object.keys(entityMap).reduce((acc, entity) => {
      const regex = new RegExp(entity, 'g');
      return acc.replace(regex, entityMap[entity]);
    }, text);
  }

function BlogArticle(props: BlogArticleType)
{
    let htmlString = props.content;
    const preElements = htmlString.match(/(<pre class="ql-syntax" spellcheck="false">[\s\S]*?<\/pre>)/gs);
    
    const codeSnippets: string[] = [];
    if (preElements) {
      for (const preContent of preElements) {
        const codeSnippet = preContent.replace(/<.*?>/g, ''); // Remove HTML tags
        // const formattedSnippet = codeSnippet.replace(/&nbsp;/g, '\t'); // Replace &nbsp; with tab character
        const formattedSnippet = replaceHtmlEntities(codeSnippet);
        codeSnippets.push(`${formattedSnippet}`);
      }
    }
  

    const highlightedSnippets: string[] = [];
    for (const snippet of codeSnippets) {
      const highlighted = hljs.highlightAuto(snippet).value; // Adjust the language as needed
      highlightedSnippets.push(highlighted);
    }  
    
    if (preElements) {
        for (let i = 0; i < preElements.length; i++) {
          htmlString = htmlString.replace(preElements[i], `<pre><code>${highlightedSnippets[i]}</code></pre>`);
        }
      }

    const parsedContent = parse(htmlString);
    

    return <div>
        <h1>{props.title}</h1>
        <time dateTime={props.dateTime}>{props.dateTime}</time>
        <div className="blog-reader-content">
            {parsedContent}
        </div>
    </div>;
}

export default BlogArticle;