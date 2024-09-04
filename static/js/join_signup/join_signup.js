/****************************체크 박스*************************************/

// 체크박스 div로 - (로그인 상태 유지)
const checkbox = document.getElementById("agreement-checkbox");
const agreementDiv = document.getElementById("agreementDiv");
const rediv1 = document.getElementById("rechangediv1");
const rediv2 = document.getElementById("rechangediv2");

const checkMessage = document.getElementById("check-message");
const professorCheckbox = document.getElementById("professor-save-checkbox");
const academicCheckbox = document.getElementById("academic-save-checkbox");
const userCheckbox = document.getElementById("user-save-checkbox");

checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        // 체크된 상태
        agreementDiv.className =
            "relative m-px box-border size-4 cursor-pointer border rounded bg-primary-500 border-primary-500 flex items-center";

        // div1, div2 스타일 적용
        rediv1.className =
            "absolute left-[3.2px] top-[5.45px] h-[2px] origin-top-left rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-[5.65px]";
        rediv2.className =
            "absolute left-[4.5px] top-[8.95px] h-[2px] origin-top-left -rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-[8.3px] delay-100";
    } else {
        // 체크 해제된 상태
        agreementDiv.className =
            "relative m-px box-border size-4 cursor-pointer border rounded hover:border-primary-500 border-w-gray-200 bg-white flex items-center";

        // div1, div2 스타일 적용
        rediv1.className =
            "absolute left-[3.2px] top-[5.45px] h-[2px] origin-top-left rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-0";
        rediv2.className =
            "absolute left-[4.5px] top-[8.95px] h-[2px] origin-top-left -rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-0 delay-0";
    }
});

//체크박스를 클릭하면 체크표시를 애니메이션처럼 가져오면서 중복은 안되게 작성
document.addEventListener("DOMContentLoaded", () => {
    const professorCheckbox = document.getElementById(
        // 체크박스들 가져오기
        "professor-save-checkbox"
    );
    const professorCheckboxDiv = document.getElementById(
        "professor-checkboxDiv"
    );
    const professorDiv1 = document.getElementById("professor-changediv3");
    const professorDiv2 = document.getElementById("professor-changediv4");

    const academicCheckbox = document.getElementById("academic-save-checkbox");
    const academicCheckboxDiv = document.getElementById("academic-checkboxDiv");
    const academicDiv1 = document.getElementById("academic-changediv5");
    const academicDiv2 = document.getElementById("academic-changediv6");

    const userCheckbox = document.getElementById("user-save-checkbox");
    const userCheckboxDiv = document.getElementById("user-checkboxDiv");
    const userDiv1 = document.getElementById("user-changediv7");
    const userDiv2 = document.getElementById("user-changediv8");

    // 체크박스를 클릭할 때 하나만 선택되도록 제어하는 함수
    function handleCheckboxChange(clickedCheckbox, clickedDiv, div1, div2) {
        // 모든 체크박스를 순회하며 상태를 변경
        [professorCheckbox, academicCheckbox, userCheckbox].forEach(
            (checkbox) => {
                if (checkbox !== clickedCheckbox) {
                    checkbox.checked = false; // 다른 체크박스는 해제
                }
            }
        );

        // 모든 체크박스의 스타일을 기본 상태로 되돌림
        resetAllStyles();

        // 클릭된 체크박스가 체크된 상태일 때만 스타일 적용
        if (clickedCheckbox.checked) {
            clickedDiv.className =
                "relative m-px box-border size-4 cursor-pointer border rounded bg-primary-500 border-primary-500 flex items-center";
            div1.className =
                "absolute left-[3.2px] top-[5.45px] h-[2px] origin-top-left rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-[5.65px]";
            div2.className =
                "absolute left-[4.5px] top-[8.95px] h-[2px] origin-top-left -rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-[8.3px] delay-100";
        }
    }

    // 모든 체크박스의 스타일을 기본 상태로 되돌리는 함수
    function resetAllStyles() {
        resetStyle(professorCheckboxDiv, professorDiv1, professorDiv2);
        resetStyle(academicCheckboxDiv, academicDiv1, academicDiv2);
        resetStyle(userCheckboxDiv, userDiv1, userDiv2);
    }

    // 개별 체크박스의 스타일을 기본 상태로 되돌리는 함수
    function resetStyle(checkboxDiv, div1, div2) {
        checkboxDiv.className =
            "relative m-px box-border size-4 cursor-pointer border rounded hover:border-primary-500 border-w-gray-200 bg-white flex items-center";
        div1.className =
            "absolute left-[3.2px] top-[5.45px] h-[2px] origin-top-left rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-0";
        div2.className =
            "absolute left-[4.5px] top-[8.95px] h-[2px] origin-top-left -rotate-45 rounded bg-white transition-[width] duration-100 ease-linear w-0 delay-0";
    }

    // 각 체크박스에 change 이벤트 리스너 추가
    professorCheckbox.addEventListener("change", function () {
        handleCheckboxChange(
            professorCheckbox,
            professorCheckboxDiv,
            professorDiv1,
            professorDiv2
        );
    });

    academicCheckbox.addEventListener("change", function () {
        handleCheckboxChange(
            academicCheckbox,
            academicCheckboxDiv,
            academicDiv1,
            academicDiv2
        );
    });

    userCheckbox.addEventListener("change", function () {
        handleCheckboxChange(userCheckbox, userCheckboxDiv, userDiv1, userDiv2);
    });
});

