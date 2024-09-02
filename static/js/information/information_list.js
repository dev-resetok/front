const dropDownList = document.querySelector(".select-drop-down");
const dropDownButtonWrap = document.querySelector("span.text-unit.active");
const dropDownButton = document.querySelector("i.select-icon");
const searchBoxLeftBox = document.querySelector(
    ".ui-select.moa-select.theme-moa.text-search-type"
);
const searchBoxInput = document.querySelector(".search-text");
const selectBox = document.querySelector("select.moa-select.search-type");
const selectedValue = document.querySelector("p.select-name");
const postCount = document.querySelector(".post-count");
const paginationButtons = document.querySelectorAll("li.page-item");
const pagePrevButton = document.querySelector("#page-prev-button");
const pageNextButton = document.querySelector("#page-next-button");
let pageIndex = 1;

HTMLCollection.prototype.forEach = Array.prototype.forEach;

postCount.innerText = "10,340";

searchBoxLeftBox.addEventListener("mouseenter", (e) => {
    searchBoxInput.classList.add("active");
});
searchBoxLeftBox.addEventListener("mouseleave", (e) => {
    searchBoxInput.classList.remove("active");
});
dropDownButtonWrap.addEventListener("mouseenter", (e) => {
    searchBoxInput.classList.add("active");
});
dropDownButtonWrap.addEventListener("mouseleave", (e) => {
    searchBoxInput.classList.remove("active");
});

searchBoxLeftBox.addEventListener("click", (e) => {
    if (dropDownButton.classList[1] === "active") {
        dropDownButton.classList.remove("active");
        dropDownList.classList.remove("open");
    } else {
        dropDownButton.classList.add("active");
        dropDownList.classList.add("open");
    }
});

dropDownList.children.forEach((li) => {
    li.addEventListener("click", (e) => {
        selectBox.children.forEach((option) => {
            if (li.dataset.selectValue === option.value) {
                selectedValue.innerText = option.innerText;
            }
        });
        dropDownList.children.forEach((child) => {
            child.classList.remove("current");
        });
        li.classList.add("current");
    });
});

searchBoxInput.addEventListener("click", (e) => {
    if (dropDownButton.classList[1] === "active") {
        dropDownButton.classList.remove("active");
        dropDownList.classList.remove("open");
    }
});

paginationButtons.forEach((paginationButton, i, paginationButtons) => {
    if (
        paginationButton != pagePrevButton &&
        paginationButton != pageNextButton
    ) {
        paginationButton.addEventListener("click", (e) => {
            pageIndex = i;
            if (pageIndex === 1) {
                pagePrevButton.style.visibility = "hidden";
                pagePrevButton.style.cursor = "default";
                pageNextButton.style.visibility = "visible";
                pageNextButton.style.cursor = "pointer";
            } else if (pageIndex === 5) {
                pagePrevButton.style.visibility = "visible";
                pagePrevButton.style.cursor = "pointer";
                pageNextButton.style.visibility = "hidden";
                pageNextButton.style.cursor = "default";
            } else {
                console.log(pagePrevButton.firstElementChild);
                console.log(pageNextButton);
                pagePrevButton.style.visibility = "visible";
                pagePrevButton.style.cursor = "pointer";
                pageNextButton.style.visibility = "visible";
                pageNextButton.style.cursor = "pointer";
            }

            paginationButtons.forEach((pgButton) => {
                pgButton.firstElementChild.classList.remove("active");
            });
            e.target.classList.add("active");
        });
    }
});

pagePrevButton.addEventListener("click", (e) => {
    pageIndex--;

    if (pageIndex === 1) {
        pagePrevButton.firstElementChild.style.visibility = "hidden";
        pagePrevButton.firstElementChild.style.cursor = "default";
    } else {
        pagePrevButton.firstElementChild.style.visibility = "visible";
        pagePrevButton.firstElementChild.style.cursor = "pointer";
    }

    paginationButtons.forEach((paginationButton) => {
        paginationButton.firstElementChild.classList.remove("active");
    });
    paginationButtons[pageIndex].firstElementChild.classList.add("active");
});
pageNextButton.addEventListener("click", (e) => {
    pageIndex++;

    if (pageIndex === 5) {
        pageNextButton.firstElementChild.style.visibility = "hidden";
        pageNextButton.firstElementChild.style.cursor = "default";
    } else {
        pageNextButton.firstElementChild.style.visibility = "visible";
        pageNextButton.firstElementChild.style.cursor = "pointer";
    }

    paginationButtons.forEach((paginationButton) => {
        paginationButton.firstElementChild.classList.remove("active");
    });
    paginationButtons[pageIndex].firstElementChild.classList.add("active");
});
