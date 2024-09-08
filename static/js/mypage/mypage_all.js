const showTab = (tabId, element) => {
    // 모든 탭을 숨김
    const tabcontent = document.getElementsByClassName("tab-content");
    Array.from(tabcontent).forEach((content) => {
        content.classList.remove("active");
    });

    // 선택한 탭만 표시
    document.getElementById(tabId).classList.add("active");

    // 사이드바 메뉴의 활성화 상태 변경
    const tablinks = document.querySelectorAll(".sidebar-nav ul li");
    tablinks.forEach((link) => {
        link.classList.remove("active");
    });

    // 클릭된 요소의 부모 li에 active 클래스 추가
    element.parentElement.classList.add("active");
};

document.addEventListener("click", () => {
    // 데이터 편집 가능 요소 설정
    const editableElements = document.querySelectorAll(".data-editable");

    editableElements.forEach((element) => {
        // 각 요소에 대해 반복적으로 처리하는 코드 블록을 정의
        element.addEventListener("click", () => {
            const currentText = element.innerText;
            const input = document.createElement("input");
            input.type = "text";
            // 생성된 입력 필드의 유형을 text로 설정

            input.value =
                currentText.trim() === "정보를 입력해주세요."
                    ? ""
                    : currentText.trim();
            // 만약 현재 텍스트가 "정보를 입력해주세요."인 경우, 입력 필드를 비워두고
            // 그렇지 않으면, 기존 텍스트를 입력 필드에 표시
            // trim() 메서드는 텍스트의 앞뒤 공백 제거
            element.innerHTML = "";
            element.appendChild(input);
            input.focus();
            input.addEventListener("blur", () => {
                const newText =
                    input.value.trim() === ""
                        ? "정보를 입력해주세요."
                        : input.value.trim();
                // 만약 입력 필드가 비어 있다면, 기본 메시지("정보를 입력해주세요.")를 사용
                element.innerText = newText;
            });

            // input.addEventListener("keydown", (e) => {
            //     if (e.key === "Enter") {
            //         input.blur();
            //     }
            // });
        });
    });

    // 모달 처리
    const modal = document.getElementById("profileModal");
    const btn = document.querySelector(".user-img-box .user-img-edit-icon");
    const span = document.getElementsByClassName("close");
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

    // 파일 선택 시 바로 이미지 변경
    document.getElementById("fileInput").addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const newImageSrc = e.target.result;
                document.querySelector(".img-circle.user-img").src =
                    newImageSrc;
                document.querySelector(".user-img-header").src = newImageSrc;
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
        gangwon: [
            "춘천시",
            "원주시",
            "강릉시",
            "동해시",
            "태백시",
            "속초시",
            "삼척시",
            "홍천군",
            "횡성군",
            "영월군",
            "평창군",
            "정선군",
            "철원군",
            "화천군",
            "양구군",
            "인제군",
            "고성군",
            "양양군",
        ],
        chungcheong: [
            "청주시 상당구",
            "청주시 서원구",
            "청주시 흥덕구",
            "청주시 청원구",
            "충주시",
            "제천시",
            "보은군",
            "옥천군",
            "영동군",
            "증평군",
            "진천군",
            "괴산군",
            "음성군",
            "단양군",
            "천안시 동남구",
            "천안시 서북구",
            "공주시",
            "보령시",
            "아산시",
            "서산시",
            "논산시",
            "계룡시",
            "당진시",
            "금산군",
            "부여군",
            "서천군",
            "청양군",
            "홍성군",
            "예산군",
            "태안군",
            "대덕구",
            "동구",
            "서구",
            "유성구",
            "중구",
            "세종특별자치시",
        ],
        jeolla: [
            "전주시 완산구",
            "전주시 덕진구",
            "군산시",
            "익산시",
            "정읍시",
            "남원시",
            "김제시",
            "완주군",
            "진안군",
            "무주군",
            "장수군",
            "임실군",
            "순창군",
            "고창군",
            "부안군",
            "목포시",
            "여수시",
            "순천시",
            "나주시",
            "광양시",
            "담양군",
            "곡성군",
            "구례군",
            "고흥군",
            "보성군",
            "화순군",
            "장흥군",
            "강진군",
            "해남군",
            "영암군",
            "무안군",
            "함평군",
            "영광군",
            "장성군",
            "완도군",
            "진도군",
            "신안군",
            "광산구",
            "남구",
            "동구",
            "북구",
            "서구",
        ],
        gyeongsang: [
            "포항시 남구",
            "포항시 북구",
            "경주시",
            "김천시",
            "안동시",
            "구미시",
            "영주시",
            "영천시",
            "상주시",
            "문경시",
            "경산시",
            "군위군",
            "의성군",
            "청송군",
            "영양군",
            "영덕군",
            "청도군",
            "고령군",
            "성주군",
            "칠곡군",
            "예천군",
            "봉화군",
            "울진군",
            "울릉군",
            "창원시 의창구",
            "창원시 성산구",
            "창원시 마산합포구",
            "창원시 마산회원구",
            "창원시 진해구",
            "진주시",
            "통영시",
            "사천시",
            "김해시",
            "밀양시",
            "거제시",
            "양산시",
            "의령군",
            "함안군",
            "창녕군",
            "고성군",
            "남해군",
            "하동군",
            "산청군",
            "함양군",
            "거창군",
            "합천군",
            "강서구",
            "금정구",
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
            "기장군",
            "남구",
            "달서구",
            "동구",
            "북구",
            "서구",
            "수성구",
            "중구",
            "달성군",
            "남구",
            "동구",
            "북구",
            "중구",
            "울주군",
        ],
        jeju: ["서귀포시", "제주시"],
    };

    sidoSelect.addEventListener("change", () => {
        const selectedSido = sidoSelect.value;
        let sigunguOptions;
        if (regionData[selectedSido]) {
            sigunguOptions = regionData[selectedSido];
        } else {
            sigunguOptions = []; // 없으면 빈 배열 할당
        }
        sigunguSelect.innerHTML =
            '<option value="" disabled selected>시/군/구를 선택하세요</option>';
        sigunguOptions.forEach((sigungu) => {
            const option = document.createElement("option");
            option.value = sigungu;
            option.textContent = sigungu;
            sigunguSelect.append(option);
        });
    });
    // 조건에 따른 학과 생성
    const roleSelect = document.getElementById("role");
    const departmentContainer = document.getElementById("department-container");

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
    // 클릭 이벤트 추가
    document
        .getElementById("mypage-link")
        .addEventListener("click", () => showTab("mypage", this));

    document
        .getElementById("myreply-link")
        .addEventListener("click", () => showTab("myreply", this));

    document
        .getElementById("myinquiry-link")
        .addEventListener("click", () => showTab("myinquiry", this));

    document
        .getElementById("mypoints-link")
        .addEventListener("click", () => showTab("mypoints", this));

    document
        .getElementById("mynotice-link")
        .addEventListener("click", () => showTab("mynotice", this));
});

