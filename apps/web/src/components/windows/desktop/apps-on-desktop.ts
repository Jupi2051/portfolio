import { DesktopAppsList } from "@/components/windows/desktop/apps-list"
import {
  DesktopData,
  ProjectsFolder,
} from "@/components/apps/explorer/folders-items"

export type DesktopIconData = {
  id: number
  Name: string
  IconPath: string
  Style: {
    gridRow?: number
    gridColumn?: number
  }
  Selected: boolean
  AppComponent: DesktopAppsList
  customTaskbarIcon?: string
  processData?: any
  URLSavable?: boolean
}

export let DesktopIcons: DesktopIconData[] = [
  {
    id: 9,
    Name: "Home",
    IconPath: "Imgs/DesktopApps/Folder.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Explorer,
    processData: { items: DesktopData },
  },
  {
    id: 10,
    Name: "Projects",
    IconPath: "Imgs/DesktopApps/Folder.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Explorer,
    processData: { items: ProjectsFolder },
  },
  {
    id: 11,
    Name: "Pinboard",
    IconPath: "Imgs/DesktopApps/Pinboard.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Pinboard,
  },
  {
    id: 13,
    Name: "Blog",
    IconPath: "Imgs/DesktopApps/Notepad.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Blog,
    URLSavable: true,
  },
  {
    id: 14,
    Name: "Controls",
    IconPath: "Imgs/DesktopApps/Controls.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Controls,
  },
  {
    id: 1,
    Name: "Recycle Bin",
    IconPath: "Imgs/DesktopApps/RecycleBin.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.DummyApp,
  },
  {
    id: 15,
    Name: "Terminal",
    IconPath: "Imgs/DesktopApps/Terminal.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Terminal,
  },
  {
    id: 16,
    Name: "Gaia",
    IconPath: "Imgs/DesktopApps/Jenni.png",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Gaia,
  },
  {
    id: 17,
    Name: "Vico",
    IconPath: "Imgs/Apps/Photos.jpg",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.Vico,
    customTaskbarIcon: "Imgs/Apps/Photos.jpg",
  },
  // {
  //   id: 2,
  //   Name: "EIEN",
  //   IconPath: "Imgs/DesktopApps/EIEN.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.EIEN,
  // },
  {
    id: 3,
    Name: "Instatus Inspace",
    IconPath: "Imgs/DesktopApps/astronaut.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.InstatusInspace,
  },
  // {
  //   id: 4,
  //   Name: "Jenni",
  //   IconPath: "Imgs/DesktopApps/Jenni.png",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.Jenni,
  // },
  // {
  //   id: 5,
  //   Name: "Galaxy Gym",
  //   IconPath: "Imgs/DesktopApps/Galaxygym.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.GalaxyGym,
  // },
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

  // {
  //   id: 12,
  //   Name: "About Me",
  //   IconPath: "Imgs/DesktopApps/User.webp",
  //   Style: {},
  //   Selected: false,
  //   AppComponent: DesktopAppsList.AboutMe,
  // }
  {
    id: 18,
    Name: "Wallpapers Rocket",
    IconPath: "Imgs/DesktopApps/WallpapersRocket.png",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.WallpapersRocket,
  },
  {
    id: 19,
    Name: "Rivals Randomizer",
    IconPath: "Imgs/DesktopApps/Rivals.webp",
    Style: {},
    Selected: false,
    AppComponent: DesktopAppsList.RivalsRandomizer,
  },
]
