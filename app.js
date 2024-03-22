const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    const timeSelect = document.querySelectorAll('.time-select button');
    const sounds = document.querySelectorAll('.sound-picker button');
    const timeDisplay = document.querySelector('.time-display');
    const outlineLength = outline.getTotalLength();

    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            play.src ='./svg/pause.svg';
            video.play();
        }else{
            song.pause();
            play.src ='./svg/play.svg';
            video.pause();
        }
    };
    
    //animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed =fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >=fakeDuration){
            song.pause();
            song.currentTime=0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };

    
};

app();