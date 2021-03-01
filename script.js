const loginContainer = document.getElementById('js-login-container');
const loginButton = document.getElementById('js-btn-login');
const container = document.querySelector('.container');
const card = document.querySelector('.card');

const img = document.querySelector('.playing_img');
const song = document.querySelector('.now-playing__name');
const artist = document.querySelector('.now-playing__artist');
const status = document.querySelector('.now-playing__status');
const progressbar = document.querySelector('.progress__bar');
const background = document.querySelector('.background');

const spotifyPlayer = new SpotifyPlayer();

/**********************  Update Player  ********************/
spotifyPlayer.on('update', (response) => {
  img.src = response.item.album.images[0].url;
  song.textContent = response.item.name;
  artist.textContent = response.item.artists[0].name;
  status.textContent = response.is_playing ? 'Playing' : 'Paused';
  progressbar.style = `width: ${response.progress_ms * 100 / response.item.duration_ms}%`;
  background.style = `background-image:url(${response.item.album.images[0].url})`
});


/**********************  Handle Login  ********************/
spotifyPlayer.on('login', user => {
  if (user === null) {
    loginContainer.style.display = 'flex';
    container.style.display = 'none';
  } else {
    loginContainer.style.display = 'none';
    container.style.display = 'flex';
  }
});

loginButton.addEventListener('click', () => {
  spotifyPlayer.login();
});

spotifyPlayer.init();

/**********************  Animation  ********************/

//Moving Animation
container.addEventListener("mousemove", (e) => {
  console.log("hi");
  let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

//Animate In
container.addEventListener("mouseenter", (e) => {
  card.style.transition = "none";
});

//Animate Out
container.addEventListener("mouseleave", (e) => {
  card.style.transition = "all 0.5s ease"
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
