// 게시판 관리 옆 화살표 이벤트 js
// const menuItems = document.querySelectorAll("a.menu-items-menu");
// let check = -1;
// menuItems.forEach((menuItem) => {
//     menuItem.addEventListener("click", (e) => {
//         e.preventDefault();
//         check *= -1;
//         if (e.target.tagName === "svg") {
//             e.target.style.transform =
//                 check > 0 ? `rotate(180deg)` : `rotate(0deg)`;
//         }
//     });
// });

// const dropDownMenu = document.querySelector("#drop-down-menu");
// const menuClosed = document.querySelector("#menu-items-closed");

// dropDownMenu.addEventListener("click", (e) => {
//     menuClosed.classList.toggle("menu-items-show");
// });

// 게시판 관리 옆 화살표 이벤트 js
const dropDownMenu = document.querySelector("#drop-down-menu");
const menuClosed = document.querySelector("#menu-items-closed");
const rotatingImage = document.querySelector(
    ".with-icon.menu-items-down-icon.menu-items-open"
);

dropDownMenu.addEventListener("click", (e) => {
    e.preventDefault();
    if (menuClosed.classList[1] === "menu-items-show") {
        menuClosed.classList.remove("menu-items-show");
        rotatingImage.style.transform = `rotate(0deg)`;
    } else {
        menuClosed.classList.add("menu-items-show");
        rotatingImage.style.transform = `rotate(180deg)`;
    }
});
