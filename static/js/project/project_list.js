// ----------------------------------------------------------------------------
// 전체 옆 드롭다운 아이콘 가져옴
const dropdownSearchIcon = document.querySelector(".selectBg");

// 전체 옆 드롭다운 아이콘 누를시 나타나는 드롭다운
const dropdownSearchIist = document.querySelector(".select-dropdown");

// 드롭다운 아이콘 클릭시 목록 나오게 하기
dropdownSearchIcon.addEventListener("click", () => {
    dropdownSearchIist.style.display = "block";
});

// 클릭시 나오는 li 목록들
const listItems = document.querySelectorAll(".select-li");

// 마우스 가져다 대면 배경색 변경
listItems.forEach((listItem) => {
    listItem.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "lightcyan";
    });

    // 마우스 가져다 때면 배경색 복귀
    listItem.addEventListener("mouseout", (event) => {
        event.target.style.backgroundColor = "white";
    });
});

// .select-name 목록들 눌렀을때 바뀌어여할 위치
const selectName = document.querySelector(".select-name");

// 각 li 요소에 클릭 이벤트 리스너 추가
listItems.forEach((item) => {
    item.addEventListener("click", () => {
        // 클릭된 li의 텍스트를 select-name 요소에 설정
        selectName.innerHTML = item.innerHTML.trim();
        // 목록 선택시 드롭박스 사라짐
        dropdownSearchIist.style.display = "none";
    });
});

// ----------------------------------------------------------------------------
// 필터 버튼들 모두 가져오기 (전체 필터 , 외주, 기간제)
const btnColorChanges = document.querySelectorAll(".btn-filter-action-chip");

// 반복돌리기
btnColorChanges.forEach((btnColorChange) => {
    // 마우스 대면 색바뀜
    btnColorChange.addEventListener(
        "mouseover",
        (event) => {
            event.target.style.borderColor = "#00bfff";
        },
        false
    );
    // 마우스 때면 원래색으로
    btnColorChange.addEventListener(
        "mouseout",
        (event) => {
            event.target.style.borderColor = "#e0e0e0";
        },
        false
    );
});
// ----------------------------------------------------------------------------

// 검색창 input 클래스 가져오기
const searchInputColorChange = document.querySelector(".text-search-box");

// 마우스 대면 색바뀜
searchInputColorChange.addEventListener("mouseover", (event) => {
    event.target.style.borderColor = "#00bfff";
});

// 마우스 때면 원래색으로
searchInputColorChange.addEventListener("mouseout", (event) => {
    event.target.style.borderColor = "#e0e0e0";
});

// ----------------------------------------------------------------------------

// 필터 초기화 버튼 가져오기
const filterReset = document.querySelector(".filter-reset");

// 필터 초기화 버튼 클릭시 이벤트 (추후에 맞는 기능으로 수정 (확인용))
filterReset.addEventListener("click", () => alert("필터가 초기화 됬습니다."));

// 필터 저장 버튼 가져오기
const filterSave = document.querySelector(".filter-save");

// 필터 저장 버튼 클릭시 이벤트 (추후에 맞는 기능으로 수정 (확인용))
filterSave.addEventListener("click", () => {
    alert("필터가 저장되었습니다");
});

// 저장된 필터 버튼 가져오기
const filterSaved = document.querySelector(".filter-saved");

// 저장된 필터 버튼 클릭시 이벤트 (추후에 맞는 기능으로 수정 (확인용))
filterSaved.addEventListener("click", () => {
    alert("저장된 필터를 불러옵니다");
});

// ----------------------------------------------------------------------------

// 체크된 모집 하기 버튼
const checkRecruit = document.querySelector(".sort-btn-inactive-check");

// 체크 안된 모집 하기 버튼
const noCheckRecruit = document.querySelector(".sort-btn-inactive");

// 체크 안된 모집하기버튼 누를시 체크된버튼으로 바꾸기
noCheckRecruit.addEventListener("click", () => {
    noCheckRecruit.style.display = "none";
    checkRecruit.style.display = "inline-block";
});

// 체크 된 모집하기 버튼 누를시 체크 안된 버튼으로 바꾸기
checkRecruit.addEventListener("click", () => {
    noCheckRecruit.style.display = "inline-block";
    checkRecruit.style.display = "none";
});

// ----------------------------------------------------------------------------

// 프로젝트 제목 클래스 가져오기
const titleColorChange = document.querySelector(".subtitle-1-half-medium");

// 마우스를 대면 색 변환
titleColorChange.addEventListener("mouseover", () => {
    titleColorChange.style.color = "#00bfff";
});

// 마우스를 때면 색 복귀
titleColorChange.addEventListener("mouseout", () => {
    titleColorChange.style.color = "black";
});

// -----------------------------------------------------------------------------

// 기본정렬순 옆 드롭다운가져오기
const dropdownOpener = document.querySelector(".dropdown-opener");

// 누를때 열리는 드롭다운 목록들들
const sortBoxDropdown = document.querySelector(".sort-box-dropdown");

// 누르면 열린다
dropdownOpener.addEventListener("click", () => {
    sortBoxDropdown.style.display = "block";
});

// 클릭시 나오는 버튼 목록들
const boxDropdowns = document.querySelectorAll(".btn-sort-box-dropdown");

// 마우스 가져다 대면 배경색 변경
boxDropdowns.forEach((boxDropdown) => {
    boxDropdown.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "lightcyan";
    });

    // 마우스 가져다 때면 배경색 복귀
    boxDropdown.addEventListener("mouseout", (event) => {
        event.target.style.backgroundColor = "white";
    });
});

// .select-dropdown-content 목록들 눌렀을때 바뀌어여할 위치
const selectContent = document.querySelector(".select-dropdown-content");

// 각 버튼 요소에 클릭 이벤트 리스너 추가
boxDropdowns.forEach((boxDropdown) => {
    boxDropdown.addEventListener("click", () => {
        // 클릭된 li의 텍스트를 selectContent 요소에 설정
        selectContent.innerHTML = boxDropdown.innerHTML.trim();

        // 목록 선택시 드롭박스 사라짐
        sortBoxDropdown.style.display = "none";
    });
});

// -----------------------------------------------------------------------------
// 강사님께서 빼라고 하신부분 1로 고정되어있음 풀면 눌렀을때 스타일 왔다갔다함

// // 이전 다음 버튼 재외하고 숫자 클래스만 가져오기
// const links = document.querySelectorAll(".link");

// // 각 link 요소에 클릭 이벤트 리스너 추가
// links.forEach((link) => {
//     link.addEventListener("click", () => {
//         // 클릭된 요소에 active 클래스가 있는지 확인
//         if (link.classList.contains("active")) {
//             // active 클래스가 있으면 제거
//             link.classList.remove("active");
//         } else {
//             // active 클래스가 없으면 추가
//             // 기존의 active 클래스를 제거하고 새로운 요소에 추가
//             document.querySelectorAll(".link.active").forEach((link) => {
//                 link.classList.remove("active");
//             });
//             link.classList.add("active");
//         }
//     });
// });
