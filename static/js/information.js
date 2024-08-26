const textareas = document.querySelectorAll(".moa-textarea");
const postContent = document.querySelector("#content-textarea");
const wordLength = document.querySelector(".word-length");
const helpText = document.querySelector(".help-text");
const maxWordLength = 5000;
const attachWrap = document.querySelector(".attach-wrap");
const attachButton = document.querySelector(".attach-button");
const attachInput = document.querySelector("#attach-input");
const thumbnail = document.querySelector(".thumbnail");
const attachCancelButton = document.querySelector(".attach-cancel-button");
const attachFilesWrap = document.querySelector(".attach-files-wrap");

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
    reader.addEventListener("load", (e) => {
        const path = e.target.result;
        if (path.includes("image")) {
            thumbnail.style.backgroundImage = `url(${path})`;
            attachCancelButton.style.display = "block";
        } else {
            thumbnail.style.backgroundImage = "";
        }
    });
    const attachFile = `<div class="attach-file">
                            ${file.name}
                            <label>
                                    <div>
                                        <img
                                        src="../../../static/images/cancel3.png"
                                        alt="attach-file-image"
                                        />
                                    </div>
                                    <input type="checkbox" class="attach-check" />
                            </label>
                        </div>`;
    attachFilesWrap.innerHTML += attachFile;
});

attachCancelButton.addEventListener("click", (e) => {
    thumbnail.style.backgroundImage = "";
    attachInput.value = "";
    attachCancelButton.style.display = "none";
});
