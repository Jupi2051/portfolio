import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "./Desktop";
import DummyApp from "./Apps/DummyApp";
import Jenni from "./Apps/Jenni";
import Photos from "./Apps/Photos";
import EIEN from "./Apps/EIEN";
import GalaxyGym from "./Apps/GalaxyGym";
import Oni from "./Apps/Oni";
import Explorer from "./Apps/Explorer";
import Social from "./Apps/Social";
import AboutMe from "./Apps/AboutMe";

type PropTypes = {
    OpenApplications: OpenApplication[],
}

export enum DesktopAppsList {
    DummyApp,
    Oni,
    Jenni,
    EIEN,
    GalaxyGym,
    Photos,
    Explorer,
    Social,
    AboutMe
};

function ApplicationsContainer(Props: PropTypes)
{
    return <AnimatePresence>
        {
            Props.OpenApplications.map((openApp) => {
                switch (openApp.App)
                {
                    case DesktopAppsList.DummyApp: return <DummyApp AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.Jenni: return <Jenni AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.EIEN: return <EIEN AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.Oni: return <Oni AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.GalaxyGym: return <GalaxyGym AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.Photos: return <Photos AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName} processData={{...openApp.processProps?? {}}} />
                    case DesktopAppsList.Explorer: return <Explorer AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName} processData={{...openApp.processProps?? {}}}/>
                    case DesktopAppsList.Social: return <Social AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName} />
                    case DesktopAppsList.AboutMe: return <AboutMe AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName} />
                }
            }
        )}
    </AnimatePresence>
}

export default ApplicationsContainer;