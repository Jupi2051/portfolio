import "./jupi-logo.css";

function Julogo({
  Size,
  className,
  skipEnterAnimation,
}: {
  Size: number;
  className?: string;
  skipEnterAnimation?: boolean;
}) {
  return (
    <div
      className={
        "logo " + (skipEnterAnimation ? "no-animation " : "") + className
      }
      style={{ maxWidth: Size + "px" }}
    >
      <div className="first-line">
        <div className="cloud-tall"></div>
        <div className="cloud-organizer">
          <div className="cloud-1 stickycloud"></div>
          <div className="cloud-1"></div>
        </div>
      </div>
      <div className="second-line"></div>
      <div className="third-line">
        <div className="storm"></div>
      </div>
    </div>
  );
}

export default Julogo;
