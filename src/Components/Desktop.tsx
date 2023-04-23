import { SyntheticEvent, createContext, useEffect, useRef, useState } from "react";
import "../Styles/Desktop.css"
import DesktopIcon from "./DesktopIcon";
import DesktopTimeWidget from "./Widgets/DesktopTimeWidget";
import useResizeObserver from "use-resize-observer";
import MovingDesktopIcon from "./MovingDesktopIcon";

type Point = {
    x: number,
    y: number
}

type ContextData = {
    x: number,
    y: number,
    width: number,
    height: number
};

const DefaultDesktopSize = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

export const DesktopContext = createContext<ContextData>(DefaultDesktopSize);

type DesktopIconData = {
    id: number
    Name: string,
    IconPath: string,
    Style: {
        gridRow?: number,
        gridColumn?: number
    }
}

let DesktopIcons: DesktopIconData[] = [
    {id: 0, Name: "This PC", IconPath: "Imgs/DesktopApps/ThisPC.webp", Style: {}},
    {id: 1, Name: "Recycle Bin", IconPath: "Imgs/DesktopApps/RecycleBin.webp", Style: {}},
    {id: 2, Name: "This PC", IconPath: "Imgs/DesktopApps/ThisPC.webp", Style: {}},
    {id: 3, Name: "Recycle Bin", IconPath: "Imgs/DesktopApps/RecycleBin.webp", Style: {}},
    {id: 4, Name: "This PC", IconPath: "Imgs/DesktopApps/ThisPC.webp", Style: {}},
];

let Timer: number;
const MaxDistanceBeforeMovementTrigger = 10;
let LocalMousePosition: {x: number, y: number} = {x: 0, y: 0}

function Desktop()
{
    const [isHoldClicked, SetHoldClick] = useState(false);
    const [HoldClickInitPosition, SetHoldClickInitPosition] = useState({x: 0, y: 0});
    const {ref, width = 1, height = 1} = useResizeObserver<HTMLDivElement>({box: "border-box"});
    const [HeldIconID, SetHeldIconId] = useState(-1); // -1 means no element is held atm.
    const [isMovingHeldIcon, SetMoveHeldIcon] = useState(false);
    
    let DesktopSizingValue = {
        width,
        height,
        x: DefaultDesktopSize.x,
        y: DefaultDesktopSize.y
    };
    
    useEffect(() => {
        if (isHoldClicked)
            Timer = setInterval(onHoldClick, 10);
        else
            onMouseUp();

    }, [isHoldClicked])

    function OnClickDesktop(event: React.MouseEvent<HTMLInputElement>)
    {
        const DesktopIconElement = event.target as Element;
        if (DesktopIconElement.classList.contains("Desktop-Icon-Container"))
        {
            const ElementId = DesktopIconElement.getAttribute("data-id");
            
        }
    }

    function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        const rect = event.currentTarget.getBoundingClientRect();
        const newX = event.clientX - rect.left;
        const newY = event.clientY - rect.top;
        const initX = HoldClickInitPosition.x;
        const initY = HoldClickInitPosition.y;
        LocalMousePosition = {x: newX, y: newY};
        if (HeldIconID != -1) {
            const DistanceMoved = Math.sqrt(Math.pow(newX - initX,2) + Math.pow(newY - initY,2));
            if (DistanceMoved >= MaxDistanceBeforeMovementTrigger)
                SetMoveHeldIcon(true);
        }
    }

    function moveHeldElement()
    {
        if (isMovingHeldIcon) {
            const GridLocation = GetGridLocationFromMousePosition();
            UpdateElementGridLocation(HeldIconID, GridLocation);
        }
    }

    function UpdateElementGridLocation(ElementId: number, NewLocation: Point)
    {
        DesktopIcons = DesktopIcons.map((element) => {
            if (element.id === ElementId)
                return {...element, Style: {gridColumn: NewLocation.y, gridRow: NewLocation.x}};
            else
                return {...element};
        })
    }

    function GetGridLocationFromMousePosition() : Point
    {
        const itemMinHeight = 100;
        const itemMinWidth = 100;

        let CalculatedColumn = Math.round(LocalMousePosition.x / itemMinWidth);
        let CalculatedRow = Math.round(LocalMousePosition.y / itemMinHeight);

        const gridCountHorizontal = Math.round(width / itemMinWidth);
        const gridCountVertical = Math.round(height / itemMinHeight);
        
        CalculatedColumn = CalculatedColumn >= gridCountHorizontal? gridCountHorizontal - 1 : CalculatedColumn;
        CalculatedRow = CalculatedRow >= gridCountVertical? gridCountVertical - 1 : CalculatedRow;
        
        return {
            x: CalculatedRow <= 0? 1 : CalculatedRow,
            y: CalculatedColumn <= 0? 1 : CalculatedColumn,
        };
    }

    function onDesktopResize(event: SyntheticEvent<HTMLDivElement, Event>)
    {
        console.log("resize");
    }

    function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
    {
        SetHoldClickInitPosition({x: event.clientX, y: event.clientY});
        SetHoldClick(true);
        const DesktopIconElement = event.target as Element;
        if (DesktopIconElement.classList.contains("Desktop-Icon-Container"))
        {
            const ElementId = DesktopIconElement.getAttribute("data-id") === undefined?
            -1 : Number(DesktopIconElement.getAttribute("data-id"));
            SetHeldIconId(ElementId);
        }
    }
    
    function onMouseUp()
    {
        SetHoldClick(false);
        clearInterval(Timer);
        moveHeldElement();
        SetMoveHeldIcon(false);
        SetHeldIconId(-1);
    }

    function onHoldClick()
    {
        // if (HeldIconID >= 0)
            // console.log(HeldIconID);
    }

    const MovingAppObject = DesktopIcons.find((e) => e.id === HeldIconID);

    return (
        <>
            <div id="Desktop" onClick={(e: React.MouseEvent<HTMLInputElement>) => {OnClickDesktop(e);}} ref={ref} onMouseMove={onMouseMove} onResize={onDesktopResize} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                <div id="Desktop-Widgets">
                    <DesktopTimeWidget />
                </div>
                <DesktopContext.Provider value={DesktopSizingValue}>
                    {DesktopIcons.map((desktopApp) => <DesktopIcon ApplicationName={desktopApp.Name} Icon={desktopApp.IconPath} id={desktopApp.id} Style={desktopApp.Style} key={desktopApp.id}/>)}
                </DesktopContext.Provider>
            </div>
            {isMovingHeldIcon? <MovingDesktopIcon MouseLocation={LocalMousePosition} ApplicationName={MovingAppObject?.Name} Icon={MovingAppObject?.IconPath} id={MovingAppObject?.id}/> : null}
        </>
    )
}

export default Desktop;