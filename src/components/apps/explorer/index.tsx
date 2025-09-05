import AppFoundation from "@/components/ui/app-foundation";
import "@/Styles/Apps/Explorer.css";
import ExplorerItem from "@/components/apps/explorer/explorer-item";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
  processData: Object; // so we can pass in the desktop array too so we have it mapped to desktop as well as individual folders
};

export type FolderItem = {
  id: number;
  Name: string;
  IconPath: string;
  AppComponent: DesktopAppsList;
  processData?: Object;
  customTaskbarIcon?: string;
};

// export let DesktopIcons: DesktopIconData[] = [
//     {id: 0, Name: "This PC", IconPath: "Imgs/DesktopApps/ThisPC.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.DummyApp},
//     {id: 1, Name: "Recycle Bin", IconPath: "Imgs/DesktopApps/RecycleBin.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.DummyApp},
//     {id: 2, Name: "EIEN", IconPath: "Imgs/DesktopApps/EIEN.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.EIEN},
//     {id: 3, Name: "Oni", IconPath: "Imgs/DesktopApps/Oni.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Oni},
//     {id: 4, Name: "Jenni", IconPath: "Imgs/DesktopApps/Jenni.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Jenni},
//     {id: 5, Name: "Galaxy Gym", IconPath: "Imgs/DesktopApps/Galaxygym.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.GalaxyGym},
//     {id: 6, Name: "Steam", IconPath: "Imgs/DesktopApps/Steam.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.DummyApp},
//     {id: 7, Name: "Chloe", IconPath: "Imgs/Images/Chloe.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Photos, customTaskbarIcon: "Imgs/Apps/Photos.jpg", processData: {openedImage: "Imgs/Images/Chloe.png"}},
//     {id: 8, Name: "Friends", IconPath: "Imgs/Images/Friends.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.Photos, customTaskbarIcon: "Imgs/Apps/Photos.jpg", processData: {openedImage: "Imgs/Images/Friends.webp"}},
//     {id: 9, Name: "Files", IconPath: "Imgs/DesktopApps/Folder.webp", Style: {}, Selected: false, AppComponent: DesktopAppsList.Explorer},
// ];

function Explorer(Props: PropTypes) {
  const processData = Props.processData as { items: FolderItem[] };

  return (
    <AppFoundation
      AppId={Props.AppId}
      processIcon={Props.processIcon}
      processName={Props.processName}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflowY: "hidden",
        }}
        className="explorer-background-container"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="Search for apps, settings and documents."
            title="Search"
            className="search-bar-explorer"
          />
        </div>
        <div className="folders-layout">
          <div className="item-listing">
            {processData.items.map((element) => (
              <ExplorerItem
                AppName={element.AppComponent}
                ApplicationName={element.Name}
                Icon={element.IconPath}
                id={element.id}
                key={element.id}
                processProps={element.processData}
                customTaskbarIcon={element.customTaskbarIcon}
              />
            ))}
          </div>
        </div>
      </div>
    </AppFoundation>
  );
}

export default Explorer;
