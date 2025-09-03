import DateTime from "./BackgroundApps/DateTime";
import VolumeInternet from "./BackgroundApps/VolumeInternet";
import cn from "classnames";

function BackgroundAppWrapper(Props: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative py-1",
        "before:content-[''] before:absolute before:opacity-0 hover:before:opacity-100 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2  before:scale-95 before:rounded-md before:bg-white/5 before:z-[-1] before:w-[120%] before:h-[40px] before:border before:border-white/0 before:block before:transition-all hover:before:border-white/5 hover:before:scale-100"
      )}
    >
      {Props.children}
    </div>
  );
}

function BackgroundApps() {
  return (
    <div className="flex flex-row-reverse gap-4 px-5 items-center justify-center rounded-t-lg list-none pt-1 pb-0.5 w-fit z-[3]  col-start-3 bg-gradient-to-r from-[#3f3550] to-[#523a54]">
      <BackgroundAppWrapper>
        <DateTime />
      </BackgroundAppWrapper>
      <BackgroundAppWrapper>
        <VolumeInternet />
      </BackgroundAppWrapper>
    </div>
  );
}

export default BackgroundApps;
