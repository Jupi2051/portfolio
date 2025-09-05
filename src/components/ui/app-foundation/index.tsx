import { useApplicationData } from "@/context/app-context";
import AppWindow from "@/components/windows/app-window";
import AppLoading from "./app-loading";

import React, { Suspense } from "react";
import { ReactNode } from "react";

export interface AppFoundationProps<T = Object> {
  AppId: number;
  processName: string;
  processIcon: string;
  processData: T;
  children?: ReactNode;
}

const AppFoundation = ({ App }: { App: React.FC }) => {
  const appData = useApplicationData();

  return (
    <AppWindow {...appData}>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </AppWindow>
  );
};

export default AppFoundation;
