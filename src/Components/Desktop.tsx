import { ReactElement, SyntheticEvent, createContext, useEffect, useState } from "react";
import "../Styles/Desktop.css"
import DesktopIcon from "./DesktopIcon";
import DesktopTimeWidget from "./Widgets/DesktopTimeWidget";
import useResizeObserver from "use-resize-observer";
import MovingDesktopIcon from "./MovingDesktopIcon";
import ApplicationsContainer, { DesktopAppsList } from "./ApplicationsContainer";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { openApplication, setZIndex, unhandleZIndex } from "../Storage/Slices/Main";
import { RootState } from "../Storage/Store";
import { setFocusedApp } from "../Storage/Slices/Desktop";

type Point = {
    x: number,
    y: number
}

export type OpenApplication = {
    id: number,
    App: DesktopAppsList,
    processName: string,
    processIcon: string,
    taskbarIcon?: string,
    processProps?: Object
}

const DefaultDesktopSize = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

type DesktopIconData = {
    id: number
    Name: string,
    IconPath: string,
    Style: {
        gridRow?: number,
        gridColumn?: number
    },
    Selected: boolean,
    AppComponent: DesktopAppsList,
    customTaskbarIcon?: string,
    processData?: any,
};

export let DesktopIcons: DesktopIconData[] = [
    {id: 0, Name: "This PC", IconPath: "Imgs/DesktopApps/ThisPC.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.DummyApp},
    {id: 1, Name: "Recycle Bin", IconPath: "Imgs/DesktopApps/RecycleBin.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.DummyApp},
    {id: 2, Name: "EIEN", IconPath: "Imgs/DesktopApps/EIEN.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.EIEN},
    {id: 3, Name: "Oni", IconPath: "Imgs/DesktopApps/Oni.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Oni},
    {id: 4, Name: "Jenni", IconPath: "Imgs/DesktopApps/Jenni.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Jenni},
    {id: 5, Name: "Galaxy Gym", IconPath: "Imgs/DesktopApps/Galaxygym.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.GalaxyGym},
    {id: 6, Name: "Steam", IconPath: "Imgs/DesktopApps/Steam.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.DummyApp},
    {id: 7, Name: "Chloe", IconPath: "Imgs/Images/Chloe.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Photos, customTaskbarIcon: "Imgs/Apps/Photos.jpg", processData: {openedImage: "Imgs/Images/Chloe.png"}},
    {id: 8, Name: "So True", IconPath: "https://cdn.discordapp.com/attachments/854012967820460102/1101837385131638864/Fotji3MWAAE-XkO.jpg", Style: {}, Selected: false, AppComponent: DesktopAppsList.Photos, customTaskbarIcon: "Imgs/Apps/Photos.jpg", processData: {openedImage: "https://cdn.discordapp.com/attachments/854012967820460102/1101837385131638864/Fotji3MWAAE-XkO.jpg"}}
];

let Timer: number;

const MaxDistanceBeforeMovementTrigger = 10;
let LocalMousePosition: {x: number, y: number} = {x: 0, y: 0}

function Desktop()
{
    const dispatch = useDispatch();
    const [isHoldClicked, SetHoldClick] = useState(false);
    const [HoldClickInitPosition, SetHoldClickInitPosition] = useState({x: 0, y: 0});
    const {ref, width = 1, height = 1} = useResizeObserver<HTMLDivElement>({box: "border-box"});
    const [HeldIconID, SetHeldIconId] = useState(-1); // -1 means no element is held atm.
    const [isMovingHeldIcon, SetMoveHeldIcon] = useState(false);
    const [ApplicationsArray, SetApplicationsArray] = useState(DesktopIcons);

    const OpenApplications = useSelector((x: RootState) => x.mainState.OpenApplications);

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
            EndClick();

    }, [isHoldClicked])
    
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
            SelectDesktopIcon(Number(HeldIconID), true);
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
        SetApplicationsArray(DesktopIcons);
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

    function SelectDesktopIcon(IconId: number, selected: boolean)
    {
        DesktopIcons = DesktopIcons.map((element) => {
            return {...element, Selected: element.id === IconId};
        });
        SetApplicationsArray(DesktopIcons);
    }

    function onDesktopResize(event: SyntheticEvent<HTMLDivElement, Event>)
    {
        console.log("resize");
    }

    function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
    {
        SetHoldClickInitPosition({x: event.clientX, y: event.clientY});
        SetHoldClick(true);
        const DesktopClickedElement = event.target as Element;
        if (DesktopClickedElement.classList.contains("Desktop-Icon-Container"))
        {
            const ElementId = DesktopClickedElement.getAttribute("data-id") === undefined?
            -1 : Number(DesktopClickedElement.getAttribute("data-id"));
            SetHeldIconId(ElementId);
        }
        else if (DesktopClickedElement.id === "Desktop")
            dispatch(setFocusedApp(-1));
    }
    
    function EndClick()
    {
        SetHoldClick(false);
        clearInterval(Timer);
        moveHeldElement();
        SetMoveHeldIcon(false);
        SetHeldIconId(-1);
    }

    function onMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        const DesktopIconElement = event.target as Element;
        if (DesktopIconElement.classList.contains("Desktop-Icon-Container"))
        {
            const ElementId = DesktopIconElement.getAttribute("data-id");
            if (ElementId)
                SelectDesktopIcon(Number(ElementId), true);
        }
        else
        {
            if (!isMovingHeldIcon)
            {
                DesktopIcons = DesktopIcons.map((e) => {return {...e, Selected: false}});
                SetApplicationsArray(DesktopIcons);
            }
        }

        EndClick();
    }

    function onHoldClick()
    {
        // if (HeldIconID >= 0)
            // console.log(HeldIconID);
    }

    const MovingAppObject = DesktopIcons.find((e) => e.id === HeldIconID);

    function CloseApp(id: number) : void
    {
        dispatch(unhandleZIndex(id));
        dispatch(setFocusedApp(-1)); // unfocus everything.
    }

    return (
        <>
            <div id="Desktop" ref={ref} onMouseMove={onMouseMove} onResize={onDesktopResize} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                <div id="Desktop-Widgets">
                    <DesktopTimeWidget />
                </div>
                {ApplicationsArray.map((desktopApp) =>
                    <DesktopIcon 
                    ApplicationName={desktopApp.Name}
                    Icon={desktopApp.IconPath} 
                    id={desktopApp.id}
                    Style={desktopApp.Style}
                    Selected={desktopApp.Selected}
                    customTaskbarIcon={desktopApp.customTaskbarIcon}
                    key={desktopApp.id}
                    AppName={desktopApp.AppComponent}
                    processProps={desktopApp.processData}/>
                )}
                <AnimatePresence>
                    <ApplicationsContainer OpenApplications={OpenApplications} />
                </AnimatePresence>
            </div>
            {isMovingHeldIcon? <MovingDesktopIcon MouseLocation={LocalMousePosition} ApplicationName={MovingAppObject?.Name} Icon={MovingAppObject?.IconPath} id={MovingAppObject?.id}/> : null}
        </>
    )
}

export default Desktop;