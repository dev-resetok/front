const textareas = document.querySelectorAll(".moa-textarea");
const postContent = document.querySelector("#content-textarea");
const wordLength = document.querySelector(".word-length");
const helpText = document.querySelector(".help-text");
const maxWordLength = 5000;
const attachWrap = document.querySelector(".attach-wrap");
const attachButton = document.querySelector(".attach-button");
const attachInput = document.querySelector("#attach-input");
const attachFilesWrap = document.querySelector(".attach-files-wrap");
const saveButton = document.querySelector(".save-button");
let i = 0;

// mouseenter 및 focus가 되었을 때 스타일 적용
textareas.forEach((textarea) => {
    let value = textarea.value;
    let focusCheck = false;
    textarea.addEventListener("mouseenter", (e) => {
        // if (!e.target.parentElement.className.includes("changed")) {
        e.target.parentElement.className = "textarea-border-changed";
        // }
    });
    textarea.addEventListener("mouseleave", (e) => {
        // if (e.target.parentElement.className.includes("changed")) {
        if (focusCheck) {
            e.target.parentElement.className = "textarea-border-changed";
        } else {
            e.target.parentElement.className = "textarea-border";
        }
        // }
    });
    textarea.addEventListener("focus", (e) => {
        focusCheck = true;
        if (e.target.parentElement.className.includes("changed")) {
            e.target.parentElement.className = "textarea-border-changed";
            if (e.target.value == value) {
                e.target.value = "";
            }
        } else {
            e.target.parentElement.className = "textarea-border";
            e.target.value = value;
        }
    });
    textarea.addEventListener("blur", (e) => {
        focusCheck = false;
        if (!e.target.parentElement.className.includes("changed")) {
            e.target.parentElement.className = "textarea-border-changed";
            e.target.value = "";
        } else {
            e.target.parentElement.className = "textarea-border";
            if (!e.target.value) {
                e.target.value = value;
            }
        }
    });
});

// 현재 게시글 글자수와 최대 글자수 계산
wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
helpText.innerText = `${maxWordLength}자 이내로 작성해주세요.`;
postContent.addEventListener("click", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
postContent.addEventListener("keyup", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
postContent.addEventListener("blur", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});

attachInput.addEventListener("change", (e) => {
    const [file] = e.target.files;
    // console.log(file);
    // console.log(e.target);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(file);
    const attachFile = `<div class="attach-file">
                            <label>
                                    <div class="attach-cancel-button" id=attach-cancel-button-${++i}></div>
                                    <input type="file" id=attach-info-${i} disabled/>
                            </label>
                            <div class="thumbnail-wrap white-box">
                                <div class="thumbnail" id=thumbnail-${i}></div>
                            </div>
                            <div class="attach-text-wrap">${file.name}</div>
                        </div>`;
    attachFilesWrap.innerHTML += attachFile;

    const attachInfo = document.querySelector(`#attach-info-${i}`);
    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);
    attachInfo.files = dataTransfer.files;
    console.log(attachInfo.files);
    attachInput.value = "";

    const thumbnailUnique = document.querySelector(`#thumbnail-${i}`);
    const attachCancelButtonUnique = document.querySelector(
        `#attach-cancel-button-${i}`
    );
    reader.addEventListener("load", (e) => {
        const path = e.target.result;
        if (path.includes("image")) {
            thumbnailUnique.style.backgroundImage = `url(${path})`;
            attachCancelButtonUnique.style.display = "block";
        } else {
            thumbnailUnique.style.backgroundImage = "";
            attachCancelButtonUnique.style.display = "block";
        }
    });
    const attachCancelButtons = document.querySelectorAll(
        ".attach-cancel-button"
    );
    attachCancelButtons.forEach((attachCancelButton) => {
        attachCancelButton.addEventListener("click", (e) => {
            attachFilesWrap.removeChild(e.target.parentElement.parentElement);
            console.log(e.target.nextElementSibling.files);
        });
    });
});

saveButton.addEventListener("click", (e) => {});
