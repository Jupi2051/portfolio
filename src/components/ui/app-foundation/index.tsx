import { useApplicationData } from "@/context/app-context";
import AppWindow from "@/components/windows/app-window";
import React from "react";
import { ReactNode } from "react";

export interface AppFoundationProps<T = Object> {
  AppId: number;
  processName: string;
  processIcon: string;
  processData: T;
  children?: ReactNode;
}

const AppFoundation = ({
  children,
}: {
  children: string | React.ReactNode;
}) => {
  const appData = useApplicationData();
  return <AppWindow {...appData}>{children}</AppWindow>;
};

export default AppFoundation;
