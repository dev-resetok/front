const textareas = document.querySelectorAll(".moa-textarea");
const postContent = document.querySelector("#content-textarea");
const wordLength = document.querySelector(".word-length");
const helpText = document.querySelector(".help-text");
const maxWordLength = 5000;
const attachInputs = document.querySelectorAll(".attach-input");
const saveButton = document.querySelector(".save-button");
let i = 0;

// 마우스의 움직임과 focus 유무에 따라 모든 textarea에 스타일 적용
textareas.forEach((textarea) => {
    let value = textarea.value;
    let focusCheck = false;
    // 마우스가 들어왔을 때
    textarea.addEventListener("mouseenter", (e) => {
        e.target.parentElement.className = "textarea-border-changed";
    });
    // 마우스가 나갔을 떄
    textarea.addEventListener("mouseleave", (e) => {
        if (focusCheck) {
            e.target.parentElement.className = "textarea-border-changed";
        } else {
            e.target.parentElement.className = "textarea-border";
        }
    });
    // focus를 받았을 때
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
    // focus를 잃었을 때
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
document.querySelectorAll(".select-location").forEach((select) => {
    // 마우스가 들어왔을 때
    select.addEventListener("mouseenter", (e) => {
        e.target.style.border = "1px solid #3ba3c7";
    });

    // 마우스가 나갔을 때
    select.addEventListener("mouseleave", (e) => {
        if (!e.target.matches(":focus")) {
            // 포커스를 잃은 경우만 원래 상태로
            e.target.style.border = "1px solid #e0e0e0";
        }
    });

    // 포커스를 얻었을 때
    select.addEventListener("focus", (e) => {
        e.target.style.border = "1px solid #3ba3c7";
    });

    // 포커스를 잃었을 때
    select.addEventListener("blur", (e) => {
        e.target.style.border = "1px solid #e0e0e0";
    });
});

// 게시글의 현재 글자수 및 최대 글자수 안내
// 게시글 좌측 하단 - 최대 글자수 안내
helpText.innerText = `${maxWordLength}자 이내로 작성해주세요.`;
// 게시글 우측 하단 - 현재 글자수 / 최대 글자수
wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
// focus를 받자마자 0이 된 글자수 반영
postContent.addEventListener("focus", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
// 입력되는 글자수를 실시간으로 반영
postContent.addEventListener("keyup", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});
// focus를 잃었을 때까지 입력된 글자수 반영
postContent.addEventListener("blur", (e) => {
    wordLength.innerText = `${postContent.value.length}/${maxWordLength}`;
});

// 첨부파일 목록 관리
attachInputs.forEach((attachInput) => {
    // 첨부파일 버튼이 클릭되어 attachInput에 file이 입력되었을 때
    attachInput.addEventListener("change", (e) => {
        // 파일 정보 불러오기
        const [file] = e.target.files;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // 첨부파일 객체 생성
        const attachFile = `<div class="attach-file">
                                <label>
                                        <div class="attach-cancel-button" id=attach-cancel-button-${++i}></div>
                                        <input type="file" id=attach-info-${i} disabled/>
                                </label>
                                <div class="thumbnail-wrap white-box">
                                    <div class="thumbnail" id=thumbnail-${i}></div>
                                </div>
                                <div class="attach-text-wrap">${file.name}</div>
                            </div>`;
        const attachButtonFileWrap =
            attachInput.parentElement.parentElement.parentElement;
        const attachButton = attachButtonFileWrap.firstElementChild;
        attachButtonFileWrap.innerHTML += attachFile;
        // attachInput에 담긴 파일 정보를 첨부파일 객체의 files에 추가
        const attachInfo = document.querySelector(`#attach-info-${i}`);
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        attachInfo.files = dataTransfer.files;
        // attachInput에 담긴 파일 정보 삭제 및 attachButton 삭제
        attachInput.value = "";
        attachButtonFileWrap.removeChild(
            attachButtonFileWrap.firstElementChild
        );
        // 첨부파일 삭제버튼 및 입력된 첨부파일의 종류에 따른 썸네일 생성
        reader.addEventListener("load", (e) => {
            const thumbnailUnique = document.querySelector(`#thumbnail-${i}`);
            const attachCancelButtonUnique = document.querySelector(
                `#attach-cancel-button-${i}`
            );
            const path = e.target.result;
            // 이미지 파일 썸네일 생성
            if (path.includes("image")) {
                thumbnailUnique.style.backgroundImage = `url(${path})`;
                attachCancelButtonUnique.style.display = "block";
                //  기타 파일은 빈 썸네일
            } else {
                thumbnailUnique.style.backgroundImage = "";
                attachCancelButtonUnique.style.display = "block";
            }
        });
        // 모든 첨부파일의 삭제버튼에 해당 파일 삭제기능 추가
        const attachCancelButton = document.querySelector(
            `#attach-cancel-button-${i}`
        );
        attachCancelButton.addEventListener("click", (e) => {
            // 첨부파일 목록에서 해당 파일 삭제
            attachInfo.value = "";
            attachButtonFileWrap.appendChild(attachButton);
            attachButtonFileWrap.removeChild(
                attachButtonFileWrap.firstElementChild
            );
        });
    });
});

// 게시글 저장버튼에 입력된 정보 저장 기능 추가
// saveButton.addEventListener("click", (e) => {});

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
