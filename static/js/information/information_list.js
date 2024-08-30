const dropDownList = document.querySelector(".select-drop-down");
const dropDownButtonWrap = document.querySelector("span.text-unit.active");
const dropDownButton = document.querySelector("i.select-icon");
const searchBoxLeftBox = document.querySelector(
    ".ui-select.moa-select.theme-moa.text-search-type"
);
const searchBoxInput = document.querySelector(".search-text");
const selectBox = document.querySelector("select.moa-select.search-type");
const selectedValue = document.querySelector("p.select-name");

HTMLCollection.prototype.forEach = Array.prototype.forEach;

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
            console.log(child);
            child.classList.remove("current");
        });
        li.classList.add("current");
        console.log(li.classList);
        console.log(selectBox);
    });
});

searchBoxInput.addEventListener("click", (e) => {
    console.log(searchBoxInput);
});
