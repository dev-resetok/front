// 체크된 체크박스
const checkboxContainer = document.querySelector(".box-check");

// 체크 안된 체크박스
const noCheckboxContainer = document.querySelector(".box-no-check");

// 체크안된 체크박스 눌렀을때 체크된 체크박스 생성
noCheckboxContainer.addEventListener("click", () => {
    noCheckboxContainer.style.display = "none";
    checkboxContainer.style.display = "block";
});

// 체크된 체크박스 눌렀을때 체크안된 체크박스 생성
checkboxContainer.addEventListener("click", () => {
    noCheckboxContainer.style.display = "block";
    checkboxContainer.style.display = "none";
});
// 마우스 가져다 댔을때
noCheckboxContainer.addEventListener("mouseover", () => {
    noCheckboxContainer.style.borderColor = "#3ba3c7";
});

// 마우스 땠을때
noCheckboxContainer.addEventListener("mouseout", () => {
    noCheckboxContainer.style.borderColor = "#e0e0e0";
});

// --------------------------------------------------------------

// 작성하기 버튼 가져오기
const formSubmit = document.querySelector(".btn-wishket");

// 버튼 클릭시 이벤트 (추후수정)
formSubmit.addEventListener("click", () => {
    alert("작성이 완료되었습니다");
});
