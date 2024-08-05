//i have to initiliz this project wwith my git repository for the electron forge import to work
const { app, BrowserWindow, Menu } = require("electron");
const { ipcMain } = require("electron/main");
const path = require("node:path");
const isMac = process.platform === "darwin";

const menuItems = [
  {
    label: "About",
    submenu: [
      {
        role: "about",
      },
      {
        type: "separator",
      },
      {
        role: "services",
      },
    ],
  },
  {
    label: "App",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  {
    label: "Dimension",
    submenu: [
      { role: "minimize" },
      { role: "togglefullscreen" },
      { role: "zoomin" },
      { role: "zoomout" },
    ],
  },
  {
    label: "Developer",
    submenu: [
      {
        label: "About developer",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
  {
    label: "Camera",
    submenu: [
      {
        label: "Open system camera",
        click: () => {
          const win2 = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
            webPreferences: {
              preload: path.join(__dirname, "preload.js"),
            },
          });
          win2.loadFile("newWindow.html");
          win2.once("ready-to-show", () => {
            win2.show();
          });
          ipcMain.on('quitWindow',()=>{
            win2.close()
          });
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });
  win.loadFile("index.html");
  ipcMain.on("sendURL", (event, data) => {
    win.webContents.send("receivedURL", data);
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
