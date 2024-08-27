const showTab = (tabId, element) => {
    // 모든 tab-content를 숨김
    const tabcontent = document.getElementsByClassName("tab-content");
    Array.from(tabcontent).forEach((content) => {
        content.classList.remove("active");
    });

    // 클릭된 tab만 표시
    document.getElementById(tabId).classList.add("active");

    // 사이드바 메뉴의 활성화 상태 변경
    const tablinks = document.querySelectorAll(".sidebar-nav ul li");
    tablinks.forEach((link) => {
        link.classList.remove("active");
    });

    // 현재 클릭된 요소의 부모 li에 active 클래스 추가
    element.parentElement.classList.add("active");
};

document.addEventListener("DOMContentLoaded", () => {
    // 데이터 편집 가능 요소 설정
    const editableElements = document.querySelectorAll("[data-editable]");
    editableElements.forEach((element) => {
        element.addEventListener("click", () => {
            const currentText = element.innerText;
            const input = document.createElement("input");
            input.type = "text";
            input.value =
                currentText.trim() === "정보를 입력해주세요."
                    ? ""
                    : currentText.trim();
            element.innerHTML = "";
            element.appendChild(input);
            input.focus();

            input.addEventListener("blur", () => {
                const newText =
                    input.value.trim() === ""
                        ? "정보를 입력해주세요."
                        : input.value.trim();
                element.innerText = newText;
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    input.blur();
                }
            });
        });
    });

    // 모달 처리
    const modal = document.getElementById("profileModal");
    const btn = document.querySelector(".user-img-box img");
    const span = document.getElementsByClassName("close")[0];
    const resetBtn = document.getElementById("resetBtn");
    const defaultImage =
        "https://www.wishket.com/static/img/default_avatar_c.png";

    // 이미지 클릭 시 모달 열기
    btn.onclick = () => {
        modal.style.display = "block";
    };

    // 모달의 닫기 버튼 클릭 시 모달 닫기
    span.onclick = () => {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // 모달에서 이미지 변경
    document
        .getElementById("uploadForm")
        .addEventListener("submit", (event) => {
            event.preventDefault();

            // 파일 입력 요소
            const fileInput = document.getElementById("fileInput");
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
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
    resetBtn.addEventListener("click", () => {
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

    birthYearEl.addEventListener("focus", () => {
        if (!isYearOptionExisted) {
            isYearOptionExisted = true;
            for (let i = 1950; i <= 2024; i++) {
                const YearOption = document.createElement("option");
                YearOption.setAttribute("value", i);
                YearOption.innerText = i;
                birthYearEl.appendChild(YearOption);
            }
        }
    });

    birthMonthEl.addEventListener("focus", () => {
        if (!isMonthOptionExisted) {
            isMonthOptionExisted = true;
            for (let i = 1; i <= 12; i++) {
                const MonthOption = document.createElement("option");
                MonthOption.setAttribute("value", i);
                MonthOption.innerText = i;
                birthMonthEl.appendChild(MonthOption);
            }
        }
    });

    birthDayEl.addEventListener("focus", () => {
        if (!isDayOptionExisted) {
            isDayOptionExisted = true;
            for (let i = 1; i <= 31; i++) {
                const DayOption = document.createElement("option");
                DayOption.setAttribute("value", i);
                DayOption.innerText = i;
                birthDayEl.appendChild(DayOption);
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

    sidoSelect.addEventListener("change", () => {
        const selectedSido = sidoSelect.value;
        const sigunguOptions = regionData[selectedSido] || [];
        sigunguSelect.innerHTML =
            '<option value="" disabled selected>시/군/구를 선택하세요</option>';
        sigunguOptions.forEach((sigungu) => {
            const option = document.createElement("option");
            option.value = sigungu;
            option.textContent = sigungu;
            sigunguSelect.appendChild(option);
        });
    });

    // 사용자 타입에 따른 학과 필드 표시 설정
    const roleSelect = document.getElementById("role");
    const departmentContainer = document.getElementById("department-container");
    departmentContainer.style.display = "none";
    roleSelect.addEventListener("change", () => {
        if (
            roleSelect.value === "student" ||
            roleSelect.value === "professor"
        ) {
            departmentContainer.style.display = "table-row";
        } else {
            departmentContainer.style.display = "none";
        }
    });

    //  클릭 이벤트 추가 div 보여주기
    document
        .getElementById("mypage-link")
        .addEventListener("click", () => showTab("mypage", this));

    document
        .getElementById("myborder-link")
        .addEventListener("click", () => showTab("myboard", this));

    document
        .getElementById("myreply-link")
        .addEventListener("click", () => showTab("myreply", this));

    document
        .getElementById("myinquiry-link")
        .addEventListener("click", () => showTab("myinquiry", this));
});

// "등록 완료" 버튼 클릭 시 데이터 저장
const saveMypage = document.getElementsByClassName("btn-save");
Array.from(saveMypage).forEach((button) => {
    button.addEventListener("click", (e) => {
        alert("정보가 저장되었습니다.");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let inquiries = [
        { id: 1, title: "문의 1", status: "answered" }, // 답변 완료된 문의
        // { id: 2, title: "문의 2", status: "pending" },
        // { id: 3, title: "문의 3", status: "answered" },
        // 데이터 받아오기
    ];

    const renderInquiries = (filter) => {
        // 문의 목록이 표시될 영역과 빈 상태 컴포넌트를 가져옴
        const inquiryList = document.getElementById("inquiry-list");
        const emptyComponent = document.querySelector(
            ".empty-component-inquiry"
        );

        // 현재 선택된 상태(필터)에 따라 문의 데이터를 필터링
        const filteredInquiries = inquiries.filter(
            (inquiry) => inquiry.status === filter
        );

        // 필터링된 문의가 없을 경우
        if (filteredInquiries.length === 0) {
            // 문의 목록을 숨기고 빈 상태 컴포넌트를 표시
            inquiryList.style.display = "none";
            emptyComponent.style.display = "block";
        } else {
            inquiryList.style.display = "block";
            emptyComponent.style.display = "none";
            inquiryList.innerHTML = ""; // 문의 목록 영역을 초기화

            // 필터링된 각 문의를 화면에 추가
            filteredInquiries.forEach((inquiry) => {
                // 새로운 문의 항목을 생성
                const inquiryItem = document.createElement("div");
                inquiryItem.className = "inquiry-item";
                // 문의 제목과 상태(답변 완료 또는 대기 중)를 HTML로 설정
                inquiryItem.innerHTML = `
                    <h4>${inquiry.title}</h4>
                    <p>Status: ${
                        inquiry.status === "answered"
                            ? "답변 완료"
                            : "답변 대기 중"
                    }</p>
                `;
                // 문의 항목을 문의 목록 영역에 추가
                inquiryList.appendChild(inquiryItem);
            });
        }

        // 답변 완료된 문의의 개수를 세고 해당 숫자를 UI에 업데이트
        document.getElementById("answered-count").innerText = inquiries.filter(
            (i) => i.status === "answered"
        ).length;
        // 답변 대기 중인 문의의 개수를 세고 해당 숫자를 UI에 업데이트
        document.getElementById("pending-count").innerText = inquiries.filter(
            (i) => i.status === "pending"
        ).length;
    };

    // 상태에 따라 문의 목록을 필터링하는 함수
    window.filterInquiries = (status) => {
        // 모든 탭에서 'active' 클래스를 제거하여 비활성화
        document
            .querySelectorAll(".tab-link")
            .forEach((tab) => tab.classList.remove("active"));

        // 현재 선택된 탭에 'active' 클래스를 추가하여 활성화
        if (status === "answered") {
            // CSS 선택자 사용
            document
                .querySelector(
                    ".tab-link[onclick=\"filterInquiries('answered')\"]"
                )
                .classList.add("active");
        } else {
            document
                .querySelector(
                    ".tab-link[onclick=\"filterInquiries('pending')\"]"
                )
                .classList.add("active");
        }

        // 선택된 상태에 따라 문의 목록
        renderInquiries(status);
    };

    // 페이지가 로드될 때 기본으로 '답변 완료' 상태의 문의를 표시
    renderInquiries("answered");
});
