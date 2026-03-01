import { useApplicationData } from "@/context/app-context";
import AppWindow from "@/components/windows/app-window";
import AppLoading from "./app-loading";
import React, { Suspense } from "react";
import { OpenApplication } from "@/components/windows/desktop";
import { ErrorBoundary } from "react-error-boundary";
import AppCrash from "./app-crash";

export interface AppFoundationProps<T extends object = Record<string, unknown>>
  extends Omit<Omit<OpenApplication, "id">, "App"> {
  AppId: number;
  processData?: T;
}

const AppFoundation = ({ App }: { App: React.FC }) => {
  const appData = useApplicationData();

  return (
    <AppWindow {...appData}>
      <Suspense fallback={<AppLoading />}>
        <ErrorBoundary
          FallbackComponent={AppCrash}
          onError={(e, info) => {
            console.log(e);
            console.log(info);
          }}
        >
          <App />
        </ErrorBoundary>
      </Suspense>
    </AppWindow>
  );
};

export default AppFoundation;
