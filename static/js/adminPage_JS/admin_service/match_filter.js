document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 매칭 상태에 따른 색상 적용
    function applyStatusColors() {
        document.querySelectorAll(".ServiceTable_row").forEach((row) => {
            const statusCell = row.querySelector(
                ".ServiceTable_cell:nth-child(6)"
            );
            const statusText = statusCell.textContent.trim();

            switch (statusText) {
                case "매칭됨":
                    statusCell.style.color = "blue";
                    break;
                case "매칭중":
                    statusCell.style.color = "green";
                    break;
                case "경기 종료":
                    statusCell.style.color = "gray";
                    break;
                case "경기 취소":
                    statusCell.style.color = "red";
                    break;
                default:
                    statusCell.style.color = "black"; // 기본 색상
                    break;
            }
        });
    }

    applyStatusColors(); // 초기 색상 적용

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editHomeTeamName").value = row
            .querySelector(".homeTeam_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();
        document.getElementById("editDueDate").value = row
            .querySelector(".Due_date")
            .textContent.trim();
        document.getElementById("editAwayTeam").value = row
            .querySelector(".awayTeam")
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

    // 정렬 및 필터 기능 추가
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");

    let sortDirection = {
        등록일: "desc",
        예정일: "desc",
        매칭상태: null,
        종료상태: null,
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

        addEditButtonListeners(); // 정렬 후 다시 이벤트 리스너 추가
        applyStatusColors(); // 정렬 후 색상 적용
    }

    function filterByStatus(statusArray) {
        const rows = document.querySelectorAll(
            ".ServiceTable_row_wrapper .ServiceTable_row"
        );
        rows.forEach((row) => {
            const statusCell = row.querySelector(
                ".ServiceTable_cell:nth-child(6)"
            );
            const statusText = statusCell.textContent.trim();

            if (statusArray.includes(statusText)) {
                row.style.display = "";
                switch (statusText) {
                    case "매칭됨":
                        statusCell.style.color = "blue";
                        break;
                    case "매칭중":
                        statusCell.style.color = "green";
                        break;
                    case "경기 종료":
                        statusCell.style.color = "gray";
                        break;
                    case "경기 취소":
                        statusCell.style.color = "red";
                        break;
                }
            } else {
                row.style.display = "none";
            }
        });

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
                sortDirection["매칭상태"] = null;
                sortDirection["종료상태"] = null;
                sortTableByDate(4, "등록일");
            } else if (option.textContent.includes("예정일")) {
                sortDirection["매칭상태"] = null;
                sortDirection["종료상태"] = null;
                sortTableByDate(5, "예정일");
            } else if (option.textContent.includes("매칭상태")) {
                if (sortDirection["매칭상태"] === "매칭중") {
                    filterByStatus(["매칭됨"]);
                    sortDirection["매칭상태"] = "매칭됨";
                } else {
                    filterByStatus(["매칭중"]);
                    sortDirection["매칭상태"] = "매칭중";
                }
            } else if (option.textContent.includes("종료상태")) {
                if (sortDirection["종료상태"] === "경기 종료") {
                    filterByStatus(["경기 취소"]);
                    sortDirection["종료상태"] = "경기 취소";
                } else {
                    filterByStatus(["경기 종료"]);
                    sortDirection["종료상태"] = "경기 종료";
                }
            }
        });
    });
});
