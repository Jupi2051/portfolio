import useMousePosition from "../Hooks/useMousePosition";
import "../Styles/DesktopIcon.css";

type Point = {
    x: number,
    y: number
}

type PropTypes = {
    ApplicationName?: string,
    Icon?: string,
    id?: number,
    MouseLocation: Point,
    // ParentElement: HTMLDivElement | null
}

function MovingDesktopIcon(Props: PropTypes)
{
    const CursorLocation = useMousePosition();

    return (
        <div className="Desktop-Icon-Container hollow-icon" data-id={Props.id} style={
            {
                transform: `translate(${CursorLocation.x}px, ${CursorLocation.y}px)`,
            }
        }>
            <img src={Props.Icon}/>
            <h1>{Props.ApplicationName}</h1>
        </div>
    )
}

export default MovingDesktopIcon;