document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");
    let currentEditRow = null;

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editTeamLeader").value = row
            .querySelector(".TeamLeader_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();
        document.getElementById("editTeamName").value = row
            .querySelector(".Team_name")
            .textContent.trim();
        document.getElementById("editMatchRecord").value = row
            .querySelector(".match_ctn")
            .textContent.trim();
        document.getElementById("editMembers").value = row
            .querySelector(".Team_member")
            .textContent.trim();
        document.getElementById("editPurpose").value = row
            .querySelector(".Team_status")
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
            currentEditRow.querySelector(".TeamLeader_name").textContent =
                document.getElementById("editTeamLeader").value;
            currentEditRow.querySelector(".Join_Date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".Team_name").textContent =
                document.getElementById("editTeamName").value;
            currentEditRow.querySelector(".match_ctn").textContent =
                document.getElementById("editMatchRecord").value;
            currentEditRow.querySelector(".Team_member").textContent =
                document.getElementById("editMembers").value;
            currentEditRow.querySelector(".Team_status").textContent =
                document.getElementById("editPurpose").value;

            closeModal(); // 수정 후 모달 닫기
        }
    });

    // 선택된 필터 옵션에 'selected' 클래스 추가
    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", function () {
            // 이전에 선택된 옵션에서 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                .classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            this.classList.add("selected");

            // 여기에 필터링 또는 정렬에 대한 추가 코드를 넣을 수 있습니다.
        });
    });
});
