const user_id = document.querySelector("#user-name");
const user_pass = document.querySelector("#user-pass");
const user_text = document.querySelector("#reply-form-textarea");
const user_btn = document.querySelector("#up_review");
const user_day = document.querySelector('[datetime="2023-06-05T00:55:38.000Z"]');
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
const review_edit_list = document.querySelectorAll(".comment-edit");

review_delly.forEach((el, index) => {
  let count = true;
  el.addEventListener("click", (e) => {
    const editLocal = localArr[index].join().split(",");
    const del_pass = prompt("비밀번호를 입력해주쎄여");
    // const temp = `
    // <div class="cmt_delpw_box">
    //   <input type="password" maxlength="4" name="#" class="user-pass__del" placeholder="****" />
    //   <button class="close_btn">확인</button>
    //   <em><img src="https://i.postimg.cc/nLGmhPyB/close-btn.png" alt="취소" /></em>
    // </div>`;

    // const aa = prompt("비밀번호를 써주세여");
    // console.log(aa);

    // if(aa === ){}

    if (editLocal[2] === del_pass) {
      localStorage.removeItem(editLocal[1]);
    } else {
      alert("비밀번호를 확인해주세여 !!");
    }
    // if (true) {

    // e.
    // e.target.parentElement.innerHTML = temp;
    // }
  });
});

// 비밀번호 검증
function passVerfication(e) {}
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

    if (count) {
      review_edit_list[index].insertAdjacentHTML("beforeend", template);
      count = !count;
      const btn = document.querySelector(".movie-review--btn");
      const pass = document.querySelector(".edit_user--pass");

      btn.addEventListener("click", (e) => {
        if (localArr[index][2] === pass.value) {
          const editArea = document.querySelector(".movie-review--area");

          // editArea.value
          const local = localArr[index].join().split(",");
          // console.log(local);
          // console.log(local[0]);
          // console.log(local[1]);
          // console.log(local[2]);
          // console.log(local[3]);
          // console.log(local[4]);

          localStorage.setItem(local[1], [local[0], local[1], local[2], editArea.value, local[4]]);
          window.location.reload();

          // e.target.parentElement.parentElement.parentElement.remove();
          // console.log(localArr[index][1]);

          // 삭제
          // localStorage.removeItem(localArr[index][1]);

          // console.log(review_edit_list[index]);
        } else {
          alert("비밀번호를 확인해!");
        }
      });
    } else {
      e.parentNode.parentElement.parentElement.nextElementSibling.remove();
      count = !count;
      // del_area[index].remove();
      // console.log(del_area);
      // review_edit_list[index].remove();
    }

    // if (count) {
    //   count = !count;
    //   console.log(1, count);
    //   return;
    // }

    // if (!count) {
    // const review_editnext = document.querySelectorAll(".movie-review--textarea");
    //   console.log(review_editnext[index]);
    //   review_editnext[index].remove();
    //   // console.log(review_editnext[index]);
    //   // review_edit_list[index].remove;
    //   count = !count;
    //   console.log(2, count);
    // }
    // console.log(count);

    // if (edit_pass.value === localArr[index][2]) {
    //   console.log(1);
    // } else {
    //   ("");
    // }
  });
});

// 버튼 수정
