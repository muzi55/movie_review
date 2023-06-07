document.getElementById("homeBtn").addEventListener("click", () => {
  window.location = "index.html";
});
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
console.log(movieId);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU1ZGU0NzVhM2Y4Y2M0MDU0OGQzNjljODhjMzYxNyIsInN1YiI6IjY0NzQ0YzA3OTQwOGVjMDEwMDI2MjgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tfdrAljrTuQf5RWCvFm4oahKfG5fNXCmzG-I3UKg99c",
  },
};

fetch("https://api.themoviedb.org/3/movie/" + movieId, options)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    let template = `
        <div class="movieWrapper">
            <div class="title"><h1>${res.title}</h1></div>
            <div class="genres">
            ${((item) => {
              return item
                .map((x) => `<span class="genre">${x.name}</span>`)
                .join("");
            })(res.genres)}
            </div>
            <button class="video">예고편 미리보기</button>
            <div class="overview">${res.overview}</div>
            <br/>
            <div class="rating"> ${
              "평점 : " + res.vote_average.toFixed(1)
            }</div>
        </div>
        <div class="posterWrapper">
        <img src="https://image.tmdb.org/t/p/w500${
          res.backdrop_path
        }" alt="영화 포스트">
    </div>`;
    document
      .getElementById("wrapperId")
      .insertAdjacentHTML("beforeend", template);
    console.log(template);
  });
