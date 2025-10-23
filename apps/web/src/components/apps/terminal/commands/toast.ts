import { CommandFunction } from "./types";

const pwd: CommandFunction = (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const deployNotification = new CustomEvent("systemNotification", {
    detail: {
      title: "Terminal",
      message: args.join(" "),
      avatar: "/Imgs/DesktopApps/Terminal.webp",
      type: "window",
      date: new Date().toISOString(),
    },
    bubbles: false,
    cancelable: true,
  });

  window.dispatchEvent(deployNotification);
};

export default pwd;
