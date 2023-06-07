window.addEventListener("load", () => {
  if (sessionStorage.getItem("likes") == null) {
    sessionStorage.setItem("likes", JSON.stringify([]));
  }
  const handleLocationChange = (e) => {
    const { href } = e.detail;
    console.log(href);
    //* 주소변경
    window.history.pushState(undefined, "타이틀", href);
    renderContents();
  };

  //* locationchange 이벤트리스너
  window.addEventListener("locationchange", handleLocationChange);

  // road focus
  window.onload = function () {
    el("#search").focus();
  };

  // 선택자 함수
  function els(selector, context) {
    if (typeof selector !== "string" || selector.trim().length === 0) {
      return null;
    }
    context = !context ? document : context.nodeType === 1 ? context : el(String(context));
    return context.querySelectorAll(selector);
  }

  function el(selector, context) {
    if (typeof selector !== "string" || selector.trim().length === 0) {
      return null;
    }
    context = !context ? document : context.nodeType === 1 ? context : el(String(context));
    return context.querySelector(selector);
  }

  // api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU1ZGU0NzVhM2Y4Y2M0MDU0OGQzNjljODhjMzYxNyIsInN1YiI6IjY0NzQ0YzA3OTQwOGVjMDEwMDI2MjgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tfdrAljrTuQf5RWCvFm4oahKfG5fNXCmzG-I3UKg99c",
    },
  };

  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      let movies = response.results;
      let likes = JSON.parse(sessionStorage.getItem("likes"));
      let likes_wrap = document.querySelector(".likes_wrap");
      // els(".movie_cards ul li").forEach((li) => li.remove());
      likes.forEach((likeMovie) => {
        let like_movie = movies.filter((movie) => movie.id == likeMovie);
        console.log(like_movie);
        let template = `<a href="detail.html?id=${likeMovie}"><li class="likeMovie">${like_movie[0].title}</li></a>`;
        likes_wrap.insertAdjacentHTML("beforeend", template);
      });
      for (let i = 0; i < movies.length; i++) {
        let template = `
      <li>
        <p class="rank">${movies[i].vote_average}</p>
          <div class="movie_img">
            <img src="https://image.tmdb.org/t/p/w300${movies[i].backdrop_path}" alt="영화 포스트">
          </div>
          <h3>${movies[i].title}</h3>
        <p class="description">${movies[i].overview}</p>
      </li>
      `;
        // <div class="movie_img" style=
        // "background: url('https://image.tmdb.org/t/p/w300${movies[i].backdrop_path}') bottom center"
        // "background-size="cover"></div>

        el(".movie_cards ul").insertAdjacentHTML("beforeend", template);

        els(".movie_cards ul li")[i].addEventListener("click", () => {
          window.location.href = `detail.html?id=${movies[i].id}`;
        });
      }

      // 영화 평균점수
      average_rating = [];
      movies.forEach((e) => {
        average_rating.push(e.vote_average);
        return average_rating;
      });

      const avg = average_rating.reduce((accumulator, current, index, array) => {
        return index === array.length - 1 ? (accumulator + current) / array.length : accumulator + current;
      }, 0);
      el(".last_activity ul li:nth-child(1)").innerText = `영화 평균 점수 ${avg}`;
    })

    .catch((err) => console.error(err));

  // 검색
  function search_Event() {
    let input, filter, ul, li, h3, txtValue;
    input = el("#search");

    filter = input.value.toUpperCase();
    ul = el(".movie_cards ul");
    li = els(".movie_cards ul li");

    for (let i = 0; i < li.length; i++) {
      h3 = els(".movie_cards h3")[i];
      txtValue = h3.textContent || h3.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        continue;
      }
      li[i].style.display = "none";
    }
  }

  el("#search").addEventListener("keyup", search_Event);

  el("#search_bar button").addEventListener("click", (event) => {
    event.preventDefault();
    search_Event();
  });
});

//페이지 상단이동
const $topBtn = document.querySelector(".moveTopBtn");

$topBtn.onclick = () => {
  // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
  window.scrollTo({ top: 0, behavior: "smooth" });
};
