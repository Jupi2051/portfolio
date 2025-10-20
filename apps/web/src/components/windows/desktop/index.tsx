import { useEffect, useRef, useState } from "react";
import "@/Styles/Desktop.css";
import DesktopIcon from "@/components/windows/desktop/desktop-icon";
import DesktopTimeWidget from "@/components/widgets/time/desktop-time-widget";
import useResizeObserver from "use-resize-observer";
import MovingDesktopIcon from "@/components/windows/desktop/moving-desktop-icon";
import ApplicationsContainer from "@/components/windows/desktop/applications-container";
import {
  DesktopAppsList,
  toAppFromName,
} from "@/components/windows/desktop/apps-list";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/storage/store";
import { setFocusedApp } from "@/storage/slices/desktop";
import { FolderItem } from "@/components/apps/explorer";
import cn from "classnames";
import { Dimensions2D } from "@/components/windows/app-window";
import useApplicationURLParams from "@/hooks/use-application-url-params";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";
import useGlobalTaskbarControls from "@/hooks/use-global-taskbar-controls";

type Point = {
  x: number;
  y: number;
};

export type openApplicationMetaData = {
  hiddenButtons?: ("minimize" | "maximize" | "close")[];
  forceView?: boolean;
  windowSize?: Dimensions2D;
  maximized?: boolean;
  windowLocation?:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
    | "left-center"
    | "right-center";
  disableMaximize?: boolean;
  disableMinimize?: boolean;
  disableResize?: boolean;
  disableOtherAppsPointerEvents?: boolean;
  disabledByOtherApp?: OpenApplication;
};

export interface OpenApplication {
  id: number;
  App: DesktopAppsList;
  metaData?: openApplicationMetaData;
  processName: string;
  processIcon: string;
  taskbarIcon?: string;
  processData?: Object;
  parentProcess?: number;
  childrenProcess?: number[];
  URLSavable?: boolean;
  URLParams?: Record<string, string>;
}

export type DesktopIconData = {
  id: number;
  Name: string;
  IconPath: string;
  Style: {
    gridRow?: number;
    gridColumn?: number;
  };
  Selected: boolean;
  AppComponent: DesktopAppsList;
  customTaskbarIcon?: string;
  processData?: any;
  URLSavable?: boolean;
};

let DesktopData: DesktopIconData[] = [
  {
    id: 1,
    Name: "Recycle Bin",
    IconPath: "Imgs/DesktopApps/RecycleBin.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.DummyApp,
  },
  {
    id: 2,
    Name: "EIEN",
    IconPath: "Imgs/DesktopApps/EIEN.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.EIEN,
  },
  // {id: 3, Name: "Oni", IconPath: "Imgs/DesktopApps/Oni.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Oni},
  {
    id: 4,
    Name: "Jenni",
    IconPath: "Imgs/DesktopApps/Jenni.png",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Jenni,
  },
  {
    id: 5,
    Name: "Galaxy Gym",
    IconPath: "Imgs/DesktopApps/Galaxygym.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.GalaxyGym,
  },
  // {
  //   id: 6,
  //   Name: "Steam",
  //   IconPath: "Imgs/DesktopApps/Steam.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.DummyApp,
  // },
  // {
  //   id: 7,
  //   Name: "Chloe",
  //   IconPath: "Imgs/Images/Chloe.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Photos,
  //   customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  //   processData: { openedImage: "Imgs/Images/Chloe.png" },
  // },
  // {
  //   id: 8,
  //   Name: "Friends",
  //   IconPath: "Imgs/Images/Friends.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Photos,
  //   customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  //   processData: { openedImage: "Imgs/Images/Friends.webp" },
  // },
];

const ProjectsFolder: FolderItem[] = [
  {
    id: 2,
    Name: "EIEN",
    IconPath: "Imgs/DesktopApps/EIEN.webp",
    AppComponent: DesktopAppsList.EIEN,
  },
  // {id: 3, Name: "Oni", IconPath: "Imgs/DesktopApps/Oni.png", AppComponent: DesktopAppsList.Oni},
  {
    id: 4,
    Name: "Jenni",
    IconPath: "Imgs/DesktopApps/Jenni.png",
    AppComponent: DesktopAppsList.Jenni,
  },
  {
    id: 5,
    Name: "Galaxy Gym",
    IconPath: "Imgs/DesktopApps/Galaxygym.webp",
    AppComponent: DesktopAppsList.GalaxyGym,
  },
  // {
  //   id: 6,
  //   Name: "Steam",
  //   IconPath: "Imgs/DesktopApps/Steam.png",
  //   AppComponent: DesktopAppsList.DummyApp,
  // },
];

