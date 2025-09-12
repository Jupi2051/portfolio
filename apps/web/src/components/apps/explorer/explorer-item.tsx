import { DesktopAppsList } from "@/components/windows/desktop/apps-list";
import cn from "classnames";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";
import useGlobalTaskbarControls from "@/hooks/use-global-taskbar-controls";
export interface ExplorerItemData {
  ApplicationName: string;
  Icon: string;
  id: number;
  customTaskbarIcon?: string;
  Selected?: boolean;
  AppName: DesktopAppsList;
  processData?: Object;
}

function ExplorerItem(Props: ExplorerItemData) {
  const { openNewApplication } = useGlobalWindowsControls();
  const { openNewTaskbarApplication } = useGlobalTaskbarControls();

  function onClickApplication(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (event.detail !== 2) return;

    const ApplicationObject = {
      App: Props.AppName,
      processIcon: Props.customTaskbarIcon ?? Props.Icon,
      processName: Props.ApplicationName,
      processData: Props.processData,
    };

    const { focusWindow, bringWindowToFront, app } =
      openNewApplication(ApplicationObject);

    focusWindow();
    bringWindowToFront();
    openNewTaskbarApplication({
      id: app.id,
      AppId: app.id,
      Icon: Props.Icon,
      CustomTaskbarIcon: Props.customTaskbarIcon,
    });
  }

  return (
    <div
      className={cn(
        "relative flex flex-col w-[100px] h-[100px] pb-4 items-center justify-center text-white select-none isolate",
        'after:content-[" "] after:pointer-events-none after:w-full after:h-full after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-transparent after:z-[-1] hover:after:bg-white/15',
        { "after:bg-white/15": Props.Selected }
      )}
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
        {Props.ApplicationName}
      </h1>
    </div>
  );
}

export default ExplorerItem;
