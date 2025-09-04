import { motion } from "framer-motion";
import AppWindow from "@/components/windows/app-window";
import Stack, { StackTool } from "@/components/ui/tools";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

function Oni(Props: PropTypes) {
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
          StackTool.Bootstrap,
          StackTool.Discord,
          StackTool.Ubuntu,
          StackTool.Nginx,
          StackTool.CSharp,
          StackTool.Java,
        ]}
      />
      <iframe
        src="https://www.oniverse.xyz/"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </AppWindow>
  );
}

export default Oni;