/****************************첫 번째 비밀번호 보이기, 숨기기*************************************/
const passwordInput = document.querySelector("input[type=password]");
const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", function (e) {
    // 클릭된 요소가 togglePassword 인 경우에만 실행
    if (e.target === togglePassword) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.src = "img/eye-off.svg";
            togglePassword.alt = "Hide password";

            // path 요소 추가
            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute("d", "M2 2L14 14");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", "1.4");
            path.setAttribute("stroke-linecap", "round");
            path.classList.add("toggle-password-path"); // 특정 클래스 추가
            togglePassword.appendChild(path);
        } else {
            passwordInput.type = "password";
            togglePassword.src = "img/eye.svg";
            togglePassword.alt = "Show password";

            // 특정 클래스가 있는 path 요소 제거
            const path = togglePassword.querySelector(".toggle-password-path");
            if (path) {
                togglePassword.removeChild(path);
            }
        }
    }
});

/****************************두 번째 비밀번호 보이기, 숨기기*************************************/
const repasswordInput = document.querySelector("input[type=repassword]");
const retogglePassword = document.getElementById("retoggle-password");

retogglePassword.addEventListener("click", function (e) {
    // 클릭된 요소가 togglePassword 인 경우에만 실행
    if (e.target === retogglePassword) {
        if (repasswordInput.type === "password") {
            repasswordInput.type = "text";
            retogglePassword.src = "img/eye-off.svg";
            retogglePassword.alt = "Hide password";

            // path 요소 추가
            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute("d", "M2 2L14 14");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", "1.4");
            path.setAttribute("stroke-linecap", "round");
            path.classList.add("toggle-password-path"); // 특정 클래스 추가
            retogglePassword.appendChild(path);
        } else {
            repasswordInput.type = "password";
            retogglePassword.src = "img/eye.svg";
            retogglePassword.alt = "Show password";

            // 특정 클래스가 있는 path 요소 제거
            const path = retogglePassword.querySelector(
                ".toggle-password-path"
            );
            if (path) {
                retogglePassword.removeChild(path);
            }
        }
    }
});

/*****************************이메일,아이디, 비밀번호 검사**************************/

const form = document.querySelector("form");
const signButton = document.querySelector("button[type=button]");

const emailCheck = form["email"];
const idCheck = form["id"];
const pwCheck = form["password"];
const repwCheck = form["repassword"];

