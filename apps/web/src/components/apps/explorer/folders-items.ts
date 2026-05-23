import { DesktopAppsList } from "@/components/windows/desktop/apps-list"
import { DesktopIconData } from "@/components/windows/desktop/apps-on-desktop"
import { FolderItem } from "@/components/apps/explorer"

let DesktopData: DesktopIconData[] = [
  {
    id: 1,
    Name: "Recycle Bin",
    IconPath: "Imgs/DesktopApps/RecycleBin.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.DummyApp,
  },
  {
    id: 2,
    Name: "EIEN",
    IconPath: "Imgs/DesktopApps/EIEN.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.EIEN,
  },
  // {id: 3, Name: "Oni", IconPath: "Imgs/DesktopApps/Oni.png", Style: {}, Selected: false, AppComponent: DesktopAppsList.Oni},
  {
    id: 4,
    Name: "Jenni",
    IconPath: "Imgs/DesktopApps/Jenni.png",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Jenni,
  },
  {
    id: 5,
    Name: "Galaxy Gym",
    IconPath: "Imgs/DesktopApps/Galaxygym.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.GalaxyGym,
  },
  // {
  //   id: 6,
  //   Name: "Steam",
  //   IconPath: "Imgs/DesktopApps/Steam.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.DummyApp,
  // },
  // {
  //   id: 7,
  //   Name: "Chloe",
  //   IconPath: "Imgs/Images/Chloe.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Photos,
  //   customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  //   processData: { openedImage: "Imgs/Images/Chloe.png" },
  // },
  // {
  //   id: 8,
  //   Name: "Friends",
  //   IconPath: "Imgs/Images/Friends.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Photos,
  //   customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  //   processData: { openedImage: "Imgs/Images/Friends.webp" },
  // },
]

const ProjectsFolder: FolderItem[] = [
  {
    id: 2,
    Name: "EIEN",
    IconPath: "Imgs/DesktopApps/EIEN.webp",
    AppComponent: DesktopAppsList.EIEN,
  },
  // {id: 3, Name: "Oni", IconPath: "Imgs/DesktopApps/Oni.png", AppComponent: DesktopAppsList.Oni},
  {
    id: 4,
    Name: "Jenni",
    IconPath: "Imgs/DesktopApps/Jenni.png",
    AppComponent: DesktopAppsList.Jenni,
  },
  {
    id: 5,
    Name: "Galaxy Gym",
    IconPath: "Imgs/DesktopApps/Galaxygym.webp",
    AppComponent: DesktopAppsList.GalaxyGym,
  },
  // {
  //   id: 6,
  //   Name: "Steam",
  //   IconPath: "Imgs/DesktopApps/Steam.png",
  //   AppComponent: DesktopAppsList.DummyApp,
  // },
]

export { DesktopData, ProjectsFolder }
