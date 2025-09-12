import Desktop from "@/components/windows/desktop";
import Taskbar from "@/components/windows/taskbar";
import StartMenu from "@/components/windows/start-menu";

function Surface() {
  return (
    <div className="relative h-dvh bg-cover grid grid-cols-1 grid-rows-[1fr_0.05fr] overflow-hidden isolate bg-[url('/Imgs/background.webp')] isolate">
      <Desktop className="z-10" />
      <StartMenu className="z-20" />
      <Taskbar className="z-30" />
    </div>
  );
}

export default Surface;
