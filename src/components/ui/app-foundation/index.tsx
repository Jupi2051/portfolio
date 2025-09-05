import AppWindow from "@/components/windows/app-window";
import { ReactNode } from "react";

export interface AppFoundationProps {
  AppId: number;
  processName: string;
  processIcon: string;
  processData: Object;
  children?: ReactNode;
}

const AppFoundation = ({ children, ...appProps }: AppFoundationProps) => {
  return <AppWindow {...appProps}>{children}</AppWindow>;
};

export default AppFoundation;
