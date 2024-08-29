// 모든 드롭다운 메뉴를 선택
const dropdownContainers = document.querySelectorAll(".drop-down-container");

// 모든 드롭다운 숨기기
function hideAll() {
    dropdownContainers.forEach((container) => {
        const dropdownLists = container.querySelectorAll(
            ".drop-down-list, .drop-down-list1"
        );
        dropdownLists.forEach((list) => (list.style.display = "none")); // 모든 드롭다운 숨김
    });
}

// 드롭다운 메뉴와 리스트의 이벤트 설정
dropdownContainers.forEach((container) => {
    const dropdownMenus = container.querySelectorAll(".left-nav-menu");
    const dropdownLists = container.querySelectorAll(
        ".drop-down-list, .drop-down-list1"
    );

    dropdownMenus.forEach((dropdownMenu, index) => {
        const dropdownList = dropdownLists[index]; // 메뉴와 리스트를 연결

        dropdownMenu.addEventListener("mouseenter", () => {
            hideAll(); // 모든 드롭다운 숨기기
            dropdownList.style.display = "flex"; // 현재 드롭다운 보이게 하기
        });

        // 드롭다운 리스트에서 마우스를 벗어나면 숨김
        container.addEventListener("mouseleave", () => {
            dropdownList.style.display = "none"; // 드롭다운 숨김
        });
    });
});
