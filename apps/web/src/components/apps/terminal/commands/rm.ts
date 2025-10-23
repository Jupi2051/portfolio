import { CommandFunction } from "./types";

const fakeFilesToDelete = [
  // Desktop items
  "C:\\Users\\User\\Desktop\\Home",
  "C:\\Users\\User\\Desktop\\Projects",
  "C:\\Users\\User\\Desktop\\Pinboard",
  "C:\\Users\\User\\Desktop\\Blog",
  "C:\\Users\\User\\Desktop\\Controls",
  "C:\\Users\\User\\Desktop\\Recycle Bin",
  "C:\\Users\\User\\Desktop\\Terminal",
  "C:\\Users\\User\\Desktop\\Documents",
  "C:\\Users\\User\\Desktop\\Pictures",
  "C:\\Users\\User\\Desktop\\Music",
  "C:\\Users\\User\\Desktop\\Videos",
  "C:\\Users\\User\\Desktop\\Downloads",

  // Database files
  "C:\\Program Files\\PostgreSQL\\data\\postgresql.conf",
  "C:\\Program Files\\PostgreSQL\\data\\pg_hba.conf",
  "C:\\Program Files\\PostgreSQL\\data\\base\\16384",
  "C:\\Program Files\\PostgreSQL\\data\\base\\16385",
  "C:\\Program Files\\MySQL\\data\\ibdata1",
  "C:\\Program Files\\MySQL\\data\\mysql\\user.MYD",
  "C:\\Program Files\\MySQL\\data\\mysql\\user.MYI",
  "C:\\Program Files\\MySQL\\data\\performance_schema\\db.MYD",
  "C:\\Users\\User\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\History",
  "C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cookies",
  "C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data",
  "C:\\Users\\User\\AppData\\Local\\Mozilla\\Firefox\\Profiles\\default\\places.sqlite",

  // Development files
  "C:\\Users\\User\\Documents\\project\\node_modules",
  "C:\\Users\\User\\Documents\\project\\package-lock.json",
  "C:\\Users\\User\\Documents\\project\\dist",
  "C:\\Users\\User\\Documents\\project\\.git",
  "C:\\Users\\User\\Documents\\project\\src\\index.js",
  "C:\\Users\\User\\Documents\\project\\README.md",
  "C:\\Users\\User\\Documents\\project\\tsconfig.json",
  "C:\\Users\\User\\Documents\\project\\webpack.config.js",
  "C:\\Users\\Users\\Documents\\portfolio\\apps\\web\\src\\components\\apps\\terminal\\commands\\rm.ts",
  "C:\\Users\\User\\Documents\\portfolio\\apps\\web\\src\\components\\apps\\terminal\\commands\\reboot.ts",
  "C:\\Users\\User\\Documents\\portfolio\\apps\\web\\src\\components\\apps\\terminal\\commands\\index.ts",

  // System files
  "C:\\Windows\\System32\\ntoskrnl.exe",
  "C:\\Windows\\System32\\hal.dll",
  "C:\\Windows\\System32\\kernel32.dll",
  "C:\\Windows\\System32\\explorer.exe",
  "C:\\Windows\\System32\\cmd.exe",
  "C:\\Windows\\System32\\powershell.exe",
  "C:\\Windows\\System32\\notepad.exe",
  "C:\\Windows\\System32\\calc.exe",
  "C:\\Windows\\System32\\mspaint.exe",
  "C:\\Windows\\System32\\taskmgr.exe",
  "C:\\Windows\\System32\\regedit.exe",
  "C:\\Windows\\System32\\services.exe",
  "C:\\Windows\\System32\\lsass.exe",
  "C:\\Windows\\System32\\svchost.exe",
  "C:\\Windows\\System32\\winlogon.exe",

  // User files
  "C:\\Users\\User\\Documents\\important_document.pdf",
  "C:\\Users\\User\\Documents\\resume.docx",
  "C:\\Users\\User\\Documents\\budget.xlsx",
  "C:\\Users\\User\\Documents\\notes.txt",
  "C:\\Users\\User\\Pictures\\vacation_photos.jpg",
  "C:\\Users\\User\\Pictures\\family_portrait.png",
  "C:\\Users\\User\\Pictures\\screenshot.png",
  "C:\\Users\\User\\Music\\favorite_song.mp3",
  "C:\\Users\\User\\Music\\playlist.m3u",
  "C:\\Users\\User\\Downloads\\setup.exe",
  "C:\\Users\\User\\Downloads\\document.pdf",
  "C:\\Users\\User\\Downloads\\image.jpg",
  "C:\\Users\\User\\Desktop\\shortcut.lnk",
  "C:\\Users\\User\\Desktop\\game_shortcut.lnk",

  // Application files
  "C:\\Program Files\\Microsoft Office\\Office16\\WINWORD.EXE",
  "C:\\Program Files\\Microsoft Office\\Office16\\EXCEL.EXE",
  "C:\\Program Files\\Microsoft Office\\Office16\\POWERPNT.EXE",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
  "C:\\Program Files\\Steam\\steam.exe",
  "C:\\Program Files\\Discord\\Discord.exe",
  "C:\\Program Files\\Spotify\\Spotify.exe",
  "C:\\Program Files\\VLC\\vlc.exe",
  "C:\\Program Files\\WinRAR\\WinRAR.exe",
  "C:\\Program Files\\7-Zip\\7zFM.exe",
  "C:\\Program Files\\Notepad++\\notepad++.exe",
  "C:\\Program Files\\Git\\bin\\git.exe",
  "C:\\Program Files\\Node.js\\node.exe",
  "C:\\Program Files\\Python\\python.exe",

  // Temporary files
  "C:\\Windows\\Temp\\temp_file.tmp",
  "C:\\Windows\\Temp\\cache.tmp",
  "C:\\Users\\User\\AppData\\Local\\Temp\\cache.dat",
  "C:\\Users\\User\\AppData\\Local\\Temp\\log.txt",
  "C:\\Users\\User\\AppData\\Local\\Temp\\installer.tmp",
  "C:\\Users\\User\\AppData\\Local\\Temp\\browser_cache.tmp",
];

const rm: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  if (args.length === 0) {
    outputToTerminal("Usage: rm <file>");
  } else if (
    args.includes("-rf") &&
    (args.includes("/") ||
      args.includes("\\") ||
      args.includes(":") ||
      args.includes("*") ||
      args.includes("."))
  ) {
    // Get all files to delete with realistic delays for dangerous operations
    const shuffledFiles = [...fakeFilesToDelete].sort(
      () => Math.random() - 0.5
    );
    const filesToDelete = shuffledFiles;

    outputToTerminal(`Removing ${filesToDelete.length} files recursively...`);

    for (let i = 0; i < filesToDelete.length; i++) {
      const file = filesToDelete[i];

      outputToTerminal(`Removing: ${file}`);

      // 50/50 chance of having a delay
      if (Math.random() < 0.5) {
        const delay = Math.random() * 50 + 10; // Random delay between 10-60ms
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    outputToTerminal(`Successfully removed ${filesToDelete.length} files`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    outputToTerminal(
      `Just kidding! No files were actually removed :D but Why would you even do such an evil thing? Do you know how much time and effort I put into this?`
    );
  } else {
    // Simple removal for regular rm command
    outputToTerminal(`Removing file: ${args.join(" ")}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    outputToTerminal(`Removed ${args.length} files successfully`);
  }
};

export default rm;
