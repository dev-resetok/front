// JavaScript 코드
document.querySelectorAll(".report-status").forEach(function (element) {
    let status = element.textContent.trim(); // 요소의 텍스트 값을 가져옴

    if (status === "보류") {
        element.style.backgroundColor = "rgb(244, 244, 118)"; // 보류일 때 노란색
        element.style.color = "black";
    } else if (status === "처리") {
        element.style.backgroundColor = "rgb(245, 88, 88)"; // 처리 완료일 때 초록색
    } else if (status === "대기중") {
        element.style.backgroundColor = "#0056b3"; // 대기중일 때 파란색
    } else {
        element.style.backgroundColor = ""; // 기본 색상
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const addServiceBtn = document.getElementById("addServiceBtn");
    const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
    const headerCheckbox = document.getElementById("selectAll"); // 헤더 체크박스
    const rowCheckboxes = document.querySelectorAll(".userCheckbox"); // 목록의 체크박스들

    // 클릭 시 색상 변경 기능
    function addTemporaryClass(element) {
        element.classList.add("clicked");
        setTimeout(function () {
            element.classList.remove("clicked");
        }, 300); // 0.3초 후에 원래 색으로 돌아옴
    }

    addServiceBtn.addEventListener("click", function () {
        addTemporaryClass(addServiceBtn);
    });

    deleteSelectedBtn.addEventListener("click", function () {
        addTemporaryClass(deleteSelectedBtn);
    });

    // 모든 체크박스를 제어하는 함수
    function toggleAllCheckboxes(isChecked) {
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = isChecked;
        });
    }

    // 헤더 체크박스를 클릭하면 모든 체크박스의 상태를 변경
    headerCheckbox.addEventListener("change", function () {
        toggleAllCheckboxes(this.checked);
    });

    // 각 목록의 체크박스를 클릭하면, 하나라도 체크가 해제되면 헤더 체크박스를 해제
    rowCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (!this.checked) {
                headerCheckbox.checked = false;
            } else {
                // 모든 목록의 체크박스가 체크되었는지 확인
                const allChecked = Array.from(rowCheckboxes).every(
                    (cb) => cb.checked
                );
                headerCheckbox.checked = allChecked;
            }
        });
    });

    // 선택된 목록 삭제 기능
    deleteSelectedBtn.addEventListener("click", function () {
        const checkedRows = Array.from(rowCheckboxes).filter(
            (checkbox) => checkbox.checked
        );

        if (checkedRows.length > 0) {
            // 체크된 행들을 처리 완료로 변경
            checkedRows.forEach((checkbox) => {
                const row = checkbox.closest(".ServiceTable_row");

                // 해당 행의 상태를 처리 완료로 변경
                const statusCell = row.querySelector(".report-status");
                if (statusCell) {
                    statusCell.textContent = "처리 완료";
                    statusCell.style.backgroundColor = "green"; // 배경색 초록색으로 변경
                }
            });

            // 모든 체크박스가 해제되었으므로, 헤더 체크박스도 해제
            headerCheckbox.checked = false;
        }
    });
    deleteSelectedBtn.addEventListener("click", function () {
        const checkedRows = Array.from(rowCheckboxes).filter(
            (checkbox) => checkbox.checked
        );

        if (checkedRows.length > 0) {
            // 체크된 행들을 처리 완료로 변경
            checkedRows.forEach((checkbox) => {
                const row = checkbox.closest(".ServiceTable_row");

                // 해당 행의 상태를 처리 완료로 변경
                const statusCell = row.querySelector(".report-status");
                if (statusCell) {
                    statusCell.textContent = "처리";
                    statusCell.style.backgroundColor = "rgb(245, 88, 88)"; // 배경색 초록색으로 변경
                    statusCell.style.color = "#fff";
                }
            });

            // 모든 체크박스가 해제되었으므로, 헤더 체크박스도 해제
            headerCheckbox.checked = false;
        }
    });
    addServiceBtn.addEventListener("click", function () {
        const checkedRows = Array.from(rowCheckboxes).filter(
            (checkbox) => checkbox.checked
        );

        if (checkedRows.length > 0) {
            // 체크된 행들을 처리 완료로 변경
            checkedRows.forEach((checkbox) => {
                const row = checkbox.closest(".ServiceTable_row");

                // 해당 행의 상태를 처리 완료로 변경
                const statusCell = row.querySelector(".report-status");
                if (statusCell) {
                    statusCell.textContent = "보류";
                    statusCell.style.color = "black";
                    statusCell.style.backgroundColor = "rgb(244, 244, 118)"; // 배경색 초록색으로 변경
                }
            });

            // 모든 체크박스가 해제되었으므로, 헤더 체크박스도 해제
            headerCheckbox.checked = false;
        }
    });

    // 검색 기능 추가
    const searchInput = document.querySelector(".Filter_searchInput");

    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const searchTerm = searchInput.value.trim().toLowerCase();
            filterTableBySearchTerm(searchTerm);
        }
    });

    function filterTableBySearchTerm(searchTerm) {
        const rows = document.querySelectorAll(".ServiceTable_row");
        if (searchTerm === "") {
            rows.forEach((row) => (row.style.display = "table-row"));
        } else {
            rows.forEach((row) => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(searchTerm)) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
            });
        }

        // 헤더는 항상 보이도록 유지
        const header = document.querySelector(".ServiceTable_header");
        if (header) {
            header.style.display = "table-row";
        }
    }

    // 페이지 로드 시 전체 목록이 보이도록 기본 상태 유지
    filterTableBySearchTerm("");

    // 페이지네이션 기능
    document.querySelectorAll(".pagination-page-link").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 링크 동작을 막기

            // 모든 페이지에서 active 클래스를 제거
            document
                .querySelectorAll(".pagination-page")
                .forEach(function (page) {
                    page.classList.remove("active");
                });

            // 클릭한 페이지에 active 클래스를 추가
            this.parentElement.classList.add("active");

            // 페이지 번호에 따라 콘텐츠를 업데이트하는 로직 추가 가능
            // 예시: updateContentForPage(this.textContent);
        });
    });

    // 처음, 이전, 다음, 마지막 페이지 버튼 로직 추가
    // 해당 페이지로 이동하는 코드 추가 가능
});
