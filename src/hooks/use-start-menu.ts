import { RootState } from "@/storage/store";
import { useDispatch, useSelector } from "react-redux";
import { setRenderStartMenu } from "@/storage/slices/taskbar";

const useStartMenu = () => {
  const dispatch = useDispatch();
  const RenderStartMenu = useSelector(
    (x: RootState) => x.taskbarState.RenderStartMenu
  );

  const setIsRenderinStartMenu = (state: boolean) => {
    dispatch(setRenderStartMenu(state));
  };

  return {
    isRendered: RenderStartMenu,
    setRenderStartMenu: setIsRenderinStartMenu,
  };
};

export default useStartMenu;
