import { useState } from "react";
import { useApplicationData } from "@/context/app-context";
import VicoDrawView from "./draw/draw-view";
import VicoGalleryView from "./gallery/gallery-view";

type VicoView = "draw" | "gallery";

function Vico() {
  const [view, setView] = useState<VicoView>("gallery");
  const app = useApplicationData();

  return (
    <div className="relative flex h-full min-h-70 flex-col bg-panel text-moon">
      {view === "draw" ? (
        <VicoDrawView
          parentProcessId={app.AppId}
          onGoGallery={() => setView("gallery")}
        />
      ) : (
        <VicoGalleryView onGoDraw={() => setView("draw")} />
      )}
    </div>
  );
}

export default Vico;
