const API_URL = import.meta.env.VITE_API_URL;

export async function fetchArticlesLinks()
{
    try
    {
        const serverResponse = await fetch(`${API_URL}/data/BlogLinks`);
        const JSONResponse = await serverResponse.json();
        return JSONResponse;
    }
    catch (Error) {
        console.log(Error);
    }
    return false;
}

export async function fetchArticle(articleId: string) {
    try
    {
        const serverResponse = await fetch(`${API_URL}/data/BlogArticle/${articleId}`);
        const messages = await serverResponse.json();
        return messages;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function deleteArticle(articleId: string) {
    try
    {
        const serverResponse = await fetch(`${API_URL}/data/BlogArticle/${articleId}`, {
            method: "DELETE"
        });
        const messages = await serverResponse.json();
        return messages;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function createArticle(articleTitle: string, articleDescription: string, articleContent: string, password: string) {
    try {
        const serverResponse = await fetch(`${API_URL}/data/BlogArticle`, {
            method: "POST",
            headers: {
                Authorization: password,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({title: articleTitle, description: articleDescription, content: articleContent})
        });
        const response = await serverResponse.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}