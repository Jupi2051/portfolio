import { AnimatePresence } from "framer-motion";
import { OpenApplication } from "@/components/windows/desktop";
import ApplicationContext from "@/context/app-context";
import AppFoundation from "@/components/ui/app-foundation";
import { DesktopAppsComponents } from "./apps-list";

type PropTypes = {
  OpenApplications: OpenApplication[];
};
function ApplicationsContainer({ OpenApplications }: PropTypes) {
  return (
    <AnimatePresence>
      {OpenApplications.map(({ App, id, ...openApp }) => {
        return (
          <ApplicationContext.Provider
            value={{
              AppId: id,
              processData: openApp.processData as Object,
              ...openApp,
            }}
            key={id}
          >
            <AppFoundation App={DesktopAppsComponents[App]} />
          </ApplicationContext.Provider>
        );
      })}
    </AnimatePresence>
  );
}

export default ApplicationsContainer;