const emailMessage = document.getElementById("email-message");
const idMessage = document.getElementById("id-message");
const pwMessage = document.getElementById("pw-message");
const repwMessage = document.getElementById("repw-message");

const emailinputBoxLabel = document.querySelector(
    'label[name="email-input-box"]'
);
const idinputBoxLabel = document.querySelector('label[name="id-input-box"]');
const pwinputBoxLabel = document.querySelector('label[name="pw-input-box"]');
const repwinputBoxLabel = document.querySelector(
    'label[name="repw-input-box"]'
);

const emailplaceholder = document.getElementById("email-placeholder");
const idplaceholder = document.getElementById("id-placeholder");
const pwplaceholder = document.getElementById("pw-placeholder");
const repwplaceholder = document.getElementById("repw-placeholder");

// 원래의 placeholder 색상 저장
const emailoriginalPlaceholderColor =
    emailplaceholder.style.color || "rgb(189, 189, 189)";
const emailoriginalBorderColor = "rgb(59, 163, 199)"; // 원래의 border 색상

const idoriginalPlaceholderColor =
    idplaceholder.style.color || "rgb(189, 189, 189)";
const idoriginalBorderColor = "rgb(59, 163, 199)"; // 원래의 border 색상

const pworiginalPlaceholderColor =
    pwplaceholder.style.color || "rgb(189, 189, 189)";
const pworiginalBorderColor = "rgb(59, 163, 199)"; // 원래의 border 색상

const repworiginalPlaceholderColor =
    repwplaceholder.style.color || "rgb(189, 189, 189)";
const repworiginalBorderColor = "rgb(59, 163, 199)"; // 원래의 border 색상

// 이메일 검사 - 색 전환 - 포커스 이벤트 핸들러
emailCheck.addEventListener("focus", function () {
    if (emailCheck.value.trim() === "") {
        // 포커스 시 메시지 색상은 빨간색으로 유지
    }
    // 포커스할 때 placeholder 색상은 원래 색상으로 복원
    emailplaceholder.style.color = emailoriginalPlaceholderColor;
    emailplaceholder.classList.remove("text-red-500"); // 클래스 제거
});

// 아이디 검사 - 색 전환 - 포커스 이벤트 핸들러
idCheck.addEventListener("focus", function () {
    if (idCheck.value.trim() === "") {
        // 포커스 시 메시지 색상은 빨간색으로 유지
    }
    // 포커스할 때 placeholder 색상은 원래 색상으로 복원
    idplaceholder.style.color = idoriginalPlaceholderColor;
    idplaceholder.classList.remove("text-red-500"); // 클래스 제거
});

// 비밀번호 검사 - 색 전환 - 포커스 이벤트 핸들러
pwCheck.addEventListener("focus", function () {
    if (pwCheck.value.trim() === "") {
        // 포커스 시 메시지 색상은 빨간색으로 유지
    }
    // 포커스할 때 placeholder 색상은 원래 색상으로 복원
    pwplaceholder.style.color = pworiginalPlaceholderColor;
    pwplaceholder.classList.remove("text-red-500"); // 클래스 제거
});

// 비밀번호 재검사 - 색 전환 - 포커스 이벤트 핸들러
repwCheck.addEventListener("focus", function () {
    if (repwCheck.value.trim() === "") {
        // 포커스 시 메시지 색상은 빨간색으로 유지
    }
    // 포커스할 때 placeholder 색상은 원래 색상으로 복원
    repwplaceholder.style.color = repworiginalPlaceholderColor;
    repwplaceholder.classList.remove("text-red-500"); // 클래스 제거
});

// 이메일 입력 이벤트 핸들러
emailCheck.addEventListener("input", function () {
    // 입력을 시작하면 border 색상을 원래 색상으로 변경
    emailinputBoxLabel.style.borderColor = "rgb(59, 163, 199)";
    emailMessage.textContent = "";
    emailplaceholder.style.color = "rgb(59, 163, 199)";
});

