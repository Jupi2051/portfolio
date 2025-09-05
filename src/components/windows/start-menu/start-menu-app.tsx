import { DesktopAppsList } from "@/components/windows/desktop/apps-list";
import { useDispatch } from "react-redux";
import {
  openTaskbarApplication,
  setRenderStartMenu,
} from "@/storage/slices/taskbar";
import { bringToFront, openApplication } from "@/storage/slices/main";
import { setFocusedApp } from "@/storage/slices/desktop";
import { OpenApplication } from "@/components/windows/desktop";
import cn from "classnames";
import useStartMenu from "@/hooks/use-start-menu";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";

type PropTypes = {
  Icon: string;
  ApplicationName: string;
  App: DesktopAppsList;
  customTaskbarIcon?: string;
  processData: Object;
};

function StartMenuApp(Props: PropTypes) {
  const { setRenderStartMenu } = useStartMenu();
  const { openNewApplication } = useGlobalWindowsControls();
  const dispatch = useDispatch();

  function onClickApplication() {
    const appObject = {
      App: Props.App,
      processIcon: Props.customTaskbarIcon ?? Props.Icon,
      processName: Props.ApplicationName,
      processData: Props.processData,
    };

    setRenderStartMenu(false);
    const { focusWindow, bringWindowToFront, app } =
      openNewApplication(appObject);
    focusWindow();
    dispatch(
      openTaskbarApplication({
        id: app.id,
        AppId: app.id,
        Icon: Props.Icon,
        CustomTaskbarIcon: Props.customTaskbarIcon,
      })
    );
    bringWindowToFront();
  }

  return (
    <div
      className={cn(
        "relative flex flex-col max-w-12 h-full w-full items-center justify-center text-white select-none isolate text-2xs group",
        "before:content-[''] before:block before:absolute before:top-1/2 before:left-1/2 before:opacity-0 before:bg-white/5 before:aspect-square before:w-[200%] before:rounded-md before:pointer-events-none before:-translate-1/2 before:transition-all before:duration-100 before:ease-in-out hover:before:opacity-100 hover:active:before:bg-white/5"
      )}
      onClick={onClickApplication}
    >
      <img
        className="max-w-full transition-transform duration-150 mb-5 ease-in-out group-hover:group-active:scale-[0.85]"
        src={Props.Icon}
      />
      <p className="absolute bottom-0 whitespace-nowrap font-segoe-ui-light font-thin text-xs text-center">
        {Props.ApplicationName}
      </p>
    </div>
  );
}

export default StartMenuApp;