// // "등록 완료" 버튼 클릭 시 데이터 저장
// const saveMypage = document.getElementsByClassName("btn-save");
// Array.from(saveMypage).forEach((button) => {
//     button.addEventListener("click", (e) => {
//         alert("정보가 저장되었습니다.");
//     });
// });

// 예시 데이터
const posts = [
    {
        id: 1,
        title: "첫 번째 게시글",
        summary: "첫 번째 게시글 요약",
        date: "2024.03.01",
    },
    {
        id: 2,
        title: "두 번째 게시글",
        summary: "두 번째 게시글 요약",
        date: "2024.03.02",
    },
    {
        id: 3,
        title: "세 번째 게시글",
        summary: "세 번째 게시글 요약",
        date: "2024.03.03",
    },
    {
        id: 4,
        title: "네 번째 게시글",
        summary: "네 번째 게시글 요약",
        date: "2024.03.04",
    },
    {
        id: 5,
        title: "다섯 번째 게시글",
        summary: "다섯 번째 게시글 요약",
        date: "2024.03.05",
    },
    {
        id: 6,
        title: "여섯 번째 게시글",
        summary: "여섯 번째 게시글 요약",
        date: "2024.03.06",
    },
    {
        id: 7,
        title: "일곱 번째 게시글",
        summary: "일곱 번째 게시글 요약",
        date: "2024.03.07",
    },
    {
        id: 8,
        title: "여덟 번째 게시글",
        summary: "여덟 번째 게시글 요약",
        date: "2024.03.08",
    },
    {
        id: 9,
        title: "아홉 번째 게시글",
        summary: "아홉 번째 게시글 요약",
        date: "2024.03.09",
    },
    {
        id: 10,
        title: "열 번째 게시글",
        summary: "열 번째 게시글 요약",
        date: "2024.03.10",
    },
    {
        id: 11,
        title: "열한 번째 게시글",
        summary: "열한 번째 게시글 요약",
        date: "2024.03.11",
    },
];

