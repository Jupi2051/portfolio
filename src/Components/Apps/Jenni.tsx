import { motion } from "framer-motion";
import AppWindow from "@/Components/AppWindow";
import { useEffect } from "react";
import Stack, { StackTool } from "@/Components/Stack";
import Chloe from "@/Components/Chloe";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

const exitAndOpen = {
  exit: { opacity: 0 },
  init: { opacity: 1, scale: 1 },
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
