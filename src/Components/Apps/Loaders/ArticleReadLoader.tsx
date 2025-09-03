import LoadingItemContainer from "@/Components/LoadingItemContainer";

function ArticleReadLoader()
{
    return <div style={{padding: "1rem", overflow: "hidden", maxWidth: "100%"}}>
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <LoadingItemContainer width="550px" height="40px"/>
            <LoadingItemContainer width="120px" height="25px"/>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: "1rem", marginBlock: "2rem"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="40px" height="20px"/>
                <LoadingItemContainer width="240px" height="20px"/>
                <LoadingItemContainer width="200px" height="20px"/>
                <LoadingItemContainer width="30px" height="20px"/>
                <LoadingItemContainer width="80px" height="20px"/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="320px" height="20px"/>
                <LoadingItemContainer width="40px" height="20px"/>
                <LoadingItemContainer width="104px" height="20px"/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="120px" height="20px"/>
                <LoadingItemContainer width="30px" height="20px"/>
                <LoadingItemContainer width="102px" height="20px"/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="40px" height="20px"/>
                <LoadingItemContainer width="240px" height="20px"/>
                <LoadingItemContainer width="200px" height="20px"/>
                <LoadingItemContainer width="30px" height="20px"/>
                <LoadingItemContainer width="80px" height="20px"/>
            </div>
            <br />
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="230px" height="20px"/>
                <LoadingItemContainer width="130px" height="20px"/>
                <LoadingItemContainer width="60px" height="20px"/>
                <LoadingItemContainer width="20px" height="20px"/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="120px" height="20px"/>
                <LoadingItemContainer width="30px" height="20px"/>
                <LoadingItemContainer width="102px" height="20px"/>
            </div>
            <br />
            <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                <LoadingItemContainer width="40px" height="20px"/>
                <LoadingItemContainer width="240px" height="20px"/>
                <LoadingItemContainer width="200px" height="20px"/>
                <LoadingItemContainer width="30px" height="20px"/>
                <LoadingItemContainer width="80px" height="20px"/>
            </div>
        </div>
    </div>
}

export default ArticleReadLoader;