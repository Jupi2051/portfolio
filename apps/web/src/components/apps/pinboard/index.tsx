import Board from "./board";
import BoardMessage from "./board-message";
import PinForm from "./pin-form";

function Pinboard() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Board>
        <BoardMessage
          name="Welcome to the Pinboard World!"
          content="Scroll around to explore this fixed-size world space."
          top={100}
          left={100}
          color="green"
        />
        <BoardMessage
          name="Another Area"
          content="This content is positioned in a different part of the world space."
          top={500}
          left={2000}
          color="blue"
        />
        <BoardMessage
          name="Distant Area"
          content="This shows how content maintains its position regardless of viewport changes."
          top={1500}
          left={500}
          color="red"
        />
      </Board>
      <PinForm />
    </div>
  );
}

export default Pinboard;
