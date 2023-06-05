const user_id = document.querySelector("#user-name");
const user_pass = document.querySelector("#user-pass");
const user_text = document.querySelector("#reply-form-textarea");
const user_btn = document.querySelector("#up_review");
const user_day = document.querySelector('[datetime="2023-06-05T00:55:38.000Z"]');

// 로칼스토리지에서 가져와서 뿌려주기
let localArr = [];
const comment_ul = document.querySelector(".comment-item");

for (let i = 0; i < window.localStorage.length; i++) {
  const movie_reviews = localStorage.getItem(window.localStorage.key(i));

  localArr.push(movie_reviews.split(","));
}

// local 아이템 정렬
localArr = localArr.sort(function compare(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});

// 댓글 리스트 뿌려주기
localArr.forEach((e) => {
  e.join().split(",");
  const template = `
    <li>
        <div class="content">
            <div class="info-row df">
            <span class="user-info">${e[3]}</span>
            <div class="right">
                <time class="review_time" datetime="${e[0]}">${e[0]}</time>
                <a class="review-modify" href="#">수정</a>
                <a class="review-delly" href="#">삭제</a>
            </div>
            </div>
            <div class="message">
            <p>${e[1]}</p>
            </div>
        </div>
    </li>
`;
  comment_ul.insertAdjacentHTML("beforeend", template);
});

// 아이디, 비밀번호 조건, 텍스트에리어
function user_check(id, pass, text) {
  // 빈문자열은 안됨
  // 너무 짧아도 안됨

  //   id
  if (id.value === "") {
    alert("아이디, 비밀번호를 확인하세요");
    return;
  } else if (id.value.length < 1) {
    alert("아이디, 비밀번호가 너무 적습니다.");
    return;
  }

  //   pass
  if (pass.value === "") {
    alert("아이디, 비밀번호를 확인하세요");
    return;
  } else if (pass.value.length < 4) {
    alert("아이디, 비밀번호가 너무 적습니다.");
    return;
  }

  //   textarea
  if (text.value === "") {
    alert("글을 입력해주세요");
    return;
  }

  // 조건 완료하면 아이템스토리지에 추가
  const date_time = new Date();
  const get_day2 = date_time.toLocaleString();

  localStorage.setItem(user_id.value, [get_day2, user_id.value, user_pass.value, user_text.value, get_day2]);

  window.location.reload();
}

// 버튼클릭 이벤트
user_btn.addEventListener("click", (e) => {
  e.preventDefault();
  user_check(user_id, user_pass, user_text);
});

const review_edit = document.querySelectorAll(".review-edit");
const review_delly = document.querySelectorAll(".review-delly");

review_edit.forEach((e) => {
  // e.preventDefault();
  e.addEventListener("click", (el) => {});
});
