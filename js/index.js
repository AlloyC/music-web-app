let topArtist = [
  {
    id: 1,
    img: "./images/Beyonce.webp",
    name: "Beyonce",
    song: "Renaissance",
  },
  {
    id: 2,
    img: "./images/bts.jpg",
    name: "BTS",
    song: "Yet to Come",
  },
  {
    id: 3,
    img: "./images/Dua-Lipa.webp",
    name: "Dua Lipa",
    song: "Under the Lights",
  },
  {
    id: 4,
    img: "./images/the-weeknd.jpg",
    name: "The Weeknd",
    song: "Out of Time",
  },
  {
    id: 5,
    img: "./images/taylor-swift.webp",
    name: "Taylor Swift",
    song: "Carolina",
  },
  {
    id: 6,
    img: "./images/Burna-boy.webp",
    name: "Burna Boy",
    song: "Last Last",
  },
];

const artistList = document.getElementById("horizontal-scroll");
const artistImg = document.getElementById("artists-img");
const artistTitle = document.getElementById("artist-song-title");
const artistName = document.getElementById("artist-name");
const songs = document.getElementById("songs");
const songImg = document.getElementById("song-img");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const shuffle = document.getElementById("shuffle");
const prev = document.getElementById("prev-btn");
const play = document.getElementById("play-btn");
const next = document.getElementById("next-btn");
const repeat = document.getElementById("repeat");
const duration = document.getElementById("total-duration");
const timePlayed = document.getElementById("time-played");
const playToggle = document.getElementById("play/pause-img");
const audio = document.querySelector("audio");
const songList = document.querySelector("#container");
const showAll = document.querySelector("#show");
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const navMenu = document.querySelector(".navigation");
const body = document.querySelector("body");
let datumId = [];
let audioSrc = [];
let datumImg = [];
let playing = false;
let selected = false;
let looping = false;
let shuffleOn = false;
let lastPlayed;
let activeIndex;

topArtist.forEach((eachArtist) => {
  artistList.innerHTML += `
  <div class="horizontal-scroll-content">
            <img id="artists-${eachArtist.id}" src="${eachArtist.img}" alt="" />
            <h3 id="artist-song-title-${eachArtist.id}">${eachArtist.song}</h3>
            <p id="artist-name-${eachArtist.id}">${eachArtist.name}</p>
          </div>`;
});

