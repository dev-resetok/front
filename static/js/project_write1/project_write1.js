const textareas = document.querySelectorAll(".moa-textarea");
const postContent = document.querySelector("#content-textarea");
const wordLength = document.querySelector(".word-length");
const helpText = document.querySelector(".help-text");
const maxWordLength = 5000;
const attachInputs = document.querySelectorAll(".attach-input");
const saveButton = document.querySelector(".save-button");
let i = 0;

// 게시글 저장버튼에 입력된 정보 저장 기능 추가
// saveButton.addEventListener("click", (e) => {});

textareas.forEach((textarea) => {
    let value = textarea.value;
    let focusCheck = false;
    textarea.addEventListener("mouseenter", (e) => {
        e.target.parentElement.classList.add("textarea-border-changed");
        e.target.parentElement.classList.remove("textarea-border");
    });

    textarea.addEventListener("mouseleave", (e) => {
        if (focusCheck) {
            e.target.parentElement.classList.add("textarea-border-changed");
            e.target.parentElement.classList.remove("textarea-border");
        } else {
            e.target.parentElement.classList.add("textarea-border");
            e.target.parentElement.classList.remove("textarea-border-changed");
        }
    });

    textarea.addEventListener("focus", (e) => {
        focusCheck = true;
        if (
            e.target.parentElement.classList.contains("textarea-border-changed")
        ) {
            e.target.parentElement.classList.add("textarea-border-changed");
            e.target.parentElement.classList.remove("textarea-border");
        } else {
            e.target.parentElement.classList.add("textarea-border");
            e.target.parentElement.classList.remove("textarea-border-changed");
        }
    });

    textarea.addEventListener("blur", (e) => {
        focusCheck = false;
        if (
            !e.target.parentElement.classList.contains(
                "textarea-border-changed"
            )
        ) {
            e.target.parentElement.classList.add("textarea-border-changed");
            e.target.parentElement.classList.remove("textarea-border");
        } else {
            e.target.parentElement.classList.add("textarea-border");
            e.target.parentElement.classList.remove("textarea-border-changed");
        }
    });
});
