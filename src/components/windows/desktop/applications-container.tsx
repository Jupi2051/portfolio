import { AnimatePresence } from "framer-motion";
import { OpenApplication } from "@/components/windows/desktop";

import { DesktopAppsComponents } from "@/components/windows/desktop/apps-list";

type PropTypes = {
  OpenApplications: OpenApplication[];
};

function ApplicationsContainer({ OpenApplications }: PropTypes) {
  return (
    <AnimatePresence>
      {OpenApplications.map(({ App, id, ...openApp }) => {
        const AppComponent = DesktopAppsComponents[App];
        return (
          <AppComponent
            {...openApp}
            AppId={id}
            key={id}
            processData={openApp.processData ?? {}}
          />
        );
      })}
    </AnimatePresence>
  );
}

export default ApplicationsContainer;
