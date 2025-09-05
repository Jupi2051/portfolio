import AppFoundation, {
  AppFoundationProps,
} from "@/components/ui/app-foundation";
import Stack, { StackTool } from "@/components/ui/tools";

function EIEN() {
  return (
    <>
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
    </>
  );
}

export default EIEN;
