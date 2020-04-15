const Video = "video";
const run_btn = "play_stop";
const duration_bar = "progress_bar";
const volume_ctrl = "volume_bar";
const full_size_btn = "fullscrn";
const play_speed = "video_speed";
const name_place = "name_area";
var active = false;
var video_duration;
var concat_mass =[];
var video_name;




function loadVideo(vidPath)
{
    
    document.getElementById(Video).src = vidPath;
    document.getElementById(Video).load();
    active = false
    video_duration = document.getElementById(Video).duration;
    document.getElementById(duration_bar).value = 0;
    document.getElementById(duration_bar).max = video_duration;
    document.getElementById(duration_bar).step = video_duration/100;
    document.getElementById(volume_ctrl).max = 1;
    document.getElementById(volume_ctrl).step = 0.01;
    document.getElementById(Video).volume = document.getElementById(volume_ctrl).value;
}


function ev_video_play()
{
    video_duration = document.getElementById(Video).duration;
    document.getElementById(duration_bar).max = video_duration;
    document.getElementById(duration_bar).step = video_duration/100;
    document.getElementById(volume_ctrl).max = 1;
    document.getElementById(volume_ctrl).step = 0.01;
    document.getElementById(Video).volume = document.getElementById(volume_ctrl).value;
    concat_mass = document.getElementById(Video).src.split('/');
    video_name = concat_mass[concat_mass.length-1];
    document.getElementById(name_place).hidden = false;
    document.getElementById(name_place).textContent = video_name;
}

document.getElementById(Video).addEventListener('canplaythrough',ev_video_play)


function ev_play()
{
    if(active)
    {
        document.getElementById(run_btn).className = 'ctrls play';
        document.getElementById(Video).pause();
    }
    else
    {
        document.getElementById(run_btn).className = 'ctrls pause';
        document.getElementById(Video).play();
    }
    active=!active;
}

document.getElementById(run_btn).addEventListener('click',ev_play)


function ev_change_speed(event)
{
    switch(event.target.value)
    {
        case '2':
            document.getElementById(Video).playbackRate = 2;
            break;
        case '1.5':
            document.getElementById(Video).playbackRate = 1.5;
            break;
        case '1':
            document.getElementById(Video).playbackRate = 1;
            break;
        case '0.5':
            document.getElementById(Video).playbackRate = 0.5;
            break;
        case '0.25':
            document.getElementById(Video).playbackRate = 0.25;
            break;
    }
}
document.getElementById(play_speed).addEventListener('change',ev_change_speed)


function ev_full_screen()
{
    document.getElementById(Video).requestFullscreen();
}
document.getElementById(full_size_btn).addEventListener('click',ev_full_screen)


function  ev_volume_change(event)
{
    document.getElementById(Video).volume = event.target.value;
}

document.getElementById(volume_ctrl).addEventListener('input',ev_volume_change)



function ev_seek_bar_play()
{
    if(active)
    {
        document.getElementById(Video).play();
    }
}
document.getElementById(duration_bar).addEventListener('mouseup',ev_seek_bar_play)


function ev_seek_bar_pause()
{
    if(active)
    {
        document.getElementById(Video).pause();
    }
}
document.getElementById(duration_bar).addEventListener('mousedown',ev_seek_bar_pause)

function ev_go_to_time(event)
{
    document.getElementById(Video).currentTime = event.target.value;
    if(active)
    {
        document.getElementById(Video).play();
    }
}
document.getElementById(duration_bar).addEventListener('change',ev_go_to_time)


function ev_update_time()
{
    document.getElementById(duration_bar).value = document.getElementById(Video).currentTime;
}
document.getElementById(Video).addEventListener('timeupdate', ev_update_time)



module.exports = 
{
    runVideo: loadVideo
}