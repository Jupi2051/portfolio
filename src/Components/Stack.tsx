import Tool from "./Tool";
import "../Styles/Tool.css";

export enum StackTool {
    Blender,
    CSharp,
    CSS,
    Discord,
    Express,
    Git,
    HTML,
    Java,
    JS,
    Lua,
    MongoDB,
    Mono,
    MySQL,
    Nginx,
    NodeJS,
    PHP,
    PostgreSQL,
    React,
    Redux,
    Typescript,
    Ubuntu,
    Unity,
    VisualStudio,
    VsCode,
    WooCommerce,
    Wordpress,
    Bootstrap,
    Twitter,
    JSON
};

type PropTypes = {
    StackTools: StackTool[],
};

type StackToolInformation = {
    Name: string,
    IconName: string
};

export let StackDataContainer: Map<StackTool, StackToolInformation> = new Map<StackTool, StackToolInformation>();

StackDataContainer.set(StackTool.Blender, {Name: "Blender", IconName: "Blender.svg"});
StackDataContainer.set(StackTool.CSharp, {Name: "C#", IconName: "C#.svg"});
StackDataContainer.set(StackTool.CSS, {Name: "CSS", IconName: "CSS.svg"});
StackDataContainer.set(StackTool.Discord, {Name: "Discord", IconName: "Discord.svg"});
StackDataContainer.set(StackTool.Express, {Name: "ExpressJS", IconName: "Express.svg"});
StackDataContainer.set(StackTool.Git, {Name: "Git", IconName: "Git.svg"});
StackDataContainer.set(StackTool.HTML, {Name: "HTML", IconName: "HTML.svg"});
StackDataContainer.set(StackTool.Java, {Name: "Java", IconName: "Java.svg"});
StackDataContainer.set(StackTool.JS, {Name: "Javascript", IconName: "Javascript.svg"});
StackDataContainer.set(StackTool.Lua, {Name: "Lua", IconName: "Lua.svg"});
StackDataContainer.set(StackTool.Mono, {Name: "Mono", IconName: "Mono.svg"});
StackDataContainer.set(StackTool.MySQL, {Name: "MySQL", IconName: "MySQL.svg"});
StackDataContainer.set(StackTool.Nginx, {Name: "Nginx", IconName: "Nginx.svg"});
StackDataContainer.set(StackTool.PHP, {Name: "PHP", IconName: "PHP.svg"});
StackDataContainer.set(StackTool.NodeJS, {Name: "NodeJS", IconName: "NodeJS.svg"});
StackDataContainer.set(StackTool.PostgreSQL, {Name: "PostgreSQL", IconName: "PostgreSQL.svg"});
StackDataContainer.set(StackTool.React, {Name: "React", IconName: "React.svg"});
StackDataContainer.set(StackTool.Redux, {Name: "Redux", IconName: "Redux.svg"});
StackDataContainer.set(StackTool.Typescript, {Name: "Typescript", IconName: "Typescript.svg"});
StackDataContainer.set(StackTool.Ubuntu, {Name: "Ubuntu", IconName: "Ubuntu.svg"});
StackDataContainer.set(StackTool.Unity, {Name: "Unity", IconName: "Unity.svg"});
StackDataContainer.set(StackTool.VisualStudio, {Name: "Visual Studio", IconName: "VisualStudio.svg"});
StackDataContainer.set(StackTool.VsCode, {Name: "Visual Studio Code", IconName: "VsCode.svg"});
StackDataContainer.set(StackTool.WooCommerce, {Name: "WooCommerce", IconName: "WooCommerce.svg"});
StackDataContainer.set(StackTool.Wordpress, {Name: "Wordpress", IconName: "Wordpress.svg"});
StackDataContainer.set(StackTool.Bootstrap, {Name: "Bootstrap", IconName: "Bootstrap.svg"});
StackDataContainer.set(StackTool.Twitter, {Name: "Twitter", IconName: "Twitter.svg"});
StackDataContainer.set(StackTool.JSON, {Name: "JSON", IconName: "JSON.svg"});

function Stack(props: PropTypes)
{
    return(
    <div className="stack-tools-container">
        {props.StackTools.map((tool) => {
            const ToolData = StackDataContainer.get(tool);
                return ToolData? <Tool Name={ToolData.Name} Icon={ToolData.IconName} key={tool} /> : null;
            }
        )}
    </div>)
}

export default Stack;