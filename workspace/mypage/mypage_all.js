function showTab(tabId) {
    // 모든 tab-content를 숨김
    var tabcontent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // 클릭된 tab만 표시
    document.getElementById(tabId).classList.add("active");

    // 사이드바 메뉴의 활성화 상태 변경
    var tablinks = document.querySelectorAll(".sidebar-nav ul li");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document
        .querySelector(`[onclick="showTab('${tabId}')"]`)
        .parentElement.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    // Editable elements script from mypage.js
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
        modal.style.display = "none";
    };

    // Birthdate and Region Selection script from mypage.js
    const birthYearEl = document.querySelector("#birth-year");
    let isYearOptionExisted = false;
    birthYearEl.addEventListener("focus", function () {
        if (!isYearOptionExisted) {
            isYearOptionExisted = true;
            for (var i = 1950; i <= 2024; i++) {
                const YearOption = document.createElement("option");
                YearOption.setAttribute("value", i);
                YearOption.innerText = i;
                this.appendChild(YearOption);
            }
        }
    });

    const birthMonthEl = document.querySelector("#birth-month");
    let isMonthOptionExisted = false;
    birthMonthEl.addEventListener("focus", function () {
        if (!isMonthOptionExisted) {
            isMonthOptionExisted = true;
            for (var i = 1; i <= 12; i++) {
                const MonthOption = document.createElement("option");
                MonthOption.setAttribute("value", i);
                MonthOption.innerText = i;
                this.appendChild(MonthOption);
            }
        }
    });

    const birthDayEl = document.querySelector("#birth-day");
    let isDayOptionExisted = false;
    birthDayEl.addEventListener("focus", function () {
        if (!isDayOptionExisted) {
            isDayOptionExisted = true;
            for (var i = 1; i <= 31; i++) {
                const DayOption = document.createElement("option");
                DayOption.setAttribute("value", i);
                DayOption.innerText = i;
                this.appendChild(DayOption);
            }
        }
    });

    const sidoSelect = document.getElementById("sido");
    const sigunguSelect = document.getElementById("sigungu");

    const regionData = {
        seoul: [
            "강남구",
            "강동구",
            "강북구",
            "강서구",
            "관악구",
            "광진구",
            "구로구",
            "금천구",
            "노원구",
            "도봉구",
            "동대문구",
            "동작구",
            "마포구",
            "서대문구",
            "서초구",
            "성동구",
            "성북구",
            "송파구",
            "양천구",
            "영등포구",
            "용산구",
            "은평구",
            "종로구",
            "중구",
            "중랑구",
        ],
        gyeonggi: [
            "가평군",
            "고양시",
            "과천시",
            "광명시",
            "광주시",
            "구리시",
            "군포시",
            "김포시",
            "남양주시",
            "동두천시",
            "부천시",
            "성남시",
            "수원시",
            "시흥시",
            "안산시",
            "안성시",
            "안양시",
            "양주시",
            "양평군",
            "여주시",
            "연천군",
            "오산시",
            "용인시",
            "의왕시",
            "의정부시",
            "이천시",
            "파주시",
            "평택시",
            "포천시",
            "하남시",
            "화성시",
        ],
        busan: [
            "강서구",
            "금정구",
            "기장군",
            "남구",
            "동구",
            "동래구",
            "부산진구",
            "북구",
            "사상구",
            "사하구",
            "서구",
            "수영구",
            "연제구",
            "영도구",
            "중구",
            "해운대구",
        ],
    };

    sidoSelect.addEventListener("change", function () {
        const selectedSido = this.value;
        const sigunguOptions = regionData[selectedSido] || [];

        sigunguSelect.innerHTML =
            '<option value="" disabled selected>시/군/구를 선택하세요</option>';

        sigunguOptions.forEach(function (sigungu) {
            const option = document.createElement("option");
            option.value = sigungu;
            option.textContent = sigungu;
            sigunguSelect.appendChild(option);
        });
    });

    const roleSelect = document.getElementById("role");
    const departmentContainer = document.getElementById("department-container");

    // 사용자가 '대학생'이나 '교수'를 선택했을 때 학과 입력 필드를 표시
    roleSelect.addEventListener("change", function () {
        if (
            roleSelect.value === "student" ||
            roleSelect.value === "professor"
        ) {
            departmentContainer.style.display = "table-row";
        } else {
            departmentContainer.style.display = "none";
        }
    });
});
document.getElementById("mypage-link").addEventListener("click", function () {
    showTab("mypage");
});

document.getElementById("myborder-link").addEventListener("click", function () {
    showTab("myboard");
});

document.getElementById("myreply-link").addEventListener("click", function () {
    showTab("myreply");
});

document
    .getElementById("myinquiry-link")
    .addEventListener("click", function () {
        showTab("myinquiry");
    });