export let DesktopIcons: DesktopIconData[] = [
  {
    id: 9,
    Name: "Home",
    IconPath: "Imgs/DesktopApps/Folder.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Explorer,
    processData: { items: DesktopData },
  },
  {
    id: 10,
    Name: "Projects",
    IconPath: "Imgs/DesktopApps/Folder.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Explorer,
    processData: { items: ProjectsFolder },
  },
  {
    id: 11,
    Name: "Pinboard",
    IconPath: "Imgs/DesktopApps/Pinboard.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Pinboard,
  },
  {
    id: 13,
    Name: "Blog",
    IconPath: "Imgs/DesktopApps/Notepad.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Blog,
    URLSavable: true,
  },
  {
    id: 14,
    Name: "Controls",
    IconPath: "Imgs/DesktopApps/Controls.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Controls,
  },
  {
    id: 1,
    Name: "Recycle Bin",
    IconPath: "Imgs/DesktopApps/RecycleBin.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.DummyApp,
  },
  // {
  //   id: 2,
  //   Name: "EIEN",
  //   IconPath: "Imgs/DesktopApps/EIEN.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.EIEN,
  // },
  // {
  //   id: 3,
  //   Name: "Instatus Inspace",
  //   IconPath: "Imgs/DesktopApps/astronaut.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.InstatusInspace,
  // },
  // {
  //   id: 4,
  //   Name: "Jenni",
  //   IconPath: "Imgs/DesktopApps/Jenni.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Jenni,
  // },
  // {
  //   id: 5,
  //   Name: "Galaxy Gym",
  //   IconPath: "Imgs/DesktopApps/Galaxygym.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.GalaxyGym,
  // },
  // {
  //   id: 6,
  //   Name: "Steam",
  //   IconPath: "Imgs/DesktopApps/Steam.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.DummyApp,
  // },
  // {
  //   id: 7,
  //   Name: "Chloe",
  //   IconPath: "Imgs/Images/Chloe.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Photos,
  //   customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  //   processData: { openedImage: "Imgs/Images/Chloe.png" },
  // },
  // {
  //   id: 8,
  //   Name: "Friends",
  //   IconPath: "Imgs/Images/Friends.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Photos,
  //   customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  //   processData: { openedImage: "Imgs/Images/Friends.webp" },
  // },

  // {
  //   id: 12,
  //   Name: "About Me",
  //   IconPath: "Imgs/DesktopApps/User.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.AboutMe,
  // }
];

const MaxDistanceBeforeMovementTrigger = 10;
let LocalMousePosition: { x: number; y: number } = { x: 0, y: 0 };