// 아이디 입력 이벤트 핸들러
idCheck.addEventListener("input", function () {
    // 입력을 시작하면 border 색상을 원래 색상으로 변경
    idinputBoxLabel.style.borderColor = "rgb(59, 163, 199)";
    idMessage.textContent = "";
    idplaceholder.style.color = "rgb(59, 163, 199)";
});

// 비밀번호 입력 이벤트 핸들러
pwCheck.addEventListener("input", function () {
    // 입력을 시작하면 border 색상을 원래 색상으로 변경
    pwinputBoxLabel.style.borderColor = "rgb(59, 163, 199)";
    pwMessage.textContent = "";
    togglePassword.style.marginTop = "0px";
    pwplaceholder.style.color = "rgb(59, 163, 199)";
});

// 비밀번호 재입력 이벤트 핸들러
repwCheck.addEventListener("input", function () {
    // 입력을 시작하면 border 색상을 원래 색상으로 변경
    repwinputBoxLabel.style.borderColor = "rgb(59, 163, 199)";
    repwMessage.textContent = "";
    repwplaceholder.style.color = "rgb(59, 163, 199)";
});

/******************************************************* */
let enterPressed = false; // 엔터 키가 눌렸는지 추적하는 용

const emailinputField = document.querySelector("input[name=emailInput]");
const idinputField = document.querySelector("input[name=idinput]");
const pwinputField = document.querySelector("input[name=passwordinput]");
const repwinputField = document.querySelector("input[name=repasswordinput]");

// 이메일 입력 필드에 포커스가 들어올 때
emailinputField.addEventListener("focus", () => {
    // Enter 키가 눌린 상태라면 빨간색, 아니면 원본 색상 유지
    emailinputField.style.color =
        emailMessage.style.color === "red" ? "red" : "rgb(97, 97, 97)";
    emailplaceholder.style.color =
        enterPressed && idinputField.value === "" ? "red" : "rgb(51, 145, 186)";
    emailplaceholder.style.top = "-5px";
    emailplaceholder.style.fontSize = "12px";
    emailplaceholder.style.transform = "translateY(0)";
    emailplaceholder.style.color =
        emailMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
    emailinputBoxLabel.style.borderColor =
        emailMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
});

// 아이디 입력 필드에 포커스가 들어올 때
idinputField.addEventListener("focus", () => {
    // Enter 키가 눌린 상태라면 빨간색, 아니면 원본 색상 유지
    idinputField.style.color =
        idMessage.style.color === "red" ? "red" : "rgb(97, 97, 97)";
    idplaceholder.style.color =
        enterPressed && idinputField.value === "" ? "red" : "rgb(51, 145, 186)";
    idplaceholder.style.top = "-5px";
    idplaceholder.style.fontSize = "12px";
    idplaceholder.style.transform = "translateY(0)";
    idplaceholder.style.color =
        idMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
    idinputBoxLabel.style.borderColor =
        idMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
});

// 비밀번호 입력 필드에 포커스가 들어올 때
pwinputField.addEventListener("focus", () => {
    // Enter 키가 눌린 상태라면 빨간색, 아니면 원본 색상 유지
    pwinputField.style.color =
        pwMessage.style.color === "red" ? "red" : "rgb(97, 97, 97)";
    pwplaceholder.style.color =
        enterPressed && idinputField.value === "" ? "red" : "rgb(51, 145, 186)";
    pwplaceholder.style.top = "-5px";

    pwplaceholder.style.fontSize = "12px";
    pwplaceholder.style.transform = "translateY(0)";
    pwplaceholder.style.color =
        pwMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
    pwinputBoxLabel.style.borderColor =
        pwMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
});

