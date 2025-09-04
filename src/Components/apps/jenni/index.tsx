import { motion } from "framer-motion";
import AppWindow from "@/components/windows/app-window";
import { useEffect } from "react";
import Stack, { StackTool } from "@/components/ui/tools";
import Chloe from "@/components/ui/chloe";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

function Jenni(Props: PropTypes) {
  return (
    <AppWindow
      AppId={Props.AppId}
      processIcon={Props.processIcon}
      processName={Props.processName}
    >
      <Stack
        StackTools={[
          StackTool.HTML,
          StackTool.CSS,
          StackTool.JS,
          StackTool.Express,
          StackTool.Discord,
          StackTool.NodeJS,
          StackTool.Ubuntu,
          StackTool.Nginx,
          StackTool.JSON,
        ]}
      />
      <iframe
        src="https://www.jennixdraws.com/"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </AppWindow>
  );
}

export default Jenni;
