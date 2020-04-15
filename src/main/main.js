
const url = require('url');
const fs = require('fs');
const { app, BrowserWindow,ipcMain} = require('electron');

let window;


var window_width = 800;
var window_height = 500;

var currentCSS;

function createWindow()
{
    window = new BrowserWindow
    (
        {
            webPreferences: { nodeIntegration: true},
            width: window_width,
            height: window_height,
        }
    )
    window.loadURL(url.format({pathname: './src/index.html',protocol: 'file:',slashes:true}));
    window.webContents.on('did-finish-load', e => {
        fs.readFile((__dirname + '\\style.css').replace('main','css'), 'utf8', async (err, data) => {
          currentCSS = await window.webContents.insertCSS(data);
        });
      });
}

app.on('ready',createWindow);
app.on('closed',()=>{window = null;});
app.on('window-all-closed',()=>{app.quit();});

ipcMain.on('quit', (event, arg) => {
    app.quit();
  })

ipcMain.on('switch_to_second', (event, arg) => {
    window.webContents.removeInsertedCSS(currentCSS);
    fs.readFile((__dirname + '\\second_style.css').replace('main','css'), 'utf8', async (err, html) => {
      currentCSS = await window.webContents.insertCSS(html);
    });
  })
  ipcMain.on('switch_to_first', (event, arg) => {
    window.webContents.removeInsertedCSS(currentCSS);
    fs.readFile((__dirname + '\\style.css').replace('main','css'), 'utf8', async (err, html) => {
      currentCSS = await window.webContents.insertCSS(html);
    });
  })

