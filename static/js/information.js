const textareas = document.querySelectorAll(".moa-textarea");
const postContent = document.querySelector("#content-textarea");
const wordLength = document.querySelector(".word-length");
const helpText = document.querySelector(".help-text");
const maxWordLength = 5000;
const attachWrap = document.querySelector(".attach-wrap");
const attachButton = document.querySelector(".attach-button");
const attachInput = document.querySelector("#attach-input");
const attachFilesWrap = document.querySelector(".attach-files-wrap");
let i = 0;

NodeList.prototype.filter = Array.prototype.filter;

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
    console.log(file);
    console.log(e.target);
    const reader = new FileReader();
    reader.readAsDataURL(file);
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
    console.log(attachInfo);
    attachInfo.files = e.target.files;
    console.log(attachInfo.files);
    console.log(e.target.value);
    console.log(attachInput.value);
    attachInput.value = "";
    console.log(attachInput.value);
    console.log(e.target.value);
    reader.addEventListener("load", (e) => {
        const path = e.target.result;
        const thumbnailUnique = document.querySelector(`#thumbnail-${i}`);
        const attachCancelButtonUnique = document.querySelector(
            `#attach-cancel-button-${i}`
        );
        if (path.includes("image")) {
            // console.log(i);
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
    // const thumbnails = document.querySelectorAll(".thumbnail");
    attachCancelButtons.forEach((attachCancelButton) => {
        attachCancelButton.addEventListener("click", (e) => {
            let temp = 0;
            // thumbnail.style.backgroundImage = "";
            attachInput.value = "";
            // attachCancelButton.style.display = "none";
            const attachFiles = document.querySelectorAll(".attach-file");
            // span태그 중,
            // 내용이 현재 해제한 체크박스의 value와 다른 것만 추출한다.
            attachFiles
                .filter(
                    (attachFile) =>
                        attachFile.firstElementChild.firstElementChild.files !==
                        e.target.files
                )
                .forEach((attachFile) => {
                    // 추출된 span태그를 다시 제작한다.
                    temp += attachFile;
                });
            // 완성된 span태그들을 result에 덮어쓴다.
            attachFilesWrap.innerHTML = temp;
        });
    });
});
