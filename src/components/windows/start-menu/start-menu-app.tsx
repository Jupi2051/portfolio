import { DesktopAppsList } from "@/components/windows/desktop/applications-container";
import { useDispatch } from "react-redux";
import {
  openTaskbarApplication,
  setRenderStartMenu,
} from "@/storage/slices/taskbar";
import { bringToFront, openApplication } from "@/storage/slices/main";
import { setFocusedApp } from "@/storage/slices/desktop";
import { OpenApplication } from "@/components/windows/desktop";
import cn from "classnames";

type PropTypes = {
  Icon: string;
  ApplicationName: string;
  App: DesktopAppsList;
  customTaskbarIcon?: string;
  processProps: Object;
};

function StartMenuApp(Props: PropTypes) {
  const dispatch = useDispatch();

  function onClickApplication() {
    const id = +new Date();
    const appObject: OpenApplication = {
      id,
      App: Props.App,
      processIcon: Props.customTaskbarIcon ?? Props.Icon,
      processName: Props.ApplicationName,
      processProps: Props.processProps,
    };

    dispatch(setRenderStartMenu(false));
    dispatch(openApplication(appObject));
    dispatch(setFocusedApp(appObject.id));
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
      className={cn(
        "relative flex flex-col max-w-12 h-full w-full items-center justify-center text-white select-none isolate text-xss group",
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
