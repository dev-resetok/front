const textareas = document.querySelectorAll(".moa-textarea");
const attachButton = document.querySelector(".attach-button");
const thumbnail = document.querySelector(".thumbnail");
const cancelButton = document.querySelector(".cancel-button");
const postContent = document.querySelector("#content-textarea");
const wordLength = document.querySelector(".word-length");
const helpText = document.querySelector(".help-text");
const maxWordLength = 5000;

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
postContent.addEventListener("click", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
postContent.addEventListener("keyup", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
postContent.addEventListener("blur", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
helpText.innerText = `${maxWordLength}자 이내로 작성해주세요.`;

// attachButton.addEventListener("click", (e) => {
//     const [file] = e.target.files;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.addEventListener("load", (e) => {
//         const path = e.target.result;
//         if (path.includes("image")) {
//             thumbnail.style.backgroundImage = `url(${path})`;
//             cancel.style.display = "block";
//         } else {
//             thumbnail.style.backgroundImage = `url(images/attach.png)`;
//         }
//     });
// });

// cancelButton.addEventListener("click", (e) => {
//     thumbnail.style.backgroundImage = `url(images/attach.png)`;
//     input.value = "";
//     cancel.style.display = "none";
// });
