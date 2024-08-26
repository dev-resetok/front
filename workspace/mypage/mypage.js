document.addEventListener("DOMContentLoaded", function () {
    const editableElements = document.querySelectorAll("[data-editable]");

    editableElements.forEach((element) => {
        element.addEventListener("click", function () {
            const currentText = this.innerText;
            const input = document.createElement("input");
            input.type = "text";
            input.value =
                currentText.trim() === "정보를 입력해주세요."
                    ? ""
                    : currentText.trim();
            this.innerHTML = "";
            this.appendChild(input);
            input.focus();

            input.addEventListener("blur", function () {
                const newText =
                    this.value.trim() === ""
                        ? "정보를 입력해주세요."
                        : this.value.trim();
                this.parentNode.innerText = newText;
            });

            input.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    input.blur();
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const editableElements = document.querySelectorAll("[data-editable]");

    editableElements.forEach((element) => {
        element.addEventListener("click", function () {
            const currentText = this.innerText;
            const input = document.createElement("input");
            input.type = "text";
            input.value =
                currentText.trim() === "정보를 입력해주세요."
                    ? ""
                    : currentText.trim();
            this.innerHTML = "";
            this.appendChild(input);
            input.focus();

            input.addEventListener("blur", function () {
                const newText =
                    this.value.trim() === ""
                        ? "정보를 입력해주세요."
                        : this.value.trim();
                this.parentNode.innerText = newText;
            });

            input.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    input.blur();
                }
            });
        });
    });

    // 모달 관련 요소들 선택
    var modal = document.getElementById("profileModal");
    var btn = document.querySelector(".user-img-box img"); // 이미지를 선택
    var span = document.getElementsByClassName("close")[0];
    var resetBtn = document.getElementById("resetBtn");
    const defaultImage =
        "https://www.wishket.com/static/img/default_avatar_c.png"; // 기본 이미지 경로

    // 이미지 클릭 시 모달 열기
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // 모달의 닫기 버튼 클릭 시 모달 닫기
    span.onclick = function () {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // 사진 업로드 폼 처리
    document
        .getElementById("uploadForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            var fileInput = document.getElementById("fileInput");
            var file = fileInput.files[0];

            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    btn.src = e.target.result; // 이미지를 업로드된 파일로 변경
                    modal.style.display = "none"; // 모달 닫기
                };
                reader.readAsDataURL(file);
            }
        });

    // 기본 이미지로 변경 버튼 클릭 시
    resetBtn.onclick = function () {
        btn.src = defaultImage; // 기본 이미지로 변경
        modal.style.display = "none"; // 모달 닫기
    };
});

// 기본 이미지로 변경 버튼 클릭 시
resetBtn.onclick = function () {
    btn.src = defaultImage; // 기본 이미지로 변경
    modal.style.display = "none";
};

// '출생 연도' 셀렉트 박스 option 목록 동적 생성
const birthYearEl = document.querySelector("#birth-year");
// option 목록 생성 여부 확인
let isYearOptionExisted = false;
birthYearEl.addEventListener("focus", function () {
    // year 목록 생성되지 않았을 때 (최초 클릭 시)
    if (!isYearOptionExisted) {
        isYearOptionExisted = true;
        for (var i = 1950; i <= 2024; i++) {
            // option element 생성
            const YearOption = document.createElement("option");
            YearOption.setAttribute("value", i);
            YearOption.innerText = i;
            // birthYearEl의 자식 요소로 추가
            this.appendChild(YearOption);
        }
    }
});

// '출생 월' 셀렉트 박스 option 목록 동적 생성
const birthMonthEl = document.querySelector("#birth-month");
// option 목록 생성 여부 확인
let isMonthOptionExisted = false;
birthMonthEl.addEventListener("focus", function () {
    // month 목록 생성되지 않았을 때 (최초 클릭 시)
    if (!isMonthOptionExisted) {
        isMonthOptionExisted = true;
        for (var i = 1; i <= 12; i++) {
            // option element 생성
            const MonthOption = document.createElement("option");
            MonthOption.setAttribute("value", i);
            MonthOption.innerText = i;
            // birthMonthEl의 자식 요소로 추가
            this.appendChild(MonthOption);
        }
    }
});

// '출생 일' 셀렉트 박스 option 목록 동적 생성
const birthDayEl = document.querySelector("#birth-day");
// option 목록 생성 여부 확인
let isDayOptionExisted = false;
birthDayEl.addEventListener("focus", function () {
    // day 목록 생성되지 않았을 때 (최초 클릭 시)
    if (!isDayOptionExisted) {
        isDayOptionExisted = true;
        for (var i = 1; i <= 31; i++) {
            // option element 생성
            const DayOption = document.createElement("option");
            DayOption.setAttribute("value", i);
            DayOption.innerText = i;
            // birthDayEl의 자식 요소로 추가
            this.appendChild(DayOption);
        }
    }
});
