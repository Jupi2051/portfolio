const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessage(name: string, content: string)
{
    try
    {
        const serverResponse = await fetch(`${API_URL}/data/messages`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: name, content: content})
        });
        const JSONResponse = await serverResponse.json();
        return JSONResponse;
    }
    catch (Error) {
        console.log(Error);
    }
    return false;
}

export async function getMessages() {
    try
    {
        const serverResponse = await fetch(`${API_URL}/data/messages`);
        const messages = await serverResponse.json();
        return messages;
    } catch (error) {
        console.log(error)
    }
    return null;
}