// 비밀번호 재입력 필드에 포커스가 들어올 때
repwinputField.addEventListener("focus", () => {
    // Enter 키가 눌린 상태라면 빨간색, 아니면 원본 색상 유지
    repwinputField.style.color =
        repwMessage.style.color === "red" ? "red" : "rgb(97, 97, 97)";
    repwplaceholder.style.color =
        enterPressed && idinputField.value === "" ? "red" : "rgb(51, 145, 186)";
    repwplaceholder.style.top = "-5px";
    repwplaceholder.style.fontSize = "12px";
    repwplaceholder.style.transform = "translateY(0)";
    repwplaceholder.style.color =
        repwMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
    repwinputBoxLabel.style.borderColor =
        repwMessage.style.color === "red" ? "red" : "rgb(51, 145, 186)";
});

// 이메일 입력 필드에서 포커스가 나갈 때
emailinputField.addEventListener("blur", () => {
    if (emailinputField.value) {
        emailinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        emailplaceholder.style.color = "rgb(189, 189, 189)";
        emailinputField.style.color = "rgb(97, 97, 97)";
    } else if (idMessage.style.color === "red") {
        emailinputBoxLabel.style.borderColor = "red";
        emailplaceholder.style.color = "red";
        emailinputField.style.color = "red";
        emailplaceholder.style.top = "6px";
        emailplaceholder.style.fontSize = "16px";
        emailplaceholder.style.transform = "translateY(0)";
    } else {
        emailinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        emailplaceholder.style.color = "rgb(189, 189, 189)";
        emailplaceholder.style.top = "6px";
        emailplaceholder.style.fontSize = "16px";
        emailplaceholder.style.transform = "translateY(0)";
    }
});

// 아이디 입력 필드에서 포커스가 나갈 때
idinputField.addEventListener("blur", () => {
    if (idinputField.value) {
        idinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        idplaceholder.style.color = "rgb(189, 189, 189)";
        idinputField.style.color = "rgb(97, 97, 97)";
    } else if (idMessage.style.color === "red") {
        idinputBoxLabel.style.borderColor = "red";
        idplaceholder.style.color = "red";
        idinputField.style.color = "red";
        idplaceholder.style.top = "6px";
        idplaceholder.style.fontSize = "16px";
        idplaceholder.style.transform = "translateY(0)";
    } else {
        idinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        idplaceholder.style.color = "rgb(189, 189, 189)";
        idplaceholder.style.top = "6px";
        idplaceholder.style.fontSize = "16px";
        idplaceholder.style.transform = "translateY(0)";
    }
});
// 비밀번호 입력 필드에서 포커스가 나갈 때
pwinputField.addEventListener("blur", () => {
    if (pwinputField.value) {
        pwinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        pwplaceholder.style.color = "rgb(189, 189, 189)";
        pwinputField.style.color = "rgb(97, 97, 97)";
    } else if (idMessage.style.color === "red") {
        pwinputBoxLabel.style.borderColor = "red";
        pwplaceholder.style.color = "red";
        pwinputField.style.color = "red";
        pwplaceholder.style.top = "6px";
        pwplaceholder.style.fontSize = "16px";
        pwplaceholder.style.transform = "translateY(0)";
    } else {
        pwinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        pwplaceholder.style.color = "rgb(189, 189, 189)";
        pwplaceholder.style.top = "6px";
        pwplaceholder.style.fontSize = "16px";
        pwplaceholder.style.transform = "translateY(0)";
    }
});

// 비밀번호 재입력 필드에서 포커스가 나갈 때
repwinputField.addEventListener("blur", () => {
    if (repwinputField.value) {
        repwinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        repwplaceholder.style.color = "rgb(189, 189, 189)";
        repwinputField.style.color = "rgb(97, 97, 97)";
    } else if (repwMessage.style.color === "red") {
        repwinputBoxLabel.style.borderColor = "red";
        repwplaceholder.style.color = "red";
        repwinputField.style.color = "red";
        repwplaceholder.style.top = "6px";
        repwplaceholder.style.fontSize = "16px";
        repwplaceholder.style.transform = "translateY(0)";
    } else {
        repwinputBoxLabel.style.borderColor = "rgb(189, 189, 189)";
        repwplaceholder.style.color = "rgb(189, 189, 189)";
        repwplaceholder.style.top = "6px";
        repwplaceholder.style.fontSize = "16px";
        repwplaceholder.style.transform = "translateY(0)";
    }
});