const replies = [
    {
        id: 1,
        postTitle: "댓글이 달린 게시글 1",
        summary: "댓글 내용 1",
        date: "2024.02.01",
    },
    {
        id: 2,
        postTitle: "댓글이 달린 게시글 2",
        summary: "댓글 내용 2",
        date: "2024.02.02",
    },
    {
        id: 3,
        postTitle: "댓글이 달린 게시글 3",
        summary: "댓글 내용 2",
        date: "2024.02.03",
    },
    {
        id: 4,
        postTitle: "댓글이 달린 게시글 4",
        summary: "댓글 내용 4",
        date: "2024.02.08",
    },
];

const inquiries = [
    {
        id: 1,
        title: "첫 번째 문의",
        summary: "첫 번째 문의 요약",
        date: "2024.03.01",
    },
    {
        id: 2,
        title: "두 번째 문의",
        summary: "두 번째 문의 요약",
        date: "2024.03.02",
    },
    {
        id: 3,
        title: "세 번째 문의",
        summary: "세 번째 문의 요약",
        date: "2024.03.03",
    },
    {
        id: 4,
        title: "네 번째 문의",
        summary: "네 번째 문의 요약",
        date: "2024.03.04",
    },
    {
        id: 5,
        title: "다섯 번째 문의",
        summary: "다섯 번째 문의 요약",
        date: "2024.03.05",
    },
    {
        id: 6,
        title: "여섯 번째 문의",
        summary: "여섯 번째 문의 요약",
        date: "2024.03.06",
    },
    {
        id: 7,
        title: "일곱 번째 문의",
        summary: "일곱 번째 문의 요약",
        date: "2024.03.07",
    },
    {
        id: 8,
        title: "여덟 번째 문의",
        summary: "여덟 번째 문의 요약",
        date: "2024.03.08",
    },
    {
        id: 9,
        title: "아홉 번째 문의",
        summary: "아홉 번째 문의 요약",
        date: "2024.03.09",
    },
    {
        id: 10,
        title: "열 번째 문의",
        summary: "열 번째 문의 요약",
        date: "2024.03.10",
    },
    {
        id: 11,
        title: "열한 번째 문의",
        summary: "열한 번째 문의 요약",
        date: "2024.03.11",
    },
];

// 페이지네이션 설정
const itemsPerPage = 10;

// 현재 페이지 상태
let currentPostPage = 1;
let currentReplyPage = 1;
let currentInquiryPage = 1;

// 페이지네이션을 위한 함수
const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
};

// 페이지네이션 버튼 상태 업데이트
const updatePaginationButton = (items, currentPage, paginationId) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationList = document.querySelector(
        `#${paginationId} .pagination`
    );
    paginationList.innerHTML = "";

    // '이전' 버튼
    paginationList.innerHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link"   ${
                currentPage === 1 ? "aria-disabled='true'" : ""
            }>이전</a>
        </li>
    `;

    // 페이지 번호
    for (let i = 1; i <= totalPages; i++) {
        i === 1
            ? (paginationList.innerHTML += `
        <li class="page-item ${currentPage === i ? "active" : ""}">
            <a class="page-link-1" >${i}</a>
        </li>
    `)
            : (paginationList.innerHTML += `
    <li class="page-item ${currentPage === i ? "active" : ""}">
        <a class="page-link" >${i}</a>
    </li>
    `);
    }
    // '다음' 버튼
    paginationList.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" ${
                currentPage === totalPages ? "aria-disabled='true'" : ""
            }>다음</a>
        </li>
    `;
    addPaginationEventListeners(paginationId);
};

