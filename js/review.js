const user_id = document.querySelector("#user-name");
const user_pass = document.querySelector("#user-pass");
const user_text = document.querySelector("#reply-form-textarea");
const user_btn = document.querySelector("#up_review");
const user_day = document.querySelector('[datetime="2023-06-05T00:55:38.000Z"]');
const date_time = new Date();
const get_day2 = date_time.toLocaleString();
// const edit_pass = document.querySelector("#edit_user--pass");

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
    <li class="comment-edit">
        <div class="content">
            <div class="info-row df">
            <span class="user-info">${e[1]}</span>
            <div class="right">
                <time class="review_time" datetime="${e[0]}">${e[0]}</time>
                <a class="review-edit" href="#">수정</a>
                <a class="review-delly" href="#">삭제</a>
            </div>
            </div>
            <div class="message">
            <p>${e[3]}</p>
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
  // return pass.value === "" ? alert("아이디, 비밀번호를 확인하세요") : alert("아이디, 비밀번호가 너무 적습니다.");
  if (pass.value === "") {
    alert("아이디, 비밀번호를 확인하세요");
    return;
  } else if (pass.value.length < 4) {
    alert("아이디, 비밀번호가 너무 적습니다.");
    return;
  }

  if (text.value === "") {
    alert("내용 입력해주세요");
    return;
  }

  // 조건 완료하면 아이템스토리지에 추가
  localStorage.setItem(user_id.value, [get_day2, user_id.value, user_pass.value, user_text.value, get_day2]);
  window.location.reload();
}

// 버튼클릭 이벤트 => 스토리지에 저장
user_btn.addEventListener("click", (e) => {
  e.preventDefault();
  user_check(user_id, user_pass, user_text);
});

const review_edit = document.querySelectorAll(".review-edit");
const review_delly = document.querySelectorAll(".review-delly");
const review_edit_list = document.querySelectorAll(".comment-edit");

// 댓글 삭제
review_delly.forEach((el, index) => {
  let count = true;
  el.addEventListener("click", (e) => {
    const editLocal = localArr[index].join().split(",");
    const del_pass = prompt("비밀번호를 입력해주쎄여");

    if (editLocal[2] === del_pass) {
      localStorage.removeItem(editLocal[1]);
    } else {
      alert("비밀번호를 확인해주세여 !!");
    }
  });
});

// 수정 이벤트
review_edit.forEach((e, index) => {
  let count = true;
  e.addEventListener("click", (el) => {
    const template = `
    <div class="content movie-review--textarea">
      <div class="info-row df">
        <span class="user-info">이름</span>
        <span class="edit-pass">
          <label>비밀번호
          <input type="password" class="edit_user--pass" maxlength="4" placeholder="****" autocomplete="current-password" />
          </label>
        </span>
      </div>
      <div class="message">
        <textarea name="#" class="movie-review--area" cols="30" rows="10"></textarea>
        <button class="movie-review--btn reply-form-textarea">수정</button>
      </div>
    </div>`;

    // 수정
    if (count) {
      review_edit_list[index].insertAdjacentHTML("beforeend", template);
      count = !count;
      const btn = document.querySelector(".movie-review--btn");
      const pass = document.querySelector(".edit_user--pass");
      const editArea = document.querySelector(".movie-review--area");

      btn.addEventListener("click", () => {
        if (localArr[index][2] === pass.value) {
          const local = localArr[index].join().split(",");

          localStorage.setItem(local[1], [local[0], local[1], local[2], editArea.value, local[4]]);
          console.log(localArr[index]);
          window.location.reload();
        } else if (pass.value === "") {
          alert("비밀번호를 확인해 !");
          return;
        } else if (localArr[index][2] !== pass.value) {
          alert("비밀번호를 확인해 !");
          return;
        } else if (editArea.value === "") {
          alert("내용값이 비어있어 !");
          return;
        }
      });
    } else {
      e.parentNode.parentElement.parentElement.nextElementSibling.remove();
      count = !count;
    }
  });
});