function Desktop({ className }: { className?: string }) {
  const urlParams = useApplicationURLParams();
  const { openNewApplication } = useGlobalWindowsControls();
  const { openNewTaskbarApplication } = useGlobalTaskbarControls();
  const dispatch = useDispatch();
  const startedURLApps = useRef(false);
  const [HoldClickInitPosition, SetHoldClickInitPosition] = useState({
    x: 0,
    y: 0,
  });
  const {
    ref,
    width = 1,
    height = 1,
  } = useResizeObserver<HTMLDivElement>({ box: "border-box" });
  const [HeldIconID, SetHeldIconId] = useState(-1); // -1 means no element is held atm.
  const [isMovingHeldIcon, SetMoveHeldIcon] = useState(false);
  const [ApplicationsArray, SetApplicationsArray] = useState(DesktopIcons);
  const focusedApp = useSelector((x: RootState) => x.desktopState.focusedAppId);
  const OpenApplications = useSelector(
    (x: RootState) => x.mainState.OpenApplications
  );

  useEffect(() => {
    if (startedURLApps.current) return;
    startedURLApps.current = true;

    urlParams.forEach((appState) => {
      const AppKey = toAppFromName(appState.app);
      const foundIconData = DesktopIcons.find(
        (desktopIcon) => desktopIcon.AppComponent === AppKey
      );

      const { focusWindow, bringWindowToFront, app } = openNewApplication({
        App: AppKey,
        processIcon: foundIconData?.IconPath ?? "",
        processName: foundIconData?.Name ?? "",
        processData: appState.value,
        URLParams: appState.value as unknown as Record<string, string>,
        URLSavable: foundIconData?.URLSavable ?? false,
      });

      focusWindow();
      bringWindowToFront();
      openNewTaskbarApplication({
        id: app.id,
        AppId: app.id,
        Icon: foundIconData?.IconPath ?? "",
      });
    });
  }, []);

  useEffect(() => {
    if (focusedApp === -1)
      history.replaceState(null, "", window.location.pathname);
  }, [focusedApp]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const newX = event.clientX - rect.left;
    const newY = event.clientY - rect.top;
    const initX = HoldClickInitPosition.x;
    const initY = HoldClickInitPosition.y;
    LocalMousePosition = { x: newX, y: newY };
    if (HeldIconID != -1) {
      const DistanceMoved = Math.sqrt(
        Math.pow(newX - initX, 2) + Math.pow(newY - initY, 2)
      );
      if (DistanceMoved >= MaxDistanceBeforeMovementTrigger)
        SetMoveHeldIcon(true);
    }
  }

  function moveHeldElement() {
    if (isMovingHeldIcon) {
      const GridLocation = GetGridLocationFromMousePosition();
      UpdateElementGridLocation(HeldIconID, GridLocation);
      // SelectDesktopIcon(Number(HeldIconID), true);
    }
  }

  function UpdateElementGridLocation(ElementId: number, NewLocation: Point) {
    DesktopIcons = DesktopIcons.map((element) => {
      if (element.id === ElementId)
        return {
          ...element,
          Style: { gridColumn: NewLocation.y, gridRow: NewLocation.x },
        };
      else return { ...element };
    });
    SetApplicationsArray(DesktopIcons);
  }

  function GetGridLocationFromMousePosition(): Point {
    const itemMinHeight = 90;
    const itemMinWidth = 90;

    let CalculatedColumn = Math.round(LocalMousePosition.x / itemMinWidth);
    let CalculatedRow = Math.round(LocalMousePosition.y / itemMinHeight);

    const gridCountHorizontal = Math.round(width / itemMinWidth);
    const gridCountVertical = Math.round(height / itemMinHeight);

    CalculatedColumn =
      CalculatedColumn >= gridCountHorizontal
        ? gridCountHorizontal - 1
        : CalculatedColumn;
    CalculatedRow =
      CalculatedRow >= gridCountVertical
        ? gridCountVertical - 1
        : CalculatedRow;

    return {
      x: CalculatedRow <= 0 ? 1 : CalculatedRow,
      y: CalculatedColumn <= 0 ? 1 : CalculatedColumn,
    };
  }

  function SelectDesktopIcon(IconId: number) {
    DesktopIcons = DesktopIcons.map((element) => {
      return { ...element, Selected: element.id === IconId };
    });
    SetApplicationsArray(DesktopIcons);
  }

  function onMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    SetHoldClickInitPosition({ x: event.clientX, y: event.clientY });
    const DesktopClickedElement = event.target as Element;
    if (DesktopClickedElement.classList.contains("Desktop-Icon-Container")) {
      const ElementId =
        DesktopClickedElement.getAttribute("data-id") === undefined
          ? -1
          : Number(DesktopClickedElement.getAttribute("data-id"));
      SetHeldIconId(ElementId);
    } else if (DesktopClickedElement.id === "Desktop")
      dispatch(setFocusedApp(-1));
  }

  function EndClick() {
    moveHeldElement();
    if (isMovingHeldIcon) {
      SetMoveHeldIcon(false);
      SelectDesktopIcon(-1);
    }
    SetHeldIconId(-1);
  }

  function onMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const DesktopIconElement = event.target as Element;
    if (DesktopIconElement.classList.contains("Desktop-Icon-Container")) {
      const ElementId = DesktopIconElement.getAttribute("data-id");
      if (ElementId) SelectDesktopIcon(Number(ElementId));
    } else {
      if (!isMovingHeldIcon) {
        DesktopIcons = DesktopIcons.map((e) => {
          return { ...e, Selected: false };
        });
        SetApplicationsArray(DesktopIcons);
      }
    }

    EndClick();
  }

  const MovingAppObject = DesktopIcons.find((e) => e.id === HeldIconID);

  return (
    <>
      <div
        id="Desktop"
        ref={ref}
        onMouseMove={onMouseMove}
        // onResize={onDesktopResize}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className={cn(className, "grid-flow-row sm:grid-flow-col")}
      >
        <div className="absolute w-full h-full pointer-events-none">
          <DesktopTimeWidget />
        </div>
        {ApplicationsArray.map((desktopApp, index) => (
          <DesktopIcon
            ApplicationName={desktopApp.Name}
            Icon={desktopApp.IconPath}
            id={desktopApp.id}
            Style={desktopApp.Style}
            Selected={desktopApp.Selected}
            customTaskbarIcon={desktopApp.customTaskbarIcon}
            key={desktopApp.id}
            AppName={desktopApp.AppComponent}
            processData={desktopApp.processData}
            index={index}
            isMovingAnIcon={isMovingHeldIcon}
          />
        ))}
        <AnimatePresence>
          <ApplicationsContainer OpenApplications={OpenApplications} />
        </AnimatePresence>
      </div>
      {isMovingHeldIcon ? (
        <MovingDesktopIcon
          MouseLocation={LocalMousePosition}
          ApplicationName={MovingAppObject?.Name}
          Icon={MovingAppObject?.IconPath}
          id={MovingAppObject?.id}
        />
      ) : null}
    </>
  );
}

export default Desktop;
