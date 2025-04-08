const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const volumeSlider = player.querySelector('input[name="volume"]');
const speedSlider = player.querySelector('input[name="playbackSpeed"]');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleVolume() {
  video.volume = this.value;
}

function handleSpeed() {
  video.playbackRate = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
volumeSlider.addEventListener('input', handleVolume);
speedSlider.addEventListener('input', handleSpeed);
progress.addEventListener('click', scrub);
