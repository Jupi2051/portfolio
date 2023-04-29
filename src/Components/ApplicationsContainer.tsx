import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "./Desktop";
import DummyApp from "./Apps/DummyApp";
import Steam from "./Apps/Steam";
import Photos from "./Apps/Photos";

type PropTypes = {
    OpenApplications: OpenApplication[],
}

export enum DesktopAppsList {
    DummyApp,
    Steam,
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
                    case DesktopAppsList.Steam: return <Steam AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.Photos: return <Photos AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName} processData={{...openApp.processProps?? {}}} />
                }
            }
        )}
    </AnimatePresence>
}

export default ApplicationsContainer;