let popularmoviesdata = [{
  moviestype: "popular",
  cardimg: "assets/card images/Captain Miller.jpg",
  moviename: "captain miller",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=jnBZboK17_A",

},
{
  moviestype: "popular",
  cardimg: "assets/card images/ayalaan.jpg",
  moviename: "ayalaan",
  language: "tamil",
  certificate: "u",
  gener: "comedy",
  trailerlink: "https://www.youtube.com/watch?v=jnBZboK17_A"
}, {
  moviestype: "popular",
  cardimg: "assets/card images/kanguva.jpg",
  moviename: "kanguva",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=jnBZboK17_A"
},
{
  moviestype: "popular",
  cardimg: "assets/card images/vikram.jpg",
  moviename: "vikram",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=jnBZboK17_A"

}
]

let nowshowingdata = [{
  moviestype: "popular",
  cardimg: "assets/card images/leo.jpg",
  moviename: "leo",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=jnBZboK17_A"

},
{
  moviestype: "popular",
  cardimg: "assets/card images/mark  antony.jpg",
  moviename: "mark antony",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=jnBZboK17_A"
},
{
  moviestype: "popular",
  cardimg: "assets/card images/japan.jpg",
  moviename: "japan",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=DQ_Sp5ced6s",


},
{
  moviestype: "popular",
  cardimg: "assets/card images/thunivu.jpg",
  moviename: "thunivu",
  language: "tamil",
  certificate: "u/a",
  gener: "action",
  trailerlink: "https://www.youtube.com/watch?v=DQ_Sp5ced6s",


}
]

const cardcon = document.querySelector('.popularmovies')
const cardcon2 = document.querySelector('.nowshowing')

const postmethod = () => {
  popularmoviesdata.map((data2) => {
    const poseele = document.createElement('div');
    poseele.className = 'col-6 col-sm-6  col-lg-3 col-md-4 col-xl-3';
    poseele.innerHTML += `
    <div class="card">
    <img src="${data2.cardimg}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="titleofmovie">${data2.moviename}</p>
      <ul>
        <li>${data2.language}</li>
        <li>${data2.certificate}</li>
        <li>${data2.gener}</li>
      </ul>
      <div class="card-body-book">
        <a href=${data2.trailerlink} target="_blank"><i class="fa-solid fa-play"></i>
          trailer</a>
        <!-- Update the event listener to set the movie name -->
        <a href="Date&Time.html" onclick="setSelectedMovie('${data2.moviename}')"><i class="fa-solid fa-ticket"></i> book</a>
      </div>
    </div>
    </div>`
    cardcon.appendChild(poseele)
  })
}

postmethod();



const postmethod2 = () => {
  nowshowingdata.map((data2) => {
    const poseele = document.createElement('div');
    poseele.className = 'col-6 col-sm-6  col-lg-3 col-md-4 col-xl-3';
    poseele.innerHTML += `
    <div class="card">
    <img src="${data2.cardimg}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="titleofmovie">${data2.moviename}</p>
      <ul>
        <li>${data2.language}</li>
        <li>${data2.certificate}</li>
        <li>${data2.gener}</li>
      </ul>
      <div class="card-body-book">
        <a href=${data2.trailerlink} target="_blank"><i class="fa-solid fa-play"></i>
          trailer</a>
        <a href="Date&Time.html" onclick="setSelectedMovie('${data2.moviename}')"><i class="fa-solid fa-ticket"></i> book</a>
      </div>
    </div>
    </div>`
    cardcon2.appendChild(poseele)
  })

}

postmethod2()



let movieName; // Define movieName variable outside the function

function setSelectedMovie(movie) {
  movieName = movie; // Set the value of movieName
  localStorage.setItem("selectedMovieName", movieName);
}

console.log(movieName);