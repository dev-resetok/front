function showTab(tabId, element) {
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

    // 현재 클릭된 요소의 부모 li에 active 클래스 추가
    element.parentElement.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    // 데이터 편집 가능 요소 설정
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

    // 모달 처리
    var modal = document.getElementById("profileModal");
    var btn = document.querySelector(".user-img-box img");
    var span = document.getElementsByClassName("close")[0];
    var resetBtn = document.getElementById("resetBtn");
    const defaultImage =
        "https://www.wishket.com/static/img/default_avatar_c.png";

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

    // 모달에서 이미지 변경
    document
        .getElementById("uploadForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            // 파일 입력 요소
            const fileInput = document.getElementById("fileInput");
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    // 업로드된 이미지를 user-img 및 user-img-header에 반영
                    const newImageSrc = e.target.result;
                    document.querySelector(".img-circle.user-img").src =
                        newImageSrc;
                    document.querySelector(".user-img-header").src =
                        newImageSrc;
                };

                reader.readAsDataURL(file);
            }
        });

    // 기본 이미지로 변경 버튼 클릭 시
    resetBtn.addEventListener("click", function () {
        document.querySelector(".img-circle.user-img").src = defaultImage;
        document.querySelector(".user-img-header").src = defaultImage;
    });

    // 생년월일 선택 필드 설정
    const birthYearEl = document.querySelector("#birth-year");
    const birthMonthEl = document.querySelector("#birth-month");
    const birthDayEl = document.querySelector("#birth-day");
    let isYearOptionExisted = false;
    let isMonthOptionExisted = false;
    let isDayOptionExisted = false;

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

    // 지역 선택 필드 설정
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

    // 사용자 타입에 따른 학과 필드 표시 설정
    const roleSelect = document.getElementById("role");
    const departmentContainer = document.getElementById("department-container");
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

    //  클릭 이벤트 추가
    document
        .getElementById("mypage-link")
        .addEventListener("click", function () {
            showTab("mypage", this);
        });

    document
        .getElementById("myborder-link")
        .addEventListener("click", function () {
            showTab("myboard", this);
        });

    document
        .getElementById("myreply-link")
        .addEventListener("click", function () {
            showTab("myreply", this);
        });

    document
        .getElementById("myinquiry-link")
        .addEventListener("click", function () {
            showTab("myinquiry", this);
        });
});
