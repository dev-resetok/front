// // /***************************이메일 체크(입력 유 무)*********************************/
const form = document.querySelector("form");
const reSettingButton = document.getElementById("reSetting-Button");
const emailCheck = form["email"];
const emailMessage = document.getElementById("email-message");
const emailInputField = document.querySelector("input[name=email-Input]");
const emailInputBoxLabel = document.querySelector(
    'label[name="email-input-box"]'
);
const emailplaceholder = document.getElementById("email-placeholder");

const emailoriginalPlaceholderColor =
    emailplaceholder.style.color || "rgb(189, 189, 189)";
const emailoriginalBorderColor = "rgb(59, 163, 199)"; // 원래의 border 색상

emailCheck.addEventListener("focus", function () {
    if (emailCheck.value.trim() === "") {
        // 포커스 시 메시지 색상은 빨간색으로 유지
    }
    // 포커스할 때 placeholder 색상은 원래 색상으로 복원
    emailplaceholder.style.color = emailoriginalPlaceholderColor;
    emailplaceholder.classList.remove("text-red-500"); // 클래스 제거
});
// 이메일 입력 이벤트 핸들러
// 이메일 입력 필드에서 입력이 시작될 때
emailCheck.addEventListener("input", function () {
    // 현재 border 색상 확인
    const currentBorderColor = emailInputBoxLabel.style.borderColor;

    // 입력을 시작하면 border 색상이 빨간색인 경우 빨간색 유지
    if (currentBorderColor === "red") {
        // border 색상이 빨간색일 때 스타일 유지
        emailInputBoxLabel.style.borderColor = "red";
        emailMessage.textContent = "이메일을 입력해 주세요";
        emailMessage.style.color = "red";
        emailplaceholder.style.color = "red";
        emailInputField.style.color = "red";
    } else {
        // border 색상이 원래 색상으로 변경
        emailInputBoxLabel.style.borderColor = "rgb(59, 163, 199)";
        emailMessage.textContent = "";
        emailMessage.style.color = "rgb(59, 163, 199)";
        emailplaceholder.style.color = "rgb(59, 163, 199)";
        emailInputField.style.color = "rgb(59, 163, 199)";
    }
});

let enterPressed = false; // 엔터 키가 눌렸는지 추적하는 용

// 이메일 입력 필드에 포커스가 들어올 때
emailInputField.addEventListener("focus", () => {
    // 이메일 입력 필드가 포커스될 때 항상 설정되는 스타일
    emailInputField.style.color =
        emailMessage.style.color === "red" ? "red" : "rgb(97, 97, 97)";

    // placeholder 스타일 설정
    emailplaceholder.style.color =
        emailMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";

    // 추가적인 스타일 조정
    emailplaceholder.style.top = "-5px";
    emailplaceholder.style.fontSize = "12px";
    emailplaceholder.style.transform = "translateY(0)";

    // 입력 박스 라벨의 테두리 색상 설정
    emailInputBoxLabel.style.borderColor =
        emailMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";

    // border 색상이 빨간색일 때 메시지 추가
    if (emailInputBoxLabel.style.borderColor === "red") {
        emailMessage.textContent = "이메일을 입력해 주세요";
    } else {
        emailMessage.textContent = ""; // 메시지를 비우기
    }
});

// 이메일 입력 필드에서 포커스가 나갈 때
emailInputField.addEventListener("blur", () => {
    if (emailInputField.value && emailMessage.textContent.trim().length > 0) {
        // 이메일 입력 필드에 값이 있으면서, 경고 메시지가 표시된 경우
        emailInputBoxLabel.style.borderColor = "red";
        emailplaceholder.style.color = "red";
        emailInputField.style.color = "red";
        emailplaceholder.style.transform = "translateY(0)";
    } else if (emailInputField.value) {
        // 이메일 입력 필드에 값이 있는 경우, placeholder 크기와 색상 유지
        emailInputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        emailplaceholder.style.color = "rgb(189, 189, 189)";
        emailInputField.style.color = "rgb(97, 97, 97)";
        emailplaceholder.style.fontSize = "12px";
        emailplaceholder.style.top = "-5px";
        emailplaceholder.style.transform = "translateY(0)";
    } else if (emailMessage.textContent.trim().length > 0) {
        // 이메일이 비어있고, 경고 메시지가 표시된 경우
        emailInputBoxLabel.style.borderColor = "red";
        emailplaceholder.style.color = "red";
        emailInputField.style.color = "red";
        emailplaceholder.style.top = "6px";
        emailplaceholder.style.fontSize = "16px";
        emailplaceholder.style.transform = "translateY(0)";
    } else {
        // 이메일이 비어있지만 경고 메시지는 없는 경우
        emailInputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        emailplaceholder.style.color = "rgb(189, 189, 189)";
        emailInputField.style.color = "rgb(97, 97, 97)";
        emailplaceholder.style.top = "6px";
        emailplaceholder.style.fontSize = "16px";
        emailplaceholder.style.transform = "translateY(0)";
    }
});
// 재설정 버튼 클릭시 이벤트
reSettingButton.addEventListener("click", () => {
    emailInputBoxLabel.style.borderColor = emailInputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    emailInputField.style.color = emailInputField.value
        ? "rgb(97, 97, 97)"
        : "red";
    emailplaceholder.style.color = emailInputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    emailMessage.textContent = emailInputField.value
        ? ""
        : "이메일을 입력해 주세요";
    emailMessage.style.color = emailInputField.value
        ? "rgb(189, 189, 189)"
        : "red";
});

// 이메일 입력 필드에서 엔터키 누를 때
// emailInputField.addEventListener("keydown", (e) => {
//     emailInputField.style.color = "rgb(97, 97, 97)";
//     emailMessage.style.color = "rgb(97, 97, 97)";
//     if (e.key === "Enter") {
//         if (emailInputField.value) {
//             emailplaceholder.style.color = "rgb(51, 145, 186)";
//         } else {
//             emailInputBoxLabel.style.borderColor = "red";
//             emailInputField.style.color = "red";
//             emailplaceholder.style.color = "red";
//             emailMessage.textContent = "이메일을 입력해 주세요";
//             emailMessage.style.color = "red";
//         }
//     }
// });
