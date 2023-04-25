import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "./Desktop";

type PropTypes = {
    OpenApplications: OpenApplication[],
}

function ApplicationsContainer(Props: PropTypes)
{
    return <AnimatePresence>
        {Props.OpenApplications.map((openApp) => openApp.App)}
    </AnimatePresence>
}

export default ApplicationsContainer;