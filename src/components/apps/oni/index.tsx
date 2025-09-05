import AppFoundation from "@/components/ui/app-foundation";
import Stack, { StackTool } from "@/components/ui/tools";

function Oni() {
  return (
    <>
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
    </>
  );
}

export default Oni;
