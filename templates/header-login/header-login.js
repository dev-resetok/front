// 모든 드롭다운 메뉴를 선택
const dropdownContainers = document.querySelectorAll(".drop-down-container");

// 드롭다운 메뉴를 숨기는 함수
function hideAll() {
    dropdownContainers.forEach((container) => {
        const dropdownLists = container.querySelectorAll(
            ".drop-down-list1, .drop-down-list2"
        );
        dropdownLists.forEach((list) => (list.style.display = "none"));

        // my-project-drop-down 및 profile-drop-down 숨기기
        const myProjectDropDown = document.querySelector(
            ".my-project-drop-down"
        );
        myProjectDropDown.style.display = "none";

        const profileDropDown = document.querySelector(".profile-drop-down");
        profileDropDown.style.display = "none";
    });
}

// 각 드롭다운 컨테이너에 대해 이벤트 리스너 설정
dropdownContainers.forEach((container) => {
    const dropdownMenus = container.querySelectorAll(".left-nav-menu");
    const dropdownLists = container.querySelectorAll(
        ".drop-down-list1, .drop-down-list2"
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

// my-project-container에 대해 드롭다운 이벤트 설정
const myProjectContainer = document.querySelector(".my-project-container");
const myProjectDropDown = document.querySelector(".my-project-drop-down");

myProjectContainer.addEventListener("mouseenter", () => {
    hideAll(); // 모든 드롭다운 숨기기
    myProjectDropDown.style.display = "flex"; // 현재 드롭다운 보이게 하기
});

myProjectContainer.addEventListener("mouseleave", () => {
    if (
        !myProjectDropDown.matches(":hover") && // 드롭다운 리스트에 마우스가 없고
        !myProjectContainer.matches(":hover") // 드롭다운 메뉴에도 마우스가 없을 때
    ) {
        myProjectDropDown.style.display = "none"; // 드롭다운 숨김
    }
});

// profile-img-container에 대해 드롭다운 이벤트 설정
const profileImgContainer = document.querySelector(".profile-img-container");
const profileDropDown = document.querySelector(".profile-drop-down");

profileImgContainer.addEventListener("mouseenter", () => {
    hideAll(); // 모든 드롭다운 숨기기
    profileDropDown.style.display = "flex"; // 현재 드롭다운 보이게 하기
});

profileImgContainer.addEventListener("mouseleave", () => {
    if (
        !profileDropDown.matches(":hover") && // 드롭다운 리스트에 마우스가 없고
        !profileImgContainer.matches(":hover") // 드롭다운 메뉴에도 마우스가 없을 때
    ) {
        profileDropDown.style.display = "none"; // 드롭다운 숨김
    }
});
