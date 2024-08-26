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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const attachFile = `<div class="attach-file">
                            <label>
                                    <div class="attach-cancel-button" id=attach-cancel-button-${++i}></div>
                                    <input type="file" id=attach-check-${i} disabled/>
                            </label>
                            <div class="thumbnail-wrap white-box">
                                <div class="thumbnail" id=thumbnail-${i}></div>
                            </div>
                            <div>${file.name}</div>
                        </div>`;
    // const attachCheckUnique = document.querySelector(`#attach-check-${i}`);
    // console.log(attachCheckUnique);
    // attachCheckUnique.files = file;
    reader.addEventListener("load", (e) => {
        const path = e.target.result;
        const thumbnailUnique = document.querySelector(`#thumbnail-${i}`);
        const attachCancelButtonUnique = document.querySelector(
            `#attach-cancel-button-${i}`
        );
        if (path.includes("image")) {
            console.log(i);
            thumbnailUnique.style.backgroundImage = `url(${path})`;
            attachCancelButtonUnique.style.display = "block";
        } else {
            thumbnailUnique.style.backgroundImage = "";
        }
    });
    const attachCancelButtons = document.querySelectorAll(
        ".attach-cancel-button"
    );
    const thumbnails = document.querySelectorAll(".thumbnail");
    attachCancelButtons.forEach((attachCancelButton) => {
        attachCancelButton.addEventListener("click", (e) => {
            thumbnail.style.backgroundImage = "";
            attachInput.value = "";
            attachCancelButton.style.display = "none";
        });
    });
    attachFilesWrap.innerHTML += attachFile;
});
// else {
//     // 체크가 해제되었다면,
//     // 기존에 p태그에 있었던 모든 span태그를 가져온다.
//     const spans = document.querySelectorAll("span.text");
//     // span태그 중,
//     // 내용이 현재 해제한 체크박스의 value와 다른 것만 추출한다.
//     spans
//         .filter((span) => span.innerText !== e.target.value)
//         .forEach((span) => {
//             // 추출된 span태그를 다시 제작한다.
//             text += `<span class="text">${span.innerText}</span>`;
//         });
//     // 완성된 span태그들을 result에 덮어쓴다.
//     result.innerHTML = text;
// }
