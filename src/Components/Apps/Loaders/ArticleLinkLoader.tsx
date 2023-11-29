import LoadingItemContainer from "../../LoadingItemContainer";

function ArticleLinkLoader()
{
    return <div style={{marginTop: "10px", marginLeft: "10px", overflow: "hidden", maxWidth: "100%"}}>
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <LoadingItemContainer width="80%" height="25px"/>
            <div style={{display: "flex"}}>
                <LoadingItemContainer width="30%" height="20px"/>
                /            
                <LoadingItemContainer width="20%" height="20px"/>
                /
                <LoadingItemContainer width="20%" height="20px"/>
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: "0.2rem", marginBlock: "0.8rem"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="90px" height="20px"/>
                <LoadingItemContainer width="30px" height="20px"/>
                <LoadingItemContainer width="40px" height="20px"/>
                <LoadingItemContainer width="60px" height="20px"/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="30%" height="20px"/>
                <LoadingItemContainer width="60%" height="20px"/>
            </div>
        </div>
    </div>
}

export default ArticleLinkLoader;