// 페이지 버튼 클릭 이벤트 추가
const addPaginationEventListeners = (paginationId) => {
    const paginationList = document.querySelector(
        `#${paginationId} .pagination`
    );

    paginationList.querySelectorAll(".page-item a").forEach((link) => {
        link.addEventListener("", (event) => {
            event.preventDefault();
            const text = link.textContent.trim();
            let pageNumber = parseInt(text, 10);

            // 이전 , 다음 버튼의 이동할 페이지 번호 결정하기
            if (text === "다음") {
                pageNumber =
                    (paginationId === "myboard"
                        ? currentPostPage
                        : paginationId === "myreply"
                        ? currentReplyPage
                        : currentInquiryPage) + 1;
            } else if (text === "이전") {
                pageNumber =
                    (paginationId === "myboard"
                        ? currentPostPage
                        : paginationId === "myreply"
                        ? currentReplyPage
                        : currentInquiryPage) - 1;
            }

            // 페이지 번호가 정수인지 확인하고 유효한 범위인지 체크
            if (Number.isInteger(pageNumber) && pageNumber > 0) {
                goToPage(pageNumber, paginationId);
            }
        });
    });
};
// 게시글 렌더링
const renderPosts = () => {
    const postList = document.querySelector(".post-list");
    const emptyComponent = document.querySelector("#myboard .empty-component");

    // 페이지네이션 처리된 게시글 목록
    const reversedPosts = posts.slice().reverse(); // 데이터 복사 및 반전
    const paginatedPosts = paginate(reversedPosts, currentPostPage);

    if (paginatedPosts.length === 0) {
        postList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        postList.style.display = "block";
        emptyComponent.style.display = "none";
        postList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 703px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${paginatedPosts
                    .map(
                        (post, index) => `
                    <tr class="news-data-rows" data-forloop="${
                        reversedPosts.length -
                        (currentPostPage - 1) * itemsPerPage -
                        index
                    }">
                        <td class="news-center-table-body-number">${
                            reversedPosts.length -
                            (currentPostPage - 1) * itemsPerPage -
                            index
                        }</td>
                        <td class="news-center-table-body-category">게시글</td>
                        <td class="news-center-table-body-title"><span>${
                            post.title
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            post.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }

    updatePaginationButton(reversedPosts, currentPostPage, "myboard");
};

//댓글 렌더링
const renderReplies = () => {
    const replyList = document.querySelector(".reply-list");
    const emptyComponent = document.querySelector("#myreply .empty-component");

    // 페이지네이션 처리된 댓글 목록
    const reversedReplies = replies.slice().reverse(); // 데이터 복사 및 반전
    const paginatedReplies = paginate(reversedReplies, currentReplyPage);

    if (paginatedReplies.length === 0) {
        replyList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        replyList.style.display = "block";
        emptyComponent.style.display = "none";
        replyList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 703px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${paginatedReplies
                    .map(
                        (reply, index) => `
                    <tr class="news-data-rows" data-forloop="${
                        reversedReplies.length -
                        (currentReplyPage - 1) * itemsPerPage -
                        index
                    }">
                        <td class="news-center-table-body-number">${
                            reversedReplies.length -
                            (currentReplyPage - 1) * itemsPerPage -
                            index
                        }</td>
                        <td class="news-center-table-body-category">댓글</td>
                        <td class="news-center-table-body-title"><span>${
                            reply.postTitle
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            reply.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }

    updatePaginationButton(reversedReplies, currentReplyPage, "myreply");
};

//문의 렌더링
const renderInquiries = () => {
    const inquiryList = document.querySelector(".inquiry-list");
    const emptyComponent = document.querySelector(
        "#myinquiry .empty-component"
    );

    // 페이지네이션 처리된 문의 목록
    const reversedInquiries = inquiries.slice().reverse(); // 데이터 복사 및 반전
    const paginatedInquiries = paginate(reversedInquiries, currentInquiryPage);

    if (paginatedInquiries.length === 0) {
        inquiryList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        inquiryList.style.display = "block";
        emptyComponent.style.display = "none";
        inquiryList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 703px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${paginatedInquiries
                    .map(
                        (inquiry, index) => `
                    <tr class="news-data-rows" data-forloop="${
                        reversedInquiries.length -
                        (currentInquiryPage - 1) * itemsPerPage -
                        index
                    }">
                        <td class="news-center-table-body-number">${
                            reversedInquiries.length -
                            (currentInquiryPage - 1) * itemsPerPage -
                            index
                        }</td>
                        <td class="news-center-table-body-category">문의</td>
                        <td class="news-center-table-body-title"><span>${
                            inquiry.title
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            inquiry.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }

    updatePaginationButton(reversedInquiries, currentInquiryPage, "myinquiry");
};

// 페이지 이동 함수
const goToPage = (pageNumber, paginationId) => {
    // 각 탭에 맞는 총 항목 수를 설정
    const totalItems =
        paginationId === "myboard"
            ? posts.length
            : paginationId === "myreply"
            ? replies.length
            : inquiries.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 페이지 번호 유효성 검사
    if (pageNumber < 1 || pageNumber > totalPages) return;

    // 페이지 상태 업데이트
    if (paginationId === "myboard") {
        currentPostPage = pageNumber;
        renderPosts();
    } else if (paginationId === "myreply") {
        currentReplyPage = pageNumber;
        renderReplies();
    } else if (paginationId === "myinquiry") {
        currentInquiryPage = pageNumber;
        renderInquiries();
    }
};

// 초기 렌더링
renderPosts();
renderReplies();
renderInquiries();

// 기술명과 경험 필드의 값이 빈 값이 아닌지 확인하는 함수
function updateButtonState() {
    const techName = document.querySelector(".stack-search-typing-input").value;
    const experience = document.querySelector(
        'select[name="experience"]'
    ).value;
    const submitButton = document.querySelector(
        ".btn.btn-8-20.btn-partner.btn-submit"
    );

    if (techName !== "" && experience !== "") {
        // 값이 모두 채워져 있으면 버튼 색상 변경
        submitButton.style.backgroundColor = "#00a878";
        submitButton.style.color = "#fff";
        submitButton.style.border = "#00a878";
        submitButton.style.cursor = "pointer";
    } else {
        // 값이 비어 있으면 원래 상태로 복원 (원래 색상으로 복원)
        submitButton.style.backgroundColor = ""; // 원래 배경색으로 복원
        submitButton.style.color = ""; // 원래 글자색으로 복원
        submitButton.style.border = ""; // 원래 테두리색으로 복원
        submitButton.style.cursor = ""; // 원래 커서 상태로 복원
    }
}

// 검색창을 클릭했을 때 결과를 보이게 하는 코드
document
    .querySelector(".stack-search-typing-input")
    .addEventListener("click", (event) => {
        const searchResult = document.querySelector(".stack-search-result");
        searchResult.style.display = "flex";
        event.stopPropagation(); // 이벤트 버블링을 막아 부모 요소에 전파되지 않도록 함

        // 기술명* 텍스트 이동 및 색상 변경
        const label = document.querySelector(".label-input-partner label");
        label.style.top = "50%";
        label.style.fontSize = "0.688rem";
        label.style.transform = "translateY(-20px)"; // 위치 조정
        label.style.color = "#00a878"; // 색상 변경
        document.querySelector(".stack-search-typing-input").style.borderColor =
            "#00a878";
    });

// 다른 곳을 클릭했을 때 결과를 숨기고, label 위치와 색상 복원
document.addEventListener("click", (event) => {
    const searchResult = document.querySelector(".stack-search-result");
    const searchInput = document.querySelector(".stack-search-typing-input");

    // 클릭한 곳이 검색창이나 결과 목록이 아닌 경우에만 결과를 숨기고 label 복원
    if (
        !searchInput.contains(event.target) &&
        !searchResult.contains(event.target)
    ) {
        searchResult.style.display = "none";

        // 입력 필드에 값이 없으면 label 위치와 색상 복원
        if (searchInput.value === "") {
            const label = document.querySelector(".label-input-partner label");
            label.style.top = "50%";
            label.style.fontSize = "14px";
            label.style.transform = "translateY(-50%)"; // 원래 위치로
            label.style.color = "#9e9e9e"; // 원래 색상으로 복원
            searchInput.style.borderColor = "#e0e0e0"; // 원래 테두리 색상으로 복원
        } else {
            searchInput.style.borderColor = "#e0e0e0"; // 입력 필드가 비어 있지 않다면 테두리 색상 복원
            const label = document.querySelector(".label-input-partner label");
            label.style.color = "#9e9e9e"; // 값이 있을 때 색상만 복원
        }

        // 버튼 상태 업데이트
        updateButtonState();
    }
});

// 입력 필드가 blur될 때 label 위치와 색상 복원
document
    .querySelector(".stack-search-typing-input")
    .addEventListener("blur", () => {
        const searchInput = document.querySelector(
            ".stack-search-typing-input"
        );

        // 입력 필드에 값이 없으면 label 위치와 색상 복원
        if (searchInput.value === "") {
            const label = document.querySelector(".label-input-partner label");
            label.style.top = "50%";
            label.style.fontSize = "14px";
            label.style.transform = "translateY(-50%)"; // 원래 위치로
            label.style.color = "#9e9e9e"; // 원래 색상으로 복원
            searchInput.style.borderColor = "#e0e0e0"; // 원래 테두리 색상으로 복원
        } else {
            searchInput.style.borderColor = "#e0e0e0"; // 입력 필드가 비어 있지 않다면 테두리 색상 복원
            searchInput.style.color = "#9e9e9e";
        }

        // 버튼 상태 업데이트
        updateButtonState();
    });

// 기술명 선택 기능
document.querySelectorAll(".stack-selector").forEach((stackSelector) => {
    stackSelector.addEventListener("click", (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지

        // 선택된 기술의 data-tag-name 값을 가져옴
        const selectedTagName = stackSelector.getAttribute("data-tag-name");

        // "기술명 *" 입력란에 선택된 값 표시
        const inputField = document.querySelector(".stack-search-typing-input");
        inputField.value = selectedTagName;

        // label 고정 위치 및 색상
        const label = document.querySelector(".label-input-partner label");
        label.style.top = "50%";
        label.style.fontSize = "0.688rem";
        label.style.transform = "translateY(-20px)"; // 위치 조정
        label.style.color = "#00a878"; // 색상 변경
        inputField.style.borderColor = "#eee"; // 테두리 색상 변경

        // 결과를 숨김
        const searchResult = document.querySelector(".stack-search-result");
        searchResult.style.display = "none";

        // 텍스트 색상 복원
        label.style.color = "#9e9e9e";

        // 버튼 상태 업데이트
        updateButtonState();
    });
});

// 숙련도 및 경험 선택 기능
document
    .querySelectorAll(".ui-label-select .select-dropdown li")
    .forEach((item) => {
        item.addEventListener("click", (event) => {
            const selectedValue = item.getAttribute("data-select-value");
            const selectedText = item.textContent.trim();

            // 선택한 숙련도 또는 경험을 반영
            const selectLabel = item
                .closest(".ui-label-select")
                .querySelector(".select-label");
            const selectBox = item
                .closest(".ui-label-select")
                .querySelector(".select-box");

            // 선택한 값을 표시할 요소
            const selectName = item
                .closest(".ui-label-select")
                .querySelector(".select-name");
            selectName.textContent = selectedText; // 선택한 텍스트를 표시
            selectName.style.opacity = 1; // 선택한 텍스트를 보이도록 설정
            selectName.style.visibility = "visible";
            selectName.style.color = "#616161"; // 선택한 텍스트의 색상을 설정

            // 설정한 값을 hidden input에 반영
            item
                .closest(".ui-label-select")
                .querySelector(
                    'select[name="rating"], select[name="experience"]'
                ).value = selectedValue;

            // 드롭다운 닫기
            item.closest(".select-dropdown").classList.remove("open");
            item.closest(".ui-label-select")
                .querySelector(".select-box")
                .classList.remove("active");

            // 숙련도 또는 경험 텍스트 이동 및 색상 복원
            selectLabel.style.transform = "translateY(-20px)"; // 위치 조정
            selectLabel.style.color = "#9e9e9e"; // 값이 있을 때 색상 복원
            selectBox.style.borderColor = "#e0e0e0"; // 값이 있을 때 테두리 색상 복원

            // 버튼 상태 업데이트
            updateButtonState();
        });
    });

// 숙련도와 경험의 텍스트를 클릭 시 이동 및 색상 변경
document.querySelectorAll(".ui-label-select").forEach((selectBox) => {
    selectBox.addEventListener("click", (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지

        const selectLabel = selectBox.querySelector(".select-label");

        // 텍스트 이동 및 색상 변경
        selectLabel.style.fontSize = "0.688rem";
        selectLabel.style.transform = "translateY(-23.2px)"; // 위치 조정
        selectLabel.style.color = "#00a878"; // 색상 변경
        selectBox.querySelector(".select-box").style.borderColor = "#00a878"; // 테두리 색상 변경

        // 다른 select-dropdown 닫기
        document
            .querySelectorAll(".select-dropdown.open")
            .forEach((openDropdown) => {
                if (openDropdown.closest(".ui-label-select") !== selectBox) {
                    openDropdown.classList.remove("open");
                    openDropdown
                        .closest(".ui-label-select")
                        .querySelector(".select-box")
                        .classList.remove("active");

                    // 원래 색상으로 복원
                    const otherLabel = openDropdown
                        .closest(".ui-label-select")
                        .querySelector(".select-label");
                    otherLabel.style.color = "#9e9e9e"; // 원래 색상으로 복원
                    openDropdown
                        .closest(".ui-label-select")
                        .querySelector(".select-box").style.borderColor =
                        "#e0e0e0"; // 테두리 색상 복원
                }
            });

        // 현재 select-dropdown을 토글
        const dropdown = selectBox.querySelector(".select-dropdown");
        dropdown.classList.toggle("open");
        selectBox.querySelector(".select-box").classList.toggle("active");

        // 선택된 값이 없을 때 label 위치 복원
        const selectName = selectBox.querySelector(".select-name");
        if (selectName.value === "") {
            selectLabel.style.top = "50%";
            selectLabel.style.fontSize = "14px";
            selectLabel.style.transform = "translateY(-50%)"; // 원래 위치로
            selectLabel.style.color = "#9e9e9e"; // 원래 색상으로 복원
        }
    });
});

// 페이지의 다른 부분을 클릭하면 드롭다운이 닫히도록 하고, 색상 복원
document.addEventListener("click", () => {
    document.querySelectorAll(".select-dropdown.open").forEach((dropdown) => {
        dropdown.classList.remove("open");
        dropdown
            .closest(".ui-label-select")
            .querySelector(".select-box")
            .classList.remove("active");

        // 원래 색상으로 복원
        const selectLabel = dropdown
            .closest(".ui-label-select")
            .querySelector(".select-label");
        selectLabel.style.color = "#9e9e9e"; // 원래 색상으로 복원

        const selectName = dropdown
            .closest(".ui-label-select")
            .querySelector(".select-name");
        if (selectName.textContent === "") {
            selectLabel.style.top = "50%";
            selectLabel.style.fontSize = "14px";
            selectLabel.style.transform = "translateY(-50%)"; // 원래 위치로
            selectLabel.style.color = "#9e9e9e"; // 원래 색상으로 복원
        } else {
            selectLabel.style.color = "#9e9e9e"; // 값이 있을 때 색상만 복원
        }

        // 테두리 색상 복원
        dropdown
            .closest(".ui-label-select")
            .querySelector(".select-box").style.borderColor = "#e0e0e0"; // 원래 테두리 색상으로 복원
    });
});

//내 포인트 날짜
// 초기 디폴트 값 설정 (9월 1일 ~ 9월 30일)
setDefaultDateRange("202409");

function setDefaultDateRange(month) {
    const fromDateInput = document.getElementById("fromDate");
    const toDateInput = document.getElementById("toDate");

    // 날짜 계산
    const year = month.substring(0, 4);
    const monthNum = parseInt(month.substring(4, 6));

    const fromDate = `${year}-${monthNum.toString().padStart(2, "0")}-01`;
    const lastDay = new Date(year, monthNum, 0).getDate(); // 해당 월의 마지막 날 계산
    const toDate = `${year}-${monthNum.toString().padStart(2, "0")}-${lastDay}`;

    // 입력 필드에 값 설정
    fromDateInput.value = fromDate;
    toDateInput.value = toDate;
}

const monthButtons = document.querySelectorAll("#monthListArea2 li a");

monthButtons.forEach((button) => {
    button.addEventListener("click", function () {
        // 모든 버튼에서 'selected' 클래스를 제거
        monthButtons.forEach((btn) => btn.classList.remove("selected"));

        // 클릭된 버튼에 'selected' 클래스 추가
        this.classList.add("selected");

        // 날짜 범위 설정
        const month = this.parentElement.getAttribute("value");
        setDefaultDateRange(month);
    });
});
