// 모든 드롭다운 메뉴를 선택
const dropdownContainers = document.querySelectorAll(".drop-down-container");

// 드롭다운 메뉴를 숨기는 함수
function hideAll() {
    dropdownContainers.forEach((container) => {
        const dropdownLists = container.querySelectorAll(
            ".drop-down-list1, .drop-down-list2"
        );
        dropdownLists.forEach((list) => (list.style.display = "none"));
    });

    // my-project-drop-down 및 profile-drop-down 숨기기
    const myProjectDropDown = document.querySelector(".my-project-drop-down");
    if (myProjectDropDown) {
        myProjectDropDown.style.display = "none";
    }

    const profileDropDown = document.querySelector(".profile-drop-down");
    if (profileDropDown) {
        profileDropDown.style.display = "none";
    }
}

// noti-bell-container 및 드롭다운 메뉴 선택
const myprojectcontainer = document.querySelector(".noti-bell-container");
const myProjectDropDown = document.querySelector(".my-project-drop-down");

myprojectcontainer.addEventListener("click", (event) => {
    event.stopPropagation(); // 클릭 이벤트가 문서 전체로 퍼지지 않도록 방지
    console.log(event.target);
    // 드롭다운이 보이는 상태인지 확인
    const isVisible = myProjectDropDown.style.display === "flex";

    // 모든 드롭다운 숨기기
    hideAll();

    // 현재 드롭다운의 상태에 따라 보이게 하거나 숨기기
    myProjectDropDown.style.display = isVisible ? "none" : "flex";
});

// profile-img-container에 대해 드롭다운 이벤트 설정
const profileImgContainer = document.querySelector(".profile-img-container");
const profileDropDown = document.querySelector(".profile-drop-down");

profileImgContainer.addEventListener("click", (event) => {
    event.stopPropagation(); // 클릭 이벤트가 문서 전체로 퍼지지 않도록 방지

    // 드롭다운이 보이는 상태인지 확인
    const isVisible = profileDropDown.style.display === "flex";

    // 모든 드롭다운 숨기기
    hideAll();

    // 현재 드롭다운의 상태에 따라 보이게 하거나 숨기기
    profileDropDown.style.display = isVisible ? "none" : "flex";
});

// 문서 전체 클릭 시 드롭다운 숨기기
document.addEventListener("click", () => {
    hideAll();
});
