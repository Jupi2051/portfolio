import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StartMenuFooter = () => {
  return (
    <div
      className="absolute w-full h-full left-0 bg-ctp-base/30 top-[var(--user-container-inner)]"
      style={{ "--user-container-inner": "90%" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between px-12 h-[calc(100%-var(--user-container-inner))]">
        <div className="flex items-center justify-center gap-5 text-2xs">
          <img
            src="https://i.postimg.cc/kX5cqZgP/Birthday-Festival-BD-artwork-2.png"
            className="w-9 h-9 object-cover rounded-full"
          />
          <p className="text-xs font-segoe-ui">Jupi</p>
        </div>
        <FontAwesomeIcon className="text-sm" icon={faPowerOff} />
      </div>
    </div>
  );
};

export default StartMenuFooter;
