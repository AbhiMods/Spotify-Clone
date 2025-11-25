let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp3');
let currentSong = 1;
let volumeBar = document.getElementById('volumeBar');
let volumeIcon = document.getElementById('volumeIcon');
let searchInput = document.getElementById('searchInput');
let hamburgerMenu = document.getElementById('hamburgerMenu');
let mobileMenu = document.getElementById('mobileMenu');
let closeMenu = document.getElementById('closeMenu');
let likeBtn = document.getElementById('likeBtn');
let currentTimeDisplay = document.getElementById('currentTime');
let totalTimeDisplay = document.getElementById('totalTime');

// Songs Data
let songs = [
    { songName: 'Guitar Song 1', songDes: 'Relaxing guitar music', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Guitar Song 2', songDes: 'Acoustic vibes', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Guitar Song 3', songDes: 'Melodic tunes', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Guitar Song 4', songDes: 'Soft strings', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Guitar Song 5', songDes: 'Peaceful mind', songImage: 'Images/1.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Guitar Song 6', songDes: 'Deep focus', songImage: 'Images/2.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Guitar Song 7', songDes: 'Morning coffee', songImage: 'Images/3.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Guitar Song 8', songDes: 'Evening chill', songImage: 'Images/4.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Guitar Song 9', songDes: 'Night drive', songImage: 'Images/1.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Guitar Song 10', songDes: 'Rainy day', songImage: 'Images/2.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Guitar Song 11', songDes: 'Sunny walk', songImage: 'Images/3.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Guitar Song 12', songDes: 'Ocean breeze', songImage: 'Images/4.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Guitar Song 13', songDes: 'Mountain view', songImage: 'Images/1.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Guitar Song 14', songDes: 'City lights', songImage: 'Images/2.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Guitar Song 15', songDes: 'Forest sounds', songImage: 'Images/3.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Guitar Song 16', songDes: 'Campfire', songImage: 'Images/4.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Guitar Song 17', songDes: 'Road trip', songImage: 'Images/1.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Guitar Song 18', songDes: 'Memories', songImage: 'Images/2.jpg', songPath: 'Audio/18.mp3' }
];

let order = [...songs];
let playMusic = Array.from(document.getElementsByClassName('playMusic'));
let allMusicCards = Array.from(document.getElementsByClassName('music-card'));

// Initialize UI
function initializeUI() {
    // Update all music cards with data (if matching count)
    // Note: In a real app, we would generate these dynamically. 
    // For now, we update the existing ones in order.
    let cards = document.querySelectorAll('.music-card');
    cards.forEach((card, i) => {
        if (i < songs.length) {
            let img = card.querySelector('img');
            let title = card.querySelector('.img-title');
            let desc = card.querySelector('.img-description');
            let playBtn = card.querySelector('.playMusic');
            
            if(img) img.src = songs[i].songImage;
            if(title) title.innerText = songs[i].songName;
            if(desc) desc.innerText = songs[i].songDes;
            if(playBtn) playBtn.id = i + 1; // 1-based index for logic
        }
    });
}

initializeUI();

// Play/Pause Click
play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

// Time Update & Progress Bar
audio.addEventListener('timeupdate', () => {
    // Update Progress Bar
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressBar.value = progress;
    
    // Update Time Display
    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    currentTimeDisplay.innerText = `${currentMin}:${currentSec}`;

    let totalMin = Math.floor(audio.duration / 60);
    let totalSec = Math.floor(audio.duration % 60);
    if(totalSec < 10) totalSec = `0${totalSec}`;
    if(audio.duration) totalTimeDisplay.innerText = `${totalMin}:${totalSec}`;
});

progressBar.addEventListener('input', function () {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// Play Specific Song
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('playMusic')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('playMusic')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        let index = parseInt(e.target.id);
        currentSong = index;
        
        // Handle case where index might be out of bounds if filtered
        // For simplicity, we assume ID maps to songs array index + 1
        let songData = songs[index - 1];
        
        audio.src = songData.songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar(songData);
    })
});

// Update Player Bar Info
function updateNowBar(songData) {
    if (!songData) return;
    document.querySelector('.now-bar img').src = songData.songImage;
    document.querySelector('.img-title-info').innerText = songData.songName;
    document.querySelector('.img-des-info').innerText = songData.songDes;
    
    // Reset like button state (mock)
    likeBtn.classList.remove('active');
    likeBtn.classList.remove('fa-solid');
    likeBtn.classList.add('fa-regular');
}

// Next/Prev Logic
const playNextSong = () => {
    currentSong++;
    if (currentSong > songs.length) currentSong = 1;
    playSongByIndex(currentSong);
}

const playPrevSong = () => {
    currentSong--;
    if (currentSong < 1) currentSong = songs.length;
    playSongByIndex(currentSong);
}

function playSongByIndex(index) {
    let songData = songs[index - 1];
    audio.src = songData.songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    updateNowBar(songData);
    
    // Update play icon in list
    makeAllPlay();
    let btn = document.getElementById(index);
    if(btn) {
        btn.classList.remove('fa-circle-play');
        btn.classList.add('fa-circle-pause');
    }
}

document.getElementById('forward').addEventListener('click', playNextSong);
document.getElementById('backward').addEventListener('click', playPrevSong);
audio.addEventListener('ended', playNextSong);

// Shuffle & Repeat (Basic Logic)
let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let isShuffle = false;
let isRepeat = false;

shuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffle.classList.toggle('active');
    // Note: Real shuffle logic would reorder the 'order' array
});

repeat.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeat.classList.toggle('active');
    audio.loop = isRepeat;
});

// Volume Control
volumeBar.addEventListener('input', (e) => {
    let vol = e.target.value / 100;
    audio.volume = vol;
    if(vol === 0) {
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else {
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
});

// Search Feature
searchInput.addEventListener('keyup', () => {
    let filter = searchInput.value.toUpperCase();
    let cards = document.querySelectorAll('.music-card');
    
    cards.forEach(card => {
        let title = card.querySelector('.img-title');
        if (title) {
            let txtValue = title.textContent || title.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        }
    });
});

// Mobile Menu
hamburgerMenu.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Like Button
likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('active');
    if(likeBtn.classList.contains('active')) {
        likeBtn.classList.remove('fa-regular');
        likeBtn.classList.add('fa-solid');
    } else {
        likeBtn.classList.remove('fa-solid');
        likeBtn.classList.add('fa-regular');
    }
});
