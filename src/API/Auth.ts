const API_URL = import.meta.env.VITE_API_URL;

export async function attemptControlLogin(password: string)
{
    try
    {
        const response = await fetch(`${API_URL}/auth`, {method: "POST", headers: {'Content-Type': "application/json"}, body: JSON.stringify({password: password})});
        return response.status === 200;
    } catch (error) {
        return false;
    }
}