fetch("js/songs.json")
  .then((res) => res.json())
  .then((data) => {
  audio.src = data[0].src;
    data.forEach((datum) => {
      songs.innerHTML += `<li>
          <a id="${datum.id}" class="song" href="#">
              <h3 id="${datum.id}-num" class="number | cl-gray">${datum.id}</h3>
              <h3 id="${datum.id}-title" class="title | cl-gray">${datum.title}</h3>
              <h3 id="${datum.id}-artist" class="artist | cl-gray">${datum.artist}</h3>
              <h3 id="${datum.id}-time" class="time | cl-gray">${datum.duration}</h3>
              <img id="network-img" class="icon" src="./images/icons8-signal-100.png" alt="" />
            </a>
            </li>`;
      datumId.push(datum.id);
      audioSrc.push(datum.src);
      datumImg.push(datum.img);

      //LISTENING FOR CLICK
      datumId.forEach((datumArr) => {
        document
          .getElementById(datumArr)
          .addEventListener("click", function changeSong(e) {
            e.preventDefault();
            // toggling active class (highlighting the clicked/ currently playing song)
            datumId.forEach((datum) => {
              document.getElementById(datum).classList.remove("active");
              document.getElementById(datum + "-num").innerHTML = datum;
            });
            document.getElementById(datumArr).classList.add("active");

            // changing number to speaker icon
            document.getElementById(
              datumArr + "-num"
            ).innerHTML = `<img class="icon" src="./images/icons8-speaker-24.png" alt="" />`;
            // changing song title, artist and duration in now playing card
            songImg.src = datumImg[parseInt(datumArr) - 1];
            songTitle.innerText = document.getElementById(
              datumArr + "-title"
            ).innerText;

            artist.innerText = document.getElementById(
              datumArr + "-artist"
            ).innerText;

            duration.innerText = document.getElementById(
              datumArr + "-time"
            ).innerText;
            // setting audio src to selected song and calling pausePlay function
            audio.src = audioSrc[parseInt(datumArr) - 1];
            selected = true;
            playing = false;
            pausePlay();
          });
      });
      //console.log( datumId[1]);
    });
    play.addEventListener("click", pausePlay);
    //NEXT BTN
    next.addEventListener("click", nextSong);
    // PREV BTN
    prev.addEventListener("click", () => {
      let activeIdArray = [];
      let activeId;
      let activBool = false;

      datumId.forEach((data) => {
        activeIdArray.push(
          document.getElementById(data).classList.contains("active")
        );
        if (document.getElementById(data).classList.contains("active")) {
          activeId = data;
          activBool = true;
        }
      });
      let activeIndex = activeIdArray.findIndex((bool) => bool == activBool);

      if (activeIndex <= 0) {
        activeIndex = activeIdArray.length;
      }
      audio.src = audioSrc[activeIndex - 1];
      selected = true;
      playing = false;
      pausePlay();
      // toggling active class (highlighting the clicked/ currently playing song)
      datumId.forEach((datumArr) => {
        document.getElementById(datumArr).classList.remove("active");
        document.getElementById(datumArr + "-num").innerHTML = datumArr;
      });
      if (activeIndex >= 10) {
        activeIndexId = "" + activeIndex;
      } else {
        activeIndexId = "0" + activeIndex;
      }
      document.getElementById(activeIndexId).classList.add("active");
      document.getElementById(
        activeIndexId + "-num"
      ).innerHTML = `<img class="icon" src="./images/icons8-speaker-24.png" alt="" />`;

      // changing song title, artist and duration in now playing card
      songImg.src = datumImg[activeIndex - 1];
      songTitle.innerText = document.getElementById(
        activeIndexId + "-title"
      ).innerText;

      artist.innerText = document.getElementById(
        activeIndexId + "-artist"
      ).innerText;

      duration.innerText = document.getElementById(
        activeIndexId + "-time"
      ).innerText;
    });
    audio.load()
  });

function nextSong() {
  let activeIdArray = [];
  let activeId;
  let activBool = false;

  datumId.forEach((data) => {
    activeIdArray.push(
      document.getElementById(data).classList.contains("active")
    );
    if (document.getElementById(data).classList.contains("active")) {
      activeId = data;
      activBool = true;
    }
  });
  if (shuffleOn) {
    shuffling();
  } else {
    activeIndex = activeIdArray.findIndex((bool) => bool == activBool);
    activeIndex++;
  }
  if (activeIndex > activeIdArray.length - 1) {
    activeIndex = 0;
  }
  console.log(activeIndex);
  audio.src = audioSrc[activeIndex];
  selected = true;
  playing = false;
  pausePlay();
  // toggling active class (highlighting the clicked/ currently playing song)
  datumId.forEach((datumArr) => {
    document.getElementById(datumArr).classList.remove("active");
    document.getElementById(datumArr + "-num").innerHTML = datumArr;
  });
  if (activeIndex >= 10) {
    activeIndexId = "" + (activeIndex + 1);
  } else {
    activeIndex + 1 > 9
      ? (activeIndexId = "" + (activeIndex + 1))
      : (activeIndexId = "0" + (activeIndex + 1));
  }
  document.getElementById(activeIndexId).classList.add("active");
  document.getElementById(
    activeIndexId + "-num"
  ).innerHTML = `<img class="icon" src="./images/icons8-speaker-24.png" alt="" />`;
  lastPlayed = activeIndex;

  // changing song title, artist and duration in now playing card
  songImg.src = datumImg[activeIndex]
  songTitle.innerText = document.getElementById(
    activeIndexId + "-title"
  ).innerText;

  artist.innerText = document.getElementById(
    activeIndexId + "-artist"
  ).innerText;

  duration.innerText = document.getElementById(
    activeIndexId + "-time"
  ).innerText;
}

