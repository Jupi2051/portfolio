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

export default BackgroundAppWrapper;
