import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "./Desktop";
import { DesktopAppsList } from "./DesktopIcon";
import DummyApp from "./Apps/DummyApp";

type PropTypes = {
    OpenApplications: OpenApplication[],
}

function ApplicationsContainer(Props: PropTypes)
{
    return <AnimatePresence>
        {Props.OpenApplications.map((openApp) => {
                switch (openApp.App)
                {
                    case DesktopAppsList.DummyApp: {
                        return <DummyApp AppId={openApp.id} key={openApp.id}/>
                    }
                }
            }
        )}
    </AnimatePresence>
}

export default ApplicationsContainer;