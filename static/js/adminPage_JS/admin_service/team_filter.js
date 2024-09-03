document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");
    let currentEditRow = null;

    // 모집상태에 따른 색상 적용
    function applyRecruitStatusColors() {
        document.querySelectorAll(".ServiceTable_row").forEach((row) => {
            const statusCell = row.querySelector(".recruit_status");
            if (statusCell) {
                const statusText = statusCell.textContent.trim();

                switch (statusText) {
                    case "모집중":
                        statusCell.style.color = "green";
                        break;
                    case "모집완료":
                        statusCell.style.color = "gray";
                        break;
                    default:
                        statusCell.style.color = "black"; // 기본 색상
                        break;
                }
            }
        });
    }

    applyRecruitStatusColors(); // 페이지 로드 시 색상 적용

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();
        document.getElementById("editRecruitTitle").value = row
            .querySelector(".recruit_title")
            .textContent.trim();
        document.getElementById("editRecruitStatus").value = row
            .querySelector(".recruit_status")
            .textContent.trim();
        document.getElementById("editRecruitTarget").value = row
            .querySelector(".recruit_target")
            .textContent.trim();
        document.getElementById("editSportKind").value = row
            .querySelector(".sport_kind")
            .textContent.trim();
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
    }

    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            closeModal();
        }
    });

    // 수정 버튼 클릭 시 모달 열기
    function addEditButtonListeners() {
        document.querySelectorAll(".editBtn button").forEach((button) => {
            button.addEventListener("click", function () {
                const row = this.closest(".ServiceTable_row");
                openModal(row);
            });
        });
    }

    addEditButtonListeners(); // 초기 로드 시 이벤트 리스너 추가

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        if (currentEditRow) {
            currentEditRow.querySelector(".user_name").textContent =
                document.getElementById("editUserName").value;
            currentEditRow.querySelector(".Join_Date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".recruit_title").textContent =
                document.getElementById("editRecruitTitle").value;
            currentEditRow.querySelector(".recruit_status").textContent =
                document.getElementById("editRecruitStatus").value;
            currentEditRow.querySelector(".recruit_target").textContent =
                document.getElementById("editRecruitTarget").value;
            currentEditRow.querySelector(".sport_kind").textContent =
                document.getElementById("editSportKind").value;

            applyRecruitStatusColors(); // 수정 후 색상 적용
            closeModal(); // 수정 후 모달 닫기
        }
    });

    // 정렬 및 필터 기능 추가
    let sortDirection = {
        등록일: "desc",
        모집대상: null,
        모집상태: null,
    };

    function sortTableByDate(index, key) {
        const rows = Array.from(
            document.querySelectorAll(
                ".ServiceTable_row_wrapper .ServiceTable_row"
            )
        );
        rows.forEach((row) => (row.style.display = "")); // 모든 행을 다시 표시
        rows.sort((a, b) => {
            const dateA = new Date(
                a
                    .querySelector(`.ServiceTable_cell:nth-child(${index})`)
                    .textContent.trim()
            );
            const dateB = new Date(
                b
                    .querySelector(`.ServiceTable_cell:nth-child(${index})`)
                    .textContent.trim()
            );

            if (sortDirection[key] === "desc") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        const container = document.querySelector(".ServiceTable_row_wrapper");
        rows.forEach((row) => container.appendChild(row));

        // 방향 토글
        sortDirection[key] = sortDirection[key] === "desc" ? "asc" : "desc";

        applyRecruitStatusColors(); // 정렬 후 색상 적용
        addEditButtonListeners(); // 정렬 후 다시 이벤트 리스너 추가
    }

    function filterByRecruitTarget(target) {
        const rows = document.querySelectorAll(
            ".ServiceTable_row_wrapper .ServiceTable_row"
        );
        rows.forEach((row) => {
            const targetCell = row
                .querySelector(".recruit_target")
                .textContent.trim();
            if (targetCell === target) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });

        applyRecruitStatusColors(); // 필터 후 색상 적용
        addEditButtonListeners(); // 필터 후 다시 이벤트 리스너 추가
    }

    function filterByRecruitStatus(status) {
        const rows = document.querySelectorAll(
            ".ServiceTable_row_wrapper .ServiceTable_row"
        );
        rows.forEach((row) => {
            const statusCell = row
                .querySelector(".recruit_status")
                .textContent.trim();
            if (statusCell === status) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });

        applyRecruitStatusColors(); // 필터 후 색상 적용
        addEditButtonListeners(); // 필터 후 다시 이벤트 리스너 추가
    }

    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // selected 클래스 추가/제거
            document
                .querySelector(".sort-filter-option.selected")
                .classList.remove("selected");
            option.classList.add("selected");

            if (option.textContent.includes("등록일")) {
                sortDirection["모집대상"] = null;
                sortDirection["모집상태"] = null;
                sortTableByDate(4, "등록일");
            } else if (option.textContent.includes("팀원 모집")) {
                sortDirection["등록일"] = null;
                sortDirection["모집상태"] = null;
                filterByRecruitTarget("팀원");
            } else if (option.textContent.includes("팀 모집")) {
                sortDirection["등록일"] = null;
                sortDirection["모집상태"] = null;
                filterByRecruitTarget("팀");
            } else if (option.textContent.includes("모집상태")) {
                if (sortDirection["모집상태"] === "모집중") {
                    filterByRecruitStatus("모집완료");
                    sortDirection["모집상태"] = "모집완료";
                } else {
                    filterByRecruitStatus("모집중");
                    sortDirection["모집상태"] = "모집중";
                }
            }
        });
    });
});
