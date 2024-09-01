const leftArrow = document.querySelector(".btn-interview-step.left");
const rightArrow = document.querySelector(".btn-interview-step.right");
const rollingList = document.getElementById("rolling-interview-list");

let currentIndex = 0; // 현재 표시된 첫 번째 아이템의 인덱스
const itemWidth = 252; // 각 아이템의 너비
const viewItem = 4; // 한 화면에 보이는 아이템 수

// 인덱스에 따라 슬라이드 이동
const moveToIndex = (index) => {
    const maxIndex = rollingList.children.length - viewItem; // 최대 인덱스 계산
    if (index < 0) index = maxIndex; // 왼쪽 끝에서 오른쪽 끝으로 돌아가기
    if (index > maxIndex) index = 0; // 오른쪽 끝에서 왼쪽 끝으로 돌아가기
    rollingList.style.transition = "transform 0.5s"; // 슬라이드 이동 애니메이션
    rollingList.style.transform = `translateX(-${index * itemWidth}px)`; // 슬라이드 이동
    currentIndex = index; // 현재 인덱스 업데이트
};

// 좌측 화살표 클릭 시 이동
leftArrow.addEventListener("click", () => {
    moveToIndex(currentIndex - 1);
});

// 우측 화살표 클릭 시 이동
rightArrow.addEventListener("click", () => {
    moveToIndex(currentIndex + 1);
});
