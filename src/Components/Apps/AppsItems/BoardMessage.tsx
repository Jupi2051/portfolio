interface Props {
    name: string,
    content: string

}

function BoardMessage(props: Props)
{
    return <div className="board-message-container">
        <h1 className="board-message-name">{props.name} :</h1>
        <p className="board-message-content">{props.content}</p>
    </div>
}

export default BoardMessage;