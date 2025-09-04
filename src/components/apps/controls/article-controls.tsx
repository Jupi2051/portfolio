import TextEditor from "@/components/apps/controls/text-editor";
import { useState } from "react";
import { createArticle } from "@/api/BlogList";
import { useSelector } from "react-redux";

function ArticleControls({ password }: { password: string }) {
  const [articleTextContent, setArticleTextContent] = useState<string>("");
  const [titleContent, setTitleContent] = useState<string>("");
  const [descriptionContent, setDescriptionContent] = useState<string>("");

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setTitleContent(event.target.value);
  }

  function onDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setDescriptionContent(event.target.value);
  }

  async function onCreateArticle() {
    const title = titleContent;
    const description = descriptionContent;
    const content = articleTextContent;
    const response = await createArticle(title, description, content, password);
    // post here
  }

  return (
    <div className="flex">
      <div className="rounded-2xl border-2 border-solid border-gray-700 bg-[linear-gradient(45deg,_#080808,_#080808)] text-white font-sans flex flex-col items-center justify-center gap-4 p-4 w-fit mx-auto max-w-3/4">
        <div className="flex flex-wrap gap-5">
          <div className="flex w-full items-center justify-center gap-2.5 text-xl">
            <label>Title</label>
            <input
              className="w-full px-2 py-1 bg-black border-solid border-2 border-gray-800 rounded-xl text-white text-base"
              value={titleContent}
              placeholder="Changing title with...."
              onChange={onTitleChange}
            />
          </div>
          <div className="flex w-full items-center justify-start gap-2.5 text-xl">
            <label>Description</label>
            <input
              className="w-full px-2 py-1 bg-black border-solid border-2 border-gray-800 rounded-xl text-white text-base"
              placeholder="This article talks about...."
              value={descriptionContent}
              onChange={onDescriptionChange}
            />
          </div>
        </div>

        <TextEditor
          textContent={articleTextContent}
          updateTextContentFunction={setArticleTextContent}
        />
        <button
          type="button"
          className="border-2 border-solid border-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out px-4 py-8 text-base font-bold hover:bg-white hover:text-black hover:border-white"
          onClick={onCreateArticle}
        >
          Create Article
        </button>
      </div>
    </div>
  );
}

export default ArticleControls;