// 이메일 입력 필드에서 엔터키 누를 때
emailinputField.addEventListener("keydown", (e) => {
    emailinputField.style.color = "rgb(97, 97, 97)";
    emailMessage.style.color = "rgb(97, 97, 97)";
    if (e.key === "Enter") {
        if (emailinputField.value) {
            emailplaceholder.style.color = "rgb(51, 145, 186)";
        } else {
            emailinputBoxLabel.style.borderColor = "red";
            emailinputField.style.color = "red";
            emailplaceholder.style.color = "red";
            emailMessage.textContent = "이메일을 입력해 주세요";
            emailMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (idinputField.value) {
            idplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            idinputBoxLabel.style.borderColor = "red";
            idinputField.style.color = "red";
            idplaceholder.style.color = "red";
            idMessage.textContent = "아이디를 입력해 주세요";
            idMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (pwinputField.value) {
            pwplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            pwinputBoxLabel.style.borderColor = "red";
            pwinputField.style.color = "red";
            pwplaceholder.style.color = "red";
            pwMessage.textContent = "비밀번호를 입력해 주세요";
            pwMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (repwinputField.value) {
            repwplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            repwinputBoxLabel.style.borderColor = "red";
            repwinputField.style.color = "red";
            repwplaceholder.style.color = "red";
            repwMessage.textContent = "비밀번호를 재 입력해 주세요";
            repwMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }
    }
});

// 아이디 입력 필드에서 엔터키 누를 때
idinputField.addEventListener("keydown", (e) => {
    idinputField.style.color = "rgb(97, 97, 97)";
    idMessage.style.color = "rgb(97, 97, 97)";
    if (e.key === "Enter") {
        if (idinputField.value) {
            idplaceholder.style.color = "rgb(51, 145, 186)";
        } else {
            idinputBoxLabel.style.borderColor = "red";
            idinputField.style.color = "red";
            idplaceholder.style.color = "red";
            idMessage.textContent = "아이디를 입력해 주세요";
            idMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (emailinputField.value) {
            emailplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            emailinputBoxLabel.style.borderColor = "red";
            emailinputField.style.color = "red";
            emailplaceholder.style.color = "red";
            emailMessage.textContent = "이메일를 입력해 주세요";
            emailMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (pwinputField.value) {
            pwplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            pwinputBoxLabel.style.borderColor = "red";
            pwinputField.style.color = "red";
            pwplaceholder.style.color = "red";
            pwMessage.textContent = "비밀번호를 입력해 주세요";
            pwMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (repwinputField.value) {
            repwplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            repwinputBoxLabel.style.borderColor = "red";
            repwinputField.style.color = "red";
            repwplaceholder.style.color = "red";
            repwMessage.textContent = "비밀번호를 재 입력해 주세요";
            repwMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }
    }
});

// 비밀번호 입력 필드에서 엔터키 누를 때
pwinputField.addEventListener("keydown", (e) => {
    pwinputField.style.color = "rgb(97, 97, 97)";
    pwMessage.style.color = "rgb(97, 97, 97)";
    if (e.key === "Enter") {
        if (pwinputField.value) {
            pwplaceholder.style.color = "rgb(51, 145, 186)";
        } else {
            pwinputBoxLabel.style.borderColor = "red";
            pwinputField.style.color = "red";
            pwplaceholder.style.color = "red";
            pwMessage.textContent = "비밀번호를 입력해 주세요";
            pwMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (emailinputField.value) {
            emailplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            emailinputBoxLabel.style.borderColor = "red";
            emailinputField.style.color = "red";
            emailplaceholder.style.color = "red";
            emailMessage.textContent = "이메일을 입력해 주세요";
            emailMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (idinputField.value) {
            idplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            idinputBoxLabel.style.borderColor = "red";
            idinputField.style.color = "red";
            idplaceholder.style.color = "red";
            idMessage.textContent = "아이디를 입력해 주세요";
            idMessage.style.color = "red";
        }
        if (e.key === "Enter") {
            enterPressed = true; // 엔터 키가 눌렸음을 기록

            // 체크박스 검사
            if (
                !professorCheckbox.checked &&
                !academicCheckbox.checked &&
                !userCheckbox.checked
            ) {
                checkMessage.style.display = "block";
                checkMessage.textContent =
                    "신분확인을 위해 한가지 체크해 주세요.";
                checkMessage.style.color = "red";
            } else {
                checkMessage.style.display = "none"; // 메시지 숨기기
            }
        }

        if (repwinputField.value) {
            repwplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            repwinputBoxLabel.style.borderColor = "red";
            repwinputField.style.color = "red";
            repwplaceholder.style.color = "red";
            repwMessage.textContent = "비밀번호를 재 입력해 주세요";
            repwMessage.style.color = "red";
        }
    }
});

// 비밀번호 재 입력 필드에서 엔터키 누를 때
repwinputField.addEventListener("keydown", (e) => {
    repwinputField.style.color = "rgb(97, 97, 97)";
    repwMessage.style.color = "rgb(97, 97, 97)";
    if (e.key === "Enter") {
        if (repwinputField.value) {
            repwplaceholder.style.color = "rgb(51, 145, 186)";
        } else {
            repwinputBoxLabel.style.borderColor = "red";
            repwinputField.style.color = "red";
            repwplaceholder.style.color = "red";
            repwMessage.textContent = "비밀번호를 재 입력해 주세요";
            repwMessage.style.color = "red";
        }

        if (
            !professorCheckbox.checked &&
            !academicCheckbox.checked &&
            !userCheckbox.checked
        ) {
            checkMessage.style.display = "block";
            checkMessage.textContent = "신분확인을 위해 한가지 체크해 주세요.";
            checkMessage.style.color = "red";
        } else {
            checkMessage.style.display = "none"; // 메시지 숨기기
        }

        if (emailinputField.value) {
            emailplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            emailinputBoxLabel.style.borderColor = "red";
            emailinputField.style.color = "red";
            emailplaceholder.style.color = "red";
            emailMessage.textContent = "이메일을 입력해 주세요";
            emailMessage.style.color = "red";
        }
        if (
            !professorCheckbox.checked &&
            !academicCheckbox.checked &&
            !userCheckbox.checked
        ) {
            checkMessage.style.display = "block";
            checkMessage.textContent = "신분확인을 위해 한가지 체크해 주세요.";
            checkMessage.style.color = "red";
        } else {
            checkMessage.style.display = "none"; // 메시지 숨기기
        }

        if (idinputField.value) {
            idplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            idinputBoxLabel.style.borderColor = "red";
            idinputField.style.color = "red";
            idplaceholder.style.color = "red";
            idMessage.textContent = "아이디를 입력해 주세요";
            idMessage.style.color = "red";
        }
        if (
            !professorCheckbox.checked &&
            !academicCheckbox.checked &&
            !userCheckbox.checked
        ) {
            checkMessage.style.display = "block";
            checkMessage.textContent = "신분확인을 위해 한가지 체크해 주세요.";
            checkMessage.style.color = "red";
        } else {
            checkMessage.style.display = "none"; // 메시지 숨기기
        }

        if (pwinputField.value) {
            pwplaceholder.style.color = "rgb(189, 189, 189)";
        } else {
            pwinputBoxLabel.style.borderColor = "red";
            pwinputField.style.color = "red";
            pwplaceholder.style.color = "red";
            pwMessage.textContent = "비밀번호를 입력해 주세요";
            pwMessage.style.color = "red";
        }
        if (
            !professorCheckbox.checked &&
            !academicCheckbox.checked &&
            !userCheckbox.checked
        ) {
            checkMessage.style.display = "block";
            checkMessage.textContent = "신분확인을 위해 한가지 체크해 주세요.";
            checkMessage.style.color = "red";
        } else {
            checkMessage.style.display = "none"; // 메시지 숨기기
        }
    }
});

// 회원가입 버튼 클릭시 이벤트
signButton.addEventListener("click", () => {
    emailinputBoxLabel.style.borderColor = emailinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    emailinputField.style.color = emailinputField.value
        ? "rgb(97, 97, 97)"
        : "red";
    emailplaceholder.style.color = emailinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    emailMessage.textContent = emailinputField.value
        ? ""
        : "이메일을 입력해 주세요";
    emailMessage.style.color = emailinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    // 체크박스 상태 처리
    if (
        !professorCheckbox.checked &&
        !academicCheckbox.checked &&
        !userCheckbox.checked
    ) {
        checkMessage.style.display = "block";
        checkMessage.textContent = "신분확인을 위해 한가지 체크해 주세요.";
        checkMessage.style.color = "red";
    } else {
        checkMessage.style.display = "none"; // 메시지 숨기기
    }
});

signButton.addEventListener("click", () => {
    idinputBoxLabel.style.borderColor = idinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    idinputField.style.color = idinputField.value ? "rgb(97, 97, 97)" : "red";
    idplaceholder.style.color = idinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    idMessage.textContent = idinputField.value ? "" : "아이디를 입력해 주세요";
    idMessage.style.color = idinputField.value ? "rgb(189, 189, 189)" : "red";
});

signButton.addEventListener("click", () => {
    // 비밀번호 입력 상태 처리
    const passwordEntered = pwinputField.value;
    pwinputBoxLabel.style.borderColor = passwordEntered
        ? "rgb(189, 189, 189)"
        : "red";
    pwinputField.style.color = passwordEntered ? "rgb(97, 97, 97)" : "red";
    pwplaceholder.style.color = passwordEntered ? "rgb(189, 189, 189)" : "red";
    pwMessage.textContent = passwordEntered ? "" : "비밀번호를 입력해 주세요";
    pwMessage.style.color = passwordEntered ? "rgb(189, 189, 189)" : "red";

    // 체크박스 상태 처리
    if (
        !professorCheckbox.checked &&
        !academicCheckbox.checked &&
        !userCheckbox.checked
    ) {
        checkMessage.style.display = "block";
        checkMessage.textContent = "신분확인을 위해 한가지 체크해 주세요.";
        checkMessage.style.color = "red";
    } else {
        checkMessage.style.display = "none"; // 메시지 숨기기
    }
});

signButton.addEventListener("click", () => {
    repwinputBoxLabel.style.borderColor = repwinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    repwinputField.style.color = repwinputField.value
        ? "rgb(97, 97, 97)"
        : "red";
    repwplaceholder.style.color = repwinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
    repwMessage.textContent = repwinputField.value
        ? ""
        : "비밀번호를 재 입력해 주세요";
    repwMessage.style.color = repwinputField.value
        ? "rgb(189, 189, 189)"
        : "red";
});

// 이용약관 체크박스 이벤트
const agreementCheckBox = document.getElementById("agreement-checkbox");
const agreementMessage = document.getElementById("agreement-Message");

agreementCheckBox.addEventListener("change", function (e) {
    if (e.target.checked) {
        agreementMessage.style.display = "none";
    } else {
        agreementMessage.style.display = "block";
        agreementMessage.style.color = "red";
        agreementMessage.style.fontSize = "13px";
        agreementMessage.textContent =
            "Moa 서비스 이용을 위해서 반드시 동의를 해주셔야 합니다.";
    }
});
