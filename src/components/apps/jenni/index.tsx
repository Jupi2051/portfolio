import AppFoundation from "@/components/ui/app-foundation";
import Stack, { StackTool } from "@/components/ui/tools";

function Jenni() {
  return (
    <AppFoundation>
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
    </AppFoundation>
  );
}

export default Jenni;
