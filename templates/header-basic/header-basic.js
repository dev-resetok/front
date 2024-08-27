// 모든 드롭다운 메뉴를 선택
const dropdownContainers = document.querySelectorAll(".drop-down-container");

// 드롭다운 메뉴를 숨기는 함수
function hideAllDropdowns() {
    dropdownContainers.forEach((container) => {
        const dropdownList = container.querySelector(".drop-down-list");
        dropdownList.style.display = "none"; // 모든 드롭다운 메뉴를 숨김
    });
}

// 각 드롭다운 컨테이너에 대해 이벤트 리스너 설정
dropdownContainers.forEach((container) => {
    const dropdownTrigger = container.querySelector(".left-nav-menu");
    const dropdownList = container.querySelector(".drop-down-list");

    // 마우스 오버 시 드롭다운 표시
    dropdownTrigger.addEventListener("mouseover", () => {
        hideAllDropdowns(); // 모든 드롭다운 숨기기
        dropdownList.style.display = "flex"; // 현재 드롭다운만 보이게 하기
    });

    // 드롭다운 리스트에 마우스 오버 시 숨기지 않기
    dropdownList.addEventListener("mouseover", () => {
        dropdownList.style.display = "flex"; // 드롭다운 리스트에 마우스가 있을 때 숨기지 않음
    });

    // 드롭다운 리스트에서 마우스 아웃 시 숨기기
    dropdownTrigger.addEventListener("mouseout", () => {
        setTimeout(() => {
            // 드롭다운 리스트와 트리거 영역 모두에서 마우스가 벗어나면 숨기기
            if (
                !dropdownList.matches(":hover") && // 드롭다운 리스트에 마우스가 없고
                !dropdownTrigger.matches(":hover") // 드롭다운 트리거에도 마우스가 없을 때
            ) {
                dropdownList.style.display = "none"; // 드롭다운 숨김
            }
        }, 100); // 100ms 지연 후 체크
    });

    // 드롭다운 리스트에서 마우스 아웃 시 숨기기
    dropdownList.addEventListener("mouseout", () => {
        setTimeout(() => {
            // 드롭다운 리스트에서 마우스가 벗어나면 숨기기
            if (!dropdownTrigger.matches(":hover")) {
                // 드롭다운 트리거에 마우스가 없을 때
                dropdownList.style.display = "none"; // 드롭다운 숨김
            }
        }, 100); // 100ms 지연 후 체크
    });
});
