const electron = require('electron');
const {dialog} = electron.remote.require('electron');
const player = require('./includes/player')
const { ipcRenderer } = require('electron')
ipcRenderer.send('requireWinSize','request');

const body = 'body_wrapper';
var file_open = "open_file_btn";
var exit = "quit_btn";
var stl_chng = "change_style_btn";
var second_theme = false;

let params = {
  title : "Выбрать видео", 
  defaultPath : __dirname,
  buttonLabel : "Тык",
  filters :
  [
   {name: 'Films', extensions: ['mkv', 'avi', 'mp4']}
  ],
  properties: ['open_file','multiSelections']
 }


document.getElementById(body).style.width = ''+window.innerWidth+'px';
document.getElementById(body).style.height = ''+window.innerHeight+'px';

window.onresize=()=>
{
    document.getElementById(body).style.width = ''+window.innerWidth+'px';
    document.getElementById(body).style.height = ''+window.innerHeight+'px';
}




function onShowOpenDialog(fPathObj) 
{
    player.runVideo(fPathObj.filePaths)
    document.onfocus = true;
    
}
    
function onFileOpen(event) 
{
  dialog.showOpenDialog(params).then(function(fPathObj) 
    {
      onShowOpenDialog(fPathObj)
    });
}
    
document.getElementById(file_open).addEventListener('click',onFileOpen)


function ev_quit()
{
    ipcRenderer.sendSync('quit')
}
document.getElementById(exit).addEventListener('click',ev_quit)




function ev_stylechange()
{
    if(second_theme)
    {
      ipcRenderer.send('switch_to_first')
      second_theme=!second_theme;
    }
    else
    {
      ipcRenderer.send('switch_to_second')
      second_theme=!second_theme;
    }
}
document.getElementById(stl_chng).addEventListener('click',ev_stylechange)
