import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "./Desktop";
import DummyApp from "./Apps/DummyApp";
import Steam from "./Apps/Steam";

type PropTypes = {
    OpenApplications: OpenApplication[],
}

export enum DesktopAppsList {
    DummyApp,
    Steam
};

function ApplicationsContainer(Props: PropTypes)
{
    return <AnimatePresence>
        {Props.OpenApplications.map((openApp) => {
                switch (openApp.App)
                {
                    case DesktopAppsList.DummyApp: return <DummyApp AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                    case DesktopAppsList.Steam: return <Steam AppId={openApp.id} key={openApp.id} processIcon={openApp.processIcon} processName={openApp.processName}/>
                }
            }
        )}
    </AnimatePresence>
}

export default ApplicationsContainer;