import { motion } from "framer-motion";
import AppWindow from "@/Components/AppWindow";
import { useEffect } from "react";
import Stack, { StackTool } from "@/Components/Stack";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
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
