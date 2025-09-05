// context/ApplicationContext.tsx
import { createContext, useContext } from "react";
import { AppFoundationProps } from "@/components/ui/app-foundation";

const ApplicationContext = createContext<
  AppFoundationProps<Object> | undefined
>(undefined);

export const useApplicationData = <T = Object>() => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationProvider"
    );
  }
  return context as AppFoundationProps<T>;
};

export default ApplicationContext;
