import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useEffect } from "react";
import Stack, { StackTool } from "../Stack";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

const exitAndOpen = {
  exit: { opacity: 0 },
  init: { opacity: 1, scale: 1 },
};

function EIEN(Props: PropTypes) {
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
          StackTool.NodeJS,
          StackTool.Nginx,
          StackTool.Twitter,
          StackTool.VsCode,
          StackTool.Git,
        ]}
      />
      <iframe
        src="https://www.eien-project.com/"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </AppWindow>
  );
}

export default EIEN;
