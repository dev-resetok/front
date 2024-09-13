const textareas = document.querySelectorAll(".moa-textarea");

const postContent1 = document.querySelector("#content-textarea1");
const wordLength1 = document.querySelector(".word-length1");
const helpText1 = document.querySelector(".help-text1");

const postContent2 = document.querySelector("#content-textarea2");
const wordLength2 = document.querySelector(".word-length2");
const helpText2 = document.querySelector(".help-text2");

const maxWordLength = 5000;
const attachInputs = document.querySelectorAll(".attach-input");
const saveButton = document.querySelector(".save-button");
let i = 0;

// 게시글의 현재 글자수 및 최대 글자수 안내
// 게시글 좌측 하단 - 최대 글자수 안내
helpText1.innerText = `${maxWordLength}자 이내로 작성해주세요.`;
// 게시글 우측 하단 - 현재 글자수 / 최대 글자수
wordLength1.innerText = `${postContent1.value.length}/${maxWordLength}`;
// focus를 받자마자 0이 된 글자수 반영
postContent1.addEventListener("focus", (e) => {
    wordLength1.innerText = `${postContent1.value.length}/${maxWordLength}`;
});
// 입력되는 글자수를 실시간으로 반영
postContent1.addEventListener("keyup", (e) => {
    wordLength1.innerText = `${postContent1.value.length}/${maxWordLength}`;
});
// focus를 잃었을 때까지 입력된 글자수 반영
postContent1.addEventListener("blur", (e) => {
    wordLength1.innerText = `${postContent1.value.length}/${maxWordLength}`;
});

// 게시글의 현재 글자수 및 최대 글자수 안내
// 게시글 좌측 하단 - 최대 글자수 안내
helpText2.innerText = `${maxWordLength}자 이내로 작성해주세요.`;
// 게시글 우측 하단 - 현재 글자수 / 최대 글자수
wordLength2.innerText = `${postContent2.value.length}/${maxWordLength}`;
// focus를 받자마자 0이 된 글자수 반영
postContent2.addEventListener("focus", (e) => {
    wordLength2.innerText = `${postContent2.value.length}/${maxWordLength}`;
});
// 입력되는 글자수를 실시간으로 반영
postContent2.addEventListener("keyup", (e) => {
    wordLength2.innerText = `${postContent2.value.length}/${maxWordLength}`;
});
// focus를 잃었을 때까지 입력된 글자수 반영
postContent2.addEventListener("blur", (e) => {
    wordLength2.innerText = `${postContent2.value.length}/${maxWordLength}`;
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

// 기본 양식 텍스트
// inquiryData 객체를 생성하여 초기 데이터를 설정합니다.
// const inquiryData1 = {
//     content: `<아래는 예시 양식입니다!>\n\n프로젝트 개요 : \n현재 준비 상황 : \n필요 요소 : \n개발환경/언어/방식 : \n주요 기능 List/주요 화면 List/메뉴 구성/요구 사항 등 : \n산출물 : \n참고 서비스/사이트 : \n기타 참고 사항/유의 사항 :`,
// };
// const inquiryData2 = {
//     content: `<아래는 예시 양식입니다!>

// 프로젝트 개요 : 삼성 반도체 건설 안전 관리 회사 웹사이트 제작이 필요합니다.
// 현재 준비 상황 : 문구, 이미지 등 컨텐츠 자료는 전달드릴 예정입니다.
// 필요 요소 : 삼성 반도체 건설 안전 관리 회사 웹사이트 기획 및 디자인
// 개발환경/언어/방식 : 반응형 웹으로 개발이 필요합니다.
// 주요 기능 List/주요 화면 List/메뉴 구성/요구 사항 등 : 회사 소개, 제품 소개, 채용, 계열사 소개 등의 소개 웹입니다.
// 산출물 : 기획 : 기능, 화면 등 기획/설계 문서 일체
// 참고 서비스/사이트 : https://www.naver.com
// 기타 참고 사항/유의 사항 : 유사한 프로젝트 경험이 있는 업체를 찾고 있으며 디자인에 역량이 있는 업체를 선호합니다.`,
// };

// name 속성이 'textarea'인 요소를 선택합니다.

// const fixTextArea1 = document.querySelector("#content-textarea1");
// window.addEventListener("load", function () {
//     if (fixTextArea1) {
//         fixTextArea1.value = inquiryData1.content;
//     }
// });

// const fixTextArea2 = document.querySelector("#content-textarea2");
// window.addEventListener("load", function () {
//     if (fixTextArea2) {
//         fixTextArea2.value = inquiryData2.content;
//     }
// });

textareas.forEach((textarea) => {
    let value = textarea.value;
    let focusCheck = false;
    textarea.addEventListener("mouseenter", (e) => {
        e.target.parentElement.classList.add("textarea-border-changed");
        e.target.parentElement.classList.remove("textarea-border");
    });

    textarea.addEventListener("mouseleave", (e) => {
        if (focusCheck) {
            e.target.parentElement.classList.add("textarea-border-changed");
            e.target.parentElement.classList.remove("textarea-border");
        } else {
            e.target.parentElement.classList.add("textarea-border");
            e.target.parentElement.classList.remove("textarea-border-changed");
        }
    });

    textarea.addEventListener("focus", (e) => {
        focusCheck = true;
        if (
            e.target.parentElement.classList.contains("textarea-border-changed")
        ) {
            e.target.parentElement.classList.add("textarea-border-changed");
            e.target.parentElement.classList.remove("textarea-border");
        } else {
            e.target.parentElement.classList.add("textarea-border");
            e.target.parentElement.classList.remove("textarea-border-changed");
        }
    });

    textarea.addEventListener("blur", (e) => {
        focusCheck = false;
        if (
            !e.target.parentElement.classList.contains(
                "textarea-border-changed"
            )
        ) {
            e.target.parentElement.classList.add("textarea-border-changed");
            e.target.parentElement.classList.remove("textarea-border");
        } else {
            e.target.parentElement.classList.add("textarea-border");
            e.target.parentElement.classList.remove("textarea-border-changed");
        }
    });
});
