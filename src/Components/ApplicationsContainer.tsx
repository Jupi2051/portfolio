import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "./Desktop";
import DummyApp from "./Apps/DummyApp";
import Jenni from "./Apps/Jenni";
import Photos from "./Apps/Photos";
import EIEN from "./Apps/EIEN";
import GalaxyGym from "./Apps/GalaxyGym";

type PropTypes = {
    OpenApplications: OpenApplication[],
}

export enum DesktopAppsList {
    DummyApp,
    Jenni,
    EIEN,
    GalaxyGym,
    Photos
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
                    case DesktopAppsList.GalaxyGym: return <GalaxyGym AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.Photos: return <Photos AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName} processData={{...openApp.processProps?? {}}} />
                }
            }
        )}
    </AnimatePresence>
}

export default ApplicationsContainer;