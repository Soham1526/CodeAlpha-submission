const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const cover = document.getElementById("cover");

let songs = [
  { title: "Track 1", artist: "Artist A", src: "songs/song1.mp3", cover: "covers/cover1.jpg" },
  { title: "Track 2", artist: "Artist B", src: "songs/song2.mp3", cover: "covers/cover2.jpg" },
  { title: "Track 3", artist: "Artist C", src: "songs/song3.mp3", cover: "covers/cover3.jpg" }
];

let songIndex = 0;
let isPlaying = false;

// Load playlist
songs.forEach((song, index) => {
  let li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  playlistEl.appendChild(li);
});

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
  highlightActiveSong();
}

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
  cover.classList.add("playing");
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
  cover.classList.remove("playing");
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  if (!isNaN(duration)) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60).toString().padStart(2, "0");
    currentTimeEl.textContent = `${currentMin}:${currentSec}`;

    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60).toString().padStart(2, "0");
    durationEl.textContent = `${durationMin}:${durationSec}`;
  }
});

// Click on progress bar
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Highlight active song
function highlightActiveSong() {
  let allSongs = document.querySelectorAll("#playlist li");
  allSongs.forEach((li, index) => {
    li.classList.toggle("active", index === songIndex);
  });
}

// Button events
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Init
loadSong(songs[songIndex]);
