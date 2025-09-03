import { motion } from "framer-motion";
import AppWindow from "@/Components/AppWindow";
import Stack, { StackTool } from "@/Components/Stack";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

function GalaxyGym(Props: PropTypes) {
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
          StackTool.Express,
          StackTool.Nginx,
          StackTool.React,
          StackTool.Redux,
          StackTool.PostgreSQL,
          StackTool.VsCode,
          StackTool.Typescript,
          StackTool.Ubuntu,
          StackTool.NodeJS,
        ]}
      />
      <iframe
        src="https://www.galaxygym.eu/"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </AppWindow>
  );
}

export default GalaxyGym;
