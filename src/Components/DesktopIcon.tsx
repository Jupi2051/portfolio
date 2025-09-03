import { useState } from "react";
import { OpenApplication } from "@/Components/Desktop";
import { useDispatch } from "react-redux";
import { openTaskbarApplication } from "@/Storage/Slices/Taskbar";
import { DesktopAppsList } from "@/Components/ApplicationsContainer";
import { bringToFront, openApplication } from "@/Storage/Slices/Main";
import { setFocusedApp } from "@/Storage/Slices/Desktop";
import cn from "classnames";

type PropTypes = {
  ApplicationName: string;
  Icon: string;
  id: number;
  customTaskbarIcon?: string;
  Style?: {
    gridRow?: number;
    gridColumn?: number;
  };
  Selected: boolean;
  AppName: DesktopAppsList;
  processProps?: Object;
};

function DesktopIcon(Props: PropTypes) {
  const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
  const dispatch = useDispatch();

  function onClickApplication(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (event.detail !== 2) return;
    const id = +new Date();

    const ApplicationObject: OpenApplication = {
      id,
      App: Props.AppName,
      processIcon: Props.customTaskbarIcon ?? Props.Icon,
      processName: Props.ApplicationName,
      processProps: Props.processProps,
    };

    dispatch(openApplication(ApplicationObject));
    dispatch(setFocusedApp(ApplicationObject.id));
    dispatch(
      openTaskbarApplication({
        id,
        AppId: id,
        Icon: Props.Icon,
        CustomTaskbarIcon: Props.customTaskbarIcon,
      })
    );
    dispatch(bringToFront(id));
  }

  return (
    <div
      style={{ ...Props.Style }}
      className={cn(
        "Desktop-Icon-Container",
        "relative flex flex-col w-[100px] h-[100px] pb-4 items-center justify-center text-white select-none isolate",
        'after:content-[" "] after:pointer-events-none after:w-full after:h-full after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-transparent after:z-[-1] hover:after:bg-white/15',
        { "after:bg-white/15": Props.Selected }
      )}
      data-id={Props.id}
      onClick={onClickApplication}
    >
      <img src={Props.Icon} className="w-3/5 pointer-events-none" />
      <h1
        className="absolute bottom-1 font-segoe-ui-light font-thin text-xs mt-1.5 select-none pointer-events-none"
        style={{
          textShadow:
            "-1px -1px 1px #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          filter: "drop-shadow(0px 1px 2px #000)",
        }}
      >
        {ApplicationName}
      </h1>
    </div>
  );
}

export default DesktopIcon;
