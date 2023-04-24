import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";

type OpenApplication = {
    id: number,
    App: ReactElement<{}>
}

type CloseAppFunction = (id: number) => void;

type PropTypes = {
    OpenApplications: OpenApplication[],
    CloseApp: CloseAppFunction,
}

function ApplicationsContainer(Props: PropTypes)
{
    return <AnimatePresence>
        {Props.OpenApplications.map((openApp) => openApp.App)}
    </AnimatePresence>
}

export default ApplicationsContainer;