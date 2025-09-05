import { motion } from "framer-motion";
import AppFoundation from "@/components/ui/app-foundation";
import { useEffect } from "react";
import Stack, { StackTool } from "@/components/ui/tools";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

function EIEN(Props: PropTypes) {
  return (
    <AppFoundation
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
    </AppFoundation>
  );
}

export default EIEN;
