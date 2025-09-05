import { AnimatePresence } from "framer-motion";
import { OpenApplication } from "@/components/windows/desktop";
import { DesktopAppsComponents } from "@/components/windows/desktop/apps-list";
import ApplicationContext from "@/context/app-context";

type PropTypes = {
  OpenApplications: OpenApplication[];
};

function ApplicationsContainer({ OpenApplications }: PropTypes) {
  return (
    <AnimatePresence>
      {OpenApplications.map(({ App, id, ...openApp }) => {
        const AppComponent = DesktopAppsComponents[App];
        return (
          <ApplicationContext.Provider
            value={{
              AppId: id,
              processData: openApp.processData as Object,
              ...openApp,
            }}
            key={id}
          >
            <AppComponent />
          </ApplicationContext.Provider>
        );
      })}
    </AnimatePresence>
  );
}

export default ApplicationsContainer;
