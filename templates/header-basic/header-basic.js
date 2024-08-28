// 모든 드롭다운 메뉴를 선택
const dropdownContainers = document.querySelectorAll(".drop-down-container");

// 드롭다운 메뉴를 숨기는 함수
function hideAll() {
    dropdownContainers.forEach((container) => {
        const dropdownList = container.querySelector(".drop-down-list");
        dropdownList.style.display = "none"; // 모든 드롭다운 메뉴를 숨김
    });
}

// 각 드롭다운 컨테이너에 대해 이벤트 리스너 설정
dropdownContainers.forEach((container) => {
    const dropdownMenu = container.querySelector(".left-nav-menu");
    const dropdownList = container.querySelector(".drop-down-list");

    // 마우스 오버 시 드롭다운 표시
    dropdownMenu.addEventListener("mouseenter", () => {
        hideAll(); // 모든 드롭다운 숨기기
        dropdownList.style.display = "flex"; // 현재 드롭다운만 보이게 하기
    });

    // 드롭다운 리스트에서 마우스 아웃 시 숨기기
    dropdownMenu.addEventListener("mouseleave", () => {
        // 드롭다운 리스트와 메뉴 영역 모두에서 마우스가 벗어나면 숨기기
        if (
            !dropdownList.matches(":hover") && // 드롭다운 리스트에 마우스가 없고
            !dropdownMenu.matches(":hover") // 드롭다운 메뉴에도 마우스가 없을 때
        ) {
            dropdownList.style.display = "none"; // 드롭다운 숨김
        }
    });

    // 드롭다운 리스트에서 마우스 아웃 시 숨기기
    dropdownList.addEventListener("mouseleave", () => {
        // 드롭다운 리스트와 메뉴 영역 모두에서 마우스가 벗어나면 숨기기
        if (
            !dropdownList.matches(":hover") && // 드롭다운 리스트에 마우스가 없고
            !dropdownMenu.matches(":hover") // 드롭다운 메뉴에도 마우스가 없을 때
        ) {
            dropdownList.style.display = "none"; // 드롭다운 숨김
        }
    });
});