//PLAYING SELECTED AND HIGHLIGHTING SELECTED SONG FUNCTION

// PAUSE AND PLAY FUNCTION
function pausePlay() {
  if (playing == false && selected) {
    playing = true;
    audio.play();
    playToggle.src = "./images/icons8-pause-50.png";
      if (audio.network == 1) {
        
      duration.innerText =
        Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
      }
  } else if (playing == true && selected) {
    playing = false;
    audio.pause();
    playToggle.src = "./images/icons8-play-50.png";
  }
}

//console.log(audio.ended);
// UPDATING TIME PLAYED AND PROGRESS BAR
audio.addEventListener("timeupdate", (e) => {
  progressBar.addEventListener("click", (e) => {
    console.log(e);
    const width = e.target.offsetWidth;
    const clickX = e.offsetX;
    const Songduration = Math.floor(audio.duration);
    audio.currentTime = (clickX / width) * Songduration;
  });

  let rest = e.target.duration - e.target.currentTime;
  progress.style.left = `calc(
    ${(e.target.currentTime / e.target.duration) * 100}% - 4px )`;

  if (rest < 10) {
    let output = "- " + 0 + ":0" + Math.floor(rest);
    timePlayed.innerText = output;
  } else if (Math.floor(rest % 60) < 10) {
    timePlayed.innerText =
      "- " + (Math.floor(rest / 60) + ":0" + Math.floor(rest % 60));
  } else {
    let output = "- " + Math.floor(rest / 60) + ":" + Math.floor(rest % 60);
    if (rest < e.target.duration) {
      timePlayed.innerText = output;
    }
  }

  if (audio.ended) {
    playing = false;
    audio.pause();
    playToggle.src = "../images/icons8-play-50.png";
    nextSong();
  }
});

// LOOP SONG
repeat.addEventListener("click", () => {
 console.log(audio);
  if (looping == false) {
    audio.loop = true;
    document.getElementById("repeat-img").src =
      "./images/icons8-repeat-one-32.png";
    looping = true;
  } else {
    audio.loop = false;
    looping = false;
    document.getElementById("repeat-img").src = "./images/icons8-repeat-24.png";
  }
});
//SHUFFLE
shuffle.addEventListener("click", () => {
  if (shuffleOn == false) {
    shuffle.style.border = `2px solid goldenrod`;
    shuffle.style.borderRadius = `4px`;
    shuffle.style.transform = "scale(1.2)";
    shuffleOn = true;
  } else {
    shuffle.style.border = "none";
    shuffle.style.borderRadius = "0";
    shuffle.style.transform = "scale(1)";
    shuffleOn = false;
  }
});
function shuffling() {
  if (shuffleOn) {
    let random = {};
    random[0] = Math.floor(Math.random() * datumId.length);
    JSON.parse(JSON.stringify(random));
    console.log(random[0]);
    if (random[0] == lastPlayed) {
      random[0] + 1 == datumId.length
        ? (activeIndex = random[0] - 1)
        : (activeIndex = random[0] + 1);
      console.log("single");
    } else {
      activeIndex = random[0];
    }
  }
  //console.log(activeIndex);
}

show.addEventListener("click", () => {
  if (show.classList.contains("showing") == false) {
    container.style.height = "max-content";
    show.style.transform = "scale(1.2)";
    show.style.border = "1px solid goldenrod";
    show.style.borderRadius = "5px";
    show.classList.add("showing");
  } else {
    container.style.height = "280px";
    show.style.transform = "scale(1)";
    show.style.border = "none";
    show.style.borderRadius = "5px";
    show.classList.remove("showing");
  }
});

// HAMBURGER FUNCTIONALITY
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("activate");
  navMenu.classList.toggle("activate");
  overlay.classList.toggle("activate");
});

overlay.addEventListener("click", () => {
  hamburger.classList.toggle("activate");
  navMenu.classList.toggle("activate");
  overlay.classList.remove("activate");
});

