import Stack, { StackTool } from "@/components/ui/tools";

function GalaxyGym() {
  return (
    <>
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
    </>
  );
}

export default GalaxyGym;
