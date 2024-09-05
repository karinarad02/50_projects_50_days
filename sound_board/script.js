const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];

sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    
    btn.innerText = sound;
    
    btn.addEventListener('click', () => {
        stopSongs();
    
        document.getElementById(sound).play();
    });
    
    document.getElementById('buttons').appendChild(btn);
});

function stopSongs() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound);
    
        song.pause();
        song.currentTime = 0;
        //we pause and reset the time to 0 so that when we click on a button, the sound will play from the beginning
    });
}